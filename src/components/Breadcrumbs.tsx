import Link from "next/link";

export type Crumb = { href?: string; label: string };

export default function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-black/70 dark:text-white/70">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-black/90 dark:text-white/90">{item.label}</span>
            )}
            {idx < items.length - 1 ? <span className="mx-2">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}


