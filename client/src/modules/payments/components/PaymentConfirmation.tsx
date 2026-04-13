"use client";
import React from "react";

interface ConfirmationProps {
  amount?: string;
  recipient?: string;
  method?: string;
  riskScore?: number;
  transactionId?: string;
  timestamp?: string;
  status?: "success" | "pending" | "failed";
  onDone?: () => void;
}

export default function PaymentConfirmation({
  amount = "$120.00",
  recipient = "Sarah Miller",
  method = "Bank Transfer",
  riskScore = 3,
  transactionId = "TXN-7F4A2B9E",
  timestamp = "Apr 13, 2026 · 10:32 AM",
  status = "success",
  onDone,
}: ConfirmationProps) {
  const statusConfig = {
    success: {
      color: "#00C851", bg: "rgba(0,200,81,0.1)", border: "rgba(0,200,81,0.3)",
      glow: "0 0 40px rgba(0,200,81,0.2)",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="#00C851" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      heading: "Payment Successful",
      sub: "Your payment was processed and AI-verified.",
    },
    pending: {
      color: "#FFA500", bg: "rgba(255,165,0,0.1)", border: "rgba(255,165,0,0.3)",
      glow: "0 0 40px rgba(255,165,0,0.15)",
      icon: <div className="w-10 h-10 rounded-full border-2 border-[#FFA500]/30 border-t-[#FFA500] animate-spin" />,
      heading: "Payment Pending",
      sub: "Your payment is being processed.",
    },
    failed: {
      color: "#FF3B5C", bg: "rgba(255,59,92,0.1)", border: "rgba(255,59,92,0.3)",
      glow: "0 0 40px rgba(255,59,92,0.2)",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="#FF3B5C" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      heading: "Payment Failed",
      sub: "Your payment could not be completed.",
    },
  };

  const cfg = statusConfig[status];

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: `1px solid ${cfg.border}` }}
    >
      {/* Status icon */}
      <div className="flex flex-col items-center text-center mb-6 pt-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ background: cfg.bg, border: `2px solid ${cfg.border}`, boxShadow: cfg.glow }}
        >
          {cfg.icon}
        </div>
        <div className="text-xl font-black mb-1" style={{ color: cfg.color }}>{cfg.heading}</div>
        <div className="text-[13px] text-white/45">{cfg.sub}</div>
      </div>

      {/* Amount */}
      <div
        className="text-center py-4 mb-5 rounded-2xl"
        style={{ background: `${cfg.color}08`, border: `1px solid ${cfg.color}25` }}
      >
        <div className="text-[11px] text-white/35 mb-1 uppercase tracking-widest">Amount Sent</div>
        <div className="text-[36px] font-black" style={{ color: cfg.color }}>{amount}</div>
        <div className="text-[12px] text-white/40 mt-1">to {recipient}</div>
      </div>

      {/* Details */}
      <div
        className="rounded-xl overflow-hidden mb-5"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[
          { label: "Recipient",       value: recipient },
          { label: "Method",          value: method },
          { label: "Transaction ID",  value: transactionId, mono: true },
          { label: "Timestamp",       value: timestamp },
          { label: "AI Risk Score",
            value: `${riskScore}/100`,
            valueColor: riskScore < 30 ? "#00C851" : riskScore < 70 ? "#FFA500" : "#FF3B5C",
          },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
              borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}
          >
            <span className="text-[12px] text-white/35">{row.label}</span>
            <span
              className={`text-[12px] font-semibold ${row.mono ? "font-mono" : ""}`}
              style={{ color: row.valueColor ?? "rgba(255,255,255,0.75)" }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* AI shield badge */}
      <div
        className="flex items-center gap-2.5 p-3 rounded-xl mb-5"
        style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,200,81,0.12)" }}>
          <svg className="w-4 h-4" fill="none" stroke="#00C851" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <div className="text-[12px] font-semibold text-[#00C851]">PayAI Guardian Verified</div>
          <div className="text-[11px] text-white/35">AI analysis confirmed this transaction is legitimate.</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          className="flex-1 py-3 rounded-xl text-[13px] font-semibold text-white/60 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Download Receipt
        </button>
        <button
          onClick={onDone}
          className="flex-1 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)", boxShadow: "0 4px 16px rgba(0,150,255,0.3)" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
