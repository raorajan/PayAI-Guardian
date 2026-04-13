"use client";
import React, { useState } from "react";

type LinkState = "idle" | "connecting" | "success" | "error";

interface Props {
  onLinked?: () => void;
}

export default function PlaidLinkButton({ onLinked }: Props) {
  const [state, setState] = useState<LinkState>("idle");

  const handleClick = () => {
    setState("connecting");
    setTimeout(() => {
      setState("success");
      onLinked?.();
    }, 2000);
  };

  const reset = () => setState("idle");

  const configs: Record<LinkState, {
    bg: string; border: string; icon: React.ReactNode;
    label: string; sublabel: string; btnBg: string; btnLabel: string;
  }> = {
    idle: {
      bg: "rgba(0,200,255,0.04)", border: "rgba(0,200,255,0.15)",
      icon: (
        <svg className="w-6 h-6 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      label: "Connect Your Bank",
      sublabel: "Securely link your bank account via Plaid to enable AI-protected transfers.",
      btnBg: "linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)",
      btnLabel: "Connect Bank Account",
    },
    connecting: {
      bg: "rgba(0,200,255,0.04)", border: "rgba(0,200,255,0.2)",
      icon: (
        <div className="w-6 h-6 rounded-full border-2 border-[#00C8FF]/30 border-t-[#00C8FF] animate-spin" />
      ),
      label: "Connecting securely…",
      sublabel: "We're establishing a secure Plaid connection to your bank.",
      btnBg: "rgba(0,200,255,0.15)",
      btnLabel: "Connecting…",
    },
    success: {
      bg: "rgba(0,200,81,0.05)", border: "rgba(0,200,81,0.25)",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#00C851" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      label: "Bank Linked Successfully!",
      sublabel: "Your bank account is now connected and protected by PayAI Guardian.",
      btnBg: "rgba(0,200,81,0.12)",
      btnLabel: "✅ Connected",
    },
    error: {
      bg: "rgba(255,59,92,0.04)", border: "rgba(255,59,92,0.2)",
      icon: (
        <svg className="w-6 h-6 text-[#FF3B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      label: "Connection Failed",
      sublabel: "Unable to connect to your bank. Please try again.",
      btnBg: "rgba(255,59,92,0.15)",
      btnLabel: "Retry",
    },
  };

  const cfg = configs[state];

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
          <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Bank Connection</h2>
      </div>

      {/* Status card */}
      <div
        className="flex flex-col items-center gap-4 p-6 rounded-2xl mb-5 text-center"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: state === "success" ? "rgba(0,200,81,0.12)" : state === "error" ? "rgba(255,59,92,0.1)" : "rgba(0,200,255,0.08)", border: `1px solid ${cfg.border}` }}
        >
          {cfg.icon}
        </div>
        <div>
          <div className={`text-[15px] font-bold mb-1 ${state === "success" ? "text-[#00C851]" : state === "error" ? "text-[#FF3B5C]" : "text-white"}`}>
            {cfg.label}
          </div>
          <div className="text-[12px] text-white/40">{cfg.sublabel}</div>
        </div>
      </div>

      {/* Security features */}
      <div className="flex flex-col gap-2 mb-5">
        {[
          { icon: "🔒", label: "256-bit SSL encryption" },
          { icon: "🛡️", label: "AI fraud monitoring on all transactions" },
          { icon: "🏦", label: "10,000+ supported banks & institutions" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2.5 text-[12px] text-white/40">
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* Action button */}
      <button
        onClick={state === "idle" || state === "error" ? handleClick : state === "success" ? reset : undefined}
        disabled={state === "connecting"}
        className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
        style={{ background: cfg.btnBg, boxShadow: state === "idle" ? "0 4px 20px rgba(0,150,255,0.35)" : "none" }}
      >
        {cfg.btnLabel}
      </button>

      <p className="text-center text-[10px] text-white/20 mt-3">
        Powered by Plaid · Read-only access · We never store credentials
      </p>
    </div>
  );
}
