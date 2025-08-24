from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import signal

app = Flask(__name__)
CORS(app)  # Enable CORS

# 🔹 Store processes by exercise type
processes = {}

@app.route('/run-python', methods=['POST'])
def run_python():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 415

        data = request.get_json()
        exercise_type = data.get('exercise_type', 'pull-up')

        # If already running, stop it first
        if exercise_type in processes and processes[exercise_type]:
            try:
                os.kill(processes[exercise_type].pid, signal.SIGTERM)
            except Exception:
                pass
            processes[exercise_type] = None

        # Start new process
        proc = subprocess.Popen(
            ['python', 'main.py', '-t', exercise_type],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )
        processes[exercise_type] = proc

        return jsonify({'message': f'{exercise_type} started', 'pid': proc.pid})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/stop-python', methods=['POST'])
def stop_python():
    try:
        stopped = []
        for exercise, proc in list(processes.items()):
            if proc and proc.poll() is None:  # still running
                os.kill(proc.pid, signal.SIGTERM)
                processes[exercise] = None
                stopped.append(exercise)

        if stopped:
            return jsonify({'message': f"Stopped: {', '.join(stopped)}"})
        else:
            return jsonify({'message': 'No script running'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/exercise-count', methods=['GET'])
def get_exercise_count():
    try:
        with open('exercise_counter.txt', 'r') as f:
            count = int(f.read().strip())
        return jsonify({"completed": count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
