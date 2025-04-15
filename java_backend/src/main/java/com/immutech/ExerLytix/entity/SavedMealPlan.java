package com.immutech.ExerLytix.entity;

import jakarta.persistence.*;

@Entity
public class SavedMealPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private int totalCalories;
    
    @Column(nullable = false)
    private int totalProtein;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String itemsJson;

    public SavedMealPlan() {}

    public SavedMealPlan(Member member, String title, int totalCalories, int totalProtein, String itemsJson) {
        this.member = member;
        this.title = title;
        this.totalCalories = totalCalories;
        this.totalProtein = totalProtein;
        this.itemsJson = itemsJson;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Member getMember() { return member; }
    public void setMember(Member member) { this.member = member; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public int getTotalCalories() { return totalCalories; }
    public void setTotalCalories(int totalCalories) { this.totalCalories = totalCalories; }
    
    public int getTotalProtein() { return totalProtein; }
    public void setTotalProtein(int totalProtein) { this.totalProtein = totalProtein; }
    
    public String getItemsJson() { return itemsJson; }
    public void setItemsJson(String itemsJson) { this.itemsJson = itemsJson; }
}
