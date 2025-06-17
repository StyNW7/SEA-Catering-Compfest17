/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { createNewCsrfToken, getCookieFromRequest, validateCsrfToken } from '@/lib/security/csrf';
import { getServerSession } from '@/lib/session';

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  const cookieStore = {
    get: (name: string) => request.cookies.get(name)?.value,
    set: (name: string, value: string, options?: any) => response.cookies.set(name, value, options)
  };
  
  const session = await getServerSession.call({ cookies: () => cookieStore });

  // CSRF Token Management
  let currentHttpOnlyToken = getCookieFromRequest(request, 'csrf-token');
  const currentClientToken = getCookieFromRequest(request, 'x-csrf-token');

  // Logic to generate and set new tokens if needed
  if (!currentHttpOnlyToken || !currentClientToken || currentHttpOnlyToken !== currentClientToken) {
    
    // If no token, or mismatch, generate a new one

    const newToken = await createNewCsrfToken();
    response.cookies.set('csrf-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    response.cookies.set('x-csrf-token', newToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    currentHttpOnlyToken = newToken;
  }

  // Validate CSRF token for mutating requests (POST, PUT, PATCH, DELETE)
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const clientSentTokenHeader = request.headers.get('x-csrf-token');
    
    if (!validateCsrfToken(clientSentTokenHeader, currentHttpOnlyToken)) {
      console.warn(`Middleware CSRF validation failed for ${request.method} ${pathname}.`);
      return new NextResponse('Invalid CSRF token', { status: 403 });
    }
  }

  // Route definitions
  const publicRoutes = ['/auth/login', '/auth/register', '/forgot-password', '/contact', '/menu', '/testimonials'];
  const authRoutes = ['/dashboard', '/profile', '/settings', '/subscription'];
  const adminRoutes = ['/admin'];

  // Check exact match first or startsWith for nested routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return response;
  }

  // Protected routes: require session
  if (authRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    if (!session?.user) { // Check for session.user
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  // Admin routes: require session and admin role
  if (adminRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    return response;
  }

  return response;

}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
    '/api/:path*',
  ],
};