import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import { generateOgImageUrl } from "@/lib/og";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools. Get accurate calculations and expert guidance.",
  openGraph: {
    title: "Contact",
    description: "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools. Get accurate calculations, state-specific rules, and expert guidance.",
    url: "https://www.workpaytools.com/contact",
    type: "website",
    siteName: "WorkPayTools",
    images: [
      {
        url: generateOgImageUrl("Contact", "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools."),
        width: 1200,
        height: 630,
        alt: "Contact - Get in touch with WorkPayTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools. Get accurate calculations, state-specific rules, and expert guidance.",
    images: [generateOgImageUrl("Contact", "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools.")],
  },
  alternates: {
    canonical: "https://www.workpaytools.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Contact" subtitle="We'd love to hear from you" />
      
      {/* Related Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Tools</h2>
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
      
      <ContactForm />
    </div>
  );
}


