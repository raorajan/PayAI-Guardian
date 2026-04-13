"use client";
import React, { useState } from "react";

export default function OverrideButton() {
  const [loading, setLoading] = useState(false);

  const handleOverride = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Override Authorized via FaceID.");
    }, 1500);
  };

  return (
    <button 
      onClick={handleOverride}
      disabled={loading}
      className="w-full py-4 rounded-xl bg-white text-[#050810] font-black text-sm hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group disabled:opacity-50"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-[#050810]/30 border-t-[#050810] animate-spin rounded-full" />
      ) : (
        <>
          Authorize & Release
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </>
      )}
    </button>
  );
}
