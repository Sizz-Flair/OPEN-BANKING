package com.bank.admin.system.model;

import javax.validation.constraints.Email;
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
public class loginDto {
	
	@NotBlank(message="ID는 필수 입력 값입니다.")
	private String memberId;
	 
	@NotBlank(message="비밀번호는 필수 입력 값입니다.")
	private String memberPassword;
	 
	@NotBlank(message="이름은 필수 입력 값입니다.") 
	private String userName;
	
	@NotBlank(message="ID는 필수 입력 값 입니다.")
	@Email(message="Email 형식에 맞지 않습니다.")
	private String email;
	
	@NotBlank(message="핸드폰 번호는 필수 입력 값입니다.")
	private String phoneNum;
	
	private String addrInfo;
	
	@Builder
	public loginDto(String memberId, String memberPassword, String userName, String email, String phoneNum, String addrInfo) {		
		this.memberId = memberId;
		this.memberPassword = memberPassword;
		this.userName = userName;
		this.email = email;
		this.phoneNum = phoneNum;
		this.addrInfo = addrInfo;
	}
}
