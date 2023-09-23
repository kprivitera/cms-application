import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

export function GET() {
  const headersList = headers();
  const referer = headersList.get('referer') || '/';

  cookies().delete('auth-token');
  return NextResponse.redirect(new URL(referer), 303);
}
