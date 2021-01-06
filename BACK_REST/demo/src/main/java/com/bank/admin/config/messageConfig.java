package com.bank.admin.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;


@Configuration
public class messageConfig implements WebMvcConfigurer {
	
	@Bean
	public ReloadableResourceBundleMessageSource messageSource() {
		ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();
		
		/* 메시지 프로퍼티 파일의 위치 */
		source.setBasename("classpath:/messages/message");
		
		/* 기본 인코딩 지정 */
		source.setDefaultEncoding("UTF-8");
		
		/* 프로퍼티 파일 변경 감지 시간간경 지정 */
		source.setCacheSeconds(60);
		
		/* 없는 메시지일 경우 에외 발생시키는 대신 기본 코드를 메시지로 한다 */
		source.setUseCodeAsDefaultMessage(true);
		
		return source;
		
	}
	
    /**

     * 변경된 언어 정보를 기억할 로케일 리졸버를 생성한다.

     * 여기서는 세션에 저장하는 방식을 사용한다.

     * @return

     */

    @Bean
    public SessionLocaleResolver localeResolver() {
        return new SessionLocaleResolver();
    }


	/* 언어 변경을 위한 인터셉터 생성 */
	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor interceptor = new LocaleChangeInterceptor();
		interceptor.setParamName("lang");
		
		return interceptor;
	}
	
	/* 인터셉터 등록 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
	}		
}
