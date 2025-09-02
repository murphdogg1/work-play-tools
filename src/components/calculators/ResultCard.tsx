import React from "react";

export type ResultItem = {
  label: string;
  value: React.ReactNode | number | string | null | undefined;
};

export type ResultCardProps = {
  title: string;
  items: ResultItem[];
  className?: string;
};

export default function ResultCard({ title, items, className }: ResultCardProps) {
  return (
    <section className={`rounded-lg border border-black/10 dark:border-white/15 p-4 sm:p-5 ${className ?? ""}`}>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
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


