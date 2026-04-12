"use client";
import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export default function HelpCenter() {
  const faqs = [
    {
      q: "What is PayAI Guardian?",
      a: "PayAI Guardian is an advanced AI-powered security layer that monitors your financial transactions in real-time to prevent fraud, identity theft, and unauthorized access."
    },
    {
      q: "How do I set up Social Auth?",
      a: "You can link your Google, Apple, or Microsoft accounts during registration or from your account settings. This provides a more secure and seamless login experience using enterprise-grade identity providers."
    },
    {
      q: "What should I do if a transaction is blocked?",
      a: "If the Guardian shield blocks a transaction, you will receive an immediate notification. You can review and authorize the transaction manually through the 'Security Alerts' section of your dashboard."
    },
    {
      q: "Is my data encrypted?",
      a: "Yes, all data within the PayAI Guardian ecosystem is encrypted using AES-256 bit encryption at rest and TLS 1.3 in transit. Your biometric and private keys never leave your device."
    },
    {
      q: "How do I contact support?",
      a: "Our support team is available 24/7. You can reach us via the in-app chat, or by emailing support@payai-guardian.io for non-urgent inquiries."
    }
  ];

  return (
    <LegalLayout 
      title="Help Center" 
      subtitle="Find answers to common questions and learn how to get the most out of your AI Guardian."
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent-cyan/30 transition-colors group">
                <h3 className="text-lg font-semibold text-[#00C8FF] mb-3 group-hover:text-white transition-colors">
                  {faq.q}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#0A66C2]/10 to-[#00C8FF]/10 rounded-2xl p-8 border border-[#00C8FF]/20 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Still need help?</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Our specialized security engineers are standing by to assist you with any technical or account issues.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2.5 rounded-lg bg-accent-cyan text-[#050810] font-bold text-sm hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] transition-all cursor-pointer">
              Launch Live Chat
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">
              Email Support
            </button>
          </div>
        </section>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30 tracking-wide uppercase">
            Security Status: All Systems Operational
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
