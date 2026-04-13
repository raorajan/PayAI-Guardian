"use client";
import React from "react";
import Link from "next/link";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" },
      { label: "Demo", href: "#demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "http://localhost:8000/api-docs" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "/help" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Legal", href: "/terms" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
      { label: "Security Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: "𝕏", label: "Twitter", href: "#" },
  { icon: "in", label: "LinkedIn", href: "#" },
  { icon: "ΔΔ", label: "Discord", href: "#" },
];

export default function HomeFooter() {
  return (
    <footer
      className="border-t border-white/6 pt-20 pb-10 px-6 relative"
      style={{ background: "rgba(5,8,16,0.95)" }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline mb-5 group">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#0A66C2] to-[#00C8FF] flex items-center justify-center shadow-[0_0_14px_rgba(0,100,220,0.4)] group-hover:scale-105 transition-transform">
                <svg width="18" height="20" viewBox="0 0 20 24" fill="none">
                  <path d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z" fill="rgba(255,255,255,0.95)"/>
                </svg>
              </div>
              <span className="text-[18px] font-extrabold text-white tracking-tight">
                PayAI <span className="text-[#00C8FF]">Guardian</span>
              </span>
            </Link>
            <p className="text-[14px] text-white/40 leading-[1.7] mb-6 max-w-[280px]">
              The intelligent banking platform that protects your money with AI — before fraud happens.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[12px] text-white/50 font-bold no-underline transition-all duration-200 hover:bg-[#00C8FF]/10 hover:text-[#00C8FF] hover:border-[#00C8FF]/30"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-bold text-white uppercase tracking-[0.08em] mb-5">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/45 no-underline hover:text-[#00C8FF] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-white/25">
            © 2026 PayAI Guardian. Built with AI to protect your money.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-[13px] text-white/30 no-underline hover:text-[#00C8FF] transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
