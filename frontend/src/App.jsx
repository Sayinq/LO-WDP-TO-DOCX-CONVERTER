import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import FontSelector from './components/FontSelector'

function App() {
  const [file, setFile] = useState(null)
  const [font, setFont] = useState('Arial')
  const [isConverting, setIsConverting] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleConvert = async () => {
    if (!file) {
      setMessage('Please select a file')
      return
    }

    setIsConverting(true)
    setMessage('Converting...')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('font', font)

    try {
      const response = await fetch('http://localhost:8001/convert', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name.replace(/\.[^/.]+$/, '') + '.docx'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        setMessage('Conversion successful!')
      } else {
        setMessage('Conversion failed')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setIsConverting(false)
    }
  }

  const getMessageClass = () => {
    const base = "mt-4 p-4 rounded-lg text-center font-semibold"
    if (message.includes('Error') || message.includes('failed')) {
      return base + "bg-red-100 text-red-700"
    }
    return base + "bg-green-100 text-green-700"
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            WordPerfect to DOCX
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Converting files and preserving 
          </p>

          <FileUpload onChange={handleFileChange} fileName={file?.name} />

          <FontSelector value={font} onChange={setFont} />

          <button
            onClick={handleConvert}
            disabled={isConverting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
          >
            {isConverting ? 'Converting...' : 'Convert to DOCX'}
          </button>

          {message && <div className={getMessageClass()}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default App

