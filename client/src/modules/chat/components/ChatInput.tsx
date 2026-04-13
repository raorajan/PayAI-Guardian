"use client";
import React, { useState } from "react";

interface Props {
  recipientName: string;
}

export default function ChatInput({ recipientName }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      {/* Quick Action Chips */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00C8FF]/10 hover:border-[#00C8FF]/30 text-white/60 hover:text-[#00C8FF] text-[12px] font-bold transition-all flex items-center gap-2 group">
          <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Quick Pay
        </button>
        <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white text-[12px] font-bold transition-all flex items-center gap-2 group">
          <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Request Split
        </button>
        <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-[#00C8FF]/5 border border-[#00C8FF]/20 hover:bg-[#00C8FF]/10 text-[#00C8FF] text-[12px] font-bold transition-all flex items-center gap-2 group shadow-[0_0_10px_rgba(0,200,255,0.05)]">
          <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          AI Audit Chat
        </button>
        <button className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white text-[12px] font-bold transition-all flex items-center gap-2 group">
          <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Schedule Transfer
        </button>
      </div>

      {/* Main Input Bar */}
      <div className="p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-end gap-2 shadow-2xl relative">
        {/* Attachment Toggle */}
        <button className="p-3 mb-0.5 rounded-xl hover:bg-white/5 text-white/30 hover:text-[#00C8FF] transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.415a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Message ${recipientName}...`}
          style={{ maxHeight: "150px" }}
          className="flex-1 bg-transparent border-none focus:ring-0 text-white text-[14px] leading-relaxed py-3.5 px-2 resize-none no-scrollbar placeholder:text-white/20"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />

        <div className="flex items-center gap-1 mb-1 mr-1">
          <button className="p-3 rounded-xl hover:bg-white/5 text-white/30 hover:text-[#8040FF] transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <button 
            className={`p-3 rounded-xl transition-all shadow-lg ${
              text.trim() 
                ? "bg-[#0A66C2] text-white shadow-[#00C8FF]/20" 
                : "bg-white/5 text-white/10 grayscale cursor-not-allowed"
            }`}
            disabled={!text.trim()}
          >
            <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* AI Monitoring Badge (Floating) */}
        <div className="absolute right-0 top-[-40px] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C8FF]/10 border border-[#00C8FF]/20">
           <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] anim-pulse-glow" />
           <span className="text-[10px] font-black text-[#00C8FF] tracking-widest uppercase">AI SECURE CHANNEL</span>
        </div>
      </div>
    </div>
  );
}
