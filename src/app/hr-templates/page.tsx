import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "HR Templates",
  description: "Ready-to-use templates for common HR needs including offer letters, PTO policies, and disciplinary forms. Get accurate calculations and expert guidance.",
  openGraph: {
    title: "HR Templates",
    description: "Ready-to-use templates for common HR needs including offer letters, PTO policies, and disciplinary forms. Get accurate calculations, state-specific rules, and expert guidance.",
    url: "https://www.workpaytools.com/hr-templates",
    type: "website",
    siteName: "WorkPayTools",
    images: [
      {
        url: generateOgImageUrl("HR Templates", "Ready-to-use templates for common HR needs including offer letters, PTO policies, and disciplinary forms."),
        width: 1200,
        height: 630,
        alt: "HR Templates - Ready-to-use templates for common HR needs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Templates",
    description: "Ready-to-use templates for common HR needs including offer letters, PTO policies, and disciplinary forms. Get accurate calculations, state-specific rules, and expert guidance.",
    images: [generateOgImageUrl("HR Templates", "Ready-to-use templates for common HR needs including offer letters, PTO policies, and disciplinary forms.")],
  },
  alternates: {
    canonical: "https://www.workpaytools.com/hr-templates",
  },
};

const cards = [
  { href: "/hr-templates/offer-letter", title: "Offer Letter", desc: "Professional offer letter template." },
  { href: "/hr-templates/pto-policy", title: "PTO Policy", desc: "Clear paid time off policy template." },
  { href: "/hr-templates/disciplinary-action-form", title: "Disciplinary Action Form", desc: "Document incidents and corrective actions." },
];

export default function HrTemplatesHubPage() {
  return (
    <div className="space-y-6">
      {/* Ensure single H1 via PageHeading */}
      <PageHeading title="HR Templates" subtitle="Ready-to-use templates for common HR needs." />
      {breadcrumbJsonLd([{ name: "Home", url: "https://workpay.tools/" }, { name: "HR Templates", url: "https://workpay.tools/hr-templates" }])}
      <AdSlot id="hr-templates-hub" />
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/[.03] dark:hover:bg-white/[.04]">
            <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


