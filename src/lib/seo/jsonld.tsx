import React from "react";

function Script({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function organizationJsonLd({ name, url, logo }: { name: string; url: string; logo?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo ? { logo } : {}),
  };
  return <Script data={data} />;
}

export function websiteJsonLd({ url, searchUrl }: { url: string; searchUrl?: string }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
  };
  if (searchUrl) {
    data.potentialAction = {
      "@type": "SearchAction",
      target: `${searchUrl}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    };
  }
  return <Script data={data} />;
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <Script data={data} />;
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return <Script data={data} />;
}


