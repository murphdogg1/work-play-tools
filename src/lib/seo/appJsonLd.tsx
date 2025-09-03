interface WebAppJsonLdProps {
  name: string;
  url: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  price?: string;
  priceCurrency?: string;
}

export default function WebAppJsonLd({
  name,
  url,
  description = "Free payroll and HR calculation tool",
  applicationCategory = "FinanceApplication",
  operatingSystem = "Web",
  price = "0",
  priceCurrency = "USD"
}: WebAppJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "url": url,
    "description": description,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency
    },
    "publisher": {
      "@type": "Organization",
      "name": "WorkPayTools",
      "url": "https://workpaytools.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
