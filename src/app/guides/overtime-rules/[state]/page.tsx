import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { STATES, getStateBySlug } from "@/data/states";
import { getStateIntro } from "@/lib/state-intros";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";
import { validateSeoText } from "@/lib/seo/metadata";

// Enable ISR with 24-hour revalidation
export const revalidate = 86400;

type PageParams = { params: Promise<{ state: string }> };



export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  const name = s?.name ?? "State";
  const title = `${name} Overtime Rules 2025 | WorkPayTools`;
  const description = `Learn weekly thresholds and basics for ${name} overtime rules. Get accurate calculations, state-specific rules, and expert guidance.`;
  
  const { title: validTitle, description: validDescription } = validateSeoText(title, description);
  
  return {
    title: validTitle,
    description: validDescription,
    openGraph: {
      title: validTitle,
      description: validDescription,
      images: [
        {
          url: generateOgImageUrl(title, description),
          width: 1200,
          height: 630,
          alt: `${title} - ${description}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: validTitle,
      description: validDescription,
      images: [generateOgImageUrl(validTitle, validDescription)],
    },
  };
}

export default async function StateOvertimeGuide({ params }: PageParams) {
  const { state } = await params;
  const stateInfo = getStateBySlug(state);
  const stateName = stateInfo?.name ?? "State";
  const stateIntro = stateInfo ? getStateIntro(stateInfo) : { firstSentence: "General overtime information for this state.", secondSentence: "Please verify with official sources." };

  const faqItems: FaqItem[] = [
    { q: `What is the weekly overtime threshold in ${stateName}?`, a: "Most states use 40 hours per week, but some have different thresholds. Check with your state's labor department for specific requirements." },
    { q: `Does ${stateName} have daily overtime rules?`, a: "Some states require daily overtime (e.g., after 8 hours in a day). California is known for this, but other states may have similar rules." },
    { q: "Is this information legally binding?", a: "No. This page provides general information only and should not be considered legal advice. Always consult with qualified legal counsel for specific situations." },
  ];

  const relatedItems: RelatedItem[] = [
    {
      title: "Overtime Pay Calculator",
      href: "/calculators/overtime-pay",
      description: "Calculate your overtime pay based on hours worked and applicable rates."
    },
    {
      title: "Timecard Calculator",
      href: "/calculators/timecard",
      description: "Track your daily hours to determine overtime eligibility."
    },
    {
      title: "Payroll Basics Guide",
      href: "/guides/payroll-basics",
      description: "Learn the fundamentals of payroll processing and overtime compliance."
    },
    {
      title: "Benefits & Deductions Guide",
      href: "/guides/benefits",
      description: "Understand how benefits and deductions affect your take-home pay."
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeading title={`Overtime Rules in ${stateName} (2025)`} subtitle={`Key overtime concepts and compliance information for ${stateName}.`} />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Guides", url: "https://www.workpaytools.com/guides" },
        { name: "Overtime Rules", url: "https://www.workpaytools.com/guides/overtime-rules" },
        { name: stateName, url: `https://www.workpaytools.com/guides/overtime-rules/${state}` },
      ])}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">{stateIntro.firstSentence}</p>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">{stateIntro.secondSentence}</p>
        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Important:</strong> Always verify current overtime rules with your state&apos;s labor department or qualified legal counsel. Laws change frequently and may vary by industry.
          </p>
        </div>
      </section>

      <AdSlot id="state-overtime-rules-overview" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Weekly Overtime Threshold</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          Most states follow the federal standard of 40 hours per week. Hours worked beyond this threshold typically qualify for overtime pay at 1.5× the regular rate.
        </p>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          Some states may have different thresholds or additional requirements. Check with {stateName}&apos;s labor department for specific rules.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Daily Overtime Rules</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          While federal law focuses on weekly overtime, some states require daily overtime pay. This typically applies after 8 hours worked in a single day.
        </p>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          California is well-known for daily overtime rules, but other states may have similar requirements. Verify {stateName}&apos;s specific daily overtime rules.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Calculate Your Overtime</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
          Use our calculators to determine your overtime pay based on {stateName} rules:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              <Link href="/calculators/overtime-pay" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Overtime Pay Calculator
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Calculate weekly overtime pay at 1.5× or 2× rates based on your hours worked.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              <Link href="/calculators/timecard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Timecard Calculator
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track daily hours and breaks to determine overtime eligibility and totals.
            </p>
          </div>
        </div>
      </section>

      <AdSlot id="state-overtime-rules-faq" />
      <FAQ items={faqItems} />
      <FaqJsonLd items={faqItems} />
      
      <Related items={relatedItems} tool="overtime-rules" />
      
      <p className="text-xs text-black/60 dark:text-white/60">
        This information is for educational purposes only and should not be considered legal advice. 
        Always consult with qualified legal counsel for specific employment law questions.
      </p>
    </div>
  );
}


