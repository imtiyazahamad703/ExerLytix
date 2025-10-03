package com.immutech.ExerLytix.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.immutech.ExerLytix.dto.LoginDto;
import com.immutech.ExerLytix.services.MemberService;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig {

	@Autowired
	MemberService memberService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

//	 @Bean
//	 public AuthenticationManager authenticationManager(AuthenticationProvider
//	 provider) {
//	 return new ProviderManager(provider);
//	 }
	 
	@Bean

	public SecurityFilterChain permitTheRequest(HttpSecurity http) throws Exception {
		http
		.cors()
		.and()
		.authorizeHttpRequests(
				(req) -> req.requestMatchers("/api/", "/api/login", "/api/register").permitAll().anyRequest().authenticated()
				)
		.csrf().disable();

		return http.build();
	}

	@Bean
	public AuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(memberService);
		authProvider.setPasswordEncoder(passwordEncoder());

		return authProvider;
	}

}
