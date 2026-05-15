import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, ArrowLeft, Loader2, Moon, Sun } from 'lucide-react';

const LoginPage = ({ onBack, onSuccess, theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    onSuccess?.({ email: email.trim() });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'var(--bg-main)',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 48px)',
      }}
    >
      <div className="lp-mesh" aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />

      <button
        type="button"
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '20px',
          left: 'clamp(16px, 4vw, 32px)',
          zIndex: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '14px',
          border: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          position: 'fixed',
          top: '20px',
          right: 'clamp(16px, 4vw, 32px)',
          zIndex: 10,
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          border: '1px solid var(--border-light)',
          background: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-muted)',
        }}
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Brain size={28} style={{ color: '#6366f1' }} strokeWidth={2.2} />
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '8px' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Sign in to sync progress, streaks, and your study library.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(24px, 4vw, 32px)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {error && (
            <p style={{ fontSize: '13px', color: '#f43f5e', marginBottom: '16px', padding: '10px 12px', borderRadius: '12px', background: 'color-mix(in srgb, #f43f5e 8%, transparent)', border: '1px solid color-mix(in srgb, #f43f5e 20%, transparent)' }}>
              {error}
            </p>
          )}

          <label style={{ display: 'block', marginBottom: '18px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Email</span>
            <motion.div whileFocus={{ scale: 1.01 }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: '14px', border: '1px solid var(--border-light)', background: 'var(--bg-input)' }}>
              <Mail size={18} color="var(--text-muted)" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                autoComplete="email"
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: 'var(--text-main)', fontFamily: 'var(--font-sans)' }}
              />
            </motion.div>
          </label>

          <label style={{ display: 'block', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Password</span>
            <motion.div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: '14px', border: '1px solid var(--border-light)', background: 'var(--bg-input)' }}>
              <Lock size={18} color="var(--text-muted)" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '15px', color: 'var(--text-main)', fontFamily: 'var(--font-sans)' }}
              />
            </motion.div>
          </label>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6d28d9 55%, #0f766e 165%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: 'var(--font-sans)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 10px 28px rgba(79, 70, 229, 0.28)',
              opacity: loading ? 0.85 : 1,
            }}
          >
            {loading ? <Loader2 size={18} style={{ animation: 'spin 0.9s linear infinite' }} /> : null}
            {loading ? 'Signing in…' : 'Sign in'}
          </motion.button>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            No account?{' '}
            <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '13px' }}>
              Start free on the homepage
            </button>
          </p>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
