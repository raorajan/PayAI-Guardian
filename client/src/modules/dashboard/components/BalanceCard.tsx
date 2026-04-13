"use client";
import React, { useState } from "react";

const stats = [
  {
    label: "Total Protected",
    value: "$48,291",
    sub: "this month",
    color: "#00C851",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: "Fraud Blocked",
    value: "23",
    sub: "attempts stopped",
    color: "#FF3B5C",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    label: "Avg Transaction",
    value: "498ms",
    sub: "processing time",
    color: "#00C8FF",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "AI Trust Score",
    value: "99/100",
    sub: "excellent rating",
    color: "#8040FF",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function BalanceCard() {
  const [currency, setCurrency] = useState("USD");
  const [selectedAccount, setSelectedAccount] = useState("all");

  const totalBalance = 24847.50;
  const availableBalance = 22347.50;
  const pendingBalance = 2500.00;
  const dailyChange = 3.2;

  return (
    <div className="mb-6">
      {/* Main Balance Card */}
      <div
        className="rounded-[20px] p-6 backdrop-blur-xl mb-4"
        style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.15)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-[11px] text-white/40 font-medium mb-1 uppercase tracking-wider">Total Balance</div>
            <div className="text-4xl font-black text-white mb-1">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00C851] text-sm font-bold">+{dailyChange}%</span>
              <span className="text-white/30 text-xs">vs yesterday</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-[#00C8FF]/50"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>

            {/* Account Selector */}
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-[#00C8FF]/50"
            >
              <option value="all">All Accounts</option>
              <option value="checking">Checking (*4521)</option>
              <option value="savings">Savings (*7893)</option>
            </select>
          </div>
        </div>

        {/* Balance Breakdown */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div>
            <div className="text-[11px] text-white/40 mb-1">Available Balance</div>
            <div className="text-xl font-bold text-[#00C851]">
              ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-white/40 mb-1">Pending Balance</div>
            <div className="text-xl font-bold text-[#FFB800]">
              ${pendingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[16px] p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-default"
            style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}08 0%, transparent 70%)` }}
            />
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-xl" style={{ background: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="text-[11px] text-white/40 font-medium mb-1">{stat.label}</div>
            <div className="text-[22px] font-black mb-0.5" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[11px] text-white/30">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
