"use client";
import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPassword from '../components/ForgotPassword';

type AuthView = 'signin' | 'signup' | 'forgot';

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('signin');

  return (
    <AuthLayout activeMode={view === 'signup' ? 'signup' : 'signin'}>
      {view === 'signin' && <LoginForm setView={setView} />}
      {view === 'signup' && <RegisterForm setView={setView} />}
      {view === 'forgot' && <ForgotPassword setView={setView} />}
    </AuthLayout>
  );
}
