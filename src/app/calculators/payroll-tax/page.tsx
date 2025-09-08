import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import PayrollTaxCalculator from "./Calculator";
import { generateOgImageUrl } from "@/lib/og";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import WebAppJsonLd from "@/lib/seo/appJsonLd";

export const metadata: Metadata = generateCalculatorMetadata(
  "Payroll Tax Calculator",
  "Calculate federal, state, and local payroll taxes for employees. Includes FICA, Medicare, and Social Security taxes.",
  "/calculators/payroll-tax"
);

export default function PayrollTaxPage() {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/calculators", label: "Calculators" }, { label: "Payroll Tax" }]} />
      <PageHeading 
        title="Payroll Tax Calculator" 
        subtitle="Calculate federal, state, and local tax withholdings" 
      />
      <WebAppJsonLd 
        name="Payroll Tax Calculator"
        url="https://www.workpaytools.com/calculators/payroll-tax"
        description="Calculate federal, state, and local payroll taxes for employees"
      />
      <AdSlot id="payroll-tax-calculator" />
      <PayrollTaxCalculator />
      
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
    </div>
  );
}
