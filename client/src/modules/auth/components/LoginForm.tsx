"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loginUser, clearAuthState, getProfile } from '../slice/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { setToken } from '../../../services/utils';

interface LoginFormProps {
  setView?: (view: 'signin' | 'signup' | 'forgot') => void;
}

export default function LoginForm({ setView }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const toast = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // Handle social login callback (token in URL)
  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      setToken(token);
      dispatch(getProfile());
      toast.success("Social login successful!");
      setTimeout(() => router.push("/dashboard"), 800);
    } else if (error) {
      toast.error(error);
    }
  }, [searchParams, router, toast]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }
    try {
      // @ts-ignore
      await dispatch(require('../slice/authSlice').resendEmailVerification({ email })).unwrap();
      toast.success('Verification email resent!');
      setShowResend(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to resend email');
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Redirect to backend social auth route
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${backendUrl}/api/v1/auth/${provider.toLowerCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      console.log("response",response)
      
      // Success - show toast and redirect
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: any) {
      const errorMsg = err?.message || 'Login failed. Please try again.';
      
      // If email not verified (403), redirect to verification page
      if (err?.statusCode === 403) {
        toast.warning('Email not verified. Please check your inbox.');
        setShowResend(true);
        return;
      }
      
      toast.error(errorMsg);
    }
  };

  const inputWrapper = (field: string) =>
    `flex items-center gap-2.5 px-3.5 py-[11px] rounded-[10px] border transition-all duration-200 bg-white/[0.04] ${
      focused === field
        ? 'border-[#00C8FF] shadow-[0_0_0_3px_rgba(0,200,255,0.12)]'
        : 'border-white/10'
    }`;

  const iconColor = (field: string) =>
    focused === field ? 'text-[#00C8FF]' : 'text-white/30';

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-white m-0 mb-1">Welcome Back</h2>
        <p className="text-[13px] text-white/45 m-0">PayAI Guardian</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Email */}
        <div className={inputWrapper('email')}>
          <svg className={`w-[15px] h-[15px] shrink-0 ${iconColor('email')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/25"
            placeholder="Email Address" required
          />
        </div>

        {/* Password */}
        <div className={inputWrapper('password')}>
          <svg className={`w-[15px] h-[15px] shrink-0 ${iconColor('password')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <input
            type={showPassword ? 'text' : 'password'} value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/25"
            placeholder="Password" required
          />
          <button type="button" onClick={() => setShowPassword(v => !v)}
            className="text-white/30 hover:text-white/60 transition-colors p-0 bg-transparent border-none cursor-pointer flex">
            {showPassword
              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            }
          </button>
        </div>

        <div className="flex items-center justify-between -mt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-white/10 bg-white/5 accent-[#00C8FF] cursor-pointer" />
            <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
          </label>
          <button type="button" onClick={() => setView?.('forgot')}
            className="text-xs text-[#00C8FF] bg-transparent border-none cursor-pointer hover:text-white transition-colors font-medium">
            Forgot Password?
          </button>
        </div>

        {showResend && (
          <div className="bg-[#00C8FF]/10 border border-[#00C8FF]/20 rounded-lg p-2.5 flex items-center justify-between anim-fade-in">
            <span className="text-[11px] text-white/70">Didn't get the email?</span>
            <button type="button" onClick={handleResend}
              className="text-[11px] font-bold text-[#00C8FF] hover:text-white transition-colors bg-transparent border-none cursor-pointer">
              Resend Now
            </button>
          </div>
        )}

        {/* Login button */}
        <button type="submit" disabled={loading}
          className={`w-full py-[13px] font-bold text-sm text-white rounded-[10px] border-none cursor-pointer transition-shadow duration-200 ${
            loading 
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
              <span>Logging in...</span>
            </div>
          ) : (
            <>
              <div>Log In</div>
              <div className="text-[11px] font-normal opacity-80 mt-[1px]">Secure Log In</div>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-xs text-white/35 whitespace-nowrap">Or continue with</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      {/* Social button */}
      <button
        type="button"
        onClick={() => handleSocialLogin('Google')}
        className="w-full h-[42px] flex items-center justify-center gap-3 bg-white/5 border border-white/[0.09] rounded-[10px] cursor-pointer hover:bg-white/10 transition-colors text-white text-sm font-medium"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Switch */}
      <p className="text-center text-[13px] text-white/45 m-0">
        New here?{' '}
        <button type="button" onClick={() => setView?.('signup')}
          className="text-[#00C8FF] font-bold bg-transparent border-none cursor-pointer text-[13px] hover:text-white transition-colors">
          Create Account
        </button>
      </p>
    </div>
  );
}
