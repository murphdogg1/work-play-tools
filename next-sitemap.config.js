/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://workplaytools.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*', '/embed/*', '/confirm'],
  additionalPaths: async (config) => {
    const result = [];
    
    // Add high-priority calculator pages
    const calculators = [
      '/calculators/payroll',
      '/calculators/overtime-pay',
      '/calculators/hourly-to-salary',
      '/calculators/salary-to-hourly',
      '/calculators/take-home-pay',
      '/calculators/payroll-tax',
      '/calculators/minimum-wage',
      '/calculators/timecard',
      '/calculators'
    ];
    
    calculators.forEach(path => {
      result.push({
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add guide pages
    const guides = [
      '/guides/payroll-basics',
      '/guides/overtime-rules',
      '/guides/benefits',
      '/guides/payroll-software-comparison',
      '/guides'
    ];
    
    guides.forEach(path => {
      result.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add state-specific overtime rules pages
    const states = [
      'al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'dc', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'
    ];
    
    states.forEach(state => {
      result.push({
        loc: `/guides/overtime-rules/${state}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add HR template pages
    const templates = [
      '/hr-templates/offer-letter',
      '/hr-templates/pto-policy',
      '/hr-templates/disciplinary-action-form',
      '/hr-templates'
    ];
    
    templates.forEach(path => {
      result.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });
    
    // Add important utility and info pages
    const utilityPages = [
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/methodology',
      '/editorial-policy',
      '/resources',
      '/seo-check',
      '/seo-audit',
      '/seo-comprehensive',
      '/test'
    ];
    
    utilityPages.forEach(path => {
      result.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  },
  transform: async (config, path) => {
    // Set different priorities based on path
    let priority = 0.5;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/calculators/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/guides/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/hr-templates/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/embed/', '/confirm'],
      },
    ],
    additionalSitemaps: [
      'https://workplaytools.com/sitemap.xml',
    ],
  },
};


