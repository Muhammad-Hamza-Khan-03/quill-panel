import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminRoutes = ['/admin'];
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('admin_auth');

  if (!authCookie || authCookie.value !== 'true') {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
