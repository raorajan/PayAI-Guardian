"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import SpendingHeatmap from "../components/SpendingHeatmap";
import CategoryBreakdown from "../components/CategoryBreakdown";
import FraudTrendLine from "../components/FraudTrendLine";
import FinancialHealthScore from "../components/FinancialHealthScore";
import InsightsList from "../components/InsightsList";

export default function AnalyticsPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("Monthly");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00C8FF]/20 border-t-[#00C8FF] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#050810] text-white selection:bg-[#00C8FF]/30 pb-20">
      <DashboardHeader />

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#8040FF]/[0.03] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#00C8FF]/[0.03] blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-[1280px] mx-auto px-6 pt-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00C8FF] anim-pulse-glow" />
              <span className="text-[11px] font-black text-[#00C8FF] tracking-[0.2em] uppercase">Security Intelligence</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">Analytics & Insights</h1>
            <p className="text-white/40 text-sm max-w-xl">
              Real-time visualization of your financial health and systemic threat detection metrics.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0">
            {["Weekly", "Monthly", "Yearly"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  timeframe === t 
                    ? "bg-[#00C8FF] text-white shadow-[0_4px_12px_rgba(0,200,255,0.4)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Top Summary Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-8 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FinancialHealthScore />
                <CategoryBreakdown />
             </div>
             <FraudTrendLine />
             <SpendingHeatmap />
          </div>

          {/* Sidebar Insights Feed */}
          <aside className="lg:col-span-4 space-y-8">
             <InsightsList />
             
             {/* Pro Banner */}
             <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0A66C2] to-[#8040FF] relative overflow-hidden group shadow-2xl">
                <div className="relative z-10">
                   <h3 className="text-xl font-black text-white mb-3">Export Deep Audit</h3>
                   <p className="text-white/70 text-sm leading-relaxed mb-6">
                      Generate a cryptographically signed PDF report of all transactions and security overrides for tax or legal purposes.
                   </p>
                   <button className="w-full py-4 rounded-xl bg-white text-[#0A66C2] font-black text-sm hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-3 group/btn">
                      Generate PDF Report
                      <svg className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                   </button>
                </div>
                {/* Decorative SVG elements */}
                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-black/10 rounded-full blur-2xl" />
             </div>
          </aside>
          
        </div>

      </main>
    </div>
  );
}
