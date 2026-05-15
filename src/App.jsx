import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const extractText = async (uploadedFile) => {
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  };

  const handleFileUpload = async (uploadedFile) => {
    setIsProcessing(true);
    try {
      const text = await extractText(uploadedFile);
      setFileText(text);
      setFile(uploadedFile);
    } catch (error) {
      console.error("Gagal membaca PDF:", error);
      alert("Gagal membaca file PDF. Pastikan file valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="app-container">
      {!file ? (
        <LandingPage 
          onUpload={handleFileUpload} 
          isProcessing={isProcessing} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <Dashboard 
          fileName={file.name} 
          fileText={fileText}
          theme={theme}
          toggleTheme={toggleTheme}
          onReset={() => {
            setFile(null);
            setFileText('');
          }}
        />
      )}
    </div>
  );
}

export default App;
