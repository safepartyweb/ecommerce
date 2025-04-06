'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation } from '@/lib/api/authApi';
import { setCredentials } from '@/store/authSlice';
import { useDispatch } from 'react-redux';

export default function AuthForm({ isLogin }) {
  // console.log("isLogin",isLogin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const dispatch = useDispatch();


  const isLoading = isLogin ? isLoginLoading : isRegisterLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();

    try {
      if (isLogin) {
        // console.log(email, password)
        formData.append('email', email);
        formData.append('password', password);
        const apiRes = await login(formData).unwrap();
        // console.log("apiRes", apiRes)
        dispatch(setCredentials(apiRes.user))
      } else {
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        const apiRes = await register(formData).unwrap();
        console.log("apiRes:", apiRes)
      }
      router.push('/dashboard');
    } catch (err) {
      console.log("Error", err)
      setError(err.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      {!isLogin && (
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
}