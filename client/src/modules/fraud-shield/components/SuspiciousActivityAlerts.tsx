"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";

interface FraudAlert {
  id: string;
  type: "push" | "email" | "sms";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  amount?: number;
  location?: string;
  time: string;
  action: string;
  resolved: boolean;
}

const ALERTS: FraudAlert[] = [
  {
    id: "alert_001",
    type: "push",
    severity: "critical",
    title: "Transaction Blocked",
    description: "$4,999.00 purchase from Electronics Hub (Lagos) blocked due to high-risk location",
    amount: 4999.00,
    location: "Lagos, Nigeria",
    time: "2 min ago",
    action: "Review Block",
    resolved: false,
  },
  {
    id: "alert_002",
    type: "email",
    severity: "high",
    title: "Multiple Failed Login Attempts",
    description: "5 failed login attempts detected from unknown device in Moscow",
    location: "Moscow, Russia",
    time: "15 min ago",
    action: "Secure Account",
    resolved: false,
  },
  {
    id: "alert_003",
    type: "sms",
    severity: "medium",
    title: "Unusual Transaction Pattern",
    description: "3 small transactions detected within 2 minutes at different merchants",
    amount: 47.25,
    time: "1 hour ago",
    action: "Verify Activity",
    resolved: true,
  },
  {
    id: "alert_004",
    type: "push",
    severity: "low",
    title: "New Device Login",
    description: "Successful login from Brave Browser on Windows - London, UK",
    location: "London, UK",
    time: "2 hours ago",
    action: "Confirm Device",
    resolved: true,
  },
];

export default function SuspiciousActivityAlerts() {
  const [alerts, setAlerts] = useState<FraudAlert[]>(ALERTS);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unresolved" | "resolved">("all");
  const toast = useToast();

  const unresolvedCount = alerts.filter((a) => !a.resolved).length;

  const handleResolve = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
    toast.success("Alert marked as resolved");
  };

  const handleDismiss = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    toast.info("Alert dismissed");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return { bg: "rgba(255,59,92,0.08)", border: "rgba(255,59,92,0.2)", text: "#FF3B5C", badge: "CRITICAL" };
      case "high":
        return { bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.2)", text: "#FF6B35", badge: "HIGH" };
      case "medium":
        return { bg: "rgba(255,184,0,0.08)", border: "rgba(255,184,0,0.2)", text: "#FFB800", badge: "MEDIUM" };
      case "low":
        return { bg: "rgba(0,200,255,0.08)", border: "rgba(0,200,255,0.2)", text: "#00C8FF", badge: "LOW" };
      default:
        return { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#FFFFFF", badge: "INFO" };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "push":
        return "🔔";
      case "email":
        return "📧";
      case "sms":
        return "📱";
      default:
        return "🔔";
    }
  };

  const filteredAlerts =
    filter === "all"
      ? alerts
      : filter === "unresolved"
      ? alerts.filter((a) => !a.resolved)
      : alerts.filter((a) => a.resolved);

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Suspicious Activity Alerts</h2>
        </div>
        {unresolvedCount > 0 && (
          <div
            className="px-3 py-1 rounded-full text-[10px] font-bold"
            style={{
              background: "rgba(255,59,92,0.15)",
              border: "1px solid rgba(255,59,92,0.3)",
              color: "#FF3B5C",
            }}
          >
            {unresolvedCount} Unresolved
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5">
        {(["all", "unresolved", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
            style={{
              background: filter === f ? "rgba(255,59,92,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${filter === f ? "rgba(255,59,92,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: filter === f ? "#FF3B5C" : "rgba(255,255,255,0.4)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 mb-5">
        {filteredAlerts.map((alert) => {
          const colors = getSeverityColor(alert.severity);
          const isExpanded = expandedAlert === alert.id;

          return (
            <div
              key={alert.id}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                opacity: alert.resolved ? 0.6 : 1,
              }}
            >
              {/* Alert Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{getTypeIcon(alert.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{alert.title}</span>
                      <span
                        className="text-[8px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{
                          background: `${colors.text}15`,
                          color: colors.text,
                          border: `1px solid ${colors.text}30`,
                        }}
                      >
                        {colors.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/40">{alert.time}</div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && !alert.resolved && (
                <div
                  className="px-4 pb-4 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <div className="pt-3 space-y-3">
                    <div className="text-[11px] text-white/60 leading-relaxed">
                      {alert.description}
                    </div>

                    {alert.amount && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                        <span className="text-[10px] text-white/40">Amount</span>
                        <span className="text-lg font-black text-white">${alert.amount.toFixed(2)}</span>
                      </div>
                    )}

                    {alert.location && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                        <span className="text-[10px] text-white/40">Location</span>
                        <span className="text-xs font-bold text-white">{alert.location}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#00C851] to-[#00C8FF] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                      >
                        {alert.action}
                      </button>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isExpanded && alert.resolved && (
                <div
                  className="px-4 pb-4 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <div className="pt-3 text-center">
                    <div className="text-2xl mb-1">✓</div>
                    <div className="text-xs font-bold text-[#00C851]">Resolved</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-sm font-bold text-white/60">No Alerts</div>
            <div className="text-[11px] text-white/40">You're all clear!</div>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div
        className="p-4 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="text-[10px] font-bold text-white/60 mb-3 uppercase tracking-wider">
          Notification Channels
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>🔔</span>
              <span className="text-[11px] text-white/60">Push Notifications</span>
            </div>
            <div className="w-10 h-5 rounded-full bg-[#00C851] relative">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span className="text-[11px] text-white/60">Email Alerts</span>
            </div>
            <div className="w-10 h-5 rounded-full bg-[#00C851] relative">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span className="text-[11px] text-white/60">SMS (Critical Only)</span>
            </div>
            <div className="w-10 h-5 rounded-full bg-[#00C851] relative">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
