import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";
import TimecardForm from "./TimecardForm";
import EmbedButton from "./EmbedButton";

export const metadata: Metadata = {
  title: "Timecard Calculator",
  description: "Calculate total hours, overtime, and regular hours for weekly timecards.",
  openGraph: {
    title: "Timecard Calculator",
    description: "Calculate total hours, overtime, and regular hours for weekly timecards.",
    images: [
      {
        url: generateOgImageUrl("Timecard Calculator", "Calculate total hours, overtime, and regular hours for weekly timecards."),
        width: 1200,
        height: 630,
        alt: "Timecard Calculator - Calculate total hours, overtime, and regular hours for weekly timecards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timecard Calculator",
    description: "Calculate total hours, overtime, and regular hours for weekly timecards.",
    images: [generateOgImageUrl("Timecard Calculator", "Calculate total hours, overtime, and regular hours for weekly timecards.")],
  },
};

const faqItems: FaqItem[] = [
  { q: "How are breaks handled?", a: "Enter unpaid break minutes; we subtract them from daily totals." },
  { q: "Overnight shifts?", a: "If the clock-out time is earlier than clock-in, treat it as next day." },
  { q: "Rounding rules?", a: "Many employers round to 5–15 minutes; confirm your policy." },
];

const relatedItems: RelatedItem[] = [
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate your overtime pay using the hours from your timecard."
  },
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Convert your hourly rate to annual salary based on your tracked hours."
  },
  {
    title: "Overtime Rules by State",
    href: "/guides/overtime-rules",
    description: "Learn when overtime kicks in and state-specific rules."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Understand how timecards fit into payroll processing."
  }
];

export default function TimecardPage() {
  return (
    <div className="space-y-8">
      <PageHeading title="Timecard Calculator" subtitle="Track your weekly hours and overtime. Perfect for hourly workers, freelancers, and anyone tracking billable time." />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Calculators", url: "https://workpay.tools/calculators" },
        { name: "Timecard", url: "https://workpay.tools/calculators/timecard" },
      ])}
      <Suspense fallback={<div>Loading calculator...</div>}>
        <TimecardForm />
      </Suspense>
      <EmbedButton />
      <AdSlot id="timecard-calculator-results" />
      <section>
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="mt-2 list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Daily hours = (clock-out time − clock-in time) − unpaid break minutes</li>
          <li>Overnight shifts: if clock-out &lt; clock-in, add 24 hours to clock-out</li>
          <li>Weekly total = sum of all daily hours</li>
          <li>Regular hours = min(weekly total, 40)</li>
          <li>Overtime hours = max(0, weekly total − 40)</li>
        </ul>
      </section>
      <AdSlot id="timecard-calculator-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related items={relatedItems} tool="timecard" />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


