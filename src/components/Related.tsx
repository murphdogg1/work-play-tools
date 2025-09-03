"use client";

import Link from "next/link";
import { trackRelatedClick } from "@/lib/analytics";

export type RelatedItem = {
  title: string;
  href: string;
  description: string;
};

export default function Related({ items, className, tool }: { items: RelatedItem[]; className?: string; tool?: string }) {
  if (!items.length) return null;

  const handleRelatedClick = (href: string) => {
    if (tool) {
      trackRelatedClick(tool, href);
    }
  };

  return (
    <section className={className}>
      <h2 className="text-lg font-semibold tracking-tight">Related tools</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={() => handleRelatedClick(item.href)}
            className="block rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/[.03] dark:hover:bg-white/[.04] transition-colors"
          >
            <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
