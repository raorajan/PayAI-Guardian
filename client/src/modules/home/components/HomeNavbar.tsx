"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#050810]/85 backdrop-blur-xl border-b border-[#00C8FF]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#0A66C2] to-[#00C8FF] flex items-center justify-center shadow-[0_0_16px_rgba(0,100,220,0.5)] group-hover:scale-105 transition-transform">
            <svg width="18" height="20" viewBox="0 0 20 24" fill="none">
              <path
                d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z"
                fill="rgba(255,255,255,0.95)"
              />
            </svg>
          </div>
          <span className="text-[18px] font-extrabold text-white tracking-tight">
            PayAI{" "}
            <span className="text-[#00C8FF]">Guardian</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/7 transition-all duration-200 no-underline"
            >
              {link.label}
            </a>
          ))}

          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="ml-2 flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[14px] font-semibold no-underline shadow-[0_4px_16px_rgba(0,150,255,0.4)] transition-all duration-200"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className="ml-2 px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[14px] font-semibold no-underline shadow-[0_4px_16px_rgba(0,150,255,0.4)] transition-all duration-200"
            >
              Launch App
            </Link>
          )}
        </div>

        {/* Mobile burger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/7 border border-white/10 text-white cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050810]/95 border-t border-[#00C8FF]/10 backdrop-blur-xl px-6 pb-6 pt-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/70 text-[15px] font-medium px-4 py-3 rounded-lg block no-underline hover:bg-white/7"
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="mt-2 px-4 py-3.5 rounded-[10px] bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[15px] font-semibold no-underline text-center block"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className="mt-2 px-4 py-3.5 rounded-[10px] bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-[15px] font-semibold no-underline text-center block"
            >
              Launch App
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
