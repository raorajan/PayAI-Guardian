"use client";
import React from "react";

const testimonials = [
  {
    quote:
      "The AI caught a fraud attempt on my account before the bank even noticed. I'm never going back to traditional banking.",
    name: "Sarah Chen",
    role: "Verified User",
    avatar: "SC",
    color: "#00C8FF",
    avatarBg: "bg-[#00C8FF]/10",
    avatarBorder: "border-[#00C8FF]/30",
    avatarText: "text-[#00C8FF]",
    rating: 5,
  },
  {
    quote:
      "I asked the AI banker about investing my bonus and it gave me specific ETF recommendations with live pricing. Mind-blowing.",
    name: "Michael Rodriguez",
    role: "Verified User",
    avatar: "MR",
    color: "#8040FF",
    avatarBg: "bg-[#8040FF]/10",
    avatarBorder: "border-[#8040FF]/30",
    avatarText: "text-[#8040FF]",
    rating: 5,
  },
  {
    quote:
      "The blockchain audit trail gives me total peace of mind. Every dollar is tracked and immutable. No more bank disputes.",
    name: "Priya Sharma",
    role: "Beta Tester",
    avatar: "PS",
    color: "#00C851",
    avatarBg: "bg-[#00C851]/10",
    avatarBorder: "border-[#00C851]/30",
    avatarText: "text-[#00C851]",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="py-20 px-6 relative"
      style={{ background: "rgba(8,12,30,0.4)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#00C8FF] bg-[#00C8FF]/8 border border-[#00C8FF]/20 px-4 py-1.5 rounded-full mb-5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#00C8FF" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="#00C8FF" strokeWidth="2"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" stroke="#00C8FF" strokeWidth="2"/>
            </svg>
            Testimonials
          </div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
            Trusted by Early Adopters
          </h2>
          <p className="text-base text-white/50 leading-[1.7] max-w-[600px] mx-auto">
            Real feedback from our beta community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-[20px] p-8 backdrop-blur-xl"
              style={{
                background: "rgba(8,12,30,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFA500">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Quote mark */}
              <div
                className="text-[48px] leading-[0.7] mb-2 font-serif select-none"
                style={{ color: `${t.color}20` }}
              >
                &ldquo;
              </div>

              <p className="text-[15px] text-white/75 leading-[1.7] mb-7 italic">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-bold ${t.avatarBg} ${t.avatarText}`}
                  style={{ border: `2px solid ${t.color}40` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white">{t.name}</div>
                  <div className="text-[12px] text-white/40">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
