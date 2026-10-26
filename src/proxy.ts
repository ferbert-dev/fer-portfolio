import { NextResponse, type NextRequest } from 'next/server';

/**
 * English is served at the root, German under /de. Internally every page lives
 * under /[locale], so root paths are rewritten to /en and /en/... is redirected
 * to the root to keep one address per page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  if (pathname === '/de' || pathname.startsWith('/de/')) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and files with an extension (icons, images, robots.txt).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
