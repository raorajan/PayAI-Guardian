"use client";
import React from "react";

const ACTIONS = [
  "Explain last risk audit",
  "Check UK tax compliance",
  "Block all debit payments",
  "Generate travel key",
];

export default function SuggestedActions() {
  return (
    <div className="flex flex-wrap gap-2.5 pl-20 max-w-[800px]">
       {ACTIONS.map((action, i) => (
         <button 
           key={i} 
           className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-[#00C8FF]/10 hover:border-[#00C8FF]/30 text-white/40 hover:text-[#00C8FF] text-[12px] font-bold transition-all shadow-lg"
         >
           {action}
         </button>
       ))}
    </div>
  );
}
