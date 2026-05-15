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
        <Sparkles color="var(--color-cyan)" size={20} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>Tutor Chat</h3>
      </div>

      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              backgroundColor: msg.role === 'bot' ? 'rgba(0, 240, 255, 0.15)' : 'var(--btn-bg)',
              color: msg.role === 'bot' ? 'var(--color-cyan)' : 'var(--text-main)'
            }}>
              {msg.role === 'bot' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div style={{ 
              padding: '14px 18px', borderRadius: '20px', maxWidth: '85%', fontSize: '15px', lineHeight: '1.6',
              backgroundColor: msg.role === 'bot' ? 'var(--btn-bg)' : 'var(--primary)',
              color: msg.role === 'bot' ? 'var(--text-main)' : 'white',
              border: msg.role === 'bot' ? '1px solid var(--border-light)' : 'none',
              borderTopLeftRadius: msg.role === 'bot' ? '4px' : '20px',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '20px',
            }}>
              {msg.role === 'bot' ? (
                <div style={{ '& > p:last-child': { marginBottom: 0 } }}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Loader2 className="animate-spin" size={18} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <div style={{ padding: '14px 18px', borderRadius: '20px', backgroundColor: 'var(--btn-bg)', border: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '15px', fontStyle: 'italic', borderTopLeftRadius: '4px' }}>
              AI is typing...
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
