import React, { useState } from 'react';
import { Search, Brain, BookOpen, Clock, Bell, LayoutDashboard, ChevronRight, CheckCircle2, History, UploadCloud, MessageSquare, Zap, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SummaryView from './SummaryView';
import QuizView from './QuizView';
import FlashcardView from './FlashcardView';
import Chatbot from './Chatbot';

const Dashboard = ({ fileName, fileText, onReset, theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [activeMenu, setActiveMenu] = useState('belajar');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const features = [
    { id: 'summary', title: 'Smart Summary', icon: <BookOpen />, color: 'var(--color-pink)' },
    { id: 'quiz', title: 'AI Quizzes', icon: <CheckCircle2 />, color: 'var(--color-yellow)' },
    { id: 'flashcards', title: 'Flashcards', icon: <Clock />, color: 'var(--color-green)' },
    { id: 'chat', title: 'Tutor Chat', icon: <MessageSquare />, color: 'var(--color-cyan)' },
  ];

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo" onClick={onReset}>
          <Brain size={32} color="var(--primary)" />
          <span>BrainMate</span>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`sidebar-content ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-menu" style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '10px', paddingLeft: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Menu Utama
            </p>
            <div className={`nav-item ${activeMenu === 'dasbor' ? 'active' : ''}`} onClick={() => setActiveMenu('dasbor')}>
              <LayoutDashboard size={20} />
              Dashboard
            </div>
            <div className={`nav-item ${activeMenu === 'belajar' ? 'active' : ''}`} onClick={() => setActiveMenu('belajar')}>
              <BookOpen size={20} />
              Study Room
            </div>
            <div className={`nav-item ${activeMenu === 'riwayat' ? 'active' : ''}`} onClick={() => setActiveMenu('riwayat')}>
              <History size={20} />
              History
            </div>
          </div>

          <div className="nav-menu">
            <p style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '10px', paddingLeft: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Aksi
            </p>
            <div className="nav-item" onClick={onReset}>
              <UploadCloud size={20} />
              Upload New
            </div>
          </div>

          <div style={{ marginTop: 'auto', padding: '20px', background: 'var(--primary-glow)', borderRadius: '16px', border: '1px solid var(--border-heavy)', color: 'var(--text-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Zap size={20} color="var(--primary)" />
              <h4 style={{ fontSize: '14px', fontWeight: 800 }}>Pro Features</h4>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '15px' }}>Unlock unlimited AI usage and advanced models.</p>
            <button style={{ width: '100%', padding: '10px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <div className="search-bar">
            <Search size={20} color="var(--text-muted)" />
            <input type="text" placeholder="Search across your documents..." />
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Notifications Dropdown */}
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--btn-bg)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
              >
                <Bell size={20} color="var(--text-main)" />
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', background: 'var(--color-pink)', borderRadius: '50%' }}></div>
              </div>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{ position: 'absolute', top: '55px', right: 0, width: '300px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 100 }}
                  >
                    <h4 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: 800 }}>Notifications</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ fontSize: '13px', padding: '10px', borderRadius: '10px', background: 'var(--btn-bg)' }}>
                        <p style={{ fontWeight: 700, marginBottom: '4px' }}>Welcome to BrainMate!</p>
                        <p style={{ color: 'var(--text-muted)' }}>Start uploading your documents to see the magic.</p>
                      </div>
                      <div style={{ fontSize: '13px', padding: '10px', borderRadius: '10px', background: 'var(--btn-bg)' }}>
                        <p style={{ fontWeight: 700, marginBottom: '4px' }}>AI Model Updated</p>
                        <p style={{ color: 'var(--text-muted)' }}>We've improved the summary accuracy by 20%.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <div className="avatar" style={{ width: '40px', height: '40px' }}>
                  <div className="avatar-inner" style={{ fontSize: '16px', color: 'var(--text-main)' }}>U</div>
                </div>
              </div>

              <AnimatePresence>
                {showProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{ position: 'absolute', top: '55px', right: 0, width: '200px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 100 }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-light)' }}>
                      <p style={{ fontWeight: 800, fontSize: '15px' }}>User Account</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>user@example.com</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <button style={{ textAlign: 'left', padding: '8px 12px', borderRadius: '8px', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}>Profile Settings</button>
                      <button style={{ textAlign: 'left', padding: '8px 12px', borderRadius: '8px', background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer' }}>Billing</button>
                      <button onClick={onReset} style={{ textAlign: 'left', padding: '8px 12px', borderRadius: '8px', background: 'none', border: 'none', color: 'var(--color-pink)', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Sign Out</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {activeMenu === 'belajar' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ marginBottom: '30px', padding: '24px', background: 'var(--gradient-main)', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px var(--primary-glow)' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Active Document</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
                  <BookOpen size={16} />
                  {fileName}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '16px', color: 'white', fontWeight: 700, fontSize: '14px', backdropFilter: 'blur(10px)' }}>
                {Math.round(fileText.length / 5)} words extracted
              </div>
            </div>

            <div className="section-title">
              <span>Learning Modules</span>
            </div>
            
            <div className="features-grid">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className={`feature-card ${activeTab === feature.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(feature.id)}
                  style={activeTab === feature.id ? { borderColor: feature.color, boxShadow: `0 0 20px ${feature.color}33` } : {}}
                >
                  <div className="icon-wrapper" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>AI-generated {feature.title.toLowerCase()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mobile-mockup" style={{ minHeight: '600px', marginBottom: '40px' }}>
              <div className="mobile-header">
                <h3 style={{ fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text-main)' }}>
                  <Brain color="var(--primary)" size={20} />
                  AI Workspace
                </h3>
              </div>
              <div className="mobile-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '100%' }}
                  >
                    {activeTab === 'summary' && <SummaryView text={fileText} />}
                    {activeTab === 'quiz' && <QuizView text={fileText} />}
                    {activeTab === 'flashcards' && <FlashcardView text={fileText} />}
                    {activeTab === 'chat' && <Chatbot text={fileText} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
