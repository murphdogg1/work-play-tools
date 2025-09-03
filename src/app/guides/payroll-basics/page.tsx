import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import GuideLayout from "@/components/GuideLayout";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd, howToJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Payroll Basics Guide: Complete Processing Guide",
  description: "Master payroll processing with our complete guide. Learn cycles, calculations, compliance, and best practices for accurate payroll.",
  openGraph: {
    title: "Payroll Basics Guide: Complete Processing Guide",
    description: "Master payroll processing with our complete guide. Learn cycles, calculations, compliance, and best practices for accurate payroll.",
    images: [
      {
        url: generateOgImageUrl("Payroll Basics Guide", "Master payroll processing with our complete guide"),
        width: 1200,
        height: 630,
        alt: "Payroll Basics Guide - Master payroll processing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payroll Basics Guide: Complete Processing Guide",
    description: "Master payroll processing with our complete guide. Learn cycles, calculations, compliance, and best practices for accurate payroll.",
    images: [generateOgImageUrl("Payroll Basics Guide", "Master payroll processing with our complete guide")],
  },
};

const faqItems: FaqItem[] = [
  {
    q: "What's the difference between gross pay and net pay?",
    a: "Gross pay is total earnings before deductions. Net pay is what employees actually receive after taxes, benefits, and other deductions are subtracted."
  },
  {
    q: "How often should I run payroll?",
    a: "Most common cycles are bi-weekly (every 2 weeks) or semi-monthly (twice per month). Choose based on your business needs and state requirements."
  },
  {
    q: "What records do I need to keep for payroll?",
    a: "Keep time records, pay stubs, tax forms (W-2s, 1099s), and employment agreements for at least 3-4 years for tax and legal compliance."
  },
  {
    q: "Do I need payroll software for a small business?",
    a: "While possible to do manually, payroll software reduces errors, ensures compliance, and saves time. Consider it essential for businesses with 5+ employees."
  }
];

const relatedItems: RelatedItem[] = [
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Convert hourly rates to annual salary for payroll planning."
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay for hourly employees."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track employee hours and overtime for payroll processing."
  },
  {
    title: "Benefits & Deductions Guide",
    href: "/guides/benefits",
    description: "Learn about common payroll deductions and benefits."
  },
  {
    title: "Overtime Rules Guide",
    href: "/guides/overtime-rules",
    description: "Understand overtime thresholds and compliance requirements."
  },
  {
    title: "California Overtime Rules",
    href: "/guides/overtime-rules/ca",
    description: "Daily overtime, double-time, and meal break requirements in California."
  }
];

export default function PayrollBasicsGuide() {
  const breadcrumbs = [
    { title: "Guides", href: "/guides" },
    { title: "Payroll Basics" },
  ];

  return (
    <>
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpaytools.com/" },
        { name: "Guides", url: "https://workpaytools.com/guides" },
        { name: "Payroll Basics", url: "https://workpaytools.com/guides/payroll-basics" },
      ])}
      
      <PageHeading 
        title="Payroll Basics Guide" 
        subtitle="Everything you need to know about payroll processing, from cycles to compliance" 
      />

      <GuideLayout breadcrumbs={breadcrumbs}>
        <div className="space-y-8">



          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">What is Payroll?</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          Payroll is the process of calculating and distributing employee compensation. It includes wages, salaries, bonuses, and deductions for taxes, benefits, and other withholdings.
        </p>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Proper payroll management ensures employees are paid accurately and on time while maintaining compliance with labor laws and tax regulations.
            </p>
          </section>

          {/* Key Terms */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Key Payroll Terms</h2>
        
            <h3 className="text-lg font-medium tracking-tight">Gross Pay vs Net Pay</h3>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              <strong>Gross pay</strong> is the total amount earned before any deductions. This includes regular wages, overtime, bonuses, and commissions.
            </p>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              <strong>Net pay</strong> (take-home pay) is what employees receive after all deductions are subtracted from gross pay.
            </p>

            <h3 className="text-lg font-medium tracking-tight">Common Deductions</h3>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Deductions fall into two categories: <strong>mandatory</strong> (taxes, Social Security, Medicare) and <strong>voluntary</strong> (health insurance, retirement contributions, parking).
            </p>
          </section>

      {/* Steps Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">How to Process Payroll</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">Collect Time Records</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                Gather timesheets, timecards, or digital time tracking data. Use our <Link href="/calculators/timecard" className="text-blue-600 dark:text-blue-400 hover:underline">Timecard Calculator</Link> to track hours and overtime.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">Calculate Gross Pay</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                For hourly employees, multiply hours worked by hourly rate. Add overtime using our <Link href="/calculators/overtime-pay" className="text-blue-600 dark:text-blue-400 hover:underline">Overtime Pay Calculator</Link>. For salaried employees, divide annual salary by pay periods.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">Calculate Deductions</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                Subtract federal, state, and local taxes, Social Security (6.2%), Medicare (1.45%), and voluntary deductions like health insurance and retirement contributions.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">4</div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">Process Payments</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                Distribute net pay via direct deposit, paper checks, or payroll cards. Ensure payments are made on time according to your established payroll schedule.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-semibold">5</div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">File Tax Reports</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                Submit quarterly tax reports (Form 941) and annual reports (Form 940 for unemployment taxes). Provide W-2s to employees by January 31st.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HowTo JSON-LD */}
      {howToJsonLd({
        name: "How to Process Payroll",
        description: "A step-by-step guide to processing payroll for small businesses, including time tracking, calculations, deductions, and compliance.",
        steps: [
          {
            name: "Collect Time Records",
            text: "Gather timesheets, timecards, or digital time tracking data. Use our Timecard Calculator to track hours and overtime.",
            url: "https://workpaytools.com/calculators/timecard"
          },
          {
            name: "Calculate Gross Pay",
            text: "For hourly employees, multiply hours worked by hourly rate. Add overtime using our Overtime Pay Calculator. For salaried employees, divide annual salary by pay periods.",
            url: "https://workpaytools.com/calculators/overtime-pay"
          },
          {
            name: "Calculate Deductions",
            text: "Subtract federal, state, and local taxes, Social Security (6.2%), Medicare (1.45%), and voluntary deductions like health insurance and retirement contributions."
          },
          {
            name: "Process Payments",
            text: "Distribute net pay via direct deposit, paper checks, or payroll cards. Ensure payments are made on time according to your established payroll schedule."
          },
          {
            name: "File Tax Reports",
            text: "Submit quarterly tax reports (Form 941) and annual reports (Form 940 for unemployment taxes). Provide W-2s to employees by January 31st."
          }
        ],
        result: "First payroll processed successfully with accurate calculations and compliance"
      })}

      {/* Worked Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Worked Example</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          Let&apos;s calculate payroll for Sarah, an hourly employee who worked 45 hours at $25/hour in a bi-weekly pay period:
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-medium tracking-tight">Sarah&apos;s Bi-Weekly Payroll</h3>
          
          <div className="grid gap-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span>Regular hours (40 × $25):</span>
              <span className="font-medium">$1,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Overtime hours (5 × $37.50):</span>
              <span className="font-medium">$187.50</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Gross Pay:</span>
              <span className="font-medium">$1,187.50</span>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Federal Income Tax (15%):</span>
                <span>-$178.13</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Social Security (6.2%):</span>
                <span>-$73.63</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Medicare (1.45%):</span>
                <span>-$17.22</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>State Income Tax (5%):</span>
                <span>-$59.38</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Health Insurance:</span>
                <span>-$150.00</span>
              </div>
            </div>
            
            <div className="flex justify-between border-t pt-2 text-lg font-semibold">
              <span>Net Pay:</span>
              <span>$709.14</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            Use our <Link href="/calculators/overtime-pay" className="text-blue-600 dark:text-blue-400 hover:underline">Overtime Pay Calculator</Link> to verify these calculations.
          </p>
        </div>
      </section>

      {/* Payroll Cycles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Choosing a Payroll Cycle</h2>
        
        <h3 className="text-lg font-medium tracking-tight">Common Options</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium">Weekly (52 pay periods/year)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Best for hourly workers, construction, retail</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium">Bi-weekly (26 pay periods/year)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Most common, balances cost and frequency</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium">Semi-monthly (24 pay periods/year)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Good for salaried employees, consistent dates</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium">Monthly (12 pay periods/year)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Lowest cost, but may cause cash flow issues</p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Compliance Requirements</h2>
        
        <h3 className="text-lg font-medium tracking-tight">Federal Requirements</h3>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          All employers must withhold federal income tax, Social Security, and Medicare. File Form 941 quarterly and Form 940 annually for unemployment taxes.
        </p>

        <h3 className="text-lg font-medium tracking-tight">State Requirements</h3>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          State income tax withholding varies by state. Some states have no income tax, while others have complex rules. Check your state&apos;s labor department for specific requirements.
        </p>

        <h3 className="text-lg font-medium tracking-tight">Record Keeping</h3>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          Keep payroll records for at least 3-4 years. This includes time records, pay stubs, tax forms, and employment agreements. Digital records are acceptable if properly secured.
        </p>
      </section>

          <AdSlot id="payroll-basics-guide-faq" />
          {/* FAQ */}
          <FAQ items={faqItems} />
          <FaqJsonLd items={faqItems} />

          {/* Related Tools */}
          <Related items={relatedItems} tool="payroll-basics" />
          
          <p className="text-xs text-black/60 dark:text-white/60">This guide provides general information only and is not legal advice. Consult with a qualified professional for specific situations.</p>
        </div>
      </GuideLayout>
    </>
  );
}


