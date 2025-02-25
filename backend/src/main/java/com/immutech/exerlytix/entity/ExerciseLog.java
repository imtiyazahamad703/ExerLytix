package com.immutech.exerlytix.entity;
import jakarta.persistence.*;
@Entity
public class ExerciseLog {
    @Id @GeneratedValue
    private Long id;
    private String exerciseType;
    private int reps;
}
