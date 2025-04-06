'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      redirect('/dashboard');
    }
  }, [user]);

  return (
    <div className="auth-page">
      <h1>Register</h1>
      <AuthForm isLogin={false} />
    </div>
  );
}