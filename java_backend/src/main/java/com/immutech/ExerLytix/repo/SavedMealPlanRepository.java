package com.immutech.ExerLytix.repo;

import com.immutech.ExerLytix.entity.SavedMealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedMealPlanRepository extends JpaRepository<SavedMealPlan, Long> {
    List<SavedMealPlan> findByMemberId(int memberId);
}
