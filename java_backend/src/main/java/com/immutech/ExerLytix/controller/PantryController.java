package com.immutech.ExerLytix.controller;

import com.immutech.ExerLytix.dto.PantryDto;
import com.immutech.ExerLytix.entity.Member;
import com.immutech.ExerLytix.entity.PantryItem;
import com.immutech.ExerLytix.repo.MemberRepository;
import com.immutech.ExerLytix.repo.PantryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pantry")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PantryController {

    @Autowired
    private PantryRepository pantryRepository;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public ResponseEntity<List<PantryDto>> getPantryItems(@SessionAttribute(name = "member_id", required = false) Integer memberId) {
        if (memberId == null) {
            return ResponseEntity.status(401).build();
        }
        
        List<PantryItem> items = pantryRepository.findByMemberId(memberId);
        List<PantryDto> dtos = items.stream()
                .map(item -> new PantryDto(item.getId(), item.getFdcId(), item.getName()))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<PantryDto> addPantryItem(
            @SessionAttribute(name = "member_id", required = false) Integer memberId,
            @RequestBody PantryDto dto) {
            
        if (memberId == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<Member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        PantryItem item = new PantryItem(memberOpt.get(), dto.getFdcId(), dto.getName());
        item = pantryRepository.save(item);
        
        return ResponseEntity.ok(new PantryDto(item.getId(), item.getFdcId(), item.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePantryItem(
            @SessionAttribute(name = "member_id", required = false) Integer memberId,
            @PathVariable Long id) {
            
        if (memberId == null) {
            return ResponseEntity.status(401).build();
        }
        
        Optional<PantryItem> itemOpt = pantryRepository.findById(id);
        if (itemOpt.isPresent()) {
            PantryItem item = itemOpt.get();
            // Ensure the item belongs to the user
            if (item.getMember().getId() == memberId) {
                pantryRepository.delete(item);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(403).build();
            }
        }
        
        return ResponseEntity.notFound().build();
    }
}
