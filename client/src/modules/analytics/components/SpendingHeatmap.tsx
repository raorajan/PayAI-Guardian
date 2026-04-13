"use client";
import React from "react";

// Generate mock data for a 20-week period
const generateData = () => {
  const data = [];
  const levels = [0, 1, 2, 3, 4];
  for (let i = 0; i < 20 * 7; i++) {
    data.push(levels[Math.floor(Math.random() * levels.length)]);
  }
  return data;
};

const MOCK_DATA = generateData();

const getColor = (level: number) => {
  switch (level) {
    case 0: return "bg-white/[0.03]";
    case 1: return "bg-[#00C8FF]/20";
    case 2: return "bg-[#00C8FF]/40";
    case 3: return "bg-[#00C8FF]/70";
    case 4: return "bg-[#00C8FF] shadow-[0_0_12px_rgba(0,200,255,0.4)]";
    default: return "bg-white/[0.03]";
  }
};

export default function SpendingHeatmap() {
  return (
    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl group">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-base font-bold text-white mb-1">Spending Frequency</h3>
          <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Past 140 Day Audit</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] text-white/20 font-bold uppercase">Less</span>
           <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`w-2.5 h-2.5 rounded-sm ${getColor(l)}`} />
              ))}
           </div>
           <span className="text-[10px] text-white/20 font-bold uppercase">More</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-4 no-scrollbar">
        {/* Months labels */}
        <div className="flex flex-col gap-1.5 mt-6 mr-4 shrink-0">
           {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => (
             <span key={i} className="text-[9px] h-3 font-bold text-white/20 uppercase text-right">{d}</span>
           ))}
        </div>

        {/* Heatmap Grid (Weeks columns) */}
        <div className="flex gap-1.5">
          {Array.from({ length: 20 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const dayValue = MOCK_DATA[weekIdx * 7 + dayIdx];
                return (
                  <div 
                    key={dayIdx} 
                    className={`w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer ${getColor(dayValue)}`}
                    title={`Relative spending level: ${dayValue}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[#00C8FF]/5 border border-[#00C8FF]/10">
         <span className="text-lg">💡</span>
         <p className="text-[11px] text-white/60 leading-relaxed">
           You typically spend <span className="text-[#00C8FF] font-black">34% more</span> on Fridays. The AI Guardian has adjusted liquidity buffers for your upcoming weekend.
         </p>
      </div>
    </div>
  );
}
