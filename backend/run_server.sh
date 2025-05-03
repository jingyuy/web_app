#!/bin/bash

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Python3 is not installed. Please install Python3 first."
    exit 1
fi

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run the FastAPI server
echo "Starting FastAPI server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000
