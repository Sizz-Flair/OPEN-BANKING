package com.bank.admin.system.service.impl;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.bank.admin.system.model.loginDto;

@Repository
public interface LoginDao {
	
	public HashMap<String, String> loginInfo() throws Exception;

	HashMap<String, String> userDetailInfo(HashMap<String, String> param) throws Exception;
	
	public int loginIdRegister(loginDto loginDto) throws Exception;
	
	HashMap<String, String> selectValidateLogin(HashMap<String, String> param) throws Exception;
}
