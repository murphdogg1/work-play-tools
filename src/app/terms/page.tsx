import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Link from "next/link";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read WorkPayTools terms of service - by using our tools, you agree to our terms.",
  openGraph: {
    title: "Terms of Service",
    description: "Read WorkPayTools terms of service - by using our tools, you agree to our terms.",
    images: [
      {
        url: generateOgImageUrl("Terms of Service", "Read WorkPayTools terms of service - by using our tools, you agree to our terms."),
        width: 1200,
        height: 630,
        alt: "Terms of Service - WorkPayTools terms of service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service",
    description: "Read WorkPayTools terms of service - by using our tools, you agree to our terms.",
    images: [generateOgImageUrl("Terms of Service", "Read WorkPayTools terms of service - by using our tools, you agree to our terms.")],
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Terms of Service" subtitle="Please read these terms carefully" />
      
      {/* Related Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Free Tools</h2>
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
        </div>
      </section>
      
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        By using WorkPayTools, you agree to our terms. If you have questions,
        please <Link href="/contact" className="hover:underline">contact us</Link>.
      </p>
    </div>
  );
}


