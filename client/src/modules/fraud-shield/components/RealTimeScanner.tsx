"use client";
import React, { useState, useEffect } from "react";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  location: string;
  time: string;
  riskScore: number;
  status: "approved" | "blocked" | "pending" | "reviewing";
  features: {
    location: "safe" | "suspicious" | "high-risk";
    amount: "normal" | "unusual" | "extreme";
    device: "trusted" | "unknown" | "flagged";
    velocity: "normal" | "elevated" | "critical";
  };
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-4821",
    merchant: "Amazon Web Services",
    amount: 127.50,
    location: "Seattle, WA",
    time: "Just now",
    riskScore: 8,
    status: "approved",
    features: { location: "safe", amount: "normal", device: "trusted", velocity: "normal" },
  },
  {
    id: "TXN-4822",
    merchant: "Electronics Hub",
    amount: 4999.00,
    location: "Lagos, Nigeria",
    time: "2 min ago",
    riskScore: 87,
    status: "blocked",
    features: { location: "high-risk", amount: "extreme", device: "flagged", velocity: "critical" },
  },
  {
    id: "TXN-4823",
    merchant: "Starbucks Coffee",
    amount: 5.75,
    location: "London, UK",
    time: "5 min ago",
    riskScore: 12,
    status: "approved",
    features: { location: "safe", amount: "normal", device: "trusted", velocity: "normal" },
  },
  {
    id: "TXN-4824",
    merchant: "Crypto Exchange Pro",
    amount: 850.00,
    location: "Unknown",
    time: "8 min ago",
    riskScore: 64,
    status: "reviewing",
    features: { location: "suspicious", amount: "unusual", device: "unknown", velocity: "elevated" },
  },
];

export default function RealTimeScanner() {
  const [scanning, setScanning] = useState(false);
  const [currentTx, setCurrentTx] = useState<number>(0);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate real-time scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setScanning(true);
      setScanProgress(0);

      // Simulate scan progress
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setScanning(false);
            setCurrentTx((prev) => (prev + 1) % TRANSACTIONS.length);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tx = TRANSACTIONS[currentTx];
  const getRiskColor = (score: number) => {
    if (score <= 30) return "#00C851";
    if (score <= 70) return "#FFB800";
    return "#FF3B5C";
  };

  const getRiskLabel = (score: number) => {
    if (score <= 30) return "SAFE";
    if (score <= 70) return "SUSPICIOUS";
    return "HIGH RISK";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return { bg: "rgba(0,200,81,0.1)", border: "rgba(0,200,81,0.3)", text: "#00C851", label: "APPROVED" };
      case "blocked":
        return { bg: "rgba(255,59,92,0.1)", border: "rgba(255,59,92,0.3)", text: "#FF3B5C", label: "BLOCKED" };
      case "reviewing":
        return { bg: "rgba(255,184,0,0.1)", border: "rgba(255,184,0,0.3)", text: "#FFB800", label: "REVIEWING" };
      default:
        return { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#FFFFFF", label: "PENDING" };
    }
  };

  const getFeatureColor = (level: string) => {
    if (level === "safe" || level === "normal" || level === "trusted") return "#00C851";
    if (level === "suspicious" || level === "unusual" || level === "unknown") return "#FFB800";
    return "#FF3B5C";
  };

  return (
    <div
      className="p-6 rounded-[20px] backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,59,92,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(255,59,92,0.12)" }}>
            <svg className="w-4 h-4 text-[#FF3B5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Real-Time Transaction Scanner</h2>
        </div>
        <div className="flex items-center gap-2">
          {scanning && (
            <>
              <div className="w-2 h-2 rounded-full bg-[#FF3B5C] animate-pulse" />
              <span className="text-[10px] text-[#FF3B5C] font-bold">SCANNING</span>
            </>
          )}
        </div>
      </div>

      {/* Scan Progress Bar */}
      {scanning && (
        <div className="mb-5">
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${scanProgress}%`,
                background: "linear-gradient(90deg, #FF3B5C, #00C8FF)",
              }}
            />
          </div>
          <div className="text-[9px] text-white/40 mt-1">Analyzing 50+ features...</div>
        </div>
      )}

      {/* Current Transaction */}
      <div
        className="p-5 rounded-xl mb-5"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-bold text-white mb-1">{tx.merchant}</div>
            <div className="text-[11px] text-white/40">{tx.location} · {tx.time}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-white">${tx.amount.toFixed(2)}</div>
            <div
              className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block"
              style={{
                background: getStatusBadge(tx.status).bg,
                border: `1px solid ${getStatusBadge(tx.status).border}`,
                color: getStatusBadge(tx.status).text,
              }}
            >
              {getStatusBadge(tx.status).label}
            </div>
          </div>
        </div>

        {/* Risk Score */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-[11px] text-white/60">Risk Score</span>
              <span className="text-[11px] font-bold" style={{ color: getRiskColor(tx.riskScore) }}>
                {tx.riskScore}% - {getRiskLabel(tx.riskScore)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${tx.riskScore}%`, background: getRiskColor(tx.riskScore) }}
              />
            </div>
          </div>
        </div>

        {/* Feature Analysis */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-[9px] text-white/40 mb-1">Location</div>
            <div
              className="text-[10px] font-bold px-2 py-1 rounded"
              style={{
                background: `${getFeatureColor(tx.features.location)}15`,
                color: getFeatureColor(tx.features.location),
                border: `1px solid ${getFeatureColor(tx.features.location)}30`,
              }}
            >
              {tx.features.location.toUpperCase()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[9px] text-white/40 mb-1">Amount</div>
            <div
              className="text-[10px] font-bold px-2 py-1 rounded"
              style={{
                background: `${getFeatureColor(tx.features.amount)}15`,
                color: getFeatureColor(tx.features.amount),
                border: `1px solid ${getFeatureColor(tx.features.amount)}30`,
              }}
            >
              {tx.features.amount.toUpperCase()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[9px] text-white/40 mb-1">Device</div>
            <div
              className="text-[10px] font-bold px-2 py-1 rounded"
              style={{
                background: `${getFeatureColor(tx.features.device)}15`,
                color: getFeatureColor(tx.features.device),
                border: `1px solid ${getFeatureColor(tx.features.device)}30`,
              }}
            >
              {tx.features.device.toUpperCase()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[9px] text-white/40 mb-1">Velocity</div>
            <div
              className="text-[10px] font-bold px-2 py-1 rounded"
              style={{
                background: `${getFeatureColor(tx.features.velocity)}15`,
                color: getFeatureColor(tx.features.velocity),
                border: `1px solid ${getFeatureColor(tx.features.velocity)}30`,
              }}
            >
              {tx.features.velocity.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Scan Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div
          className="p-3 rounded-xl text-center"
          style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}
        >
          <div className="text-lg font-black text-[#00C851]">247</div>
          <div className="text-[9px] text-white/40">Scanned Today</div>
        </div>
        <div
          className="p-3 rounded-xl text-center"
          style={{ background: "rgba(255,59,92,0.05)", border: "1px solid rgba(255,59,92,0.15)" }}
        >
          <div className="text-lg font-black text-[#FF3B5C]">12</div>
          <div className="text-[9px] text-white/40">Blocked</div>
        </div>
        <div
          className="p-3 rounded-xl text-center"
          style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}
        >
          <div className="text-lg font-black text-[#FFB800]">3</div>
          <div className="text-[9px] text-white/40">Under Review</div>
        </div>
      </div>

      {/* Processing Time */}
      <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 text-center">
        <div className="text-[10px] text-white/60">
          Average Processing Time: <span className="text-[#00C8FF] font-bold">&lt;100ms</span>
        </div>
      </div>
    </div>
  );
}
