"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { verifyEmail, clearAuthState } from '../slice/authSlice';
import { useToast } from '@/hooks/useToast';

export default function VerifyEmailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error, message } = useAppSelector((state) => state.auth);
  const toast = useToast();
  
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [userInfo, setUserInfo] = useState<any>(null);

  // Get token from URL
  const token = searchParams.get('token');

  // Handle verification when component mounts
  useEffect(() => {
    dispatch(clearAuthState());

    // Check if token exists
    if (!token) {
      setVerificationStatus('error');
      toast.error('Invalid or missing verification token. Please request a new verification link.');
      return;
    }

    // Verify email automatically
    const verifyUserEmail = async () => {
      try {
        const result = await dispatch(verifyEmail(token)).unwrap();
        
        // Success response structure:
        // {
        //   status: 'success',
        //   statusCode: 200,
        //   success: true,
        //   message: 'Email verified successfully. You can now log in.',
        //   data: {
        //     user: { id, email, fullName, isVerified }
        //   }
        // }
        
        setVerificationStatus('success');
        setUserInfo(result?.data?.user || null);
        toast.success(result?.message || 'Email verified successfully!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000);
      } catch (err: any) {
        // Error response structure:
        // {
        //   status: 'error',
        //   statusCode: 400,
        //   success: false,
        //   message: 'Error message here'
        // }
        
        setVerificationStatus('error');
        const errorMsg = err?.message || 'Email verification failed. Please try again.';
        toast.error(errorMsg);
      }
    };

    verifyUserEmail();
  }, [dispatch, token, router, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-6 text-center py-8">
      {/* Verifying State */}
      {verificationStatus === 'verifying' && (
        <>
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[rgba(0,200,255,0.1)] border border-[rgba(0,200,255,0.3)]">
            <svg className="animate-spin w-10 h-10 text-[#00C8FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white m-0 mb-2">Verifying Your Email</h2>
            <p className="text-sm text-white/50 m-0">
              Please wait while we verify your PayAI Guardian account...
            </p>
          </div>
        </>
      )}

      {/* Success State */}
      {verificationStatus === 'success' && (
        <>
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[rgba(0,200,81,0.1)] border border-[rgba(0,200,81,0.3)]">
            <svg className="w-10 h-10 text-[#00C851]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white m-0 mb-2">Email Verified!</h2>
            <p className="text-sm text-white/50 m-0 mb-1">
              Your PayAI Guardian account has been successfully verified.
            </p>
            {userInfo && (
              <p className="text-xs text-white/40 m-0 mt-2">
                Welcome, <span className="text-white font-medium">{userInfo.fullName || userInfo.email}</span>!
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button 
              type="button" 
              onClick={() => router.push('/auth/signin')}
              className="w-full py-3 font-bold text-sm text-white rounded-lg border-none cursor-pointer transition-shadow duration-200 hover:shadow-[0_6px_28px_rgba(0,150,255,0.65)] shadow-[0_4px_20px_rgba(0,150,255,0.4)]"
              style={{ background: 'linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)' }}
            >
              Go to Sign In
            </button>
            <p className="text-xs text-white/40 m-0">
              Redirecting automatically in a few seconds...
            </p>
          </div>
        </>
      )}

      {/* Error State */}
      {verificationStatus === 'error' && (
        <>
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[rgba(255,80,80,0.1)] border border-[rgba(255,80,80,0.3)]">
            <svg className="w-10 h-10 text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white m-0 mb-2">Verification Failed</h2>
            <p className="text-sm text-white/50 m-0 mb-1">
              {error || 'We couldn\'t verify your email. The link may be invalid or expired.'}
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button 
              type="button" 
              onClick={() => router.push('/auth/signin')}
              className="w-full py-3 font-bold text-sm text-white rounded-lg border-none cursor-pointer transition-shadow duration-200 hover:shadow-[0_6px_28px_rgba(0,150,255,0.65)] shadow-[0_4px_20px_rgba(0,150,255,0.4)]"
              style={{ background: 'linear-gradient(135deg,#0A66C2 0%,#00C8FF 100%)' }}
            >
              Back to Sign In
            </button>
            <button 
              type="button" 
              onClick={() => router.push('/auth/signup')}
              className="w-full py-3 font-bold text-sm text-[#00C8FF] bg-transparent border border-[#00C8FF] rounded-lg cursor-pointer hover:bg-[#00C8FF] hover:text-white transition-all duration-200"
            >
              Create New Account
            </button>
          </div>
        </>
      )}

      {/* PayAI Guardian Branding */}
      <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
        <p className="text-xs text-white/30 m-0">
          PayAI Guardian - Secure AI-Powered Banking
        </p>
      </div>
    </div>
  );
}
