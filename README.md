# WP to DOCX Converter

A full-stack web application for converting WordPerfect files to DOCX format while preserving document structure, spacing, and formatting.

## Features

- ✅ Upload WordPerfect files (.wp, .wpd, .wpc, .wpt, .frm)
- ✅ Select output font from dropdown (Arial, Times New Roman, Courier New, Calibri, Verdana, Georgia)
- ✅ Preserves document structure (paragraph spacing, line spacing, formatting)
- ✅ Real-time conversion feedback
- ✅ Automatic DOCX download
- ✅ One-click startup script to run both frontend and backend

## Architecture

### Frontend (Vite + React + Tailwind CSS)
- **Why Vite**: Lightning-fast build tool with instant HMR, perfect for development
- **Why React**: Component-based UI with hooks for state management
- **Why Tailwind CSS**: Utility-first CSS framework for rapid, responsive design
- **Port**: http://localhost:5173 (or 5174 if in use)

**Features**:
- Drag-and-drop file upload interface
- Font selection dropdown
- Status messages and error handling
- Professional gradient UI with smooth interactions

### Backend (FastAPI on Port 8001)
- **Why FastAPI**: Modern, fast, async-capable Python framework with automatic OpenAPI docs
- **Why Port 8001**: Dedicated backend API port separate from frontend development server
- **CORS Enabled**: Allows frontend on ports 5173/5174 to communicate with backend

**Features**:
- RESTful /convert endpoint for file conversion
- LibreOffice integration for robust WP file parsing
- Automatic font application to converted documents
- Memory-efficient file streaming (no disk writes for response)

## Conversion Process

### Step 1: File Upload
1. User selects a WordPerfect file (.wp, .wpd, .wpc, .wpt, .frm)
2. File is sent to backend via multipart form data

### Step 2: LibreOffice Conversion
1. Backend receives file and saves to temp directory
2. **LibreOffice CLI** (soffice.exe) converts WP format → DOCX format directly
3. This direct conversion preserves:
   - Paragraph structure and spacing
   - Line heights and formatting
   - Document hierarchy and styles
4. Timeout: 120 seconds for large files

### Step 3: Font Application
1. Backend opens converted DOCX using python-docx
2. Applies selected font to all text runs in document
3. Saves updated DOCX to temp location

### Step 4: File Streaming
1. File is read into memory as BytesIO stream
2. Sent to frontend with proper Content-Disposition header
3. Frontend triggers automatic download with correct filename
4. Temp files automatically cleaned up

## Tech Stack

### Frontend Dependencies
- **react**: UI framework
- **@tailwindcss/vite**: Tailwind CSS with Vite integration
- **vite**: Build tool and dev server

### Backend Dependencies
- **fastapi**: REST API framework
- **uvicorn**: ASGI web server
- **python-docx**: DOCX file manipulation
- **python-multipart**: Form data parsing
- **LibreOffice**: External dependency for format conversion

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- Python 3.8+
- **LibreOffice** (https://www.libreoffice.org/download/)

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

### Option 1: Quick Start (Recommended)

Simply double-click or run:
\\\powershell
d:\\Github\\LO-WDP-TO-DOCX-CONVERTER\\startup.bat
\\\

This will:
- Start backend on http://localhost:8001
- Start frontend on http://localhost:5173
- Open the app in your default browser

### Option 2: Manual Start

**Terminal 1 - Backend:**
\\\ash
cd backend
.\\venv\\Scripts\\activate
python main.py
\\\

**Terminal 2 - Frontend:**
\\\ash
cd frontend
npm run dev
\\\

## Supported File Types

- **.wp** - WordPerfect Document
- **.wpd** - WordPerfect Document  
- **.wpc** - WordPerfect Macro
- **.wpt** - WordPerfect Template
- **.frm** - WordPerfect Form

## API Documentation

### POST /convert

Converts a WordPerfect file to DOCX format with font selection.

**Request:**
- **file** (multipart/form-data): WordPerfect file to convert
- **font** (form): Font name (default: Arial)

**Response:**
- Binary DOCX file with Content-Disposition: attachment

**Example (curl):**
\\\ash
curl -X POST http://localhost:8001/convert \\
  -F 'file=@document.wp' \\
  -F 'font=Times New Roman' \\
  --output converted.docx
\\\

## Project Structure

\\\
LO-WDP-TO-DOCX-CONVERTER/
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main React component
│   │   ├── App.css              # Component styles
│   │   ├── index.css            # Tailwind directives
│   │   ├── main.jsx             # React entry point
│   │   └── components/
│   │       ├── FileUpload.jsx    # File upload UI
│   │       └── FontSelector.jsx  # Font dropdown
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   └── venv/                    # Python virtual environment
│
├── startup.bat                  # One-click startup script
├── README.md                    # This file
└── .gitignore
\\\

## How It Works

### Frontend Flow
1. User opens http://localhost:5173
2. Selects WP file from upload area or drags to drop
3. Selects font from dropdown
4. Clicks "Convert to DOCX"
5. Frontend sends file + font selection to backend
6. Shows "Converting..." status
7. Browser auto-downloads converted DOCX

### Backend Flow
1. Receives multipart form data
2. Saves WP file to temp directory
3. Calls LibreOffice CLI: \soffice --headless --convert-to docx ...\
4. Waits 2 seconds for file system operations
5. Opens resulting DOCX with python-docx
6. Iterates through all paragraphs and text runs
7. Sets font name on each run
8. Saves updated DOCX
9. Reads file into memory
10. Streams file to frontend with proper headers
11. Cleans up temp directory

## Troubleshooting

### LibreOffice not found
**Solution**: Ensure LibreOffice is installed at:
- Windows: \C:\\Program Files\\LibreOffice\\program\\soffice.exe\
- macOS: \/Applications/LibreOffice.app\
- Linux: \/usr/bin/soffice\

Or add to system PATH.

### Port already in use
**Backend (8001)**: Kill process using port 8001 or change in [backend/main.py](backend/main.py) line
**Frontend (5173/5174)**: Vite auto-increments if port is busy

### Conversion timeout
If files exceed 120 seconds, increase timeout in [backend/main.py](backend/main.py) line 64:
\\\python
], capture_output=True, text=True, timeout=300)  # 5 minutes
\\\

### CORS errors
Verify backend is running and accessible:
\\\ash
curl http://localhost:8001/
\\\

Should return: \{"message":"WP to DOCX Converter API"}\

## Performance Notes

- **Conversion Time**: 5-30 seconds per file (depends on file size and complexity)
- **Memory Usage**: Minimal (~50-100MB for typical documents)
- **LibreOffice**: Headless mode for server efficiency
- **File Streaming**: No disk writes for response (in-memory streaming)

## Future Enhancements

- Batch conversion support
- Preserve more complex formatting (tables, images)
- Cloud storage integration (AWS S3, Google Drive)
- Progress indicators for large files
- Email delivery of converted files
- Conversion history/logging
- API rate limiting

## License

MIT

## Support

For issues or questions:
1. Check backend logs when conversion fails
2. Verify LibreOffice installation
3. Test with sample WP files
4. Check system requirements (Python, Node.js, LibreOffice versions)