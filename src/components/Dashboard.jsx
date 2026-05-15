import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Brain,
  BookOpen,
  Clock,
  Bell,
  LayoutDashboard,
  CheckCircle2,
  History,
  UploadCloud,
  MessageSquare,
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  Trophy,
  Flame,
  CalendarDays,
  Bot,
  ChevronRight,
  Sparkles,
  User,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SummaryView from './SummaryView';
import QuizView from './QuizView';
import FlashcardView from './FlashcardView';
import Chatbot from './Chatbot';
import ProfileSettings from './ProfileSettings';
import Billing from './Billing';

const NavItem = ({ icon, label, active, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '11px',
      width: '100%',
      padding: '11px 14px',
      borderRadius: '14px',
      border: '1px solid transparent',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      fontWeight: 500,
      background: 'transparent',
      color: active ? '#6366f1' : 'var(--text-main)',
      overflow: 'hidden',
    }}
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.background = 'var(--bg-input)';
    }}
    onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.background = 'transparent';
    }}
  >
    {active && (
      <motion.span
        layoutId="dash-nav-active"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          background: 'color-mix(in srgb, #6366f1 10%, transparent)',
          border: '1px solid color-mix(in srgb, #6366f1 22%, transparent)',
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      />
    )}
    <span style={{ position: 'relative', zIndex: 1, display: 'flex', color: active ? '#6366f1' : 'var(--text-secondary)', opacity: active ? 1 : 0.85 }}>{icon}</span>
    <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
  </motion.button>
);

const StatCard = ({ label, value, sub, icon, accent }) => (
  <div
    className="neo-subtle"
    style={{
      padding: '20px 20px 18px',
      borderRadius: 'var(--radius-2xl)',
      border: '1px solid var(--border-light)',
      background: 'var(--bg-card)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</p>
        <p style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>{value}</p>
        {sub && <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{sub}</p>}
      </div>
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: `color-mix(in srgb, ${accent} 14%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    </div>
  </div>
);

const featuredCourses = [
  { title: 'Neuroscience 101', progress: 74, hours: '4j fokus', color: '#6366f1' },
  { title: 'UX Research Methods', progress: 41, hours: '2.5j', color: '#14b8a6' },
  { title: 'Calculus II', progress: 12, hours: '1j', color: '#a78bfa' },
];

const leaderboardRows = [
  { rank: 1, name: 'Alya', xp: '9.8k', dot: '#fbbf24' },
  { rank: 2, name: 'Raka', xp: '8.9k', dot: '#cbd5e1' },
  { rank: 3, name: 'Mira', xp: '8.4k', dot: '#fdba74' },
  { rank: 8, name: 'You', xp: '6.1k', dot: '#818cf8', you: true },
];

const dashEase = [0.22, 1, 0.36, 1];

const dashPageVariants = {
  initial: { opacity: 0, y: 24, scale: 0.985, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.46, ease: dashEase },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    filter: 'blur(6px)',
    transition: { duration: 0.32, ease: dashEase },
  },
};

const studyTabVariants = {
  initial: { opacity: 0, x: 40, scale: 0.982 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.36, ease: dashEase },
  },
  exit: {
    opacity: 0,
    x: -28,
    scale: 0.988,
    transition: { duration: 0.26, ease: dashEase },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: dashEase } },
};

const Dashboard = ({ fileName, fileText, onReset, theme, toggleTheme, initialMenu = 'dasbor', initialTab = 'summary' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeMenu, setActiveMenu] = useState(initialMenu);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeMenu]);

  const closeOverlays = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  const goMenu = (menu) => {
    setActiveMenu(menu);
    setMobileSidebar(false);
    closeOverlays();
  };

  const features = [
    { id: 'summary', title: 'Summary', icon: <BookOpen size={17} />, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    { id: 'quiz', title: 'AI Quiz', icon: <CheckCircle2 size={17} />, color: '#14b8a6', bg: 'rgba(20,184,166,0.1)' },
    { id: 'flashcards', title: 'Flashcard', icon: <Clock size={17} />, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
    { id: 'chat', title: 'Tutor', icon: <MessageSquare size={17} />, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  ];

  const sidebarInner = (
    <>
      <button
        type="button"
        onClick={() => { goMenu('dasbor'); onReset(); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '11px',
          padding: '10px 12px',
          marginBottom: '8px',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="sidebarLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={22} color="url(#sidebarLogoGrad)" strokeWidth={2.2} />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>BrainMate</span>
      </button>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '8px 14px 4px' }}>Workspace</p>
        <NavItem icon={<LayoutDashboard size={17} />} label="Dashboard" active={activeMenu === 'dasbor'} onClick={() => goMenu('dasbor')} />
        <NavItem icon={<BookOpen size={17} />} label="Study room" active={activeMenu === 'belajar'} onClick={() => goMenu('belajar')} />
        <NavItem icon={<History size={17} />} label="History" active={activeMenu === 'riwayat'} onClick={() => goMenu('riwayat')} />

        <div style={{ height: '1px', background: 'var(--border-light)', margin: '14px 10px' }} />
        <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '8px 14px 4px' }}>Account</p>
        <NavItem icon={<User size={17} />} label="Profile" active={activeMenu === 'profile-settings'} onClick={() => goMenu('profile-settings')} />
        <NavItem icon={<CreditCard size={17} />} label="Billing" active={activeMenu === 'billing'} onClick={() => goMenu('billing')} />
        <NavItem icon={<UploadCloud size={17} />} label="Upload baru" active={false} onClick={onReset} />
      </div>

      <div
        style={{
          marginTop: '18px',
          padding: '18px',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(145deg, color-mix(in srgb, #6366f1 92%, #0f172a), #4c1d95)',
          border: '1px solid color-mix(in srgb, #a78bfa 35%, transparent)',
          boxShadow: '0 12px 32px rgba(79, 70, 229, 0.2)',
        }}
      >
        <Zap size={18} color="rgba(255,255,255,0.9)" style={{ marginBottom: '8px' }} />
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Pro</h4>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.72)', marginBottom: '14px', lineHeight: 1.45 }}>Model lanjutan & prioritas antrian.</p>
        <button
          type="button"
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255,255,255,0.95)',
            color: '#4f46e5',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Upgrade
        </button>
      </div>
    </>
  );

  return (
    <motion.div className="dash-root">

      {/* Desktop sidebar */}
      <aside className="dash-sidebar-desktop">
        {sidebarInner}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(6px)' }}
              onClick={() => setMobileSidebar(false)}
            />
            <motion.aside
              initial={{ x: '-105%' }}
              animate={{ x: 0 }}
              exit={{ x: '-105%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.65 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: 'min(280px, 88vw)',
                zIndex: 410,
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                padding: '18px 14px',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <button type="button" onClick={() => setMobileSidebar(false)} style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} />
                </button>
              </div>
              {sidebarInner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="dash-main">
        <header className="dash-header">
          <div className="dash-header-start">
            <button
              type="button"
              className="dash-menu-btn"
              onClick={() => setMobileSidebar(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="dash-search">
              <Search size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              <input type="search" placeholder="Search materials, tags, or courses…" />
            </div>
          </div>

          <div className="dash-header-actions">
            <button type="button" className="dash-icon-btn dash-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <div style={{ position: 'relative' }} className="dash-notif-wrap">
              <button type="button" className="dash-icon-btn" onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} style={{ position: 'relative' }}>
                <Bell size={17} />
                <span style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: '#f472b6', border: '2px solid var(--bg-card)' }} />
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} style={{ position: 'absolute', top: '48px', right: 0, width: 'min(320px, 92vw)', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-2xl)', padding: '16px', boxShadow: 'var(--shadow-xl)', zIndex: 200 }}>
                    <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px' }}>Notifications</p>
                    {[{ title: 'Session saved', body: 'Your summary is ready anytime.', time: 'Just now' }, { title: 'Model updated', body: 'Citation accuracy improved.', time: '1h ago' }].map((n, i) => (
                      <div key={i} style={{ padding: '12px', borderRadius: '14px', background: 'var(--bg-input)', marginBottom: i === 0 ? '8px' : 0, border: '1px solid var(--border-light)' }}>
                        <p style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-main)', marginBottom: '2px' }}>{n.title}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{n.body}</p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>{n.time}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ position: 'relative' }}>
              <button type="button" className="dash-profile-btn" onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}>
                U
              </button>
              <AnimatePresence>
                {showProfile && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} style={{ position: 'absolute', top: '48px', right: 0, width: '240px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-2xl)', padding: '12px', boxShadow: 'var(--shadow-xl)', zIndex: 200 }}>
                    <div style={{ padding: '10px 12px', marginBottom: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(145deg,#6366f1,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>U</div>
                      <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>Account</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>user@example.com</p>
                    </div>
                    {[{ label: 'Profile', menu: 'profile-settings', icon: <User size={14} /> }, { label: 'Billing', menu: 'billing', icon: <CreditCard size={14} /> }].map((item) => (
                      <button key={item.menu} type="button" onClick={() => { goMenu(item.menu); setShowProfile(false); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 12px', borderRadius: '12px', border: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <div style={{ height: '1px', background: 'var(--border-light)', margin: '6px 0' }} />
                    <button type="button" onClick={onReset} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 12px', borderRadius: '12px', border: 'none', background: 'transparent', color: '#f43f5e', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
                      Sign out / new upload
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {(showNotifications || showProfile) && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 150 }} onClick={closeOverlays} aria-hidden />
        )}

        <motion.div ref={contentRef} className="dash-content">
          <AnimatePresence mode="wait">
            {activeMenu === 'dasbor' && (
              <motion.div
                key="dasbor"
                variants={dashPageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="dash-page"
              >
                <div className="dash-section-head">
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Overview</p>
                  <h1>Hello — your focus looks balanced today</h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', maxWidth: '560px', lineHeight: 1.6 }}>Light analytics — enough to choose your next priority without overload.</p>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="dash-stats-grid"
                >
                  <motion.div variants={staggerItem} style={{ minWidth: 0 }}>
                    <StatCard label="Documents" value="12" sub="3 this week" icon={<BookOpen size={18} />} accent="#6366f1" />
                  </motion.div>
                  <motion.div variants={staggerItem} style={{ minWidth: 0 }}>
                    <StatCard label="Flashcards" value="145" sub="reviews done" icon={<CheckCircle2 size={18} />} accent="#14b8a6" />
                  </motion.div>
                  <motion.div variants={staggerItem} style={{ minWidth: 0 }}>
                    <StatCard label="Streak" value="5 days" sub="best: 14" icon={<Flame size={18} />} accent="#f59e0b" />
                  </motion.div>
                  <motion.div variants={staggerItem} style={{ minWidth: 0 }}>
                    <StatCard label="Quiz avg" value="87%" sub="from 24 sets" icon={<TrendingUp size={18} />} accent="#a78bfa" />
                  </motion.div>
                </motion.div>

                {/* Analytics strip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="dash-analytics-grid"
                >
                  <div className="dash-card-pad" style={{ borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>Focus hours (7 days)</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>+12% vs last week</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                      {[42, 55, 38, 72, 48, 65, 58].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.55, delay: 0.08 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            flex: 1,
                            borderRadius: '10px 10px 6px 6px',
                            background: i === 3 ? 'linear-gradient(180deg, #6366f1, #8b5cf6)' : 'linear-gradient(180deg, color-mix(in srgb, #6366f1 35%, var(--bg-input)), var(--bg-input))',
                            minHeight: '8px',
                            border: '1px solid var(--border-light)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="neo-subtle dash-card-pad">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <Bot size={20} style={{ color: '#6366f1' }} />
                      <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>AI study assistant</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>Need a quick clarification from your last document? Open the tutor without leaving your flow.</p>
                    <button type="button" onClick={() => { setActiveMenu('belajar'); setActiveTab('chat'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                      Open tutor <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>

                {/* Featured + progress row */}
                <div className="dash-featured-grid">
                  <div className="dash-card-pad" style={{ borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)', background: 'color-mix(in srgb, var(--bg-card) 88%, transparent)', backdropFilter: 'blur(12px)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)' }}>Featured courses</h3>
                      <Sparkles size={16} color="var(--text-muted)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {featuredCourses.map((c) => (
                        <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '14px', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
                          <div style={{ width: '8px', alignSelf: 'stretch', borderRadius: '6px', background: c.color, opacity: 0.85 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>{c.title}</p>
                            <div style={{ height: '5px', borderRadius: '99px', background: 'var(--bg-input)', overflow: 'hidden' }}>
                              <div style={{ width: `${c.progress}%`, height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 60%, white))` }} />
                            </div>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', flexShrink: 0 }}>{c.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dash-card-pad" style={{ borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)', marginBottom: '16px' }}>Study progress</h3>
                    {[
                      { label: 'Summary', pct: 80, c: '#6366f1' },
                      { label: 'Quizzes', pct: 62, c: '#14b8a6' },
                      { label: 'Flashcard', pct: 45, c: '#a78bfa' },
                    ].map((p, i) => (
                      <div key={p.label} style={{ marginBottom: i < 2 ? '14px' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.label}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{p.pct}%</span>
                        </div>
                        <div style={{ height: '7px', background: 'var(--bg-input)', borderRadius: '99px', overflow: 'hidden' }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 0.85, delay: 0.1 + i * 0.12 }} style={{ height: '100%', background: p.c, borderRadius: '99px', opacity: 0.92 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dash-bottom-grid">
                  <div style={{ borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Trophy size={17} style={{ color: '#eab308' }} />
                      <h3 style={{ fontWeight: 700, fontSize: '14px' }}>Leaderboard</h3>
                    </div>
                    <div style={{ padding: '8px 12px 14px' }}>
                      {leaderboardRows.map((row) => (
                        <div key={row.rank} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 8px', borderRadius: '12px', background: row.you ? 'color-mix(in srgb, #6366f1 8%, transparent)' : 'transparent', border: row.you ? '1px solid color-mix(in srgb, #6366f1 18%, transparent)' : '1px solid transparent' }}>
                          <span style={{ width: '24px', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>{row.rank}</span>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.dot }} />
                          <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{row.name}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{row.xp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="neo-subtle dash-card-pad">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <Flame size={20} style={{ color: '#d97706' }} />
                      <h3 style={{ fontWeight: 700, fontSize: '14px' }}>Daily streak</h3>
                    </div>
                    <p style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-main)', marginBottom: '12px' }}>5 days</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {[1, 1, 1, 1, 1, 0, 0].map((on, idx) => (
                        <div key={idx} style={{ width: '32px', height: '32px', borderRadius: '10px', background: on ? 'linear-gradient(145deg, #6366f1, #7c3aed)' : 'var(--bg-input)', border: '1px solid var(--border-light)', opacity: on ? 1 : 0.5 }} />
                      ))}
                    </div>
                  </div>

                  <div className="dash-card-pad" style={{ borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <CalendarDays size={17} color="var(--text-muted)" />
                      <h3 style={{ fontWeight: 700, fontSize: '14px' }}>Study planner</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                      {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => (
                        <div key={d + i} style={{ textAlign: 'center' }}>
                          <p style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>{d}</p>
                          <div style={{ height: `${[36, 44, 28, 52, 40, 24, 20][i]}px`, borderRadius: '8px', background: i === 3 ? 'linear-gradient(180deg, #6366f1, #8b5cf6)' : 'var(--bg-input)', border: '1px solid var(--border-light)' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeMenu === 'belajar' && (
              <motion.div
                key="belajar"
                variants={dashPageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="dash-page"
              >
                <div className="dash-study-hero">
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Study room</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      <BookOpen size={14} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 'min(520px, 70vw)' }}>{fileName}</span>
                    </div>
                  </div>
                  <div style={{ padding: '10px 16px', borderRadius: '999px', color: 'var(--text-main)', fontWeight: 600, fontSize: '12px', border: '1px solid var(--border-light)', background: 'color-mix(in srgb, var(--bg-card) 70%, transparent)', backdropFilter: 'blur(8px)' }}>
                    ±{Math.round(fileText.length / 5)} kata
                  </div>
                </div>

                <div className="dash-study-tabs">
                  {features.map((f) => (
                    <motion.button
                      key={f.id}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setActiveTab(f.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '11px',
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-2xl)',
                        border: `1px solid ${activeTab === f.id ? f.color : 'var(--border-light)'}`,
                        background: activeTab === f.id ? f.bg : 'var(--bg-card)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'var(--font-sans)',
                        boxShadow: activeTab === f.id ? `0 8px 24px color-mix(in srgb, ${f.color} 18%, transparent)` : 'var(--shadow-sm)',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>{f.icon}</div>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: activeTab === f.id ? f.color : 'var(--text-main)' }}>{f.title}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="dash-study-panel">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={studyTabVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="dash-study-panel-inner"
                    >
                      {activeTab === 'summary' && <SummaryView text={fileText} />}
                      {activeTab === 'quiz' && <QuizView text={fileText} />}
                      {activeTab === 'flashcards' && <FlashcardView text={fileText} />}
                      {activeTab === 'chat' && <Chatbot text={fileText} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeMenu === 'riwayat' && (
              <motion.div
                key="riwayat"
                variants={dashPageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="dash-page"
              >
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '8px' }}>History</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Placeholder — connect a backend to list your documents.</p>
                <div style={{ borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)', background: 'var(--bg-card)', padding: '20px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>No entries yet. Upload a new PDF from the sidebar.</p>
                </div>
              </motion.div>
            )}

            {activeMenu === 'profile-settings' && (
              <motion.div key="profile" variants={dashPageVariants} initial="initial" animate="animate" exit="exit" className="dash-page">
                <ProfileSettings theme={theme} />
              </motion.div>
            )}
            {activeMenu === 'billing' && (
              <motion.div key="billing" variants={dashPageVariants} initial="initial" animate="animate" exit="exit" className="dash-page">
                <Billing theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <motion.button
        type="button"
        className="dash-fab"
        aria-label="Open AI tutor"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          setActiveMenu('belajar');
          setActiveTab('chat');
        }}
        style={{
          background: 'linear-gradient(145deg, color-mix(in srgb, var(--bg-card) 25%, #6366f1), #4c1d95)',
          border: '1px solid color-mix(in srgb, white 22%, transparent)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 40px rgba(79, 70, 229, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <MessageSquare size={22} color="white" strokeWidth={2} />
      </motion.button>
    </motion.div>
  );
};

export default Dashboard;
