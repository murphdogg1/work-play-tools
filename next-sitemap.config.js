/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.workpaytools.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    // Default transform keeps priority/changefreq undefined which is fine
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};


