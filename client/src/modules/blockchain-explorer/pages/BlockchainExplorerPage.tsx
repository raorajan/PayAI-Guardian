"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import TransactionGraph from "../components/TransactionGraph";
import BlockchainRecordViewer from "../components/BlockchainRecordViewer";
import AuditTrailTable from "../components/AuditTrailTable";
import HashVerificationTool from "../components/HashVerificationTool";
import ComplianceExport from "../components/ComplianceExport";

export default function BlockchainExplorerPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"graph" | "record" | "audit" | "verify" | "export">("graph");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#8040FF]/20 border-t-[#8040FF] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-[#8040FF]/30 pb-20 overflow-x-hidden">
      <DashboardHeader />

      {/* Blockchain Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8040FF]/[0.02] blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00C8FF]/[0.02] blur-[150px]" />
      </div>

      <main className="relative z-10 max-w-[1440px] mx-auto px-6 pt-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8040FF] anim-pulse-glow" />
              <span className="text-[11px] font-black text-[#8040FF] tracking-[0.2em] uppercase">Blockchain Explorer</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2 italic">Transaction Ledger</h1>
            <p className="text-white/40 text-sm max-w-xl">
              Immutable blockchain records, transaction graphs, and compliance-ready audit trails.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-3xl">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Network Status</span>
              <span className="text-sm font-bold text-[#00C851]">CONNECTED</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#00C851]/10 flex items-center justify-center text-[#00C851]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {([
            { id: "graph", label: "Transaction Graph", icon: "📊" },
            { id: "record", label: "Block Record", icon: "⛓️" },
            { id: "audit", label: "Audit Trail", icon: "📋" },
            { id: "verify", label: "Verify Hash", icon: "✓" },
            { id: "export", label: "Export", icon: "📥" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap"
              style={{
                background: activeTab === tab.id ? "rgba(128,64,255,0.15)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeTab === tab.id ? "rgba(128,64,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                color: activeTab === tab.id ? "#8040FF" : "rgba(255,255,255,0.4)",
              }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {activeTab === "graph" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <TransactionGraph />
              <BlockchainRecordViewer />
            </div>
          )}

          {activeTab === "record" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <BlockchainRecordViewer />
              <HashVerificationTool />
            </div>
          )}

          {activeTab === "audit" && (
            <AuditTrailTable />
          )}

          {activeTab === "verify" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <HashVerificationTool />
              <BlockchainRecordViewer />
            </div>
          )}

          {activeTab === "export" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ComplianceExport />
              <AuditTrailTable />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
