"use client";
import React, { useState } from "react";

interface Account {
  id: string;
  bank: string;
  accountType: string;
  last4: string;
  balance: string;
  status: "connected" | "syncing" | "error";
  logo: string;
}

const ACCOUNTS: Account[] = [
  { id: "acc_1", bank: "Chase Bank", accountType: "Checking", last4: "4821", balance: "$12,430.54", status: "connected", logo: "🏦" },
  { id: "acc_2", bank: "Bank of America", accountType: "Savings", last4: "9034", balance: "$5,900.00", status: "connected", logo: "🏛️" },
  { id: "acc_3", bank: "Wells Fargo", accountType: "Checking", last4: "1156", balance: "$841.20", status: "syncing", logo: "🏪" },
];

const STATUS_CFG = {
  connected: { color: "#00C851", bg: "rgba(0,200,81,0.1)", label: "Connected", dot: "#00C851" },
  syncing: { color: "#FFA500", bg: "rgba(255,165,0,0.1)", label: "Syncing…", dot: "#FFA500" },
  error: { color: "#FF3B5C", bg: "rgba(255,59,92,0.1)", label: "Error", dot: "#FF3B5C" },
};

export default function BankAccountCard() {
  const [selected, setSelected] = useState("acc_1");

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(128,64,255,0.12)" }}>
            <svg className="w-4 h-4 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Linked Accounts</h2>
        </div>
        <button
          className="text-[12px] font-semibold text-[#00C8FF] px-3 py-1.5 rounded-lg transition-all hover:bg-[#00C8FF]/10"
          style={{ border: "1px solid rgba(0,200,255,0.2)" }}
        >
          + Add Account
        </button>
      </div>

      {/* Accounts */}
      <div className="flex flex-col gap-3 mb-5">
        {ACCOUNTS.map((acc) => {
          const cfg = STATUS_CFG[acc.status];
          const isSelected = selected === acc.id;
          return (
            <button
              key={acc.id}
              onClick={() => setSelected(acc.id)}
              className="flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all hover:scale-[1.01]"
              style={{
                background: isSelected ? "rgba(0,200,255,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isSelected ? "rgba(0,200,255,0.25)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {/* Bank Logo */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {acc.logo}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-semibold text-white/90 truncate">{acc.bank}</span>
                  <span className="text-[10px] text-white/35">{acc.accountType}</span>
                </div>
                <div className="text-[11px] text-white/35">····{acc.last4}</div>
              </div>

              {/* Balance + Status */}
              <div className="shrink-0 text-right">
                <div className="text-[14px] font-bold text-white/90 mb-1">{acc.balance}</div>
                <div className="flex items-center justify-end gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}` }}
                  />
                  <span className="text-[10px] font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Total Balance */}
      <div
        className="p-4 rounded-xl flex items-center justify-between"
        style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.12)" }}
      >
        <div>
          <div className="text-[11px] text-white/40 mb-0.5">Total Balance (All Accounts)</div>
          <div className="text-[22px] font-black text-white">$19,171.74</div>
        </div>
        <div
          className="p-2.5 rounded-xl"
          style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)" }}
        >
          <svg className="w-5 h-5 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      {/* Plaid badge */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-white/25">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Bank-level encryption · Powered by Plaid
      </div>
    </div>
  );
}
