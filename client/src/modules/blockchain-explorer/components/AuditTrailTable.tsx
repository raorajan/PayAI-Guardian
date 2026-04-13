"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
  hash: string;
  type: "transaction" | "override" | "verification" | "export";
}

const AUDIT_LOG: AuditEntry[] = [
  {
    id: "audit_001",
    timestamp: "2026-04-13 10:32:45",
    action: "Transaction Created",
    user: "John Doe",
    details: "Sent $127.50 to Amazon Web Services",
    hash: "0x3f4a8b2c9d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
    type: "transaction",
  },
  {
    id: "audit_002",
    timestamp: "2026-04-13 09:42:18",
    action: "Fraud Override",
    user: "John Doe",
    details: "Overrode block on $4,999.00 transaction to Electronics Hub",
    hash: "0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7",
    type: "override",
  },
  {
    id: "audit_003",
    timestamp: "2026-04-12 15:20:33",
    action: "Identity Verified",
    user: "System",
    details: "KYC verification completed via facial recognition",
    hash: "0x1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2",
    type: "verification",
  },
  {
    id: "audit_004",
    timestamp: "2026-04-12 11:05:12",
    action: "Report Exported",
    user: "John Doe",
    details: "Generated AML compliance report for Q1 2026",
    hash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8",
    type: "export",
  },
  {
    id: "audit_005",
    timestamp: "2026-04-11 14:30:27",
    action: "Transaction Created",
    user: "John Doe",
    details: "Received $120.00 from Sarah Miller",
    hash: "0x5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4",
    type: "transaction",
  },
];

export default function AuditTrailTable() {
  const [filter, setFilter] = useState<"all" | AuditEntry["type"]>("all");
  const [search, setSearch] = useState("");
  const toast = useToast();

  const filteredLogs = AUDIT_LOG.filter((log) => {
    const matchesFilter = filter === "all" || log.type === filter;
    const matchesSearch =
      search === "" ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = (format: "csv" | "json" | "pdf") => {
    let content = "";
    let filename = `audit-trail-${new Date().toISOString().split("T")[0]}`;
    let type = "text/plain";

    if (format === "csv") {
      content = "Timestamp,Action,User,Details,Hash\n";
      filteredLogs.forEach((log) => {
        content += `"${log.timestamp}","${log.action}","${log.user}","${log.details}","${log.hash}"\n`;
      });
      filename += ".csv";
      type = "text/csv";
    } else if (format === "json") {
      content = JSON.stringify(filteredLogs, null, 2);
      filename += ".json";
      type = "application/json";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    toast.success(`Audit trail exported as ${format.toUpperCase()}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "transaction":
        return "#00C8FF";
      case "override":
        return "#FFB800";
      case "verification":
        return "#00C851";
      case "export":
        return "#8040FF";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <div
      className="p-6 rounded-[20px] backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.12)" }}>
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Audit Trail</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("csv")}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold hover:bg-white/10 transition-colors"
          >
            CSV
          </button>
          <button
            onClick={() => handleExport("json")}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold hover:bg-white/10 transition-colors"
          >
            JSON
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search audit log..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#00C8FF]/50"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#00C8FF]/50"
        >
          <option value="all" className="bg-[#0a0f1a]">All Types</option>
          <option value="transaction" className="bg-[#0a0f1a]">Transactions</option>
          <option value="override" className="bg-[#0a0f1a]">Overrides</option>
          <option value="verification" className="bg-[#0a0f1a]">Verifications</option>
          <option value="export" className="bg-[#0a0f1a]">Exports</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th className="px-4 py-3 text-left text-[9px] font-bold text-white/40 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-left text-[9px] font-bold text-white/40 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-[9px] font-bold text-white/40 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-[9px] font-bold text-white/40 uppercase tracking-wider">Details</th>
                <th className="px-4 py-3 text-left text-[9px] font-bold text-white/40 uppercase tracking-wider">Hash</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 text-[10px] text-white/60 font-mono whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded"
                      style={{
                        background: `${getTypeColor(log.type)}15`,
                        color: getTypeColor(log.type),
                        border: `1px solid ${getTypeColor(log.type)}30`,
                      }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[10px] text-white/80">{log.user}</td>
                  <td className="px-4 py-3 text-[10px] text-white/60 max-w-xs truncate">{log.details}</td>
                  <td className="px-4 py-3 text-[9px] text-[#8040FF] font-mono">{log.hash.slice(0, 10)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {(["transaction", "override", "verification", "export"] as const).map((type) => (
          <div
            key={type}
            className="p-3 rounded-xl text-center capitalize"
            style={{
              background: `${getTypeColor(type)}05`,
              border: `1px solid ${getTypeColor(type)}15`,
            }}
          >
            <div className="text-lg font-black" style={{ color: getTypeColor(type) }}>
              {AUDIT_LOG.filter((l) => l.type === type).length}
            </div>
            <div className="text-[9px] text-white/40">{type}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}
