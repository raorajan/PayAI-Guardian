import { Suspense } from 'react';
import VerifyEmailPage from '@/modules/auth/pages/verify-email';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailPage />
    </Suspense>
  );
}
