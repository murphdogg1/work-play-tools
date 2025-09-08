import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import WebAppJsonLd from "@/lib/seo/appJsonLd";
import PaystubGenerator from "./PaystubGenerator";
import EmbedButton from "./EmbedButton";

export const metadata: Metadata = generateCalculatorMetadata(
  "Paystub Generator",
  "Create professional ADP-style pay stubs instantly. Generate accurate pay stubs with all necessary deductions and calculations.",
  "/calculators/paystub-generator"
);

const faqItems: FaqItem[] = [
  {
    q: "Is this paystub generator free to use?",
    a: "Yes, our paystub generator is completely free with no signup required. You can create unlimited pay stubs."
  },
  {
    q: "Do the generated pay stubs look like real ADP paystubs?",
    a: "Yes, our generator creates pay stubs with the same layout, formatting, and sections as professional ADP paystubs."
  },
  {
    q: "Can I use these pay stubs for official purposes?",
    a: "These are for reference and demonstration purposes. For official payroll documentation, consult with your employer or payroll provider."
  },
  {
    q: "What information do I need to create a paystub?",
    a: "You'll need employee details, pay period dates, hours worked, hourly rate or salary, and any deductions or benefits."
  }
];

const relatedItems: RelatedItem[] = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    description: "Calculate your net pay after taxes and deductions"
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay with state-specific rules"
  },
  {
    title: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax",
    description: "Calculate federal and state payroll taxes"
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track hours worked and calculate weekly totals"
  }
];

export default function PaystubGeneratorPage() {
  return (
    <div className="space-y-4">
      <PageHeading
        title="Paystub Generator"
        subtitle="Create professional ADP-style pay stubs instantly. Perfect for employees, contractors, and small businesses."
      />
      <WebAppJsonLd 
        name="Paystub Generator"
        url="https://www.workpaytools.com/calculators/paystub-generator"
        description="Create professional ADP-style pay stubs instantly"
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Calculators", url: "https://www.workpaytools.com/calculators" },
        { name: "Paystub Generator", url: "https://www.workpaytools.com/calculators/paystub-generator" },
      ])}

      <Suspense fallback={<div>Loading paystub generator...</div>}>
        <PaystubGenerator />
      </Suspense>
      <EmbedButton />
      <AdSlot id="paystub-generator-results" />

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Enter employee information and pay period details</li>
          <li>Add hours worked, hourly rate, or salary information</li>
          <li>Include deductions, benefits, and tax withholdings</li>
          <li>Generate a professional ADP-style paystub instantly</li>
          <li>Download or print your paystub for records</li>
        </ul>
      </section>

      <AdSlot id="paystub-generator-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related pageKey="paystub-generator" tool="paystub-generator" />
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Important Notice
            </h3>
            <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
              <p>
                This paystub generator creates realistic-looking pay stubs for reference and demonstration purposes only. 
                For official payroll documentation, always use your employer's official payroll system or consult with 
                a qualified payroll professional. These generated pay stubs should not be used for tax purposes or 
                official employment verification.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-black/60 dark:text-white/60">For reference purposes only; not official payroll documentation.</p>
    </div>
  );
}
