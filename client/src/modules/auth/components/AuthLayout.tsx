"use client";
import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  activeMode: 'signin' | 'signup';
}

export default function AuthLayout({ children, activeMode }: AuthLayoutProps) {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#050810] relative" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>


      {/* ── Global background glows ──────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] left-[2%] w-[55%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(20,70,190,0.3)_0%,transparent_70%)] blur-[50px]" />
        <div className="absolute bottom-0 left-[10%] w-[40%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(100,40,200,0.22)_0%,transparent_70%)] blur-[60px]" />
        <div className="absolute top-[30%] right-[5%] w-[35%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(0,160,255,0.12)_0%,transparent_70%)] blur-[45px]" />
        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(0,200,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.035) 1px,transparent 1px)', backgroundSize: '55px 55px' }}
        />
      </div>

      {/* ── Left Visual Panel ──────────────────────────────────── */}
      <div className="hidden lg:flex w-[55%] h-full z-10 flex-col items-center justify-center px-16 py-10 box-border">

        {/* Animated Shield */}
        <div className="relative w-[360px] h-[360px] flex items-center justify-center mb-8 shrink-0">

          {/* Outer orbit */}
          <div className="absolute inset-0 rounded-full border border-[rgba(0,200,255,0.18)] anim-spin-slow">
            {[0,60,120,180,240,300].map(deg => (
              <div key={deg} className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-[#00C8FF] shadow-[0_0_12px_rgba(0,200,255,0.9)]"
                style={{ transform: `rotate(${deg}deg) translateX(180px)` }} />
            ))}
          </div>

          {/* Middle orbit */}
          <div className="absolute w-[260px] h-[260px] rounded-full border border-[rgba(130,60,255,0.25)] anim-spin-rev">
            {[45,135,225,315].map(deg => (
              <div key={deg} className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full bg-[#8040FF] shadow-[0_0_10px_rgba(130,60,255,0.9)]"
                style={{ transform: `rotate(${deg}deg) translateX(130px)` }} />
            ))}
          </div>

          {/* Inner glow */}
          <div className="absolute w-[170px] h-[170px] rounded-full anim-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(0,100,220,0.45) 0%, rgba(80,30,180,0.3) 50%, transparent 70%)' }} />

          {/* Shield SVG */}
          <div className="relative z-10 anim-float">
            <svg width="110" height="128" viewBox="0 0 120 140" fill="none">
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#4060FF"/>
                  <stop offset="100%" stopColor="#8040FF" stopOpacity="0.9"/>
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <path d="M60 8 L104 28 L104 72 C104 100 82 122 60 132 C38 122 16 100 16 72 L16 28 Z"
                fill="url(#sg)" fillOpacity="0.2" stroke="url(#sg)" strokeWidth="2" filter="url(#glow)"/>
              <text x="60" y="70" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="Inter,sans-serif">AI</text>
              <text x="60" y="90" textAnchor="middle" fill="rgba(0,200,255,0.9)" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif" letterSpacing="3">GUARDIAN</text>
              <circle cx="88" cy="32" r="11" fill="rgba(0,200,255,0.12)" stroke="rgba(0,200,255,0.6)" strokeWidth="1.5"/>
              <path d="M84 32 L87.5 35.5 L93 29" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Corner badges */}
          {([
            { cls: 'top-[6%] left-[8%]',    color: '#00C8FF', text: 'Secure'   },
            { cls: 'top-[12%] right-[6%]',  color: '#8040FF', text: 'AI'       },
            { cls: 'bottom-[10%] left-[6%]',color: '#4060FF', text: '256-bit'  },
            { cls: 'bottom-[16%] right-[10%]',color:'#00C8FF',text: 'Real-time'},
          ] as const).map(({ cls, color, text }, i) => (
            <div key={i} className={`absolute ${cls} px-[9px] py-[5px] rounded-[7px] text-[11px] font-semibold tracking-[0.04em] backdrop-blur-md`}
              style={{ color, background: 'rgba(255,255,255,0.04)', border: `1px solid ${color}35` }}>
              {text}
            </div>
          ))}

          {/* Connector lines */}
          <svg className="absolute inset-0 pointer-events-none" width="360" height="360">
            {([[40,40,180,180],[320,56,180,180],[36,318,180,180],[330,310,180,180]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>(
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`rgba(0,200,255,${0.1+i*0.02})`} strokeWidth="1" strokeDasharray="5,8"/>
            ))}
          </svg>
        </div>

        {/* Tagline */}
        <div className="text-center max-w-[360px] shrink-0">
          <h2 className="text-2xl font-extrabold text-white leading-tight mb-2.5">
            AI-Powered <span className="text-[#00C8FF]">Security</span> for Modern Finance
          </h2>
          <p className="text-[13px] text-white/50 leading-relaxed">
            Real-time fraud detection and blockchain-grade protection for every transaction.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-9 mt-7 shrink-0">
          {([{val:'99.9%',label:'Uptime'},{val:'10M+',label:'Transactions'},{val:'256-bit',label:'Encryption'}]).map(({val,label})=>(
            <div key={label} className="text-center">
              <div className="text-lg font-extrabold text-[#00C8FF]">{val}</div>
              <div className="text-[11px] text-white/40 mt-1 tracking-[0.05em]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ──────────────────────────────────── */}
      <div className="flex-1 lg:w-[45%] h-full flex flex-col items-center justify-center px-4 py-5 z-10 overflow-hidden box-border">

        {/* Glass card */}
        <div className="w-full max-w-[400px] relative rounded-[20px] px-7 py-7 overflow-y-auto"
          style={{
            maxHeight: 'calc(100vh - 40px)',
            background: 'rgba(8,12,30,0.88)',
            border: '1px solid rgba(0,200,255,0.18)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 50px rgba(0,100,220,0.18), 0 0 100px rgba(80,30,180,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
            scrollbarWidth: 'none',
          }}>

          {/* Top cyan accent line */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,200,255,0.7), transparent)' }} />

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-5 justify-center">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_14px_rgba(0,100,220,0.5)]"
              style={{ background: 'linear-gradient(135deg,#0A66C2,#00C8FF)' }}>
              <svg width="16" height="18" viewBox="0 0 20 24" fill="none">
                <path d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z" fill="rgba(255,255,255,0.92)"/>
              </svg>
            </div>
            <span className="text-[15px] font-bold text-white">PayAI Guardian</span>
          </div>

          {children}

          {/* Footer links */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex justify-center gap-5">
            {['Privacy','Terms','Help'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="text-[11px] text-white/30 no-underline hover:text-white/65 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
