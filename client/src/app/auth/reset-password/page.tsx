import { Suspense } from 'react';
import ResetPasswordPage from '@/modules/auth/pages/reset-password';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ResetPassword() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
