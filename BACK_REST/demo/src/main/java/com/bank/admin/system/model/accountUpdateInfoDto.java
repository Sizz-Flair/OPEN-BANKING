package com.bank.admin.system.model;

import javax.validation.constraints.NotBlank;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Data
public class accountUpdateInfoDto {
	
	@NotBlank(message="NULL")
	private String fintech_use_num;
	
	@NotBlank(message="NULL")
	private String account_alias;
	
	@Builder
	public accountUpdateInfoDto(String fintech_use_num, String account_alias) {
		
		this.fintech_use_num = fintech_use_num;
		this.account_alias = account_alias;
	}

}
