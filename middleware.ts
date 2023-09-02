import { NextResponse } from 'next/server';
import { includes } from 'lodash/fp';
import type { NextRequest } from 'next/server';

import { verify } from './utils/jwt';

const protectedRoutes = ['/home', '/profile'];

export async function middleware(req: NextRequest) {
  const urlObj = req.nextUrl;
  const authCookie = req.cookies.get('auth-token') || '';
  const isProtectedRoute = includes(urlObj.pathname, protectedRoutes);
  try {
    if (isProtectedRoute) {
      await verify(authCookie, 'secret');
      console.log('protected route');
    }
    return NextResponse.next();
  } catch (error) {
    console.log('not authenticated');
    const signinUrl = new URL('/', req.url);
    return NextResponse.redirect(signinUrl);
  }
}

// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
// export const config = {
//   matcher: ['/*'],
// };
