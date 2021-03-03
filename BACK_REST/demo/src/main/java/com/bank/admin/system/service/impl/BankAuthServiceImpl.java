package com.bank.admin.system.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.admin.system.service.BankAuthService;

@Service("BankAuthService")
public class BankAuthServiceImpl implements BankAuthService{
	
	@Autowired
	private BankAuthDao bankAuthDao;
	
	@Override
	public HashMap<String, String> readBankAuthInfo(HashMap<String, String> param) throws Exception {

		return bankAuthDao.readBankAuthInfo(param);
	}
}
