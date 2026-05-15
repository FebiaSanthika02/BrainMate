import React from 'react';
import { CreditCard, Zap, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Billing = ({ theme }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="view-container"
      className="dash-page dash-stack"
      style={{ padding: 0, width: '100%', maxWidth: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
        <CreditCard size={32} color="var(--primary)" />
        <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Billing & Subscription</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Current Plan */}
        <div style={{ background: 'var(--primary-glow)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-heavy)', position: 'relative', overflow: 'hidden' }}>
          <Zap size={100} color="var(--primary)" style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div>
              <p style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Current Plan</p>
              <h3 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-main)', marginBottom: '8px' }}>Pro Tier</h3>
              <p style={{ color: 'var(--text-main)', opacity: 0.8, fontSize: '15px' }}>$15.00 / month. Next billing date is Oct 1, 2026.</p>
            </div>
            <button style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--color-btn-primary)', color: 'var(--color-btn-primary-text)', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}>
              Manage Plan
            </button>
          </div>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '14px', fontWeight: 600 }}>
              <CheckCircle2 size={16} color="var(--color-green)" /> Unlimited AI Summaries
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '14px', fontWeight: 600 }}>
              <CheckCircle2 size={16} color="var(--color-green)" /> GPT-4 Integration
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '14px', fontWeight: 600 }}>
              <CheckCircle2 size={16} color="var(--color-green)" /> Priority Support
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ background: 'var(--bg-input)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} /> Payment Method
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#1A1F36', padding: '6px 12px', borderRadius: '4px', color: 'white', fontWeight: 900, fontStyle: 'italic', fontSize: '12px' }}>VISA</div>
              <div>
                <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '15px' }}>Visa ending in 4242</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Expires 12/28</p>
              </div>
            </div>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--color-blue)', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>Edit</button>
          </div>
        </div>

        {/* Billing History */}
        <div style={{ background: 'var(--bg-input)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} /> Billing History
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '13px' }}>
                <th style={{ padding: '12px 8px', fontWeight: 700 }}>Date</th>
                <th style={{ padding: '12px 8px', fontWeight: 700 }}>Amount</th>
                <th style={{ padding: '12px 8px', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '12px 8px', fontWeight: 700 }}>Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-main)', fontSize: '14px' }}>
                <td style={{ padding: '16px 8px' }}>Sep 1, 2026</td>
                <td style={{ padding: '16px 8px', fontWeight: 700 }}>$15.00</td>
                <td style={{ padding: '16px 8px' }}><span style={{ background: 'rgba(46, 182, 125, 0.2)', color: 'var(--color-green)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 800 }}>Paid</span></td>
                <td style={{ padding: '16px 8px' }}><button style={{ background: 'transparent', border: 'none', color: 'var(--color-blue)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>Download</button></td>
              </tr>
              <tr style={{ color: 'var(--text-main)', fontSize: '14px' }}>
                <td style={{ padding: '16px 8px' }}>Aug 1, 2026</td>
                <td style={{ padding: '16px 8px', fontWeight: 700 }}>$15.00</td>
                <td style={{ padding: '16px 8px' }}><span style={{ background: 'rgba(46, 182, 125, 0.2)', color: 'var(--color-green)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 800 }}>Paid</span></td>
                <td style={{ padding: '16px 8px' }}><button style={{ background: 'transparent', border: 'none', color: 'var(--color-blue)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </motion.div>
  );
};

export default Billing;
