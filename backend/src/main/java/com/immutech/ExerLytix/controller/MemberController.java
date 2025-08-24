package com.immutech.ExerLytix.controller;

import java.net.Authenticator;

import com.immutech.ExerLytix.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.immutech.ExerLytix.dto.LoginDto;
import com.immutech.ExerLytix.entity.Member;
import com.immutech.ExerLytix.repo.MemberRepository;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api")

public class MemberController {

	@Autowired
	private MemberRepository repository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private RegistrationService registrationService;
	
	@GetMapping("/")
	public String testingFunc() {
		return "Welcome to ExerLytix, Testing Completed ....";
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Member member) {
		try {
			Member saved = registrationService.register(member);
			return ResponseEntity.ok(saved);
		} catch (RuntimeException ex) {
			return ResponseEntity
					.status(HttpStatus.CONFLICT)
					.body(ex.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
		UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
		try {
				Authentication authenticate=authManager.authenticate(token);
				boolean status=authenticate.isAuthenticated();
				if(status) {
					return new ResponseEntity("Welcome to ExerLytix",HttpStatus.OK);
				}				
		}
		catch(Exception e) {
			e.printStackTrace();
		}		
		
		return new ResponseEntity<> ("Welcom to ExerLytix", HttpStatus.BAD_REQUEST);
	}
}
