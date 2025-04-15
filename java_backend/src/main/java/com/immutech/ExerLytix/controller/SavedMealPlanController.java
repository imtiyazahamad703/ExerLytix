package com.immutech.ExerLytix.controller;

import com.immutech.ExerLytix.dto.SavedMealPlanDto;
import com.immutech.ExerLytix.entity.Member;
import com.immutech.ExerLytix.entity.SavedMealPlan;
import com.immutech.ExerLytix.repo.MemberRepository;
import com.immutech.ExerLytix.repo.SavedMealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saved-plans/{userId}")
@CrossOrigin(origins = "*")
public class SavedMealPlanController {

    @Autowired
    private SavedMealPlanRepository savedMealPlanRepository;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public ResponseEntity<List<SavedMealPlanDto>> getSavedPlans(@PathVariable Integer userId) {
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        
        List<SavedMealPlan> plans = savedMealPlanRepository.findByMemberId(userId);
        List<SavedMealPlanDto> dtos = plans.stream()
                .map(p -> new SavedMealPlanDto(p.getId(), p.getTitle(), p.getTotalCalories(), p.getTotalProtein(), p.getItemsJson()))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<SavedMealPlanDto> addSavedPlan(
            @PathVariable Integer userId,
            @RequestBody SavedMealPlanDto dto) {
            
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        Optional<Member> memberOpt = memberRepository.findById(userId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SavedMealPlan plan = new SavedMealPlan(memberOpt.get(), dto.getTitle(), dto.getTotalCalories(), dto.getTotalProtein(), dto.getItemsJson());
        plan = savedMealPlanRepository.save(plan);
        
        return ResponseEntity.ok(new SavedMealPlanDto(plan.getId(), plan.getTitle(), plan.getTotalCalories(), plan.getTotalProtein(), plan.getItemsJson()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSavedPlan(
            @PathVariable Integer userId,
            @PathVariable Long id) {
            
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        
        Optional<SavedMealPlan> planOpt = savedMealPlanRepository.findById(id);
        if (planOpt.isPresent()) {
            SavedMealPlan plan = planOpt.get();
            if (plan.getMember().getId() == userId) {
                savedMealPlanRepository.delete(plan);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(403).build();
            }
        }
        
        return ResponseEntity.notFound().build();
    }
}
