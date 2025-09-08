import type { Metadata } from "next";
import { Suspense } from "react";
import TimecardForm from "@/app/calculators/timecard/TimecardForm";

export const metadata: Metadata = {
  title: "Timecard Calculator - Embed",
  description: "Track work hours and calculate totals with this embeddable calculator",
  robots: "noindex, nofollow",
};

export default function EmbedTimecardCalculator() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Timecard Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Track work hours and calculate totals
        </p>
      </div>
      
      <Suspense fallback={<div>Loading calculator...</div>}>
        <TimecardForm />
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
