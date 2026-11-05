import { MetadataRoute } from 'next'

const siteUrl =
  process.env.FIREBASE_BUILD === 'true'
    ? 'https://linnmyatmaungdev.web.app'
    : 'https://www.linnmyatmaung.me'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
