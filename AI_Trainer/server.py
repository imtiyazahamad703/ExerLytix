from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import signal

app = Flask(__name__)
CORS(app)  # Enable CORS

process = None  # Store running process

@app.route('/run-python', methods=['POST'])
def run_python():
    global process
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 415

        data = request.get_json()
        exercise_type = data.get('exercise_type', 'pull-up')

        process = subprocess.Popen(
            ['python', 'main.py', '-t', exercise_type],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
        )

        return jsonify({'message': 'Script started', 'pid': process.pid})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/stop-python', methods=['POST'])
def stop_python():
    global process
    try:
        if process:
            os.kill(process.pid, signal.SIGTERM)  # Stop process
            process = None
            return jsonify({'message': 'Script stopped'})
        else:
            return jsonify({'message': 'No script running'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)  # Allow external access
