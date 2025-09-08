import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "About WorkPayTools - Free Payroll & HR Tools",
  description: "Learn about WorkPayTools mission to provide free, accurate payroll calculators and HR resources. Meet our team and discover our commitment to helping businesses",
  openGraph: {
    title: "About WorkPayTools - Free Payroll & HR Tools",
    description: "Learn about WorkPayTools mission to provide free, accurate payroll calculators and HR resources. Meet our team and discover our commitment to helping businesses and employees.",
    url: "https://www.workpaytools.com/about",
    type: "website",
    siteName: "WorkPayTools",
    images: [
      {
        url: generateOgImageUrl("About WorkPayTools", "Free payroll calculators and HR tools for businesses and employees"),
        width: 1200,
        height: 630,
        alt: "About WorkPayTools - Free Payroll & HR Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WorkPayTools - Free Payroll & HR Tools",
    description: "Learn about WorkPayTools mission to provide free, accurate payroll calculators and HR resources.",
    images: [generateOgImageUrl("About WorkPayTools", "Free payroll calculators and HR tools for businesses and employees")],
  },
  alternates: {
    canonical: "https://www.workpaytools.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeading 
        title="About WorkPayTools" 
        subtitle="Empowering businesses and employees with free, accurate payroll and HR tools" 
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "About", url: "https://www.workpaytools.com/about" },
      ])}

      <AdSlot id="about-mission" />

      {/* Mission Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-400">
          WorkPayTools was created with a simple mission: to make payroll and HR calculations accessible, 
          accurate, and free for everyone. We believe that understanding your pay, benefits, and rights 
          shouldn't require expensive software or complex spreadsheets.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Whether you're a small business owner calculating payroll for the first time, an employee 
          trying to understand your overtime pay, or an HR professional looking for reliable tools, 
          we're here to help with free, easy-to-use calculators and comprehensive guides.
        </p>
      </section>

      {/* What We Offer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What We Offer</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Free Calculators</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Accurate payroll calculators for overtime, take-home pay, salary conversions, and more. 
              No registration required, no hidden fees.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Expert Guides</h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Comprehensive guides on payroll basics, overtime rules by state, benefits, and compliance 
              requirements.
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">HR Templates</h3>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Ready-to-use HR documents including offer letters, PTO policies, and disciplinary forms.
            </p>
          </div>
        </div>
      </section>

      <AdSlot id="about-team" />

      {/* Team Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Team</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">WT</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">WorkPayTools Team</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Payroll & HR Experts
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our team consists of payroll professionals, HR experts, and software developers 
                who are passionate about making complex payroll calculations simple and accessible. 
                We combine years of industry experience with modern web technology to create tools 
                that actually work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tools Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Tools</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our comprehensive suite of free payroll and HR tools:
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/calculators/overtime-pay" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Overtime Pay Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate overtime pay with state-specific rules</p>
          </Link>
          <Link href="/calculators/payroll" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Payroll Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate gross pay, taxes, and deductions</p>
          </Link>
          <Link href="/guides/overtime-rules" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Overtime Rules Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn about federal and state overtime requirements</p>
          </Link>
          <Link href="/hr-templates" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">HR Templates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ready-to-use templates for common HR needs</p>
          </Link>
          <Link href="/calculators/take-home-pay" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Take-Home Pay Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate net pay after taxes and deductions</p>
          </Link>
          <Link href="/calculators/minimum-wage" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Minimum Wage Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Check minimum wage rates by state and city</p>
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Values</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Accuracy First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We use current tax rates, labor laws, and regulations to ensure our calculations are accurate and up-to-date.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Always Free</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our tools will always be free to use. No premium tiers, no hidden costs, no registration required.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Privacy Focused</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We don't store your personal data or calculation results. All calculations happen locally in your browser.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">User-Focused</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We design our tools with real users in mind, making complex calculations simple and intuitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Get in Touch</h2>
        <p className="text-indigo-800 dark:text-indigo-200 mb-4">
          Have questions, suggestions, or need help with our tools? We'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Contact Us
          </a>
          <a
            href="/calculators/overtime-pay"
            className="inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg font-medium transition-colors"
          >
            Try Our Tools
          </a>
        </div>
      </section>
    </div>
  );
}