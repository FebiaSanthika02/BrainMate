import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Copy, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { getSummary } from '../utils/ai';

const SummaryView = ({ text }) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!text) return;
      setLoading(true);
      setError(null);
      try {
        const result = await getSummary(text);
        setSummary(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [text]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'var(--text-main)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles color="var(--color-blue)" size={20} />
          Smart Summary
        </h3>
        {!loading && !error && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px', background: 'var(--btn-bg)', borderRadius: '8px', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} title="Copy">
              <Copy size={16} />
            </button>
            <button style={{ padding: '8px 16px', background: 'var(--color-blue)', color: 'white', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              Export PDF
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px 0 8px' }} aria-busy aria-label="Loading summary">
            <div className="skeleton-shimmer" style={{ height: '14px', width: '44%', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ height: '12px', width: '100%', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ height: '12px', width: '96%', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ height: '12px', width: '88%', borderRadius: '8px' }} />
            <div style={{ height: '20px' }} />
            <div className="skeleton-shimmer" style={{ height: '12px', width: '72%', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ height: '12px', width: '100%', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ height: '12px', width: '92%', borderRadius: '8px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
              <span style={{ display: 'inline-flex', animation: 'spin 0.9s linear infinite' }}>
                <Loader2 size={18} color="var(--primary)" />
              </span>
              <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>AI is analyzing your material…</p>
            </div>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '15px', color: '#ef4444' }}>
            <AlertCircle size={40} />
            <p style={{ textAlign: 'center', maxWidth: '80%' }}>{error}</p>
          </div>
        ) : (
          <div className="prose">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryView;
