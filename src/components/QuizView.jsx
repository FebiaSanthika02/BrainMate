import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getQuiz } from '../utils/ai';

const QuizView = ({ text }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!text) return;
      setLoading(true);
      setError(null);
      try {
        const result = await getQuiz(text);
        setQuestions(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [text]);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fdc34f', '#3465d9']
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '15px' }}>
        <Loader2 className="animate-spin" size={40} color="var(--color-yellow)" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>AI is generating questions...</p>
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

  if (isFinished) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', padding: '40px 0' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255, 176, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <CheckCircle2 color="var(--color-yellow)" size={48} />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>Quiz Completed!</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '16px' }}>Your Score: <span style={{ color: 'var(--color-yellow)', fontWeight: 800 }}>{score} / {questions.length}</span></p>
        <button onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '24px', backgroundColor: 'var(--color-yellow)', color: '#452a09', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}>
          <RotateCcw size={18} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>AI Quizzes</h3>
        <span style={{ fontSize: '13px', fontWeight: 700, padding: '6px 16px', backgroundColor: 'var(--btn-bg)', borderRadius: '20px', color: 'var(--text-muted)' }}>
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', lineHeight: '1.5', color: 'var(--text-main)' }}>
          {questions[currentQuestion]?.question}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {questions[currentQuestion]?.options.map((option, i) => {
            let borderColor = 'var(--border-heavy)';
            let bgColor = 'var(--btn-bg)';
            let textColor = 'var(--text-main)';
            
            if (selectedAnswer === i) {
              if (isCorrect) {
                borderColor = 'var(--color-yellow)';
                bgColor = 'rgba(255, 176, 0, 0.1)';
                textColor = 'var(--color-yellow)';
              } else {
                borderColor = '#ef4444';
                bgColor = 'rgba(239, 68, 68, 0.1)';
                textColor = '#ef4444';
              }
            } else if (selectedAnswer !== null && i === questions[currentQuestion].correct) {
              borderColor = 'var(--color-yellow)';
              bgColor = 'rgba(255, 176, 0, 0.1)';
              textColor = 'var(--color-yellow)';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  border: `2px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  color: textColor,
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: selectedAnswer === null ? 'pointer' : 'default',
                  fontWeight: 600,
                  fontSize: '15px',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseOver={(e) => {
                  if (selectedAnswer === null) {
                    e.currentTarget.style.backgroundColor = 'var(--btn-hover)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedAnswer === null) {
                    e.currentTarget.style.backgroundColor = bgColor;
                  }
                }}
              >
                {option}
                {selectedAnswer === i && (
                  isCorrect ? <CheckCircle2 size={20} color="var(--color-yellow)" /> : <XCircle size={20} color="#ef4444" />
                )}
                {selectedAnswer !== null && i === questions[currentQuestion].correct && i !== selectedAnswer && (
                  <CheckCircle2 size={20} color="var(--color-yellow)" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {selectedAnswer !== null && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={nextQuestion} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '24px', backgroundColor: 'var(--color-yellow)', color: '#452a09', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}>
            Next <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;
