"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import RiskScoreGauge from "../components/RiskScoreGauge";
import FraudTimeline from "../components/FraudTimeline";
import SuspiciousTransactionAlert from "../components/SuspiciousTransactionAlert";
import RealTimeScanner from "../components/RealTimeScanner";
import FraudPatternLearning from "../components/FraudPatternLearning";
import SuspiciousActivityAlerts from "../components/SuspiciousActivityAlerts";

export default function FraudShieldPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#FF3B5C]/20 border-t-[#FF3B5C] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-[#FF3B5C]/30 pb-20 overflow-x-hidden">
      <DashboardHeader />

      {/* Defensive Grid Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: "radial-gradient(#FF3B5C 1px, transparent 1px)", 
            backgroundSize: "30px 30px" 
          }}
        />
        <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF3B5C]/[0.02] blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00C8FF]/[0.01] blur-[150px]" />
      </div>

      <main className="relative z-10 max-w-[1280px] mx-auto px-6 pt-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF3B5C] anim-pulse-glow" />
              <span className="text-[11px] font-black text-[#FF3B5C] tracking-[0.2em] uppercase">Security Operations Center</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2 italic">Fraud Shield</h1>
            <p className="text-white/40 text-sm max-w-xl">
              Real-time monitoring of systemic risk, geo-spatial anomalies, and behavioral fingerprinting.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-3xl">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Protection</span>
                <span className="text-sm font-bold text-[#00C851]">LOCKED & SECURED</span>
             </div>
             <div className="w-8 h-8 rounded-lg bg-[#00C851]/10 flex items-center justify-center text-[#00C851]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
             </div>
          </div>
        </div>

        {/* Tactical Information Grid */}
        <div className="space-y-8">
          {/* Top Section: Risk Overview + Active Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RiskScoreGauge />
                <SuspiciousTransactionAlert />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <FraudTimeline />
            </aside>
          </div>

          {/* Middle Section: Real-Time Scanner + Pattern Learning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RealTimeScanner />
            <FraudPatternLearning />
          </div>

          {/* Bottom Section: Suspicious Activity Alerts */}
          <SuspiciousActivityAlerts />
        </div>

      </main>
    </div>
  );
}
