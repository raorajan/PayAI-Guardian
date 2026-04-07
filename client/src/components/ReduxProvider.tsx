"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#00C851',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4757',
              secondary: '#fff',
            },
          },
        }}
      />
    </Provider>
  );
}
