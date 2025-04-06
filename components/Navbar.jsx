'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '@/lib/api/authApi';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      {user ? (
        <>
          <Link href="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
          <Link href="/login" style={{ marginRight: '1rem' }}>Login</Link>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}