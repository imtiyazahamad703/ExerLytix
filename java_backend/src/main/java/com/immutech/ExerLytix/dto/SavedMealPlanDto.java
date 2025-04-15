package com.immutech.ExerLytix.dto;

public class SavedMealPlanDto {
    private Long id;
    private String title;
    private int totalCalories;
    private int totalProtein;
    private String itemsJson;

    public SavedMealPlanDto() {}

    public SavedMealPlanDto(Long id, String title, int totalCalories, int totalProtein, String itemsJson) {
        this.id = id;
        this.title = title;
        this.totalCalories = totalCalories;
        this.totalProtein = totalProtein;
        this.itemsJson = itemsJson;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getTotalCalories() { return totalCalories; }
    public void setTotalCalories(int totalCalories) { this.totalCalories = totalCalories; }

    public int getTotalProtein() { return totalProtein; }
    public void setTotalProtein(int totalProtein) { this.totalProtein = totalProtein; }

    public String getItemsJson() { return itemsJson; }
    public void setItemsJson(String itemsJson) { this.itemsJson = itemsJson; }
}
