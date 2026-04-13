"use client";
import React from "react";

const SECURITY_ITEMS = [
  "End-to-End Encryption",
  "AI Fraud Monitoring",
  "Blockchain Verification",
  "Geo-fencing Alerts",
  "KYC / AML Compliant",
  "Read-only Bank Access",
];

export default function SecurityStatus() {
  const score = 99;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (score / 100);

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,81,0.12)" }}>
          <svg className="w-4 h-4 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Security Status</h2>
      </div>

      {/* Score Ring */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r={radius} fill="none"
              stroke="#00C851" strokeWidth="8"
              strokeDasharray={`${filled} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-black text-[#00C851]">{score}</div>
            <div className="text-[10px] text-white/40">/ 100</div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-[#00C851] font-semibold mb-5 tracking-widest">EXCELLENT PROTECTION</div>

      <div className="flex flex-col gap-3">
        {SECURITY_ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(0,200,81,0.15)", border: "1px solid rgba(0,200,81,0.3)" }}
            >
              <svg className="w-2.5 h-2.5 text-[#00C851]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[12px] text-white/60">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
