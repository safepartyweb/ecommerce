'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const { user } = useSelector((state) => state.auth);
  // console.log("user from login page", user)

  useEffect(() => {
    // console.log("Use effect running!")
    // console.log("user", user)
    if (user) {
      redirect('/dashboard');
    }
  }, [user]);

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <AuthForm isLogin={true} />
    </div>
  );
}