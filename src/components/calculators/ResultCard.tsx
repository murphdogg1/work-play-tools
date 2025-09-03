"use client";

import React, { useState } from "react";
import { trackCalculatorCopy } from "@/lib/analytics";

export type ResultItem = {
  label: string;
  value: React.ReactNode | number | string | null | undefined;
};

export type ResultCardProps = {
  title: string;
  items: ResultItem[];
  className?: string;
  tool?: string;
};

export default function ResultCard({ title, items, className, tool }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = items
      .map(item => `${item.label}: ${item.value}`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (tool) {
        trackCalculatorCopy(tool);
      }
    } catch (err) {
      console.error('Failed to copy results:', err);
    }
  };

  return (
    <section className={`rounded-lg border border-black/10 dark:border-white/15 p-4 sm:p-5 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {tool && (
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 rounded border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      <dl className="mt-3 grid gap-3 sm:grid-cols-3">
        {items.map((item, idx) => {
          let display: React.ReactNode = item.value;
          if (typeof display === "number") {
            display = Number.isFinite(display) ? display : "—";
          }
          if (display === null || display === undefined || (typeof display === "string" && display.trim() === "")) {
            display = "—";
          }
          return (
            <div key={idx} className="rounded-md border border-black/10 dark:border-white/15 p-3">
              <dt className="text-xs text-black/70 dark:text-white/70">{item.label}</dt>
              <dd className="text-base font-semibold">{display}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}


