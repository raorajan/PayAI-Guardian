"use client";
import React from "react";

interface Props {
  content: string;
  timestamp: string;
}

export default function AIMessage({ content, timestamp }: Props) {
  return (
    <div className="flex flex-col items-start gap-4 pr-20">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C8FF] to-[#0A66C2] flex items-center justify-center shadow-[0_0_15px_rgba(0,200,255,0.4)]">
            <svg className="w-5 h-5 text-[#020408]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
         </div>
         <div className="flex flex-col">
            <span className="text-[12px] font-black text-[#00C8FF] uppercase tracking-[0.2em]">Guardian AI</span>
            <span className="text-[9px] text-white/20 font-bold uppercase tracking-tighter">SECURE_NODE_TX_{timestamp.replace(":", "")}</span>
         </div>
      </div>
      
      <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-[#00C8FF]/20 to-[#8040FF]/10 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
         <div className="relative px-8 py-6 rounded-3xl bg-white/[0.04] border border-white/10 text-white leading-relaxed text-[16px] backdrop-blur-3xl shadow-2xl">
           {content.split('\n').map((line, i) => (
             <p key={i} className={i > 0 ? "mt-4" : ""}>{line}</p>
           ))}
         </div>
      </div>
    </div>
  );
}
