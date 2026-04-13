"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

export default function HeroSection() {
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const stats = [
    { label: "Balance", value: "$12,487.30", color: "text-[#00C8FF]", icon: "💳" },
    { label: "Protected", value: "$48,291.00", color: "text-[#00C851]", icon: "🛡️" },
    { label: "Fraud Blocked", value: "23 attempts", color: "text-[#FF3B5C]", icon: "🚨" },
    { label: "AI Score", value: "99/100", color: "text-[#8040FF]", icon: "🤖" },
  ];

  const transactions = [
    { desc: "Starbucks Coffee — NYC", amount: "-$6.50", color: "text-white/85", dot: "bg-[#00C851]", dotShadow: "shadow-[0_0_6px_#00C851]", time: "2s ago" },
    { desc: "Fraud Blocked — Lagos NG", amount: "-$4,999", color: "text-[#FF3B5C]", dot: "bg-[#FF3B5C]", dotShadow: "shadow-[0_0_6px_#FF3B5C]", time: "34s ago" },
    { desc: "Transfer from John D.", amount: "+$250.00", color: "text-[#00C851]", dot: "bg-[#00C8FF]", dotShadow: "shadow-[0_0_6px_#00C8FF]", time: "2m ago" },
  ];

  const trustStats = [
    { label: "97% Fraud Detection", icon: "🛡️" },
    { label: "100ms Block Speed", icon: "⚡" },
    { label: "Bank-Grade Encryption", icon: "🔒" },
    { label: "5,000+ Users Supported", icon: "👥" },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-[72px]">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[65%] h-[65%] rounded-full bg-[radial-gradient(circle,rgba(20,70,190,0.3)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(100,40,200,0.22)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute top-[30%] right-[15%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(0,160,255,0.12)_0%,transparent_70%)] blur-[60px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0,200,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.03) 1px,transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-12 relative z-10 w-full flex flex-col items-center text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 py-1.5 pl-2 pr-4 rounded-full bg-[#00C8FF]/8 border border-[#00C8FF]/20 mb-8">
          <span className="bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
            NEW
          </span>
          <span className="text-[13px] text-[#00C8FF] font-medium">
            Powered by Predictive AI — 97% Fraud Detection Accuracy
          </span>
        </div>

        {/* Hero title */}
        <h1 className="text-[clamp(38px,6vw,72px)] font-black leading-[1.08] tracking-[-0.03em] text-white max-w-[900px] mb-6">
          Your Intelligent{" "}
          <span className="bg-gradient-to-r from-[#00C8FF] via-[#4060FF] to-[#8040FF] bg-clip-text text-transparent">
            Banking Guardian
          </span>
          <br />
          Where AI Meets Financial Security
        </h1>

        <p className="text-[clamp(15px,2vw,19px)] text-white/60 leading-relaxed max-w-[680px] mb-12">
          Experience the future of banking with real-time AI fraud protection, conversational financial intelligence, and blockchain-secured transactions — all in one seamless platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-base font-bold no-underline shadow-[0_6px_24px_rgba(0,150,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,150,255,0.6)] transition-all duration-300 sm:w-auto w-full"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-base font-bold no-underline shadow-[0_6px_24px_rgba(0,150,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,150,255,0.6)] transition-all duration-300 sm:w-auto w-full"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M13 2L4.09 12.26a1 1 0 00.91 1.64h6l-1 9 8.91-10.26A1 1 0 0018 11h-6z" fill="#fff"/>
              </svg>
              Launch Demo Now
            </Link>
          )}
          <a
            href="#features"
            id="hero-see-features-btn"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/6 border border-white/12 text-white/85 text-base font-semibold no-underline hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 sm:w-auto w-full"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" strokeLinecap="round"/>
            </svg>
            See How It Works
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap gap-6 justify-center items-center mb-12">
          {trustStats.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-[13px] text-white/50 font-medium">
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Floating dashboard preview */}
        <div
          className="w-full max-w-[780px] rounded-[20px] p-6 backdrop-blur-[30px] relative overflow-hidden animate-[float_5s_ease-in-out_infinite]"
          style={{
            background: "rgba(8,12,30,0.75)",
            border: "1px solid rgba(0,200,255,0.15)",
            boxShadow: "0 0 80px rgba(0,100,220,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/60 to-transparent" />

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-xl mb-2">{stat.icon}</div>
                <div className="text-[12px] text-white/40 font-medium mb-1">{stat.label}</div>
                <div className={`text-[17px] font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div className="flex flex-col gap-2">
            {transactions.map((tx) => (
              <div
                key={tx.desc}
                className="flex items-center justify-between rounded-[10px] px-3.5 py-2.5"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${tx.dot} ${tx.dotShadow}`} />
                  <span className="text-[13px] text-white/75">{tx.desc}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-white/35">{tx.time}</span>
                  <span className={`text-[13px] font-bold ${tx.color}`}>{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
