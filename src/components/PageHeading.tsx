import React from "react";

type PageHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function PageHeading({ title, subtitle, className }: PageHeadingProps) {
  return (
    <div className={className}>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-sm sm:text-base text-black/70 dark:text-white/70 max-w-prose">{subtitle}</p>
      ) : null}
    </div>
  );
}


