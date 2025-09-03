"use client";

import React, { useState } from "react";
import { trackCalculatorCopy } from "@/lib/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        {tool && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 sm:grid-cols-3">
          {items.map((item, idx) => {
            let display: React.ReactNode = item.value;
            if (typeof display === "number") {
              display = Number.isFinite(display) ? display : "—";
            }
            if (display === null || display === undefined || (typeof display === "string" && display.trim() === "")) {
              display = "—";
            }
            return (
              <div key={idx} className="rounded-md border p-3">
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="text-base font-semibold">{display}</dd>
              </div>
            );
          })}
        </dl>
      </CardContent>
    </Card>
  );
}


