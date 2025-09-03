import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";
import Calculator from "./Calculator";
import EmbedButton from "./EmbedButton";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator (2025)",
  description:
    "Calculate regular and overtime pay based on hourly rate, hours worked, and overtime thresholds.",
  openGraph: {
    title: "Overtime Pay Calculator (2025)",
    description: "Calculate regular and overtime pay based on hourly rate, hours worked, and overtime thresholds.",
    images: [
      {
        url: generateOgImageUrl("Overtime Pay Calculator (2025)", "Calculate regular and overtime pay based on hourly rate, hours worked, and overtime thresholds."),
        width: 1200,
        height: 630,
        alt: "Overtime Pay Calculator (2025) - Calculate regular and overtime pay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overtime Pay Calculator (2025)",
    description: "Calculate regular and overtime pay based on hourly rate, hours worked, and overtime thresholds.",
    images: [generateOgImageUrl("Overtime Pay Calculator (2025)", "Calculate regular and overtime pay based on hourly rate, hours worked, and overtime thresholds.")],
  },
};

const faqItems: FaqItem[] = [
  {
    q: "How is overtime calculated?",
    a: "In most states, weekly hours over 40 are paid at 1.5× the regular rate. Some states (e.g., CA) also require daily overtime. Always check your state rules."
  },
  {
    q: "Do salaried employees get overtime?",
    a: "Only if they're non-exempt. Exempt roles generally aren't OT-eligible."
  },
  {
    q: "What about double time?",
    a: "Some states or employers pay 2× after certain thresholds (e.g., 12 hours/day in CA)."
  }
];

const relatedItems: RelatedItem[] = [
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track daily hours and breaks to calculate weekly overtime totals."
  },
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Convert your hourly rate to annual salary for job negotiations."
  },
  {
    title: "Overtime Rules by State",
    href: "/guides/overtime-rules",
    description: "Learn state-specific overtime thresholds and daily overtime rules."
  },
  {
    title: "California Overtime Rules",
    href: "/guides/overtime-rules/ca",
    description: "Daily overtime, double-time, and meal break requirements in California."
  }
];

// FAQ JSON-LD is rendered via <FaqJsonLd items={faqItems} />

export default function OvertimePayCalculatorPage() {
  return (
    <div className="space-y-8">
      <PageHeading
        title="Overtime Pay Calculator (2025)"
        subtitle="Calculate your weekly pay including overtime. Perfect for hourly workers tracking hours or employers calculating payroll."
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Calculators", url: "https://workpay.tools/calculators" },
        { name: "Overtime Pay", url: "https://workpay.tools/calculators/overtime-pay" },
      ])}

      <Suspense fallback={<div>Loading calculator...</div>}>
        <Calculator />
      </Suspense>
      <EmbedButton />
      <AdSlot id="overtime-calculator-results" />

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Regular hours = min(hours worked, overtime threshold)</li>
          <li>Overtime hours = max(0, hours worked − overtime threshold)</li>
          <li>Regular pay = regular hours × hourly rate</li>
          <li>Overtime pay = overtime hours × hourly rate × overtime multiplier</li>
          <li>Double-time pay = overtime hours × hourly rate × 2.0 (when enabled)</li>
          <li>Total pay = regular pay + overtime pay + double-time pay</li>
        </ul>
      </section>

      <AdSlot id="overtime-calculator-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related items={relatedItems} tool="overtime-pay" />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


