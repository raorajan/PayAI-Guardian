"use client";
import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your AI Guardian assistant. How can I help you explore PayAI today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(message),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getMockResponse = (input: string) => {
    const lowInput = input.toLowerCase();
    if (lowInput.includes("security")) return "PayAI Guardian uses real-time AI fraud detection and blockchain-based auditing to keep your funds safe.";
    if (lowInput.includes("pricing") || lowInput.includes("free")) return "We have a free tier for individuals and premium plans for power users and businesses. Check our Pricing section for details!";
    if (lowInput.includes("transfer")) return "Transfers are instant and protected by our AI Fraud Shield. You can send money via username or wallet address.";
    return "That's a great question! PayAI Guardian is designed to revolutionize how you handle finances with AI-driven security. Is there something specific about our features you'd like to know?";
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="mb-4 w-[340px] h-[480px] bg-[#0A0F1A]/95 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,200,255,0.1)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#00C8FF]/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#00C8FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,200,255,0.3)]">
                <svg className="w-4 h-4 text-[#020408]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-white uppercase tracking-wider">AI Assistant</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#00C851] animate-pulse" />
                  <span className="text-[9px] text-[#00C851] font-bold uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div 
                  className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#00C8FF] text-[#020408] font-medium rounded-tr-none shadow-[0_8px_16px_rgba(0,200,255,0.15)]" 
                      : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[8px] text-white/20 mt-1 font-bold uppercase tracking-tighter">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2 text-white/40">
                <div className="flex gap-1 py-2 px-3 bg-white/5 rounded-2xl">
                  <div className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-white/5 bg-white/[0.02]">
            <div className="relative flex items-center gap-2">
              <input 
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message assistant..."
                className="flex-1 bg-white/5 border border-white/10 text-white text-[13px] px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#00C8FF]/50 transition-all placeholder:text-white/20"
              />
              <button 
                onClick={handleSend}
                disabled={!message.trim()}
                className={`p-2.5 rounded-xl transition-all ${
                  message.trim() 
                    ? "bg-[#00C8FF] text-[#020408] hover:scale-105" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative h-12 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-500 ${
          isOpen 
            ? "bg-white/10 w-12 px-0" 
            : "bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] shadow-[0_0_20px_rgba(0,200,255,0.3)] hover:scale-105"
        }`}
      >
        {!isOpen ? (
          <>
            <div className="absolute inset-0 rounded-full bg-[#00C8FF] animate-ping opacity-10 group-hover:opacity-20" />
            <svg className="w-4 h-4 text-[#020408]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-sm font-bold text-[#020408] uppercase tracking-wider">PayAI Help</span>
          </>
        ) : (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 200, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
