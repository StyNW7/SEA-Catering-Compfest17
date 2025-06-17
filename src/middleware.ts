/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { createNewCsrfToken, getCookieFromRequest, validateCsrfToken } from '@/lib/security/csrf'; // Updated imports
import { getServerSession } from '@/lib/session'; // Assuming this is your custom session getter

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  // Custom cookies object for getServerSession if it needs it this way
  const cookieStore = {
    get: (name: string) => request.cookies.get(name)?.value,
    set: (name: string, value: string, options?: any) => response.cookies.set(name, value, options)
  };
  
  const session = await getServerSession.call({ cookies: () => cookieStore });

  // --- CSRF Token Management ---
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
    response.cookies.set('x-csrf-token', newToken, { // This is the client-readable one
      httpOnly: false, // CRUCIAL: Allow client-side JS to read this
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    currentHttpOnlyToken = newToken; // Update for current request's validation
  }

  // Validate CSRF token for mutating requests (POST, PUT, PATCH, DELETE)
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const clientSentTokenHeader = request.headers.get('x-csrf-token');
    
    // For POST requests, especially form submissions, you might need to read from body/formData
    // However, for JSON requests (like your register), the header is primary.
    // Let's assume you're consistently sending 'X-CSRF-Token' header for JSON POSTs.
    
    if (!validateCsrfToken(clientSentTokenHeader, currentHttpOnlyToken)) {
      console.warn(`Middleware CSRF validation failed for ${request.method} ${pathname}.`);
      return new NextResponse('Invalid CSRF token', { status: 403 });
    }
  }
  // --- END CSRF Token Management ---


  // Route definitions
  const publicRoutes = ['/auth/login', '/auth/register', '/forgot-password', '/contact', '/menu', '/testimonials']; // Ensure /auth/ prefix
  const authRoutes = ['/dashboard', '/profile', '/settings', '/subscription'];
  const adminRoutes = ['/admin'];

  // Route checks (keep your existing logic)
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
      return NextResponse.redirect(new URL('/unauthorized', request.url)); // Redirect to an unauthorized page
    }
    return response;
  }

  // Default to allowing access if no specific route rule matches.
  // Consider having a general authenticated-only check if all other routes are protected by default.
  // For now, this implies any other route is also public or handled elsewhere.
  return response;
}

// isMatchingRoute helper function might not be strictly needed if using `some` with startsWith,
// but fine to keep if used elsewhere.
// function isMatchingRoute(pathname: string, route: string) {
//   return pathname === route || pathname.startsWith(`${route}/`);
// }

export const config = {
  matcher: [
    // Apply middleware to all paths except static files, Next.js internals, and image/font assets.
    // Also explicitly include API routes.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
    '/api/:path*', // Explicitly apply to all API routes
  ],
};
