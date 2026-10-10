import { en } from './en';
import type { Locale } from './site';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale];
}

export { site, locales } from './site';
export type { Locale } from './site';
