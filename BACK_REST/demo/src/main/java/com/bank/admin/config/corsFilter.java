package com.bank.admin.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;


public class corsFilter implements Filter {
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("init MyFilter===================");
	}
	
	
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) 
			throws IOException, ServletException {

		HttpServletResponse respone = (HttpServletResponse) res;
		
		respone.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		respone.setHeader("Access-Control-Allow-Credentials", "true");
		respone.setHeader("Access-Control-Allow-Headers","origin, content-type, accept, authorization");
		respone.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	
		System.out.println("=============FILTER - BEFORE=============");
		chain.doFilter(req, res);		
		System.out.println("=============FILTER - AFTER=============");
		
	}	
	
	@Override
	public void destroy() {
		System.out.println("destroy MyFilter====================");
	}

}

