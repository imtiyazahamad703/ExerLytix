
import mediapipe as mp
import pandas as pd
import numpy as np
import cv2

mp_pose = mp.solutions.pose

def calculate_angle(a, b, c):
    a = np.array(a)  
    b = np.array(b)  
    c = np.array(c)  

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) -\
              np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle



def detection_body_part(landmarks, body_part_name):
    return [
        landmarks[mp_pose.PoseLandmark[body_part_name].value].x,
        landmarks[mp_pose.PoseLandmark[body_part_name].value].y,
        landmarks[mp_pose.PoseLandmark[body_part_name].value].visibility
    ]


def detection_body_parts(landmarks):
    body_parts = pd.DataFrame(columns=["body_part", "x", "y"])

    for i, lndmrk in enumerate(mp_pose.PoseLandmark):
        lndmrk = str(lndmrk).split(".")[1]
        cord = detection_body_part(landmarks, lndmrk)
        body_parts.loc[i] = lndmrk, cord[0], cord[1]

    return body_parts


def score_table(exercise, frame, counter, status):
    # Colors (BGR format in OpenCV)
    BRAND_PURPLE = (204, 0, 176)   # #b000cc approx for OpenCV BGR
    WHITE = (255, 255, 255)
    BLACK = (0, 0, 0)
    
    # Draw top banner background
    cv2.rectangle(frame, (0, 0), (frame.shape[1], 80), BRAND_PURPLE, -1)
    
    # Put text for Exercise Name
    cv2.putText(frame, f"ACTIVITY: {exercise.replace('-', ' ').upper()}", 
                (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, WHITE, 3, cv2.LINE_AA)
                
    # Draw left side stats box
    cv2.rectangle(frame, (10, 100), (250, 250), (255, 255, 255), -1)
    cv2.rectangle(frame, (10, 100), (250, 250), BRAND_PURPLE, 2)
    
    # Put Stats Text
    cv2.putText(frame, "REPS", (30, 140), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, BLACK, 2, cv2.LINE_AA)
    cv2.putText(frame, str(counter), (30, 190), 
                cv2.FONT_HERSHEY_SIMPLEX, 1.5, BRAND_PURPLE, 4, cv2.LINE_AA)
                
    cv2.putText(frame, "STATUS:", (30, 230), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, BLACK, 1, cv2.LINE_AA)
    
    status_color = (0, 200, 0) if str(status).lower() == 'true' else (0, 0, 255)
    cv2.putText(frame, str(status).upper(), (110, 230), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, status_color, 2, cv2.LINE_AA)

    return frame
