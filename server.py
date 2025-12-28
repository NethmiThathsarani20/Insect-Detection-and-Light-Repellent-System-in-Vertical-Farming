import os
import time
import cv2
import numpy as np
from flask import Flask, request, jsonify, render_template, Response
from flask_cors import CORS
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# --- CONFIGURATION ---
# Loading the uploaded model
model = YOLO("best (2).pt") 

# Class names based on your training data
PEST_CLASSES = ["Aphids", "Mites", "RedSpider", "Thrips", "Whitefly"]

# --- GLOBAL VARIABLES ---
global_frame = None
active_source = 'esp32'  # Options: 'esp32' or 'webcam'
webcam = None 

# --- TIMING & LOGIC VARIABLES ---
first_detection_time = None 
treatment_end_time = 0 
current_active_pattern = 1 # Default: 1 (Safe/Growth Mode)
current_pest_name = "None"
current_confidence = 0  # Store confidence level
is_treatment_active = False

# Constants
CONFIRMATION_DELAY = 5      # 5 Seconds to confirm pest
TREATMENT_DURATION = 20 * 60 # 20 Minutes

# --- 1. HOME PAGE ---
@app.route("/")
def index():
    return render_template("index.html")

# --- 2. SWITCH CAMERA SOURCE ---
@app.route("/switch_source/<source>")
def switch_source(source):
    global active_source, webcam
    active_source = source
    
    if source == 'webcam':
        if webcam is None:
            # Try index 0 or 1 if 0 doesn't work
            webcam = cv2.VideoCapture(0) 
    else:
        if webcam is not None:
            webcam.release()
            webcam = None
            
    return jsonify({"status": "success", "source": source})

# --- 3. ESP32 IMAGE RECEIVER (POST) ---
@app.route("/detect", methods=["POST"])
def detect():
    global global_frame
    
    # Only process POST data if ESP32 is the active source
    if active_source == 'esp32':
        if 'image' not in request.files:
            return jsonify({"error": "No image"}), 400

        file = request.files['image']
        img_bytes = file.read()
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Run Logic
        pattern = process_frame_logic(img)
        
        return jsonify({"pattern": pattern})
    
    # If webcam is active, just return current pattern to keep ESP32 lights updated
    return jsonify({"pattern": current_active_pattern})

# --- 4. CORE LOGIC (AI + TIMERS) ---
def process_frame_logic(img):
    global global_frame, first_detection_time, treatment_end_time 
    global current_active_pattern, current_pest_name, current_confidence, is_treatment_active

    # AI Inference
    results = model(img, conf=0.45)
    
    pest_found = False
    detected_pest = "None"
    detected_pattern = 1 # Default Safe (Purple/Growth)
    detected_confidence = 0

    # Draw Bounding Boxes
    for r in results:
        for box in r.boxes:
            # Draw Box
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            
            # Label and confidence
            cls_id = int(box.cls[0])
            confidence = float(box.conf[0])
            
            if cls_id < len(PEST_CLASSES):
                detected_pest = PEST_CLASSES[cls_id]
                detected_confidence = int(confidence * 100)
                pest_found = True
                
                # Visuals: Box and Label
                color = (0, 0, 255) # Red box
                cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
                cv2.putText(img, f"{detected_pest} {detected_confidence}%", (x1, y1 - 10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

                # --- SCIENTIFIC COLOR LOGIC ---
                # Case A: Aphids / Mites -> Blue (Repellent)
                if detected_pest in ["Aphids", "Mites", "RedSpider"]:
                    detected_pattern = 2
                # Case B: Thrips / Whiteflies -> Red (Masking)
                elif detected_pest in ["Thrips", "Whitefly"]:
                    detected_pattern = 4
                
                break 
        if pest_found: break

    # Update Global Frame for Video Feed
    global_frame = img

    # --- TIMER LOGIC ---
    current_time = time.time()
    
    # 1. Treatment is already running
    if current_time < treatment_end_time:
        is_treatment_active = True
        return current_active_pattern 

    is_treatment_active = False

    # 2. New Pest Detection
    if pest_found:
        if first_detection_time is None:
            first_detection_time = current_time
            # Waiting for confirmation...
            return 1 
        else:
            elapsed = current_time - first_detection_time
            if elapsed >= CONFIRMATION_DELAY:
                # 5 Seconds Passed -> ACTIVATE MODE
                current_active_pattern = detected_pattern
                current_pest_name = detected_pest
                current_confidence = detected_confidence
                treatment_end_time = current_time + TREATMENT_DURATION
                
                first_detection_time = None 
                return current_active_pattern
            else:
                return 1 # Still waiting
    else:
        # No Pest, No Active Treatment
        first_detection_time = None
        current_active_pattern = 1
        current_pest_name = "None"
        current_confidence = 0
        return 1

# --- 5. WEBCAM LOOP ---
def generate_frames():
    global global_frame, webcam, active_source
    
    while True:
        if active_source == 'webcam' and webcam is not None:
            success, frame = webcam.read()
            if success:
                process_frame_logic(frame)
        
        if global_frame is not None:
            try:
                ret, buffer = cv2.imencode('.jpg', global_frame)
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
            except Exception as e:
                pass
        
        time.sleep(0.05) 

# --- 6. ROUTES FOR UI DATA ---
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_status')
def get_status():
    remaining = 0
    if treatment_end_time > time.time():
        remaining = int(treatment_end_time - time.time())
        
    return jsonify({
        "pest": current_pest_name,
        "pattern": current_active_pattern,
        "confidence": current_confidence,
        "active": is_treatment_active,
        "remaining_time": remaining,
        "source": active_source
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)