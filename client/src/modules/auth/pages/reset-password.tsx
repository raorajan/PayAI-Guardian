"use client";
import React from 'react';
import AuthLayout from '../components/AuthLayout';
import ResetPassword from '../components/ResetPassword';

export default function ResetPasswordPage() {
  return (
    <AuthLayout activeMode="signin">
      <ResetPassword />
    </AuthLayout>
  );
}
