"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";
import { gaEvent } from "@/lib/analytics";

export default function WebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const sendToAnalytics = (metric: any) => {
      gaEvent("web_vital", {
        name: metric.name,
        value: Math.round(metric.value),
        id: metric.id,
        delta: Math.round(metric.delta),
        navigationType: metric.navigationType,
      });
    };

    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);
  }, []);

  return null;
}
