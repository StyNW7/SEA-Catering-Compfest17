import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from '@/lib/session'

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl
  
  // Create a cookies object from the request
  const cookieStore = {
    get: (name: string) => request.cookies.get(name)?.value
  }
  
  // Get session with our custom implementation
  const session = await getServerSession.call({ cookies: () => cookieStore })

  // Route definitions
  const publicRoutes = ['/login', '/register', '/forgot-password', 'contact', '/menu', 'testimonials']
  const authRoutes = ['/dashboard', '/profile', '/settings', '/subscription']
  const adminRoutes = ['/admin']

  // 1. Check public routes
  if (publicRoutes.some(route => isMatchingRoute(pathname, route))) {
    return NextResponse.next()
  }

  // 2. Check authenticated routes
  if (authRoutes.some(route => isMatchingRoute(pathname, route))) {
    if (!session) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // 3. Check admin routes
  if (adminRoutes.some(route => isMatchingRoute(pathname, route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    return NextResponse.next()
  }

  // Default behavior for all other routes
  return NextResponse.next()
  
}

// Helper function for precise route matching
function isMatchingRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}