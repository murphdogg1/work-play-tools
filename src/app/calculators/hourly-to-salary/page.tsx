import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator | WorkPayTools",
  description: "Convert hourly pay to annual, monthly, and weekly salary.",
};

const faqItems: FaqItem[] = [
  { q: "How do you calculate annual salary?", a: "We multiply hourly rate × hours per week × weeks per year." },
  { q: "Can I change weeks per year?", a: "Yes. Default is 52, but you can set any value." },
  { q: "Are taxes included?", a: "No. These are gross pay estimates only." },
];

export default function HourlyToSalaryPage() {
  return (
    <div className="space-y-8">
      <PageHeading title="Hourly → Salary" subtitle="Convert hourly pay to yearly, monthly, and weekly amounts." />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Calculators", url: "https://workpay.tools/calculators" },
        { name: "Hourly to Salary", url: "https://workpay.tools/calculators/hourly-to-salary" },
      ])}
      <Calculator />
      <section>
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="mt-2 list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Weekly = hourly × hours/week</li>
          <li>Annual = hourly × hours/week × weeks/year</li>
          <li>Monthly ≈ annual ÷ 12</li>
        </ul>
      </section>
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


