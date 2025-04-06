'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import useUserBootstrap from '@/hooks/useUserBootstrap';

export default function DashboardPage() {
  const { loading } = useUserBootstrap();
  const { user } = useSelector((state) => state.auth);
  


  useEffect(() => {


    if (!user) {
      //redirect('/login');
    }
  }, [user]);

  if (!user) {
    return null; // or loading spinner
  }
  console.log("user", user)
  if (loading) return <p>Loading dashboard...</p>;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your email: {user.email}</p>
    </div>
  );
}