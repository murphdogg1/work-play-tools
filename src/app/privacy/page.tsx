import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Link from "next/link";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.",
  openGraph: {
    title: "Privacy Policy",
    description: "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.",
    images: [
      {
        url: generateOgImageUrl("Privacy Policy", "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data."),
        width: 1200,
        height: 630,
        alt: "Privacy Policy - WorkPayTools privacy policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description: "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.",
    images: [generateOgImageUrl("Privacy Policy", "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.")],
  },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Privacy Policy" subtitle="Your privacy matters to us" />
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        This site uses minimal analytics to improve the product. We do not sell your data.
        Contact us via the <Link href="/contact" className="hover:underline">contact page</Link> with any questions.
      </p>
    </div>
  );
}


