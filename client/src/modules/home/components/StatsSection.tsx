"use client";
import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ target, suffix = "", prefix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(parseFloat(current.toFixed(decimals)));
            }
          }, 2000 / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

const statsData = [
  { target: 500, suffix: "ms", label: "Average Transaction Time", color: "text-[#00C8FF]", glow: "rgba(0,200,255,0.4)" },
  { target: 97, suffix: "%", label: "Fraud Detection Accuracy", color: "text-[#00C851]", glow: "rgba(0,200,81,0.4)" },
  { target: 5000, suffix: "+", label: "Concurrent Users Supported", color: "text-[#8040FF]", glow: "rgba(128,64,255,0.4)" },
  { target: 99.99, suffix: "%", label: "Platform Uptime", color: "text-[#FF9A3C]", glow: "rgba(255,154,60,0.4)", decimals: 2 },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div
          className="rounded-[24px] px-12 py-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(10,102,194,0.15) 0%, rgba(128,64,255,0.1) 100%)",
            border: "1px solid rgba(0,200,255,0.15)",
          }}
        >
          {/* Top line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00C8FF]/50 to-transparent" />
          {/* Purple orb */}
          <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[radial-gradient(circle,rgba(128,64,255,0.12)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-[1.15] tracking-tight mb-3">
              Numbers That Matter
            </h2>
            <p className="text-base text-white/50">Real performance metrics from our platform</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {statsData.map((stat) => (
              <div
                key={stat.label}
                className="text-center px-4 py-6 rounded-[16px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className={`text-[clamp(36px,4vw,52px)] font-black leading-none mb-2 ${stat.color}`}
                  style={{ textShadow: `0 0 20px ${stat.glow}` }}
                >
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </div>
                <div className="text-[14px] text-white/50 font-medium leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
