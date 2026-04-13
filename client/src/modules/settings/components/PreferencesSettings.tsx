"use client";
import React, { useState } from "react";

export default function PreferencesSettings() {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("English");
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Local & Display Preferences</h2>
        <p className="text-sm text-white/40">Customize how PayAI Guardian looks and handles regional data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Regional Settings */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-3">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Regional Settings
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase ml-1">Default Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="USD">USD — United States Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="JPY">JPY — Japanese Yen</option>
                  <option value="INR">INR — Indian Rupee</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase ml-1">Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="English">English (US)</option>
                  <option value="Spanish">Español</option>
                  <option value="French">Français</option>
                  <option value="German">Deutsch</option>
                  <option value="Hindi">हिन्दी</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase ml-1">Timezone</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all appearance-none cursor-pointer">
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+01:00) CET</option>
                  <option>(GMT+05:30) India Standard Time</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Interface Settings */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-3">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Display Layout
            </h3>
            
            <div className="space-y-4">
              <div 
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${!compactMode ? "border-[#00C8FF] bg-[#00C8FF]/5" : "border-white/5 bg-white/3 hover:bg-white/5"}`}
                onClick={() => setCompactMode(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-black/40 flex flex-col gap-1 p-2">
                    <div className="w-full h-2 rounded bg-white/20" />
                    <div className="w-2/3 h-2 rounded bg-white/10" />
                    <div className="w-full h-2 rounded bg-white/10" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Default (Cozy)</div>
                    <div className="text-[11px] text-white/40">Standard spacing with full visualizations.</div>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${compactMode ? "border-[#8040FF] bg-[#8040FF]/5" : "border-white/5 bg-white/3 hover:bg-white/5"}`}
                onClick={() => setCompactMode(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-black/40 flex flex-col gap-0.5 p-2">
                    <div className="w-full h-1.5 rounded bg-white/20" />
                    <div className="w-full h-1.5 rounded bg-white/10" />
                    <div className="w-full h-1.5 rounded bg-white/10" />
                    <div className="w-full h-1.5 rounded bg-white/10" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Compact</div>
                    <div className="text-[11px] text-white/40">Condensed layout for advanced analysts.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
               <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Animations</div>
                    <div className="text-[11px] text-white/40">Smooth glass transitions and motion effects.</div>
                  </div>
                  <button className="w-12 h-6 rounded-full bg-[#00C8FF] relative">
                    <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between p-6 rounded-2xl bg-white/3 border border-dashed border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🛠️</span>
          <p className="text-[12px] text-white/40">Need a feature we don't have yet?</p>
        </div>
        <button className="text-[12px] font-bold text-[#00C8FF] hover:underline uppercase tracking-widest">
          Request Feature
        </button>
      </div>

    </div>
  );
}
