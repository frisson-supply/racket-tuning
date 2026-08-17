export type Locale = 'nl' | 'en'

export const locales: Locale[] = ['nl', 'en']
export const defaultLocale: Locale = 'nl'

export const localizedHref = (locale: Locale, path: string) =>
  locale === 'en' ? `/en${path}` : path

export const localeFromPathname = (pathname: string): Locale =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'nl'
