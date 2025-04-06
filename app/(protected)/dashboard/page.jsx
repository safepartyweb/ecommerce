'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserBootstrap from '@/hooks/useUserBootstrap';
import Loader from '@/components/Loader';

export default function DashboardPage() {
  const { loading } = useUserBootstrap();
  const { user } = useSelector((state) => state.auth);
  


  useEffect(() => {


    if (!user) {
      // redirect('/login');
    }
    if(user){
    }
  }, [user]);

  if (!user) {
    return <Loader />; // or loading spinner
  }
  // console.log("user", user)
  if (loading) return <Loader />;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your email: {user.email}</p>
    </div>
  );
}