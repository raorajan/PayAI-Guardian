"use client";
import React from "react";

const securityFeatures = [
  { icon: "🔐", title: "End-to-End Encryption", desc: "All transaction data is encrypted in transit and at rest using AES-256." },
  { icon: "📱", title: "Multi-Factor Authentication", desc: "Protect your account with biometrics, TOTP, and SMS verification." },
  { icon: "👁️", title: "Real-Time Monitoring", desc: "24/7 AI surveillance watches every transaction for unusual patterns." },
  { icon: "⛓️", title: "Blockchain Verification", desc: "Every payment creates an immutable on-chain record for full auditability." },
  { icon: "✅", title: "KYC/AML Compliance", desc: "Fully compliant with Know Your Customer and Anti-Money Laundering standards." },
  { icon: "🏦", title: "Read-Only Bank Access", desc: "We never store credentials. Plaid's read-only API keeps your accounts safe." },
];

export default function SecuritySection() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: "rgba(8,12,30,0.4)" }}
    >
      {/* Background glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(10,102,194,0.12)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#00C8FF] bg-[#00C8FF]/8 border border-[#00C8FF]/20 px-4 py-1.5 rounded-full mb-5">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6z" fill="#00C8FF"/>
            </svg>
            Security First
          </div>
          <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
            Bank-Grade Security<br />Meets AI Intelligence
          </h2>
          <p className="text-base text-white/50 leading-[1.7] max-w-[600px] mx-auto">
            Every layer of PayAI Guardian is built with enterprise-grade security standards.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityFeatures.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 items-start rounded-[16px] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: "rgba(8,12,30,0.7)",
                border: "1px solid rgba(0,200,255,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-[12px] text-[22px] flex items-center justify-center shrink-0 bg-[#00C8FF]/8 border border-[#00C8FF]/15 transition-transform group-hover:scale-110 duration-300"
              >
                {item.icon}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-[13px] text-white/50 leading-[1.6]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
