import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import MinimumWageCalculator from "./Calculator";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Minimum Wage Calculator",
  description: "Calculate minimum wage rates by state and city. Compare federal vs state minimum wages and calculate overtime pay for minimum wage workers.",
  openGraph: {
    title: "Minimum Wage Calculator",
    description: "Calculate minimum wage rates by state and city. Compare federal vs state minimum wages and calculate overtime pay for minimum wage workers.",
    images: [
      {
        url: generateOgImageUrl("Minimum Wage Calculator", "Calculate minimum wage rates by state and city"),
        width: 1200,
        height: 630,
        alt: "Minimum Wage Calculator - Calculate minimum wage rates by state and city",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimum Wage Calculator",
    description: "Calculate minimum wage rates by state and city. Compare federal vs state minimum wages and calculate overtime pay for minimum wage workers.",
    images: [generateOgImageUrl("Minimum Wage Calculator", "Calculate minimum wage rates by state and city")],
  },
};

export default function MinimumWagePage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/calculators", label: "Calculators" }, { label: "Minimum Wage" }]} />
      <PageHeading 
        title="Minimum Wage Calculator" 
        subtitle="Calculate minimum wage rates and overtime pay by location" 
      />
      <AdSlot id="minimum-wage-calculator" />
      <MinimumWageCalculator />
    </div>
  );
}
