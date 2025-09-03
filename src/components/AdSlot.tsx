"use client";

import { useEffect, useRef } from "react";

export type AdSlotProps = {
  id: string;
  adSlot?: string; // Optional AdSense ad unit ID
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSlot({ id, adSlot, className, style }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Check if Google AdSense is available
    if (typeof window === "undefined" || !window.adsbygoogle) {
      return;
    }

    // Initialize the ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error loading ad:", error);
    }
  }, []);

  // Don't render anything in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400 ${className || ""}`}
        style={style}
      >
        [Ad Slot: {id}] - Only shown in production
      </div>
    );
  }

  return (
    <div className={`my-6 ${className || ""}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6178941739913559"
        data-ad-slot={adSlot || "auto"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
