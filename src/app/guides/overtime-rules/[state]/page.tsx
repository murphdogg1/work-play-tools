import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import { STATES, getStateBySlug } from "@/data/states";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

type PageParams = { params: { state: string } };

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: PageParams): Metadata {
  const s = getStateBySlug(params.state);
  const name = s?.name ?? "State";
  return {
    title: `Overtime Rules in ${name} (2025)`,
    description: `Learn weekly thresholds and basics for ${name} overtime rules.`,
  };
}

export default function StateOvertimeGuide({ params }: PageParams) {
  const stateInfo = getStateBySlug(params.state);
  const stateName = stateInfo?.name ?? "State";

  const faqItems: FaqItem[] = [
    { q: `What is the weekly overtime threshold in ${stateName}?`, a: "Many states use 40 hours; check local regulations for specifics." },
    { q: `Does ${stateName} have daily overtime?`, a: "Some states do. This is a placeholder—confirm with official guidance." },
    { q: "Is this legal advice?", a: "No. This page provides general information only." },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/guides", label: "Guides" }, { href: "/guides/overtime-rules", label: "Overtime Rules" }, { label: stateName }]} />
      <PageHeading title={`Overtime Rules in ${stateName} (2025)`} subtitle={`Key overtime concepts and links for ${stateName}.`} />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpay.tools/" },
        { name: "Guides", url: "https://workpay.tools/guides" },
        { name: "Overtime Rules", url: "https://workpay.tools/guides/overtime-rules" },
        { name: stateName, url: `https://workpay.tools/guides/overtime-rules/${params.state}` },
      ])}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Quick summary</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">General overtime is triggered when eligible employees exceed a weekly threshold (often 40 hours).</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Weekly threshold</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Most states: 40 hours/week. Confirm official rules for {stateName}.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Daily overtime</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Some states apply daily overtime (e.g., after 8 hours/day). Placeholder—verify {stateName} requirements.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Tools</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
          <li><Link href="/calculators/overtime-pay" className="hover:underline">Overtime Pay Calculator</Link></li>
          <li><Link href="/calculators/timecard" className="hover:underline">Timecard Calculator</Link></li>
        </ul>
      </section>

      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


