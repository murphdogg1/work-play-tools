import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'zod', '@hookform/resolvers'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/calculator',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/payroll-calculator',
        destination: '/calculators/payroll-tax',
        permanent: true,
      },
      {
        source: '/overtime-calculator',
        destination: '/calculators/overtime-pay',
        permanent: true,
      },
      {
        source: '/salary-calculator',
        destination: '/calculators/take-home-pay',
        permanent: true,
      },
      {
        source: '/hourly-calculator',
        destination: '/calculators/hourly-to-salary',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
