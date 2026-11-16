import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose/jwt/verify';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow the login page and static assets
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Check for the access token in cookies
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key');
    await jwtVerify(accessToken, secret);
    return NextResponse.next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
