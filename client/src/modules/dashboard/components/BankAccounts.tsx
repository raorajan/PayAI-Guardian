"use client";
import React from "react";
import Link from "next/link";

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  last4: string;
  balance: number;
  isDefault: boolean;
  color: string;
}

const ACCOUNTS: BankAccount[] = [
  {
    id: "acc_001",
    bankName: "Chase Bank",
    accountType: "Checking",
    last4: "4521",
    balance: 12847.50,
    isDefault: true,
    color: "#00C8FF",
  },
  {
    id: "acc_002",
    bankName: "Bank of America",
    accountType: "Savings",
    last4: "7893",
    balance: 24500.00,
    isDefault: false,
    color: "#FF3B5C",
  },
  {
    id: "acc_003",
    bankName: "Wells Fargo",
    accountType: "Checking",
    last4: "2156",
    balance: 3200.00,
    isDefault: false,
    color: "#FFB800",
  },
];

export default function BankAccounts() {
  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,81,0.1)" }}>
            <svg className="w-4 h-4 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Linked Bank Accounts</h2>
            <p className="text-[11px] text-white/40">{ACCOUNTS.length} accounts connected via Plaid</p>
          </div>
        </div>

        {/* Add Account Button */}
        <Link
          href="/payments"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C851]/10 border border-[#00C851]/20 text-[#00C851] text-xs font-bold hover:bg-[#00C851]/20 transition-all no-underline group"
        >
          <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New</span>
        </Link>
      </div>

      {/* Accounts List */}
      <div className="space-y-3">
        {ACCOUNTS.map((account) => (
          <div
            key={account.id}
            className="group p-4 rounded-xl transition-all hover:bg-white/[0.03] cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${account.isDefault ? `${account.color}30` : "rgba(255,255,255,0.05)"}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Bank Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{
                    background: `${account.color}15`,
                    border: `1px solid ${account.color}30`,
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: account.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>

                {/* Account Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{account.bankName}</span>
                    {account.isDefault && (
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          color: account.color,
                          background: `${account.color}15`,
                          border: `1px solid ${account.color}30`,
                        }}
                      >
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{account.accountType}</span>
                    <span>•</span>
                    <span className="font-mono">**** {account.last4}</span>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-0.5">
                  ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-white/30">Available</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.1)" }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-white mb-1">Secure Connection</div>
            <div className="text-[11px] text-white/40 leading-relaxed">
              All bank accounts are connected securely via Plaid with read-only access. We never store your banking credentials.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
