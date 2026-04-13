"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "@/redux/store";
import { getProfile } from "@/modules/auth/slice/authSlice";
import { getToken } from "@/services/utils";
import { Toaster } from "react-hot-toast";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    const token = getToken();
    if (token && !user && !loading) {
      dispatch(getProfile());
    }
  }, [dispatch, loading, user]);

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1a2e",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#00C851",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4757",
              secondary: "#fff",
            },
          },
        }}
      />
    </Provider>
  );
}
