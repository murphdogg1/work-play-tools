import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";
import WebAppJsonLd from "@/lib/seo/appJsonLd";

export const metadata: Metadata = {
  title: "Free Payroll Calculator 2025 | Calculate Employee Pay & Taxes",
  description: "Free payroll calculator for 2025. Calculate employee pay, taxes, deductions, and net pay. Perfect for small businesses, HR professionals, and employers. No signup required.",
  keywords: ["payroll calculator", "free payroll calculator", "employee payroll calculator", "payroll tax calculator", "payroll calculator 2025", "small business payroll", "payroll software", "calculate payroll"],
  openGraph: {
    title: "Free Payroll Calculator 2025 | Calculate Employee Pay & Taxes",
    description: "Free payroll calculator for 2025. Calculate employee pay, taxes, deductions, and net pay. Perfect for small businesses, HR professionals, and employers. No signup required.",
    images: [
      {
        url: generateOgImageUrl("Free Payroll Calculator 2025", "Calculate employee pay, taxes, deductions, and net pay instantly"),
        width: 1200,
        height: 630,
        alt: "Free Payroll Calculator 2025 - Calculate Employee Pay & Taxes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Payroll Calculator 2025 | Calculate Employee Pay & Taxes",
    description: "Free payroll calculator for 2025. Calculate employee pay, taxes, deductions, and net pay instantly.",
    images: [generateOgImageUrl("Free Payroll Calculator 2025", "Calculate employee pay, taxes, deductions, and net pay instantly")],
  },
};

const relatedItems: RelatedItem[] = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    description: "Calculate net pay after all taxes and deductions"
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
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Convert hourly rates to annual salary"
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn the fundamentals of payroll processing"
  },
  {
    title: "Benefits & Deductions Guide",
    href: "/guides/benefits",
    description: "Understand employee benefits and deductions"
  }
];

const faqItems: FaqItem[] = [
  {
    q: "What is a payroll calculator?",
    a: "A payroll calculator is a tool that helps employers and HR professionals calculate employee pay, including gross pay, taxes, deductions, and net pay. It automates complex payroll calculations to ensure accuracy and compliance with tax laws."
  },
  {
    q: "Is this payroll calculator free to use?",
    a: "Yes! Our payroll calculator is completely free to use with no registration required. You can calculate payroll for as many employees as needed without any limits or hidden fees."
  },
  {
    q: "What taxes are included in the payroll calculation?",
    a: "Our calculator includes federal income tax, Social Security tax (6.2%), Medicare tax (1.45%), state income tax (where applicable), and local taxes. All calculations are based on current 2025 tax rates and regulations."
  },
  {
    q: "Can I use this for small business payroll?",
    a: "Absolutely! This payroll calculator is perfect for small businesses, startups, and HR professionals who need to calculate employee pay accurately. It handles all the essential payroll calculations you need."
  },
  {
    q: "How accurate are the payroll calculations?",
    a: "Our calculator uses current 2025 tax rates, brackets, and regulations from official sources like the IRS and state tax authorities. However, these are estimates and should not replace professional tax advice for complex situations."
  },
  {
    q: "Do you store my payroll data?",
    a: "No, we don't store any of your personal information or payroll data. All calculations are performed locally in your browser, ensuring your data remains private and secure."
  }
];

export default function PayrollCalculatorPage() {
  return (
    <div className="space-y-8">
      <PageHeading 
        title="Free Payroll Calculator 2025" 
        subtitle="Calculate employee pay, taxes, deductions, and net pay instantly. Perfect for small businesses, HR professionals, and employers." 
      />
      <WebAppJsonLd 
        name="Free Payroll Calculator"
        url="https://workpaytools.com/calculators/payroll"
        description="Free payroll calculator for 2025. Calculate employee pay, taxes, deductions, and net pay instantly."
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpaytools.com/" },
        { name: "Calculators", url: "https://workpaytools.com/calculators" },
        { name: "Payroll Calculator", url: "https://workpaytools.com/calculators/payroll" },
      ])}

      <AdSlot id="payroll-calculator-overview" />

      {/* Main Calculator Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Calculate Employee Payroll</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Use our comprehensive payroll calculator to determine gross pay, calculate all applicable taxes, 
          and compute net take-home pay for your employees. Perfect for small businesses and HR professionals.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Choose Your Calculator</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/calculators/take-home-pay"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Take-Home Pay Calculator</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Calculate net pay after all taxes and deductions
              </p>
            </Link>
            <Link
              href="/calculators/payroll-tax"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Payroll Tax Calculator</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Calculate federal and state payroll taxes
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How Our Payroll Calculator Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">1</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Enter Employee Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Input hourly rate, hours worked, filing status, and state of residence
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">2</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Calculate Taxes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically calculate federal, state, and local taxes using current 2025 rates
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">3</span>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Get Results</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View detailed breakdown of gross pay, taxes, deductions, and net pay
            </p>
          </div>
        </div>
      </section>

      <AdSlot id="payroll-calculator-features" />

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Payroll Calculator Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Current Tax Rates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uses 2025 federal and state tax rates for accurate calculations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">All 50 States</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Supports state-specific tax calculations for all US states
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Multiple Filing Statuses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Supports single, married, head of household, and other filing statuses
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Social Security & Medicare</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically calculates FICA taxes and Medicare contributions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Benefits & Deductions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Include health insurance, 401(k), and other pre-tax deductions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Detailed Breakdown</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See exactly how each tax and deduction affects take-home pay
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Calculation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Example Payroll Calculation</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sample Employee: $25/hour, 40 hours/week</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Gross Pay</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Regular Hours: 40 × $25 = $1,000</li>
                <li>• Overtime Hours: 0 × $37.50 = $0</li>
                <li>• <strong>Total Gross: $1,000</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Deductions</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Federal Tax: $89.20</li>
                <li>• Social Security: $62.00</li>
                <li>• Medicare: $14.50</li>
                <li>• State Tax: $45.00</li>
                <li>• <strong>Total Deductions: $210.70</strong></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 dark:text-white">Net Take-Home Pay:</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-lg">$789.30</span>
            </div>
          </div>
        </div>
      </section>

      <AdSlot id="payroll-calculator-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related items={relatedItems} tool="payroll-calculator" />
      
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
                This calculator uses 2025 tax rates and regulations. Tax laws change frequently, 
                and these calculations are estimates. For official tax filings or complex situations, 
                consult with a qualified tax professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
