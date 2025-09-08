import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Payroll & HR Guides",
  description: "Learn the essentials and best practices for payroll processing, overtime rules, and employee benefits. Get accurate calculations, state-specific rules, and expert guidance.",
  openGraph: {
    title: "Payroll & HR Guides",
    description: "Learn the essentials and best practices for payroll processing, overtime rules, and employee benefits. Get accurate calculations, state-specific rules, and expert guidance.",
    url: "https://www.workpaytools.com/guides",
    type: "website",
    siteName: "WorkPayTools",
    images: [
      {
        url: generateOgImageUrl("Payroll & HR Guides", "Learn the essentials and best practices for payroll processing, overtime rules, and employee benefits."),
        width: 1200,
        height: 630,
        alt: "Payroll & HR Guides - Learn the essentials and best practices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payroll & HR Guides",
    description: "Learn the essentials and best practices for payroll processing, overtime rules, and employee benefits. Get accurate calculations, state-specific rules, and expert guidance.",
    images: [generateOgImageUrl("Payroll & HR Guides", "Learn the essentials and best practices for payroll processing, overtime rules, and employee benefits.")],
  },
  alternates: {
    canonical: "https://www.workpaytools.com/guides",
  },
};

const cards = [
  { href: "/guides/payroll-basics", title: "Payroll Basics", desc: "Core concepts for running payroll." },
  { href: "/guides/overtime-rules", title: "Overtime Rules", desc: "Understand overtime thresholds and rates." },
  { href: "/guides/benefits", title: "Benefits & Deductions", desc: "Health, retirement, taxes, and more." },
  { href: "/guides/payroll-software-comparison", title: "Payroll Software Comparison", desc: "Compare the best payroll software for 2025." },
];

export default function GuidesHubPage() {
  return (
    <div className="space-y-6">
      {/* Ensure descriptive meta title via layout metadata template; no extra h1s beyond PageHeading */}
      <PageHeading title="Payroll & HR Guides" subtitle="Learn the essentials and best practices." />
      {breadcrumbJsonLd([{ name: "Home", url: "https://workpay.tools/" }, { name: "Guides", url: "https://workpay.tools/guides" }])}
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/[.03] dark:hover:bg-white/[.04]">
            <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


