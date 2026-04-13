"use client";
import React from "react";

const INSIGHTS = [
  {
    icon: "🍔",
    title: "Subscription detected",
    desc: "We found a recurring $14.99 charge from 'CloudCompute'. Is this a planned subscription?",
    type: "neutral",
    action: "Review Billing"
  },
  {
    icon: "🚨",
    title: "Unusual Venue",
    desc: "A $250 transaction at 'LuxuryWatches NY' was flagged. It's 200 miles from your typical spending zone.",
    type: "warning",
    action: "Verify Identity"
  },
  {
    icon: "📈",
    title: "Savings Tip",
    desc: "Switching to annual billing for Netflix would save you 15% ($24/year).",
    type: "success",
    action: "Switch Now"
  },
  {
    icon: "🔒",
    title: "Secure Node",
    desc: "AI Guardian has verified 14 splits this week. No phishing attempts detected in your recent chats.",
    type: "info",
    action: "View Audit"
  }
];

export default function InsightsList() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-bold text-white tracking-tight">AI Insights Feed</h3>
          <span className="text-[10px] font-black text-[#00C8FF] uppercase tracking-widest bg-[#00C8FF]/10 px-2 py-1 rounded-md">Live</span>
       </div>

       <div className="space-y-4">
          {INSIGHTS.map((item, i) => (
            <div 
              key={i} 
              className={`p-5 rounded-3xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.05] relative group overflow-hidden`}
            >
              <div className="flex gap-4 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                   {item.icon}
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[12px] text-white/40 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <button className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                      item.type === "warning" ? "text-[#FF3B5C] hover:text-[#FF3B5C]/80" : 
                      item.type === "success" ? "text-[#00C851] hover:text-[#00C851]/80" : "text-[#00C8FF] hover:text-[#00C8FF]/80"
                    }`}>
                      {item.action}
                    </button>
                 </div>
              </div>
              
              {/* Highlight Border for warnings */}
              {item.type === "warning" && (
                <div className="absolute inset-0 border border-[#FF3B5C]/30 rounded-3xl pointer-events-none" />
              )}
              
              {/* Background Glow */}
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-white/[0.01] rounded-full blur-3xl group-hover:bg-[#00C8FF]/[0.02] transition-colors" />
            </div>
          ))}
       </div>

       <button className="w-full py-4 rounded-2xl bg-white/5 border border-dashed border-white/20 text-white/40 text-[12px] font-bold hover:bg-white/10 hover:border-white/40 transition-all">
         Refresh Intelligence Feed
       </button>
    </div>
  );
}
