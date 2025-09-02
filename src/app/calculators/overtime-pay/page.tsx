import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator (2025) | WorkPayTools",
  description:
    "Calculate regular and overtime pay based on hourly rate, hours worked, and overtime thresholds."
};

const faqItems: FaqItem[] = [
  {
    q: "How is overtime calculated?",
    a:
      "Overtime pay is calculated by multiplying overtime hours by the overtime rate. This tool treats hours above the weekly threshold as overtime."
  },
  {
    q: "When does double-time apply?",
    a:
      "Double-time rules vary by jurisdiction or policy. When enabled here, hours above the threshold use a 2.0x multiplier instead of 1.5x."
  },
  {
    q: "Does this include taxes or deductions?",
    a:
      "No. This calculator estimates gross pay only and excludes taxes and other deductions."
  }
];

// FAQ JSON-LD is rendered via <FaqJsonLd items={faqItems} />

export default function OvertimePayCalculatorPage() {
  return (
    <div className="space-y-8">
      <PageHeading
        title="Overtime Pay Calculator (2025)"
        subtitle="Calculate regular and overtime pay using your hourly rate and hours worked."
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Calculators", url: "https://workpay.tools/calculators" },
        { name: "Overtime Pay", url: "https://workpay.tools/calculators/overtime-pay" },
      ])}

      <Calculator />

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Regular hours = min(hours worked, threshold)</li>
          <li>Overtime hours = max(0, hours worked − threshold)</li>
          <li>Regular pay = regular hours × hourly rate</li>
          <li>Overtime pay = overtime hours × hourly rate × overtime rate</li>
          <li>Total pay = regular pay + overtime pay</li>
        </ul>
      </section>

      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


