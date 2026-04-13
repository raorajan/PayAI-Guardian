"use client";
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function PrivacyControlsSettings() {
  const toast = useToast();
  const [dataSharing, setDataSharing] = useState(false);
  const [anonymizeData, setAnonymizeData] = useState(true);
  const [thirdPartyAccess, setThirdPartyAccess] = useState({
    analytics: false,
    marketing: false,
    research: true,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleExportData = () => {
    setShowExportModal(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success("Data export complete! Check your email.");
          setTimeout(() => setShowExportModal(false), 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDeleteTransactionHistory = () => {
    if (deleteConfirmText === "DELETE") {
      toast.success("Transaction history deletion initiated. This may take 24-48 hours.");
      setShowDeleteModal(false);
      setDeleteConfirmText("");
    } else {
      toast.error("Please type DELETE to confirm");
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Privacy Controls</h2>
        <p className="text-sm text-white/40">Manage your data sharing preferences and privacy settings.</p>
      </div>

      {/* Data Sharing */}
      <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00C8FF]/10 flex items-center justify-center text-[#00C8FF]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Data Sharing</div>
              <div className="text-[11px] text-white/40">Share anonymized data to improve AI models</div>
            </div>
          </div>
          <button
            onClick={() => setDataSharing(!dataSharing)}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              dataSharing ? "bg-[#00C8FF]" : "bg-white/10"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                dataSharing ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
        <div className="p-4 rounded-xl bg-black/20 border border-white/5">
          <p className="text-[12px] text-white/60">
            {dataSharing
              ? "✅ You're helping improve AI fraud detection. Your data is fully anonymized."
              : "⚠️ Data sharing is disabled. Opt in to help us build better protection."}
          </p>
        </div>
      </div>

      {/* Anonymization */}
      <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8040FF]/10 flex items-center justify-center text-[#8040FF]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0112 3v8h8c0 1.905-.446 3.698-1.243 5.303m-4.524 4.524l-.105.185a10.002 10.002 0 01-19.12-3.136H5c1.657 0 3 1.343 3 3a3 3 0 006 0c0-1.657 1.343-3 3-3h.5" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Data Anonymization</div>
              <div className="text-[11px] text-white/40">Remove personal identifiers from stored data</div>
            </div>
          </div>
          <button
            onClick={() => setAnonymizeData(!anonymizeData)}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              anonymizeData ? "bg-[#8040FF]" : "bg-white/10"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                anonymizeData ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>
        <div className="p-4 rounded-xl bg-black/20 border border-white/5">
          <p className="text-[12px] text-white/60">
            {anonymizeData
              ? "🔒 Your data is anonymized before storage. Personal identifiers are removed."
              : "⚠️ Anonymization is disabled. Your data includes personal identifiers."}
          </p>
        </div>
      </div>

      {/* Third-Party Access Control */}
      <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-3">
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Third-Party Access Control
        </h3>
        <p className="text-[13px] text-white/50">Control which third-party services can access your data</p>

        <div className="space-y-4 pt-4">
          {[
            {
              key: "analytics" as const,
              label: "Analytics Partners",
              desc: "Google Analytics, Mixpanel for usage insights",
              enabled: thirdPartyAccess.analytics,
            },
            {
              key: "marketing" as const,
              label: "Marketing Platforms",
              desc: "Email marketing, ad personalization services",
              enabled: thirdPartyAccess.marketing,
            },
            {
              key: "research" as const,
              label: "Research Institutions",
              desc: "Academic research on fraud patterns (anonymized)",
              enabled: thirdPartyAccess.research,
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5"
            >
              <div className="flex-1">
                <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                <div className="text-[12px] text-white/40">{item.desc}</div>
              </div>
              <button
                onClick={() =>
                  setThirdPartyAccess((prev) => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  item.enabled ? "bg-[#00C8FF]" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    item.enabled ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Data */}
        <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00C851]/10 flex items-center justify-center text-[#00C851]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">Export Personal Data</h3>
          </div>
          <p className="text-[12px] text-white/50 leading-relaxed">
            Download a complete copy of your personal data, including transactions, account info, and AI interactions.
          </p>
          <button
            onClick={handleExportData}
            className="w-full py-3 rounded-xl bg-[#00C851]/10 border border-[#00C851]/20 text-[#00C851] text-sm font-bold hover:bg-[#00C851]/20 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export My Data
          </button>
        </div>

        {/* Delete Transaction History */}
        <div className="p-6 rounded-2xl bg-white/3 border border-red-500/20 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-red-100">Delete Transaction History</h3>
          </div>
          <p className="text-[12px] text-red-200/50 leading-relaxed">
            Permanently delete your transaction history. This action cannot be undone and may affect analytics.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold hover:bg-red-500/20 transition-all"
          >
            Delete History
          </button>
        </div>
      </div>

      {/* Export Progress Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0A0F1E] border border-white/10 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00C851]/10 flex items-center justify-center text-3xl">
                📦
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Preparing Your Data</h3>
              <p className="text-sm text-white/50 mb-6">
                We're compiling all your data into a secure download package.
              </p>
              <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00C851] to-[#00C8FF] transition-all duration-300 rounded-full"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <p className="text-xs text-white/40">{exportProgress}% complete</p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0A0F1E] border border-red-500/20 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Delete Transaction History?</h3>
              <p className="text-sm text-white/50 mb-4">
                This will permanently remove all your transaction records. This cannot be undone.
              </p>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase">
                  Type DELETE to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="w-full bg-white/5 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500/50 focus:outline-none transition-all text-center font-mono"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTransactionHistory}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Info */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#8040FF]/10 to-[#0A66C2]/10 border border-white/5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#8040FF]/10 flex items-center justify-center text-[#8040FF] flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-2">Your Privacy Rights</h4>
            <ul className="text-xs text-white/50 space-y-1">
              <li>• You have the right to access, modify, or delete your personal data</li>
              <li>• We comply with GDPR, CCPA, and other privacy regulations</li>
              <li>• Your data is encrypted at rest and in transit</li>
              <li>• Third-party access is logged and audited regularly</li>
              <li>• You can withdraw consent at any time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
