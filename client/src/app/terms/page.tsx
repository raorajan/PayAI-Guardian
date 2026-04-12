"use client";
import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export default function TermsOfService() {
  return (
    <LegalLayout 
      title="Terms of Service" 
      subtitle="The rules and regulations for using the PayAI Guardian security platform."
    >
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing and using PayAI Guardian, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately cease all use of our security services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">2. Service Description</h2>
          <p className="leading-relaxed">
            PayAI Guardian provides an AI-powered protection layer for digital transactions. While our system is designed to detect and prevent fraud with high accuracy, no security system is infallible. We provide our services on an "as-is" and "as-available" basis.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">3. User Obligations</h2>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>You must provide accurate and complete information during registration.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree not to use the platform for any illegal or unauthorized purposes, including attempting to bypass our security protocols.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">4. AI & Monitoring</h2>
          <p className="leading-relaxed">
            You acknowledge and agree that PayAI Guardian uses automated AI algorithms to monitor your transactions for security purposes. This monitoring is a core component of the service and cannot be disabled while using the platform.
          </p>
        </div>

        <div>
           <h2 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h2>
          <p className="leading-relaxed">
            PayAI Guardian shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, including but not limited to financial losses resulting from undetected fraudulent activity.
          </p>
        </div>

        <div className="pt-6 border-t border-white/5">
          <p className="text-sm italic">
            Questions about the Terms of Service should be sent to <span className="text-accent-cyan">legal@payai-guardian.io</span>.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
