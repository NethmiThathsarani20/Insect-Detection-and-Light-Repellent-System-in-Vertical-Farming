# Installation Guide - Quick Setup

This guide will help you install all dependencies and set up the environment to run the Insect Detection System UI.

## Prerequisites

You need to have these installed on your computer:
- **Python 3.8 or higher** - [Download](https://www.python.org/downloads/)
- **Node.js 14 or higher** - [Download](https://nodejs.org/)

## Installation Steps

### Step 1: Install Backend Dependencies (Python)

#### Option A: Automated Installation (Recommended)

**For Windows:**
```bash
setup.bat
```

**For Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

#### Option B: Manual Installation

**For Windows:**
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
.venv\Scripts\activate

# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt
```

**For Linux/macOS:**
```bash
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Install Frontend Dependencies (Node.js)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Go back to project root
cd ..
```

## Running the Application

You need to run both the backend server and frontend application.

### Step 1: Start Backend Server

Open a terminal/command prompt:

**For Windows:**
```bash
# Activate virtual environment
.venv\Scripts\activate

# Start server
python server.py
```

**For Linux/macOS:**
```bash
# Activate virtual environment
source .venv/bin/activate

# Start server
python server.py
```

You should see: `Running on http://127.0.0.1:5000`

### Step 2: Start Frontend Application

Open a **new** terminal/command prompt (keep the backend running):

```bash
# Navigate to frontend folder
cd frontend

# Start React app
npm start
```

Your browser will automatically open at `http://localhost:3000` and show the UI!

## Access the Application

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Verify Everything is Working

You should see the **Smart Pest Management System** dashboard with:
- ✅ System status showing "System Online"
- ✅ Monitoring panel with insect detection display
- ✅ Video input source selector (ESP32-CAM/Webcam)
- ✅ Real-time analysis panel
- ✅ Treatment timer
- ✅ Detection history panel

## Troubleshooting

### Backend Issues

**Problem: "Python not found"**
- Make sure Python is installed
- Try using `python3` instead of `python`

**Problem: "ModuleNotFoundError"**
- Make sure virtual environment is activated
- Reinstall: `pip install -r requirements.txt`

**Problem: "best.pt not found"**
- Ensure the `best.pt` YOLOv11n model file is in the project root folder

### Frontend Issues

**Problem: "npm command not found"**
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

**Problem: npm install fails**
- Delete `frontend/node_modules` and `frontend/package-lock.json`
- Run `npm install` again
- If still failing: `npm install --legacy-peer-deps`

**Problem: Port 3000 already in use**
- Stop any other applications using port 3000
- Or the app will ask to use a different port (press Y)

## Stopping the Application

Press `Ctrl+C` in each terminal to stop the servers.

## Next Steps

Once running, you can:
- 🎥 Switch between ESP32-CAM and Webcam input sources
- 🐛 System will detect insects automatically using AI
- 🚨 Get alerts when insects are detected
- 📊 View detection history with confidence levels
- 💡 See LED repellent patterns activate based on insect type

---

**Need Help?** Check the [README.md](README.md) for more details about the system features and configuration.
