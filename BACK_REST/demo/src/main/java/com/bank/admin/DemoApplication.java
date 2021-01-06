package com.bank.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.bank.admin.config.corsFilter;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	/*
	 * @Bean public FilterRegistrationBean setFilterRegistration() {
	 * 
	 * 
	 * 
	 * FilterRegistrationBean filterRegistrationBean = new
	 * FilterRegistrationBean(new corsFilter());
	 * 
	 * filterRegistrationBean.addUrlPatterns("/");
	 * 
	 * return filterRegistrationBean; }
	 */

}
