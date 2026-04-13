"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";

interface BankAccount {
  id: string;
  bankName: string;
  accountType: "checking" | "savings" | "business";
  accountNumber: string;
  balance: number;
  isDefault: boolean;
  nickname: string;
  lastRefreshed: string;
  status: "active" | "pending" | "error";
}

export default function LinkedBanksSettings() {
  const toast = useToast();
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "Chase Bank",
      accountType: "checking",
      accountNumber: "****4521",
      balance: 12450.80,
      isDefault: true,
      nickname: "Main Checking",
      lastRefreshed: "2 min ago",
      status: "active",
    },
    {
      id: "2",
      bankName: "Bank of America",
      accountType: "savings",
      accountNumber: "****7893",
      balance: 35200.00,
      isDefault: false,
      nickname: "Emergency Fund",
      lastRefreshed: "1 hour ago",
      status: "active",
    },
    {
      id: "3",
      bankName: "Wells Fargo",
      accountType: "business",
      accountNumber: "****2156",
      balance: 8750.50,
      isDefault: false,
      nickname: "Business Account",
      lastRefreshed: "3 hours ago",
      status: "active",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNickname, setEditNickname] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState<string | null>(null);

  const handleSetDefault = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        isDefault: acc.id === id,
      }))
    );
    toast.success("Default account updated!");
  };

  const handleRefreshBalance = (id: string) => {
    toast.info("Refreshing balance...");
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === id
            ? { ...acc, lastRefreshed: "Just now", balance: acc.balance + (Math.random() - 0.5) * 100 }
            : acc
        )
      );
      toast.success("Balance refreshed successfully!");
    }, 1500);
  };

  const handleEditNickname = (id: string) => {
    const account = accounts.find((acc) => acc.id === id);
    if (account) {
      setEditingId(id);
      setEditNickname(account.nickname);
    }
  };

  const handleSaveNickname = () => {
    if (editingId && editNickname.trim()) {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === editingId ? { ...acc, nickname: editNickname.trim() } : acc
        )
      );
      toast.success("Nickname updated!");
      setEditingId(null);
      setEditNickname("");
    }
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    setShowRemoveModal(null);
    toast.success("Account removed successfully!");
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return "💳";
      case "savings":
        return "🏦";
      case "business":
        return "💼";
      default:
        return "🏛️";
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Linked Bank Accounts</h2>
          <p className="text-sm text-white/40">Manage your connected bank accounts and preferences.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-sm font-bold shadow-[0_4px_16px_rgba(0,150,255,0.4)] hover:shadow-[0_4px_24px_rgba(0,150,255,0.6)] transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Link New Account
        </button>
      </div>

      {/* Accounts List */}
      <div className="grid gap-6">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Account Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A66C2]/20 to-[#8040FF]/20 flex items-center justify-center text-2xl border border-white/10">
                  {getAccountIcon(account.accountType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {editingId === account.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editNickname}
                          onChange={(e) => setEditNickname(e.target.value)}
                          className="bg-white/5 border border-[#00C8FF]/50 rounded-lg px-3 py-1 text-sm text-white focus:outline-none"
                          placeholder="Enter nickname"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveNickname}
                          className="text-xs font-bold text-[#00C8FF] hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs text-white/40 hover:text-white/60"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-base font-bold text-white">{account.nickname}</h3>
                        {account.isDefault && (
                          <span className="text-[10px] bg-[#00C8FF]/10 text-[#00C8FF] px-2 py-0.5 rounded-full border border-[#00C8FF]/20 font-bold">
                            DEFAULT
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span>{account.bankName}</span>
                    <span>•</span>
                    <span className="font-mono">{account.accountNumber}</span>
                    <span>•</span>
                    <span className="capitalize">{account.accountType}</span>
                  </div>
                  <div className="mt-2 text-xs text-white/30">
                    Last refreshed: {account.lastRefreshed}
                  </div>
                </div>
              </div>

              {/* Balance & Actions */}
              <div className="flex items-center gap-6 lg:flex-col lg:items-end">
                <div className="text-right">
                  <div className="text-xs text-white/40 mb-1">Available Balance</div>
                  <div className="text-2xl font-black text-white">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!account.isDefault && (
                    <button
                      onClick={() => handleSetDefault(account.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEditNickname(account.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRefreshBalance(account.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#00C8FF]/10 border border-[#00C8FF]/20 text-xs font-bold text-[#00C8FF] hover:bg-[#00C8FF]/20 transition-all"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => setShowRemoveModal(account.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0A0F1E] border border-white/10 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Remove Account?</h3>
              <p className="text-sm text-white/50">
                This will unlink the account from PayAI Guardian. You can always add it back later.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveModal(null)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveAccount(showRemoveModal)}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
              >
                Remove Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0A0F1E] border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Link New Bank Account</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
                <div className="text-4xl mb-3">🔒</div>
                <p className="text-sm text-white/60 mb-2">
                  Securely connect your bank account using Plaid integration
                </p>
                <p className="text-xs text-white/30">
                  Your credentials are encrypted and never stored on our servers
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase ml-1">
                  Select Bank
                </label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all appearance-none cursor-pointer text-white/60">
                  <option value="">Choose your bank...</option>
                  <option value="chase">Chase Bank</option>
                  <option value="boa">Bank of America</option>
                  <option value="wells">Wells Fargo</option>
                  <option value="citi">Citibank</option>
                  <option value="other">Other (Manual Entry)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.info("Bank linking coming soon!");
                  setShowAddModal(false);
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white font-bold text-sm hover:shadow-[0_4px_24px_rgba(0,150,255,0.6)] transition-all"
              >
                Continue to Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A66C2]/10 to-[#8040FF]/10 border border-white/5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#00C8FF]/10 flex items-center justify-center text-[#00C8FF] flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-2">About Linked Accounts</h4>
            <ul className="text-xs text-white/50 space-y-1">
              <li>• Bank accounts are connected securely via encrypted channels</li>
              <li>• You can set one default account for quick transactions</li>
              <li>• Balances are refreshed automatically every 6 hours</li>
              <li>• You can manually refresh balances at any time</li>
              <li>• Removing an account doesn't affect your transaction history</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
