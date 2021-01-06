package com.bank.admin.system.service;

import java.util.HashMap;

import com.bank.admin.system.model.loginDto;

public interface LoginService {
	
	HashMap<String, String> loginInfo() throws Exception;
	
	HashMap<String, String> userDetailInfo(HashMap<String, String> param) throws Exception;
	
	HashMap<String, String> selectValidateLogin(HashMap<String, String> param) throws Exception;
	
	int loginIdRegister(loginDto loginDto) throws Exception;
}
