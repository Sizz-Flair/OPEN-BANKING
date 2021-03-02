package com.bank.admin.system;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import com.bank.admin.system.service.BankAuthService;

@RestController
public class BankController {
	
	private static final Logger logger = LoggerFactory.getLogger(BankController.class);
	
	@Autowired
	private BankAuthService bankAuthService;

	@PostMapping(value = "/bankauthinfo")
	public ResponseEntity<HashMap<String, String>> bankAuthInfo(HttpServletRequest request) throws Exception {
		/* 변수선언 */
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("SCOPE", "inquiry login transfer");
		param = bankAuthService.readBankAuthInfo(param);
		
		return ResponseEntity.ok(param);
	}
}
