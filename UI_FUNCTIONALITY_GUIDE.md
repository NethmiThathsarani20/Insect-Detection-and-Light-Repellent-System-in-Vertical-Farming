# UI Functionality Guide

## Overview
This guide explains how the UI components work together to provide real-time insect detection monitoring with captured image display.

## Key Features Implemented

### 1. Camera Source Switching (ESP32-CAM / Webcam)
The UI provides two buttons to switch between camera sources:

#### ESP32-CAM Button
- **Function**: Switches to ESP32-CAM as the video source
- **Backend Endpoint**: `GET /switch_source/esp32`
- **Behavior**: 
  - Sets active source to ESP32-CAM
  - Releases webcam if it was active
  - ESP32-CAM sends images via `POST /detect` endpoint

#### Webcam Button
- **Function**: Switches to local webcam as the video source
- **Backend Endpoint**: `GET /switch_source/webcam`
- **Behavior**:
  - Attempts to open webcam (tries index 0, then 1 if 0 fails)
  - Starts background thread to process webcam frames
  - Shows error alert if webcam cannot be opened
  - Processes frames at ~10 FPS for detection

### 2. Image Capture on Detection

#### How It Works
Instead of continuous video streaming, the system:

1. **Monitors for insects** using YOLOv11n model (confidence threshold: 45%)
2. **Waits for confirmation** (5 seconds) to avoid false positives
3. **Captures and saves image** when insect is confirmed:
   - Image saved to `detected_images/` directory
   - Filename format: `{pest_name}_{timestamp}.jpg`
   - Timestamp includes milliseconds to prevent collisions
   - Example: `Aphids_20251228_162345_123.jpg`
4. **Converts to base64** for efficient transmission to frontend
5. **Sends image with status** via `/get_status` endpoint

#### Display Behavior
- **Active Detection**: Shows captured image with bounding boxes and pest information
- **No Detection**: Shows placeholder icon with monitoring message
- **Previous Detection**: Shows last detected pest info (image persists until new detection)

### 3. Detection Information Display

The UI displays comprehensive information about detected insects:

#### Active Detection Panel
- **Detected Pest**: Name of the insect (Aphids, Mites, RedSpider, Thrips, Whitefly)
- **Confidence Level**: Detection confidence percentage
- **Date & Time**: When the insect was detected
- **LED Repellent**: Color and pattern being used for treatment
  - Blue LED: For Aphids, Mites, Red Spider
  - Red LED: For Thrips, Whitefly
  - Purple LED: Default/Growth mode (no pest)

### 4. Real-time Status Updates

The frontend polls the backend every 500ms to:
- Get current detection status
- Receive latest captured image (if any)
- Update treatment timer
- Create alert notifications for new detections
- Update detection history

### 5. Alert System

When a new insect is detected:
- **Alert Notification** appears at the top of the screen
- Shows pest name, confidence, and timestamp
- Can be dismissed by clicking the close button
- Multiple alerts can stack for different detections

### 6. Detection History

Maintains a log of recent detections:
- Stores last 10 detections
- Shows pest name, confidence, date, and time
- Helps track pest activity patterns

## Technical Architecture

### Backend (server.py)

#### Endpoints
- `GET /` - Serve HTML dashboard
- `POST /detect` - Receive images from ESP32-CAM
- `GET /switch_source/<source>` - Switch camera source
- `GET /get_status` - Get system status and image data
- `GET /detected_image/<filename>` - Serve specific captured image

#### Detection Logic Flow
```
1. Receive frame (from ESP32-CAM POST or webcam)
2. Run YOLOv11n inference (conf=0.45)
3. If pest detected:
   - Start 5-second confirmation timer
   - If still detected after 5 seconds:
     - Save image with timestamp
     - Encode to base64
     - Set treatment pattern
     - Start 20-minute treatment timer
4. Return pattern to ESP32 for LED control
```

#### Key Variables
- `active_source`: Current camera source ('esp32' or 'webcam')
- `latest_detection_image_base64`: Base64 encoded detected image
- `current_pest_name`: Currently detected pest
- `current_confidence`: Detection confidence (0-100)
- `is_treatment_active`: Whether treatment is running
- `treatment_end_time`: When current treatment ends

### Frontend (React)

#### Components
1. **Navbar**: Shows system status and branding
2. **SourceSelector**: Buttons to switch between ESP32-CAM and Webcam
3. **DetectedInsectDisplay** (VideoFeed.js): Shows captured insect image
4. **AnalysisPanel**: Shows current detection and pattern
5. **Timer**: Countdown for active treatment
6. **AlertNotification**: Pop-up alerts for new detections
7. **DetectionHistory**: List of recent detections

#### State Management
- `detectionImage`: Base64 image data from backend
- `currentDetection`: Active detection object
- `detectionHistory`: Array of recent detections
- `currentSource`: Active camera source
- `isActive`: Treatment active status
- `remainingTime`: Treatment countdown

## Usage Instructions

### Starting the System

1. **Start Backend Server**:
   ```bash
   python server.py
   # Server runs on http://localhost:5000
   ```

2. **Start React Frontend**:
   ```bash
   cd frontend
   npm install  # First time only
   npm start
   # Frontend runs on http://localhost:3000
   ```

### Switching Camera Sources

1. Click **ESP32-CAM** button to use ESP32 camera
   - Ensure ESP32 is configured to POST to `/detect` endpoint
   
2. Click **Webcam** button to use local camera
   - Grant camera permissions if prompted
   - Check browser console for errors if webcam doesn't start

### Monitoring Detections

1. System continuously monitors active camera source
2. When insect detected, image appears in main display area
3. Alert notification appears at top
4. Detection info shows pest name, confidence, and LED color
5. Treatment timer starts for 20 minutes
6. Image persists until next detection

### Troubleshooting

#### Webcam Not Working
- Check if camera is connected
- Verify camera is not used by another app
- Try different browser (Chrome/Edge recommended)
- Check browser permissions

#### ESP32-CAM Not Detecting
- Verify ESP32 is POSTing to correct URL
- Check network connectivity
- Verify model file (best.pt) is present
- Check backend console for errors

#### No Image Displayed
- Check `detected_images/` directory exists
- Verify Python has write permissions
- Check browser console for errors
- Ensure backend is sending base64 data in `/get_status`

## Image Storage

- **Directory**: `detected_images/`
- **Format**: JPEG with bounding boxes drawn
- **Naming**: `{pest_name}_{YYYYMMDD_HHMMSS_mmm}.jpg`
- **Retention**: Images persist indefinitely (manual cleanup needed)
- **Git**: Directory is gitignored (not committed to repository)

## Performance Notes

- **Webcam Processing**: ~10 FPS
- **Status Polling**: Every 500ms (2 Hz)
- **Detection Confirmation**: 5 seconds
- **Treatment Duration**: 20 minutes
- **Image Encoding**: Base64 for web transmission
- **Model**: YOLOv11n (Nano) - fast and lightweight

## Security Considerations

1. **CORS Enabled**: Allow React frontend to communicate with Flask backend
2. **Local Network**: Designed for local/LAN deployment
3. **No Authentication**: Add authentication for production use
4. **File Storage**: Images stored locally, no cloud upload
5. **API Exposure**: All endpoints publicly accessible on local network

## Future Enhancements

Potential improvements:
- Add video recording for detected events
- Cloud storage for images
- Email/SMS alerts
- Historical data analytics
- Multi-camera support
- User authentication
- Mobile app integration
- Automatic image cleanup
