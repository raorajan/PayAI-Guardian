"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { forgetPassword, clearAuthState } from '../slice/authSlice';
import { useToast } from '@/hooks/useToast';

interface ForgotPasswordProps {
  setView?: (view: 'signin' | 'signup' | 'forgot') => void;
}

export default function ForgotPassword({ setView }: ForgotPasswordProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearAuthState());
    setEmailSent(false);
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await dispatch(forgetPassword({ email })).unwrap();
      
      // Success - show toast and update UI
      setEmailSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (err: any) {
      const errorMsg = err?.message || 'Failed to send reset email. Please try again.';
      toast.error(errorMsg);
    }
  };

  if (emailSent) {
    return (
      <div className="flex flex-col items-center gap-6 text-center py-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[rgba(0,200,81,0.1)] border border-[rgba(0,200,81,0.3)]">
          <svg className="w-7 h-7 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white m-0 mb-2">Check your inbox</h2>
          <p className="text-sm text-white/50 m-0">
            We sent a reset link to <span className="text-white font-medium">{email}</span>
          </p>
        </div>
        <button type="button" onClick={() => setView?.('signin')}
          className="text-[#00C8FF] font-bold text-sm bg-transparent border-none cursor-pointer hover:text-white transition-colors">
          ← Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back button + heading */}
      <div>
        <button type="button" onClick={() => setView?.('signin')}
          className="flex items-center gap-1.5 text-[13px] text-white/50 bg-transparent border-none cursor-pointer hover:text-white/80 transition-colors mb-4 p-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Sign In
        </button>
        <h2 className="text-2xl font-extrabold text-white m-0 mb-1.5">Reset Password</h2>
        <p className="text-[13px] text-white/50 m-0 leading-relaxed">
          Enter your email and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email input */}
        <div className={`flex items-center gap-2.5 px-3.5 py-[11px] rounded-[10px] border transition-all duration-200 bg-white/[0.04] ${
          focused ? 'border-[#00C8FF] shadow-[0_0_0_3px_rgba(0,200,255,0.12)]' : 'border-white/10'
        }`}>
          <svg className={`w-[15px] h-[15px] shrink-0 transition-colors ${focused ? 'text-[#00C8FF]' : 'text-white/30'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <input
            id="reset-email" type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/25"
            placeholder="Email Address" required
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}
          className={`w-full py-[13px] font-bold text-sm text-white rounded-[10px] border-none cursor-pointer transition-shadow duration-200 flex items-center justify-center gap-2 ${
            loading
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:shadow-[0_6px_28px_rgba(0,150,255,0.65)] shadow-[0_4px_20px_rgba(0,150,255,0.4)]'
          }`}
          style={{ background: 'linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)' }}>
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Reset Link</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </>
          )}
        </button>
      </form>

      <p className="text-center text-[13px] text-white/45 m-0">
        Remember your password?{' '}
        <button type="button" onClick={() => setView?.('signin')}
          className="text-[#00C8FF] font-bold bg-transparent border-none cursor-pointer text-[13px] hover:text-white transition-colors">
          Sign In
        </button>
      </p>
    </div>
  );
}
