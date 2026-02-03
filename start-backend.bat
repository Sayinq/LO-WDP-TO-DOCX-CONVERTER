@echo off
REM Windows startup script for backend

cd backend
call venv\Scripts\activate
echo Starting FastAPI server on http://localhost:8000
python main.py
