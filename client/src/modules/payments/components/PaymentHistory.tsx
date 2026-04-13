"use client";
import React, { useState } from "react";

type Status = "approved" | "blocked" | "received" | "pending";
type Filter = "all" | Status;

interface Transaction {
  id: string;
  desc: string;
  merchant: string;
  amount: string;
  status: Status;
  time: string;
  category: string;
  risk: number;
  date: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "tx_001", desc: "Starbucks Coffee", merchant: "Starbucks", amount: "-$6.50", status: "approved", time: "2 min ago", category: "Food", risk: 2, date: "Today" },
  { id: "tx_002", desc: "Fraud Attempt", merchant: "Unknown Vendor", amount: "-$4,999.00", status: "blocked", time: "34 min ago", category: "Unknown", risk: 98, date: "Today" },
  { id: "tx_003", desc: "Transfer from John D.", merchant: "John Doe", amount: "+$250.00", status: "received", time: "2h ago", category: "Transfer", risk: 1, date: "Today" },
  { id: "tx_004", desc: "Netflix Subscription", merchant: "Netflix", amount: "-$15.99", status: "approved", time: "5h ago", category: "Entertainment", risk: 3, date: "Today" },
  { id: "tx_005", desc: "ATM Withdrawal", merchant: "Chase Bank", amount: "-$200.00", status: "approved", time: "Yesterday", category: "Cash", risk: 5, date: "Yesterday" },
  { id: "tx_006", desc: "Amazon Purchase", merchant: "Amazon", amount: "-$89.99", status: "approved", time: "Yesterday", category: "Shopping", risk: 7, date: "Yesterday" },
  { id: "tx_007", desc: "Salary Deposit", merchant: "Acme Corp", amount: "+$3,200.00", status: "received", time: "2 days ago", category: "Income", risk: 1, date: "Apr 11" },
  { id: "tx_008", desc: "Suspicious Transfer", merchant: "Offshore LLC", amount: "-$750.00", status: "blocked", time: "3 days ago", category: "Unknown", risk: 91, date: "Apr 10" },
  { id: "tx_009", desc: "Uber Ride", merchant: "Uber", amount: "-$18.40", status: "approved", time: "3 days ago", category: "Transport", risk: 4, date: "Apr 10" },
  { id: "tx_010", desc: "Grocery Store", merchant: "Whole Foods", amount: "-$62.14", status: "approved", time: "4 days ago", category: "Food", risk: 2, date: "Apr 9" },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "received", label: "Received" },
  { key: "blocked", label: "Blocked" },
  { key: "pending", label: "Pending" },
];

function categoryIcon(category: string, status: Status) {
  if (status === "blocked") return "🚫";
  if (status === "received") return "📥";
  if (status === "pending") return "⏳";
  const map: Record<string, string> = {
    Food: "☕", Entertainment: "🎬", Cash: "💰", Shopping: "🛒",
    Transfer: "🔄", Income: "💼", Transport: "🚗",
  };
  return map[category] ?? "💳";
}

const STATUS_CONFIG: Record<Status, { color: string; bg: string; label: string }> = {
  approved: { color: "#00C851", bg: "rgba(0,200,81,0.1)", label: "Approved" },
  blocked:  { color: "#FF3B5C", bg: "rgba(255,59,92,0.1)", label: "Blocked" },
  received: { color: "#00C8FF", bg: "rgba(0,200,255,0.1)", label: "Received" },
  pending:  { color: "#FFA500", bg: "rgba(255,165,0,0.1)", label: "Pending" },
};

export default function PaymentHistory() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = TRANSACTIONS.filter((tx) => {
    const matchFilter = filter === "all" || tx.status === filter;
    const matchSearch = tx.desc.toLowerCase().includes(search.toLowerCase()) ||
      tx.merchant.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalBlocked = TRANSACTIONS.filter(t => t.status === "blocked").length;
  const totalInflow = TRANSACTIONS
    .filter(t => t.amount.startsWith("+"))
    .reduce((acc, t) => acc + parseFloat(t.amount.replace(/[+$,]/g, "")), 0);

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Transaction History</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#FF3B5C] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.2)" }}>
            {totalBlocked} blocked
          </span>
          <span className="text-[11px] text-[#00C8FF] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)" }}>
            Live
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Transactions", value: TRANSACTIONS.length.toString(), color: "#00C8FF" },
          { label: "Total Inflow", value: `+$${totalInflow.toLocaleString()}`, color: "#00C851" },
          { label: "Fraud Blocked", value: `${totalBlocked} attempts`, color: "#FF3B5C" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="text-[10px] text-white/35 mb-1">{s.label}</div>
            <div className="text-[13px] font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-4"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="flex-1 bg-transparent text-[13px] text-white/80 outline-none placeholder:text-white/25"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hidden pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{
              background: filter === f.key ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filter === f.key ? "rgba(0,200,255,0.3)" : "rgba(255,255,255,0.07)"}`,
              color: filter === f.key ? "#00C8FF" : "rgba(255,255,255,0.45)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="py-10 flex flex-col items-center gap-2 text-white/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">No transactions found</span>
          </div>
        ) : (
          filtered.map((tx) => {
            const cfg = STATUS_CONFIG[tx.status];
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/[0.025] transition-colors group cursor-default"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}
                  >
                    {categoryIcon(tx.category, tx.status)}
                  </div>
                  <div>
                    <div className="text-[13px] text-white/85 font-medium">{tx.desc}</div>
                    <div className="text-[11px] text-white/35">{tx.merchant} · {tx.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Risk badge */}
                  <div
                    className="hidden sm:block text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      color:  tx.risk > 70 ? "#FF3B5C" : tx.risk > 30 ? "#FFA500" : "#00C851",
                      background: tx.risk > 70 ? "rgba(255,59,92,0.1)" : tx.risk > 30 ? "rgba(255,165,0,0.1)" : "rgba(0,200,81,0.1)",
                    }}
                  >
                    {tx.risk}%
                  </div>
                  {/* Status */}
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                    style={{ color: cfg.color, background: cfg.bg }}
                  >
                    {cfg.label}
                  </span>
                  {/* Amount */}
                  <span
                    className="text-[14px] font-bold min-w-[75px] text-right"
                    style={{
                      color: tx.status === "blocked" ? "#FF3B5C" : tx.amount.startsWith("+") ? "#00C851" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {tx.amount}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {filtered.length > 0 && (
        <button className="w-full mt-4 py-2.5 rounded-xl text-[13px] text-white/40 hover:text-[#00C8FF] transition-colors" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          Load more transactions
        </button>
      )}
    </div>
  );
}
