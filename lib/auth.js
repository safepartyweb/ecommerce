// lib/auth.js
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) return null;

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return {
      id: decoded.id,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}
