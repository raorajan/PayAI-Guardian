"use client";
import React, { useState } from "react";

interface Investment {
  id: string;
  name: string;
  symbol: string;
  type: "ETF" | "Stock" | "Crypto";
  price: number;
  change: number;
  riskLevel: "Low" | "Medium" | "High";
  recommendation: string;
  reasoning: string;
  performance: { month: number; year: number; threeYear: number };
  color: string;
}

const INVESTMENTS: Investment[] = [
  {
    id: "inv_001",
    name: "Vanguard S&P 500 ETF",
    symbol: "VOO",
    type: "ETF",
    price: 512.34,
    change: 0.85,
    riskLevel: "Low",
    recommendation: "Strong Buy",
    reasoning: "Consistent 10% annual returns over 30 years. Perfect for long-term wealth building with minimal risk.",
    performance: { month: 2.3, year: 24.5, threeYear: 45.2 },
    color: "#00C851",
  },
  {
    id: "inv_002",
    name: "Apple Inc.",
    symbol: "AAPL",
    type: "Stock",
    price: 178.52,
    change: 1.24,
    riskLevel: "Medium",
    recommendation: "Buy",
    reasoning: "Strong Q1 earnings, growing services revenue, and upcoming AI product launches position AAPL for growth.",
    performance: { month: 5.1, year: 32.8, threeYear: 78.4 },
    color: "#00C8FF",
  },
  {
    id: "inv_003",
    name: "Ethereum",
    symbol: "ETH",
    type: "Crypto",
    price: 2412.80,
    change: -2.45,
    riskLevel: "High",
    recommendation: "Hold",
    reasoning: "Recent pullback presents opportunity, but high volatility. Wait for stabilization before adding position.",
    performance: { month: -8.2, year: 58.3, threeYear: 245.6 },
    color: "#8040FF",
  },
];

export default function InvestmentRecommendations() {
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return { color: "#00C851", bg: "rgba(0,200,81,0.1)" };
      case "Medium": return { color: "#FFB800", bg: "rgba(255,184,0,0.1)" };
      case "High": return { color: "#FF3B5C", bg: "rgba(255,59,92,0.1)" };
      default: return { color: "#FFFFFF", bg: "rgba(255,255,255,0.1)" };
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Investment Recommendations</h2>
            <p className="text-[11px] text-white/40">AI-powered portfolio suggestions</p>
          </div>
        </div>
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="text-[11px] font-bold text-[#00C8FF] px-3 py-1.5 rounded-lg transition-all hover:bg-[#00C8FF]/10"
          style={{ border: "1px solid rgba(0,200,255,0.2)" }}
        >
          {showAnalysis ? "Hide Analysis" : "View Analysis"}
        </button>
      </div>

      {/* AI Analysis Summary */}
      {showAnalysis && (
        <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(128,64,255,0.05)", border: "1px solid rgba(128,64,255,0.15)" }}>
          <div className="text-[11px] font-bold text-[#8040FF] mb-2">📊 Portfolio Analysis</div>
          <div className="space-y-2">
            <div className="text-[11px] text-white/60">• Risk Tolerance: <span className="text-white font-bold">Moderate (6.5/10)</span></div>
            <div className="text-[11px] text-white/60">• Investment Horizon: <span className="text-white font-bold">5-10 years</span></div>
            <div className="text-[11px] text-white/60">• Recommended Allocation: <span className="text-white font-bold">70% Stocks / 20% ETFs / 10% Crypto</span></div>
            <div className="text-[11px] text-white/60">• Available to Invest: <span className="text-[#00C851] font-bold">$1,247/month</span></div>
          </div>
        </div>
      )}

      {/* Investment Cards */}
      <div className="space-y-4 mb-6">
        {INVESTMENTS.map((inv) => {
          const riskCfg = getRiskColor(inv.riskLevel);
          const isSelected = selectedInvestment === inv.id;
          return (
            <div
              key={inv.id}
              className={`p-5 rounded-xl cursor-pointer transition-all ${isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"}`}
              style={{
                background: isSelected ? "rgba(0,200,255,0.05)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isSelected ? "rgba(0,200,255,0.3)" : "rgba(255,255,255,0.05)"}`,
              }}
              onClick={() => setSelectedInvestment(isSelected ? null : inv.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-white">{inv.name}</span>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: riskCfg.color, background: riskCfg.bg }}
                    >
                      {inv.riskLevel} Risk
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white/40 font-mono">{inv.symbol}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/50">{inv.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white">${inv.price.toLocaleString()}</div>
                  <div
                    className="text-[11px] font-bold"
                    style={{ color: inv.change >= 0 ? "#00C851" : "#FF3B5C" }}
                  >
                    {inv.change >= 0 ? "+" : ""}{inv.change}%
                  </div>
                </div>
              </div>

              {/* Recommendation Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold px-3 py-1 rounded-full"
                  style={{
                    color: inv.color,
                    background: `${inv.color}15`,
                    border: `1px solid ${inv.color}30`,
                  }}
                >
                  {inv.recommendation}
                </span>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-[10px] text-white/30">{isSelected ? "Click to collapse" : "Click to expand"}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  {/* Performance */}
                  <div>
                    <div className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">Performance</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.02]">
                        <div className="text-[10px] text-white/30 mb-1">1 Month</div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: inv.performance.month >= 0 ? "#00C851" : "#FF3B5C" }}
                        >
                          {inv.performance.month >= 0 ? "+" : ""}{inv.performance.month}%
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02]">
                        <div className="text-[10px] text-white/30 mb-1">1 Year</div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: inv.performance.year >= 0 ? "#00C851" : "#FF3B5C" }}
                        >
                          {inv.performance.year >= 0 ? "+" : ""}{inv.performance.year}%
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.02]">
                        <div className="text-[10px] text-white/30 mb-1">3 Years</div>
                        <div
                          className="text-sm font-bold"
                          style={{ color: inv.performance.threeYear >= 0 ? "#00C851" : "#FF3B5C" }}
                        >
                          {inv.performance.threeYear >= 0 ? "+" : ""}{inv.performance.threeYear}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="p-3 rounded-lg" style={{ background: "rgba(0,200,255,0.03)", border: "1px solid rgba(0,200,255,0.1)" }}>
                    <div className="text-[10px] text-[#00C8FF] font-bold mb-1">AI Reasoning</div>
                    <div className="text-[11px] text-white/60 leading-relaxed">{inv.reasoning}</div>
                  </div>

                  {/* Buy Button */}
                  <button
                    className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${inv.color}, ${inv.color}CC)`,
                      boxShadow: `0 4px 16px ${inv.color}40`,
                    }}
                  >
                    Buy {inv.symbol}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="p-3 rounded-xl" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.1)" }}>
        <div className="text-[10px] text-white/50 leading-relaxed">
          ⚠️ <strong className="text-[#FFB800]">Disclaimer:</strong> These are AI-generated suggestions based on market analysis and your risk profile. Always do your own research before investing.
        </div>
      </div>
    </div>
  );
}
