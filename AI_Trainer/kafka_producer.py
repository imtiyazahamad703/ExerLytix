# kafka_producer.py
from kafka import KafkaProducer
import json
import time

# -------------------------------
# Kafka configuration
# -------------------------------
KAFKA_BOOTSTRAP_SERVERS = ['localhost:9092']  # your Kafka broker
TOPIC_NAME = 'exercise'

# Create a Kafka producer
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# -------------------------------
# Function to send exercise data
# -------------------------------
def send_exercise_data(user_id, exercise_type, count, elapsed_time, start_time):
    """
    Publish exercise data to Kafka topic
    """
    data = {
        "user_id": user_id,
        "exercise_type": exercise_type,
        "count": count,
        "elapsed_time": elapsed_time,
        "start_time": start_time,
        "timestamp": int(time.time())
    }

    try:
        producer.send(TOPIC_NAME, value=data)
        producer.flush()  # ensure it's sent immediately
        print(f"Published to Kafka: {data}")
    except Exception as e:
        print(f"Error publishing to Kafka: {e}")
