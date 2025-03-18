package com.immutech.exerlytix.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class AIController {

    @MessageMapping("/exercise-data")
    @SendTo("/topic/live-stats")
    public String handleExerciseData(String data) {
        // Broadcast the real-time AI python data to connected frontend clients
        return data; 
    }
}
