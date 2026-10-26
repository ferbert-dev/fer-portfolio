import { en } from './en';
import { de } from './de';
import type { Locale } from './site';

/** The shape every language must have: the English dictionary's shape. */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, de };

/**
 * Returns the copy for one language. Switching the site's language means
 * passing a different locale here; components never contain copy.
 */
export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale];
}

export { site, locales, defaultLocale } from './site';
export type { Locale } from './site';
