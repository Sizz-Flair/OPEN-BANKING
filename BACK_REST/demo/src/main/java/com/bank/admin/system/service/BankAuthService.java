package com.bank.admin.system.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

public interface BankAuthService {
	
	/**
	 *<pre>
	 * Function Description                ( Writer / Date )
	 * =====================================================
	 * - 오픈뱅킹 접속을위한 정보 가져오기          (김현진/2021. 1. 5.)
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
	HashMap<String, String> readBankAuthInfo(HashMap<String, String> param) throws Exception;

}
