"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import PaymentForm       from "../components/PaymentForm";
import PaymentHistory    from "../components/PaymentHistory";
import BankAccountCard   from "../components/BankAccountCard";
import RecipientSearch   from "../components/RecipientSearch";
import PlaidLinkButton   from "../components/PlaidLinkButton";
import PaymentConfirmation from "../components/PaymentConfirmation";
import SplitPaymentModal from "../components/SplitPaymentModal";

type Tab = "send" | "history" | "accounts";

const STATS = [
  { label: "Available Balance", value: "$19,171.74", sub: "across 3 accounts",  color: "#00C8FF",  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  )},
  { label: "Sent This Month",   value: "$2,340.50", sub: "12 transactions",     color: "#8040FF",  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )},
  { label: "Received",          value: "$3,450.00", sub: "this month",          color: "#00C851",  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  )},
  { label: "Fraud Blocked",     value: "2",         sub: "attempts this month", color: "#FF3B5C",  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  )},
];

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: "send", label: "Send Money",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  },
  {
    key: "history", label: "History",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  },
  {
    key: "accounts", label: "Accounts",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
  },
];

export default function PaymentsPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("send");
  const [splitOpen, setSplitOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#00C8FF]/30 border-t-[#00C8FF] animate-spin" />
          <p className="text-white/50 text-sm">Loading payments…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.replace("/auth");
    return null;
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{ fontFamily: "Inter, -apple-system, sans-serif", background: "#050810" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(20,70,190,0.25)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(100,40,200,0.18)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute top-[50%] left-[50%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.06)_0%,transparent_70%)] blur-[60px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,200,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.025) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <DashboardHeader />

      <main className="relative z-10 max-w-[1280px] mx-auto px-6 pb-20">

        {/* Page title */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-black text-white tracking-tight">Payments</h1>
            <p className="text-[14px] text-white/40 mt-0.5">AI-protected transfers · Real-time fraud detection</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSplitOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[13px] text-[#8040FF] transition-all hover:scale-[1.02] hover:bg-[#8040FF]/10"
              style={{ background: "rgba(128,64,255,0.08)", border: "1px solid rgba(128,64,255,0.25)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Split Bill
            </button>
            <button
              onClick={() => setShowConfirm((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[13px] text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#0A66C2,#00C8FF)", boxShadow: "0 4px 16px rgba(0,150,255,0.3)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              View Receipt
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-[16px] p-5 backdrop-blur-xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-default"
              style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(circle at 50% 50%,${s.color}08 0%,transparent 70%)` }}
              />
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-xl" style={{ background: `${s.color}15`, color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <div className="text-[11px] text-white/40 font-medium mb-1">{s.label}</div>
              <div className="text-[22px] font-black mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[11px] text-white/30">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div
          className="flex gap-1 p-1 rounded-2xl mb-6 w-full sm:w-auto sm:inline-flex"
          style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex-1 sm:flex-none justify-center"
              style={{
                background: tab === t.key ? "rgba(0,200,255,0.12)" : "transparent",
                color: tab === t.key ? "#00C8FF" : "rgba(255,255,255,0.40)",
                border: tab === t.key ? "1px solid rgba(0,200,255,0.25)" : "1px solid transparent",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* --- SEND TAB --- */}
        {tab === "send" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PaymentForm />
            </div>
            <div className="lg:col-span-1">
              <RecipientSearch />
            </div>
            <div className="lg:col-span-1">
              <PlaidLinkButton />
            </div>
          </div>
        )}

        {/* --- HISTORY TAB --- */}
        {tab === "history" && (
          <div className="grid grid-cols-1 gap-6">
            <PaymentHistory />
          </div>
        )}

        {/* --- ACCOUNTS TAB --- */}
        {tab === "accounts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BankAccountCard />
            <PlaidLinkButton />
          </div>
        )}

        {/* Inline receipt preview (togglable) */}
        {showConfirm && (
          <div className="mt-6 max-w-md">
            <PaymentConfirmation
              amount="$120.00"
              recipient="Sarah Miller"
              method="Bank Transfer"
              riskScore={3}
              transactionId="TXN-7F4A2B9E"
              timestamp="Apr 13, 2026 · 10:32 AM"
              status="success"
              onDone={() => setShowConfirm(false)}
            />
          </div>
        )}
      </main>

      {/* Split modal */}
      <SplitPaymentModal isOpen={splitOpen} onClose={() => setSplitOpen(false)} />
    </div>
  );
}
