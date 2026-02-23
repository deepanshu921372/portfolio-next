import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  // If user is already logged in and tries to access /admin (login page), redirect to dashboard
  if (pathname === '/admin') {
    const token = request.cookies.get('auth_token')?.value;

    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch {
        // Invalid token, let them see the login page
        const response = NextResponse.next();
        response.cookies.delete('auth_token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
