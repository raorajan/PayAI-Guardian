"use client";
import React, { useState } from "react";

type Step = "form" | "review" | "success";

const METHODS = [
  { id: "bank", label: "Bank Transfer", icon: "🏦", fee: "Free" },
  { id: "card", label: "Debit Card", icon: "💳", fee: "$0.30" },
  { id: "instant", label: "Instant Pay", icon: "⚡", fee: "$1.50" },
];

export default function PaymentForm() {
  const [step, setStep] = useState<Step>("form");
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [recipient, setRecipient] = useState("Sarah Miller");
  const [sending, setSending] = useState(false);
  const [riskScore] = useState(4);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep("success");
    }, 1800);
  };

  const reset = () => {
    setStep("form");
    setAmount("");
    setNote("");
  };

  if (step === "success") {
    return (
      <div
        className="rounded-[20px] p-8 backdrop-blur-xl flex flex-col items-center gap-5"
        style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,81,0.25)" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(0,200,81,0.12)",
            border: "2px solid rgba(0,200,81,0.4)",
            boxShadow: "0 0 40px rgba(0,200,81,0.2)",
          }}
        >
          <svg className="w-10 h-10" fill="none" stroke="#00C851" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <div className="text-2xl font-black text-[#00C851] text-center">Payment Sent!</div>
          <div className="text-white/50 text-sm text-center mt-1">
            ${parseFloat(amount || "0").toFixed(2)} sent to {recipient}
          </div>
        </div>
        <div
          className="w-full p-4 rounded-xl"
          style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}
        >
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div><span className="text-white/40">Amount:</span> <span className="text-[#00C851] font-bold">${parseFloat(amount || "0").toFixed(2)}</span></div>
            <div><span className="text-white/40">Recipient:</span> <span className="text-white/80">{recipient}</span></div>
            <div><span className="text-white/40">Method:</span> <span className="text-white/80">{METHODS.find(m => m.id === method)?.label}</span></div>
            <div><span className="text-white/40">AI Risk:</span> <span className="text-[#00C851] font-bold">{riskScore}/100 ✅</span></div>
          </div>
        </div>
        <button
          onClick={reset}
          className="text-sm text-[#00C8FF] hover:text-white transition-colors font-medium"
        >
          Send another payment →
        </button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div
        className="rounded-[20px] p-6 backdrop-blur-xl"
        style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.15)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setStep("form")}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-white">Review Payment</h2>
        </div>

        {/* AI Scan */}
        <div
          className="p-4 rounded-xl mb-5"
          style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.2)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,81,0.12)" }}>
              <svg className="w-4 h-4" fill="none" stroke="#00C851" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#00C851]">AI Shield: Low Risk</div>
              <div className="text-[11px] text-white/40">Fraud score {riskScore}/100 · Transaction appears legitimate</div>
            </div>
            <div className="ml-auto text-[11px] font-bold text-[#00C851] bg-[#00C851]/10 px-2 py-0.5 rounded-full">{riskScore}/100</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {[
            { label: "Sending to", value: recipient },
            { label: "Amount", value: `$${parseFloat(amount || "0").toFixed(2)}`, highlight: true },
            { label: "Method", value: METHODS.find(m => m.id === method)?.label ?? "" },
            { label: "Fee", value: METHODS.find(m => m.id === method)?.fee ?? "Free" },
            ...(note ? [{ label: "Note", value: note }] : []),
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[13px] text-white/40">{row.label}</span>
              <span className={`text-[13px] font-semibold ${row.highlight ? "text-[#00C8FF]" : "text-white/80"}`}>{row.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleSend}
          disabled={sending}
          className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)", boxShadow: "0 4px 20px rgba(0,150,255,0.4)" }}
        >
          {sending ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Confirm & Send
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
          <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Send Payment</h2>
      </div>

      {/* Recipient */}
      <div className="mb-4">
        <label className="text-xs text-white/40 font-medium mb-1.5 block">Recipient</label>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg,#0A66C2,#8040FF)" }}
          >
            {recipient.charAt(0)}
          </div>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient name or email"
            className="flex-1 bg-transparent text-white/85 text-[13px] outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="text-xs text-white/40 font-medium mb-1.5 block">Amount</label>
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-white/40 text-lg font-bold">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-transparent text-white text-2xl font-black outline-none placeholder:text-white/20"
          />
        </div>
        <div className="flex gap-2 mt-2">
          {["25", "50", "100", "250"].map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white/50 hover:text-[#00C8FF] transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              ${q}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="text-xs text-white/40 font-medium mb-1.5 block">Payment Method</label>
        <div className="flex flex-col gap-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: method === m.id ? "rgba(0,200,255,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${method === m.id ? "rgba(0,200,255,0.3)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <span className="text-lg">{m.icon}</span>
              <span className={`text-[13px] flex-1 ${method === m.id ? "text-[#00C8FF] font-semibold" : "text-white/70"}`}>{m.label}</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${method === m.id ? "text-[#00C8FF] bg-[#00C8FF]/10" : "text-white/30 bg-white/5"}`}>
                {m.fee}
              </span>
              {method === m.id && (
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#00C8FF" }}>
                  <svg className="w-2.5 h-2.5" fill="white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mb-6">
        <label className="text-xs text-white/40 font-medium mb-1.5 block">Note (optional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's this for?"
          className="w-full px-4 py-3 rounded-xl text-[13px] text-white/80 outline-none placeholder:text-white/25 bg-transparent"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      <button
        onClick={() => setStep("review")}
        disabled={!amount || !recipient || parseFloat(amount) <= 0}
        className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)", boxShadow: "0 4px 20px rgba(0,150,255,0.35)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Continue to Review
      </button>
    </div>
  );
}
