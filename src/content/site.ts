/**
 * Facts about Ferbert that are the same in every language.
 *
 * Values the owner still has to supply are written in [SQUARE BRACKETS] and
 * rendered as-is, so they stay visible until they are replaced. A link whose
 * target is unknown is `null` and renders as plain text, never as a dead link.
 */
export const site = {
  name: 'Ferbert',
  email: 'ferbertigo@gmail.com',
  github: 'https://github.com/ferbert-dev',
  bookingUrl: null as string | null,
  linkedin: null as string | null,
  whatsapp: null as string | null,
  telegram: null as string | null,
  x: null as string | null,
} as const;

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
