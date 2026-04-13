"use client";
import React from "react";

export default function UserFeedbackButtons() {
  return (
    <div className="flex gap-3">
       <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white/40 font-black text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
          Dismiss
       </button>
       <button className="flex-2 py-4 px-6 rounded-xl bg-[#FF3B5C]/10 border border-[#FF3B5C]/30 text-[#FF3B5C] font-black text-sm uppercase tracking-widest hover:bg-[#FF3B5C]/20 transition-all">
          Confirm Fraud
       </button>
    </div>
  );
}
