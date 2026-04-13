"use client";
import React, { useState } from "react";

interface AdviceCard {
  id: string;
  question: string;
  advice: string;
  reasoning: string[];
  alternatives: string[];
  actionButtons: string[];
  marketData?: { label: string; value: string; trend: string }[];
  confidence: number;
}

const SAMPLE_ADVICE: AdviceCard = {
  id: "adv_001",
  question: "Should I invest $500?",
  advice: "Based on your current financial profile, I recommend a diversified approach. Allocate $300 to a low-cost S&P 500 index fund and $200 to an emergency savings buffer.",
  reasoning: [
    "Analyzed your spending patterns: You have $1,247 in disposable income this month",
    "Current emergency fund: $2,100 (below recommended 3-month reserve of $6,000)",
    "S&P 500 historical annual return: ~10% over past 30 years",
    "Your risk tolerance assessment: Moderate (6.5/10)",
    "Market conditions: Currently stable with low volatility index (VIX: 14.2)",
  ],
  alternatives: [
    "Conservative: Put entire $500 into high-yield savings (4.5% APY)",
    "Aggressive: Invest in growth stocks or crypto (higher risk, higher potential return)",
    "Balanced: 60% stocks / 40% bonds ETF allocation",
  ],
  actionButtons: ["Invest $300 in S&P 500", "Add to Emergency Fund", "Show More Options"],
  marketData: [
    { label: "S&P 500", value: "5,123.10", trend: "+0.85%" },
    { label: "VIX", value: "14.2", trend: "-2.1%" },
    { label: "10Y Treasury", value: "4.28%", trend: "+0.03%" },
  ],
  confidence: 87,
};

export default function FinancialAdvice() {
  const [showReasoning, setShowReasoning] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(128,64,255,0.15)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(128,64,255,0.12)" }}>
            <svg className="w-4 h-4 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">AI Financial Advice</h2>
        </div>
        <div
          className="px-3 py-1 rounded-full text-[10px] font-bold"
          style={{
            color: "#00C851",
            background: "rgba(0,200,81,0.1)",
            border: "1px solid rgba(0,200,81,0.2)",
          }}
        >
          {SAMPLE_ADVICE.confidence}% Confidence
        </div>
      </div>

      {/* Question */}
      <div
        className="p-4 rounded-xl mb-5"
        style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.15)" }}
      >
        <div className="text-[11px] text-white/40 mb-1">Your Question</div>
        <div className="text-sm font-bold text-white">{SAMPLE_ADVICE.question}</div>
      </div>

      {/* AI Advice */}
      <div className="mb-5">
        <div className="text-[11px] text-white/40 mb-2">AI Recommendation</div>
        <div className="text-[14px] text-white/80 leading-relaxed">{SAMPLE_ADVICE.advice}</div>
      </div>

      {/* Market Data Widget */}
      {SAMPLE_ADVICE.marketData && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {SAMPLE_ADVICE.marketData.map((data) => (
            <div
              key={data.label}
              className="p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="text-[10px] text-white/30 mb-1">{data.label}</div>
              <div className="text-sm font-bold text-white mb-0.5">{data.value}</div>
              <div
                className="text-[10px] font-bold"
                style={{ color: data.trend.startsWith("+") ? "#00C851" : "#FF3B5C" }}
              >
                {data.trend}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reasoning Chain (Collapsible) */}
      <div className="mb-5">
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          className="flex items-center justify-between w-full p-3 rounded-xl transition-all hover:bg-white/[0.02]"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs font-bold text-white/60">View Reasoning ({SAMPLE_ADVICE.reasoning.length} steps)</span>
          </div>
          <svg
            className={`w-4 h-4 text-white/40 transition-transform ${showReasoning ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showReasoning && (
          <div className="mt-3 space-y-2">
            {SAMPLE_ADVICE.reasoning.map((step, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "rgba(0,200,255,0.03)" }}>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold text-white"
                  style={{ background: "rgba(0,200,255,0.2)" }}
                >
                  {i + 1}
                </div>
                <div className="text-[11px] text-white/60 leading-relaxed">{step}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alternatives (Collapsible) */}
      <div className="mb-6">
        <button
          onClick={() => setShowAlternatives(!showAlternatives)}
          className="flex items-center justify-between w-full p-3 rounded-xl transition-all hover:bg-white/[0.02]"
          style={{ border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="text-xs font-bold text-white/60">Alternative Options</span>
          </div>
          <svg
            className={`w-4 h-4 text-white/40 transition-transform ${showAlternatives ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAlternatives && (
          <div className="mt-3 space-y-2">
            {SAMPLE_ADVICE.alternatives.map((alt, i) => (
              <div
                key={i}
                className="p-3 rounded-lg"
                style={{ background: "rgba(128,64,255,0.05)", border: "1px solid rgba(128,64,255,0.1)" }}
              >
                <div className="text-[11px] text-white/70 leading-relaxed">{alt}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {SAMPLE_ADVICE.actionButtons.map((action, i) => (
          <button
            key={i}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] ${
              i === 0
                ? "text-white"
                : i === 1
                ? "text-[#00C851]"
                : "text-white/50 hover:text-white/70"
            }`}
            style={{
              background:
                i === 0
                  ? "linear-gradient(135deg,#8040FF,#00C8FF)"
                  : i === 1
                  ? "rgba(0,200,81,0.1)"
                  : "rgba(255,255,255,0.03)",
              boxShadow: i === 0 ? "0 4px 16px rgba(128,64,255,0.3)" : "none",
              border: i === 1 ? "1px solid rgba(0,200,81,0.2)" : i === 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
