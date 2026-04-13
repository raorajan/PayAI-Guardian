"use client";
import React, { useEffect, useState } from "react";

export default function FinancialHealthScore() {
  const [score, setScore] = useState(0);
  const targetScore = 842;

  useEffect(() => {
    const timer = setTimeout(() => {
      setScore(targetScore);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // SVG Gauge calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 1000) * circumference;

  return (
    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-base font-bold text-white mb-1">Health Score</h3>
          <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">AI Financial Audit</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#00C851]/10 border border-[#00C851]/30 text-[#00C851] text-[10px] font-black tracking-widest uppercase">
          Excellent
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4 relative z-10">
        <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 200 200">
          {/* Background Path */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Path */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#healthGradient)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
          <defs>
            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C8FF" />
              <stop offset="100%" stopColor="#8040FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
           <span className="text-5xl font-black text-white tracking-tighter tabular-nums" style={{ transition: "all 2s" }}>
             {score}
           </span>
           <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">out of 1000</span>
        </div>
      </div>

      <div className="mt-8 space-y-4 relative z-10">
        <div className="flex justify-between text-xs">
           <span className="text-white/40 font-medium">Liquidity Ratio</span>
           <span className="text-white font-bold">98%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-[#00C8FF] w-[98%]" />
        </div>
        
        <div className="flex justify-between text-xs pt-1">
           <span className="text-white/40 font-medium">Fraud Exposure</span>
           <span className="text-white font-bold">0.02%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-[#00C851] w-[2%]" />
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#8040FF]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
    </div>
  );
}
