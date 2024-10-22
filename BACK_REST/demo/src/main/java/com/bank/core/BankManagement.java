package com.bank.core;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.bouncycastle.asn1.ocsp.OCSPResponseStatus;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.bank.admin.system.AuthTestController;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BankManagement {
	
	final String OPENBANKING = "https://testapi.openbanking.or.kr/v2.0/";
	final String OPENBANKING_URL = "https://testapi.openbanking.or.kr/v2.0/";
    private static final String CLIENTID = "5BNCrTASDTzMLtfZrbsX60XBD1h1SPypvIcY9Hbn"; //ID
    private static final String CLIENTSER = "rN36u2fFU1UNQ5W7OZizwC2oANW5b5c69nBT6NWf"; // PASSWORD
    private static final String SCOPE = "inquiry login transfer"; 
    private static final String REDIURI = "http://localhost:3000/index/dashbord";
    private static final String GRANT_TYPE = "authorization_code";
    private static final String STATE = "12345678901234567890123456789013";
    
    final String READ_USER_INFO = "user/me";
    final String READ_USER_ACCOUNT = "account/balance/fin_num";
    final String READ_USER_TRANSATION = "account/transaction_list/fin_num";
    
    final String OPENBANKING_URL_token = "https://testapi.openbanking.or.kr/";
    final String TOKENINSS = "oauth/2.0/token";
	
	private static final Logger logger = LoggerFactory.getLogger(BankManagement.class);
    
	private Response connect(String token) {
		Client client = 
				ClientBuilder
				.newClient();	
		WebTarget webTarget = 
				client
				.target(OPENBANKING_URL+READ_USER_INFO);
		Invocation.Builder invocationBuilder = 
				webTarget.queryParam("user_seq_no", 1100759905)
				.request(MediaType.APPLICATION_JSON)
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + token);
		
		return invocationBuilder.get(); 
	}
	
	private Response connect(String token, String uri) {
		
		Client client = ClientBuilder.newClient();
		WebTarget webTarget = client.target(OPENBANKING_URL+uri);
		
		Invocation.Builder invocationBuilder = webTarget.request().header(HttpHeaders.AUTHORIZATION, "Bearer " + token);
		
		
		return invocationBuilder.get();
	}
	
	private Response connect(String token, HashMap<String, String> param, String uri) {
		Client client = 
				ClientBuilder
				.newClient();	
		WebTarget webTarget = null;
		Invocation.Builder invocationBuilder = null;
		
		switch (uri) {
		case READ_USER_ACCOUNT:
			webTarget = 
			client
			.target(OPENBANKING_URL+uri);
			
			invocationBuilder = 
			webTarget.queryParam("user_seq_no", 1100759905)
			.queryParam("bank_tran_id", param.get("bank_tran_id"))
			.queryParam("fintech_use_num", param.get("fintech_use_num"))
			.queryParam("tran_dtime", param.get("tran_dtime"))
			.request(MediaType.APPLICATION_JSON)
			.header(HttpHeaders.AUTHORIZATION, "Bearer " + token);		
			
			break;
		case READ_USER_TRANSATION: 
			webTarget = client.target(OPENBANKING_URL+uri);
			logger.info("param=>"+param.toString());
			logger.info("param=>"+OPENBANKING_URL+uri);
			
			invocationBuilder = webTarget
					.queryParam("bank_tran_id", param.get("bank_tran_id"))
					.queryParam("fintech_use_num", param.get("fintech_use_num"))
					.queryParam("inquiry_type", param.get("inquiry_type"))
					.queryParam("inquiry_base", param.get("inquiry_base"))
					.queryParam("from_date", param.get("from_date"))
					.queryParam("from_time", param.get("from_time"))
					.queryParam("to_date", param.get("to_date"))
					.queryParam("to_time", param.get("to_time"))
					.queryParam("sort_order", param.get("sort_order"))
					.queryParam("tran_dtime", param.get("tran_dtime"))
					.request(MediaType.APPLICATION_JSON)
					.header(HttpHeaders.AUTHORIZATION, "Bearer " + token);		
			break;

		default:
			break;
		}
		
		return invocationBuilder.get(); 
	}

	private Response connectPost(Form form) {
		
        Client client = 
        		ClientBuilder
        		.newClient();  
        WebTarget webTarget =
        		client
        		.target(OPENBANKING_URL_token+TOKENINSS);
        Invocation.Builder invocationBuilder = 
                 webTarget
                 .request(MediaType.APPLICATION_JSON); //.header(HttpHeaders.CONTENT_TYPE, "application/json");

        return invocationBuilder.post(Entity.form(form)); 
	}
	
	private Response connectPost(HashMap param, String token, String uri) {
		Client client = 
				ClientBuilder
				.newClient();
		WebTarget webTarget = 
				client
				.target("https://testapi.openbanking.or.kr/v2.0/" + uri);
		
		Invocation.Builder invocationBuilder = 
				webTarget
				.request(MediaType.APPLICATION_JSON);
		
		return invocationBuilder
				.header("Authorization", "Bearer "+token)
				.post(Entity.json(param));
	}
	
	public HashMap<String, String> tokenInss(String code) 
			throws JsonParseException, JsonMappingException, IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		Form form = new Form();
		
        /* 토큰 발급을 위한 정보 적재 */
        form.param("code", code);
        form.param("client_id", CLIENTID);
        form.param("client_secret", CLIENTSER);
        form.param("redirect_uri", "http://localhost:3000/index/userinfo");
        form.param("grant_type", GRANT_TYPE);
        
        /* API */
        Response response = connectPost(form);
        
        HashMap<String, String> tokenInfo = 
        		mapper.readValue(response.readEntity(String.class), HashMap.class);
        
        logger.info(tokenInfo.toString()+"###########");
        
        return tokenInfo;
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - oob토큰 발급받기                     (김현진/2021. 1. 5.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * HashMap<String,String>
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, String> oobToken() throws Exception {
		Response response = null;
		Form form = new Form();
		
		form.param("client_id","5BNCrTASDTzMLtfZrbsX60XBD1h1SPypvIcY9Hbn");
		form.param("client_secret","rN36u2fFU1UNQ5W7OZizwC2oANW5b5c69nBT6NWf");
		form.param("scope","oob");
		form.param("grant_type","client_credentials");
		
        Client client = 
        		ClientBuilder
        		.newClient();  
        WebTarget webTarget =
        		client
        		.target("https://testapi.openbanking.or.kr/oauth/2.0/token");
        Invocation.Builder invocationBuilder = 
                 webTarget
                 .request(MediaType.APPLICATION_JSON);
        
        response = invocationBuilder.post(Entity.form(form)); 
        
        HashMap<String, String> param = response.readEntity(HashMap.class);
        
        return param;
		
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - READ USERINFO                	 (김현진/2020. 12. 1.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * JSONObject
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public JSONObject readUserInfoList(String token) throws Exception {
		
		/* 변수 선언 */
		Response response;
		JSONObject userInfo = null;
		List<HashMap> arr = new ArrayList<HashMap>();

		/* API CONNECT */
		response = connect(token);

		/* JSONObject로 값 받기 */
		
		try {
			userInfo = response.readEntity(JSONObject.class);	
			arr = (List<HashMap>) userInfo.get("res_list");
		} catch (Exception e) {
			e.printStackTrace();
			
		} finally {
			response.close();
		}
		
		/* id값 추가 */
		for(int i=0; i<arr.size(); i++) {
			arr.get(i).put("id",i);
		}
		
		userInfo.put("res_list", arr);

		return userInfo;
	}
	
	public JSONObject readAccountInfo(String token, HashMap<String, String> param) throws Exception {
		
		/* 변수선언 */
		Response respons = null;
		JSONObject jsonObject = null;
		ObjectMapper mapper = null;
		
		/* CONNECT */
		respons = connect(token, param, READ_USER_ACCOUNT);
		
		jsonObject = respons.readEntity(JSONObject.class);
		
		return jsonObject;
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * -                           (akfur/2020. 12. 31.)
	 *
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * JSONObject
	 * @param token
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public JSONObject readTranscationInfoList(String token, HashMap<String, String> param) throws Exception {
		/* 변수선언 */
		Response response = null;
		JSONObject jsonObject = null;
		List<HashMap> arr = new ArrayList<HashMap>();

		response = connect(token, param, READ_USER_TRANSATION);
		try {
			jsonObject = response.readEntity(JSONObject.class);
			arr = (List<HashMap>) jsonObject.get("res_list");
		} catch (Exception e) {
			e.printStackTrace();
			
		} finally {
			response.close();
		}
		
		for(int i=0; i<arr.size(); i++) {
			arr.get(i).put("id",i);
		}
		
		jsonObject.put("res_list", arr);
		
		return jsonObject;
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 계좌정보 변경                       (김현진/2021. 1. 1.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * String
	 * @param token
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public String readAccountUpdateInfo(String token, HashMap param) throws Exception {
		/* 변수 선언 */
		Response response = null;
		JSONObject jsonObject = null;
		String responseMessage = null;
		String uri = "account/update_info";
		
		/* 계좌정보 변경 */
		response = connectPost(param, token, uri);
		jsonObject = response.readEntity(JSONObject.class);
		
		/* 계좌정보 변경 응답코드 화인 */
		try {
			if(jsonObject.get("rsp_code").equals("A0000")) {
				responseMessage = "처리 성공";
			} else {
				checkResponseMessage(responseMessage);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			response.close();
		}
		
		return responseMessage;
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
	 * HashMap<String,String>
	 * @param token
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, Object> transferDifosit(String token, HashMap<String, Object> param) throws Exception {
		/* 변수선언 */
		HashMap<String, Object> errorMessage = new HashMap<String, Object>();
		HashMap<String, Object> readTransferData = null;
		HashMap<String, String> oobToken = null;
		Response response = null;
		JSONObject jsonObject = new JSONObject();
		JSONObject res_list = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		ArrayList<HashMap<String, String>> arrayList = new ArrayList<HashMap<String,String>>();
		String uri = "transfer/deposit/fin_num";
		
		res_list.put("tran_no", param.get("tran_no"));
		res_list.put("bank_tran_id", param.get("bank_tran_id"));
		res_list.put("fintech_use_num", param.get("fintech_use_num"));
		res_list.put("print_content", param.get("print_content"));
		res_list.put("tran_amt", param.get("tran_amt"));
		res_list.put("req_client_name", param.get("req_client_name"));
		res_list.put("req_client_bank_code", param.get("req_client_bank_code"));
		res_list.put("req_client_account_num", param.get("req_client_account_num"));
		res_list.put("req_client_num", param.get("req_client_num"));
		res_list.put("transfer_purpose", param.get("transfer_purpose"));
		res_list.put("cms_num", param.get("cms_num"));
		
		jsonArray.add(res_list);
		
		jsonObject.put("cntr_account_type", param.get("cntr_account_type"));
		jsonObject.put("cntr_account_num", param.get("cntr_account_num"));
		jsonObject.put("wd_pass_phrase", param.get("wd_pass_phrase"));
		jsonObject.put("wd_print_content", param.get("wd_print_content"));
		jsonObject.put("name_check_option", param.get("name_check_option"));
		jsonObject.put("sub_frnc_name", param.get("sub_frnc_name"));
		jsonObject.put("sub_frnc_num", param.get("sub_frnc_num"));
		jsonObject.put("sub_frnc_business_num", param.get("sub_frnc_business_num"));
		jsonObject.put("tran_dtime", param.get("tran_dtime"));
		jsonObject.put("req_cnt", param.get("req_cnt"));
		jsonObject.put("req_list", jsonArray);

		oobToken = oobToken();
		
		response = connectPost(jsonObject, oobToken.get("access_token"), uri);	
		readTransferData = response.readEntity(HashMap.class);
		
		arrayList = (ArrayList<HashMap<String, String>>) readTransferData.get("res_list");
		
		/* res_lsit에 id추가 */
		for(int i=0; i<arrayList.size(); i++) {
			arrayList.get(i).put("id", Integer.toString(i));
		}
		
		/* 기존 res_list 삭제 */
		readTransferData.remove("res_list");
		
		/* id추가된 res_list 삽입 */
		readTransferData.put("res_list", arrayList);

		if(response.getStatus() == 200) {
			try {
				if(readTransferData.get("rsp_code").equals("A0000")) {
					return readTransferData;
				} else {
					errorMessage.put("errorMessage", 
							checkResponseMessage(readTransferData.get("rsp_code").toString()));				
					return errorMessage;		
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				response.close();
			}
		}
		
		return null;
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
	 * @param oobToken
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, String> readBankStatus(String oobToken) throws Exception {
		/* 변수선언 */
		Response response = null;
		HashMap<String, String> readBankStatus = null;
		HashMap<String, String> errorMessage = new HashMap<String, String>();
		
		/* 참가은행 조회 */
		response = connect(oobToken, "bank/status");
		readBankStatus = response.readEntity(HashMap.class);
		
		logger.info(readBankStatus.toString());
		
		/* 조회 확인 */
		if(response.getStatus() == 200) {
			try {
				if(readBankStatus.get("rsp_code").equals("A0000")) {
					return readBankStatus;
				} else {
					/* 조회실패 시 에러메시지 리턴 */
					errorMessage.put("errorMessage", 
							checkResponseMessage(readBankStatus.get("rsp_code").toString()));				
					return errorMessage;
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				response.close();
			}			
		}
		
		errorMessage.put("errorMessage", Integer.toString(response.getStatus()));
		
		return errorMessage;
	}
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 이체결과 조회             			  (김현진/2021. 1. 14.)
	 * =====================================================
	 * Edit Description                    ( Writer / Date )
	 * =====================================================
	 * -
	 *</pre>
	 *
	 * HashMap<String,String>
	 * @param param
	 * @param oobToken
	 * @param uri
	 * @return
	 * @throws Exception
	 */
	public HashMap<String, String> readResultInfo(HashMap<String, Object> param, String oobToken, String uri) throws Exception {
		
		/* 변수선언 */
		Response response = null;
		HashMap<String, String> readResultInfo = null;
		HashMap<String, String> errorMessage = new HashMap<String, String>();
		
		response = connectPost(param, oobToken, uri);	
		readResultInfo = response.readEntity(HashMap.class);
		
		logger.info("readReuslt>>>>>>>>>>>>>>!   "+readResultInfo.toString());
		
		/* 조회 확인 */
		if(response.getStatus() == 200) {
			try {
				if(readResultInfo.get("rsp_code").equals("A0000")) {
					return readResultInfo;
				} else {
					/* 조회실패 시 에러메시지 리턴 */
					errorMessage.put("errorMessage", 
							checkResponseMessage(readResultInfo.get("rsp_code").toString()));				
					return errorMessage;
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				response.close();
			}			
		}
		
		errorMessage.put("errorMessage", Integer.toString(response.getStatus()));
		
		return errorMessage;
	}
	

	public String checkResponseMessage(String param) throws Exception {
		
		String errorMessage = null;
		
		if(param.equals("A0002")) {
			errorMessage = "처리 중(이체결과조회 요망, 이체 시)";
		} else if (param.equals("A0003")) {
			errorMessage = "참가은행 에러";
		}  else if (param.equals("A0004")) {
			errorMessage = "내부 처리 에러";
		}  else if (param.equals("A0005")) {
			errorMessage = "요청전문 포맷 에러";
		}  else if (param.equals("A0006")) {
			errorMessage = "등록 데이터 에러";
		}  else if (param.equals("A0007")) {
			errorMessage = "전문 변환 에러";
		}  else if (param.equals("A0008")) {
			errorMessage = "처리시간 초과 에러";
		}
		return errorMessage;
	}
}
