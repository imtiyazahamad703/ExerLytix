import cv2
import mediapipe as mp

# Initialize mediapipe pose class
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Setup webcam video capture
cap = cv2.VideoCapture(0)
cap.set(3, 800)  # width
cap.set(4, 480)  # height

print("Press 'q' to quit.")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
        
    cv2.imshow('ExerLytix Video Feed', frame)
    
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
