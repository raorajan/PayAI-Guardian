"use client";
import React, { useState } from "react";

const WEEKLY_DATA = [
  { day: "Mon", amount: 145 },
  { day: "Tue", amount: 89 },
  { day: "Wed", amount: 234 },
  { day: "Thu", amount: 167 },
  { day: "Fri", amount: 312 },
  { day: "Sat", amount: 428 },
  { day: "Sun", amount: 195 },
];

const CATEGORIES = [
  { name: "Food & Dining", amount: 289, percentage: 38, color: "#FF3B5C" },
  { name: "Shopping", amount: 160, percentage: 21, color: "#00C8FF" },
  { name: "Entertainment", amount: 89, percentage: 12, color: "#8040FF" },
  { name: "Transport", amount: 67, percentage: 9, color: "#00C851" },
  { name: "Health", amount: 45, percentage: 6, color: "#FFB800" },
  { name: "Other", amount: 108, percentage: 14, color: "#FF6B35" },
];

export default function SpendingChart() {
  const [view, setView] = useState<"weekly" | "categories">("weekly");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxAmount = Math.max(...WEEKLY_DATA.map((d) => d.amount));

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(0,200,255,0.12)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
            <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white">Spending Analytics</h2>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 p-1 rounded-lg bg-white/5">
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              view === "weekly"
                ? "bg-[#00C8FF] text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView("categories")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              view === "categories"
                ? "bg-[#00C8FF] text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Categories
          </button>
        </div>
      </div>

      {/* Weekly View */}
      {view === "weekly" && (
        <div>
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {WEEKLY_DATA.map((data, index) => {
              const height = (data.amount / maxAmount) * 100;
              const isHovered = hoveredBar === index;
              return (
                <div
                  key={data.day}
                  className="flex-1 flex flex-col items-center gap-2 relative"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div
                      className="absolute -top-10 px-2 py-1 rounded-lg text-[10px] font-bold text-white whitespace-nowrap z-10"
                      style={{ background: "rgba(0,200,255,0.9)" }}
                    >
                      ${data.amount}
                    </div>
                  )}
                  {/* Bar */}
                  <div
                    className="w-full rounded-t-lg transition-all duration-200 cursor-pointer"
                    style={{
                      height: `${height}%`,
                      background: isHovered
                        ? "linear-gradient(180deg, #00C8FF, #0A66C2)"
                        : "linear-gradient(180deg, rgba(0,200,255,0.6), rgba(0,200,255,0.3))",
                      boxShadow: isHovered ? "0 0 20px rgba(0,200,255,0.4)" : "none",
                    }}
                  />
                  {/* Day Label */}
                  <div className={`text-[10px] font-medium ${isHovered ? "text-[#00C8FF]" : "text-white/40"}`}>
                    {data.day}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="p-4 rounded-xl" style={{ background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.1)" }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-white/40 mb-1">This Week</div>
                <div className="text-2xl font-black text-white">$1,570</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-white/40 mb-1">vs Last Week</div>
                <div className="text-sm font-bold text-[#FF3B5C]">+12.5%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories View */}
      {view === "categories" && (
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: category.color }}
                  />
                  <span className="text-xs font-medium text-white/70">{category.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white">${category.amount}</span>
                  <span className="text-[10px] text-white/40 ml-2">{category.percentage}%</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{
                    width: `${category.percentage}%`,
                    background: category.color,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="pt-4 mt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Total Spending</span>
              <span className="text-lg font-black text-[#00C8FF]">$758</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
