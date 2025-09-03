"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { gaPageview } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    gaPageview(url);
  }, [pathname, searchParams]);

  return null;
}
