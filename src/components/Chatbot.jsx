import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getChatResponse } from '../utils/ai';

const Chatbot = ({ text }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI Tutor from BrainMate. Do you have any questions about this document?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(text, messages, input);
      setMessages([...newMessages, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'bot', text: `Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '450px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid var(--border-light)' }}>
        <Sparkles color="var(--color-red)" size={20} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>Tutor Chat</h3>
      </div>

      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}
      >
        {messages.map((msg, i) => (
          <div key={i} className="slack-message" style={{ display: 'flex', gap: '12px', padding: '8px 16px', margin: '0 -16px', borderRadius: '8px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              backgroundColor: msg.role === 'bot' ? 'var(--primary)' : 'var(--btn-bg)',
              color: msg.role === 'bot' ? 'white' : 'var(--text-main)'
            }}>
              {msg.role === 'bot' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontWeight: 900, color: 'var(--text-main)', fontSize: '15px' }}>
                  {msg.role === 'bot' ? 'BrainMate Tutor' : 'You'}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  12:00 PM
                </span>
              </div>
              <div className="prose" style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.46' }}>
                {msg.role === 'bot' ? (
                  <div style={{ '& > p:last-child': { marginBottom: 0 } }}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="slack-message" style={{ display: 'flex', gap: '12px', padding: '8px 16px', margin: '0 -16px', borderRadius: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'var(--btn-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Loader2 className="animate-spin" size={18} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '15px', fontStyle: 'italic' }}>
                AI is typing...
              </span>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          disabled={isTyping}
          style={{
            width: '100%', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-heavy)',
            borderRadius: '30px', padding: '16px 20px', paddingRight: '56px', outline: 'none',
            fontSize: '15px', color: 'var(--text-main)'
          }}
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '10px', color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
