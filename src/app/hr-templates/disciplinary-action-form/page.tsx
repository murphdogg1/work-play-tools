import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Disciplinary Action Form Template",
  description: "Document incidents and corrective actions with this professional disciplinary action form template.",
  openGraph: {
    title: "Disciplinary Action Form Template",
    description: "Document incidents and corrective actions with this professional disciplinary action form template.",
    images: [
      {
        url: generateOgImageUrl("Disciplinary Action Form Template", "Document incidents and corrective actions with this professional disciplinary action form template."),
        width: 1200,
        height: 630,
        alt: "Disciplinary Action Form Template - Document incidents and corrective actions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disciplinary Action Form Template",
    description: "Document incidents and corrective actions with this professional disciplinary action form template.",
    images: [generateOgImageUrl("Disciplinary Action Form Template", "Document incidents and corrective actions with this professional disciplinary action form template.")],
  },
};

export default function DisciplinaryActionFormTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "Disciplinary Action Form" }]} />
      <PageHeading title="Disciplinary Action Form" subtitle="Document incidents and corrective steps" />
      <AdSlot id="disciplinary-action-form-template" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Capture incident details, expectations, and follow-up plans.</p>
      </section>
    </div>
  );
}


