import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

/**
 * Pages search engines should find. Left out on purpose: the blog and German
 * (both hidden, decision 17) and the legal page while it is still a draft.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.8 },
  ];
}
