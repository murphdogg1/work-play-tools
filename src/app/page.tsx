import Link from "next/link";
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  BookOpen,
  Mail,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import NewsletterForm from "@/components/NewsletterForm";

const featuredCalculators = [
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    icon: Clock,
    description: "Calculate regular and overtime pay with state-specific rules"
  },
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    icon: DollarSign,
    description: "Convert hourly rates to annual salary equivalents"
  },
  {
    title: "Salary to Hourly Calculator",
    href: "/calculators/salary-to-hourly",
    icon: TrendingUp,
    description: "Convert annual salary to hourly rate for contracts and negotiations"
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    icon: TrendingUp,
    description: "Calculate net pay after taxes and deductions"
  },
  {
    title: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax",
    icon: FileText,
    description: "Calculate FICA, Medicare, and Social Security taxes"
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    icon: Calculator,
    description: "Track work hours and calculate totals with break time"
  }
];

const valueProps = [
  {
    title: "Free Calculators",
    description: "Accurate payroll and HR calculators that work for any business size",
    icon: Calculator,
    features: ["Overtime calculations", "Salary conversions", "Tax calculations", "Time tracking"]
  },
  {
    title: "HR Templates",
    description: "Ready-to-use documents that save you time and ensure compliance",
    icon: FileText,
    features: ["Job offer letters", "PTO policies", "Disciplinary forms", "Employee handbooks"]
  },
  {
    title: "Plain-English Guides",
    description: "Clear explanations of complex payroll and HR topics",
    icon: BookOpen,
    features: ["Payroll basics", "State regulations", "Benefits guidance", "Compliance help"]
  }
];

const popularPages = [
  { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay" },
  { title: "Payroll Basics Guide", href: "/guides/payroll-basics" },
  { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary" },
  { title: "Overtime Rules by State", href: "/guides/overtime-rules" },
  { title: "PTO Policy Template", href: "/hr-templates/pto-policy" }
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Free Payroll Calculators & HR Tools
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            Calculate overtime pay, take-home pay, payroll taxes, and more with our free online calculators. Access professional HR templates and comprehensive guides. No signup required - completely free payroll tools for businesses and HR professionals.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculators/overtime-pay"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Start with Overtime Calculator
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Browse all Calculators
          </Link>
        </div>
      </section>

      {/* Featured Calculators Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Featured Calculators
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Most popular tools for payroll and HR professionals
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                      <IconComponent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {calc.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {calc.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="absolute top-4 right-4 h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* How We Help Section */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            How We Help
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Everything you need to manage payroll and HR efficiently
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {valueProps.map((prop) => {
            const IconComponent = prop.icon;
            return (
              <div key={prop.title} className="text-center space-y-4">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl flex items-center justify-center mx-auto">
                  <IconComponent className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {prop.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {prop.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {prop.features.map((feature) => (
                    <li key={feature} className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Now Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Popular Now
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Most visited pages this week
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <ol className="space-y-3">
            {popularPages.map((page, index) => (
              <li key={page.href} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {index + 1}
                  </span>
                </div>
                <Link
                  href={page.href}
                  className="flex-1 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  {page.title}
                </Link>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-indigo-600 rounded-2xl p-8 lg:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Stay Updated
            </h2>
            <p className="mt-2 text-lg text-indigo-100">
              Get new calculators, templates, and HR tips delivered to your inbox
            </p>
          </div>
          
          <NewsletterForm variant="default" className="max-w-md mx-auto" />
        </div>
      </section>

      {/* Enhanced JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Free Payroll Calculators & HR Tools",
          "description": "Comprehensive collection of free payroll calculators, HR templates, and guides for businesses and HR professionals.",
          "url": "https://workpaytools.com",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Payroll Calculators and HR Tools",
            "description": "Free online tools for payroll calculations, HR management, and business compliance",
            "numberOfItems": 6,
            "itemListElement": [
              {
                "@type": "SoftwareApplication",
                "position": 1,
                "name": "Overtime Pay Calculator",
                "description": "Calculate regular and overtime pay with state-specific rules",
                "url": "https://workpaytools.com/calculators/overtime-pay",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "SoftwareApplication",
                "position": 2,
                "name": "Take-Home Pay Calculator",
                "description": "Calculate net pay after taxes and deductions",
                "url": "https://workpaytools.com/calculators/take-home-pay",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "SoftwareApplication",
                "position": 3,
                "name": "Payroll Tax Calculator",
                "description": "Calculate FICA, Medicare, and Social Security taxes",
                "url": "https://workpaytools.com/calculators/payroll-tax",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              }
            ]
          }
        })}
      </script>
      {organizationJsonLd({ name: "WorkPayTools", url: "https://workpaytools.com" })}
      {websiteJsonLd({ url: "https://workpaytools.com" })}
    </div>
  );
}