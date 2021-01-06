package com.bank.admin.system.util;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bank.admin.config.corsFilter;

@Configuration
public class WebConfig {
	
	@Bean
	public FilterRegistrationBean getFilterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean(new corsFilter());
		registrationBean.addUrlPatterns("/");
		registrationBean.addUrlPatterns("/*");
		registrationBean.addUrlPatterns("/membership");
		
		return registrationBean;
		
	}

}
