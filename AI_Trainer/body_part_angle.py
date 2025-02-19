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
