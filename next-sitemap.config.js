module.exports = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://mydailytools-pi.vercel.app/').replace(/^(?:https?:\/\/)?/i, 'https://'),
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
};
