import React, { useState } from 'react';
import { User, Lock, Shield, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid var(--border-light)',
  background: 'var(--bg-main)',
  color: 'var(--text-main)',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const ProfileSettings = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('user@example.com');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dash-page"
      style={{ width: '100%', maxWidth: '100%', padding: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--dash-section-gap)', paddingBottom: 'var(--space-5)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={22} color="#6366f1"/>
        </div>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>Profile Settings</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '2px' }}>Manage your account details</p>
        </div>
      </div>

      <div className="dash-stack">
        {/* Personal Info */}
        <div className="dash-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={16} color="#6366f1"/> Personal information
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="dash-card">
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={16} color="#6366f1"/> Security
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-light)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-sans)', transition: 'all 0.2s' }}>
              Change password
            </button>
            <button style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', color: '#6366f1', fontWeight: 600, cursor: 'pointer', fontSize: '14px', fontFamily: 'var(--font-sans)', transition: 'all 0.2s' }}>
              <Shield size={15}/> Enable two-factor authentication
            </button>
          </div>
        </div>

        <button style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '15px', fontFamily: 'var(--font-sans)', boxShadow: 'var(--shadow-primary)' }}>
          <Save size={16}/> Save changes
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileSettings;
