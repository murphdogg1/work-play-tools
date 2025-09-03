import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import PayrollTaxCalculator from "./Calculator";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Payroll Tax Calculator",
  description: "Calculate federal, state, and local payroll taxes for employees. Get accurate tax withholding amounts for payroll processing.",
  openGraph: {
    title: "Payroll Tax Calculator",
    description: "Calculate federal, state, and local payroll taxes for employees. Get accurate tax withholding amounts for payroll processing.",
    images: [
      {
        url: generateOgImageUrl("Payroll Tax Calculator", "Calculate federal, state, and local payroll taxes for employees"),
        width: 1200,
        height: 630,
        alt: "Payroll Tax Calculator - Calculate federal, state, and local payroll taxes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payroll Tax Calculator",
    description: "Calculate federal, state, and local payroll taxes for employees. Get accurate tax withholding amounts for payroll processing.",
    images: [generateOgImageUrl("Payroll Tax Calculator", "Calculate federal, state, and local payroll taxes for employees")],
  },
};

export default function PayrollTaxPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/calculators", label: "Calculators" }, { label: "Payroll Tax" }]} />
      <PageHeading 
        title="Payroll Tax Calculator" 
        subtitle="Calculate federal, state, and local tax withholdings" 
      />
      <AdSlot id="payroll-tax-calculator" />
      <PayrollTaxCalculator />
    </div>
  );
}
