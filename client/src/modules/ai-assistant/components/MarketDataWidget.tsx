"use client";
import React, { useState, useEffect } from "react";

interface MarketData {
  pair: string;
  price: string;
  trend: string;
  color: string;
  category: "forex" | "crypto" | "stocks";
  volume?: string;
  marketCap?: string;
}

const INITIAL_MARKETS: MarketData[] = [
  { pair: "GBP/USD", price: "1.2642", trend: "+0.12%", color: "#00C851", category: "forex", volume: "$2.1B" },
  { pair: "ETH/USD", price: "2,412.80", trend: "-2.45%", color: "#FF3B5C", category: "crypto", marketCap: "$290B" },
  { pair: "SPX 500", price: "5,123.10", trend: "+0.85%", color: "#00C851", category: "stocks", volume: "$3.8B" },
  { pair: "BTC/USD", price: "67,842.50", trend: "+3.21%", color: "#00C851", category: "crypto", marketCap: "$1.33T" },
  { pair: "EUR/USD", price: "1.0847", trend: "-0.08%", color: "#FF3B5C", category: "forex", volume: "$1.9B" },
  { pair: "AAPL", price: "178.32", trend: "+1.42%", color: "#00C851", category: "stocks", volume: "$54.2M" },
];

export default function MarketDataWidget() {
  const [markets, setMarkets] = useState<MarketData[]>(INITIAL_MARKETS);
  const [lastUpdate, setLastUpdate] = useState<string>(
    new Date().toLocaleTimeString("en-US", { hour12: false })
  );
  const [selectedCategory, setSelectedCategory] = useState<"all" | "forex" | "crypto" | "stocks">("all");

  // Simulate live data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prev) =>
        prev.map((market) => {
          const changePercent = (Math.random() - 0.5) * 0.3; // Small random change
          const currentPrice = parseFloat(market.price.replace(/,/g, ""));
          const newPrice = currentPrice * (1 + changePercent / 100);
          const formattedPrice = market.pair.includes("BTC")
            ? newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : market.pair.includes("ETH") || market.pair.includes("SPX")
            ? newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : newPrice.toFixed(market.pair.includes("AAPL") ? 2 : 4);

          const newTrendValue = parseFloat(market.trend.replace(/[+-]/, "")) + changePercent;
          const newTrend = `${newTrendValue >= 0 ? "+" : ""}${newTrendValue.toFixed(2)}%`;
          const newColor = newTrendValue >= 0 ? "#00C851" : "#FF3B5C";

          return {
            ...market,
            price: formattedPrice,
            trend: newTrend,
            color: newColor,
          };
        })
      );
      setLastUpdate(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredMarkets =
    selectedCategory === "all"
      ? markets
      : markets.filter((m) => m.category === selectedCategory);

  const categories: Array<"all" | "forex" | "crypto" | "stocks"> = ["all", "forex", "crypto", "stocks"];
  return (
    <div className="space-y-6">
      {/* Header with Category Filter */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Live Markets</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#00C851] anim-pulse-glow" />
          <span className="text-[9px] text-[#00C851] font-bold">LIVE</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all"
            style={{
              background: selectedCategory === cat ? "rgba(0,200,255,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${selectedCategory === cat ? "rgba(0,200,255,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: selectedCategory === cat ? "#00C8FF" : "rgba(255,255,255,0.4)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Market Cards */}
      <div className="space-y-3">
        {filteredMarkets.map((m, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-[#00C8FF]/30 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[12px] font-bold text-white">{m.pair}</span>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded uppercase font-bold"
                  style={{
                    background: `${m.color}15`,
                    color: m.color,
                    border: `1px solid ${m.color}30`,
                  }}
                >
                  {m.category}
                </span>
              </div>
              <div className="text-[10px] font-medium text-white/30 tabular-nums">{m.price}</div>
              {m.marketCap && (
                <div className="text-[9px] text-white/20 mt-0.5">MCap: {m.marketCap}</div>
              )}
            </div>
            <div className="text-right">
              <div className={`text-[11px] font-black tabular-nums`} style={{ color: m.color }}>
                {m.trend}
              </div>
              <div className="w-16 h-1 mt-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-current opacity-40"
                  style={{
                    width: `${Math.abs(parseFloat(m.trend.replace(/[+-]/, ""))) * 20}%`,
                    color: m.color,
                  }}
                />
              </div>
              {m.volume && (
                <div className="text-[9px] text-white/20 mt-1">Vol: {m.volume}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Update Timestamp */}
      <div className="p-4 rounded-xl bg-[#00C8FF]/5 border border-[#00C8FF]/10 text-[11px] text-[#00C8FF]/70 leading-relaxed text-center font-bold">
        <div className="flex items-center justify-center gap-2 mb-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Last Update: {lastUpdate}</span>
        </div>
        <div className="text-[10px] text-[#00C8FF]/50">Auto-refreshes every 5 seconds</div>
      </div>
    </div>
  );
}
