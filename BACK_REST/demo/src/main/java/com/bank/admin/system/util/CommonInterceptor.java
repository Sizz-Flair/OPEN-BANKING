package com.bank.admin.system.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonInterceptor extends HandlerInterceptorAdapter {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		logger.info("============interceptor============="+request.getRequestURL());
		logger.info("============interceptor============="+request.getRequestURI());

		logger.info(request.getSession().getAttribute("USER_ID")+"WHATis");
		
		/*
		try {
			// RSA키발급, 회원가입, ID중복체그 외 SESSION 검사 
			logger.info(request.getSession().getAttribute("USER_ID")+"s");

			if(request.getRequestURI().startsWith("/login") 
					|| request.getRequestURI().startsWith("/rsaKeyModulus")
					|| request.getRequestURI().startsWith("/membership")
					|| request.getRequestURI().startsWith("/dupleCheck")) {
				
				logger.info("try-----");

				return true;
			} else {
				if(request.getSession().getAttribute("USER_ID") == null) {
					logger.info("if-----");				
					
					response.getWriter().write("SESSION_OUT");
	
					return false;
				}
			}
		} catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }  */
 
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		logger.info("==================== END ======================");		
		HttpSession session = request.getSession();	
		Cookie loginCookie = new Cookie("loginCookie", session.getId());
		loginCookie.setPath("/index");
		loginCookie.setMaxAge(7*24*60*60);
		response.addCookie(loginCookie);
		logger.info("===============================================");
	}

}