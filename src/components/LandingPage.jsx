import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Brain, UploadCloud, Loader2, Sparkles, ArrowRight, ChevronDown, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = ({ onUpload, isProcessing, theme, toggleTheme }) => {
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

  const scrollToUpload = () => {
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-container">
      
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="logo-icon">
            <Brain size={24} color="white" />
          </div>
          <span className="logo-text">BrainMate <span className="text-primary">AI</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={scrollToUpload} style={{ background: 'var(--btn-bg)', border: '1px solid var(--border-light)', color: 'var(--text-main)', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="landing-page" style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="landing-header"
          style={{ zIndex: 10 }}
        >
          <div className="hero-badge">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} /> Revolutionize Your Learning
          </div>
          <h1 className="hero-title">
            Your Intelligent <br/>Study Partner.
          </h1>
          <p className="hero-description">
            Upload any document and let our AI generate instant summaries, smart quizzes, and interactive flashcards to accelerate your mastery.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToUpload}
            style={{
              background: 'var(--gradient-main)',
              color: 'white', border: 'none', padding: '18px 40px', borderRadius: '50px',
              fontSize: '18px', fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 10px 30px var(--primary-glow)',
              display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto'
            }}
          >
            Start Learning <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ position: 'absolute', bottom: '40px', cursor: 'pointer', zIndex: 10 }}
          onClick={scrollToUpload}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={32} color="var(--text-muted)" />
          </motion.div>
        </motion.div>
      </div>

      {/* Upload Section */}
      <div id="upload-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', background: 'var(--bg-main)', position: 'relative' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`landing-card glass-panel ${isDragActive ? 'drag-active' : ''}`} 
          {...getRootProps()} 
          style={{ 
            cursor: isProcessing ? 'wait' : 'pointer', 
            maxWidth: '600px', width: '100%'
          }}
        >
          <input {...getInputProps()} disabled={isProcessing} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)' }}>Upload Document</h2>
          </div>
          
          {isProcessing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                <Loader2 size={64} color="var(--primary)" />
              </motion.div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginTop: '24px' }}>Processing Intelligence...</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Our AI models are extracting insights from your document.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ 
                  width: '100px', height: '100px', borderRadius: '50%', 
                  background: 'var(--primary-glow)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px', border: '1px dashed var(--primary)'
                }}
              >
                <UploadCloud size={48} color={isDragActive ? "var(--primary)" : "var(--text-muted)"} />
              </motion.div>
              
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
                {isDragActive ? "Drop to initialize" : "Select PDF File"}
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px', lineHeight: 1.6 }}>
                Drag & drop your study material here. We'll automatically process it and prepare your personalized dashboard. Maximum file size is 50MB.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-upload"
              >
                <UploadCloud size={20} />
                Browse Files
              </motion.button>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPage;
