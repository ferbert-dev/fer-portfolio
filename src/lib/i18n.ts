import { defaultLocale, locales, type Locale } from '@/content';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Turns a content link ("/contact", "/#faq", "#demos", "mailto:…", "https://…")
 * into a link for the given language. English lives at the root, German under /de.
 */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/')) return href;
  if (locale === defaultLocale) return href;
  if (href === '/') return `/${locale}`;
  if (href.startsWith('/#')) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Strips the language prefix, so the language switch can point at the same page in the other language. */
export function stripLocale(pathname: string): string {
  // The default locale is served at the root but rendered internally under /en,
  // so strip it too (otherwise server and browser disagree about the page).
  for (const l of locales) {
    if (pathname === `/${l}`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || '/';
}
