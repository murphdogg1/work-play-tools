"use client";

import { useEffect, useRef, useState } from "react";

export type ResponsiveAdSlotProps = {
  id: string;
  adSlot?: string;
  className?: string;
  style?: React.CSSProperties;
  testMode?: boolean;
  size?: "small" | "medium" | "large" | "leaderboard" | "auto";
};

const adSizes = {
  small: { width: "300px", height: "250px", minHeight: "250px" },
  medium: { width: "336px", height: "280px", minHeight: "280px" },
  large: { width: "728px", height: "90px", minHeight: "90px" },
  leaderboard: { width: "728px", height: "90px", minHeight: "90px" },
  auto: { width: "100%", height: "250px", minHeight: "250px" }
};

export default function ResponsiveAdSlot({ 
  id, 
  adSlot, 
  className, 
  style, 
  testMode = false,
  size = "auto"
}: ResponsiveAdSlotProps) {
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
        console.log(`Ad loaded successfully for slot: ${id} (${size})`);
      } catch (error) {
        console.error(`Error loading ad for slot ${id}:`, error);
        setAdError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    // Start loading the ad
    loadAd();
  }, [id, testMode, size]);

  // Show placeholder in development unless testMode is true
  if (process.env.NODE_ENV !== "production" && !testMode) {
    const sizeInfo = adSizes[size];
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400 ${className || ""}`}
        style={{
          ...style,
          width: sizeInfo.width,
          height: sizeInfo.height,
          margin: "0 auto"
        }}
      >
        [Ad Slot: {id}] - {sizeInfo.width} x {sizeInfo.height}
        <br />
        Only shown in production
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

  const sizeInfo = adSizes[size];

  return (
    <div className={`my-6 ${className || ""}`} style={style}>
      <div 
        style={{ 
          width: "100%",
          maxWidth: sizeInfo.width,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle block"
          style={{ 
            display: "block",
            width: sizeInfo.width,
            height: sizeInfo.height,
            minHeight: sizeInfo.minHeight
          }}
          data-ad-client="ca-pub-6178941739913559"
          data-ad-slot={adSlot || "auto"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      {!isAdLoaded && (
        <div className="text-center text-xs text-gray-400 mt-2">
          Loading ad... ({sizeInfo.width} x {sizeInfo.height})
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
