"use client";
import React from "react";

interface Props {
  data?: {
    amount: string;
    recipient: string;
    riskScore: number;
    reason: string;
  };
}

export default function TransactionApprovalCard({ data = { 
  amount: "$1,250.00", 
  recipient: "Unknown Exchange (NY)", 
  riskScore: 88, 
  reason: "Unusual destination and amount for your current location."
} }: Props) {
  return (
    <div className="p-8 rounded-3xl bg-[#FF3B5C]/5 border border-[#FF3B5C]/20 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-10 h-10 rounded-xl bg-[#FF3B5C]/10 flex items-center justify-center text-[#FF3B5C] shadow-[0_0_15px_rgba(255,59,92,0.2)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
           </div>
           <div>
              <h4 className="text-lg font-black text-white tracking-tight">Intercepted Transaction</h4>
              <p className="text-[10px] font-bold text-[#FF3B5C] uppercase tracking-widest">Action Required: Immediate Audit</p>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
           <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Impact</span>
              <span className="text-xl font-black text-white">{data.amount}</span>
           </div>
           <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Risk Index</span>
              <span className="text-xl font-black text-[#FF3B5C] tabular-nums">{data.riskScore}/100</span>
           </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 mb-8">
           <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI Assessment
           </div>
           <p className="text-[13px] text-white/80 leading-relaxed italic">
             "{data.reason} Guardian suggests a identity challenge before release."
           </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
           <button className="flex-1 py-4 rounded-xl bg-white text-[#020408] font-black text-sm hover:bg-white/90 transition-all shadow-xl">
             Approve with Biometrics
           </button>
           <button className="flex-1 py-4 rounded-xl bg-[#FF3B5C]/20 border border-[#FF3B5C]/30 text-[#FF3B5C] font-black text-sm hover:bg-[#FF3B5C]/30 transition-all">
             Block & Secure Account
           </button>
        </div>
      </div>

      {/* Background Warning Elements */}
      <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#FF3B5C]/5 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute top-0 right-0 p-4 opacity-5">
         <svg className="w-32 h-32 rotate-12" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
         </svg>
      </div>
    </div>
  );
}
