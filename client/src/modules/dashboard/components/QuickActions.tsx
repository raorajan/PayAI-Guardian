"use client";
import React, { useState } from "react";

type SimState = "idle" | "simulating" | "blocked" | "approved";

export default function QuickActions() {
  const [simState, setSimState] = useState<SimState>("idle");
  const [simType, setSimType] = useState<"normal" | "fraud">("normal");
  const [progress, setProgress] = useState(0);

  const runSim = (type: "normal" | "fraud") => {
    setSimType(type);
    setSimState("simulating");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setSimState(type === "fraud" ? "blocked" : "approved");
          return 100;
        }
        return p + 5;
      });
    }, 60);
  };

  const reset = () => {
    setSimState("idle");
    setProgress(0);
  };

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,59,92,0.15)" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(255,59,92,0.12)" }}>
          <svg className="w-4 h-4 text-[#FF3B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Live Fraud Simulator</h2>
        <span className="text-[10px] text-[#FF3B5C] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.2)" }}>
          DEMO
        </span>
      </div>
      <p className="text-[13px] text-white/40 mb-6">Watch the AI analyze a transaction in real-time. Simulate a normal vs. fraudulent payment.</p>

      {/* Idle State */}
      {simState === "idle" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => runSim("normal")}
              className="flex flex-col items-center gap-2 p-5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "rgba(0,200,81,0.08)", border: "1px solid rgba(0,200,81,0.2)" }}
            >
              <div className="text-2xl">✅</div>
              <div className="text-sm font-semibold text-[#00C851]">Normal Payment</div>
              <div className="text-[11px] text-white/40 text-center">Starbucks — $6.50<br />Your usual location</div>
            </button>
            <button
              onClick={() => runSim("fraud")}
              className="flex flex-col items-center gap-2 p-5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "rgba(255,59,92,0.08)", border: "1px solid rgba(255,59,92,0.2)" }}
            >
              <div className="text-2xl">🚨</div>
              <div className="text-sm font-semibold text-[#FF3B5C]">Fraud Attempt</div>
              <div className="text-[11px] text-white/40 text-center">Unknown — $4,999<br />Lagos, Nigeria</div>
            </button>
          </div>
          <div className="text-center text-[11px] text-white/25">Click either card to run the AI analysis</div>
        </div>
      )}

      {/* Simulating */}
      {simState === "simulating" && (
        <div className="flex flex-col items-center gap-5">
          <div className="text-base font-semibold text-white">AI Analyzing Transaction...</div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: simType === "fraud" ? "linear-gradient(90deg,#FF3B5C,#FF6B35)" : "linear-gradient(90deg,#00C851,#00C8FF)",
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 w-full">
            {[{ label: "Location", done: progress > 30 }, { label: "Velocity", done: progress > 60 }, { label: "Pattern", done: progress > 85 }].map((c) => (
              <div
                key={c.label}
                className="flex flex-col items-center gap-1 p-3 rounded-lg transition-all"
                style={{
                  background: c.done ? "rgba(0,200,81,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${c.done ? "rgba(0,200,81,0.2)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <div className="text-lg">{c.done ? "✅" : "⏳"}</div>
                <div className="text-[10px] text-white/50">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="text-[12px] text-white/40">{progress}% analyzed</div>
        </div>
      )}

      {/* Blocked */}
      {simState === "blocked" && (
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,59,92,0.12)", border: "2px solid rgba(255,59,92,0.4)", boxShadow: "0 0 30px rgba(255,59,92,0.2)" }}>
            <span className="text-3xl">🚫</span>
          </div>
          <div className="text-lg font-black text-[#FF3B5C]">FRAUD BLOCKED</div>
          <div className="text-[13px] text-white/50 text-center">The AI detected suspicious activity and blocked the transaction in under 100ms.</div>
          <div className="w-full p-4 rounded-xl" style={{ background: "rgba(255,59,92,0.05)", border: "1px solid rgba(255,59,92,0.15)" }}>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div><span className="text-white/40">Amount:</span> <span className="text-[#FF3B5C] font-bold">$4,999</span></div>
              <div><span className="text-white/40">Location:</span> <span className="text-white/70">Lagos, NG</span></div>
              <div><span className="text-white/40">Risk Score:</span> <span className="text-[#FF3B5C] font-bold">98/100</span></div>
              <div><span className="text-white/40">Decision:</span> <span className="text-[#FF3B5C] font-bold">Auto-blocked</span></div>
            </div>
          </div>
          <button onClick={reset} className="text-sm text-white/50 hover:text-white transition-colors">Run again →</button>
        </div>
      )}

      {/* Approved */}
      {simState === "approved" && (
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(0,200,81,0.12)", border: "2px solid rgba(0,200,81,0.4)", boxShadow: "0 0 30px rgba(0,200,81,0.2)" }}>
            <span className="text-3xl">✅</span>
          </div>
          <div className="text-lg font-black text-[#00C851]">APPROVED IN 98ms</div>
          <div className="text-[13px] text-white/50 text-center">Transaction verified as legitimate and processed instantly.</div>
          <div className="w-full p-4 rounded-xl" style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div><span className="text-white/40">Amount:</span> <span className="text-[#00C851] font-bold">$6.50</span></div>
              <div><span className="text-white/40">Merchant:</span> <span className="text-white/70">Starbucks</span></div>
              <div><span className="text-white/40">Risk Score:</span> <span className="text-[#00C851] font-bold">2/100</span></div>
              <div><span className="text-white/40">Decision:</span> <span className="text-[#00C851] font-bold">Auto-approved</span></div>
            </div>
          </div>
          <button onClick={reset} className="text-sm text-white/50 hover:text-white transition-colors">Run again →</button>
        </div>
      )}
    </div>
  );
}
