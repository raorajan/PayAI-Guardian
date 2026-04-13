"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";

export default function ProfileSettings() {
  const { user } = useAppSelector((s) => s.auth);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "John Doe",
    email: user?.email || "john@example.com",
    username: "johndoe_ai",
    bio: "Fintech enthusiast and security-first investor. Leveraging AI to protect my digital assets.",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Public Profile</h2>
        <p className="text-sm text-white/40">This information will be visible to shared payment recipients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Avatar */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative group w-32 h-32 mx-auto md:mx-0">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#0A66C2] to-[#8040FF] p-1 shadow-[0_8px_30px_rgba(0,100,220,0.3)] group-hover:shadow-[0_8px_40px_rgba(0,100,220,0.5)] transition-all">
              <div className="w-full h-full rounded-[22px] bg-[#080C1E] flex items-center justify-center text-5xl font-black text-white overflow-hidden relative">
                {formData.fullName.charAt(0).toUpperCase()}
                {/* Overlay upload button */}
                <div className="absolute inset-0 bg-[#00C8FF]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Online Indicator */}
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#00C851] border-4 border-[#050810] shadow-[0_0_12px_rgba(0,200,81,0.5)]" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold text-white mb-1">Upload New Avatar</h3>
            <p className="text-[11px] text-white/30 px-4 md:px-0">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        {/* Right Col: Fields */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">AI Handle</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/40 cursor-not-allowed"
            />
            <p className="text-[11px] text-white/20 italic ml-1">Email cannot be changed directly for security audit reasons.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Bio / Profile Message</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all resize-none"
              placeholder="Tell us a bit about yourself..."
            />
            <div className="flex justify-between items-center px-1">
              <p className="text-[11px] text-white/30">Brief description for your profile.</p>
              <p className="text-[11px] text-white/30">{formData.bio.length} / 250</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#0A66C2] to-[#00C8FF] text-white text-sm font-bold shadow-[0_4px_16px_rgba(0,150,255,0.4)] hover:shadow-[0_4px_24px_rgba(0,150,255,0.6)] disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-white/10 hover:text-white transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
