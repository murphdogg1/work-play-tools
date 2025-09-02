import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";

export default function Home() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Free Payroll & HR Calculators"
        subtitle="Quick, accurate calculators and templates to help you run payroll and HR with confidence."
      />
      {organizationJsonLd({ name: "WorkPayTools", url: "https://workpay.tools" })}
      {websiteJsonLd({ url: "https://workpay.tools" })}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h3 className="text-base font-semibold tracking-tight">Featured Calculators</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link href="/calculators/overtime-pay" className="hover:underline">Overtime Pay Calculator</Link>
            </li>
            <li>
              <Link href="/calculators/hourly-to-salary" className="hover:underline">Hourly to Salary Converter</Link>
            </li>
            <li>
              <Link href="/calculators/timecard" className="hover:underline">Timecard Calculator</Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <h3 className="text-base font-semibold tracking-tight">Get to know us</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
