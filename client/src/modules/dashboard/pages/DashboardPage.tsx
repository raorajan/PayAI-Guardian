"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { getProfile } from "@/modules/auth/slice/authSlice";
import DashboardHeader from "../components/DashboardHeader";
import WelcomeBanner from "../components/WelcomeBanner";
import BalanceCard from "../components/BalanceCard";
import RecentTransactions from "../components/RecentTransactions";
import FraudRiskAlert from "../components/FraudRiskAlert";
import QuickActions from "../components/QuickActions";
import SpendingChart from "../components/SpendingChart";
import AIInsightCard from "../components/AIInsightCard";
import SpendingInsights from "../components/SpendingInsights";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
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

  if (!isAuthenticated) return null;

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{ fontFamily: "Inter, -apple-system, sans-serif", background: "#050810" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(20,70,190,0.25)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(100,40,200,0.18)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle,rgba(255,59,92,0.06)_0%,transparent_70%)] blur-[60px]" />
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

        <WelcomeBanner />

        <BalanceCard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <RecentTransactions />
          <FraudRiskAlert />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AIInsightCard />
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpendingChart />
          <SpendingInsights />
        </div>

      </main>
    </div>
  );
}
