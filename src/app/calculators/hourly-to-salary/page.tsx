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
  title: "Free Hourly to Salary Calculator 2025 | Convert Hourly Rate to Annual Pay",
  description: "Free hourly to salary calculator for 2025. Convert hourly pay to annual, monthly, and weekly salary instantly. Perfect for job negotiations and salary comparisons. No signup required.",
  keywords: ["hourly to salary calculator", "hourly rate to salary", "convert hourly to annual salary", "hourly wage calculator", "salary converter", "hourly pay calculator", "annual salary calculator"],
  openGraph: {
    title: "Free Hourly to Salary Calculator 2025 | Convert Hourly Rate to Annual Pay",
    description: "Free hourly to salary calculator for 2025. Convert hourly pay to annual, monthly, and weekly salary instantly. Perfect for job negotiations and salary comparisons. No signup required.",
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
        { name: "Home", url: "https://workpaytools.com/" },
        { name: "Calculators", url: "https://workpaytools.com/calculators" },
        { name: "Hourly to Salary", url: "https://workpaytools.com/calculators/hourly-to-salary" },
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


