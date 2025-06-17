import { NextResponse } from 'next/server';
import { createNewCsrfToken } from '@/lib/security/csrf';

export async function GET() {

  const token = await createNewCsrfToken();
  
  const response = NextResponse.json({ 
    token,
    message: 'CSRF token generated successfully'
  });

    response.cookies.set('csrf-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    response.cookies.set('x-csrf-token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
  
  return response;

}