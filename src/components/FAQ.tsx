import React from "react";

export type FaqItem = {
  q: string;
  a: string;
};

export default function FAQ({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <section className={className}>
      <h2 className="text-lg font-semibold tracking-tight">FAQ</h2>
      <div className="mt-3 space-y-3">
        {items.map((item, idx) => (
          <details key={idx} className="rounded-md border border-black/10 dark:border-white/15 p-3">
            <summary className="cursor-pointer text-sm sm:text-base font-medium">{item.q}</summary>
            <p className="mt-2 text-sm sm:text-base text-black/80 dark:text-white/80">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}


