import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "All Calculators - WorkPayTools",
  description: "Browse all our free payroll and HR calculators. Calculate overtime pay, take-home pay, minimum wage, payroll taxes, and more.",
  openGraph: {
    title: "All Calculators - WorkPayTools",
    description: "Browse all our free payroll and HR calculators. Calculate overtime pay, take-home pay, minimum wage, payroll taxes, and more.",
    url: "https://www.workpaytools.com/calculators",
    type: "website",
    siteName: "WorkPayTools",
    images: [
      {
        url: generateOgImageUrl("All Calculators", "Browse all our free payroll and HR calculators"),
        width: 1200,
        height: 630,
        alt: "All Calculators - Browse all our free payroll and HR calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Calculators - WorkPayTools",
    description: "Browse all our free payroll and HR calculators. Calculate overtime pay, take-home pay, minimum wage, payroll taxes, and more.",
    images: [generateOgImageUrl("All Calculators", "Browse all our free payroll and HR calculators")],
  },
  alternates: {
    canonical: "https://www.workpaytools.com/calculators",
  },
};

const calculators = [
  {
    title: "Payroll Calculator",
    href: "/calculators/payroll",
    description: "Comprehensive payroll calculator for employee pay, taxes, and deductions. Perfect for small businesses and HR professionals.",
    features: ["Employee pay calculation", "Tax calculations", "Benefits & deductions", "Net pay breakdown"],
    category: "Payroll",
    icon: "💰"
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay for hourly employees. Supports federal and state overtime rules including daily overtime.",
    features: ["Federal & state overtime rules", "Daily overtime calculations", "Double-time pay", "Multiple pay periods"],
    category: "Payroll",
    icon: "⏰"
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    description: "Calculate your net take-home pay after all taxes, benefits, and deductions. See exactly what you'll receive.",
    features: ["Federal & state tax calculations", "Social Security & Medicare", "Health insurance & 401(k)", "Multiple filing statuses"],
    category: "Payroll",
    icon: "💰"
  },
  {
    title: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax",
    description: "Calculate federal, state, and local payroll taxes for employees. Get accurate tax withholding amounts.",
    features: ["Federal income tax", "State tax calculations", "Social Security & Medicare", "Employer tax estimates"],
    category: "Payroll",
    icon: "📊"
  },
  {
    title: "Paystub Generator",
    href: "/calculators/paystub-generator",
    description: "Create professional ADP-style pay stubs instantly. Generate realistic pay stubs for employees, contractors, or personal use.",
    features: ["ADP-style formatting", "Employee & employer info", "Earnings & deductions", "Print & download"],
    category: "Payroll",
    icon: "📄"
  },
  {
    title: "Minimum Wage Calculator",
    href: "/calculators/minimum-wage",
    description: "Calculate minimum wage rates by state and city. Compare federal vs state minimum wages and overtime pay.",
    features: ["State-by-state rates", "City minimum wages", "Overtime calculations", "Annual salary equivalents"],
    category: "Compliance",
    icon: "🏛️"
  },
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Convert hourly rates to annual salary equivalents. Perfect for comparing job offers and budgeting.",
    features: ["Multiple pay periods", "Overtime considerations", "Annual salary conversion", "Tax implications"],
    category: "Conversion",
    icon: "🔄"
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track work hours and calculate totals. Perfect for freelancers, contractors, and hourly employees.",
    features: ["Daily time tracking", "Weekly summaries", "Overtime detection", "Export capabilities"],
    category: "Time Tracking",
    icon: "📅"
  }
];

const categories = [
  { name: "Payroll", description: "Calculate pay, taxes, and deductions" },
  { name: "Compliance", description: "Ensure legal compliance with labor laws" },
  { name: "Conversion", description: "Convert between different pay formats" },
  { name: "Time Tracking", description: "Track and calculate work hours" }
];

export default function CalculatorsPage() {
  const calculatorsByCategory = calculators.reduce((acc, calculator) => {
    if (!acc[calculator.category]) {
      acc[calculator.category] = [];
    }
    acc[calculator.category].push(calculator);
    return acc;
  }, {} as Record<string, typeof calculators>);

  return (
    <div className="space-y-8">
      <PageHeading 
        title="All Calculators" 
        subtitle="Free payroll and HR calculators to help you manage compensation and compliance" 
      />
      
      {/* Rates Review Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Rates last reviewed:</strong> January 2025
        </p>
      </div>
      
      <AdSlot id="calculators-listing" />

      {/* State-Specific Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">State-Specific Resources</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Overtime rules vary by state. Use our state-specific guides to ensure compliance:
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {['ca', 'ny', 'tx', 'fl', 'il', 'pa', 'oh', 'ga', 'nc', 'mi', 'nj', 'va', 'wa', 'az', 'tn', 'in', 'mo', 'md', 'wi', 'co', 'mn', 'la', 'al', 'ky'].map((state) => (
            <Link
              key={state}
              href={`/guides/overtime-rules/${state}`}
              className="text-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {state.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/guides/overtime-rules"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
          >
            View all state overtime rules
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why Use Our Calculators?</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">100% Free</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">No registration required, no hidden fees, no limits on usage.</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Always Accurate</h3>
            <p className="text-sm text-green-800 dark:text-green-200">Updated with current tax rates and labor laws for 2024.</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Easy to Use</h3>
            <p className="text-sm text-purple-800 dark:text-purple-200">Simple interfaces designed for quick calculations and results.</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Mobile Friendly</h3>
            <p className="text-sm text-orange-800 dark:text-orange-200">Works perfectly on desktop, tablet, and mobile devices.</p>
          </div>
        </div>
      </section>

      {/* Calculators by Category */}
      {Object.entries(calculatorsByCategory).map(([categoryName, categoryCalculators]) => (
        <section key={categoryName} className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{categoryName}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {categories.find(c => c.name === categoryName)?.description}
            </span>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryCalculators.map((calculator) => (
              <Link
                key={calculator.href}
                href={calculator.href}
                className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{calculator.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {calculator.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="space-y-1">
                    {calculator.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                    Calculate Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Popular Calculators */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Most Popular</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/calculators/overtime-pay"
            className="group flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-6 hover:from-indigo-100 hover:to-blue-100 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 transition-all duration-200"
          >
            <span className="text-3xl">⏰</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Overtime Pay Calculator
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculate overtime pay with federal and state rules
              </p>
            </div>
          </Link>
          
          <Link
            href="/calculators/take-home-pay"
            className="group flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-200"
          >
            <span className="text-3xl">💰</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Take-Home Pay Calculator
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See your net pay after all deductions and taxes
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">Are these calculators free to use?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Yes! All our calculators are completely free to use with no registration required. You can use them as many times as you need.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">How accurate are the calculations?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our calculators use current 2024 tax rates and labor laws. However, these are estimates and should not replace professional tax or legal advice for complex situations.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">Do you store my data?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No, we don&apos;t store any of your personal information or calculation data. All calculations are performed locally in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/guides/payroll-basics"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium">Payroll Basics Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn the fundamentals of payroll processing and compliance</p>
          </Link>
          <Link
            href="/guides/overtime-rules"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium">Overtime Rules Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Understand federal and state overtime requirements</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
