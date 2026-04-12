import { Suspense } from 'react';
import AuthPage from '@/modules/auth/pages/page';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Auth() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthPage />
    </Suspense>
  );
}
