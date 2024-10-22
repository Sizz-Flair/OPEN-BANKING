package com.bank.admin.system.service.impl;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.bank.admin.system.model.loginDto;
import com.bank.admin.system.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	private LoginDao loginDao;
	
	
	@Override
	public HashMap<String, String> selectValidateLogin(HashMap<String, String> param) throws Exception {

		return loginDao.selectValidateLogin(param);
	}

	@Override
	public HashMap<String, String> loginInfo() throws Exception {

		return  loginDao.loginInfo();
	}
	
	@Override
	public HashMap<String, String> userDetailInfo(HashMap<String, String> param) throws Exception {
	
		return loginDao.userDetailInfo(param);
	}
	
	@Override
	public int loginIdRegister(loginDto loginDto) throws Exception {
				
		return loginDao.loginIdRegister(loginDto);
	}
}
