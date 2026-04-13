"use client";
import React, { useState } from "react";

function FraudDemoTerminal() {
  const [step, setStep] = useState<"idle" | "normal" | "fraud" | "blocked">("idle");
  const [loading, setLoading] = useState(false);

  const runDemo = async () => {
    setStep("idle");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setStep("normal");
    await new Promise((r) => setTimeout(r, 1800));
    setStep("fraud");
    await new Promise((r) => setTimeout(r, 1400));
    setStep("blocked");
    setLoading(false);
  };

  return (
    <div
      className="rounded-[20px] p-8 backdrop-blur-xl relative overflow-hidden"
      style={{
        background: "rgba(8,12,30,0.7)",
        border: "1px solid rgba(0,200,255,0.15)",
        boxShadow: "0 0 60px rgba(0,100,220,0.12)",
      }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/60 to-transparent" />

      {/* Terminal top bar */}
      <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-white/6">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs text-white/40 font-mono">PayAI Fraud Detection Engine v2.1</span>
      </div>

      {/* Output area */}
      <div className="min-h-[140px] flex flex-col gap-2.5">
        {step === "idle" && (
          <div className="text-white/40 text-[14px] font-mono">
            <span className="text-[#00C8FF]">$</span> Ready to simulate fraud detection...
          </div>
        )}

        {step === "normal" && (
          <>
            {[
              "Transaction from: Known Device (iPhone 15, NYC) ✓",
              "Amount: $49.99 — within spending profile ✓",
              "Risk Score: 2/100 — APPROVED in 94ms ✓",
            ].map((line) => (
              <div key={line} className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#00C851] shadow-[0_0_8px_#00C851] shrink-0" />
                <span className="text-[#00C851] font-mono text-[13px]">{line}</span>
              </div>
            ))}
          </>
        )}

        {step === "fraud" && (
          <>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#FFA500] shadow-[0_0_8px_#FFA500] shrink-0 animate-pulse" />
              <span className="text-[#FFA500] font-mono text-[13px]">⚠ New transaction: Unknown device — Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#FF3B5C] shadow-[0_0_8px_#FF3B5C] shrink-0" />
              <span className="text-[#FF3B5C] font-mono text-[13px]">Amount: $4,999.00 — 100x above average spend</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#FF3B5C] shadow-[0_0_8px_#FF3B5C] shrink-0" />
              <span className="text-[#FF3B5C] font-mono text-[13px]">Analyzing 847 behavioral signals... Risk Score: 96/100</span>
            </div>
          </>
        )}

        {step === "blocked" && (
          <>
            <div className="p-4 rounded-xl mb-3 bg-[#FF3B5C]/10 border border-[#FF3B5C]/30">
              <div className="text-[#FF3B5C] font-mono text-[14px] font-bold mb-1.5">🚨 FRAUD BLOCKED — 87ms</div>
              <div className="text-white/60 text-[13px]">
                Suspicious transaction from new location blocked automatically. No funds transferred.
              </div>
            </div>
            <div className="text-white/50 text-[12px] font-mono">
              Reasons: New device + Unusual location + Abnormal amount + Velocity anomaly
            </div>
            <div className="text-[#00C8FF] text-[12px] font-mono">
              → Notification sent to your registered email &amp; phone
            </div>
          </>
        )}
      </div>

      {/* Run button */}
      <button
        id="run-fraud-demo-btn"
        onClick={runDemo}
        disabled={loading}
        className={`mt-5 w-full py-3.5 rounded-xl text-white text-[15px] font-semibold transition-all duration-300 ${
          loading
            ? "bg-white/5 cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-[#FF3B5C] to-[#8040FF] cursor-pointer shadow-[0_4px_20px_rgba(255,59,92,0.3)] hover:-translate-y-0.5"
        }`}
      >
        {loading ? "Simulating..." : step === "blocked" ? "Run Again →" : "▶ Simulate Fraud Attack"}
      </button>
    </div>
  );
}

const demoSteps = [
  { step: "1", label: "Normal payment from your device", result: "Instant approval ✓", color: "#00C851", textColor: "text-[#00C851]", bgColor: "bg-[#00C851]/10", borderColor: "border-[#00C851]/30" },
  { step: "2", label: "Simulated fraud from new location", result: "AI blocks immediately 🚨", color: "#FF3B5C", textColor: "text-[#FF3B5C]", bgColor: "bg-[#FF3B5C]/10", borderColor: "border-[#FF3B5C]/30" },
  { step: "3", label: "Clear explanation of why it was flagged", result: "Full audit trail", color: "#8040FF", textColor: "text-[#8040FF]", bgColor: "bg-[#8040FF]/10", borderColor: "border-[#8040FF]/30" },
  { step: "4", label: "Your option to approve with override", result: "You stay in control", color: "#00C8FF", textColor: "text-[#00C8FF]", bgColor: "bg-[#00C8FF]/10", borderColor: "border-[#00C8FF]/30" },
];

export default function LiveDemoSection() {
  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Explanation */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#00C8FF] bg-[#00C8FF]/8 border border-[#00C8FF]/20 px-4 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF3B5C] shadow-[0_0_8px_#FF3B5C] animate-pulse" />
              Live Demo
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
              See Fraud Detection<br />In Action
            </h2>
            <p className="text-base text-white/55 leading-[1.7] mb-8">
              Watch our AI block a suspicious transaction in real-time. We&apos;ll simulate a fraud attempt so you can see exactly how the system protects you.
            </p>

            <div className="flex flex-col gap-4">
              {demoSteps.map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${item.bgColor} ${item.borderColor} ${item.textColor}`}
                    style={{ border: `1px solid ${item.color}40` }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="text-[14px] text-white/75 font-medium mb-0.5">{item.label}</div>
                    <div className={`text-[13px] font-semibold ${item.textColor}`}>{item.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive terminal */}
          <FraudDemoTerminal />
        </div>
      </div>
    </section>
  );
}
