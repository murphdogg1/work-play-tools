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
  title: "Hourly to Salary Calculator",
  description: "Convert hourly pay to annual, monthly, and weekly salary.",
  openGraph: {
    title: "Hourly to Salary Calculator",
    description: "Convert hourly pay to annual, monthly, and weekly salary.",
    images: [
      {
        url: generateOgImageUrl("Hourly to Salary Calculator", "Convert hourly pay to annual, monthly, and weekly salary."),
        width: 1200,
        height: 630,
        alt: "Hourly to Salary Calculator - Convert hourly pay to annual, monthly, and weekly salary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hourly to Salary Calculator",
    description: "Convert hourly pay to annual, monthly, and weekly salary.",
    images: [generateOgImageUrl("Hourly to Salary Calculator", "Convert hourly pay to annual, monthly, and weekly salary.")],
  },
};

const faqItems: FaqItem[] = [
  { q: "Why 2,080 hours?", a: "40 hours × 52 weeks = 2,080. Adjust for PTO, holidays, and overtime if applicable." },
  { q: "Does this include taxes?", a: "No, results are gross pay. See our Take-Home Pay Estimator for net." },
  { q: "Can I include overtime?", a: "Multiply your average weekly OT hours by the OT rate and add to annual." },
];

const relatedItems: RelatedItem[] = [
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate weekly pay including overtime at 1.5× or 2× rates."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track your actual hours worked to verify salary calculations."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn the fundamentals of payroll cycles and gross vs net pay."
  },
  {
    title: "Benefits & Deductions",
    href: "/guides/benefits",
    description: "Understand how benefits and deductions affect your take-home pay."
  }
];

export default function HourlyToSalaryPage() {
  return (
    <div className="space-y-8">
      <PageHeading title="Hourly → Salary" subtitle="Convert your hourly rate to annual salary. Essential for job negotiations, budgeting, and comparing offers." />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Calculators", url: "https://workpay.tools/calculators" },
        { name: "Hourly to Salary", url: "https://workpay.tools/calculators/hourly-to-salary" },
      ])}
      <Suspense fallback={<div>Loading calculator...</div>}>
        <Calculator />
      </Suspense>
      <EmbedButton />
      <AdSlot id="hourly-salary-calculator-results" />
      <section>
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="mt-2 list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Weekly pay = hourly rate × hours per week</li>
          <li>Annual salary = hourly rate × hours per week × weeks per year</li>
          <li>Monthly salary = annual salary ÷ 12</li>
          <li>Standard full-time: 40 hours/week × 52 weeks = 2,080 hours/year</li>
        </ul>
      </section>
      <AdSlot id="hourly-salary-calculator-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related items={relatedItems} tool="hourly-to-salary" />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


