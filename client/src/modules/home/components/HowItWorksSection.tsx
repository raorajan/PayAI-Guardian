"use client";
import React from "react";

const steps = [
  {
    step: "01",
    title: "Connect Your Bank",
    description:
      "Link your real bank account securely through Plaid in seconds. Our read-only access means we can verify funds but never touch your money without permission.",
    icon: "🏦",
    accentColor: "#00C8FF",
    accentText: "text-[#00C8FF]",
    accentBg: "bg-[#00C8FF]/10",
    accentBorder: "border-[#00C8FF]/20",
    dotBg: "bg-[#00C8FF]",
  },
  {
    step: "02",
    title: "Chat With AI",
    description:
      "Talk to your personal AI banking assistant. Ask about spending patterns, get investment advice, or let AI help you create a budget that actually works for your goals.",
    icon: "🤖",
    accentColor: "#8040FF",
    accentText: "text-[#8040FF]",
    accentBg: "bg-[#8040FF]/10",
    accentBorder: "border-[#8040FF]/20",
    dotBg: "bg-[#8040FF]",
  },
  {
    step: "03",
    title: "Send Money Confidently",
    description:
      "Every payment goes through our AI fraud shield. Normal transactions approve instantly. Suspicious patterns get blocked with clear explanations. You stay in control.",
    icon: "⚡",
    accentColor: "#00C851",
    accentText: "text-[#00C851]",
    accentBg: "bg-[#00C851]/10",
    accentBorder: "border-[#00C851]/20",
    dotBg: "bg-[#00C851]",
  },
  {
    step: "04",
    title: "Track Everything",
    description:
      "Watch transactions appear on the blockchain explorer in real-time. See fraud risk scores, spending heatmaps, and get AI-generated insights about your financial health.",
    icon: "📊",
    accentColor: "#FF9A3C",
    accentText: "text-[#FF9A3C]",
    accentBg: "bg-[#FF9A3C]/10",
    accentBorder: "border-[#FF9A3C]/20",
    dotBg: "bg-[#FF9A3C]",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: "rgba(8,12,30,0.5)" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,200,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.025) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#00C8FF] bg-[#00C8FF]/8 border border-[#00C8FF]/20 px-4 py-1.5 rounded-full mb-5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="#00C8FF" strokeWidth="2"/>
              <path d="M12 8v4l3 3" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            How It Works
          </div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
            From Setup to Protection<br />in 4 Simple Steps
          </h2>
          <p className="text-base text-white/50 leading-[1.7] max-w-[600px] mx-auto">
            Get started in minutes. No technical knowledge required.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="relative rounded-[20px] p-8 backdrop-blur-xl"
              style={{
                background: "rgba(8,12,30,0.65)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Big step number watermark */}
              <div className="absolute top-5 right-5 text-[48px] font-black text-white/[0.04] leading-none select-none">
                {item.step}
              </div>

              {/* Icon */}
              <div
                className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[24px] mb-5 ${item.accentBg} ${item.accentBorder}`}
                style={{ border: `1px solid ${item.accentColor}25` }}
              >
                {item.icon}
              </div>

              <div className={`text-[11px] font-bold tracking-[0.1em] uppercase mb-2 ${item.accentText}`}>
                Step {item.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-[14px] text-white/55 leading-[1.7]">{item.description}</p>

              {/* Connector dot (not last) */}
              {idx < 3 && (
                <div
                  className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: `${item.accentColor}25`,
                    border: `1px solid ${item.accentColor}50`,
                  }}
                >
                  <div className={`w-2 h-2 rounded-full ${item.dotBg}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
