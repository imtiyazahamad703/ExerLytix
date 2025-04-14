package com.immutech.ExerLytix.repo;

import com.immutech.ExerLytix.entity.PantryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PantryRepository extends JpaRepository<PantryItem, Long> {
    List<PantryItem> findByMemberId(int memberId);
}
