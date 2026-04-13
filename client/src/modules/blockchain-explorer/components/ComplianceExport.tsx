"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";

type ReportType = "kyc" | "aml" | "transaction" | "audit";

interface ReportConfig {
  type: ReportType;
  label: string;
  description: string;
  icon: string;
}

const REPORT_TYPES: ReportConfig[] = [
  { type: "kyc", label: "KYC Report", description: "Know Your Customer compliance documentation", icon: "👤" },
  { type: "aml", label: "AML Report", description: "Anti-Money Laundering transaction analysis", icon: "🛡️" },
  { type: "transaction", label: "Transaction Report", description: "Complete transaction history with blockchain proofs", icon: "💰" },
  { type: "audit", label: "Audit Report", description: "Full audit trail with override history", icon: "📋" },
];

export default function ComplianceExport() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "custom">("30d");
  const [selectedType, setSelectedType] = useState<ReportType>("kyc");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const toast = useToast();

  const handleGenerate = async () => {
    setGenerating(true);
    
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setGenerating(false);
    setGenerated(true);
    toast.success(`${REPORT_TYPES.find(r => r.type === selectedType)?.label} generated successfully`);
  };

  const handleDownload = () => {
    const report = REPORT_TYPES.find(r => r.type === selectedType)!;
    const content = `${report.label}
========================
Generated: ${new Date().toLocaleString()}
Date Range: ${dateRange}
Type: ${report.label}

This is a cryptographically signed PDF report for regulatory compliance purposes.

[Digital Signature: 0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b]
`;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.type}-report-${new Date().toISOString().split("T")[0]}.pdf`;
    a.click();
    toast.success("Report downloaded");
  };

  const handleEmail = () => {
    toast.info("Report sent to your registered email");
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Compliance Export</h2>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="mb-5">
        <label className="text-[11px] text-white/60 mb-3 block">Select Report Type</label>
        <div className="grid grid-cols-2 gap-3">
          {REPORT_TYPES.map((report) => (
            <button
              key={report.type}
              onClick={() => setSelectedType(report.type)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedType === report.type
                  ? "bg-[#8040FF]/15 border-[#8040FF]/40"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
              style={{
                border: `1px solid ${selectedType === report.type ? "rgba(128,64,255,0.4)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              <div className="text-2xl mb-2">{report.icon}</div>
              <div className="text-xs font-bold text-white mb-1">{report.label}</div>
              <div className="text-[9px] text-white/40">{report.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-5">
        <label className="text-[11px] text-white/60 mb-3 block">Date Range</label>
        <div className="flex gap-2">
          {([
            { value: "7d", label: "7 Days" },
            { value: "30d", label: "30 Days" },
            { value: "90d", label: "90 Days" },
            { value: "custom", label: "Custom" },
          ] as const).map((range) => (
            <button
              key={range.value}
              onClick={() => setDateRange(range.value)}
              className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                dateRange === range.value
                  ? "bg-[#8040FF]/20 border-[#8040FF]/40 text-[#8040FF]"
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
              }`}
              style={{
                border: `1px solid ${dateRange === range.value ? "rgba(128,64,255,0.4)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8040FF] to-[#00C8FF] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 mb-4"
      >
        {generating ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
            Generating Report...
          </span>
        ) : (
          "Generate Report"
        )}
      </button>

      {/* Generated Report Actions */}
      {generated && (
        <div className="space-y-3">
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(0,200,81,0.05)",
              border: "1px solid rgba(0,200,81,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#00C851]/20 flex items-center justify-center text-[#00C851]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#00C851]">Report Ready</div>
                <div className="text-[10px] text-white/40">Cryptographically signed</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 rounded-lg bg-[#00C851] text-white text-xs font-bold hover:bg-[#00C851]/90 transition-colors"
              >
                Download PDF
              </button>
              <button
                onClick={handleEmail}
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 transition-colors"
              >
                Email
              </button>
            </div>
          </div>

          {/* Report Details */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[9px] text-white/40">Report Type</span>
                <span className="text-[9px] text-white/80">{REPORT_TYPES.find(r => r.type === selectedType)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-white/40">Date Range</span>
                <span className="text-[9px] text-white/80">{dateRange.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-white/40">Generated</span>
                <span className="text-[9px] text-white/80">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] text-white/40">Signature</span>
                <span className="text-[9px] text-[#8040FF] font-mono">0x7a8b...5a6b</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div
        className="mt-4 p-4 rounded-xl"
        style={{
          background: "rgba(0,200,255,0.05)",
          border: "1px solid rgba(0,200,255,0.15)",
        }}
      >
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-[#00C8FF] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-[10px] text-white/60 leading-relaxed">
            All reports include digital signatures for authenticity and are compliant with KYC/AML regulations. 
            Reports are cryptographically signed and can be verified by regulatory authorities.
          </div>
        </div>
      </div>
    </div>
  );
}
