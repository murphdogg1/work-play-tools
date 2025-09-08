import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";
import WebAppJsonLd from "@/lib/seo/appJsonLd";
import Calculator from "./Calculator";
import EmbedButton from "./EmbedButton";

export const metadata: Metadata = {
  title: "Free Salary to Hourly Calculator 2025 | Convert Annual Salary to Hourly Rate",
  description: "Free salary to hourly calculator for 2025. Convert annual salary to hourly rate instantly. Perfect for contract negotiations, freelance pricing, and salary comparisons. No signup required.",
  keywords: ["salary to hourly calculator", "annual salary to hourly rate", "convert salary to hourly", "salary converter", "hourly rate calculator", "salary breakdown calculator", "annual to hourly converter"],
  openGraph: {
    title: "Free Salary to Hourly Calculator 2025 | Convert Annual Salary to Hourly Rate",
    description: "Free salary to hourly calculator for 2025. Convert annual salary to hourly rate instantly. Perfect for contract negotiations, freelance pricing, and salary comparisons. No signup required.",
    images: [
      {
        url: generateOgImageUrl("Salary to Hourly Calculator 2025", "Convert annual salary to hourly rate instantly. Perfect for contract negotiations and freelance pricing."),
        width: 1200,
        height: 630,
        alt: "Salary to Hourly Calculator 2025 - Convert annual salary to hourly rate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Salary to Hourly Calculator 2025 | Convert Annual Salary to Hourly Rate",
    description: "Free salary to hourly calculator for 2025. Convert annual salary to hourly rate instantly. Perfect for contract negotiations, freelance pricing, and salary comparisons. No signup required.",
    images: [generateOgImageUrl("Salary to Hourly Calculator 2025", "Convert annual salary to hourly rate instantly. Perfect for contract negotiations and freelance pricing.")],
  },
};

const faqItems: FaqItem[] = [
  { 
    q: "How do you convert salary to hourly rate?", 
    a: "Divide annual salary by 2,080 hours (40 hours/week × 52 weeks). For example: $60,000 ÷ 2,080 = $28.85/hour." 
  },
  { 
    q: "What's the difference between salary and hourly pay?", 
    a: "Salary is fixed annual compensation regardless of hours worked. Hourly pay varies based on actual hours worked and may include overtime." 
  },
  { 
    q: "Should I include benefits in salary calculations?", 
    a: "For accurate comparisons, consider total compensation including health insurance, retirement contributions, and other benefits." 
  },
  { 
    q: "How do part-time hours affect the calculation?", 
    a: "For part-time work, divide annual salary by actual hours worked per year. A $30,000 salary at 20 hours/week = $30,000 ÷ 1,040 = $28.85/hour." 
  },
];

const relatedItems: RelatedItem[] = [
  {
    title: "Hourly to Salary Calculator",
    href: "/calculators/hourly-to-salary",
    description: "Convert hourly rates to annual salary for payroll planning and job comparisons."
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    description: "Calculate net pay after taxes and deductions for accurate salary planning."
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay for hourly employees and contractors."
  },
  {
    title: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax",
    description: "Calculate FICA, Medicare, and Social Security taxes for payroll processing."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn the fundamentals of payroll processing and salary calculations."
  },
  {
    title: "Benefits & Deductions Guide",
    href: "/guides/benefits",
    description: "Understand how benefits and deductions affect your total compensation."
  }
];

export default function SalaryToHourlyPage() {
  return (
    <div className="space-y-6">
      <PageHeading 
        title="Salary → Hourly Calculator" 
        subtitle="Convert your annual salary to an hourly rate. Essential for contract negotiations, freelance pricing, and comparing compensation packages." 
      />
      <WebAppJsonLd 
        name="Salary to Hourly Calculator"
        url="https://www.workpaytools.com/calculators/salary-to-hourly"
        description="Convert your annual salary to an hourly rate. Essential for contract negotiations, freelance pricing, and comparing compensation packages."
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Calculators", url: "https://www.workpaytools.com/calculators" },
        { name: "Salary to Hourly", url: "https://www.workpaytools.com/calculators/salary-to-hourly" },
      ])}
      
      <Suspense fallback={<div>Loading calculator...</div>}>
        <Calculator />
      </Suspense>
      <EmbedButton />
      <AdSlot id="salary-hourly-calculator-results" />
      
      <section>
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="mt-2 list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Standard calculation: Annual salary ÷ 2,080 hours (40 hours/week × 52 weeks)</li>
          <li>Part-time calculation: Annual salary ÷ (hours per week × 52 weeks)</li>
          <li>Contract work: Consider additional costs like benefits, taxes, and business expenses</li>
          <li>Freelance pricing: Add 25-50% markup to cover overhead and profit margin</li>
        </ul>
      </section>
      
      <AdSlot id="salary-hourly-calculator-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related items={relatedItems} tool="salary-to-hourly" />
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Important Note
            </h3>
            <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
              <p>
                This calculator provides estimates based on standard 2,080 work hours per year. 
                Actual hourly rates may vary based on benefits, overtime policies, and specific employment terms. 
                Always consult with HR or your employer for precise calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
