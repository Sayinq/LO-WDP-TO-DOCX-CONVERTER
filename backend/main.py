from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import subprocess
import tempfile
import shutil
import time
from pathlib import Path
from docx import Document
from io import BytesIO

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://localhost:5174'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

def find_libreoffice():
    possible_paths = [
        r'C:\Program Files\LibreOffice\program\soffice.exe',
        r'C:\Program Files (x86)\LibreOffice\program\soffice.exe',
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            return path
    
    soffice = shutil.which('soffice')
    if soffice:
        return soffice
    
    raise FileNotFoundError('LibreOffice not found')

@app.get('/')
async def root():
    return {'message': 'WP to DOCX Converter API'}

@app.post('/convert')
async def convert_file(file: UploadFile = File(...), font: str = Form('Arial')):
    print(f'\n>>> Converting: {file.filename}')
    
    temp_dir = tempfile.mkdtemp()
    try:
        # Save uploaded file
        input_path = Path(temp_dir) / file.filename
        output_docx = Path(temp_dir) / (file.filename.rsplit('.', 1)[0] + '.docx')
        
        with open(input_path, 'wb') as f:
            f.write(await file.read())
        print(f'✓ File saved')
        
        # Convert WP directly to DOCX using LibreOffice
        libreoffice_path = find_libreoffice()
        print(f'✓ Found LibreOffice')
        
        print(f'Converting to DOCX...')
        result = subprocess.run([
            libreoffice_path,
            '--headless',
            '--convert-to', 'docx',
            '--outdir', str(temp_dir),
            str(input_path)
        ], capture_output=True, text=True, timeout=120)
        
        print(f'LibreOffice return code: {result.returncode}')
        if result.stderr:
            print(f'stderr: {result.stderr}')
        
        # Wait for LibreOffice to release files
        time.sleep(2)
        
        docx_files = list(Path(temp_dir).glob('*.docx'))
        if not docx_files:
            raise Exception(f'DOCX conversion failed')
        
        converted_docx = docx_files[0]
        print(f'✓ DOCX created: {converted_docx.name}')
        
        # Apply font change
        try:
            doc = Document(str(converted_docx))
            
            for paragraph in doc.paragraphs:
                for run in paragraph.runs:
                    run.font.name = font
            
            doc.save(str(converted_docx))
            print(f'✓ Font applied: {font}')
        except Exception as e:
            print(f'⚠ Font application skipped: {str(e)}')
        
        # Read file into memory BEFORE cleaning up
        with open(converted_docx, 'rb') as f:
            file_content = f.read()
        
        print(f'✓ Complete!')
        
        # Return file from memory
        return StreamingResponse(
            BytesIO(file_content),
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            headers={'Content-Disposition': f'attachment; filename={converted_docx.name}'}
        )
    
    except Exception as e:
        print(f'✗ Error: {str(e)}')
        raise
    
    finally:
        # Clean up temp directory after response is sent
        try:
            time.sleep(1)
            shutil.rmtree(temp_dir, ignore_errors=True)
        except:
            pass

if __name__ == '__main__':
    import uvicorn
    print('Starting API on http://localhost:8001')
    uvicorn.run(app, host='0.0.0.0', port=8001)