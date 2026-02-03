@echo off
REM WP to DOCX Converter - Startup Script
REM This script starts both the frontend and backend servers

echo Starting WP to DOCX Converter...
echo.

REM Start Backend
echo Starting Backend (FastAPI on port 8001)...
start "Backend - FastAPI" cmd /k "cd d:\Github\LO-WDP-TO-DOCX-CONVERTER\backend && .\venv\Scripts\activate && python main.py"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend (Vite on port 5173)...
start "Frontend - Vite" cmd /k "cd d:\Github\LO-WDP-TO-DOCX-CONVERTER\frontend && npm run dev"

REM Wait for frontend to start
timeout /t 3 /nobreak

REM Open browser
echo Opening application in browser...
start http://localhost:5173

echo.
echo ========================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8001
echo ========================================
echo.
echo Press CTRL+C in either terminal to stop