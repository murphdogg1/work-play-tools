"use client";

import { useEffect, useRef, useState } from "react";

export type AdSlotProps = {
  id: string;
  adSlot?: string; // Optional AdSense ad unit ID
  className?: string;
  style?: React.CSSProperties;
  testMode?: boolean; // Allow testing in development
};

export default function AdSlot({ id, adSlot, className, style, testMode = false }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);

  useEffect(() => {
    // Only load ads in production or test mode
    if (process.env.NODE_ENV !== "production" && !testMode) {
      return;
    }

    const loadAd = () => {
      // Check if Google AdSense is available
      if (typeof window === "undefined" || !window.adsbygoogle) {
        console.log(`AdSense not loaded yet for slot ${id}, retrying...`);
        // Retry after a short delay
        setTimeout(loadAd, 1000);
        return;
      }

      // Initialize the ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdLoaded(true);
        console.log(`Ad loaded successfully for slot: ${id}`);
      } catch (error) {
        console.error(`Error loading ad for slot ${id}:`, error);
        setAdError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    // Start loading the ad
    loadAd();
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

  // Show error state if ad failed to load
  if (adError) {
    return (
      <div 
        className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 text-center text-sm text-red-600 dark:text-red-400 ${className || ""}`}
        style={style}
      >
        Ad Error: {adError}
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
      {!isAdLoaded && (
        <div className="text-center text-xs text-gray-400 mt-2">
          Loading ad...
        </div>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
