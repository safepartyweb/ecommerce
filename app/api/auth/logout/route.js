import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  console.log("Logout route hit!")
  try {
    // Clear the HTTP-only cookie
    cookies().delete('token');
    
    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to logout' },
      { status: 500 }
    );
  }
}