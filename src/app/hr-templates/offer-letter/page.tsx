import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Offer Letter Template",
  description: "Professional offer letter template for hiring new employees with role, compensation, and terms.",
  openGraph: {
    title: "Offer Letter Template",
    description: "Professional offer letter template for hiring new employees with role, compensation, and terms.",
    images: [
      {
        url: generateOgImageUrl("Offer Letter Template", "Professional offer letter template for hiring new employees with role, compensation, and terms."),
        width: 1200,
        height: 630,
        alt: "Offer Letter Template - Professional offer letter template for hiring new employees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offer Letter Template",
    description: "Professional offer letter template for hiring new employees with role, compensation, and terms.",
    images: [generateOgImageUrl("Offer Letter Template", "Professional offer letter template for hiring new employees with role, compensation, and terms.")],
  },
};

export default function OfferLetterTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "Offer Letter" }]} />
      <PageHeading title="Offer Letter" subtitle="A simple offer letter starting point" />
      <AdSlot id="offer-letter-template" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Use this template to outline role, compensation, and at-will terms.</p>
      </section>
    </div>
  );
}


