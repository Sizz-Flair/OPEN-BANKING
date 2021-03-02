package com.bank.admin.system.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/error")
	public String handleError(HttpServletRequest request) {
		logger.info("################custom################"+request.getRequestURL());
		logger.info("################custom################"+request.getRequestURI());
		
		return "/index.html";
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}
}
