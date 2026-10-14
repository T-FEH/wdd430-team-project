import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/metadata';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return PUBLIC_PATHS.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.5,
  }));
}
