import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['nl', 'en'] as const
const DEFAULT_LOCALE = 'nl'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (hasLocalePrefix) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!admin|api|_next|next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
}
