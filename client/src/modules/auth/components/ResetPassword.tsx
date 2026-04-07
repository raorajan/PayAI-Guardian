"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { resetPassword, clearAuthState } from '../slice/authSlice';
import { useToast } from '@/hooks/useToast';

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading } = useAppSelector((state) => state.auth);
  const toast = useToast();
  
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  // Get token from URL
  const token = searchParams.get('token');

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearAuthState());
    setPasswordReset(false);

    // Check if token exists
    if (!token) {
      toast.error('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [dispatch, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if token exists
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await dispatch(resetPassword({ 
        token, 
        password: formData.password 
      })).unwrap();
      
      // Success - show toast and redirect
      toast.success('Password reset successful! Redirecting to login...');
      setPasswordReset(true);
      
      setTimeout(() => {
        router.push('/auth');
      }, 1500);
    } catch (err: any) {
      const errorMsg = err?.message || 'Reset password failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  const inputWrapper = (field: string) =>
    `flex items-center gap-2.5 px-3.5 py-[11px] rounded-[10px] border transition-all duration-200 bg-white/[0.04] ${
      focused === field
        ? 'border-[#00C8FF] shadow-[0_0_0_3px_rgba(0,200,255,0.12)]'
        : 'border-white/10'
    }`;

  const iconColor = (f: string) => focused === f ? 'text-[#00C8FF]' : 'text-white/30';

  if (passwordReset) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[rgba(0,200,81,0.1)] border border-[rgba(0,200,81,0.3)]">
          <svg className="w-7 h-7 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white m-0 mb-2">Password Reset Successful!</h2>
          <p className="text-sm text-white/50 m-0">
            Your password has been reset. Redirecting to login...
          </p>
        </div>
        <button type="button" onClick={() => router.push('/auth')}
          className="text-[#00C8FF] font-bold text-sm bg-transparent border-none cursor-pointer hover:text-white transition-colors">
          ← Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-white m-0 mb-1">Set New Password</h2>
        <p className="text-[13px] text-white/45 m-0">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        {/* Password */}
        <div className={inputWrapper('password')}>
          <svg className={`w-[15px] h-[15px] shrink-0 ${iconColor('password')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <input 
            id="password" 
            type={showPwd ? 'text' : 'password'} 
            value={formData.password} 
            onChange={handleChange}
            onFocus={() => setFocused('password')} 
            onBlur={() => setFocused(null)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/25"
            placeholder="New Password" 
            required 
          />
        </div>

        {/* Confirm Password */}
        <div className={inputWrapper('confirmPassword')}>
          <svg className={`w-[15px] h-[15px] shrink-0 ${iconColor('confirmPassword')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <input 
            id="confirmPassword" 
            type={showPwd ? 'text' : 'password'} 
            value={formData.confirmPassword} 
            onChange={handleChange}
            onFocus={() => setFocused('confirmPassword')} 
            onBlur={() => setFocused(null)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/25"
            placeholder="Confirm New Password" 
            required 
          />
        </div>

        {/* Show Password Checkbox */}
        <div className="flex items-center gap-2 mt-0.5">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showPwd} 
              onChange={() => setShowPwd(v => !v)}
              className="w-3.5 h-3.5 accent-[#00C8FF] cursor-pointer" 
            />
            <span className="text-[11px] text-white/40">Show password</span>
          </label>
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          disabled={loading || !token}
          className={`w-full mt-1 py-[13px] font-bold text-sm text-white rounded-[10px] border-none cursor-pointer transition-shadow duration-200 ${
            loading || !token
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:shadow-[0_6px_28px_rgba(0,150,255,0.65)] shadow-[0_4px_20px_rgba(0,150,255,0.4)]'
          }`}
          style={{ background: 'linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)' }}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Resetting Password...</span>
            </div>
          ) : (
            <span>Reset Password</span>
          )}
        </button>
      </form>

      {/* Back to Sign In */}
      <p className="text-center text-[13px] text-white/45 m-0">
        Remember your password?{' '}
        <button 
          type="button" 
          onClick={() => router.push('/auth')}
          className="text-[#00C8FF] font-bold bg-transparent border-none cursor-pointer text-[13px] hover:text-white transition-colors">
          Sign In
        </button>
      </p>
    </div>
  );
}
