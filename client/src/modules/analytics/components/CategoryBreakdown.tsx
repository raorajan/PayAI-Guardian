"use client";
import React from "react";

const DATA = [
  { label: "Entertainment", value: 35, color: "#8040FF" },
  { label: "Technology", value: 25, color: "#00C8FF" },
  { label: "Gaming", value: 20, color: "#0A66C2" },
  { label: "Utility", value: 15, color: "#00C851" },
  { label: "Other", value: 5, color: "rgba(255,255,255,0.1)" },
];

export default function CategoryBreakdown() {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl group">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-base font-bold text-white mb-1">Categorical Split</h3>
          <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Spending Distribution</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-10">
        {/* SVG Donut */}
        <div className="relative shrink-0">
          <svg className="w-40 h-40 rotate-[-90deg]" viewBox="0 0 200 200">
            {DATA.map((item, i) => {
              const dashoffset = circumference - (item.value / 100) * circumference;
              const currentOffset = accumulatedOffset;
              accumulatedOffset += (item.value / 100) * circumference;

              return (
                <circle
                  key={i}
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke={item.color}
                  strokeWidth="20"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  className="transition-all duration-1000 ease-out hover:stroke-white cursor-pointer"
                  style={{ 
                    transform: `rotate(${(currentOffset / circumference) * 360}deg)`,
                    transformOrigin: "center"
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <span className="text-sm font-black text-white">$4.2K</span>
             <span className="text-[9px] text-white/30 uppercase font-bold">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
           {DATA.map((item, i) => (
             <div key={i} className="flex items-center justify-between group/item cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-xs font-semibold text-white/60 group-hover/item:text-white transition-colors">
                     {item.label}
                   </span>
                </div>
                <span className="text-xs font-black text-white/40 tabular-nums">
                  {item.value}%
                </span>
             </div>
           ))}
        </div>
      </div>

      <button className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-white/40 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
        Full Breakdown
      </button>
    </div>
  );
}
