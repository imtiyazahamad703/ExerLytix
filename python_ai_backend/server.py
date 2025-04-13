from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import mediapipe as mp
import time
import os
import requests
import threading
from types_of_excercise import TypeOfExercise
from utils import score_table

app = Flask(__name__)
CORS(app)

# Global State for the active session
session_state = {
    'running': False,
    'exercise': None,
    'user_id': 1,
    'count': 0,
    'calories': 0,
    'start_time': None,
    'status': True,
    'lock': threading.Lock()
}

cap = None
pose_estimator = None

CALORIE_MULTIPLIERS = {
    "push-up": 0.5,
    "pull-up": 1.0,
    "squat": 0.8,
    "walk": 0.1,
    "sit-up": 0.4,
    "bicep": 0.3,
    "shoulder-raise": 0.3,
    "shoulder-press": 0.4,
    "chest-fly": 0.3,
    "lunge": 0.6
}

@app.route('/set_user', methods=['POST'])
def set_user():
    try:
        data = request.get_json(force=True)
        with session_state['lock']:
            session_state['user_id'] = int(data.get('user_id', 1))
        print(f"✅ Active user set to: {session_state['user_id']}")
        return jsonify({"message": "User ID set successfully", "user_id": session_state['user_id']}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/run-python', methods=['POST'])
def run_python():
    global cap, pose_estimator
    try:
        data = request.get_json()
        exercise_type = data.get('exercise_type', 'pull-up')

        with session_state['lock']:
            if session_state['running']:
                return jsonify({"error": "Tracker is already running"}), 400

            session_state['running'] = True
            session_state['exercise'] = exercise_type
            session_state['count'] = 0
            session_state['calories'] = 0
            session_state['status'] = True
            session_state['start_time'] = time.time()

        if cap is None or not cap.isOpened():
            cap = cv2.VideoCapture(0)
            cap.set(3, 1280)
            cap.set(4, 720)
            
        if pose_estimator is None:
            mp_pose = mp.solutions.pose
            pose_estimator = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

        return jsonify({'message': f'{exercise_type} started'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_frames():
    global cap, pose_estimator
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose

    while True:
        with session_state['lock']:
            running = session_state['running']
            exercise_type = session_state['exercise']
            current_count = session_state['count']
            current_status = session_state['status']
            
        if not running or cap is None or not cap.isOpened():
            # If not running, yield a black frame or just break?
            # Better to yield a placeholder or break
            time.sleep(0.1)
            continue

        ret, frame = cap.read()
        if not ret:
            time.sleep(0.1)
            continue

        frame = cv2.resize(frame, (1280, 720))
        frame = cv2.flip(frame, 1) # mirror for user convenience
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_rgb.flags.writeable = False
        results = pose_estimator.process(frame_rgb)
        frame_rgb.flags.writeable = True

        new_count = current_count
        new_status = current_status

        if results.pose_landmarks:
            try:
                landmarks = results.pose_landmarks.landmark
                exercise = TypeOfExercise(landmarks)
                new_count, new_status = exercise.calculate_exercise(exercise_type, current_count, current_status)
                
                mp_drawing.draw_landmarks(
                    frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                    mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
                    mp_drawing.DrawingSpec(color=(174, 139, 45), thickness=2, circle_radius=2)
                )
            except Exception as e:
                pass

        # Update state
        with session_state['lock']:
            session_state['count'] = new_count
            session_state['status'] = new_status
            mult = CALORIE_MULTIPLIERS.get(exercise_type, 0.5)
            session_state['calories'] = round(new_count * mult, 2)
            
        # Draw the score table onto the frame (Optional, since we show it in React now, but nice as fallback)
        frame = score_table(exercise_type, frame, new_count, new_status)
        
        # Encode
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/exercise-stats', methods=['GET'])
def get_stats():
    with session_state['lock']:
        duration = 0
        if session_state['running'] and session_state['start_time']:
            duration = round(time.time() - session_state['start_time'], 2)
            
        return jsonify({
            "running": session_state['running'],
            "exercise": session_state['exercise'],
            "count": session_state['count'],
            "calories": session_state['calories'],
            "duration": duration
        })

@app.route('/stop-python', methods=['POST'])
def stop_python():
    global cap, pose_estimator
    try:
        with session_state['lock']:
            if not session_state['running']:
                return jsonify({'message': 'No script running'}), 400
                
            exercise = session_state['exercise']
            count = session_state['count']
            user_id = session_state['user_id']
            duration = round(time.time() - session_state['start_time'], 2) if session_state['start_time'] else 60

            session_state['running'] = False
            session_state['exercise'] = None
            session_state['count'] = 0
            session_state['calories'] = 0

        # Release Camera
        if cap:
            cap.release()
            cap = None
            
        if pose_estimator:
            pose_estimator.close()
            pose_estimator = None

        payload = {
            "userId": user_id,
            "exercise": exercise,
            "count": count,
            "duration": duration
        }
        print(f"📤 Sending final data: {payload}")

        try:
            backend_url = os.environ.get("JAVA_BACKEND_URL", "http://localhost:8081")
            requests.post(f"{backend_url}/api/exercise/update", json=payload, timeout=5)
            print("✅ Data sent successfully to backend!")
        except Exception as e:
            print(f"❌ Backend update failed: {e}")

        return jsonify({'message': f"Stopped & data saved for: {exercise}"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True, threaded=True)
