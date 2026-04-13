"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

export default function CTASection() {
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/12 to-[#8040FF]/8 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C8FF]/30 to-transparent" />

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        {/* Shield icon */}
        <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-[#0A66C2] to-[#00C8FF] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,150,255,0.4)]">
          <svg width="36" height="40" viewBox="0 0 20 24" fill="none">
            <path d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z" fill="rgba(255,255,255,0.95)"/>
          </svg>
        </div>

        <h2 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white leading-[1.15] tracking-tight mb-5">
          Ready to Guard Your<br />Money With AI?
        </h2>
        <p className="text-[18px] text-white/55 leading-[1.7] mb-12">
          Join the future of banking today. Start with our sandbox demo — no bank account required, completely free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              id="cta-dashboard-btn"
              className="flex items-center justify-center gap-2 px-10 py-[18px] rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[17px] font-bold no-underline shadow-[0_6px_24px_rgba(0,150,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,150,255,0.6)] transition-all duration-300"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              id="cta-launch-btn"
              className="flex items-center justify-center gap-2 px-10 py-[18px] rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[17px] font-bold no-underline shadow-[0_6px_24px_rgba(0,150,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,150,255,0.6)] transition-all duration-300"
            >
              🚀 Launch Demo Now
            </Link>
          )}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-github-btn"
            className="flex items-center justify-center gap-2 px-10 py-[18px] rounded-xl bg-white/6 border border-white/12 text-white/85 text-[17px] font-semibold no-underline hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            View GitHub
          </a>
        </div>

        <p className="text-[13px] text-white/30">
          No credit card required · Free forever for developers · Full AI access included
        </p>
      </div>
    </section>
  );
}
