"use client";
import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logoutUser } from "@/modules/auth/slice/authSlice";

export default function DashboardHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);

  return (
    <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between max-w-[1280px] mx-auto">
      <Link href="/" className="flex items-center gap-2.5 no-underline group">
        <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#0A66C2] to-[#00C8FF] flex items-center justify-center shadow-[0_0_14px_rgba(0,100,220,0.4)] group-hover:scale-105 transition-transform">
          <svg width="18" height="20" viewBox="0 0 20 24" fill="none">
            <path d="M10 2 L18 6 L18 14 C18 19 14 22 10 23 C6 22 2 19 2 14 L2 6 Z" fill="rgba(255,255,255,0.95)" />
          </svg>
        </div>
        <span className="text-[18px] font-extrabold text-white tracking-tight">
          PayAI <span className="text-[#00C8FF]">Guardian</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {user?.fullName && (
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#8040FF] flex items-center justify-center text-white text-xs font-bold">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <span className="text-white/50 text-sm">
              <span className="text-white font-medium">{user.fullName.split(" ")[0]}</span>
            </span>
          </div>
        )}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all no-underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all shadow-[0_0_10px_rgba(255,59,92,0.1)] hover:shadow-[0_0_15px_rgba(255,59,92,0.2)] group"
          title="Logout"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
