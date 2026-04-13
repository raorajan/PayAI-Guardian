import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logoutUser } from "@/modules/auth/slice/authSlice";

export default function DashboardHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";

  return (
    <header 
      className="sticky top-0 z-[100] w-full backdrop-blur-xl border-b border-white/5"
      style={{ background: "rgba(5, 8, 16, 0.82)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 py-5 flex items-center justify-between">
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
  
        {/* User Info & Actions */}
        <div className="flex items-center gap-4">
          {/* User Name */}
          {user?.fullName && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#8040FF] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white text-sm font-bold leading-tight">{user.fullName}</span>
                <span className="text-white/40 text-[11px] font-medium">{user?.email}</span>
              </div>
            </div>
          )}

          {/* Dashboard Link - Only show if NOT on dashboard page */}
          {!isDashboardPage && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2]/10 border border-[#00C8FF]/20 text-[#00C8FF] text-sm font-semibold hover:bg-[#0A66C2]/20 hover:border-[#00C8FF]/40 transition-all no-underline group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="group-hover:translate-x-0.5 transition-transform">Dashboard</span>
            </Link>
          )}

          {/* Logout Button */}
          <button
            onClick={() => dispatch(logoutUser())}
            className="flex cursor-pointer items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all group"
            title="Sign Out"
          >
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
