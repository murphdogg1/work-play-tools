import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workpay.tools"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkPayTools",
    description: "Free payroll calculators, HR templates, and guides.",
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
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-black/[.08] dark:border-white/[.145]">
            <div className="mx-auto max-w-[860px] px-4 md:px-6 py-4 flex items-center justify-between">
              <Link href="/" className="text-base font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20" aria-label="WorkPayTools home">WorkPayTools</Link>
              <nav className="flex gap-4 text-sm" aria-label="Primary navigation">
                <Link href="/calculators" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">Calculators</Link>
                <Link href="/guides" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">Guides</Link>
                <Link href="/hr-templates" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">HR Templates</Link>
                <Link href="/about" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">About</Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-[860px] px-4 md:px-6 py-8">
              {children}
            </div>
          </main>

          <footer className="border-t border-black/[.08] dark:border-white/[.145]">
            <div className="mx-auto max-w-[860px] px-4 md:px-6 py-6 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" aria-label="Footer">
              <p className="text-black/70 dark:text-white/70">© {new Date().getFullYear()} WorkPayTools</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">Privacy</Link>
                <Link href="/terms" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">Terms</Link>
                <Link href="/contact" className="hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">Contact</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
