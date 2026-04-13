"use client";
import React from "react";

export default function RiskScoreGauge() {
  const riskValue = 18; // 0-100
  const radius = 90;
  const circumference = Math.PI * radius; // Half circle
  const progress = (riskValue / 100) * circumference;

  return (
    <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-base font-bold text-white mb-1">Exposure Level</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Systemic Risk Score</p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[14px] font-black text-[#00C851]">OPTIMAL</span>
           <span className="text-[9px] text-white/30 uppercase font-bold tracking-tighter">No Active Breaches</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center relative mt-4">
        <svg className="w-64 h-32" viewBox="0 0 200 100">
          {/* Background Arc */}
          <path
            d="M 10 90 A 80 80 0 0 1 190 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-white/5"
          />
          {/* Risk Segments (background) */}
          <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="url(#riskTrack)" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.1" />
          
          {/* Progress Arc */}
          <path
            d="M 10 90 A 80 80 0 0 1 190 90"
            fill="none"
            stroke="url(#riskGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(255,59,92,0.3)]"
          />

          <defs>
            <linearGradient id="riskTrack" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#00C851" />
               <stop offset="50%" stopColor="#FFD400" />
               <stop offset="100%" stopColor="#FF3B5C" />
            </linearGradient>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C851" />
              <stop offset="100%" stopColor="#00C8FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-2 flex flex-col items-center">
           <span className="text-4xl font-black text-white tracking-tighter tabular-nums">{riskValue}%</span>
           <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Risk Index</span>
        </div>
      </div>

      {/* Grid of secondary statuses */}
      <div className="mt-10 grid grid-cols-2 gap-4">
         <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <div className="text-[9px] font-black text-white/30 uppercase mb-1">Fingerprint</div>
            <div className="text-sm font-bold text-white/80 italic">STABLE</div>
         </div>
         <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <div className="text-[9px] font-black text-white/30 uppercase mb-1">Velocity</div>
            <div className="text-sm font-bold text-[#00C851]">NOMINAL</div>
         </div>
      </div>

      {/* Aesthetic scanner line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3B5C]/20 to-transparent animate-scanner" />
      
      <style jsx>{`
        @keyframes scanner {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanner {
          animation: scanner 4s infinite linear;
        }
      `}</style>
    </div>
  );
}
