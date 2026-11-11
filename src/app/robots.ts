import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

/** Everything may be crawled; hidden pages opt out themselves with a robots meta tag. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
