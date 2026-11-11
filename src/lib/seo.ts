import { site } from '@/content';

/** Public address of the site. NEXT_PUBLIC_SITE_URL overrides it, for example on a custom domain. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, '');

/**
 * Company facts for search engines (schema.org JSON-LD). Only values that are
 * known and already shown on the site: nothing here may be invented.
 */
export function organizationJsonLd(description: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Valencia', addressCountry: 'ES' },
    areaServed: 'Europe',
    sameAs: [site.github, site.linkedin, site.x].filter(Boolean),
  };
  // "<" is escaped so the copy can never close the script tag.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
