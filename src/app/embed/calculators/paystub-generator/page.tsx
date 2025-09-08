import type { Metadata } from "next";
import PaystubGenerator from "@/app/calculators/paystub-generator/PaystubGenerator";

export const metadata: Metadata = {
  title: "Paystub Generator - Embed",
  description: "Generate professional paystubs with this embeddable calculator. Get accurate calculations, state-specific rules, and expert guidance.",
  robots: "noindex, nofollow",
};

export default function EmbedPaystubGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <PaystubGenerator />
      </div>
    </div>
  );
}
