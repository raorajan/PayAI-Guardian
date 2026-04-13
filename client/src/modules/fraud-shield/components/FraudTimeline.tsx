"use client";
import React from "react";
import { useAppSelector } from "@/redux/store";
import { SecurityEvent } from "../slice/fraudShieldSlice";

export default function FraudTimeline() {
  const { events } = useAppSelector((s) => s.fraudShield);

  return (
    <div className="flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-3xl shadow-2xl">
      <div className="p-8 border-b border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black italic tracking-tighter">Live Audit</h3>
            <span className="flex items-center gap-1 text-[9px] font-black text-[#00C8FF] uppercase tracking-widest bg-[#00C8FF]/10 px-2 py-1 rounded-md">
               <span className="w-1 h-1 rounded-full bg-[#00C8FF] anim-pulse-glow" />
               Streaming
            </span>
         </div>
         <p className="text-[11px] text-white/30 uppercase font-bold tracking-widest">System Event Serialization</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
         {events.map((event: SecurityEvent, i: number) => (
           <div key={event.id} className="relative flex gap-6 group">
              {/* Timeline Thread */}
              {i < events.length - 1 && (
                <div className="absolute left-3 top-8 bottom-[-32px] w-[1px] bg-gradient-to-b from-white/10 to-transparent" />
              )}
              
              {/* Event Marker */}
              <div className="relative shrink-0 mt-1">
                 <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                   event.severity === "high" ? "bg-[#FF3B5C]/10 border-[#FF3B5C]/30 text-[#FF3B5C]" : 
                   event.severity === "medium" ? "bg-[#FFD400]/10 border-[#FFD400]/30 text-[#FFD400]" : 
                   "bg-white/5 border-white/10 text-white/40"
                 }`}>
                    {event.type === "block" ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                 </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                 <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-[13px] font-black uppercase tracking-tight group-hover:translate-x-1 transition-transform cursor-pointer ${
                      event.severity === "high" ? "text-[#FF3B5C]" : "text-white/80"
                    }`}>
                      {event.title}
                    </h4>
                    <span className="text-[10px] font-bold text-white/20 tabular-nums">{event.timestamp}</span>
                 </div>
                 <p className="text-[12px] text-white/40 leading-relaxed font-medium">
                   {event.description}
                 </p>
                 
                 {event.status === "active" && (
                    <button className="mt-3 px-3 py-1.5 rounded-lg bg-[#FF3B5C]/10 border border-[#FF3B5C]/20 text-[9px] font-black text-[#FF3B5C] uppercase tracking-[0.2em] hover:bg-[#FF3B5C]/20 transition-all">
                       Investigate
                    </button>
                 )}
              </div>
           </div>
         ))}
      </div>

      <div className="p-8 border-t border-white/5">
         <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black text-white/40 uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all">
            Export SOC Logs
         </button>
      </div>
    </div>
  );
}
