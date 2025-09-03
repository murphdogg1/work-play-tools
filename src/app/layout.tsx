import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { generateOgImageUrl } from "@/lib/og";
import Header from "@/components/nav/Header";
import SkipToContent from "@/components/SkipToContent";
import NewsletterForm from "@/components/NewsletterForm";
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
    default: "WorkPayTools",
    template: "%s | WorkPayTools",
  },
  description: "Free payroll calculators, HR templates, and guides.",
  openGraph: {
    title: "WorkPayTools",
    description: "Free payroll calculators, HR templates, and guides.",
    url: "/",
    siteName: "WorkPayTools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: generateOgImageUrl("WorkPayTools", "Free payroll calculators, HR templates, and guides"),
        width: 1200,
        height: 630,
        alt: "WorkPayTools - Free payroll calculators, HR templates, and guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkPayTools",
    description: "Free payroll calculators, HR templates, and guides.",
    images: [generateOgImageUrl("WorkPayTools", "Free payroll calculators, HR templates, and guides")],
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
        <meta
          name="description"
          content="Free payroll calculators, HR templates, and guides"
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {process.env.NODE_ENV === "production" ? (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-KYVLET7NMT"
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', 'G-KYVLET7NMT', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        {process.env.NODE_ENV === "production" ? (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6178941739913559"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipToContent />
        <div className="min-h-screen flex flex-col">
          <Header />

          <main id="main-content" className="flex-1">
            <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
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
                <div className="flex gap-6 text-sm">
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
