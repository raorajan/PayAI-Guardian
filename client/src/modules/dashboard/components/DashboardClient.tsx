"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the dashboard page with SSR disabled to prevent hydration mismatches
// with client-side only localStorage authentication state.
const DashboardPage = dynamic(
  () => import("../pages/DashboardPage"),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#00C8FF]/30 border-t-[#00C8FF] animate-spin" />
          <p className="text-white/50 text-sm">Initializing dashboard...</p>
        </div>
      </div>
    )
  }
);

export default function DashboardClient() {
  return <DashboardPage />;
}
