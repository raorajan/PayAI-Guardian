"use client";
import toast from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const toastHelpers: ToastContextType = {
  showToast: (message: string, type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast(message, {
          icon: '⚠️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        break;
      case 'info':
      default:
        toast(message);
        break;
    }
  },
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast(message),
  warning: (message: string) => toast(message, {
    icon: '⚠️',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }),
};

export const useToast = () => {
  return toastHelpers;
};

export default toastHelpers;
