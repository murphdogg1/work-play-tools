import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import TimecardForm from "./TimecardForm";

export const metadata: Metadata = {
  title: "Timecard Calculator | WorkPayTools",
  description: "Calculate total hours, overtime, and regular hours for weekly timecards.",
};

const faqItems: FaqItem[] = [
  { q: "How do you handle overnight shifts?", a: "If clock-out is earlier than clock-in, it's treated as next day." },
  { q: "When does overtime start?", a: "This tool counts hours above 40 in a week as overtime." },
  { q: "Are breaks included?", a: "Enter unpaid break minutes per shift; those are subtracted." },
];

export default function TimecardPage() {
  return (
    <div className="space-y-8">
      <PageHeading title="Timecard Calculator" subtitle="Enter your shifts to compute total and overtime hours." />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Calculators", url: "https://workpay.tools/calculators" },
        { name: "Timecard", url: "https://workpay.tools/calculators/timecard" },
      ])}
      <TimecardForm />
      <section>
        <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
        <ul className="mt-2 list-disc pl-5 text-sm sm:text-base space-y-1">
          <li>Each row: clock-in, clock-out, and unpaid break minutes.</li>
          <li>Overnight shifts are supported (clock-out before clock-in).</li>
          <li>Overtime hours are any hours above 40 in the week.</li>
        </ul>
      </section>
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


