package com.immutech.exerlytix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.immutech.exerlytix.dto.LoginDto;
import com.immutech.exerlytix.dto.RegisterDto;
import com.immutech.exerlytix.services.MemberService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping(path = "/save")
    public String saveMember(@RequestBody RegisterDto registerDto) {
        String id = memberService.addMember(registerDto);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginMember(@RequestBody LoginDto loginDto) {
        String response = memberService.login(loginDto);
        return ResponseEntity.ok(response);
    }
}
