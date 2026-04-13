"use client";
import React, { useState } from "react";

export default function SecuritySettings() {
  const [aiSensitivity, setAiSensitivity] = useState(65); // 0-100
  const [useTwoFactor, setUseTwoFactor] = useState(true);

  const getSensitivityLabel = (val: number) => {
    if (val < 33) return { label: "Conservative", color: "#00C851", text: "Low blocking, more alerts." };
    if (val < 67) return { label: "Balanced", color: "#00C8FF", text: "Standard AI heuristics." };
    return { label: "Aggressive", color: "#FF3B5C", text: "Proactive fraud blocking." };
  };

  const currentLevel = getSensitivityLabel(aiSensitivity);

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Security & AI Protection</h2>
        <p className="text-sm text-white/40">Manage your credentials and configure the AI Shield sensitivity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* AI Guardian Control */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#00C8FF]/10 flex items-center justify-center text-[#00C8FF]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white">AI Guardian Sensitivity</h3>
            </div>
            
            <p className="text-[13px] text-white/50 leading-relaxed">
              Adjust how aggressively the AI Shield blocks suspicious transactions.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-end">
                <span className="text-[24px] font-black" style={{ color: currentLevel.color }}>
                  {aiSensitivity}%
                </span>
                <span className="text-[12px] font-bold px-3 py-1 rounded-full border" style={{ borderColor: `${currentLevel.color}40`, color: currentLevel.color, background: `${currentLevel.color}10` }}>
                  {currentLevel.label}
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={aiSensitivity}
                onChange={(e) => setAiSensitivity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00C8FF]"
              />
              
              <div className="flex justify-between text-[11px] text-white/30 font-medium">
                <span>CONSERVATIVE</span>
                <span>AGGRESSIVE</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
              <p className="text-[12px] text-white/60">
                <span className="font-bold text-white">Result:</span> {currentLevel.text} High-value transactions may require manual verification.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8040FF]/10 flex items-center justify-center text-[#8040FF]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0112 3v8h8c0 1.905-.446 3.698-1.243 5.303m-4.524 4.524l-.105.185a10.002 10.002 0 01-19.12-3.136H5c1.657 0 3 1.343 3 3a3 3 0 006 0c0-1.657 1.343-3 3-3h.5" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Two-Factor Auth (2FA)</div>
                <div className="text-[11px] text-white/40">Secure your account with a mobile app.</div>
              </div>
            </div>
            <button 
              onClick={() => setUseTwoFactor(!useTwoFactor)}
              className={`w-12 h-6 rounded-full relative transition-colors ${useTwoFactor ? "bg-[#00C8FF]" : "bg-white/10"}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${useTwoFactor ? "left-7" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Password Management */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-3">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Change Password
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all" />
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all">
              Update Security Credentials
            </button>
          </div>

          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
             <div className="flex items-center gap-3 mb-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-sm font-bold text-red-100">Danger Zone</span>
             </div>
             <p className="text-[12px] text-red-200/50 mb-4 leading-relaxed">
               Once you delete your account, all your AI training data and linked bank accounts will be wiped. This is irreversible.
             </p>
             <button className="text-[12px] font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest">
               Delete Account...
             </button>
          </div>
        </div>

      </div>

      {/* Login History */}
      <div className="p-6 rounded-2xl bg-white/3 border border-white/5">
        <h3 className="text-base font-bold text-white mb-6">Recent Logins</h3>
        <div className="space-y-4">
          {[
            { device: "MacBook Pro 16", os: "macOS · San Jose, US", date: "Currently Active", icon: "💻", active: true },
            { device: "iPhone 15 Pro", os: "iOS · San Jose, US", date: "2 hours ago", icon: "📱", active: false },
            { device: "Brave Browser", os: "Windows · London, UK", date: "Apr 11, 2026", icon: "🌐", active: false },
          ].map((session, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg">
                  {session.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {session.device}
                    {session.active && (
                      <span className="text-[10px] bg-[#00C851]/10 text-[#00C851] px-2 py-0.5 rounded-full border border-[#00C851]/20">THIS DEVICE</span>
                    )}
                  </div>
                  <div className="text-[11px] text-white/30">{session.os}</div>
                </div>
              </div>
              <div className="text-[12px] text-white/40 font-medium">{session.date}</div>
            </div>
          ))}
        </div>
        <button className="mt-6 text-[12px] font-semibold text-[#00C8FF] hover:underline">
          Sign out of all other sessions
        </button>
      </div>

    </div>
  );
}
