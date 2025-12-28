@echo off
REM Setup script for Windows
REM This script creates the virtual environment and installs dependencies

echo 🐛 Setting up Insect Detection System...

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    exit /b 1
)

REM Create virtual environment
echo 📦 Creating virtual environment...
python -m venv .venv

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call .venv\Scripts\activate.bat

REM Upgrade pip
echo ⬆️ Upgrading pip...
python -m pip install --upgrade pip

REM Install requirements
echo 📥 Installing Python dependencies...
pip install -r requirements.txt

echo ✅ Backend setup complete!
echo.
echo To activate the virtual environment in the future:
echo   .venv\Scripts\activate
echo.
echo To start the backend server:
echo   python server.py
echo.
echo For frontend setup, see the README.md file.
pause
