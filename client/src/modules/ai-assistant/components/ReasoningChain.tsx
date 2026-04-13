"use client";
import React, { useEffect, useState } from "react";

interface Props {
  steps: string[];
}

export default function ReasoningChain({ steps }: Props) {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  useEffect(() => {
    setVisibleSteps(0);
    const interval = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev < steps.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [steps]);

  if (steps.length === 0) return (
    <div className="flex flex-col items-center justify-center p-12 border border-white/5 bg-white/[0.02] rounded-3xl opacity-20 border-dashed">
       <svg className="w-8 h-8 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86 1.558l-1.574 1.574a2 2 0 01-1.12.551l-2.097.42a2 2 0 01-2.316-2.316l.42-2.097a2 2 0 01.551-1.12l1.574-1.574a6 6 0 001.558-3.86l-.477-2.387a2 2 0 00-.547-1.022L6.1 2.1a2 2 0 00-2.828 0L2.1 3.272a2 2 0 000 2.828l10.5 10.5a2 2 0 002.828 0l1.172-1.172a2 2 0 000-2.828L15.428 11.428" />
       </svg>
       <span className="text-[10px] font-bold uppercase tracking-widest text-center">Standby... No active<br/>reasoning session</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 font-mono">
       <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#00C8FF] tracking-[0.2em] uppercase">Guardian OS Logic</span>
          <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">v4.0.2-SECURE</span>
       </div>

       <div className="space-y-3">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-4 transition-all duration-500 overflow-hidden ${
                i < visibleSteps ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 max-h-0"
              }`}
            >
              <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                 <div className={`w-1.5 h-1.5 rounded-full ${i === visibleSteps - 1 ? "bg-[#00C8FF] anim-pulse-glow" : "bg-white/10"}`} />
                 {i < steps.length - 1 && <div className="w-[1px] h-6 bg-white/5" />}
              </div>
              <div className="flex-1">
                 <div className={`text-[12px] leading-relaxed transition-colors ${
                   i === visibleSteps - 1 ? "text-[#00C8FF]" : "text-white/40"
                 }`}>
                   <span className="opacity-30 mr-2">[{i.toString().padStart(2, '0')}]</span>
                   {step}
                 </div>
                 {i === visibleSteps - 1 && (
                   <div className="mt-1 h-[2px] w-full bg-[#00C8FF]/10 overflow-hidden rounded-full">
                      <div className="h-full bg-[#00C8FF] w-[30%] animate-loading-bar" />
                   </div>
                 )}
              </div>
            </div>
          ))}
       </div>

       <style jsx>{`
         @keyframes loading-bar {
           0% { transform: translateX(-100%); width: 30%; }
           100% { transform: translateX(400%); width: 30%; }
         }
         .animate-loading-bar {
           animation: loading-bar 1.5s infinite linear;
         }
       `}</style>
    </div>
  );
}
