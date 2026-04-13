"use client";
import React, { useState } from "react";

interface BudgetCategory {
  category: string;
  emoji: string;
  limit: number;
  spent: number;
  color: string;
}

const BUDGET_DATA: BudgetCategory[] = [
  { category: "Food & Dining", emoji: "🍕", limit: 400, spent: 289, color: "#FF6B35" },
  { category: "Shopping", emoji: "🛒", limit: 300, spent: 160, color: "#8040FF" },
  { category: "Entertainment", emoji: "🎬", limit: 150, spent: 89, color: "#00C8FF" },
  { category: "Transport", emoji: "🚗", limit: 200, spent: 67, color: "#00C851" },
  { category: "Health", emoji: "💊", limit: 100, spent: 45, color: "#FFB800" },
  { category: "Utilities", emoji: "💡", limit: 250, spent: 180, color: "#FF3B5C" },
];

export default function BudgetPlanning() {
  const [monthlyIncome] = useState(5000);
  const totalBudget = BUDGET_DATA.reduce((sum, cat) => sum + cat.limit, 0);
  const totalSpent = BUDGET_DATA.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;
  const savings = monthlyIncome - totalSpent;

  const getBudgetStatus = (spent: number, limit: number) => {
    const pct = (spent / limit) * 100;
    if (pct >= 90) return { status: "Critical", color: "#FF3B5C", bg: "rgba(255,59,92,0.1)" };
    if (pct >= 75) return { status: "Warning", color: "#FFB800", bg: "rgba(255,184,0,0.1)" };
    return { status: "On Track", color: "#00C851", bg: "rgba(0,200,81,0.1)" };
  };

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,81,0.15)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,81,0.12)" }}>
            <svg className="w-4 h-4 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">AI Budget Planning</h2>
        </div>
        <div className="text-[10px] text-white/40">April 2026</div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-4 rounded-xl" style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}>
          <div className="text-[10px] text-white/40 mb-1">Monthly Income</div>
          <div className="text-xl font-black text-white">${monthlyIncome.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "rgba(255,59,92,0.05)", border: "1px solid rgba(255,59,92,0.15)" }}>
          <div className="text-[10px] text-white/40 mb-1">Total Spent</div>
          <div className="text-xl font-black text-[#FF3B5C]">${totalSpent.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.15)" }}>
          <div className="text-[10px] text-white/40 mb-1">Remaining</div>
          <div className="text-xl font-black text-[#00C8FF]">${remaining.toLocaleString()}</div>
        </div>
      </div>

      {/* Savings Progress */}
      <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(128,64,255,0.05)", border: "1px solid rgba(128,64,255,0.15)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-white">Potential Savings</span>
          <span className="text-sm font-black text-[#8040FF]">${savings.toLocaleString()}</span>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(savings / monthlyIncome) * 100}%`, background: "linear-gradient(90deg,#8040FF,#00C8FF)" }}
          />
        </div>
        <div className="text-[10px] text-white/40 mt-1">{((savings / monthlyIncome) * 100).toFixed(0)}% of income saved</div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-3 mb-6">
        {BUDGET_DATA.map((cat) => {
          const pct = (cat.spent / cat.limit) * 100;
          const status = getBudgetStatus(cat.spent, cat.limit);
          return (
            <div key={cat.category} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{cat.emoji}</span>
                  <span className="text-xs font-bold text-white">{cat.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ color: status.color, background: status.bg }}
                  >
                    {status.status}
                  </span>
                  <span className="text-xs text-white/60">
                    ${cat.spent} / ${cat.limit}
                  </span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 90 ? "#FF3B5C" : pct >= 75 ? "#FFB800" : cat.color }}
                />
              </div>
              {pct >= 90 && (
                <div className="text-[10px] text-[#FF3B5C] mt-1 font-semibold">
                  ⚠️ Only ${(cat.limit - cat.spent).toFixed(0)} remaining!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div className="p-4 rounded-xl" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.15)" }}>
        <div className="text-[11px] font-bold text-[#00C8FF] mb-3">💡 AI Budget Recommendations</div>
        <ul className="space-y-2">
          <li className="text-[11px] text-white/60 flex items-start gap-2">
            <span className="text-[#00C851] mt-0.5">✓</span>
            <span>Food spending is 28% over budget. Consider meal prepping to save ~$80/month</span>
          </li>
          <li className="text-[11px] text-white/60 flex items-start gap-2">
            <span className="text-[#00C851] mt-0.5">✓</span>
            <span>Transport budget is underutilized. Reallocate $50 to emergency fund</span>
          </li>
          <li className="text-[11px] text-white/60 flex items-start gap-2">
            <span className="text-[#FFB800] mt-0.5">⚠</span>
            <span>Entertainment spending trending up. Set alert at $120 threshold</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
