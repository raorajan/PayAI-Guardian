"use client";
import React from "react";

const DATA = [
  { day: "Mon", threats: 12, volume: 80 },
  { day: "Tue", threats: 45, volume: 140 },
  { day: "Wed", threats: 32, volume: 110 },
  { day: "Thu", threats: 58, volume: 180 },
  { day: "Fri", threats: 28, volume: 130 },
  { day: "Sat", threats: 75, volume: 220 },
  { day: "Sun", threats: 40, volume: 160 },
];

export default function FraudTrendLine() {
  const height = 150;
  const width = 800;
  const padding = 20;

  const getPoints = (key: "threats" | "volume", maxValue: number) => {
    return DATA.map((d, i) => {
      const x = (i / (DATA.length - 1)) * (width - 2 * padding) + padding;
      const y = height - (d[key] / maxValue) * (height - 2 * padding) - padding;
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl group overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h3 className="text-xl font-black text-white mb-1">Threat Deflection Velocity</h3>
          <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Real-time Blocking Efficiency</p>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#00C8FF]" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Total Volume</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full bg-[#FF3B5C]" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Deflections</span>
           </div>
        </div>
      </div>

      <div className="relative w-full aspect-[4/1] min-h-[200px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + (i * (height - 2 * padding)) / 3}
              x2={width - padding}
              y2={padding + (i * (height - 2 * padding)) / 3}
              stroke="white"
              strokeOpacity="0.03"
              strokeDasharray="4 4"
            />
          ))}

          {/* Volume Line (Light Cyan) */}
          <polyline
            fill="none"
            stroke="#00C8FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.2"
            points={getPoints("volume", 250)}
            className="transition-all duration-1000"
          />

          {/* Threat Line (Red/Pink Pulse) */}
          <polyline
            fill="none"
            stroke="#FF3B5C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={getPoints("threats", 250)}
            className="filter drop-shadow-[0_0_8px_rgba(255,59,92,0.4)] transition-all duration-1000"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: "draw 2s forwards ease-out" }}
          />
          
          {/* Data Points on red line */}
          {DATA.map((d, i) => {
            const x = (i / (DATA.length - 1)) * (width - 2 * padding) + padding;
            const y = height - (d.threats / 250) * (height - 2 * padding) - padding;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#FF3B5C"
                className="hover:r-6 transition-all cursor-pointer group-hover:opacity-100 opacity-0 duration-500"
              />
            );
          })}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between px-[2%] mt-6">
           {DATA.map((d, i) => (
             <span key={i} className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{d.day}</span>
           ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
