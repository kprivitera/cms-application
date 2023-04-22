import { NextResponse } from 'next/server'
import _ from 'lodash'
import type { NextRequest } from 'next/server'

import { useAppStore } from './store'

export async function middleware(req: NextRequest) {
  const isAuthenticatedCookie = req.cookies.get('isAuthenticated') || ''
  const isAuthCookieValue = _.head(isAuthenticatedCookie.split(`isAuthenticated=`)) || ''

  if (!isAuthCookieValue) {
    console.log('not logged in')
    const signinUrl = new URL('/', req.url)
    // return NextResponse.redirect(signinUrl)
  }

  return NextResponse.next()
}

// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/'],
}
