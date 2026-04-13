"use client";
import React from "react";

const MARKETS = [
  { pair: "GBP/USD", price: "1.2642", trend: "+0.12%", color: "#00C851" },
  { pair: "ETH/USD", price: "2,412.80", trend: "-2.45%", color: "#FF3B5C" },
  { pair: "SPX 500", price: "5,123.10", trend: "+0.85%", color: "#00C851" },
];

export default function MarketDataWidget() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Contextual Markets</span>
          <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-white/30 uppercase font-black">Trip Local</span>
       </div>

       <div className="space-y-3">
          {MARKETS.map((m, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-[#00C8FF]/30 transition-all">
               <div>
                  <div className="text-[12px] font-bold text-white mb-0.5">{m.pair}</div>
                  <div className="text-[10px] font-medium text-white/30 tabular-nums">{m.price}</div>
               </div>
               <div className="text-right">
                  <div className={`text-[11px] font-black tabular-nums`} style={{ color: m.color }}>{m.trend}</div>
                  <div className="w-16 h-1 mt-1 bg-white/5 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-current opacity-40" 
                       style={{ 
                         width: m.trend.includes("+") ? "70%" : "30%",
                         color: m.color
                       }} 
                     />
                  </div>
               </div>
            </div>
          ))}
       </div>

       <div className="p-4 rounded-xl bg-[#00C8FF]/5 border border-[#00C8FF]/10 text-[11px] text-[#00C8FF]/70 leading-relaxed text-center font-bold">
         Data refreshed: 17:36:22 GMT
       </div>
    </div>
  );
}
