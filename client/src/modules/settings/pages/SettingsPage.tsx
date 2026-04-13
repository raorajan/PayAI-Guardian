"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import DashboardHeader from "@/modules/dashboard/components/DashboardHeader";
import ProfileSettings from "../components/ProfileSettings";
import SecuritySettings from "../components/SecuritySettings";
import PreferencesSettings from "../components/PreferencesSettings";
import NotificationSettings from "../components/NotificationSettings";
import LinkedBanksSettings from "../components/LinkedBanksSettings";
import PrivacyControlsSettings from "../components/PrivacyControlsSettings";

type Category = "profile" | "security" | "preferences" | "notifications" | "linked-banks" | "privacy";

const NAV_ITEMS: { id: Category; label: string; icon: string; description: string }[] = [
  { 
    id: "profile", 
    label: "Public Profile", 
    icon: "👤", 
    description: "Manage your personal information and avatar" 
  },
  { 
    id: "security", 
    label: "Security & AI", 
    icon: "🛡️", 
    description: "Password, 2FA, and AI fraud protection levels" 
  },
  { 
    id: "preferences", 
    label: "Preferences", 
    icon: "⚙️", 
    description: "Language, currency, and display settings" 
  },
  { 
    id: "notifications", 
    label: "Notifications", 
    icon: "🔔", 
    description: "Configure how and when you want to be alerted" 
  },
  { 
    id: "linked-banks", 
    label: "Linked Banks", 
    icon: "🏦", 
    description: "Manage your connected bank accounts" 
  },
  { 
    id: "privacy", 
    label: "Privacy Controls", 
    icon: "🔒", 
    description: "Data sharing and privacy preferences" 
  },
];

export default function SettingsPage() {
  const { user, isAuthenticated, loading } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00C8FF]/20 border-t-[#00C8FF] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#050810] text-white selection:bg-[#00C8FF]/30">
      <DashboardHeader />

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.08)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(128,64,255,0.06)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <main className="relative z-10 max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-[320px] shrink-0">
            <div className="sticky top-[100px]">
              <div className="mb-8 px-2">
                <h1 className="text-3xl font-black tracking-tight mb-2">Account Settings</h1>
                <p className="text-white/40 text-sm">Update your details and security preferences.</p>
              </div>

              <nav className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`group flex items-center gap-4 p-4 rounded-2xl transition-all text-left overflow-hidden relative ${
                      activeCategory === item.id 
                        ? "bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)]" 
                        : "hover:bg-white/3"
                    }`}
                  >
                    {/* Active Indicator */}
                    {activeCategory === item.id && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#00C8FF] rounded-r-full shadow-[0_0_12px_rgba(0,200,255,0.8)]" />
                    )}

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${
                      activeCategory === item.id ? "bg-[#00C8FF]/10" : "bg-white/5"
                    }`}>
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <div className={`text-[15px] font-bold transition-colors ${
                        activeCategory === item.id ? "text-[#00C8FF]" : "text-white/80"
                      }`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-white/30 line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </div>

                    {activeCategory !== item.id && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </nav>

              {/* Pro Badge / Helper Info */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-[#0A66C2]/10 to-[#8040FF]/10 border border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#00C8FF] anim-pulse-glow" />
                    <span className="text-[11px] font-bold text-[#00C8FF] tracking-widest">AI GUARDIAN PRO</span>
                  </div>
                  <p className="text-[13px] text-white/60 leading-relaxed mb-4">
                    Your account is currently protected by standard AI heuristics.
                  </p>
                  <button className="text-[12px] font-bold text-white hover:text-[#00C8FF] transition-colors flex items-center gap-2">
                    Upgrade Protection
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#00C8FF]/5 blur-[30px] group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 min-w-0">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeCategory === "profile" && <ProfileSettings />}
              {activeCategory === "security" && <SecuritySettings />}
              {activeCategory === "preferences" && <PreferencesSettings />}
              {activeCategory === "notifications" && <NotificationSettings />}
              {activeCategory === "linked-banks" && <LinkedBanksSettings />}
              {activeCategory === "privacy" && <PrivacyControlsSettings />}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
