import mediapipe as mp
import numpy as np

mp_pose = mp.solutions.pose

def calculate_angle(a, b, c):
    """
    Calculate the angle between three points a, b, c.
    Point b is the vertex of the angle.
    """
    a = np.array(a)  
    b = np.array(b)  
    c = np.array(c)  

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle

def get_landmark_coords(landmarks, part_name):
    """
    Get x, y, and visibility for a specific body part from mediapipe landmarks.
    """
    return [
        landmarks[mp_pose.PoseLandmark[part_name].value].x,
        landmarks[mp_pose.PoseLandmark[part_name].value].y,
        landmarks[mp_pose.PoseLandmark[part_name].value].visibility
    ]
