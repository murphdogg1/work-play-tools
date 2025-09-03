import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../../styles/theme.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WorkPayTools - Embeddable Calculators",
  description: "Embeddable payroll and HR calculators",
  robots: "noindex, nofollow", // Prevent indexing of embed pages
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Security headers for embedding */}
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' *;" />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-900">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
