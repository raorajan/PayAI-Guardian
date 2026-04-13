"use client";
import React from "react";

const RECORDS = [
  { hash: "0x3f4a...8b2c", type: "Payment", amount: "$6.50", time: "2s ago", block: 19482103 },
  { hash: "0x1c9d...4e7f", type: "Fraud Block", amount: "$4,999", time: "34s ago", block: 19482098 },
  { hash: "0x7b2e...1a3d", type: "Receive", amount: "$250.00", time: "2m ago", block: 19482085 },
  { hash: "0x9f1c...6b8a", type: "Subscription", amount: "$15.99", time: "1h ago", block: 19479201 },
];

export default function SpendingChart() {
  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.12)" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
          <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Blockchain Audit Trail</h2>
        <span
          className="ml-auto text-[10px] px-2 py-0.5 rounded-full text-[#00C8FF]"
          style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)" }}
        >
          Immutable
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {RECORDS.map((rec) => (
          <div
            key={rec.hash}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] shadow-[0_0_5px_#00C8FF] shrink-0" />
              <div>
                <div className="text-[12px] font-mono text-[#00C8FF]">{rec.hash}</div>
                <div className="text-[10px] text-white/35">Block #{rec.block.toLocaleString()} · {rec.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[12px] text-white/70">{rec.type}</div>
                <div className="text-[11px] font-bold text-white/60">{rec.amount}</div>
              </div>
              <div
                className="flex items-center gap-1 text-[10px] text-[#00C851]"
                style={{ background: "rgba(0,200,81,0.08)", border: "1px solid rgba(0,200,81,0.2)", padding: "2px 6px", borderRadius: "4px" }}
              >
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                verified
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl text-center" style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.08)" }}>
        <div className="text-[11px] text-white/30">All records are tamper-proof and permanently stored on-chain</div>
      </div>
    </div>
  );
}
