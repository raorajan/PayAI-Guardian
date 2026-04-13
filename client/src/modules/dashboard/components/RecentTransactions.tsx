"use client";
import React from "react";

const TRANSACTIONS = [
  { id: "tx_001", desc: "Starbucks Coffee", location: "NYC, US", amount: "-$6.50", status: "approved", time: "2s ago", category: "Food", risk: 2 },
  { id: "tx_002", desc: "Fraud Attempt", location: "Lagos, NG", amount: "-$4,999.00", status: "blocked", time: "34s ago", category: "Unknown", risk: 98 },
  { id: "tx_003", desc: "Transfer from John D.", location: "New York, US", amount: "+$250.00", status: "received", time: "2m ago", category: "Transfer", risk: 1 },
  { id: "tx_004", desc: "Netflix Subscription", location: "Online", amount: "-$15.99", status: "approved", time: "1h ago", category: "Entertainment", risk: 3 },
  { id: "tx_005", desc: "ATM Withdrawal", location: "Manhattan, US", amount: "-$200.00", status: "approved", time: "3h ago", category: "Cash", risk: 5 },
  { id: "tx_006", desc: "Amazon Purchase", location: "Online", amount: "-$89.99", status: "approved", time: "5h ago", category: "Shopping", risk: 7 },
];

function categoryIcon(category: string, status: string) {
  if (status === "blocked") return "🚫";
  if (status === "received") return "📥";
  const map: Record<string, string> = { Food: "☕", Entertainment: "🎬", Cash: "💰", Shopping: "🛒", Transfer: "🔄" };
  return map[category] ?? "💳";
}

export default function RecentTransactions() {
  return (
    <div
      className="lg:col-span-2 rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
        <span
          className="text-xs text-[#00C8FF] px-2 py-1 rounded-md"
          style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)" }}
        >
          Live Feed
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {TRANSACTIONS.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/[0.03] transition-colors"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                style={{
                  background: tx.status === "blocked" ? "rgba(255,59,92,0.12)" : tx.status === "received" ? "rgba(0,200,255,0.1)" : "rgba(0,200,81,0.1)",
                  border: `1px solid ${tx.status === "blocked" ? "rgba(255,59,92,0.25)" : tx.status === "received" ? "rgba(0,200,255,0.2)" : "rgba(0,200,81,0.2)"}`,
                }}
              >
                {categoryIcon(tx.category, tx.status)}
              </div>
              <div>
                <div className="text-[13px] text-white/85 font-medium">{tx.desc}</div>
                <div className="text-[11px] text-white/35">{tx.location} · {tx.time}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1">
                <div className="text-[10px] text-white/30">Risk</div>
                <div
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: tx.risk > 70 ? "#FF3B5C" : tx.risk > 30 ? "#FFB800" : "#00C851",
                    background: tx.risk > 70 ? "rgba(255,59,92,0.1)" : tx.risk > 30 ? "rgba(255,184,0,0.1)" : "rgba(0,200,81,0.1)",
                  }}
                >
                  {tx.risk}%
                </div>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={{
                  color: tx.status === "blocked" ? "#FF3B5C" : tx.status === "received" ? "#00C8FF" : "#00C851",
                  background: tx.status === "blocked" ? "rgba(255,59,92,0.1)" : tx.status === "received" ? "rgba(0,200,255,0.1)" : "rgba(0,200,81,0.1)",
                }}
              >
                {tx.status}
              </span>
              <span
                className="text-[14px] font-bold min-w-[70px] text-right"
                style={{
                  color: tx.status === "blocked" ? "#FF3B5C" : tx.amount.startsWith("+") ? "#00C851" : "rgba(255,255,255,0.85)",
                }}
              >
                {tx.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
