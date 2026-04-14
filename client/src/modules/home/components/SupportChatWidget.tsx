"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addUserMessage, addAssistantMessage, sendOnboardingMessage } from "../slice/homeSlice";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const COMMON_QUESTIONS: Record<string, string> = {
  "is this real banking?": "We use Plaid to link real banks and Stripe for transfers. However, our sandbox environment uses fake money so you can test everything safely without risk.",
  "do you store my bank password?": "Never. Plaid uses secure, read-only access—we can see balances for monitoring but can't touch your money without your explicit approval.",
  "what happens if ai blocks a real payment?": "You'll get an instant alert with a clear explanation. You can override it with one click, and every override helps our AI learn your patterns better.",
  "can i trust investment advice?": "Our AI pulls live market data and shows the reasoning for every recommendation. While highly accurate, we always recommend consulting a human advisor for major decisions.",
  "how is this free?": "Our sandbox and standard security features are free forever. Premium banking features and high-volume fraud protection have small fees, but you only pay when you go live.",
};

const ONBOARDING_CHIPS = [
  "Show me how fraud protection works",
  "What makes you different?",
  "Take me to the demo",
  "Is my money safe?",
];

export default function SupportChatWidget() {
  const dispatch = useAppDispatch();
  const { chatMessages: messages, chatLoading: isTyping } = useAppSelector((s) => s.home);
  
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-Greet Logic
  useEffect(() => {
    const isNewUser = !localStorage.getItem("payai_visited");
    if (isNewUser && !hasGreeted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasGreeted(true);
        localStorage.setItem("payai_visited", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content?: string) => {
    const textToSend = content || message;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    dispatch(addUserMessage(userMsg));
    setMessage("");

    // 1. Check Local Pre-programmed Answers
    const lowInput = textToSend.toLowerCase().replace(/[?]/g, "").trim();
    if (COMMON_QUESTIONS[lowInput]) {
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: COMMON_QUESTIONS[lowInput],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        dispatch(addAssistantMessage(aiMsg));
      }, 800);
      return;
    }

    // 2. Handle Guided Tour Logic (Specific Chips)
    if (textToSend === "Show me how fraud protection works") {
       handleTourResponse("Great choice! Our AI scans every transaction in under 100ms. I'll simulate a fraud attempt in your dashboard so you can see it in action. Ready?");
       return;
    }
    if (textToSend === "What makes you different?") {
       handleTourResponse("Unlike traditional banks, we block fraud BEFORE it happens, not after. Plus, I'm here 24/7 to help with financial decisions. Want to see a live example?");
       return;
    }

    // 3. Dispatch Redux Thunk for OpenAI Call
    const history = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    dispatch(sendOnboardingMessage({
      messages: [...history, { role: "user", content: textToSend }]
    }));
  };

  const handleTourResponse = (content: string) => {
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      dispatch(addAssistantMessage(aiMsg));
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="mb-4 w-[340px] h-[460px] bg-[#0A0F1A]/95 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,200,255,0.1)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out"
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

            {/* Chips */}
            {!isTyping && messages.length < 3 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {ONBOARDING_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00C8FF] hover:bg-[#00C8FF] hover:text-[#020408] hover:border-transparent transition-all"
                  >
                    {chip}
                  </button>
                ))}
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
                onClick={() => handleSend()}
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
