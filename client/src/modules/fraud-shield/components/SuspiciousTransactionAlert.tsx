"use client";
import React from "react";
import FraudExplanation from "./FraudExplanation";
import OverrideButton from "./OverrideButton";
import UserFeedbackButtons from "./UserFeedbackButtons";

export default function SuspiciousTransactionAlert() {
  const transaction = {
    id: "tx_9982x",
    merchant: "Electronics Hub (Lagos)",
    amount: "$4,999.00",
    time: "09:42 AM",
    risk: "High"
  };

  return (
    <div className="p-8 rounded-[32px] bg-white/[0.03] border border-[#FF3B5C]/20 backdrop-blur-3xl relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-2xl bg-[#FF3B5C]/10 border border-[#FF3B5C]/20 flex items-center justify-center text-[#FF3B5C] shadow-[0_0_20px_rgba(255,59,92,0.2)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
           </div>
           <div>
              <h3 className="text-xl font-black text-white italic tracking-tighter">Intercepted Block</h3>
              <p className="text-[10px] font-black text-[#FF3B5C] uppercase tracking-widest">Action Required: Authorization Locked</p>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="p-5 rounded-[24px] bg-black/40 border border-white/5">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] block mb-1">Impact</span>
              <span className="text-2xl font-black text-white tabular-nums">{transaction.amount}</span>
           </div>
           <div className="p-5 rounded-[24px] bg-black/40 border border-white/5">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] block mb-1">Entity</span>
              <span className="text-sm font-bold text-white/80 truncate block">{transaction.merchant}</span>
           </div>
        </div>

        <FraudExplanation />

        <div className="flex flex-col gap-3 mt-8">
           <OverrideButton />
           <UserFeedbackButtons />
        </div>
      </div>

      {/* Aesthetic Red Glow Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-[#FF3B5C]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-[#FF3B5C]/5 rounded-full blur-2xl" />
    </div>
  );
}
