"use client";
import React, { useState } from "react";

interface Alert {
  id: string;
  type: "warning" | "critical" | "info";
  title: string;
  description: string;
  time: string;
  action: string;
}

const ALERTS: Alert[] = [
  {
    id: "alert_001",
    type: "critical",
    title: "Suspicious Login Attempt",
    description: "Login from Lagos, Nigeria blocked",
    time: "34s ago",
    action: "Review",
  },
  {
    id: "alert_002",
    type: "warning",
    title: "Unusual Transaction Pattern",
    description: "Multiple small transfers detected",
    time: "2m ago",
    action: "Verify",
  },
  {
    id: "alert_003",
    type: "info",
    title: "New Device Detected",
    description: "Brave Browser on Windows logged in",
    time: "1h ago",
    action: "Confirm",
  },
];

export default function FraudRiskAlert() {
  const [riskLevel] = useState<"low" | "medium" | "high">("low");
  const score = 99;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (score / 100);

  const getRiskColor = () => {
    switch (riskLevel) {
      case "low": return "#00C851";
      case "medium": return "#FFB800";
      case "high": return "#FF3B5C";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return { bg: "rgba(255,59,92,0.08)", border: "rgba(255,59,92,0.2)", text: "#FF3B5C" };
      case "warning": return { bg: "rgba(255,184,0,0.08)", border: "rgba(255,184,0,0.2)", text: "#FFB800" };
      case "info": return { bg: "rgba(0,200,255,0.08)", border: "rgba(0,200,255,0.2)", text: "#00C8FF" };
      default: return { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#FFFFFF" };
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(255,59,92,0.12)" }}>
            <svg className="w-4 h-4 text-[#FF3B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Fraud Risk Alerts</h2>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-full"
          style={{
            color: getRiskColor(),
            background: `${getRiskColor()}10`,
            border: `1px solid ${getRiskColor()}30`,
          }}
        >
          {riskLevel.toUpperCase()} RISK
        </span>
      </div>

      {/* Risk Score */}
      <div className="flex items-center gap-4 mb-5 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r={radius} fill="none"
              stroke={getRiskColor()} strokeWidth="8"
              strokeDasharray={`${filled} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xl font-black" style={{ color: getRiskColor() }}>{score}</div>
            <div className="text-[9px] text-white/40">/ 100</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white mb-1">Account Security Score</div>
          <div className="text-[11px] text-white/40 mb-2">Your account is well protected</div>
          <div className="text-[10px]" style={{ color: getRiskColor() }}>● Excellent Protection Active</div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-3 mb-5">
        <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Active Alerts ({ALERTS.length})</div>
        {ALERTS.map((alert) => {
          const colors = getAlertColor(alert.type);
          return (
            <div
              key={alert.id}
              className="p-3 rounded-xl"
              style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="text-xs font-bold text-white mb-0.5">{alert.title}</div>
                  <div className="text-[11px] text-white/50">{alert.description}</div>
                </div>
                <div className="text-[10px] text-white/30 whitespace-nowrap">{alert.time}</div>
              </div>
              <button
                className="text-[10px] font-bold px-3 py-1 rounded-lg transition-all hover:scale-105"
                style={{ color: colors.text, background: `${colors.text}15`, border: `1px solid ${colors.text}30` }}
              >
                {alert.action}
              </button>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="p-4 rounded-xl" style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}>
        <div className="text-[11px] font-bold text-[#00C851] mb-2">🛡️ Security Recommendations</div>
        <ul className="space-y-1.5">
          <li className="text-[11px] text-white/60">✓ Enable two-factor authentication</li>
          <li className="text-[11px] text-white/60">✓ Review recent login activity</li>
          <li className="text-[11px] text-white/60">✓ Update your security preferences</li>
        </ul>
      </div>
    </div>
  );
}
