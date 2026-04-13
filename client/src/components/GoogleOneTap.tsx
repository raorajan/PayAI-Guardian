"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProfile } from "@/modules/auth/slice/authSlice";
import { setToken } from "@/services/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleOneTap() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Only initialize if not authenticated and google script is loaded
    if (isAuthenticated) return;

    const initializeOneTap = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true,
        itp_support: true,
        context: "signin",
      });

      // Show the prompt
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.warn("One Tap not displayed selection:", notification.getNotDisplayedReason());
        } else if (notification.isSkippedMoment()) {
          console.warn("One Tap skipped:", notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.warn("One Tap dismissed:", notification.getDismissedReason());
        }
      });
    };

    const handleCredentialResponse = async (response: any) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/google-one-tap`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credential: response.credential }),
        });

        const data = await res.json();

        if (data.success) {
          setToken(data.data.token);
          await dispatch(getProfile()).unwrap();
          toast.success("Login successful!");
          router.push("/dashboard");
        } else {
          toast.error(data.message || "Google One Tap login failed");
        }
      } catch (error) {
        console.error("One Tap Login Error:", error);
        toast.error("An error occurred during Google One Tap login");
      }
    };

    // Try to initialize immediately or wait for script to load
    if (window.google) {
      initializeOneTap();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initializeOneTap();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, dispatch, router, toast]);

  return null; // This component doesn't render anything visible
}
