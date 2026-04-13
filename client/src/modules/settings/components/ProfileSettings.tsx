"use client";
import React, { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useToast } from "@/hooks/useToast";
import { updateProfile, uploadAvatar } from "@/modules/auth/slice/authSlice";

export default function ProfileSettings() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
  });

  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (800KB max)
    if (file.size > 800 * 1024) {
      toast.error("File size must be less than 800KB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, GIF, or PNG)");
      return;
    }

    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    toast.success("Avatar selected! Click save to upload.");
  };

  const handleSave = async () => {
    // Validation
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }

    setSaving(true);

    try {
      // Step 1: Update profile information
      const profileData = {
        fullName: formData.fullName,
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
      };

      await dispatch(updateProfile(profileData)).unwrap();

      // Step 2: Upload avatar if selected
      if (avatarFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("avatar", avatarFile);

        await dispatch(uploadAvatar(formDataUpload)).unwrap();
      }

      toast.success("Profile updated successfully!");
      
      // Clear avatar preview after successful upload
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (error: any) {
      const errorMsg = error?.message || "Failed to update profile";
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      username: user?.username || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bio: user?.bio || "",
    });
    setAvatarPreview(null);
    setAvatarFile(null);
    toast.info("Changes cancelled");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === "DELETE") {
      toast.error("Account deletion initiated. You will receive a confirmation email.");
      setShowDeleteModal(false);
      setDeleteConfirmText("");
      // Here you would call the actual delete account API
    } else {
      toast.error("Please type DELETE to confirm");
    }
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
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  formData.fullName.charAt(0).toUpperCase()
                )}
                {/* Overlay upload button */}
                <div 
                  onClick={handleAvatarClick}
                  className="absolute inset-0 bg-[#00C8FF]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Online Indicator */}
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#00C851] border-4 border-[#050810] shadow-[0_0_12px_rgba(0,200,81,0.5)]" />
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/gif,image/png"
              onChange={handleAvatarChange}
              className="hidden"
            />
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
              <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Username *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all font-mono"
                  placeholder="username"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-white/50 tracking-wider uppercase ml-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00C8FF]/50 focus:bg-white/8 focus:outline-none transition-all"
                placeholder="City, State, Country"
              />
            </div>
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
            <button 
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-red-100 mb-2">Delete Account</h3>
            <p className="text-[13px] text-red-200/50 leading-relaxed mb-4">
              Once you delete your account, all your data including AI training data, linked bank accounts, and transaction history will be permanently wiped. This action is irreversible.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold hover:bg-red-500/20 transition-all"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0A0F1E] border border-red-500/20 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Delete Your Account?</h3>
              <p className="text-sm text-white/50 mb-4">
                This action is permanent and cannot be undone. All your data will be lost forever.
              </p>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white/40 tracking-widest uppercase">
                  Type DELETE to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="w-full bg-white/5 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500/50 focus:outline-none transition-all text-center font-mono"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
