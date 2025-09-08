import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { generateOgImageUrl } from "@/lib/og";
import Header from "@/components/nav/Header";
import SkipToContent from "@/components/SkipToContent";
import NewsletterForm from "@/components/NewsletterForm";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WebVitals from "@/components/WebVitals";
import "./globals.css";
import "../styles/theme.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workpaytools.com"),
  title: {
    default: "Free Payroll Calculators & HR Tools | WorkPayTools",
    template: "%s | WorkPayTools",
  },
  description: "Free payroll calculators, overtime pay calculator, take-home pay calculator, HR templates, and comprehensive guides. No signup required. Calculate payroll taxes, overtime, and more instantly.",
  keywords: ["payroll calculator", "overtime calculator", "take home pay calculator", "payroll tax calculator", "HR templates", "payroll tools", "free payroll software", "payroll guide", "minimum wage calculator", "timecard calculator"],
  openGraph: {
    title: "Free Payroll Calculators & HR Tools | WorkPayTools",
    description: "Free payroll calculators, overtime pay calculator, take-home pay calculator, HR templates, and comprehensive guides. No signup required. Calculate payroll taxes, overtime, and more instantly.",
    url: "/",
    siteName: "WorkPayTools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: generateOgImageUrl("Free Payroll Calculators & HR Tools", "Calculate overtime, take-home pay, payroll taxes & more. Free HR templates & guides."),
        width: 1200,
        height: 630,
        alt: "WorkPayTools - Free Payroll Calculators & HR Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Payroll Calculators & HR Tools | WorkPayTools",
    description: "Free payroll calculators, overtime pay calculator, take-home pay calculator, HR templates, and comprehensive guides. No signup required.",
    images: [generateOgImageUrl("Free Payroll Calculators & HR Tools", "Calculate overtime, take-home pay, payroll taxes & more. Free HR templates & guides.")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "uORANjBwxHNbfacAtskWGmKWnB7YMV_3ukAG2L9J_44",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-6178941739913559" />
        {/* Preconnect to external domains for performance */}
        <link rel="alternate" type="application/rss+xml" title="WorkPayTools RSS Feed" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="alternate" type="application/rss+xml" title="WorkPayTools RSS Feed" href="/rss.xml" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WorkPayTools" />
        
        {/* Google Analytics - Production Only */}
        {process.env.NODE_ENV === "production" && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-KYVLET7NMT"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', 'G-KYVLET7NMT', { anonymize_ip: true });
                `,
              }}
            />
          </>
        )}
        
        {/* Google AdSense - Load in all environments for testing */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6178941739913559"
          crossOrigin="anonymous"
        ></script>
        
        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "WorkPayTools",
            "url": "https://workpaytools.com",
            "logo": "https://www.workpaytools.com/logo.png",
            "description": "Free payroll calculators, HR templates, and comprehensive guides for businesses and HR professionals.",
            "sameAs": [
              "https://workpaytools.com"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://workpaytools.com/contact"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "WorkPayTools",
            "url": "https://workpaytools.com",
            "description": "Free payroll calculators, overtime pay calculator, take-home pay calculator, HR templates, and comprehensive guides.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://workpaytools.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "WorkPayTools"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "WorkPayTools",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "description": "Free payroll calculators and HR tools including overtime pay calculator, take-home pay calculator, payroll tax calculator, and HR templates.",
            "url": "https://workpaytools.com",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150"
            }
          })}
        </script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <WebVitals />
        <SkipToContent />
        <div className="min-h-screen flex flex-col">
          <Header />

          <main id="main-content" className="flex-1">
            <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
              {children}
            </div>
          </main>

          <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
              {/* Newsletter Section */}
              <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-md mx-auto text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Get new calculators and HR resources delivered to your inbox
                  </p>
                  <NewsletterForm variant="footer" />
                </div>
              </div>
              
              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" aria-label="Footer">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © {new Date().getFullYear()} WorkPayTools
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <a 
                    href="/about" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    About
                  </a>
                  <a 
                    href="/methodology" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Methodology
                  </a>
                  <a 
                    href="/editorial-policy" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Editorial Policy
                  </a>
                  <a 
                    href="/privacy" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                  <a 
                    href="/terms" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                  <a 
                    href="/contact" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
