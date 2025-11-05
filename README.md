# ExerLytix - AI Personal Trainer

An AI-powered personal fitness trainer that uses computer vision to track exercises, count reps, and calculate calories in real-time.

## Architecture
This project is built as a monolithic repository containing three core components:
1. **AI Trainer**: Python, OpenCV, MediaPipe for pose detection and exercise counting.
2. **Backend**: Java 21, Spring Boot, Spring Security, MySQL, WebSockets (STOMP) for data management and real-time streaming.
3. **Frontend**: React, Vite, Tailwind CSS, Recharts for an interactive live dashboard.

## Features
- AI Pose Detection
- Exercise tracking and counting (Push-ups, Squats, Curls, etc.)
- Real-time feedback via WebSockets
- User Authentication & Performance Tracking

*Note: This is a college project currently under development.*
