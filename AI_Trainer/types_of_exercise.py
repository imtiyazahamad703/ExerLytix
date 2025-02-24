from body_part_angle import BodyPartAngle

class TypeOfExercise(BodyPartAngle):
    def __init__(self, landmarks):
        super().__init__(landmarks)

    def bicep_curl(self, counter, status):
        left_arm_angle = self.angle_of_the_left_arm()
        right_arm_angle = self.angle_of_the_right_arm()
        avg_arm_angle = (left_arm_angle + right_arm_angle) / 2

        if status:
            if avg_arm_angle < 45:
                counter += 1
                status = False
        else:
            if avg_arm_angle > 150:
                status = True

        return [counter, status]

    def push_up(self, counter, status):
        left_arm_angle = self.angle_of_the_left_arm()
        right_arm_angle = self.angle_of_the_right_arm()
        avg_arm_angle = (left_arm_angle + right_arm_angle) / 2

        if status:
            if avg_arm_angle < 70:
                counter += 1
                status = False
        else:
            if avg_arm_angle > 160:
                status = True

        return [counter, status]

    def calculate_exercise(self, exercise_type, counter, status):
        if exercise_type == "bicep-curl":
            counter, status = self.bicep_curl(counter, status)
        elif exercise_type == "push-up":
            counter, status = self.push_up(counter, status)

        return [counter, status]
