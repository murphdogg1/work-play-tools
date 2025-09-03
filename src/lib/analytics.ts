declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function gaPageview(path: string) {
  if (typeof window === "undefined") return;
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !window.gtag) return;
  window.gtag("config", id, { page_path: path });
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


