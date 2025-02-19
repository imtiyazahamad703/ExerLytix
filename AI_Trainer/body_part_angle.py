from utils import get_landmark_coords, calculate_angle

class BodyPartAngle:
    def __init__(self, landmarks):
        self.landmarks = landmarks

    def angle_of_the_left_arm(self):
        l_shoulder = get_landmark_coords(self.landmarks, "LEFT_SHOULDER")
        l_elbow = get_landmark_coords(self.landmarks, "LEFT_ELBOW")
        l_wrist = get_landmark_coords(self.landmarks, "LEFT_WRIST")
        return calculate_angle(l_shoulder, l_elbow, l_wrist)
    
    def angle_of_the_right_arm(self):
        r_shoulder = get_landmark_coords(self.landmarks, "RIGHT_SHOULDER")
        r_elbow = get_landmark_coords(self.landmarks, "RIGHT_ELBOW")
        r_wrist = get_landmark_coords(self.landmarks, "RIGHT_WRIST")
        return calculate_angle(r_shoulder, r_elbow, r_wrist)

    def angle_of_the_left_leg(self):
        l_hip = get_landmark_coords(self.landmarks, "LEFT_HIP")
        l_knee = get_landmark_coords(self.landmarks, "LEFT_KNEE")
        l_ankle = get_landmark_coords(self.landmarks, "LEFT_ANKLE")
        return calculate_angle(l_hip, l_knee, l_ankle)

    def angle_of_the_right_leg(self):
        r_hip = get_landmark_coords(self.landmarks, "RIGHT_HIP")
        r_knee = get_landmark_coords(self.landmarks, "RIGHT_KNEE")
        r_ankle = get_landmark_coords(self.landmarks, "RIGHT_ANKLE")
        return calculate_angle(r_hip, r_knee, r_ankle)
