"use client";
import React, { useState } from "react";

type RequestStatus = "pending" | "approved" | "declined";
type Tab = "create" | "sent" | "received";

interface PaymentRequest {
  id: string;
  name: string;
  email: string;
  amount: number;
  reason: string;
  status: RequestStatus;
  date: string;
  avatar: string;
}

const SENT_REQUESTS: PaymentRequest[] = [
  {
    id: "req_001",
    name: "Sarah Miller",
    email: "sarah.m@email.com",
    amount: 45.00,
    reason: "Dinner split",
    status: "pending",
    date: "2 hours ago",
    avatar: "SM",
  },
  {
    id: "req_002",
    name: "James Okafor",
    email: "james.o@email.com",
    amount: 120.00,
    reason: "Concert tickets",
    status: "approved",
    date: "1 day ago",
    avatar: "JO",
  },
  {
    id: "req_003",
    name: "Priya Kapoor",
    email: "priya.k@email.com",
    amount: 35.50,
    reason: "Grocery share",
    status: "declined",
    date: "3 days ago",
    avatar: "PK",
  },
];

const RECEIVED_REQUESTS: PaymentRequest[] = [
  {
    id: "req_004",
    name: "Marco Rossi",
    email: "marco.r@email.com",
    amount: 60.00,
    reason: "Movie night",
    status: "pending",
    date: "1 hour ago",
    avatar: "MR",
  },
  {
    id: "req_005",
    name: "Liu Wei",
    email: "liu.w@email.com",
    amount: 25.00,
    reason: "Uber ride",
    status: "pending",
    date: "5 hours ago",
    avatar: "LW",
  },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#0A66C2,#00C8FF)",
  "linear-gradient(135deg,#8040FF,#4060FF)",
  "linear-gradient(135deg,#00C851,#00C8FF)",
  "linear-gradient(135deg,#FF3B5C,#8040FF)",
  "linear-gradient(135deg,#FFA500,#FF3B5C)",
];

export default function RequestMoney() {
  const [tab, setTab] = useState<Tab>("create");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendRequest = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmail("");
        setAmount("");
        setReason("");
      }, 2000);
    }, 1500);
  };

  const handleAction = (id: string, action: "approve" | "decline") => {
    // In real app, this would call API
    console.log(`${action} request ${id}`);
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return { color: "#FFA500", bg: "rgba(255,165,0,0.1)", border: "rgba(255,165,0,0.2)" };
      case "approved":
        return { color: "#00C851", bg: "rgba(0,200,81,0.1)", border: "rgba(0,200,81,0.2)" };
      case "declined":
        return { color: "#FF3B5C", bg: "rgba(255,59,92,0.1)", border: "rgba(255,59,92,0.2)" };
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,81,0.1)" }}>
          <svg className="w-4 h-4 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">Request Money</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {(["create", "sent", "received"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-lg text-[12px] font-semibold capitalize transition-all"
            style={{
              background: tab === t ? "rgba(0,200,81,0.12)" : "transparent",
              color: tab === t ? "#00C851" : "rgba(255,255,255,0.35)",
              border: tab === t ? "1px solid rgba(0,200,81,0.25)" : "1px solid transparent",
            }}
          >
            {t === "create" ? "➕ New Request" : t === "sent" ? "📤 Sent" : "📥 Received"}
          </button>
        ))}
      </div>

      {/* Create Request Tab */}
      {tab === "create" && (
        sent ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(0,200,81,0.12)",
                border: "2px solid rgba(0,200,81,0.4)",
                boxShadow: "0 0 30px rgba(0,200,81,0.2)",
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="#00C851" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-lg font-black text-[#00C851]">Request Sent!</div>
            <div className="text-[13px] text-white/50 text-center">
              Payment request has been sent to {email}
            </div>
          </div>
        ) : (
          <>
            {/* Payer Email */}
            <div className="mb-4">
              <label className="text-xs text-white/40 font-medium mb-1.5 block">Payer Email or Phone</label>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="person@example.com"
                  className="flex-1 bg-transparent text-white/85 text-[13px] outline-none placeholder:text-white/25"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="text-xs text-white/40 font-medium mb-1.5 block">Request Amount</label>
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
                {["25", "50", "100", "200"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setAmount(q)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white/50 hover:text-[#00C851] transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    ${q}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label className="text-xs text-white/40 font-medium mb-1.5 block">Reason (optional)</label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="What's this request for?"
                className="w-full px-4 py-3 rounded-xl text-[13px] text-white/80 outline-none placeholder:text-white/25 bg-transparent"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            <button
              onClick={handleSendRequest}
              disabled={!amount || !email || parseFloat(amount) <= 0 || sending}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
              style={{
                background: sending
                  ? "rgba(0,200,81,0.3)"
                  : "linear-gradient(135deg,#00C851 0%,#00C8FF 100%)",
                boxShadow: !sending ? "0 4px 20px rgba(0,200,81,0.35)" : "none",
              }}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Payment Request
                </>
              )}
            </button>
          </>
        )
      )}

      {/* Sent Requests Tab */}
      {tab === "sent" && (
        <div className="flex flex-col gap-3">
          {SENT_REQUESTS.map((request, i) => {
            const statusCfg = getStatusColor(request.status);
            return (
              <div
                key={request.id}
                className="p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                  >
                    {request.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{request.name}</div>
                    <div className="text-[11px] text-white/40">{request.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#00C8FF]">${request.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-white/30">{request.date}</div>
                  </div>
                </div>

                {request.reason && (
                  <div className="text-xs text-white/50 mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                    {request.reason}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.border}` }}
                  >
                    {request.status === "pending" && "⏳ "}
                    {request.status === "approved" && "✅ "}
                    {request.status === "declined" && "❌ "}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>

                  {request.status === "approved" && (
                    <span className="text-[11px] text-[#00C851] font-semibold">Payment received ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Received Requests Tab */}
      {tab === "received" && (
        <div className="flex flex-col gap-3">
          {RECEIVED_REQUESTS.map((request, i) => {
            const statusCfg = getStatusColor(request.status);
            return (
              <div
                key={request.id}
                className="p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: AVATAR_GRADIENTS[(i + 2) % AVATAR_GRADIENTS.length] }}
                  >
                    {request.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{request.name}</div>
                    <div className="text-[11px] text-white/40">{request.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#00C8FF]">${request.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-white/30">{request.date}</div>
                  </div>
                </div>

                {request.reason && (
                  <div className="text-xs text-white/50 mb-3 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                    {request.reason}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full"
                    style={{ color: statusCfg.color, background: statusCfg.bg, border: `1px solid ${statusCfg.border}` }}
                  >
                    {request.status === "pending" && "⏳ "}
                    {request.status === "approved" && "✅ "}
                    {request.status === "declined" && "❌ "}
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>

                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(request.id, "decline")}
                        className="px-4 py-2 rounded-lg text-[11px] font-bold text-[#FF3B5C] transition-all hover:scale-105"
                        style={{ background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.2)" }}
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleAction(request.id, "approve")}
                        className="px-4 py-2 rounded-lg text-[11px] font-bold text-white transition-all hover:scale-105"
                        style={{ background: "linear-gradient(135deg,#00C851,#00C8FF)", boxShadow: "0 2px 10px rgba(0,200,81,0.3)" }}
                      >
                        Approve & Pay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
