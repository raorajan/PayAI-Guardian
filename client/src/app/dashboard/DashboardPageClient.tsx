"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getProfile, logoutUser } from "@/modules/auth/slice/authSlice";
import Link from "next/link";

export default function DashboardPageClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    // Try to restore session if we have a token
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to auth if not authenticated after loading resolves
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#00C8FF]/30 border-t-[#00C8FF] animate-spin" />
          <p className="text-white/50 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null; // redirecting

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{ fontFamily: "Inter, -apple-system, sans-serif", background: "#050810" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(20,70,190,0.25)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(100,40,200,0.18)_0%,transparent_70%)] blur-[70px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0,200,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.025) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between max-w-[1280px] mx-auto">
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#0A66C2] to-[#00C8FF] flex items-center justify-center shadow-[0_0_14px_rgba(0,100,220,0.4)] group-hover:scale-105 transition-transform">
            <svg width="18" height="20" viewBox="0 0 20 24" fill="none">
              <path d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z" fill="rgba(255,255,255,0.95)"/>
            </svg>
          </div>
          <span className="text-[18px] font-extrabold text-white tracking-tight">
            PayAI <span className="text-[#00C8FF]">Guardian</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user?.fullName && (
            <span className="text-white/50 text-sm hidden sm:block">
              Welcome, <span className="text-white font-medium">{user.fullName}</span>
            </span>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all no-underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Home
          </Link>
          <button
            onClick={() => dispatch(logoutUser())}
            className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all shadow-[0_0_10px_rgba(255,59,92,0.1)] hover:shadow-[0_0_15px_rgba(255,59,92,0.2)] group"
            title="Logout"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="relative z-10 max-w-[1280px] mx-auto px-6 pb-16">
        {/* Welcome Banner */}
        <div
          className="rounded-[20px] p-8 mb-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(10,102,194,0.2) 0%, rgba(0,200,255,0.08) 100%)",
            border: "1px solid rgba(0,200,255,0.2)",
          }}
        >
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/50 to-transparent" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
                Welcome back, {user?.fullName?.split(" ")[0] ?? "Guardian"} 👋
              </h1>
              <p className="text-white/50 text-sm">Your AI banking dashboard — everything protected.</p>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(0,200,81,0.12)", border: "1px solid rgba(0,200,81,0.25)", color: "#00C851" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00C851] shadow-[0_0_6px_#00C851] animate-pulse" />
              AI Shield Active
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Balance", value: "$12,487.30", color: "text-[#00C8FF]", icon: "💳", sub: "Available funds" },
            { label: "Protected", value: "$48,291.00", color: "text-[#00C851]", icon: "🛡️", sub: "Total secured" },
            { label: "Fraud Blocked", value: "23", color: "text-[#FF3B5C]", icon: "🚨", sub: "Attempts stopped" },
            { label: "AI Score", value: "99/100", color: "text-[#8040FF]", icon: "🤖", sub: "Trust rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[16px] p-5 backdrop-blur-xl"
              style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-[12px] text-white/40 font-medium mb-1">{stat.label}</div>
              <div className={`text-[22px] font-black ${stat.color} mb-0.5`}>{stat.value}</div>
              <div className="text-[11px] text-white/30">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div
          className="rounded-[20px] p-6 mb-8 backdrop-blur-xl"
          style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-lg font-bold text-white mb-5">Recent Transactions</h2>
          <div className="flex flex-col gap-3">
            {[
              { desc: "Starbucks Coffee — NYC", amount: "-$6.50", status: "approved", time: "2s ago" },
              { desc: "Fraud Blocked — Lagos, NG", amount: "-$4,999", status: "blocked", time: "34s ago" },
              { desc: "Transfer from John D.", amount: "+$250.00", status: "received", time: "2m ago" },
              { desc: "Netflix Subscription", amount: "-$15.99", status: "approved", time: "1h ago" },
              { desc: "ATM Withdrawal — Manhattan", amount: "-$200.00", status: "approved", time: "3h ago" },
            ].map((tx) => (
              <div
                key={tx.desc}
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: tx.status === "blocked" ? "#FF3B5C" : tx.status === "received" ? "#00C8FF" : "#00C851",
                      boxShadow: `0 0 6px ${tx.status === "blocked" ? "#FF3B5C" : "#00C851"}`,
                    }}
                  />
                  <div>
                    <div className="text-[14px] text-white/80 font-medium">{tx.desc}</div>
                    <div className="text-[11px] text-white/35">{tx.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      color: tx.status === "blocked" ? "#FF3B5C" : tx.status === "received" ? "#00C8FF" : "#00C851",
                      background: tx.status === "blocked" ? "rgba(255,59,92,0.1)" : tx.status === "received" ? "rgba(0,200,255,0.1)" : "rgba(0,200,81,0.1)",
                    }}
                  >
                    {tx.status}
                  </span>
                  <span
                    className="text-[14px] font-bold"
                    style={{
                      color: tx.status === "blocked" ? "#FF3B5C" : tx.amount.startsWith("+") ? "#00C851" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {tx.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom placeholder modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "AI Banking Assistant",
              desc: "Chat with your personal AI banker for investment advice, budget guidance, and financial insights.",
              icon: "🤖",
              color: "#8040FF",
              href: "/ai-assistant",
              label: "Open Chat",
            },
            {
              title: "Fraud Shield",
              desc: "View real-time fraud risk scores, suspicious transaction alerts, and your protection history.",
              icon: "🛡️",
              color: "#00C8FF",
              href: "/fraud-shield",
              label: "View Shield",
            },
          ].map((mod) => (
            <div
              key={mod.title}
              className="rounded-[20px] p-6 backdrop-blur-xl"
              style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-[12px] text-[24px] flex items-center justify-center shrink-0"
                  style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}25` }}
                >
                  {mod.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-white mb-1">{mod.title}</h3>
                  <p className="text-[13px] text-white/50 leading-[1.6]">{mod.desc}</p>
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: `${mod.color}15`,
                  border: `1px solid ${mod.color}30`,
                  color: mod.color,
                }}
              >
                {mod.label} →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
