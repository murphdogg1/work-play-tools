import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import GuideLayout from "@/components/GuideLayout";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Overtime Rules Guide",
  description: "Learn about overtime thresholds, rates, and compliance requirements by state.",
  openGraph: {
    title: "Overtime Rules Guide",
    description: "Learn about overtime thresholds, rates, and compliance requirements by state.",
    images: [
      {
        url: generateOgImageUrl("Overtime Rules Guide", "Learn about overtime thresholds, rates, and compliance requirements by state."),
        width: 1200,
        height: 630,
        alt: "Overtime Rules Guide - Learn about overtime thresholds, rates, and compliance requirements by state",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overtime Rules Guide",
    description: "Learn about overtime thresholds, rates, and compliance requirements by state.",
    images: [generateOgImageUrl("Overtime Rules Guide", "Learn about overtime thresholds, rates, and compliance requirements by state.")],
  },
};

const relatedItems: RelatedItem[] = [
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate your overtime pay based on hours worked and state rules."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track your weekly hours to determine overtime eligibility."
  },
  {
    title: "California Overtime Rules",
    href: "/guides/overtime-rules/ca",
    description: "Daily overtime, double-time, and meal break requirements in California."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn the fundamentals of payroll processing and overtime compliance."
  }
];

export default function OvertimeRulesGuide() {
  const breadcrumbs = [
    { title: "Guides", href: "/guides" },
    { title: "Overtime Rules" },
  ];

  return (
    <>
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpaytools.com/" },
        { name: "Guides", url: "https://workpaytools.com/guides" },
        { name: "Overtime Rules", url: "https://workpaytools.com/guides/overtime-rules" },
      ])}
      
      <PageHeading title="Overtime Rules" subtitle="Thresholds, rates, and compliance basics" />
      
      <GuideLayout breadcrumbs={breadcrumbs}>
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Weekly thresholds</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Common threshold is 40 hours, but local laws may differ.</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Rates</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Typical overtime is 1.5x; double-time may apply in specific cases.</p>
          </section>
          <AdSlot id="overtime-rules-guide-content" />
          <Related items={relatedItems} />
        </div>
      </GuideLayout>
    </>
  );
}


