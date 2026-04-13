"use client";
import React, { useState } from "react";

interface LearningMetric {
  label: string;
  value: number;
  previousValue: number;
  unit: string;
}

const METRICS: LearningMetric[] = [
  { label: "Detection Accuracy", value: 97.8, previousValue: 95.2, unit: "%" },
  { label: "False Positive Rate", value: 2.1, previousValue: 4.8, unit: "%" },
  { label: "Response Time", value: 87, previousValue: 120, unit: "ms" },
  { label: "Patterns Learned", value: 1247, previousValue: 983, unit: "" },
];

const RECENT_UPDATES = [
  {
    id: "upd_001",
    date: "2 hours ago",
    type: "improvement",
    title: "Enhanced Velocity Detection",
    description: "Model now detects rapid-fire transactions 34% faster",
    impact: "+12% accuracy",
  },
  {
    id: "upd_002",
    date: "1 day ago",
    type: "adaptation",
    title: "New Fraud Pattern Identified",
    description: "Learned micro-transaction testing pattern from Southeast Asia",
    impact: "+8% coverage",
  },
  {
    id: "upd_003",
    date: "3 days ago",
    type: "retraining",
    title: "Weekly Model Retraining Complete",
    description: "Incorporated 1,247 user feedback samples into model weights",
    impact: "+3.2% overall",
  },
];

export default function FraudPatternLearning() {
  const [showDetails, setShowDetails] = useState(false);

  const getTrendColor = (metric: LearningMetric) => {
    // For response time and false positive rate, lower is better
    if (metric.label === "Response Time" || metric.label === "False Positive Rate") {
      return metric.value < metric.previousValue ? "#00C851" : "#FF3B5C";
    }
    return metric.value > metric.previousValue ? "#00C851" : "#FF3B5C";
  };

  const getTrendIcon = (metric: LearningMetric) => {
    if (metric.label === "Response Time" || metric.label === "False Positive Rate") {
      return metric.value < metric.previousValue ? "↑" : "↓";
    }
    return metric.value > metric.previousValue ? "↑" : "↓";
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return "⚡";
      case "adaptation":
        return "🎯";
      case "retraining":
        return "🔄";
      default:
        return "📊";
    }
  };

  return (
    <div
      className="p-6 rounded-[20px] backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(128,64,255,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(128,64,255,0.12)" }}>
            <svg className="w-4 h-4 text-[#8040FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">AI Fraud Pattern Learning</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8040FF] animate-pulse" />
          <span className="text-[10px] text-[#8040FF] font-bold">LEARNING</span>
        </div>
      </div>

      {/* Learning Status */}
      <div
        className="p-4 rounded-xl mb-5"
        style={{
          background: "rgba(128,64,255,0.05)",
          border: "1px solid rgba(128,64,255,0.15)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60">Model Status</span>
          <span className="text-sm font-bold text-[#8040FF]">Active Training</span>
        </div>
        <div className="text-[11px] text-white/40 mb-3">
          Next retraining: <span className="text-white/60 font-bold">2 days, 14 hours</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: "65%",
              background: "linear-gradient(90deg, #8040FF, #00C8FF)",
            }}
          />
        </div>
        <div className="text-[9px] text-white/30 mt-1">65% to next training cycle</div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="p-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="text-[9px] text-white/40 mb-1">{metric.label}</div>
            <div className="flex items-end gap-2">
              <span className="text-lg font-black text-white">
                {metric.unit === "%" ? metric.value.toFixed(1) : metric.value.toLocaleString()}
              </span>
              <span className="text-[9px] text-white/30 mb-1">{metric.unit}</span>
            </div>
            <div
              className="text-[9px] font-bold mt-1"
              style={{ color: getTrendColor(metric) }}
            >
              {getTrendIcon(metric)} {Math.abs(((metric.value - metric.previousValue) / metric.previousValue * 100)).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>

      {/* Recent Updates */}
      <div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between mb-3"
        >
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
            Recent Updates ({RECENT_UPDATES.length})
          </span>
          <svg
            className={`w-4 h-4 text-white/40 transition-transform ${showDetails ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDetails && (
          <div className="space-y-3">
            {RECENT_UPDATES.map((update) => (
              <div
                key={update.id}
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{getUpdateIcon(update.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{update.title}</span>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(0,200,81,0.1)",
                          color: "#00C851",
                          border: "1px solid rgba(0,200,81,0.2)",
                        }}
                      >
                        {update.impact}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/40 mb-2">{update.description}</div>
                    <div className="text-[9px] text-white/30">{update.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Feedback Impact */}
      <div
        className="mt-5 p-4 rounded-xl"
        style={{
          background: "rgba(0,200,81,0.05)",
          border: "1px solid rgba(0,200,81,0.15)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-bold text-white">Your Feedback Impact</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-black text-[#00C851]">47</div>
            <div className="text-[9px] text-white/40">Reviews Submitted</div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#00C851]">94%</div>
            <div className="text-[9px] text-white/40">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
