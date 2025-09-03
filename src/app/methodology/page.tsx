import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Methodology - How Our Calculators Work | WorkPayTools",
  description: "Learn how our payroll calculators work, our data sources, formulas, and update cadence. Transparent methodology for accurate payroll calculations.",
  openGraph: {
    title: "Methodology - How Our Calculators Work | WorkPayTools",
    description: "Learn how our payroll calculators work, our data sources, formulas, and update cadence. Transparent methodology for accurate payroll calculations.",
    images: [
      {
        url: generateOgImageUrl("Methodology", "How our payroll calculators work and our data sources"),
        width: 1200,
        height: 630,
        alt: "Methodology - How Our Calculators Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology - How Our Calculators Work | WorkPayTools",
    description: "Learn how our payroll calculators work, our data sources, formulas, and update cadence.",
    images: [generateOgImageUrl("Methodology", "How our payroll calculators work and our data sources")],
  },
};

export default function MethodologyPage() {
  return (
    <div className="space-y-8">
      <PageHeading 
        title="Methodology" 
        subtitle="How our calculators work, our data sources, and our commitment to accuracy" 
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpaytools.com/" },
        { name: "Methodology", url: "https://workpaytools.com/methodology" },
      ])}

      <AdSlot id="methodology-overview" />

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Our calculators are built with accuracy and transparency in mind. We use current tax rates, 
          labor laws, and official government data to ensure our calculations are reliable and up-to-date. 
          This page explains our methodology, data sources, and how we maintain accuracy.
        </p>
      </section>

      {/* Calculator Formulas */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Calculator Formulas</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Overtime Pay Calculator</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Regular Pay:</strong> Hours ≤ 40 × Hourly Rate</p>
              <p><strong>Overtime Pay:</strong> Hours &gt; 40 × Hourly Rate × 1.5</p>
              <p><strong>Daily Overtime (CA):</strong> Hours &gt; 8 in a day × Hourly Rate × 1.5</p>
              <p><strong>Double Time (CA):</strong> Hours &gt; 12 in a day × Hourly Rate × 2.0</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Take-Home Pay Calculator</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Federal Income Tax:</strong> Based on 2025 tax brackets and standard deduction ($14,600 single, $29,200 married)</p>
              <p><strong>Social Security:</strong> 6.2% on wages up to $168,600</p>
              <p><strong>Medicare:</strong> 1.45% on all wages (2.35% on wages &gt; $200,000)</p>
              <p><strong>State Tax:</strong> Varies by state using current 2025 rates</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Salary to Hourly Converter</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>Annual to Hourly:</strong> Annual Salary ÷ (Hours per Week × Weeks per Year)</p>
              <p><strong>Default Assumptions:</strong> 40 hours/week, 52 weeks/year = 2,080 hours</p>
              <p><strong>Monthly Rate:</strong> Annual Salary ÷ 12</p>
              <p><strong>Weekly Rate:</strong> Annual Salary ÷ 52</p>
            </div>
          </div>
        </div>
      </section>

      <AdSlot id="methodology-sources" />

      {/* Data Sources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Data Sources</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Federal Tax Data</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• IRS Publication 15-T (2025) - Federal Income Tax Withholding</li>
              <li>• Social Security Administration - Current wage base and rates</li>
              <li>• Medicare tax rates and thresholds</li>
              <li>• Standard deduction amounts for 2025</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">State Tax Data</h3>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• State department of revenue websites</li>
              <li>• State tax withholding tables and rates</li>
              <li>• Local tax rates where applicable</li>
              <li>• State-specific deductions and exemptions</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Labor Law Data</h3>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Department of Labor - Fair Labor Standards Act (FLSA)</li>
              <li>• State labor department websites</li>
              <li>• Minimum wage rates by state and locality</li>
              <li>• Overtime rules and exemptions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Update Cadence */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Update Cadence</h2>
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Annual Updates</h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• Federal tax brackets and standard deductions (January)</li>
              <li>• Social Security wage base and rates (January)</li>
              <li>• State tax rates and brackets (as published)</li>
              <li>• Minimum wage rates (as they change)</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">As Needed Updates</h3>
            <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
              <li>• New state or local tax changes</li>
              <li>• Labor law updates and court decisions</li>
              <li>• Minimum wage increases</li>
              <li>• New overtime rules or exemptions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accuracy Disclaimer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accuracy & Limitations</h2>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Important Disclaimer
              </h3>
              <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                <p>
                  Our calculators provide estimates based on current tax rates and labor laws. 
                  These calculations should not be considered as professional tax or legal advice. 
                  For complex situations, unusual circumstances, or official tax filings, 
                  please consult with a qualified tax professional or attorney.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Corrections */}
      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Report Issues</h2>
        <p className="text-indigo-800 dark:text-indigo-200 mb-4">
          Found an error or have a suggestion for improvement? We take accuracy seriously and 
          appreciate your feedback to help us maintain the highest standards.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
