package com.bank.admin.system.model;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class resultDto {

	@NotEmpty (message="이체결과 정보는 필수 값입니다")
	private List<resultReqListDto> req_list;
	
	@Builder
	public resultDto(List<resultReqListDto> req_list, String org_bank_tran_date, String org_tran_amt) {	
		this.req_list = req_list;
	}	 
}
