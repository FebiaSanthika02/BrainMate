import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, Layers, Loader2, AlertCircle } from 'lucide-react';
import { getFlashcards } from '../utils/ai';

const FlashcardView = ({ text }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      if (!text) return;
      setLoading(true);
      setError(null);
      try {
        const result = await getFlashcards(text);
        setFlashcards(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [text]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '15px' }}>
        <Loader2 className="animate-spin" size={40} color="var(--color-yellow)" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>AI is preparing your flashcards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '15px', color: '#ef4444' }}>
        <AlertCircle size={40} />
        <p style={{ textAlign: 'center', maxWidth: '80%' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', paddingBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
          <Layers color="var(--color-yellow)" size={20} />
          Flashcards AI
        </h3>
        <span style={{ fontSize: '13px', fontWeight: 700, padding: '6px 16px', backgroundColor: 'var(--btn-bg)', borderRadius: '20px', color: 'var(--text-muted)' }}>
          {currentIndex + 1} / {flashcards.length}
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '4/5', cursor: 'pointer', perspective: '1000px' }} onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-heavy)', borderRadius: '30px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '30px', textAlign: 'center', backfaceVisibility: 'hidden', backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ color: 'var(--color-yellow)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Question</span>
            <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.4 }}>{flashcards[currentIndex]?.front}</p>
            <div style={{ marginTop: 'auto', color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={14} /> Click to flip
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(236, 178, 46, 0.1)', border: '1px solid var(--color-yellow)', borderRadius: '30px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '30px', textAlign: 'center', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
              boxShadow: '0 0 30px rgba(236, 178, 46, 0.1)'
            }}
          >
            <span style={{ color: 'var(--color-yellow)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Answer</span>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-dark)', fontWeight: 600 }}>{flashcards[currentIndex]?.back}</p>
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          style={{ padding: '14px', borderRadius: '50%', backgroundColor: 'var(--btn-bg)', border: '1px solid var(--border-heavy)', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
          style={{ padding: '12px 30px', borderRadius: '30px', backgroundColor: 'var(--color-yellow)', color: '#452a09', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '16px' }}
        >
          Flip Card
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          style={{ padding: '14px', borderRadius: '50%', backgroundColor: 'var(--btn-bg)', border: '1px solid var(--border-heavy)', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardView;
