import { MetadataRoute } from 'next'

const siteUrl =
  process.env.FIREBASE_BUILD === 'true'
    ? 'https://linnmyatmaungdev.web.app'
    : 'https://www.linnmyatmaung.me'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/background`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
