import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Signed-in pages and the API hold personal data and should never be indexed.
      disallow: ['/dashboard', '/tasks', '/profile', '/api/'],
    },
    sitemap: new URL('/sitemap.xml', getSiteUrl()).toString(),
  };
}
