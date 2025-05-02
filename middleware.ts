import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // Jika mengakses route admin tapi belum login
  if (request.nextUrl.pathname.startsWith('/admin') && !session) {
    // Hanya redirect ke login page jika bukan di halaman login
    if (request.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 