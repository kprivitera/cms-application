import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verify } from './utils/jwt';

export async function middleware(req: NextRequest) {
  const urlObj = req.nextUrl;
  const authCookie = req.cookies.get('auth-token');
  const authCookieValue = authCookie?.value || '';

  if (urlObj.pathname === '/') {
    try {
      await verify(authCookieValue, 'secret');
      const profileUrl = new URL('/dashboard/profile', req.url);
      return NextResponse.redirect(profileUrl);
    } catch (error) {
      console.log('not authenticated, stay here');
      return NextResponse.next();
    }
  }

  try {
    await verify(authCookieValue, 'secret');
    return NextResponse.next();
  } catch (error) {
    console.log('not authenticated');
    const signinUrl = new URL('/', req.url);
    return NextResponse.redirect(signinUrl);
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
