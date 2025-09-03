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
  title: "Free Overtime Pay Calculator 2025 | Calculate Overtime Hours & Pay",
  description:
    "Free overtime pay calculator for 2025. Calculate regular and overtime pay with state-specific rules. Supports federal and state overtime laws. No signup required.",
  keywords: ["overtime calculator", "overtime pay calculator", "overtime hours calculator", "calculate overtime pay", "overtime pay 2025", "federal overtime calculator", "state overtime rules"],
  openGraph: {
    title: "Free Overtime Pay Calculator 2025 | Calculate Overtime Hours & Pay",
    description: "Free overtime pay calculator for 2025. Calculate regular and overtime pay with state-specific rules. Supports federal and state overtime laws. No signup required.",
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
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Tax Year Disclaimer
            </h3>
            <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
              <p>
                All tax estimates are based on 2025 federal and state tax rates, brackets, and regulations. 
                Tax laws change frequently, and actual tax liability may vary based on your specific circumstances, 
                deductions, credits, and other factors. This calculator provides estimates only and should not be 
                considered as professional tax advice. Please consult with a qualified tax professional for 
                personalized tax planning and preparation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


