import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2 } from 'lucide-react';

const Hero = ({ onUpload, isProcessing }) => {
  const [activeLink, setActiveLink] = useState('WELCOME');
  
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const links = ['WELCOME', 'FEATURES', 'ABOUT'];

  return (
    <div className="flex w-full">
      {/* Left Sidebar Info */}
      <div className="sidebar">
        <div>
          <h1>StudyPulse AI</h1>
          <h2>Your Intelligent Study Partner.</h2>
          <p className="max-w-xs mt-6 leading-relaxed">
            I build intelligent learning experiences that summarize, quiz, and guide you through your academic materials with ease.
          </p>
          
          <div className="mt-16 flex flex-col gap-4">
            {links.map(link => (
              <button 
                key={link}
                onClick={() => setActiveLink(link)}
                className={`nav-link border-none bg-transparent w-fit ${activeLink === link ? 'active' : ''}`}
              >
                <span className="line"></span> {link}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>
          <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>
          <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>
        </div>
      </div>

      {/* Right Content Area - Upload Area */}
      <div className="content-main flex items-center justify-center">
        <div 
          {...getRootProps()} 
          className={`w-full max-w-xl glass-card p-20 border-2 border-dashed transition-all cursor-pointer relative z-20
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-slate-800 hover:border-slate-700'}`}
        >
          <input {...getInputProps()} />
          
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-primary mb-4" size={32} />
              <p className="text-sm font-medium uppercase tracking-widest text-primary animate-pulse">Processing...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center group">
              <UploadCloud className="text-slate-500 group-hover:text-primary transition-colors mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-200">
                {isDragActive ? "Drop PDF here" : "Upload your study material"}
              </h3>
              <p className="text-sm text-slate-500 mt-2">PDF files only. Max 50MB.</p>
              
              <div className="mt-8 btn-teal text-xs tracking-widest uppercase font-bold inline-block">
                Select File
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
