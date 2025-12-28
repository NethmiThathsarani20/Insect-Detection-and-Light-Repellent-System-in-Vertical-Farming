#!/bin/bash

# Setup script for Linux/macOS
# For Windows users, please use setup.bat instead
# This script creates the virtual environment and installs dependencies

echo "🐛 Setting up Insect Detection System..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv .venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Backend setup complete!"
echo ""
echo "To activate the virtual environment in the future:"
echo "  source .venv/bin/activate"
echo ""
echo "To start the backend server:"
echo "  python server.py"
echo ""
echo "For frontend setup, see the README.md file."
