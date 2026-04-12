"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function LegalLayout({ children, title, subtitle }: LegalLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#050810] relative overflow-x-hidden" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      
      {/* ── Global background glows ──────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(20,70,190,0.25)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(100,40,200,0.18)_0%,transparent_70%)] blur-[70px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(0,160,255,0.1)_0%,transparent_70%)] blur-[60px]" />
        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(0,200,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.025) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* ── Header / Navigation ────────────────────────────────── */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_14px_rgba(0,100,220,0.4)] transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#0A66C2,#00C8FF)' }}>
              <svg width="18" height="20" viewBox="0 0 20 24" fill="none">
                <path d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z" fill="rgba(255,255,255,0.95)"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">PayAI Guardian</span>
          </Link>
        </div>

        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back
        </button>
      </header>

      {/* ── Main Content Area ──────────────────────────────────── */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Page Title Section */}
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] mx-auto mt-8 rounded-full shadow-[0_0_10px_rgba(0,200,255,0.5)]" />
        </div>

        {/* Glass Card Content */}
        <div className="relative rounded-[24px] p-8 lg:p-12 overflow-hidden animate-in fade-in zoom-in-95 duration-1000"
          style={{
            background: 'rgba(8,12,30,0.65)',
            border: '1px solid rgba(0,200,255,0.15)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 0 40px rgba(0,100,220,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
          
          {/* Top accent glow */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/40 to-transparent" />
          
          <div className="prose prose-invert prose-blue max-w-none prose-headings:text-white prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-[#00C8FF]">
            {children}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-white/30 text-xs tracking-widest uppercase pb-10">
          Secure AI Verification • Last Updated April 2026
        </div>
      </main>
    </div>
  );
}
