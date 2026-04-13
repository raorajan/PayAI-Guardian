"use client";
import React, { useState } from "react";
import Link from "next/link";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

const QUICK_QUESTIONS = [
  "Should I invest my bonus?",
  "How can I save more?",
  "Analyze my spending",
  "What is my fraud risk?",
];

const AI_RESPONSES: Record<string, string> = {
  "Should I invest my bonus?":
    "Based on your spending patterns and current market conditions, I recommend: 40% into a diversified ETF index fund (VTI or SPY), 30% into a high-yield savings account for liquidity, 20% into tech/AI sector ETFs, and 10% into your emergency fund. Your AI Trust Score of 99/100 reflects excellent financial discipline! 📈",
  "How can I save more?":
    "Analyzing your last 30 days: you spent $289 on food & dining (28% above average), $48 on subscriptions, and $160 on shopping. Quick wins: (1) Switch to a shared streaming plan → save $8/mo, (2) Meal prep 3×/week → save ~$80/mo, (3) Cancel unused subscriptions → ~$30/mo savings. Total estimated savings: $118/mo 💰",
  "Analyze my spending":
    "Here's your breakdown for this month: 🍕 Food & Dining: $289 (38%), 🛒 Shopping: $160 (21%), 🎬 Entertainment: $89 (12%), 🚗 Transport: $67 (9%), 💊 Health: $45 (6%), 💼 Other: $108 (14%). Your fraud protection saved you $4,999 this month! Overall financial health score: 87/100 — Great work! 🌟",
  "What is my fraud risk?":
    "Your current fraud risk profile is LOW (99/100 safety score). Active protections: ✅ AI Shield 24/7, ✅ Geo-fencing alerts, ✅ Velocity checks, ✅ Behavioral biometrics, ✅ Device fingerprinting. This month, the AI blocked 1 high-risk transaction worth $4,999 from Lagos, Nigeria. Your account is well-protected! 🛡️",
};

export default function AIInsightCard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: "👋 Hi! I'm your personal AI banking assistant. Ask me anything about your finances, savings, or investments!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    setTimeout(() => {
      const reply =
        AI_RESPONSES[msg] ??
        "I'm analyzing your financial data... Based on your profile, I recommend reviewing your budget goals and enabling additional fraud protection layers. Is there anything specific you'd like to explore? 💡";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
      setLoading(false);
    }, 1400);
  };

  return (
    <div
      className="rounded-[20px] flex flex-col backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(128,64,255,0.2)", minHeight: "420px" }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8040FF] to-[#00C8FF] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-bold text-white">AI Banking Assistant</div>
          <div className="text-[10px] text-[#8040FF]">● Online — 2s avg response</div>
        </div>

        <Link
          href="/ai-assistant"
          className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#8040FF]/10 border border-[#8040FF]/20 text-[10px] font-black text-[#8040FF] uppercase tracking-widest hover:bg-[#8040FF]/20 transition-all no-underline group"
        >
          <span>Command Center</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto max-h-[280px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-[1.6]"
              style={
                msg.role === "ai"
                  ? { background: "rgba(128,64,255,0.12)", border: "1px solid rgba(128,64,255,0.2)", color: "rgba(255,255,255,0.85)" }
                  : { background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.25)", color: "rgba(255,255,255,0.9)" }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(128,64,255,0.12)", border: "1px solid rgba(128,64,255,0.2)" }}>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8040FF] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick questions */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="text-[11px] px-2.5 py-1 rounded-lg text-[#8040FF] hover:bg-[#8040FF]/20 transition-colors"
            style={{ background: "rgba(128,64,255,0.08)", border: "1px solid rgba(128,64,255,0.2)" }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask your AI banker anything..."
            className="flex-1 px-4 py-2.5 rounded-xl text-[13px] text-white placeholder-white/30 outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <button
            onClick={() => send()}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #8040FF, #00C8FF)", boxShadow: "0 0 14px rgba(128,64,255,0.3)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
