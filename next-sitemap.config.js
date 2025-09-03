/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.workpaytools.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*', '/embed/*', '/confirm', '/test'],
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
        disallow: ['/api/', '/embed/', '/confirm', '/test'],
      },
    ],
    additionalSitemaps: [
      'https://www.workpaytools.com/sitemap.xml',
    ],
  },
};


