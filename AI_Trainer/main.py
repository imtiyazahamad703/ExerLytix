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

# Setup mediapipe pose instance
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        # Convert frame to RGB for MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_rgb.flags.writeable = False
        
        # Process the frame and detect pose
        results = pose.process(frame_rgb)
        
        # Convert back to BGR for OpenCV
        frame_rgb.flags.writeable = True
        frame = cv2.cvtColor(frame_rgb, cv2.COLOR_RGB2BGR)
        
        # Extract landmarks if pose is detected
        try:
            landmarks = results.pose_landmarks.landmark
            # print("Landmarks detected!")
        except:
            pass
            
        # Draw the pose landmarks on the frame
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(174, 139, 45), thickness=2, circle_radius=2)
            )
            
        cv2.imshow('ExerLytix Video Feed', frame)
        
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
