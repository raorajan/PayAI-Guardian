"use client";
import React from "react";
import { useToast } from "@/hooks/useToast";

interface BlockchainRecord {
  transactionId: string;
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  amount: number;
  confirmations: number;
  status: "confirmed" | "pending";
  gasFee: number;
  nonce: number;
}

const RECORD: BlockchainRecord = {
  transactionId: "TXN-4821",
  hash: "0x3f4a8b2c9d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
  blockNumber: 18472951,
  timestamp: "Apr 13, 2026 · 10:32:45 AM",
  from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  to: "0x53d28436f4C1f7A85e2C5C8f2E7E4b7F1a3C8e9D",
  amount: 127.50,
  confirmations: 2847,
  status: "confirmed",
  gasFee: 0.0021,
  nonce: 47,
};

export default function BlockchainRecordViewer() {
  const toast = useToast();

  const handleCopyHash = () => {
    navigator.clipboard.writeText(RECORD.hash);
    toast.success("Hash copied to clipboard");
  };

  const handleDownload = () => {
    const content = `Blockchain Transaction Record
================================
Transaction ID: ${RECORD.transactionId}
Hash: ${RECORD.hash}
Block Number: ${RECORD.blockNumber}
Timestamp: ${RECORD.timestamp}
From: ${RECORD.from}
To: ${RECORD.to}
Amount: $${RECORD.amount.toFixed(2)}
Confirmations: ${RECORD.confirmations}
Status: ${RECORD.status.toUpperCase()}
Gas Fee: ${RECORD.gasFee} ETH
Nonce: ${RECORD.nonce}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tx-${RECORD.transactionId}.txt`;
    a.click();
    toast.success("Transaction proof downloaded");
  };

  const truncateHash = (hash: string) => `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Blockchain Record</h2>
        </div>
        <div
          className="px-3 py-1 rounded-full text-[10px] font-bold"
          style={{
            background: RECORD.status === "confirmed" ? "rgba(0,200,81,0.15)" : "rgba(255,184,0,0.15)",
            border: `1px solid ${RECORD.status === "confirmed" ? "rgba(0,200,81,0.3)" : "rgba(255,184,0,0.3)"}`,
            color: RECORD.status === "confirmed" ? "#00C851" : "#FFB800",
          }}
        >
          {RECORD.status === "confirmed" ? "✓ CONFIRMED" : "⏳ PENDING"}
        </div>
      </div>

      {/* Transaction Hash */}
      <div
        className="p-4 rounded-xl mb-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="text-[9px] text-white/40 mb-2 uppercase tracking-wider">Transaction Hash</div>
        <div className="flex items-center justify-between">
          <code className="text-xs text-[#8040FF] font-mono">{truncateHash(RECORD.hash)}</code>
          <button
            onClick={handleCopyHash}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold hover:bg-white/10 transition-colors"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Block Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(0,200,255,0.05)",
            border: "1px solid rgba(0,200,255,0.15)",
          }}
        >
          <div className="text-[9px] text-white/40 mb-1">Block Number</div>
          <div className="text-lg font-black text-[#00C8FF]">{RECORD.blockNumber.toLocaleString()}</div>
        </div>
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(128,64,255,0.05)",
            border: "1px solid rgba(128,64,255,0.15)",
          }}
        >
          <div className="text-[9px] text-white/40 mb-1">Confirmations</div>
          <div className="text-lg font-black text-[#8040FF]">{RECORD.confirmations.toLocaleString()}</div>
        </div>
      </div>

      {/* From/To */}
      <div className="space-y-3 mb-4">
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="text-[9px] text-white/40 mb-1">From</div>
          <div className="text-xs text-white/80 font-mono">{truncateAddress(RECORD.from)}</div>
        </div>
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="text-[9px] text-white/40 mb-1">To</div>
          <div className="text-xs text-white/80 font-mono">{truncateAddress(RECORD.to)}</div>
        </div>
      </div>

      {/* Amount & Details */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(0,200,81,0.05)", border: "1px solid rgba(0,200,81,0.15)" }}>
          <div className="text-[9px] text-white/40 mb-1">Amount</div>
          <div className="text-sm font-black text-[#00C851]">${RECORD.amount.toFixed(2)}</div>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}>
          <div className="text-[9px] text-white/40 mb-1">Gas Fee</div>
          <div className="text-sm font-black text-[#FFB800]">{RECORD.gasFee} ETH</div>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.15)" }}>
          <div className="text-[9px] text-white/40 mb-1">Nonce</div>
          <div className="text-sm font-black text-[#00C8FF]">{RECORD.nonce}</div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-center text-[11px] text-white/40 mb-4">{RECORD.timestamp}</div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => window.open(`https://etherscan.io/tx/${RECORD.hash}`, "_blank")}
          className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#8040FF] to-[#00C8FF] text-white text-xs font-bold hover:opacity-90 transition-opacity"
        >
          View on Etherscan
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold hover:bg-white/10 transition-colors"
        >
          Download Proof
        </button>
      </div>
    </div>
  );
}
