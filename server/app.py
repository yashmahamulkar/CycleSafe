from flask import Flask, jsonify, request, send_from_directory
import os
import cv2
from ultralytics import YOLO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load YOLO model
model = YOLO('best.pt')

# Client folder paths
CLIENT_FOLDER = '../client/public/videos'  # Change this to your React app's videos directory
UPLOAD_FOLDER = 'uploads'  # Directory where uploaded videos are saved

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CLIENT_FOLDER, exist_ok=True)
@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify(message='No video file provided'), 400

    video = request.files['video']
    video_path = os.path.join(UPLOAD_FOLDER, video.filename)
    video.save(video_path)

    # Process the video and get the output path
    output_video_path = process_video(video_path)

    # Construct the URL to access the processed video
    output_video_url = f"/videos/{os.path.basename(output_video_path)}"  # Change to reflect new location
    return jsonify(message='Video processed successfully', output_video=output_video_url)

@app.route('/videos/<path:filename>', methods=['GET'])
def serve_processed_video(filename):
    return send_from_directory(CLIENT_FOLDER, filename)

def process_video(video_path):
    # Ensure the output path is in the CLIENT_FOLDER
    output_path = os.path.join(CLIENT_FOLDER, 'processed_' + os.path.basename(video_path))
    cap = cv2.VideoCapture(video_path)

    # Check if video capture was successful
    if not cap.isOpened():
        print(f"Error opening video file: {video_path}")
        return None

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Codec for MP4 files
    out = cv2.VideoWriter(output_path, fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results_frame = model(frame)  # Get results from the model

        # Process results and draw boxes
        for result in results_frame:
            if hasattr(result, 'boxes'):
                boxes = result.boxes.xyxy.cpu().numpy()  # Access boxes correctly
                for box in boxes:
                    x1, y1, x2, y2 = map(int, box)  # Convert to integers
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)

        out.write(frame)  # Write the frame with detections

    cap.release()
    out.release()

    # Check if output_path exists after processing
    if os.path.exists(output_path):
        print(f"Processed video saved at: {output_path}")
    else:
        print(f"Error: Processed video not saved at: {output_path}")

    return output_path

if __name__ == '__main__':
    app.run(debug=True, port=5000)
