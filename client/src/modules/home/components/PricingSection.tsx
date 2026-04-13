"use client";
import React, { useState } from "react";
import Link from "next/link";

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

function PricingCard({ tier, price, period, description, features, cta, ctaHref, highlighted, badge }: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-[20px] px-8 py-9 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
        highlighted
          ? "scale-[1.02]"
          : hovered
          ? "scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          : "scale-100"
      }`}
      style={{
        background: highlighted ? "rgba(10,102,194,0.12)" : "rgba(8,12,30,0.6)",
        border: highlighted
          ? "1px solid rgba(0,200,255,0.35)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: highlighted ? "0 0 60px rgba(0,150,255,0.15)" : undefined,
      }}
    >
      {/* Top glow for highlighted */}
      {highlighted && (
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/80 to-transparent" />
      )}

      {/* Badge */}
      {badge && (
        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[11px] font-bold tracking-widest uppercase mb-4">
          {badge}
        </div>
      )}

      <div className="text-[13px] font-bold text-white/50 uppercase tracking-[0.1em] mb-1">{tier}</div>
      <div className="text-[44px] font-black text-white leading-none mb-1">
        {price}
        {period && (
          <span className="text-base font-normal text-white/40">/{period}</span>
        )}
      </div>
      <p className="text-[13px] text-white/45 mb-7 mt-2">{description}</p>

      <div className="h-px bg-white/6 mb-6" />

      <ul className="flex flex-col gap-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/70">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
              <circle
                cx="8" cy="8" r="7.5"
                fill={highlighted ? "rgba(0,200,255,0.15)" : "rgba(0,200,81,0.15)"}
                stroke={highlighted ? "#00C8FF" : "#00C851"}
                strokeWidth="1"
              />
              <path
                d="M5 8l2 2 4-4"
                stroke={highlighted ? "#00C8FF" : "#00C851"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className={`block w-full py-3.5 rounded-xl text-white text-[15px] font-semibold text-center no-underline transition-all duration-200 ${
          highlighted
            ? "bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] shadow-[0_4px_20px_rgba(0,150,255,0.35)]"
            : "bg-white/6 border border-white/10 hover:bg-white/10"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

const plans = [
  {
    tier: "Developer",
    price: "$0",
    period: "month",
    description: "Everything you need to explore PayAI Guardian, absolutely free.",
    features: [
      "Sandbox environment for testing",
      "Fake money transactions",
      "All AI features included",
      "Community support",
      "Full API access",
    ],
    cta: "Start Free Now",
    ctaHref: "/auth",
    highlighted: true,
    badge: "Free Forever",
  },
  {
    tier: "Individual",
    price: "$9",
    period: "month",
    description: "Connect real accounts and send actual money with AI protection.",
    features: [
      "Link real bank accounts",
      "Real P2P transfers",
      "Priority AI responses",
      "Email support",
      "Advanced analytics",
    ],
    cta: "Coming Soon",
    ctaHref: "#",
    badge: "Coming Soon",
  },
  {
    tier: "Family",
    price: "$19",
    period: "month",
    description: "Full protection for up to 5 family members with shared insights.",
    features: [
      "Everything in Individual",
      "Up to 5 family members",
      "Shared fraud protection",
      "Family spending insights",
      "Dedicated support",
    ],
    cta: "Coming Soon",
    ctaHref: "#",
    badge: "Coming Soon",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#00C8FF] bg-[#00C8FF]/8 border border-[#00C8FF]/20 px-4 py-1.5 rounded-full mb-5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Pricing
          </div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
            Start Free, Scale When Ready
          </h2>
          <p className="text-base text-white/50 leading-[1.7] max-w-[600px] mx-auto">
            No credit card required. Full AI features included on every plan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[980px] mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.tier} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
