import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Brain,
  UploadCloud,
  Loader2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  Star,
  Users,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
  Trophy,
  Flame,
  CalendarDays,
  Bot,
  ChevronRight,
  PlayCircle,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Section = ({ children, id, className = '', style = {}, fluid = false, spaced = true }) => (
  <section id={id} className={`lp-section ${spaced ? 'lp-section--spaced' : ''} ${className}`.trim()} style={style}>
    <div className={fluid ? 'lp-container lp-container--fluid' : 'lp-container'}>{children}</div>
  </section>
);

const cardBase = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-2xl)',
  boxShadow: 'var(--shadow-sm)',
};

const LandingPage = ({ onUpload, isProcessing, theme, toggleTheme, onLogin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById('lp-scroll');
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const onDrop = useCallback((files) => { if (files.length > 0) onUpload(files[0]); }, [onUpload]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const navTo = (hash) => {
    setMobileOpen(false);
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredCourses = [
    { title: 'Machine Learning Foundations', meta: '12 modules · Self-paced', progress: 72, tag: 'Popular', icon: <Target size={18} /> },
    { title: 'Product Design Systems', meta: '8 modules · Project-based', progress: 38, tag: 'New', icon: <Zap size={18} /> },
    { title: 'Data Literacy for Leaders', meta: '6 modules · Live Q&A', progress: 0, tag: 'Featured', icon: <TrendingUp size={18} /> },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alya P.', xp: '12.4k', badge: '#fbbf24' },
    { rank: 2, name: 'Dimas R.', xp: '11.1k', badge: '#cbd5e1' },
    { rank: 3, name: 'Nadia S.', xp: '10.8k', badge: '#fdba74' },
    { rank: 4, name: 'You', xp: '8.2k', badge: 'var(--border-light)', highlight: true },
  ];

  const weekPlanner = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const plannerBlocks = [1, 0.6, 0.85, 0.4, 0.7, 0.35, 0.2];

  const features = [
    { icon: <Sparkles size={20} />, title: 'AI Summary', desc: 'Core ideas without noise — ready for quick review.' },
    { icon: <Target size={20} />, title: 'Adaptive Quizzes', desc: 'Questions that follow your knowledge gaps.' },
    { icon: <Zap size={20} />, title: 'Smart Flashcards', desc: 'Spaced repetition that stays out of your flow.' },
    { icon: <BookOpen size={20} />, title: 'Contextual Tutor', desc: 'Ask questions grounded in your document.' },
  ];

  const testimonials = [
    { name: 'Sarah K.', role: 'Medicine', text: 'My focus improved because the UI is calm and summaries are precise.', avatar: 'S' },
    { name: 'Rizky A.', role: 'Law', text: 'Saves me hours every week. Feels like a personal study assistant.', avatar: 'R' },
    { name: 'Mia T.', role: 'Engineering', text: 'Quizzes match my lectures. The dashboard never strains my eyes.', avatar: 'M' },
  ];

  const stats = [
    { value: '50K+', label: 'Learners', icon: <Users size={18} /> },
    { value: '2M+', label: 'Documents', icon: <BookOpen size={18} /> },
    { value: '98%', label: 'Satisfaction', icon: <Star size={18} /> },
    { value: '3×', label: 'More focus', icon: <TrendingUp size={18} /> },
  ];

  const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' } };

  return (
    <div
      id="lp-scroll"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'var(--bg-main)',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
      }}
    >
      <motion.div className="lp-mesh" aria-hidden animate={{ opacity: [0.88, 1, 0.88] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 250,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              background: 'color-mix(in srgb, var(--bg-main) 72%, transparent)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '22px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <Loader2 size={32} style={{ color: '#6366f1' }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-main)', marginBottom: '6px' }}>Preparing your study room…</p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Extracting text and setting up AI</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`lp-nav${scrolled ? ' lp-nav--scrolled' : ''}`}
      >
        <div className="lp-container lp-nav-inner">
        <button type="button" onClick={() => navTo('hero')} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="lpLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="55%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: 'color-mix(in srgb, var(--bg-card) 70%, transparent)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={22} color="url(#lpLogoGrad)" strokeWidth={2.2} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>BrainMate</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="lp-nav-desktop">
          {[
            ['Courses', 'courses'],
            ['Progress', 'progress'],
            ['Leaderboard', 'leaderboard'],
            ['Planner', 'planner'],
            ['Upload', 'upload-section'],
          ].map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => navTo(id)}
              style={{
                padding: '8px 14px',
                borderRadius: '999px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-input)'; e.currentTarget.style.color = 'var(--text-main)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '14px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'transform 0.2s ease, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            type="button"
            className="lp-nav-desktop"
            onClick={onLogin}
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', cursor: 'pointer', padding: '8px 12px', background: 'none', border: 'none', fontFamily: 'var(--font-sans)' }}
          >
            Log in
          </button>
          <motion.button
            type="button"
            className="lp-nav-desktop"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navTo('upload-section')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #0d9488 160%)',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              boxShadow: '0 8px 28px rgba(99, 102, 241, 0.22)',
            }}
          >
            Start learning
          </motion.button>
          <button
            type="button"
            className="lp-nav-mobile"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '14px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-card)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
            }}
          >
            <Menu size={20} />
          </button>
        </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,15,26,0.38)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(300px, 82vw)',
                background: 'var(--bg-card)',
                borderLeft: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 20px',
                paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
                overflowY: 'auto',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Brain size={18} style={{ color: '#818cf8' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>BrainMate</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  style={{ border: 'none', background: 'var(--bg-input)', width: '32px', height: '32px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0 }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav items */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {[
                  ['Featured courses', 'courses'],
                  ['Study progress', 'progress'],
                  ['Leaderboard', 'leaderboard'],
                  ['Daily streak', 'streak'],
                  ['AI assistant', 'ai-assistant'],
                  ['Planner', 'planner'],
                  ['Upload PDF', 'upload-section'],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navTo(id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-input)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {label}
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--border-light)', margin: '16px 0' }} />

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); onLogin?.(); }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                  }}
                >
                  Log in
                </button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navTo('upload-section')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Get started
                </motion.button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero + stats — first viewport */}
      <Section
        id="hero"
        fluid
        spaced
        className="lp-hero-section"
        style={{
          minHeight: 'clamp(520px, 100dvh - 54px, 100dvh - 54px)',
          boxSizing: 'border-box',
        }}
      >
        <div className="lp-hero-layout">
        <motion.div
          className="lp-hero-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid var(--border-light)',
                background: 'color-mix(in srgb, var(--bg-card) 75%, transparent)',
                backdropFilter: 'blur(12px)',
                marginBottom: '22px',
              }}
            >
              <Sparkles size={14} style={{ color: '#818cf8' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>Study OS for the next generation</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.1rem, 4.2vw + 1rem, 3.35rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--text-main)',
                marginBottom: '18px',
              }}
            >
              A calm study space,
              <br />
              <span
                style={{
                  background: 'linear-gradient(120deg, #6366f1 0%, #8b5cf6 45%, #14b8a6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                powered by context-aware AI
              </span>
            </h1>
            <p className="lp-hero-desc" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '24px' }}>
              One workflow: upload material, get summaries, quizzes, flashcards, and a tutor — without noisy tabs. Built to keep your eyes and mind fresh during long sessions.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navTo('upload-section')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 24px',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6d28d9 55%, #0f766e 165%)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: '0 12px 36px rgba(79, 70, 229, 0.28)',
                }}
              >
                Try with your PDF <ArrowRight size={18} />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navTo('courses')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 22px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <PlayCircle size={18} style={{ color: 'var(--text-muted)' }} />
                Browse courses
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              ...cardBase,
              padding: 'clamp(20px, 3vw, 28px)',
              borderRadius: 'var(--radius-2xl)',
              background: 'color-mix(in srgb, var(--bg-card) 82%, transparent)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: '-40%', background: 'conic-gradient(from 210deg at 50% 50%, rgba(129,140,248,0.12), transparent 40%, rgba(45,212,191,0.1), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>Session snapshot</p>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div className="neo-subtle" style={{ flex: 1, padding: '16px', borderRadius: 'var(--radius-xl)' }}>
                  <Flame size={20} style={{ color: '#f59e0b', marginBottom: '8px' }} />
                  <p style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>12</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>day streak</p>
                </div>
                <div style={{ flex: 1, ...cardBase, padding: '16px', borderRadius: 'var(--radius-xl)' }}>
                  <Target size={20} style={{ color: '#6366f1', marginBottom: '8px' }} />
                  <p style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>87%</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>focus this week</p>
                </div>
              </div>
              <div style={{ height: '8px', borderRadius: '99px', background: 'var(--bg-input)', overflow: 'hidden', marginBottom: '10px' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #6366f1, #34d399)' }} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Weekly goal almost there — a 10-minute break is recommended.</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="lp-stats-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 + i * 0.05 }} style={{ ...cardBase, padding: '18px 12px', textAlign: 'center', minWidth: 0 }}>
              <div style={{ color: '#818cf8', marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <p style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.45rem)', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </Section>

      {/* Featured courses */}
      <Section id="courses">
        <div className="lp-section-header">
          <div>
            <h2>Featured courses</h2>
            <p>Light curation — depth over tile count on screen.</p>
          </div>
          <button type="button" onClick={() => navTo('upload-section')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            Bring your own material <ChevronRight size={16} />
          </button>
        </div>
        <div className="lp-card-grid lp-card-grid--3">
          {featuredCourses.map((c, i) => (
            <motion.article key={c.title} {...fadeUp} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }} className="lp-card" style={{ cursor: 'default', transition: 'box-shadow 0.25s ease, border-color 0.25s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'color-mix(in srgb, #6366f1 10%, transparent)', border: '1px solid color-mix(in srgb, #6366f1 18%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', background: 'var(--bg-input)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>{c.tag}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px', letterSpacing: '-0.02em' }}>{c.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>{c.meta}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '6px', borderRadius: '99px', background: 'var(--bg-input)', overflow: 'hidden' }}>
                  <div style={{ width: `${c.progress}%`, height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #818cf8, #2dd4bf)' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{c.progress}%</span>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Progress + streak */}
      <Section id="progress">
        <div className="lp-split-grid">
          <motion.div {...fadeUp} className="lp-card" style={{ background: 'color-mix(in srgb, var(--bg-card) 88%, transparent)', backdropFilter: 'blur(16px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>Study progress</h2>
              <Clock size={18} color="var(--text-muted)" />
            </div>
            {[
              { label: 'Summaries & notes', pct: 82, c: '#6366f1' },
              { label: 'Quiz practice', pct: 64, c: '#14b8a6' },
              { label: 'Review flashcard', pct: 48, c: '#a78bfa' },
            ].map((p) => (
              <div key={p.label} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{p.pct}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-input)', borderRadius: '99px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ height: '100%', borderRadius: '99px', background: p.c, opacity: 0.9 }} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div id="streak" {...fadeUp} className="neo-subtle lp-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'color-mix(in srgb, #f59e0b 14%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flame size={24} style={{ color: '#d97706' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700 }}>Daily streak</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Small consistency beats exhausting sprints.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: idx < 5 ? '#fff' : 'var(--text-muted)',
                    background: idx < 5 ? 'linear-gradient(145deg, #6366f1, #7c3aed)' : 'var(--bg-input)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Leaderboard + AI */}
      <Section id="leaderboard">
        <div className="lp-split-grid">
          <motion.div {...fadeUp} className="lp-card lp-card--flush">
            <div className="lp-card__head">
              <Trophy size={20} style={{ color: '#eab308' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, margin: 0 }}>Leaderboard</h2>
            </div>
            <div className="lp-card__body lp-card__body--rows">
              {leaderboard.map((row) => (
                <div
                  key={row.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 10px',
                    borderRadius: '14px',
                    background: row.highlight ? 'color-mix(in srgb, #6366f1 8%, transparent)' : 'transparent',
                    border: row.highlight ? '1px solid color-mix(in srgb, #6366f1 20%, transparent)' : '1px solid transparent',
                  }}
                >
                  <span style={{ width: '28px', fontWeight: 700, fontSize: '13px', color: 'var(--text-muted)' }}>{row.rank}</span>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: row.badge }} />
                  <span style={{ flex: 1, fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>{row.name}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{row.xp} XP</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div id="ai-assistant" {...fadeUp} className="lp-card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-15%', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'var(--bg-input)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Bot size={24} style={{ color: '#6366f1' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>AI study assistant</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
                A tutor grounded in your document — not generic chat. Stays on-topic with minimal distraction.
              </p>
              <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navTo('upload-section')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: '14px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-main)' }}>
                Enable assistant <Sparkles size={16} style={{ color: '#818cf8' }} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Study planner */}
      <Section id="planner">
        <motion.div {...fadeUp} className="lp-card">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CalendarDays size={20} color="var(--text-muted)" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700 }}>Study planner</h2>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', padding: '6px 12px', borderRadius: '999px', border: '1px solid var(--border-light)', background: 'var(--bg-input)' }}>This week</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {weekPlanner.map((day, i) => (
              <div key={day} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px', letterSpacing: '0.04em' }}>{day}</p>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${Math.max(28, plannerBlocks[i] * 100)}px` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    borderRadius: '12px',
                    background: i === 2 ? 'linear-gradient(180deg, #6366f1, #8b5cf6)' : 'linear-gradient(180deg, var(--bg-input), color-mix(in srgb, var(--border-light) 80%, transparent))',
                    border: '1px solid var(--border-light)',
                    minHeight: '28px',
                  }}
                />
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '18px' }}>Taller blocks = scheduled sessions. Adjust duration in your dashboard.</p>
        </motion.div>
      </Section>

      {/* Upload */}
      <Section id="upload-section">
        <motion.div {...fadeUp} className="lp-upload-wrap">
          <div
            {...getRootProps()}
            className="lp-upload-drop"
            style={{
              border: `1.5px dashed ${isDragActive ? 'color-mix(in srgb, #6366f1 55%, transparent)' : 'var(--border-medium)'}`,
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(48px, 8vw, 72px) clamp(24px, 5vw, 48px)',
              textAlign: 'center',
              background: isDragActive ? 'color-mix(in srgb, #6366f1 6%, var(--bg-card))' : 'var(--bg-card)',
              cursor: isProcessing ? 'wait' : 'pointer',
              transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
              boxShadow: isDragActive ? '0 0 0 4px color-mix(in srgb, #6366f1 12%, transparent)' : 'var(--shadow-sm)',
            }}
          >
            <input {...getInputProps()} disabled={isProcessing} />
            {isProcessing ? (
              <div>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '18px' }}>
                  <Loader2 size={48} style={{ color: '#6366f1' }} />
                </motion.div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>Processing PDF…</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Extracting text and preparing AI.</p>
              </div>
            ) : (
              <div>
                <motion.div whileHover={{ scale: 1.04 }} style={{ display: 'inline-flex', width: '76px', height: '76px', borderRadius: '22px', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, #6366f1 10%, transparent)', border: '1px solid color-mix(in srgb, #6366f1 18%, transparent)', marginBottom: '20px' }}>
                  <UploadCloud size={36} style={{ color: '#6366f1' }} />
                </motion.div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
                  {isDragActive ? 'Drop your file here' : 'Drop a PDF or choose a file'}
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '15px' }}>Privacy-first: processed for your current session.</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '14px', background: 'linear-gradient(135deg, #4f46e5, #6d28d9)', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-sans)' }}>
                  <UploadCloud size={16} /> Select PDF
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </Section>

      {/* Features compact */}
      <Section>
        <div className="lp-section-header lp-section-header--center">
          <h2>Unified learning flow</h2>
          <p>One document, many ways to learn — without noisy tabs.</p>
        </div>
        <div className="lp-card-grid lp-card-grid--4">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.06 }} whileHover={{ y: -2 }} className="lp-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', marginBottom: '14px' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-main)' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials">
        <div className="lp-section-header lp-section-header--center">
          <h2>Trusted by learners who value calm</h2>
        </div>
        <div className="lp-card-grid lp-card-grid--3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.08 }} className="lp-card">
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} fill="#fcd34d" color="#fcd34d" style={{ opacity: 0.95 }} />
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '18px' }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(145deg, #6366f1, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>{t.avatar}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <Brain size={18} style={{ color: '#818cf8' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-main)' }}>BrainMate</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 BrainMate — focus on learning, not noise.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
