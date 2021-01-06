package com.bank.admin.system;

import java.security.PrivateKey;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.admin.system.model.loginDto;
import com.bank.admin.system.service.LoginService;

import raptor.pwdApi.service.PwdApi;
import raptor.pwdApi.service.rsa.RSA;

@RestController
public class Login {
	
	private static final Logger logger = LoggerFactory.getLogger(Login.class);
	
	@Autowired
	MessageSource messageSource;
	
	@Autowired
	LoginService loginService;
	
	PwdApi rsaUtil = new PwdApi();
	
	@PostMapping(value="/rsaKeyModulus")
	public ResponseEntity post(HttpServletRequest request) {
		
		HashMap<String, String> loginInfo = new HashMap<String, String>();				
		PrivateKey key = null;
		RSA rsa = null;

		/* SESSION에 PRIVATE KEY 존재 여부 확인 */
		key = (PrivateKey) request.getSession().getAttribute("RSAprivateKey");
		
		if(key != null) {
			logger.info("==========REMOVED RSA-PRIVATEKEY INTO SESSION==========");
			request.getSession().removeAttribute("RSAprivateKey"); //.removeAttribute("RSAprivateKey");
		}
		
		/* RES KEY 생성 */
		rsa = rsaUtil.createRSA();
		
		/* PRIVATE KET SESSION 등록 */
		logger.info("==========ADD RSA-PRIVATEKEY INTO SESSION==========");
		request.getSession().setAttribute("RSAprivateKey", rsa.getPrivateKey());

		/* 암호화를 위한  modulus, exponent 가져오기*/
		loginInfo.put("modulus", rsa.getModulus());
		loginInfo.put("exponent", rsa.getExponent());
		
		 return ResponseEntity.ok(loginInfo);		
	}
	
	@PostMapping(value="/loginVaildJson")
	public ResponseEntity getLoginValidJson(
			Locale locale, 
			HttpServletRequest request,
			@RequestParam HashMap<String, String> param) throws Exception {
		
		logger.info("============"+ param.get("hiddenId"));

		HashMap<String, String> resultMap = new HashMap<String, String>();
		String resCode = "0000"; // 에러코드 임시 정의
		String msgText = "";
		boolean chgPwdFlag = false;
		
		PrivateKey key = (PrivateKey)request.getSession().getAttribute("RSAprivateKey");

		/* session에 PrivateKey가 없을경우 잘못된 경로 접근으로 해석 */
		if(key == null) {
			logger.info("key == null 잘못된 경로 접근==============");
			
			resCode="L099";
			resultMap.put("resCode",resCode);
			
			return ResponseEntity.ok(resultMap);			
		}
		/* 복호화 */
		String userId = rsaUtil.getDecryptText(key, param.get("hiddenId")); 
		String userPassword =rsaUtil.getDecryptText(key, param.get("hiddenPassword"));
		
		logger.info("=========복호화=============="+userId);
		
		HashMap<String, String> loginId = new HashMap<String, String>();
		loginId.put("userId", userId);
		
		
		HashMap<String, String> loginInfo = loginService.selectValidateLogin(loginId);	
		
		if(loginInfo != null && !loginInfo.isEmpty()) {
			if(!loginInfo.get("LOGIN_PASSWORD").equals(userPassword)) {
				logger.info("비밀번호가 일치하지 않습니다.");
				resCode = "L001";
			}		
		} else {
			logger.info("미등록 계정 사용=======");
			resCode = "L000";		
		}
		
		if(resCode.equals("0000")) {
			/* Session RSAprivateKey 삭제 */
			request.getSession().removeAttribute("RSAprivateKey");
		 
			logger.info("세션에 id저장================"+userId);
			request.getSession().setAttribute("USER_ID", userId);
			logger.info(request.getSession().getAttribute("USER_ID")+"WHATis");
		}	
		
		resultMap.put("resCode",resCode);
	
		return ResponseEntity.ok(resultMap);
	}

	@PostMapping(value="/membership")
	public ResponseEntity membershipInfo(
			@Valid loginDto loginDto, Errors errors) throws Exception {		
		/* 변수 선언 */
		boolean msg = false;
		int row;
		
		logger.info("errors.getFieldErrors()>>>   " + errors.getFieldErrors());
		logger.info("errors.getFieldErrors()>>>   " + errors.hasErrors());
		
		if(errors.hasErrors()) {
			
		}

		for(FieldError error : errors.getFieldErrors()) {
			logger.info("##############"+errors.getFieldErrors().toString());
			logger.info("##############"+error.getField().toString());
			logger.info("##############"+error.getDefaultMessage().toString());
			
		}
		
		/* 회원가입 정보 등록 */
		row = loginService.loginIdRegister(loginDto);

		/*  */
		//msg = row > 0 ? true:false;
		
		logger.info("msg데이터"+msg);
				
		return ResponseEntity.ok(errors.getFieldErrors());
	}
	
	@PostMapping(value="/dupleCheck")
	public ResponseEntity dupleCheck(
			@RequestParam HashMap<String, String> param, HttpServletRequest req, HttpServletResponse res) throws Exception {
		logger.info("====="+req.getSession().getAttribute("USER_ID"));
		/* 변수 선언 */
		boolean isDupleCheck = true;
		HashMap<String, String> userDetailInfo = loginService.userDetailInfo(param);
		
		Cookie[] cook = req.getCookies();
		logger.info("coooooooooook"+cook);
		
		Cookie cook2 = new Cookie("JSESSIONID",null);
		cook2.setMaxAge(0);
		
		res.addCookie(cook2);
		  
		  if(userDetailInfo != null) {
		  if(param.get("memberId").equals(userDetailInfo.get("LOGIN_ID"))) { 
			  isDupleCheck= false; 
			  } 
		  }	 	
			Cookie loginCookie = new Cookie("checkCook", "testCook");
			loginCookie.setPath("/index");
			loginCookie.setMaxAge(7*24*60*60);
			res.addCookie(loginCookie);

		return ResponseEntity.ok(isDupleCheck);	
	}
	
	@PostMapping(value="/idSessionCheck")
	public String loginCheck() throws Exception {	
		logger.info("=============SESSION_KEEP================");
		return "SESSION_KEEP";
	}	
}
