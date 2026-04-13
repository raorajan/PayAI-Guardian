"use client";
import React from "react";

const CATEGORIES = [
  { label: "Food & Dining", emoji: "🍕", amount: "$289", pct: 38, color: "#FF6B35" },
  { label: "Shopping", emoji: "🛒", amount: "$160", pct: 21, color: "#8040FF" },
  { label: "Entertainment", emoji: "🎬", amount: "$89", pct: 12, color: "#00C8FF" },
  { label: "Transport", emoji: "🚗", amount: "$67", pct: 9, color: "#00C851" },
  { label: "Health", emoji: "💊", amount: "$45", pct: 6, color: "#FFB800" },
  { label: "Other", emoji: "💼", amount: "$108", pct: 14, color: "rgba(255,255,255,0.3)" },
];

export default function AIInsightCard_Spending() {
  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(128,64,255,0.12)" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(128,64,255,0.12)" }}>
          <svg className="w-4 h-4 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Spending Insights</h2>
        <span className="ml-auto text-[10px] text-white/30">This month</span>
      </div>

      <div className="flex flex-col gap-4">
        {CATEGORIES.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-base shrink-0">{item.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-white/60">{item.label}</span>
                <div className="flex gap-2">
                  <span className="text-[12px] text-white/40">{item.pct}%</span>
                  <span className="text-[12px] font-semibold text-white/80">{item.amount}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(128,64,255,0.08)", border: "1px solid rgba(128,64,255,0.15)" }}>
        <div className="flex items-start gap-2">
          <div className="text-[#8040FF] shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#8040FF] mb-0.5">AI Insight</div>
            <div className="text-[11px] text-white/50 leading-relaxed">
              Your food spending is 28% above average. Reducing dining out by 3x/week could save ~$80/mo. 💡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
