"use client";

import { useEffect, useRef } from "react";

export type AdSlotTestProps = {
  id: string;
  adSlot?: string; // Optional AdSense ad unit ID
  className?: string;
  style?: React.CSSProperties;
  testMode?: boolean; // Allow testing in development
};

export default function AdSlotTest({ id, adSlot, className, style, testMode = false }: AdSlotTestProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Only load ads in production or test mode
    if (process.env.NODE_ENV !== "production" && !testMode) {
      return;
    }

    // Check if Google AdSense is available
    if (typeof window === "undefined" || !window.adsbygoogle) {
      console.log("AdSense not loaded yet, retrying...");
      // Retry after a short delay
      setTimeout(() => {
        if (window.adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log("Ad loaded successfully");
          } catch (error) {
            console.error("Error loading ad:", error);
          }
        }
      }, 1000);
      return;
    }

    // Initialize the ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Ad initialized for slot:", id);
    } catch (error) {
      console.error("Error loading ad:", error);
    }
  }, [id, testMode]);

  // Show placeholder in development unless testMode is true
  if (process.env.NODE_ENV !== "production" && !testMode) {
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
    <div className={`my-4 ${className || ""}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ 
          display: "block",
          minHeight: "90px", // Reserve space to prevent layout shift
          width: "100%"
        }}
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
