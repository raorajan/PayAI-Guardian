"use client";
import React from "react";

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
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
  );
}
