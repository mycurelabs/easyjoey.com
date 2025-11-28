import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://easyjoey.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date('2024-11-28'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
