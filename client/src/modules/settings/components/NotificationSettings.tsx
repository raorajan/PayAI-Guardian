"use client";
import React, { useState } from "react";

interface NotificationChannel {
  id: string;
  label: string;
  desc: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export default function NotificationSettings() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    { id: "security", label: "Security Alerts", desc: "Blocked attempts, new logins, policy changes.", email: true, push: true, sms: true },
    { id: "transfers", label: "Transfers & Payments", desc: "Sent money, received money, and split bills.", email: true, push: true, sms: false },
    { id: "ai", label: "AI Insights", desc: "Weekly summaries and anomaly detection reports.", email: true, push: false, sms: false },
    { id: "marketing", label: "Product Updates", desc: "New features and platform announcements.", email: false, push: false, sms: false },
  ]);

  const [quietHours, setQuietHours] = useState({ start: "22:00", end: "08:00" });
  const [digestFrequency, setDigestFrequency] = useState<"daily" | "weekly" | "monthly">("weekly");

  const toggle = (index: number, type: "email" | "push" | "sms") => {
    const newChannels = [...channels];
    newChannels[index][type] = !newChannels[index][type];
    setChannels(newChannels);
  };

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Notifications Control Center</h2>
        <p className="text-sm text-white/40">Choose how and when you want to stay in the loop.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white/3 border border-white/5 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 pb-6 border-b border-white/5 text-[11px] font-bold text-white/30 tracking-widest">
          <div className="col-span-6">NOTIFICATION CATEGORY</div>
          <div className="col-span-2 text-center">EMAIL</div>
          <div className="col-span-2 text-center">PUSH</div>
          <div className="col-span-2 text-center">SMS</div>
        </div>

        {/* Categories */}
        <div className="divide-y divide-white/5">
          {channels.map((ch, idx) => (
            <div key={ch.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-8 items-center">
              <div className="col-span-1 sm:col-span-6">
                <div className="text-sm font-bold text-white mb-1">{ch.label}</div>
                <div className="text-[12px] text-white/40 max-w-sm">{ch.desc}</div>
              </div>
              
              <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                <span className="sm:hidden text-[11px] text-white/30">Email</span>
                <button 
                  onClick={() => toggle(idx, "email")}
                  className={`w-10 h-5 rounded-full relative transition-colors ${ch.email ? "bg-[#00C8FF]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${ch.email ? "left-5.5" : "left-0.5"}`} />
                </button>
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                <span className="sm:hidden text-[11px] text-white/30">Push</span>
                <button 
                  onClick={() => toggle(idx, "push")}
                  className={`w-10 h-5 rounded-full relative transition-colors ${ch.push ? "bg-[#8040FF]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${ch.push ? "left-5.5" : "left-0.5"}`} />
                </button>
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-center items-center">
                <span className="sm:hidden text-[11px] text-white/30">SMS</span>
                <button 
                  onClick={() => toggle(idx, "sms")}
                  className={`w-10 h-5 rounded-full relative transition-colors ${ch.sms ? "bg-[#0A66C2]" : "bg-white/10"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${ch.sms ? "left-5.5" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slack Integration Card */}
      <div className="p-6 rounded-2xl bg-[#521B54]/5 border border-[#521B54]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-lg">
              <svg viewBox="0 0 122.8 122.8" className="w-full h-full">
                <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.4 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/><path d="M45.1 25.8c-7.1 0-12.9-5.8-12.9-12.9S38 0 45.1 0s12.9 5.8 12.9 12.9v12.9H45.1zm0 6.4c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58 0 52.2 0 45.1s5.8-12.9 12.9-12.9h32.2z" fill="#36c5f0"/><path d="M97 45.1c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.1zm-6.4 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.2z" fill="#2eb67d"/><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.4c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/>
              </svg>
           </div>
           <div>
              <h4 className="text-base font-bold text-white">Slack Connect</h4>
              <p className="text-[12px] text-white/50 max-w-sm">Receive official AI Guardian security alerts directly in your team's Slack channel.</p>
           </div>
        </div>
        <button className="px-6 py-2.5 rounded-xl border border-[#521B54]/30 text-white font-bold text-[13px] hover:bg-[#521B54]/20 transition-all">
          Connect Channel
        </button>
      </div>

      {/* Quiet Hours & Digest Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiet Hours */}
        <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-3">
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Quiet Hours
          </h3>
          <p className="text-[13px] text-white/50">No notifications will be sent during this time except critical security alerts.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase ml-1">Start Time</label>
              <input
                type="time"
                value={quietHours.start}
                onChange={(e) => setQuietHours({ ...quietHours, start: e.target.value })}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase ml-1">End Time</label>
              <input
                type="time"
                value={quietHours.end}
                onChange={(e) => setQuietHours({ ...quietHours, end: e.target.value })}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 outline-none transition-all text-white"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/20 border border-white/5">
            <p className="text-[12px] text-white/60">
              <span className="font-bold text-white">Current:</span> Notifications muted from {quietHours.start} to {quietHours.end}
            </p>
          </div>
        </div>

        {/* Digest Frequency */}
        <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-3">
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Digest Frequency
          </h3>
          <p className="text-[13px] text-white/50">How often you want to receive summary emails of your account activity.</p>
          
          <div className="space-y-3">
            {[
              { value: "daily" as const, label: "Daily", desc: "Receive a summary every day at 8 AM" },
              { value: "weekly" as const, label: "Weekly", desc: "Receive a summary every Monday" },
              { value: "monthly" as const, label: "Monthly", desc: "Receive a summary on the 1st of each month" },
            ].map((option) => (
              <div
                key={option.value}
                onClick={() => setDigestFrequency(option.value)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  digestFrequency === option.value
                    ? "border-[#00C8FF] bg-[#00C8FF]/5"
                    : "border-white/5 bg-black/20 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      digestFrequency === option.value ? "border-[#00C8FF]" : "border-white/20"
                    }`}
                  >
                    {digestFrequency === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00C8FF]" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{option.label}</div>
                    <div className="text-[11px] text-white/40">{option.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
