import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/** direction: 1 = forward (login/dashboard), -1 = back to landing */
const appScreenVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir === 1 ? 48 : -48,
    scale: 0.97,
    filter: 'blur(8px)',
    pointerEvents: 'none',
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    pointerEvents: 'auto',
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir === 1 ? -40 : 40,
    scale: 0.98,
    filter: 'blur(6px)',
    pointerEvents: 'none',
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  }),
};

function App() {
  const [file, setFile] = useState(null);
  const [fileText, setFileText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [routeDirection, setRouteDirection] = useState(1);
  const [screen, setScreen] = useState('landing');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const extractText = async (uploadedFile) => {
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += `${pageText}\n`;
    }

    return fullText;
  };

  const handleFileUpload = async (uploadedFile) => {
    setIsProcessing(true);
    try {
      const text = await extractText(uploadedFile);
      setRouteDirection(1);
      setFileText(text);
      setFile(uploadedFile);
      setScreen('landing');
    } catch (error) {
      console.error('Failed to read PDF:', error);
      alert('Could not read the PDF. Please make sure the file is valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const goLanding = () => {
    setRouteDirection(-1);
    setScreen('landing');
  };

  const goLogin = () => {
    setRouteDirection(1);
    setScreen('login');
  };

  const activeKey = file ? 'dashboard' : screen;

  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        isolation: 'isolate',
        background: 'var(--bg-main)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeKey}
          custom={routeDirection}
          variants={appScreenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            willChange: 'transform, opacity, filter',
          }}
        >
          {file ? (
            <Dashboard
              fileName={file.name}
              fileText={fileText}
              theme={theme}
              toggleTheme={toggleTheme}
              onReset={() => {
                setRouteDirection(-1);
                setFile(null);
                setFileText('');
                setScreen('landing');
              }}
            />
          ) : screen === 'login' ? (
            <LoginPage
              theme={theme}
              toggleTheme={toggleTheme}
              onBack={goLanding}
              onSuccess={goLanding}
            />
          ) : (
            <LandingPage
              onUpload={handleFileUpload}
              isProcessing={isProcessing}
              theme={theme}
              toggleTheme={toggleTheme}
              onLogin={goLogin}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
