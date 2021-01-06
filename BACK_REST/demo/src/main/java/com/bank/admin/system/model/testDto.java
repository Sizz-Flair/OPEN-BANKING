package com.bank.admin.system.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Builder;

public class testDto {
	
	@NotEmpty
	private String name;
	
	@NotEmpty
	private String pass;

	
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getPass() {
		return pass;
	}


	public void setPass(String pass) {
		this.pass = pass;
	}


	@Builder
	public testDto(String name, String pass) {
		this.name = name;
		this.pass = pass;
	}
}
