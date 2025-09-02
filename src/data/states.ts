export type StateInfo = { slug: string; name: string };

export const STATES: StateInfo[] = [
  { slug: "ca", name: "California" },
  { slug: "ny", name: "New York" },
  { slug: "tx", name: "Texas" },
  { slug: "fl", name: "Florida" },
  { slug: "il", name: "Illinois" },
  { slug: "pa", name: "Pennsylvania" },
  { slug: "oh", name: "Ohio" },
  { slug: "ga", name: "Georgia" },
  { slug: "nc", name: "North Carolina" },
  { slug: "mi", name: "Michigan" },
];

export function getStateBySlug(slug: string): StateInfo | undefined {
  return STATES.find((s) => s.slug === slug);
}


