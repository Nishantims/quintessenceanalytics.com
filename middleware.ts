import { NextRequest, NextResponse } from 'next/server'

const CANONICAL = '/Chess-2000'

// Real reported issue: routing is case-sensitive by default, so
// /chess-2000 404s even though /Chess-2000 is the real route — confusing
// for anyone typing the URL by hand or guessing casing. Redirects any
// case variant of the /Chess-2000 path (and everything under it) to the
// canonical casing, preserving the rest of the path and query string.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.toLowerCase().startsWith(CANONICAL.toLowerCase()) && !pathname.startsWith(CANONICAL)) {
    const rest = pathname.slice(CANONICAL.length)
    const url = request.nextUrl.clone()
    url.pathname = `${CANONICAL}${rest}`
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
