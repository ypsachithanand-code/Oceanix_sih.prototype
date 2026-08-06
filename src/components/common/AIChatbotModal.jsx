import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles, FileText, HelpCircle, RefreshCw } from 'lucide-react';
import { CHATBOT_QA_PAIRS, CHATBOT_DEFAULT_FALLBACK } from '../../mock/marineData';

export default function AIChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello Commander. I am Oceanix AI Intelligence. How can I assist your marine research or policy analysis today?',
      citations: ['Oceanix Knowledge Core v4.2'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestedChips = [
    "Show bleaching alerts in Andaman",
    "How is Marine Health Index computed?",
    "Whale sightings near Chennai",
    "How do I export CSV marine data?"
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and keyword search
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedPair = CHATBOT_QA_PAIRS.find(pair =>
        pair.keywords.some(kw => lowerQuery.includes(kw))
      );

      const responseText = matchedPair ? matchedPair.answer : CHATBOT_DEFAULT_FALLBACK.answer;
      const citations = matchedPair ? matchedPair.citations : CHATBOT_DEFAULT_FALLBACK.citations;

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        citations: citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-lg h-[640px] glass-panel rounded-2xl flex flex-col shadow-2xl border border-[#50d6f9]/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#092134]/90 border-b border-[#162c3f] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/oceanix-logo.png" 
              alt="Oceanix Logo" 
              className="w-9 h-9 rounded-full object-cover shadow-lg shadow-[#50d6f9]/20 border border-[#50d6f9]/40 bg-white p-0.5"
            />
            <div>
              <h3 className="font-semibold text-white text-base flex items-center space-x-2">
                <span>Oceanix AI Assistant</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <p className="text-xs text-[#9BB7C9] font-mono">Autonomous Marine Intelligence Copilot</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#9BB7C9] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Chips */}
        <div className="px-4 py-2 bg-[#001526]/80 border-b border-[#162c3f] overflow-x-auto flex space-x-2 no-scrollbar">
          {suggestedChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-xs bg-[#0b3954]/70 hover:bg-[#50d6f9]/20 border border-[#50d6f9]/30 text-[#D6E7F3] px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-[#50d6f9]" />
              <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#001526]/40">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-[#0b3954] to-[#2d9bc9] text-white rounded-br-none border border-[#50d6f9]/30' 
                    : 'bg-[#092134] text-[#cfe5ff] rounded-bl-none border border-[#162c3f]'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                {/* Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#162c3f] text-xs text-[#9BB7C9] flex flex-wrap gap-1.5 items-center">
                    <span className="font-mono text-[10px] text-[#50d6f9] uppercase tracking-wider flex items-center">
                      Sources:
                    </span>
                    {msg.citations.map((cite, cIdx) => (
                      <span key={cIdx} className="bg-[#0b3954]/80 text-[#78d1ff] text-[10px] font-mono px-2 py-0.5 rounded border border-[#50d6f9]/20">
                        {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#9BB7C9] mt-1 px-1 font-mono">{msg.timestamp}</span>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="bg-[#092134] p-3 rounded-2xl rounded-bl-none border border-[#162c3f] flex items-center space-x-2">
                <span className="text-xs text-[#50d6f9] font-mono">Analyzing sensor data</span>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#50d6f9] animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#50d6f9] animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#50d6f9] animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#092134] border-t border-[#162c3f] flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI about marine telemetry, SST, coral health..."
            className="flex-1 glass-input px-4 py-2.5 rounded-full text-sm placeholder-[#9BB7C9]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-[#50d6f9] hover:bg-[#78d1ff] disabled:opacity-50 text-[#001526] font-bold flex items-center justify-center transition-all duration-200 shadow-md"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
