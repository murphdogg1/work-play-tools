import PaystubGenerator from "@/app/calculators/paystub-generator/PaystubGenerator";

export default function EmbedPaystubGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <PaystubGenerator />
      </div>
    </div>
  );
}
