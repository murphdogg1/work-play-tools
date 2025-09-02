export function safeNumber(input: unknown): number {
  if (typeof input === "number") {
    return Number.isFinite(input) ? input : 0;
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    const parsed = parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

export function currency(value: unknown, locale: string = "en-US", currencyCode: string = "USD"): string {
  const n = safeNumber(value);
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode, maximumFractionDigits: 2 }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

// Formats a numeric percent (e.g., 12.5 -> "12.5%") with up to 2 decimal places.
export function percent(value: unknown, maximumFractionDigits: number = 2, locale: string = "en-US"): string {
  const n = safeNumber(value);
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits }).format(n) + "%";
  } catch {
    return `${n.toFixed(Math.min(Math.max(maximumFractionDigits, 0), 20))}%`;
  }
}


