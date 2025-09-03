declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function gaPageview(path: string) {
  if (typeof window === "undefined") return;
  const id = "G-KYVLET7NMT";
  if (!id || !window.gtag) return;
  
  // Track pageview with enhanced parameters
  window.gtag("config", id, { 
    page_path: path,
    page_title: document.title,
    page_location: window.location.href
  });
  
  // Also send a page_view event for better tracking
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href
  });
}

export function gaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params || {});
}

// Calculator-specific event tracking
export function trackCalculatorInput(tool: string, field: string, valueBucket?: string) {
  gaEvent("calculator_input", {
    tool,
    field,
    valueBucket,
    page_path: window.location.pathname,
  });
}

export function trackCalculatorSubmit(tool: string) {
  gaEvent("calculator_submit", {
    tool,
    page_path: window.location.pathname,
  });
}

export function trackCalculatorCopy(tool: string) {
  gaEvent("calculator_copy", {
    tool,
    page_path: window.location.pathname,
  });
}

export function trackRelatedClick(from: string, to: string) {
  gaEvent("related_click", {
    from,
    to,
    page_path: window.location.pathname,
  });
}

// Search palette event tracking
export function trackSearchOpen() {
  gaEvent("search_open", {
    page_path: window.location.pathname,
  });
}

export function trackSearchSelect(query: string, href: string) {
  gaEvent("search_select", {
    query,
    href,
    page_path: window.location.pathname,
  });
}

// Enhanced tracking for calculator engagement
export function trackCalculatorEngagement(tool: string, action: string, value?: string) {
  gaEvent("calculator_engagement", {
    tool,
    action,
    value,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}

// Track user session duration on calculators
export function trackCalculatorSession(tool: string, duration: number) {
  gaEvent("calculator_session", {
    tool,
    duration_seconds: Math.round(duration / 1000),
    page_path: window.location.pathname,
  });
}


