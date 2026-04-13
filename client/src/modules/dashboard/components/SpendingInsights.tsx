"use client";
import React, { useState } from "react";

const CATEGORIES = [
  { label: "Food & Dining", emoji: "🍕", amount: "$289", pct: 38, color: "#FF6B35", trend: "+28%" },
  { label: "Shopping", emoji: "🛒", amount: "$160", pct: 21, color: "#8040FF", trend: "-5%" },
  { label: "Entertainment", emoji: "🎬", amount: "$89", pct: 12, color: "#00C8FF", trend: "+15%" },
  { label: "Transport", emoji: "🚗", amount: "$67", pct: 9, color: "#00C851", trend: "-12%" },
  { label: "Health", emoji: "💊", amount: "$45", pct: 6, color: "#FFB800", trend: "+3%" },
  { label: "Other", emoji: "💼", amount: "$108", pct: 14, color: "rgba(255,255,255,0.3)", trend: "+8%" },
];

const AI_INSIGHTS = [
  {
    type: "warning",
    icon: "⚠️",
    title: "Food Spending Alert",
    description: "Your dining expenses are 28% above last month. Reducing restaurant visits by 3x/week could save ~$80/month.",
    savings: "$80/mo",
    confidence: 92,
  },
  {
    type: "success",
    icon: "✅",
    title: "Transport Savings",
    description: "Great job! You spent 12% less on transport compared to last month by using public transit more often.",
    savings: "$25/mo",
    confidence: 98,
  },
  {
    type: "info",
    icon: "💡",
    title: "Subscription Opportunity",
    description: "You have 5 active subscriptions totaling $67/month. Consider canceling unused ones to save an estimated $30/month.",
    savings: "$30/mo",
    confidence: 85,
  },
  {
    type: "warning",
    icon: "📊",
    title: "Shopping Trend Analysis",
    description: "Your online shopping has increased 15% over the past 3 months. Setting a monthly limit of $200 could prevent overspending.",
    savings: "$40/mo",
    confidence: 88,
  },
];

export default function AIInsightCard_Spending() {
  const [showInsights, setShowInsights] = useState(true);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const totalPotentialSavings = AI_INSIGHTS.reduce((sum, insight) => {
    const amount = parseInt(insight.savings.replace(/[^0-9]/g, ""));
    return sum + amount;
  }, 0);

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(128,64,255,0.12)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(128,64,255,0.12)" }}>
            <svg className="w-4 h-4 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">AI Spending Insights</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30">This month</span>
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="text-[10px] text-[#8040FF] hover:text-white transition-colors"
          >
            {showInsights ? "Hide" : "Show"} Insights
          </button>
        </div>
      </div>

      {/* Savings Summary */}
      <div className="p-4 rounded-xl mb-5" style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60">Potential Monthly Savings</span>
          <span className="text-2xl font-black text-[#00C851]">${totalPotentialSavings}</span>
        </div>
        <div className="text-[11px] text-white/40">Based on AI analysis of your spending patterns</div>
      </div>

      {/* Category Breakdown */}
      <div className="flex flex-col gap-4 mb-6">
        {CATEGORIES.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-base shrink-0">{item.emoji}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-white/60">{item.label}</span>
                <div className="flex gap-2 items-center">
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: item.trend.startsWith("+") ? "#FF3B5C" : "#00C851" }}
                  >
                    {item.trend}
                  </span>
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

      {/* AI Insights */}
      {showInsights && (
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-3">AI Recommendations</div>
          {AI_INSIGHTS.map((insight, i) => (
            <div
              key={i}
              className="p-4 rounded-xl"
              style={{
                background:
                  insight.type === "warning"
                    ? "rgba(255,59,92,0.05)"
                    : insight.type === "success"
                    ? "rgba(0,200,81,0.05)"
                    : "rgba(0,200,255,0.05)",
                border:
                  insight.type === "warning"
                    ? "1px solid rgba(255,59,92,0.15)"
                    : insight.type === "success"
                    ? "1px solid rgba(0,200,81,0.15)"
                    : "1px solid rgba(0,200,255,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{insight.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{insight.title}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        color: "#00C851",
                        background: "rgba(0,200,81,0.1)",
                      }}
                    >
                      Save {insight.savings}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50 leading-relaxed mb-2">{insight.description}</div>
                  
                  {/* AI Confidence & Expandable Reasoning */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${insight.confidence}%`,
                            background: insight.confidence > 90 ? "#00C851" : insight.confidence > 80 ? "#FFB800" : "#FF3B5C"
                          }} 
                        />
                      </div>
                      <span className="text-[9px] text-white/40">AI {insight.confidence}%</span>
                    </div>
                    <button
                      onClick={() => setExpandedInsight(expandedInsight === i ? null : i)}
                      className="text-[9px] text-[#8040FF] hover:text-white transition-colors"
                    >
                      {expandedInsight === i ? "Hide" : "Show"} Analysis
                    </button>
                  </div>

                  {/* Expanded Analysis */}
                  {expandedInsight === i && (
                    <div className="mt-3 p-3 rounded-lg bg-black/30 border border-white/10">
                      <div className="text-[10px] font-bold text-white/60 mb-2">AI Analysis Chain:</div>
                      <ul className="space-y-1.5">
                        <li className="text-[10px] text-white/50 flex items-start gap-2">
                          <span className="text-[#8040FF] mt-0.5">•</span>
                          Analyzed 90 days of transaction history in {insight.title.includes("Food") ? "Food & Dining" : insight.title.includes("Transport") ? "Transportation" : "Shopping"} category
                        </li>
                        <li className="text-[10px] text-white/50 flex items-start gap-2">
                          <span className="text-[#8040FF] mt-0.5">•</span>
                          Compared with previous quarter spending patterns
                        </li>
                        <li className="text-[10px] text-white/50 flex items-start gap-2">
                          <span className="text-[#8040FF] mt-0.5">•</span>
                          Identified {insight.confidence}% probability of savings through behavioral adjustment
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
