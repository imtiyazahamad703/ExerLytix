package com.immutech.ExerLytix.controller;

import java.net.Authenticator;
import java.util.Map;

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
import org.springframework.web.client.RestTemplate;


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

	private final RestTemplate restTemplate = new RestTemplate();
	
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
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
		UsernamePasswordAuthenticationToken token =
				new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
		try {
			Authentication authenticate = authManager.authenticate(token);
			if (authenticate.isAuthenticated()) {

				// 1️⃣ Fetch user_id from DB
				Member member = repository.findByEmail(loginDto.getEmail());
				if (member == null) {
					throw new RuntimeException("User not found");
				}
				int userId = member.getId();

				// 2️⃣ Send user_id to Python server
				String pythonServerUrl = "http://localhost:5000/set_user";
				Map<String, Integer> body = Map.of("user_id", userId);
				restTemplate.postForObject(pythonServerUrl, body, String.class);

				return ResponseEntity.ok(Map.of("success", true, "message", "Login successful"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(Map.of("success", false, "message", "Invalid email or password"));
	}



}
