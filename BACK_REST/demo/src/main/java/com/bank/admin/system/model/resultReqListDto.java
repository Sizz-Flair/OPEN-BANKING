package com.bank.admin.system.model;

import javax.validation.constraints.NotBlank;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class resultReqListDto {
	
	@NotBlank(message="거래순번은 필수입력 값입니다")
	private String tran_no;
	
	@NotBlank(message="원거래일자는 필수입력 값입니다")
	private String org_bank_tran_date;

	@NotBlank(message="원거래 금액은 필수입력 값입ㄴ디")
	private String org_tran_amt;
	
	private String org_bank_tran_id;

	
	@Builder
	public resultReqListDto(String tran_no, String org_bank_tran_date, String org_tran_amt, String org_bank_tran_id) {	
		this.tran_no = tran_no;
		this.org_bank_tran_date = org_bank_tran_date;
		this.org_tran_amt = org_tran_amt;
		this.org_bank_tran_id = org_bank_tran_id;
	}	 

}
