# VS Code Installation Guide - Complete Setup

This guide will help you install all dependencies correctly in VS Code for the Insect Detection and Light Repellent System.

## 📋 Prerequisites

Before starting, make sure you have:
- **Python 3.8 or higher** ([Download here](https://www.python.org/downloads/))
- **Node.js 14 or higher** ([Download here](https://nodejs.org/))
- **VS Code** ([Download here](https://code.visualstudio.com/))
- **Git** ([Download here](https://git-scm.com/downloads))

## 🚀 Step-by-Step Installation

### Step 1: Open Project in VS Code

1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to and select the project folder: `Insect-Detection-and-Light-Repellent-System-in-Vertical-Farming`

### Step 2: Install Recommended VS Code Extensions

When you open the project, VS Code will prompt you to install recommended extensions. Click **Install All**.

If the prompt doesn't appear:
1. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac) to open Extensions
2. Search and install these extensions:
   - **Python** (by Microsoft)
   - **Pylance** (by Microsoft)
   - **Prettier - Code formatter** (by Prettier)

### Step 3: Install Backend Dependencies (Python)

#### Option A: Using the Automated Setup Script (Recommended)

**For Windows:**
1. Open VS Code Terminal: `Ctrl+`` (backtick) or **Terminal** → **New Terminal**
2. Run the setup script:
   ```bash
   setup.bat
   ```

**For Linux/macOS:**
1. Open VS Code Terminal: `Ctrl+`` (backtick) or **Terminal** → **New Terminal**
2. Make the script executable and run it:
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

### Step 4: Select Python Interpreter in VS Code

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: **Python: Select Interpreter**
3. Select the interpreter from `.venv` folder:
   - Windows: `.venv\Scripts\python.exe`
   - Linux/macOS: `.venv/bin/python`

Alternatively, click on the Python version in the bottom-left status bar and select the `.venv` interpreter.

### Step 5: Install Frontend Dependencies (React)

1. In VS Code Terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Return to the project root:
   ```bash
   cd ..
   ```

## ✅ Verify Installation

### Check Backend Installation

1. Make sure virtual environment is activated (you should see `(.venv)` in your terminal)
2. Run:
   ```bash
   python server.py
   ```
3. You should see: `Running on http://127.0.0.1:5000`
4. Press `Ctrl+C` to stop the server

### Check Frontend Installation

1. Navigate to frontend:
   ```bash
   cd frontend
   ```

2. Start the React app:
   ```bash
   npm start
   ```

3. Your browser should open automatically at `http://localhost:3000`
4. You should see the **Smart Pest Management System** UI
5. Press `Ctrl+C` in terminal to stop the frontend

## 🎯 Running the Complete Application

### Terminal 1 - Start Backend:
```bash
# Activate virtual environment (if not already activated)
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate

python server.py
```

### Terminal 2 - Start Frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔧 Troubleshooting

### Issue: "Python not found" or "python is not recognized"

**Solution:**
- Ensure Python is installed and added to PATH
- Try using `python3` instead of `python`
- Restart VS Code after installing Python

### Issue: Virtual environment not activating

**Solution:**

**Windows PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.venv\Scripts\Activate.ps1
```

**Windows CMD:**
```cmd
.venv\Scripts\activate.bat
```

**Linux/macOS:**
```bash
source .venv/bin/activate
```

### Issue: "npm command not found"

**Solution:**
- Install Node.js from https://nodejs.org/
- Restart VS Code after installation
- Verify installation: `node --version` and `npm --version`

### Issue: ModuleNotFoundError when running server.py

**Solution:**
- Ensure virtual environment is activated
- Reinstall requirements: `pip install -r requirements.txt`
- Check you're using the correct Python interpreter in VS Code

### Issue: Frontend dependencies installation fails

**Solution:**
- Delete `frontend/node_modules` folder and `frontend/package-lock.json`
- Run `npm install` again
- If still failing, try: `npm install --legacy-peer-deps`

### Issue: Model file not found

**Solution:**
- Ensure the `best.pt` file is in the project root directory
- This is the YOLOv8 trained model file

## 📚 Additional Resources

- **Detailed VS Code Setup**: See [VSCODE_SETUP.md](VSCODE_SETUP.md)
- **Project Features**: See [FEATURES.md](FEATURES.md)
- **System Check**: See [SYSTEM_CHECK_REPORT.md](SYSTEM_CHECK_REPORT.md)
- **Full Documentation**: See [README.md](README.md)

## 💡 Quick Tips

1. **Auto-activate virtual environment**: VS Code settings are configured to auto-select the interpreter, but manual activation is disabled for faster startup
2. **Multiple terminals**: Use VS Code's split terminal feature (click the `+` dropdown → Split Terminal)
3. **Debugging**: Use VS Code's built-in debugger (F5) for Python debugging
4. **File watching**: Virtual environment and node_modules are excluded for better performance

## ✨ You're All Set!

Once both servers are running, you can:
- 👁️ Monitor for insect detections in real-time
- 📹 Switch between ESP32-CAM and webcam sources
- 🚨 Receive alerts when insects are detected
- 📊 View detection history and confidence levels
- 💡 See LED repellent patterns activate automatically

Happy coding! 🐛🔬
