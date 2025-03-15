package com.immutech.exerlytix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.immutech.exerlytix.dto.LoginDto;
import com.immutech.exerlytix.dto.RegisterDto;
import com.immutech.exerlytix.entity.Member;
import com.immutech.exerlytix.repo.MemberRepository;

import java.util.Optional;

@Service
public class MemberService {
    
    @Autowired
    private MemberRepository memberRepo;

    public String addMember(RegisterDto registerDto) {
        Member member = new Member(
            0,
            registerDto.getName(),
            registerDto.getEmail(),
            registerDto.getPassword() // In next commits, we'll hash this
        );
        memberRepo.save(member);
        return "Registration successful";
    }

    public String login(LoginDto loginDto) {
        Optional<Member> memberOpt = memberRepo.findByEmail(loginDto.getEmail());
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (member.getPassword().equals(loginDto.getPassword())) {
                return "Login Success";
            } else {
                return "Password Not Match";
            }
        } else {
            return "Email not exists";
        }
    }
}
