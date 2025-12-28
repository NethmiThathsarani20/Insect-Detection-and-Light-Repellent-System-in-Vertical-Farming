# Insect Detection and Light Repellent System in Vertical Farming

A professional IoT system for detecting insects in vertical farming environments using ESP32-CAM and automated LED light repellent system. This project features a modern React UI for real-time monitoring and control.

## Features

- 🔍 **Real-time Insect Detection**: AI-powered detection using YOLOv11n
- 📹 **Dual Camera Support**: ESP32-CAM and Webcam input
- 🚨 **Alert System**: Instant notifications when insects are detected
- 🖼️ **Detection Display**: Shows detected insect information with details
- 💡 **Automated LED Repellent**: Smart LED light control based on detected insect species
- 📊 **Detection Analytics**: Track detection history with confidence levels
- 🎨 **Professional UI**: Modern, responsive React interface
- ⏱️ **Treatment Timer**: Visual countdown for active repellent treatments

## System Architecture

### Backend (Flask + Python)
- YOLOv11n model for insect detection
- Real-time video processing
- REST API endpoints for frontend communication
- Support for ESP32-CAM and webcam

### Frontend (React)
- Professional, attractive dashboard
- Detection display showing insect information
- Alert notifications
- Detection history tracking
- LED status indicators
- Responsive design

### Detected Insects
- Aphids → Blue LED repellent
- Mites → Blue LED repellent
- Red Spider → Blue LED repellent
- Thrips → Red LED repellent
- Whitefly → Red LED repellent

## Installation

📘 **[Quick Installation Guide →](INSTALLATION.md)** - Complete setup instructions with troubleshooting

### Prerequisites
- Python 3.8+
- Node.js 14+

**Optional:** For VS Code users, see [VSCODE_SETUP.md](VSCODE_SETUP.md) for editor optimization tips

### Backend Setup

Run automated setup script:

**Windows:** `setup.bat`  
**Linux/macOS:** `./setup.sh`

Or manually:
```bash
# Create virtual environment
python -m venv .venv

# Activate (Windows: .venv\Scripts\activate, Linux/macOS: source .venv/bin/activate)
# Then install dependencies
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
# Activate virtual environment first
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate

python server.py
```

Backend runs on `http://localhost:5000`

### Start React Frontend

In a new terminal:

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000`

### For Production Build

```bash
cd frontend
npm run build
```

## API Endpoints

- `GET /` - Serve the original HTML dashboard
- `POST /detect` - Receive images from ESP32-CAM
- `GET /video_feed` - Stream processed video feed
- `GET /get_status` - Get current system status
- `GET /switch_source/<source>` - Switch between ESP32 and webcam

## Configuration

### Backend
- Edit `server.py` to configure:
  - Model path
  - Detection confidence threshold
  - Treatment duration
  - Confirmation delay

### Frontend
- Edit `frontend/.env` to configure:
  - API URL: `REACT_APP_API_URL=http://localhost:5000`

## ESP32-CAM Integration

The ESP32-CAM should POST images to the `/detect` endpoint:

```cpp
// Example ESP32 code snippet
http.begin("http://YOUR_SERVER_IP:5000/detect");
http.addHeader("Content-Type", "multipart/form-data");
// Send image data
int httpResponseCode = http.POST(imageData);
```

## LED Repellent Logic

- **Growth Mode (Purple)**: Default state, optimal for plant photosynthesis
- **Repellent Mode (Blue)**: Activated for Aphids, Mites, Red Spider
- **Visual Masking (Red)**: Activated for Thrips, Whitefly

## Project Structure

```
.
├── server.py              # Flask backend server
├── best.pt               # YOLOv11n trained model
├── index.html            # Original HTML dashboard
├── frontend/             # React application
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── Navbar.js
│   │   │   ├── VideoFeed.js
│   │   │   ├── SourceSelector.js
│   │   │   ├── AnalysisPanel.js
│   │   │   ├── Timer.js
│   │   │   ├── AlertNotification.js
│   │   │   └── DetectionHistory.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env
└── README.md
```

## Screenshots

The React UI features:
- Professional navigation bar with system status
- Detection display panel showing current/recent detections
- Real-time analysis panel
- Alert notifications when insects are detected
- Detection history with confidence levels and timestamps
- Treatment timer countdown
- LED repellent color indicators
- Responsive design for all devices

## Future Enhancements

- Historical data analytics
- Multiple camera support
- Mobile app integration
- Cloud storage for detection logs
- Machine learning model retraining interface

## License

This is an undergraduate research project for educational purposes.

## Contributors

Faculty of Engineering Technology

---

For issues or questions, please create an issue in the repository.
