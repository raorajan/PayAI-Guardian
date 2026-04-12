"use client";
import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout 
      title="Privacy Policy" 
      subtitle="How PayAI Guardian protects and manages your digital identity and transaction data."
    >
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p className="leading-relaxed">
            PayAI Guardian collects information necessary to provide AI-powered fraud protection services. This includes:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Identity Data:</strong> Full name, email address, and social login identifiers (Google, Apple, Microsoft).</li>
            <li><strong>Transaction Data:</strong> Details of payments processed through our shield to identify patterns of fraud.</li>
            <li><strong>Technical Data:</strong> IP addresses, browser types, and device identifiers used for security auditing.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">2. How We Use AI Processing</h2>
          <p className="leading-relaxed">
            Our proprietary AI models analyze transaction data in real-time. This processing is strictly limited to:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Identifying anomalous behavior that suggests compromised credentials.</li>
            <li>Preventing unauthorized fund transfers through behavioral analysis.</li>
            <li>Improving the accuracy of our guardian shield without compromising individual privacy.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">3. Data Security & Storage</h2>
          <p className="leading-relaxed">
            We employ blockchain-grade encryption (AES-256) for all stored data. Your sensitive information is never shared with third parties for marketing purposes. Access is strictly controlled through multi-factor authentication and real-time monitoring.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">4. Your Rights</h2>
          <p className="leading-relaxed">
            You have the right to access, export, or request the deletion of your personal data at any time. You can manage these settings directly from your dashboard or by contacting our security team.
          </p>
        </div>

        <div className="pt-6 border-t border-white/5">
          <p className="text-sm italic">
            For further inquiries regarding our privacy practices, please contact <span className="text-accent-cyan">privacy@payai-guardian.io</span>.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
