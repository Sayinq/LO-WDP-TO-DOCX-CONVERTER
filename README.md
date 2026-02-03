# WP to DOCX Converter

A full-stack web application for converting WordPerfect files to DOCX format while preserving document structure, spacing, and formatting.

## Features

- Upload WordPerfect files (.wp, .wpd, .wpc, .wpt, .frm)
- Select output font from dropdown
- Preserves document structure (paragraph spacing, line spacing)
- Real-time conversion feedback
- Download converted DOCX file

## Tech Stack

**Frontend:**
- Vite (build tool)
- React (UI framework)
- Tailwind CSS (styling)

**Backend:**
- FastAPI (REST API)
- LibreOffice (WP to ODT conversion)
- python-docx (ODT to DOCX conversion)

## Prerequisites

- Node.js (for frontend)
- Python 3.8+ (for backend)
- LibreOffice (for file conversion)

### Install LibreOffice

**Windows:**
Download and install from https://www.libreoffice.org/download/download/

**macOS:**
\\\ash
brew install libreoffice
\\\

**Linux:**
\\\ash
sudo apt-get install libreoffice
\\\

## Installation

### Backend Setup

\\\ash
cd backend
python -m venv venv
# Windows
.\\venv\\Scripts\\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
\\\

### Frontend Setup

\\\ash
cd frontend
npm install
\\\

## Running the Application

### Start Backend

\\\ash
cd backend
# Windows
.\\venv\\Scripts\\activate
# macOS/Linux
source venv/bin/activate

python main.py
\\\

Backend will be available at http://localhost:8000

### Start Frontend (in new terminal)

\\\ash
cd frontend
npm run dev
\\\

Frontend will be available at http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Click the upload area and select a WordPerfect file
3. Choose desired font from dropdown
4. Click 'Convert to DOCX'
5. Download will start automatically

## API Documentation

### POST /convert

Converts a WordPerfect file to DOCX format.

**Parameters:**
- \ile\ (multipart/form-data): The WordPerfect file to convert
- \ont\ (form): Font name to apply (default: Arial)

**Response:**
- Returns DOCX file as binary

**Example:**
\\\ash
curl -X POST http://localhost:8000/convert \\
  -F 'file=@document.wp' \\
  -F 'font=Arial' \\
  --output converted.docx
\\\

## Project Structure

\\\
.
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   └── FontSelector.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── backend/               # FastAPI backend
    ├── main.py
    ├── requirements.txt
    └── venv/
\\\

## Troubleshooting

### LibreOffice command not found
Ensure LibreOffice is installed and added to PATH. On Windows, you may need to use the full path to soffice.exe.

### CORS errors
Make sure backend is running on http://localhost:8000 and frontend on http://localhost:5173

### File conversion fails
- Check LibreOffice installation
- Ensure file format is supported (.wp, .wpd, .wpc)
- Check backend logs for detailed error messages

## License

MIT
