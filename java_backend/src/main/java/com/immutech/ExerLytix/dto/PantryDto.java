package com.immutech.ExerLytix.dto;

public class PantryDto {
    private Long id;
    private Long fdcId;
    private String name;

    public PantryDto() {}

    public PantryDto(Long id, Long fdcId, String name) {
        this.id = id;
        this.fdcId = fdcId;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFdcId() {
        return fdcId;
    }

    public void setFdcId(Long fdcId) {
        this.fdcId = fdcId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
