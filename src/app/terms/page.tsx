import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Link from "next/link";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read WorkPayTools terms of service - by using our tools, you agree to our terms.",
  openGraph: {
    title: "Terms of Service",
    description: "Read WorkPayTools terms of service - by using our tools, you agree to our terms.",
    images: [
      {
        url: generateOgImageUrl("Terms of Service", "Read WorkPayTools terms of service - by using our tools, you agree to our terms."),
        width: 1200,
        height: 630,
        alt: "Terms of Service - WorkPayTools terms of service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service",
    description: "Read WorkPayTools terms of service - by using our tools, you agree to our terms.",
    images: [generateOgImageUrl("Terms of Service", "Read WorkPayTools terms of service - by using our tools, you agree to our terms.")],
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Terms of Service" subtitle="Please read these terms carefully" />
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        By using WorkPayTools, you agree to our terms. If you have questions,
        please <Link href="/contact" className="hover:underline">contact us</Link>.
      </p>
    </div>
  );
}


