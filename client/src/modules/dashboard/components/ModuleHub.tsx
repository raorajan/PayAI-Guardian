"use client";
import React from "react";
import Link from "next/link";

interface Module {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  action: string;
}

const MODULES: Module[] = [
  {
    title: "Fraud Shield",
    desc: "Real-time threat detection & security audit logs.",
    href: "/fraud-shield",
    category: "Security",
    action: "Enter SOC",
    color: "#FF3B5C",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "AI Guardian",
    desc: "Agentic command center with reasoning transparency.",
    href: "/ai-assistant",
    category: "Intelligence",
    action: "Consult AI",
    color: "#00C8FF",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Payments & Splits",
    desc: "Secure money transfers and group reconciliation.",
    href: "/payments",
    category: "Operations",
    action: "Start Transfer",
    color: "#00C851",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm1-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Global Analytics",
    desc: "Visual insights into your financial performance.",
    href: "/analytics",
    category: "Intelligence",
    action: "View Data",
    color: "#8040FF",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Security Chat",
    desc: "Encrypted messaging with AI-assisted verification.",
    href: "/chat",
    category: "Operations",
    action: "Open Chat",
    color: "#0A66C2",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: "Preferences",
    desc: "Configure security levels and application settings.",
    href: "/settings",
    category: "Account",
    action: "Configure",
    color: "rgba(255,255,255,0.4)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ModuleHub() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-2 h-2 rounded-full bg-[#00C8FF] anim-pulse-glow" />
        <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Guardian Protocol HUB</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {MODULES.map((module, i) => (
          <Link
            key={i}
            href={module.href}
            className="group relative p-4 rounded-2xl bg-white/[0.03] border border-white/10 transition-all hover:bg-white/[0.05] hover:border-white/20 active:scale-95 no-underline overflow-hidden"
          >
            {/* Background Accent */}
            <div 
              className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: module.color }}
            />

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center gap-3">
                {/* Icon */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-xl shrink-0"
                  style={{ background: `${module.color}15`, color: module.color, border: `1px solid ${module.color}30` }}
                >
                  {module.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-[#00C8FF] transition-colors line-clamp-1">
                  {module.title}
                </h3>

                {/* Description - Hidden on small screens */}
                <p className="text-[11px] text-white/40 leading-relaxed hidden xl:block line-clamp-2">
                  {module.desc}
                </p>

                {/* Action Button */}
                <div className="flex items-center gap-1.5 group/btn mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00C8FF] group-hover/btn:translate-x-0.5 transition-transform">
                    {module.action}
                  </span>
                  <svg className="w-3 h-3 text-[#00C8FF] opacity-0 group-hover/btn:opacity-100 transition-all translate-x-[-8px] group-hover/btn:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
