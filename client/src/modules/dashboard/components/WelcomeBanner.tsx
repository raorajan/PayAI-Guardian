"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";

export default function WelcomeBanner() {
  const [mounted, setMounted] = useState(false);
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="rounded-[20px] p-8 mb-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(10,102,194,0.2) 0%, rgba(128,64,255,0.1) 50%, rgba(0,200,255,0.08) 100%)",
        border: "1px solid rgba(0,200,255,0.2)",
      }}
    >
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/50 to-transparent" />
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.08)_0%,transparent_70%)]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
            Welcome back, {mounted ? (user?.fullName?.split(" ")[0] ?? "Guardian") : "Guardian"} 👋
          </h1>
          <p className="text-white/50 text-sm">Your AI banking dashboard — every transaction monitored, every threat blocked.</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(0,200,81,0.12)", border: "1px solid rgba(0,200,81,0.25)", color: "#00C851" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C851] shadow-[0_0_6px_#00C851] animate-pulse" />
              AI Shield Active
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)", color: "#00C8FF" }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
              Blockchain Verified
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(128,64,255,0.1)", border: "1px solid rgba(128,64,255,0.2)", color: "#8040FF" }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              KYC / AML Compliant
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <div className="text-white/40 text-xs uppercase tracking-widest font-semibold">Available Balance</div>
          <div className="text-4xl font-black text-white">$12,487<span className="text-[#00C8FF]">.30</span></div>
          <div className="text-white/30 text-xs">Last updated just now</div>
        </div>
      </div>
    </div>
  );
}
