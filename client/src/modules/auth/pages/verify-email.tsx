"use client";
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import VerifyEmail from '../components/VerifyEmail';

export default function VerifyEmailPage() {
  return (
    <AuthLayout activeMode="signin">
      <VerifyEmail />
    </AuthLayout>
  );
}
