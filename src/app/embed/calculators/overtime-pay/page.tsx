import type { Metadata } from "next";
import { Suspense } from "react";
import Calculator from "@/app/calculators/overtime-pay/Calculator";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator - Embed",
  description: "Calculate overtime pay with this embeddable calculator",
  robots: "noindex, nofollow",
};

export default function EmbedOvertimePayCalculator() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overtime Pay Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Calculate regular and overtime pay
        </p>
      </div>
      
      <Suspense fallback={<div>Loading calculator...</div>}>
        <Calculator />
      </Suspense>
      
      <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Powered by{" "}
          <a 
            href="https://www.workpaytools.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            WorkPayTools
          </a>
        </p>
      </div>
    </div>
  );
}
