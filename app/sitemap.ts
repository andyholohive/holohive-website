import type { MetadataRoute } from 'next';
import { cases } from '@/lib/cases';
import { guideChapters } from '@/lib/korea-guide';

const base = 'https://www.holohive.io';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/korea-guide`, changeFrequency: 'monthly', priority: 0.8 },
    ...guideChapters.map(({ id }) => ({
      url: `${base}/korea-guide/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${base}/korea-scan-example`, changeFrequency: 'monthly', priority: 0.6 },
    ...Object.keys(cases).map((slug) => ({
      url: `${base}/work/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
