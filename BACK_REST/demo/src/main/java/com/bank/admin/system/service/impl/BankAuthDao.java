package com.bank.admin.system.service.impl;

import java.util.HashMap;

import org.springframework.stereotype.Repository;

@Repository
public interface BankAuthDao {
	
	HashMap<String, String> readBankAuthInfo() throws Exception;
}
