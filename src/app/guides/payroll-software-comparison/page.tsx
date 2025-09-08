import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Best Payroll Software 2025 | Complete Comparison Guide",
  description: "Compare the best payroll software for 2025. Detailed reviews of QuickBooks, ADP, Gusto, Paychex, and more. Find the perfect payroll solution for your business size and budget.",
  keywords: ["best payroll software", "payroll software comparison", "payroll software 2025", "QuickBooks payroll", "ADP payroll", "Gusto payroll", "Paychex payroll", "small business payroll software"],
  openGraph: {
    title: "Best Payroll Software 2025 | Complete Comparison Guide",
    description: "Compare the best payroll software for 2025. Detailed reviews of QuickBooks, ADP, Gusto, Paychex, and more. Find the perfect payroll solution for your business size and budget.",
    images: [
      {
        url: generateOgImageUrl("Best Payroll Software 2025", "Complete comparison guide of top payroll software solutions for businesses of all sizes."),
        width: 1200,
        height: 630,
        alt: "Best Payroll Software 2025 - Complete Comparison Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Payroll Software 2025 | Complete Comparison Guide",
    description: "Compare the best payroll software for 2025. Detailed reviews of QuickBooks, ADP, Gusto, Paychex, and more. Find the perfect payroll solution for your business size and budget.",
    images: [generateOgImageUrl("Best Payroll Software 2025", "Complete comparison guide of top payroll software solutions for businesses of all sizes.")],
  },
};

const faqItems: FaqItem[] = [
  { 
    q: "What's the best payroll software for small businesses?", 
    a: "For small businesses (1-50 employees), Gusto and QuickBooks Payroll offer the best combination of features, ease of use, and affordability. Both provide full-service payroll with tax filing and employee self-service portals." 
  },
  { 
    q: "How much does payroll software cost?", 
    a: "Payroll software typically costs $20-200+ per month plus $2-15 per employee. Basic plans start around $20/month, while enterprise solutions can cost $200+/month with additional per-employee fees." 
  },
  { 
    q: "What features should I look for in payroll software?", 
    a: "Essential features include automated tax calculations, direct deposit, tax filing, employee self-service, time tracking integration, benefits administration, and compliance reporting." 
  },
  { 
    q: "Can I switch payroll software mid-year?", 
    a: "Yes, but it's easier to switch at the beginning of a new year or quarter. Plan the transition carefully, ensure all tax filings are complete, and coordinate with your new provider for a smooth transfer." 
  },
];

const relatedItems: RelatedItem[] = [
  {
    title: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax",
    description: "Calculate FICA, Medicare, and Social Security taxes for payroll processing."
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    description: "Calculate net pay after taxes and deductions for accurate payroll planning."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn the fundamentals of payroll processing and compliance requirements."
  },
  {
    title: "Benefits & Deductions Guide",
    href: "/guides/benefits",
    description: "Understand how benefits and deductions affect payroll processing."
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay for hourly employees and contractors."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track employee hours and overtime for payroll processing."
  }
];

export default function PayrollSoftwareComparisonPage() {
  return (
    <div className="space-y-8">
      <PageHeading 
        title="Best Payroll Software 2025" 
        subtitle="Complete comparison guide to help you choose the perfect payroll solution for your business" 
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Guides", url: "https://www.workpaytools.com/guides" },
        { name: "Payroll Software Comparison", url: "https://www.workpaytools.com/guides/payroll-software-comparison" },
      ])}
      
      <AdSlot id="payroll-software-comparison-intro" />
      
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Top Payroll Software for 2025</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">1. Gusto - Best for Small Businesses</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                <ul className="text-sm space-y-1">
                  <li>• User-friendly interface</li>
                  <li>• Excellent customer support</li>
                  <li>• Built-in benefits administration</li>
                  <li>• Automatic tax filing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Limited advanced reporting</li>
                  <li>• Higher cost for larger teams</li>
                  <li>• Limited international support</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>Pricing:</strong> Starting at $40/month + $6/employee
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">2. QuickBooks Payroll - Best Integration</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Seamless QuickBooks integration</li>
                  <li>• Comprehensive reporting</li>
                  <li>• Mobile app available</li>
                  <li>• Time tracking included</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Requires QuickBooks subscription</li>
                  <li>• Can be complex for beginners</li>
                  <li>• Limited customization options</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>Pricing:</strong> Starting at $45/month + $5/employee
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">3. ADP - Best for Enterprise</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Comprehensive HR suite</li>
                  <li>• Advanced analytics</li>
                  <li>• Global payroll support</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Expensive for small businesses</li>
                  <li>• Complex setup process</li>
                  <li>• Long-term contracts required</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>Pricing:</strong> Custom pricing based on business size
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">How to Choose the Right Payroll Software</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Business Size</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Small businesses (1-50 employees) benefit from simple, affordable solutions like Gusto. 
              Mid-size companies (50-500 employees) need more features and integrations. 
              Large enterprises (500+ employees) require comprehensive HR suites with advanced analytics.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">2. Budget Considerations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consider both monthly fees and per-employee costs. Factor in setup fees, 
              training costs, and potential integration expenses. Look for transparent pricing 
              without hidden fees or long-term contracts.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">3. Required Features</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Essential features include automated tax calculations, direct deposit, 
              tax filing, and employee self-service. Advanced features might include 
              time tracking, benefits administration, and compliance reporting.
            </p>
          </div>
        </div>
      </section>

      <AdSlot id="payroll-software-comparison-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <Related items={relatedItems} tool="payroll-software-comparison" />
    </div>
  );
}
