'use client';

import { useSelector } from 'react-redux';


export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  




  return (
    <>
      <h1 className='text-xl font-bold'>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your email: {user.email}</p>
    </>
            
  );
}