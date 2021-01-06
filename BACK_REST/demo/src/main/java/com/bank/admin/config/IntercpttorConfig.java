package com.bank.admin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.bank.admin.system.util.CommonInterceptor;

@Configuration
public class IntercpttorConfig implements WebMvcConfigurer  {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		// TODO Auto-generated method stub
		registry.addInterceptor(new CommonInterceptor());
	}
	

}
