"use client";
import React, { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  title: string;
  description: string;
  stats: string[];
}

function FeatureCard({ icon, accentColor, accentBg, accentBorder, title, description, stats }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-[20px] p-8 backdrop-blur-xl transition-all duration-300 cursor-default overflow-hidden ${
        hovered ? "-translate-y-1.5" : "translate-y-0"
      }`}
      style={{
        background: hovered ? "rgba(8,12,30,0.85)" : "rgba(8,12,30,0.6)",
        border: `1px solid ${hovered ? accentColor + "40" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 20px 60px ${accentColor}18, 0 0 0 1px ${accentColor}20`
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-[14px] flex items-center justify-center mb-5 transition-transform duration-300 ${
          hovered ? "scale-105" : "scale-100"
        } ${accentBg} ${accentBorder}`}
        style={{ border: `1px solid ${accentColor}30`, boxShadow: `0 0 20px ${accentColor}20` }}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 leading-snug">{title}</h3>
      <p className="text-[14px] text-white/60 leading-[1.7] mb-6">{description}</p>

      {/* Stat badges */}
      <div className="flex flex-wrap gap-2">
        {stats.map((stat) => (
          <span
            key={stat}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-[6px] tracking-wide"
            style={{
              color: accentColor,
              background: `${accentColor}12`,
              border: `1px solid ${accentColor}25`,
            }}
          >
            {stat}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      accentColor: "#00C8FF",
      accentBg: "bg-[#00C8FF]/10",
      accentBorder: "border-[#00C8FF]/20",
      title: "Predictive Fraud Protection",
      description:
        "Our machine learning models analyze thousands of data points — transaction velocity, location patterns, spending behavior — to detect and block suspicious payments in under 100 milliseconds. The system learns from every transaction, achieving 97% fraud detection accuracy.",
      stats: ["Blocks fraud in 100ms", "97% accuracy", "Self-learning AI"],
      icon: (
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6z" fill="#00C8FF" opacity=".2" stroke="#00C8FF" strokeWidth="1.5"/>
          <path d="M9 12l2 2 4-4" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      accentColor: "#8040FF",
      accentBg: "bg-[#8040FF]/10",
      accentBorder: "border-[#8040FF]/20",
      title: "Your Personal AI Banker",
      description:
        "Have real conversations with an intelligent AI that understands your financial goals. Ask complex questions like 'Should I invest my bonus?' and receive personalized advice backed by live market data and clear reasoning.",
      stats: ["2s response time", "Live market data", "Reasoning transparency"],
      icon: (
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="#8040FF" opacity=".2" stroke="#8040FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      accentColor: "#00C851",
      accentBg: "bg-[#00C851]/10",
      accentBorder: "border-[#00C851]/20",
      title: "Instant Peer-to-Peer Transfers",
      description:
        "Link your real bank accounts through Plaid, send money to friends instantly, split bills, and receive payments — all with AI approval and fraud screening built into every transaction.",
      stats: ["500ms transfer time", "Bank-grade security", "Split payments supported"],
      icon: (
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path d="M13 2L4.09 12.26a1 1 0 00.91 1.64h6l-1 9 8.91-10.26A1 1 0 0018 11h-6z" fill="#00C851" opacity=".2" stroke="#00C851" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      accentColor: "#FF9A3C",
      accentBg: "bg-[#FF9A3C]/10",
      accentBorder: "border-[#FF9A3C]/20",
      title: "Tamper-Proof Audit Trail",
      description:
        "Every payment creates an immutable record on our blockchain explorer. Export compliance-ready reports, verify any transaction hash, and enjoy complete transparency your traditional bank can't offer.",
      stats: ["Immutable records", "Instant verification", "Compliance ready"],
      icon: (
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="#FF9A3C" opacity=".2" stroke="#FF9A3C" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#00C8FF] bg-[#00C8FF]/8 border border-[#00C8FF]/20 px-4 py-1.5 rounded-full mb-5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00C8FF"/>
            </svg>
            Core Features
          </div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
            Everything Your Bank<br />Wishes It Could Do
          </h2>
          <p className="text-base text-white/50 leading-[1.7] max-w-[600px] mx-auto">
            Built from the ground up with AI at its core — not bolted on as an afterthought.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
