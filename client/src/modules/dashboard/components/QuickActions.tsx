"use client";
import React from "react";
import Link from "next/link";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

function ActionButton({ icon, label, description, href, color, bgColor, borderColor }: ActionButtonProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 p-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] no-underline"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-white mb-1 group-hover:text-[#00C8FF] transition-colors">{label}</div>
        <div className="text-[11px] text-white/40">{description}</div>
      </div>
    </Link>
  );
}

export default function QuickActions() {
  const actions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      label: "Send Money",
      description: "Transfer to anyone instantly",
      href: "/payments",
      color: "#00C851",
      bgColor: "rgba(0,200,81,0.08)",
      borderColor: "rgba(0,200,81,0.2)",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ),
      label: "Request Money",
      description: "Ask for payment",
      href: "/payments",
      color: "#00C8FF",
      bgColor: "rgba(0,200,255,0.08)",
      borderColor: "rgba(0,200,255,0.2)",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: "Split Payment",
      description: "Divide bills easily",
      href: "/payments",
      color: "#8040FF",
      bgColor: "rgba(128,64,255,0.08)",
      borderColor: "rgba(128,64,255,0.2)",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      label: "Link Bank Account",
      description: "Connect via Plaid",
      href: "/payments",
      color: "#FFB800",
      bgColor: "rgba(255,184,0,0.08)",
      borderColor: "rgba(255,184,0,0.2)",
    },
  ];

  return (
    <div
      className="rounded-[20px] p-6 backdrop-blur-xl"
      style={{ background: "rgba(8,12,30,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-1.5 rounded-lg" style={{ background: "rgba(0,200,255,0.1)" }}>
          <svg className="w-4 h-4 text-[#00C8FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          <p className="text-[11px] text-white/40">Fast access to common tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <ActionButton key={action.label} {...action} />
        ))}
      </div>
    </div>
  );
}
