package com.bank.admin.system;

import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bank.admin.system.model.accountUpdateInfoDto;
import com.bank.admin.system.model.resultDto;
import com.bank.admin.system.model.transferDepositDto;
import com.bank.admin.system.service.BankAuthService;
import com.bank.core.BankManagement;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * <pre>
 * AuthTestController.java : controller Description 작성
 * ====================================================================
 * Function Description                               ( Writer / Date )
 * ====================================================================
 * - GET OPENBAKING TEST CODE                      (김현진/2020. 11. 22.)
 * ====================================================================
 * Edit Description                                   ( Writer / Date )
 * ====================================================================
 * -
 * </pre>
 */
@RestController
public class BankAuthController {

	private static final Logger logger = LoggerFactory.getLogger(BankAuthController.class);
	
	@Autowired
	private BankAuthService bankAuthService;

	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	
	Date dTime = new Date();

	BankManagement bankManagement = new BankManagement();
	
	@PostMapping(value = "/tokenRequest")
	public void authCodeRequest(@RequestParam String code, HttpServletResponse res)
			throws Exception {
		
		/* 사용자 인증으로 코드를 받아와서 */
		HashMap<String, String> bankInfo = new HashMap<String, String>();
		HashMap<String, String> tokenInfo = null;
		String oobToken = null;
		
		bankInfo.put("SCOPE", "inquiry login transfer");
		bankInfo = bankAuthService.readBankAuthInfo(bankInfo);
		
		/* 토큰 생성 */
		tokenInfo = bankManagement.tokenInss(code, bankInfo);
		logger.info(tokenInfo.toString());
		
		/* oob토큰 발급 */
		oobToken = bankManagement.oobToken().get("access_token");
		
		/* Test를 위한 토큰 하드코딩 */
		Cookie token = new Cookie("ACCESS_TOKEN", tokenInfo.get("access_token"));
		Cookie refreshToken = new Cookie("REFRESH_TOKEN", tokenInfo.get("refresh_token"));
		Cookie userSeqNum = new Cookie("USER_SEQ_NO", tokenInfo.get("user_seq_no"));
		Cookie oonToken = new Cookie("OOB_TOKEN", oobToken);

		token.setPath("/");
		token.setMaxAge(7 * 24 * 60 * 60);

		refreshToken.setPath("/");
		refreshToken.setMaxAge(7 * 24 * 60 * 60);

		userSeqNum.setPath("/");
		userSeqNum.setMaxAge(7 * 24 * 60 * 60);
		
		oonToken.setPath("/");
		oonToken.setMaxAge(7 * 24 * 60 * 60);

		res.addCookie(token);
		res.addCookie(refreshToken);
		res.addCookie(userSeqNum);
		res.addCookie(oonToken);
	}

	/**
	 * <pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - READ USER INFO LIST             (김현진/2020. 12. 1.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 * </pre>
	 *
	 * JSONObject
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/index/user")
	public ResponseEntity<JSONObject> userInfoList(HttpServletRequest request) throws Exception {
		/* ACCESS_TOKEN 쿠키 검색 */
		String token = serchCookie("ACCESS_TOKEN", request).getValue();
		String userSeq = serchCookie("USER_SEQ_NO", request).getValue();
		
		logger.info("TOKEN##########"+token);

		JSONObject userInfo = bankManagement.readUserInfoList(token, userSeq);
		return ResponseEntity.ok(userInfo);
	}

	@PostMapping(value = "/index/account")
	public ResponseEntity<JSONObject> userAccountInfo(HttpServletRequest request,
			@RequestParam("fintechNum") String fintechNum) throws Exception {

		/* 변수선언 */
		String token = serchCookie("ACCESS_TOKEN", request).getValue();
		HashMap<String, String> param = new HashMap<String, String>();
		JSONObject readUserAccountInfo = null;
		String bank_tran_id = CreateUniqNum();

		param.put("bank_tran_id", bank_tran_id); // 은행거래 고유번호
		param.put("fintech_use_num", fintechNum); // 핀테크 이용 번호
		param.put("tran_dtime", sdf.format(dTime)); // 요청일시

		readUserAccountInfo = bankManagement.readAccountInfo(token, param);

		return ResponseEntity.ok(readUserAccountInfo);
	}
	
	@PostMapping(value="/index/transation")
	public ResponseEntity<JSONObject> userTranscationInfo(HttpServletRequest request,
			@RequestParam HashMap<String, String> param) throws Exception {
		
		/* 변수선언 */
		String token = serchCookie("ACCESS_TOKEN", request).getValue();
		String bank_tran_id = CreateUniqNum();
		JSONObject readTranActionInfo = null;
		
		HashMap<String, String> transData = new HashMap<String, String>();
		
		transData.put("bank_tran_id", bank_tran_id);
		transData.put("fintech_use_num", param.get("fintech_use_num"));
		transData.put("inquiry_type", param.get("inquiry_type"));
		transData.put("inquiry_base", "D");
		transData.put("from_date", param.get("from_date"));
		transData.put("from_time", "000000");
		transData.put("to_date", param.get("to_date"));
		transData.put("to_time", "000000");
		transData.put("sort_order", "D");
		transData.put("tran_dtime",  sdf.format(dTime));		
		
		readTranActionInfo = bankManagement.readTranscationInfoList(token, transData);
		
		logger.info(readTranActionInfo.toString()+"----------------");
		
		return ResponseEntity.ok(readTranActionInfo);	
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 계좌정보 변경                      (김현진/2020. 12. 31.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * ResponseEntity<JSONObject>
	 * @param param(변경할 이름, 핀테크 번호)
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value="/index/accountupdateinfo")
	public String updateAccountInfo(
			HttpServletRequest request,
			@Valid accountUpdateInfoDto accountUpdateInfoDto, Errors errors) throws Exception {
		
		/* 변수 선언 */
		String token = null;
		String responseCheck = null;
		HashMap<String, String> param = null;
		
		/* error확인 후 param적재 */
		if(!errors.hasErrors()) {
			param.put("fintech_use_num", accountUpdateInfoDto.getFintech_use_num());
			param.put("account_alias", accountUpdateInfoDto.getAccount_alias());	
		} else {
			logger.info("################################");
			logger.info(errors.getFieldError().toString());
			logger.info("################################");
			return "Valid error";
		}
		
		/* 토큰 확인 */
		token = serchCookie("ACCESS_TOKEN", request).getValue(); //쿠키에서 확인

		/* 계좌정보 변경 */
		if(token != null) {
			responseCheck = bankManagement.readAccountUpdateInfo(token, param);	
		}

		return responseCheck;
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 입금이체(핀테크번호)                   (김현진/2021. 1. 7.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * JSONObject
	 * @param param
	 *  - (약정계좌/계정 구분, 핀테크번호...입금이체 조회에 필요한 정보)
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value="/index/transferdiposit")
	public HashMap<String, Object> readTransferDeposit(
			HttpServletRequest request,
			@Valid transferDepositDto transferDepositDto, Errors errors) throws Exception  {
		
		/* 변수선언 */
		String token = null;
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> readTransferInfo = new HashMap<String, Object>();
		HashMap<String, Object> param = null;
		
		/* validation */
		if(errors.hasErrors()) {
			for(FieldError error : errors.getFieldErrors()) {			
				readTransferInfo.put(error.getField().toString(), error.getDefaultMessage().toString());
				logger.info("##############"+error.getField().toString());
				logger.info("##############"+error.getDefaultMessage().toString());
			}
			readTransferInfo.put("errorCode", "A0001");
			return readTransferInfo;
		} else {
			/* HashMap으로 변환 */
			param = mapper.convertValue(transferDepositDto, new TypeReference<HashMap<String, Object>>(){});
			param.put("tran_dtime", sdf.format(dTime)); //현재시간
			param.put("bank_tran_id",CreateUniqNum()); // 은행 고유ID

			/* 입금이체 */
			token = serchCookie("ACCESS_TOKEN", request).getValue(); //쿠키에서 토큰 가져오기
			readTransferInfo = bankManagement.transferDifosit(token, param);

			return readTransferInfo;
		}
	}

	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 참가은행 조회                        (김현진/2021. 1. 5.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * JSONObject
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value="/index/status")
	public ResponseEntity<HashMap<String, Object>> bankStatus(HttpServletRequest request) throws Exception {
		
		/* 변수 선언 */
		String oobToken = null;
		HashMap<String, Object> param = null;
		
		/* 쿠키에 저장되어있는 oobtoken 가져오기 */
		//oobToken = serchCookie("OOB_TOKEN", request).getValue();
		oobToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJUOTkxNjM3NjYwIiwic2NvcGUiOlsib29iIl0sImlzcyI6Imh0dHBzOi8vd3d3Lm9wZW5iYW5raW5nLm9yLmtyIiwiZXhwIjoxNjE3NTM4Mzk4LCJqdGkiOiJhZjA5NzZiZi0yOGU3LTRmZmYtYmFmNC05M2ZhMjkyZDAxMmEifQ.z-_mIlAIby6umh0onznKsj8CYFYfX4tS7qLgnAlXyfU";
		
		/* 잠가은행 조회 */
		param = bankManagement.readBankStatus(oobToken);

		return ResponseEntity.ok(param);
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 이체결과 조회                       (김현진/2021. 1. 14.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * ResponseEntity<HashMap<String,Object>>
	 * @param request
	 * @param resultDto
	 * @param errors
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value="/index/result")
	public ResponseEntity<HashMap<String, String>> transferResult( 
			HttpServletRequest request,
			@Valid @RequestBody resultDto resultDto, Errors errors) throws Exception {
		
		/* 변수선언 */
		HashMap<String, String> readResultInfo = new HashMap<String, String>();
		HashMap<String, Object> param = null;
		ObjectMapper mapper = new ObjectMapper();
		String oobToken = null;
		
		/* req_list 정보에 은행고유번호 삽입 */
		for(int i=0; i<resultDto.getReq_list().size(); i++) {
			resultDto.getReq_list().get(i).setOrg_bank_tran_id(CreateUniqNum());
		}
		
		/* validation */
		if(errors.hasErrors()) {
			for(FieldError error : errors.getFieldErrors()) {			
				readResultInfo.put(error.getField().toString(), error.getDefaultMessage().toString());
				logger.info("##############"+error.getField().toString());
				logger.info("##############"+error.getDefaultMessage().toString());
			}
			readResultInfo.put("errorCode", "A0001");
			return ResponseEntity.ok(readResultInfo);
		} else {
			param = mapper.convertValue(resultDto, new TypeReference<HashMap<String, Object>>(){});
			param.put("check_type", 2);
			param.put("req_cnt", resultDto.getReq_list().size());
			param.put("tran_dtime", sdf.format(dTime)); //현재시간
			param.put("bank_tran_id",CreateUniqNum()); // 은행 고유ID
			logger.info(param.toString());
			
			/* 입금이체 */
			/* 쿠키에 저장되어있는 oobtoken 가져오기 */
			//oobToken = serchCookie("OOB_TOKEN", request).getValue();
			oobToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJUOTkxNjM3NjYwIiwic2NvcGUiOlsib29iIl0sImlzcyI6Imh0dHBzOi8vd3d3Lm9wZW5iYW5raW5nLm9yLmtyIiwiZXhwIjoxNjE3NTM4Mzk4LCJqdGkiOiJhZjA5NzZiZi0yOGU3LTRmZmYtYmFmNC05M2ZhMjkyZDAxMmEifQ.z-_mIlAIby6umh0onznKsj8CYFYfX4tS7qLgnAlXyfU";
			readResultInfo = bankManagement.readResultInfo(param, oobToken, "transfer/result");
		}
		
		return ResponseEntity.ok(readResultInfo);
	}
	

	public Cookie serchCookie(String cookieName, HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		Cookie cookie = null;
		for (Cookie c : cookies) {
			if (c.getName().equals(cookieName)) {
				return c;
			}
		}
		return null;
	}

	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 은행거래고유번호 생성                   (김현진/2021. 1. 1.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * String
	 * @return
	 */
	public String CreateUniqNum() {
		String grantNum = "T991637660U";
		int num = 0;

		for (int i = 0; i < 9; i++) {
			num = (int) (Math.random() * 10);
			grantNum += Integer.toString(num);
		}
		return grantNum;
	}
	
}
