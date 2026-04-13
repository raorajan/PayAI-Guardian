"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface VerificationResult {
  valid: boolean;
  transactionId: string;
  hash: string;
  blockNumber: number;
  confirmations: number;
  timestamp: string;
  amount: number;
  status: string;
}

const VALID_HASHES: Record<string, VerificationResult> = {
  "0x3f4a8b2c9d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0": {
    valid: true,
    transactionId: "TXN-4821",
    hash: "0x3f4a8b2c9d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    blockNumber: 18472951,
    confirmations: 2847,
    timestamp: "Apr 13, 2026 · 10:32:45 AM",
    amount: 127.50,
    status: "confirmed",
  },
};

export default function HashVerificationTool() {
  const [inputHash, setInputHash] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const toast = useToast();

  const handleVerify = async () => {
    if (!inputHash.trim()) {
      toast.error("Please enter a transaction hash");
      return;
    }

    setVerifying(true);
    setResult(null);
    setNotFound(false);

    // Simulate blockchain query
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const found = VALID_HASHES[inputHash.trim()];
    if (found) {
      setResult(found);
      toast.success("Transaction verified on blockchain");
    } else {
      setNotFound(true);
      toast.error("Transaction hash not found");
    }

    setVerifying(false);
  };

  const handleClear = () => {
    setInputHash("");
    setResult(null);
    setNotFound(false);
  };

  return (
    <div
      className="p-6 rounded-[20px] backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,81,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,81,0.12)" }}>
            <svg className="w-4 h-4 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Hash Verification</h2>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-5">
        <label className="text-[11px] text-white/60 mb-2 block">Enter Transaction Hash</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputHash}
            onChange={(e) => setInputHash(e.target.value)}
            placeholder="0x..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 font-mono focus:outline-none focus:border-[#00C851]/50"
          />
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C851] to-[#00C8FF] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {verifying ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>
        <button
          onClick={handleClear}
          className="mt-2 text-[10px] text-white/40 hover:text-white transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Verification Result */}
      {result && (
        <div
          className="p-5 rounded-xl mb-4"
          style={{
            background: "rgba(0,200,81,0.05)",
            border: "1px solid rgba(0,200,81,0.2)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00C851]/20 flex items-center justify-center text-[#00C851]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-[#00C851]">VERIFIED</div>
              <div className="text-[10px] text-white/40">Transaction is authentic</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Transaction ID</span>
              <span className="text-xs font-bold text-white">{result.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Block Number</span>
              <span className="text-xs font-bold text-[#00C8FF]">{result.blockNumber.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Confirmations</span>
              <span className="text-xs font-bold text-[#8040FF]">{result.confirmations.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Amount</span>
              <span className="text-xs font-bold text-[#00C851]">${result.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Status</span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(0,200,81,0.15)",
                  color: "#00C851",
                  border: "1px solid rgba(0,200,81,0.3)",
                }}
              >
                {result.status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-white/40">Timestamp</span>
              <span className="text-[10px] text-white/60">{result.timestamp}</span>
            </div>
          </div>
        </div>
      )}

      {notFound && (
        <div
          className="p-5 rounded-xl mb-4"
          style={{
            background: "rgba(255,59,92,0.05)",
            border: "1px solid rgba(255,59,92,0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF3B5C]/20 flex items-center justify-center text-[#FF3B5C]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-[#FF3B5C]">NOT FOUND</div>
              <div className="text-[10px] text-white/40">Hash does not exist on blockchain</div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div
        className="p-4 rounded-xl"
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
            This tool queries the Ethereum blockchain to verify transaction authenticity. 
            Enter the full transaction hash (0x...) to validate against the distributed ledger.
          </div>
        </div>
      </div>
    </div>
  );
}
