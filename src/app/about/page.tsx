import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Link from "next/link";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "About WorkPayTools",
  description: "Learn about WorkPayTools - simple, fast tools to help small teams and solo operators run payroll and HR with confidence.",
  openGraph: {
    title: "About WorkPayTools",
    description: "Learn about WorkPayTools - simple, fast tools to help small teams and solo operators run payroll and HR with confidence.",
    images: [
      {
        url: generateOgImageUrl("About WorkPayTools", "Learn about WorkPayTools - simple, fast tools to help small teams and solo operators run payroll and HR with confidence."),
        width: 1200,
        height: 630,
        alt: "About WorkPayTools - Simple, fast tools for payroll and HR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WorkPayTools",
    description: "Learn about WorkPayTools - simple, fast tools to help small teams and solo operators run payroll and HR with confidence.",
    images: [generateOgImageUrl("About WorkPayTools", "Learn about WorkPayTools - simple, fast tools to help small teams and solo operators run payroll and HR with confidence.")],
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="About WorkPayTools" subtitle="Who we are and what we do" />
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        WorkPayTools provides simple, fast tools to help small teams and solo operators
        run payroll and HR with confidence.
      </p>
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        Explore our <Link href="/calculators" className="hover:underline">calculators</Link>,
        browse <Link href="/guides" className="hover:underline">guides</Link>, and download
        <Link href="/hr-templates" className="hover:underline"> HR templates</Link>.
      </p>
    </div>
  );
}


