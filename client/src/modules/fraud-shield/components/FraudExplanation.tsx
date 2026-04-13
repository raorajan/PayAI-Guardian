"use client";
import React from "react";

export default function FraudExplanation() {
  return (
    <div className="p-6 rounded-2xl bg-[#FF3B5C]/5 border border-[#FF3B5C]/10 border-dashed">
       <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B5C] anim-pulse-glow" />
          <span className="text-[10px] font-black text-[#FF3B5C] uppercase tracking-widest">AI Assessment Detail</span>
       </div>
       <p className="text-[13px] text-white/50 leading-relaxed italic">
         "Attempted transaction volume (x24) exceeded velocity parameters for this node. Source IP is associated with high-frequency botnet activity in West Africa."
       </p>
    </div>
  );
}
