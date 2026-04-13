"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";

type PaymentStatus = "pending" | "processing" | "completed" | "failed";

interface PaymentUpdate {
  id: string;
  recipient: string;
  amount: number;
  status: PaymentStatus;
  progress: number;
  estimatedTime: string;
  timestamp: string;
}

const INITIAL_PAYMENTS: PaymentUpdate[] = [
  {
    id: "pay_001",
    recipient: "Sarah Miller",
    amount: 120.00,
    status: "processing",
    progress: 65,
    estimatedTime: "~30 seconds",
    timestamp: "Just now",
  },
  {
    id: "pay_002",
    recipient: "James Okafor",
    amount: 45.50,
    status: "pending",
    progress: 25,
    estimatedTime: "~2 minutes",
    timestamp: "2 min ago",
  },
];

export default function PaymentStatusTracker() {
  const [payments, setPayments] = useState<PaymentUpdate[]>(INITIAL_PAYMENTS);
  const toast = useToast();

  // Simulate WebSocket real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPayments((prev) =>
        prev.map((payment) => {
          if (payment.status === "completed" || payment.status === "failed") {
            return payment;
          }

          const newProgress = Math.min(payment.progress + Math.random() * 15, 100);

          if (newProgress >= 100) {
            // Simulate 90% success rate
            const success = Math.random() > 0.1;
            const newStatus: PaymentStatus = success ? "completed" : "failed";

            // Show toast notification
            if (success) {
              toast.success(`$${payment.amount.toFixed(2)} sent to ${payment.recipient}`);
            } else {
              toast.error(`Payment to ${payment.recipient} failed`);
            }

            return {
              ...payment,
              status: newStatus,
              progress: 100,
              estimatedTime: success ? "Completed" : "Failed",
            };
          }

          return {
            ...payment,
            progress: Math.round(newProgress),
            estimatedTime: newProgress > 75 ? "~10 seconds" : newProgress > 50 ? "~30 seconds" : "~1 minute",
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [toast]);

  const handleRetry = (id: string) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: "processing" as PaymentStatus, progress: 0, estimatedTime: "~2 minutes" }
          : payment
      )
    );
    toast.info("Retrying payment...");
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "pending":
        return { color: "#FFA500", bg: "rgba(255,165,0,0.1)", border: "rgba(255,165,0,0.2)" };
      case "processing":
        return { color: "#00C8FF", bg: "rgba(0,200,255,0.1)", border: "rgba(0,200,255,0.2)" };
      case "completed":
        return { color: "#00C851", bg: "rgba(0,200,81,0.1)", border: "rgba(0,200,81,0.2)" };
      case "failed":
        return { color: "#FF3B5C", bg: "rgba(255,59,92,0.1)", border: "rgba(255,59,92,0.2)" };
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "processing":
        return (
          <div className="w-4 h-4 rounded-full border-2 border-[#00C8FF]/30 border-t-[#00C8FF] animate-spin" />
        );
      case "completed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="#00C851" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "failed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="#FF3B5C" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
    }
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Payment Status</h2>
            <p className="text-[11px] text-white/40">Real-time tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00C851] animate-pulse" style={{ boxShadow: "0 0 8px #00C851" }} />
          <span className="text-[10px] font-bold text-[#00C851]">LIVE</span>
        </div>
      </div>

      {/* Payment Updates */}
      <div className="flex flex-col gap-4">
        {payments.map((payment) => {
          const statusCfg = getStatusColor(payment.status);
          return (
            <div
              key={payment.id}
              className="p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${statusCfg.border}` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: statusCfg.bg }}
                  >
                    {getStatusIcon(payment.status)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{payment.recipient}</div>
                    <div className="text-[11px] text-white/40">{payment.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black" style={{ color: statusCfg.color }}>
                    ${payment.amount.toFixed(2)}
                  </div>
                  <div
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block"
                    style={{ color: statusCfg.color, background: statusCfg.bg }}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {(payment.status === "pending" || payment.status === "processing") && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-white/40">Progress</span>
                    <span className="text-[10px] font-bold" style={{ color: statusCfg.color }}>
                      {payment.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${payment.progress}%`,
                        background: `linear-gradient(90deg, ${statusCfg.color}80, ${statusCfg.color})`,
                        boxShadow: `0 0 10px ${statusCfg.color}40`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-white/30 mt-1">
                    Estimated: {payment.estimatedTime}
                  </div>
                </div>
              )}

              {/* Completed Message */}
              {payment.status === "completed" && (
                <div
                  className="p-2 rounded-lg text-center"
                  style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.1)" }}
                >
                  <span className="text-[11px] text-[#00C851] font-semibold">
                    ✅ Payment completed successfully
                  </span>
                </div>
              )}

              {/* Failed with Retry */}
              {payment.status === "failed" && (
                <div className="flex items-center justify-between">
                  <div
                    className="flex-1 p-2 rounded-lg"
                    style={{ background: "rgba(255,59,92,0.05)", border: "1px solid rgba(255,59,92,0.1)" }}
                  >
                    <span className="text-[11px] text-[#FF3B5C] font-semibold">
                      ❌ Payment failed. Please try again.
                    </span>
                  </div>
                  <button
                    onClick={() => handleRetry(payment.id)}
                    className="ml-3 px-4 py-2 rounded-lg text-[11px] font-bold text-white transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg,#FF3B5C,#FF6B35)",
                      boxShadow: "0 2px 10px rgba(255,59,92,0.3)",
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div
        className="mt-5 p-3 rounded-xl text-center"
        style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.1)" }}
      >
        <p className="text-[11px] text-white/40">
          🔔 You'll receive notifications for all status changes
        </p>
      </div>
    </div>
  );
}
