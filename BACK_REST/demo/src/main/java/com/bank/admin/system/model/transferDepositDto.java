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
public class transferDepositDto {
	@NotBlank(message="약정 계좌는 필수값입니다.")
	private String cntr_account_type;
	
	@NotBlank(message="핀테크 번호는 필수값입니다.(은행선택)")
	private String fintech_use_num;
	
	@NotBlank(message="수취인 성명 검증여부는 필수값입니다")
	private String name_check_option;
	
	@NotBlank(message="약정계좌/계정정보는 필수값입니다")
	private String cntr_account_num;
	
	@NotBlank(message="입금이체용 암호문구는 필수값입니다")
	private String wd_pass_phrase;
	
	@NotBlank(message="출금계좌 인자내역은 필수값입니다")
	private String wd_print_content;
	
	@NotBlank(message="입금 요청건수는 필수값입니다")
	private String req_cnt;
	
	@NotBlank(message="거래순번은 필수값입니다")
	private String tran_no;
	
	@NotBlank(message="통장인자내용은 필수값입니다")
	private String print_content;
	
	@NotBlank(message="거래금액은 필수값입니다")
	private String tran_amt;
	
	@NotBlank(message="여청고객성명은 필수값입니다")
	private String req_client_name;
	
	@NotBlank(message="요청고객 회원번호는 필수값입니다")
	private String req_client_num;
	
	@NotBlank(message="이체용도는 필수값입니다.")
	private String transfer_purpose;
	
	private String sub_frnc_name;
	
	private String sub_frnc_num;
	
	private String sub_frnc_business_num;
	
	private String req_client_bank_code;
	
	private String req_client_account_num;
	
	private String cms_num;

	@Builder
	public transferDepositDto(
			String cntr_account_type, 
			String fintech_use_num,
			String name_check_option, 
			String cntr_account_num, 
			String wd_pass_phrase, 
			String wd_print_content, 
			String req_cnt, 
			String tran_no, 
			String print_content, 
			String tran_amt, 
			String req_client_name, 
			String req_client_num, 
			String transfer_purpose,
			String sub_frnc_name,
			String sub_frnc_num,
			String sub_frnc_business_num,
			String req_client_bank_code,
			String req_client_account_num,
			String cms_num) {		
		this.cntr_account_type = cntr_account_type;
		this.fintech_use_num = fintech_use_num;
		this.name_check_option = name_check_option;
		this.cntr_account_num = cntr_account_num;
		this.wd_pass_phrase = wd_pass_phrase;
		this.wd_print_content = wd_print_content;
		this.req_cnt = req_cnt;
		this.tran_no = tran_no;
		this.print_content = print_content;
		this.tran_amt = tran_amt;
		this.req_client_name = req_client_name;
		this.req_client_num = req_client_num;
		this.transfer_purpose =  transfer_purpose;
		this.sub_frnc_name = sub_frnc_name;
		this.sub_frnc_num = sub_frnc_num;
		this.sub_frnc_business_num = sub_frnc_business_num;
		this.req_client_bank_code = req_client_bank_code;
		this.req_client_account_num = req_client_account_num;
		this.cms_num = cms_num;
	}
}
