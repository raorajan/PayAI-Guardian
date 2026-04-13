"use client";
import React, { useState } from "react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  paid: boolean;
}

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: "p1", name: "You",          avatar: "ME", amount: 0, paid: true  },
  { id: "p2", name: "Sarah Miller", avatar: "SM", amount: 0, paid: false },
  { id: "p3", name: "James Okafor", avatar: "JO", amount: 0, paid: false },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#0A66C2,#00C8FF)",
  "linear-gradient(135deg,#8040FF,#4060FF)",
  "linear-gradient(135deg,#00C851,#00C8FF)",
  "linear-gradient(135deg,#FF3B5C,#8040FF)",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SplitPaymentModal({ isOpen, onClose }: Props) {
  const [totalAmount, setTotalAmount] = useState("120.00");
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [splitType, setSplitType] = useState<"equal" | "custom">("equal");
  const [sent, setSent] = useState(false);

  const total = parseFloat(totalAmount || "0");
  const perPerson = splitType === "equal" && participants.length > 0
    ? total / participants.length
    : 0;

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1040] flex items-center justify-center p-4"
      style={{ background: "rgba(5,8,16,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div
        className="w-full max-w-md rounded-[24px] p-6 relative"
        style={{
          background: "rgba(8,12,30,0.95)",
          border: "1px solid rgba(0,200,255,0.2)",
          boxShadow: "0 0 80px rgba(0,100,220,0.2)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl" style={{ background: "rgba(128,64,255,0.12)" }}>
            <svg className="w-5 h-5 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Split Payment</h2>
            <p className="text-[11px] text-white/40">Divide a bill among your group</p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,200,81,0.12)", border: "2px solid rgba(0,200,81,0.4)", boxShadow: "0 0 30px rgba(0,200,81,0.2)" }}
            >
              <svg className="w-8 h-8" fill="none" stroke="#00C851" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-lg font-black text-[#00C851]">Requests Sent!</div>
            <div className="text-[13px] text-white/50 text-center">
              Split requests have been sent to {participants.length - 1} participants
            </div>
          </div>
        ) : (
          <>
            {/* Total Amount */}
            <div className="mb-5">
              <label className="text-xs text-white/40 font-medium mb-1.5 block">Total Bill Amount</label>
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-white/40 text-lg font-bold">$</span>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={e => setTotalAmount(e.target.value)}
                  className="flex-1 bg-transparent text-white text-2xl font-black outline-none placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Split type toggle */}
            <div
              className="flex gap-1 p-1 rounded-xl mb-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {(["equal", "custom"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSplitType(t)}
                  className="flex-1 py-2 rounded-lg text-[12px] font-semibold capitalize transition-all"
                  style={{
                    background: splitType === t ? "rgba(0,200,255,0.12)" : "transparent",
                    color: splitType === t ? "#00C8FF" : "rgba(255,255,255,0.35)",
                    border: splitType === t ? "1px solid rgba(0,200,255,0.25)" : "1px solid transparent",
                  }}
                >
                  {t === "equal" ? "⚖️ Equal Split" : "✏️ Custom Split"}
                </button>
              ))}
            </div>

            {/* Participants */}
            <div className="flex flex-col gap-2 mb-5">
              {participants.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                  >
                    {p.avatar}
                  </div>
                  <span className="flex-1 text-[13px] font-medium text-white/80">
                    {p.name}
                    {p.paid && <span className="ml-2 text-[10px] text-[#00C851]">· Paid</span>}
                  </span>
                  <span className="text-[14px] font-bold text-[#00C8FF]">
                    ${splitType === "equal" ? perPerson.toFixed(2) : p.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="p-3 rounded-xl flex items-center justify-between mb-5"
              style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.12)" }}
            >
              <span className="text-[12px] text-white/40">Each person owes</span>
              <span className="text-[16px] font-black text-[#00C8FF]">
                ${splitType === "equal" ? perPerson.toFixed(2) : "Custom"}
              </span>
            </div>

            {/* Send Requests */}
            <button
              onClick={handleSend}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#8040FF 0%,#4060FF 100%)", boxShadow: "0 4px 20px rgba(128,64,255,0.4)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Split Requests
            </button>
          </>
        )}
      </div>
    </div>
  );
}
