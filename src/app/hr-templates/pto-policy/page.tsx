import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "PTO Policy Template",
  description: "Clear paid time off policy template covering accruals, requests, holidays, and approval processes.",
  openGraph: {
    title: "PTO Policy Template",
    description: "Clear paid time off policy template covering accruals, requests, holidays, and approval processes.",
    images: [
      {
        url: generateOgImageUrl("PTO Policy Template", "Clear paid time off policy template covering accruals, requests, holidays, and approval processes."),
        width: 1200,
        height: 630,
        alt: "PTO Policy Template - Clear paid time off policy template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PTO Policy Template",
    description: "Clear paid time off policy template covering accruals, requests, holidays, and approval processes.",
    images: [generateOgImageUrl("PTO Policy Template", "Clear paid time off policy template covering accruals, requests, holidays, and approval processes.")],
  },
};

export default function PtoPolicyTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "PTO Policy" }]} />
      <PageHeading title="PTO Policy" subtitle="A clear time-off policy outline" />
      <AdSlot id="pto-policy-template" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Covers accruals, requests, holidays, and approvals.</p>
      </section>
    </div>
  );
}


