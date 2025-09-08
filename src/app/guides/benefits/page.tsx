import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import GuideLayout from "@/components/GuideLayout";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Benefits & Deductions Guide",
  description: "Learn about employee benefits, deductions, and their impact on take-home pay. Get accurate calculations, state-specific rules, and expert guidance.",
  openGraph: {
    title: "Benefits & Deductions Guide",
    description: "Learn about employee benefits, deductions, and their impact on take-home pay. Get accurate calculations, state-specific rules, and expert guidance.",
    url: "https://www.workpaytools.com/guides/benefits",
    type: "website",
    siteName: "WorkPayTools",
    images: [
      {
        url: generateOgImageUrl("Benefits & Deductions Guide", "Learn about employee benefits, deductions, and their impact on take-home pay."),
        width: 1200,
        height: 630,
        alt: "Benefits & Deductions Guide - Learn about employee benefits, deductions, and their impact on take-home pay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benefits & Deductions Guide",
    description: "Learn about employee benefits, deductions, and their impact on take-home pay. Get accurate calculations, state-specific rules, and expert guidance.",
    images: [generateOgImageUrl("Benefits & Deductions Guide", "Learn about employee benefits, deductions, and their impact on take-home pay.")],
  },
  alternates: {
    canonical: "https://www.workpaytools.com/guides/benefits",
  },
};

const faqItems: FaqItem[] = [
  {
    q: "What's the difference between pre-tax and post-tax deductions?",
    a: "Pre-tax deductions reduce your taxable income (like 401(k) contributions and health insurance premiums), while post-tax deductions are taken after taxes are calculated (like union dues or charitable contributions)."
  },
  {
    q: "How much should I contribute to my 401(k)?",
    a: "Financial experts recommend contributing at least enough to get your employer's full match, then aim for 10-15% of your income. The 2024 contribution limit is $23,000 for employees under 50."
  },
  {
    q: "What is a Health Savings Account (HSA)?",
    a: "An HSA is a tax-advantaged account for medical expenses. Contributions are pre-tax, grow tax-free, and withdrawals for qualified medical expenses are tax-free. You must have a high-deductible health plan to qualify."
  },
  {
    q: "Can I change my benefit elections during the year?",
    a: "Generally, you can only change benefits during open enrollment or after a qualifying life event (marriage, birth, job loss, etc.). Some benefits like 401(k) contributions can often be changed more frequently."
  }
];

const relatedItems: RelatedItem[] = [
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Calculate gross pay before benefits and deductions are applied."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn how benefits and deductions fit into payroll processing."
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay before benefits and deductions."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track hours worked to determine benefit eligibility and accrual."
  },
  {
    title: "PTO Policy Template",
    href: "/hr-templates/pto-policy",
    description: "Create a comprehensive paid time off policy for your organization."
  },
  {
    title: "Offer Letter Template",
    href: "/hr-templates/offer-letter",
    description: "Include benefits information in your job offer letters."
  }
];

export default function BenefitsGuide() {
  const breadcrumbs = [
    { title: "Guides", href: "/guides" },
    { title: "Benefits & Deductions" },
  ];

  return (
    <>
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Guides", url: "https://www.workpaytools.com/guides" },
        { name: "Benefits & Deductions", url: "https://www.workpaytools.com/guides/benefits" },
      ])}
      
      <PageHeading title="Benefits & Deductions" subtitle="Health, retirement, and other common programs" />
      
      <GuideLayout breadcrumbs={breadcrumbs}>
        <div className="space-y-8">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">What Are Employee Benefits?</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Employee benefits are non-wage compensation provided to employees in addition to their regular salary or wages. These benefits can include health insurance, retirement plans, paid time off, and other perks that enhance the overall compensation package.
            </p>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Benefits serve multiple purposes: attracting and retaining talent, improving employee satisfaction, and providing financial security. They also offer tax advantages for both employers and employees.
            </p>
          </section>

          {/* Types of Benefits */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Types of Employee Benefits</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Health & Wellness</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Health insurance (medical, dental, vision)</li>
                  <li>• Health Savings Accounts (HSA)</li>
                  <li>• Flexible Spending Accounts (FSA)</li>
                  <li>• Wellness programs</li>
                  <li>• Mental health benefits</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Retirement & Financial</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 401(k) plans with employer matching</li>
                  <li>• Pension plans</li>
                  <li>• Life insurance</li>
                  <li>• Disability insurance</li>
                  <li>• Financial planning services</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Time Off & Work-Life</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Paid time off (PTO)</li>
                  <li>• Sick leave</li>
                  <li>• Parental leave</li>
                  <li>• Flexible work arrangements</li>
                  <li>• Remote work options</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Professional Development</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Tuition reimbursement</li>
                  <li>• Training programs</li>
                  <li>• Conference attendance</li>
                  <li>• Professional memberships</li>
                  <li>• Career development coaching</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Deductions Overview */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Understanding Payroll Deductions</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Payroll deductions are amounts withheld from an employee&apos;s gross pay. They fall into two main categories: mandatory (required by law) and voluntary (chosen by the employee).
            </p>
          </section>

          {/* Mandatory Deductions */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Mandatory Deductions</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              These deductions are required by federal, state, and local laws and cannot be waived by employees.
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold">Federal Income Tax</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Withheld based on employee&apos;s W-4 form and IRS tax tables. Rates range from 10% to 37% based on income and filing status.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold">Social Security Tax</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  6.2% of wages up to $168,600 (2024 wage base). Employers also contribute 6.2%.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold">Medicare Tax</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1.45% of all wages. Additional 0.9% for high earners ($200,000+ for single filers). No wage base limit.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold">State Income Tax</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Varies by state. Some states have no income tax, while others have rates up to 13.3%.
                </p>
              </div>
            </div>
          </section>

          {/* Voluntary Deductions */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Voluntary Deductions</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              These deductions are chosen by employees and can be pre-tax or post-tax, affecting the employee&apos;s taxable income.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700 dark:text-green-400">Pre-Tax Deductions</h3>
                <div className="space-y-2">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                    <h4 className="font-medium">Health Insurance Premiums</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reduce taxable income, saving on taxes</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                    <h4 className="font-medium">401(k) Contributions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Up to $23,000 (2024) for employees under 50</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                    <h4 className="font-medium">HSA Contributions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Up to $4,300 individual, $8,600 family (2024)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400">Post-Tax Deductions</h3>
                <div className="space-y-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <h4 className="font-medium">Roth 401(k) Contributions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">After-tax contributions for tax-free growth</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <h4 className="font-medium">Union Dues</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Membership fees for labor organizations</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <h4 className="font-medium">Charitable Contributions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Workplace giving programs</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Impact Example */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Tax Impact Example</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Here&apos;s how pre-tax deductions can save money on taxes:
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Employee Earning $60,000 Annually</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span>Gross Annual Salary:</span>
                  <span className="font-medium">$60,000</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Pre-tax 401(k) contribution (10%):</span>
                  <span>-$6,000</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Health insurance premium:</span>
                  <span>-$3,600</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Taxable Income:</span>
                  <span className="font-medium">$50,400</span>
                </div>
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Tax Savings (22% bracket):</span>
                  <span className="font-medium">$2,112</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                By contributing to pre-tax benefits, this employee saves $2,112 in taxes while building retirement savings and maintaining health coverage.
              </p>
            </div>
          </section>

          {/* Compliance Requirements */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Compliance Requirements</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Employer Responsibilities</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Withhold correct amounts for all mandatory deductions</li>
                  <li>• Process voluntary deductions as authorized</li>
                  <li>• Provide clear pay stubs showing all deductions</li>
                  <li>• File required tax forms (941, W-2, etc.)</li>
                  <li>• Maintain accurate records for audits</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Employee Rights</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Receive detailed pay stubs</li>
                  <li>• Change voluntary deductions during open enrollment</li>
                  <li>• Access benefit information and enrollment materials</li>
                  <li>• Appeal denied benefit claims</li>
                  <li>• Receive COBRA notices when eligible</li>
                </ul>
              </div>
            </div>
          </section>

          <AdSlot id="benefits-guide-content" />
          
          {/* FAQ */}
          <FAQ items={faqItems} />
          <FaqJsonLd items={faqItems} />

          {/* References */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">References & Sources</h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>IRS Publication 15-B:</strong> Employer&apos;s Tax Guide to Fringe Benefits</li>
                <li>• <strong>Department of Labor:</strong> Employee Benefits Security Administration</li>
                <li>• <strong>IRS Publication 525:</strong> Taxable and Nontaxable Income</li>
                <li>• <strong>Social Security Administration:</strong> 2024 Social Security Changes</li>
                <li>• <strong>Bureau of Labor Statistics:</strong> Employee Benefits Survey</li>
                <li>• <strong>Internal Revenue Code Section 125:</strong> Cafeteria Plans</li>
                <li>• <strong>ERISA (Employee Retirement Income Security Act):</strong> Federal law governing employee benefit plans</li>
              </ul>
            </div>
          </section>

          <Related items={relatedItems} tool="benefits" />
          
          <p className="text-xs text-black/60 dark:text-white/60">
            This guide provides general information only and is not legal or tax advice. Consult with qualified professionals for specific situations.
          </p>
        </div>
      </GuideLayout>
    </>
  );
}


