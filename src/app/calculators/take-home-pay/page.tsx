import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import TakeHomePayCalculator from "./Calculator";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator",
  description: "Calculate your net take-home pay after taxes, benefits, and deductions. See exactly how much you'll receive in your paycheck.",
  openGraph: {
    title: "Take-Home Pay Calculator",
    description: "Calculate your net take-home pay after taxes, benefits, and deductions. See exactly how much you'll receive in your paycheck.",
    images: [
      {
        url: generateOgImageUrl("Take-Home Pay Calculator", "Calculate your net take-home pay after taxes, benefits, and deductions"),
        width: 1200,
        height: 630,
        alt: "Take-Home Pay Calculator - Calculate your net take-home pay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Take-Home Pay Calculator",
    description: "Calculate your net take-home pay after taxes, benefits, and deductions. See exactly how much you'll receive in your paycheck.",
    images: [generateOgImageUrl("Take-Home Pay Calculator", "Calculate your net take-home pay after taxes, benefits, and deductions")],
  },
};

export default function TakeHomePayPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/calculators", label: "Calculators" }, { label: "Take-Home Pay" }]} />
      <PageHeading 
        title="Take-Home Pay Calculator" 
        subtitle="Calculate your net pay after all deductions and taxes" 
      />
      <AdSlot id="take-home-pay-calculator" />
      <TakeHomePayCalculator />
    </div>
  );
}
