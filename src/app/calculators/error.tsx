"use client";

import React from "react";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // Log to monitoring here if desired
    // console.error(error);
  }, [error]);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Please try again. If the problem persists, come back later.</p>
      <button type="button" className="inline-flex h-10 items-center rounded-md border border-black/10 dark:border-white/15 px-4 text-sm" onClick={reset}>Retry</button>
    </div>
  );
}


