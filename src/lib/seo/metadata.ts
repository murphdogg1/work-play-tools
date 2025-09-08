import type { Metadata } from "next";

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  imageTitle?: string;
  imageDescription?: string;
  noIndex?: boolean;
}

/**
 * Ensures title is <= 60 characters and description is between 120-160 characters
 * Truncates with ellipses if needed
 */
export function validateSeoText(title: string, description: string): { title: string; description: string } {
  const maxTitleLength = 60;
  const maxDescriptionLength = 160;
  const minDescriptionLength = 120;
  
  const truncatedTitle = title.length > maxTitleLength 
    ? title.substring(0, maxTitleLength - 3) + "..."
    : title;
    
  let truncatedDescription = description;
  if (description.length < minDescriptionLength) {
    // Pad short descriptions with additional context
    truncatedDescription = description + ". Get accurate calculations, state-specific rules, and expert guidance.";
  } else if (description.length > maxDescriptionLength) {
    truncatedDescription = description.substring(0, maxDescriptionLength - 3) + "...";
  }
    
  return {
    title: truncatedTitle,
    description: truncatedDescription
  };
}

/**
 * Generates consistent metadata for all pages
 */
export function generateMetadata(config: SeoConfig): Metadata {
  const { title, description, url, imageTitle, imageDescription, noIndex } = config;
  const { title: validTitle, description: validDescription } = validateSeoText(title, description);
  
  const baseUrl = "https://www.workpaytools.com";
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;
  const ogImageUrl = `${baseUrl}/og?title=${encodeURIComponent(imageTitle || validTitle)}&description=${encodeURIComponent(imageDescription || validDescription)}`;
  
  return {
    title: validTitle,
    description: validDescription,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: validTitle,
      description: validDescription,
      url: pageUrl,
      siteName: "WorkPayTools",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: validTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: validTitle,
      description: validDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * Generates calculator-specific metadata
 */
export function generateCalculatorMetadata(
  calculatorName: string,
  description: string,
  url: string
): Metadata {
  return generateMetadata({
    title: `${calculatorName} 2025 | WorkPayTools`,
    description: `Free ${description} for 2025. Calculate ${calculatorName.toLowerCase()} with accurate rates and rules. No signup required.`,
    url,
    imageTitle: `${calculatorName} (2025)`,
    imageDescription: description,
  });
}

/**
 * Generates guide-specific metadata
 */
export function generateGuideMetadata(
  guideTitle: string,
  description: string,
  url: string
): Metadata {
  return generateMetadata({
    title: `${guideTitle} 2025 | WorkPayTools`,
    description: `Complete guide to ${description} in 2025. Expert insights, examples, and compliance information.`,
    url,
    imageTitle: guideTitle,
    imageDescription: description,
  });
}

/**
 * Generates state-specific metadata
 */
export function generateStateMetadata(
  stateName: string,
  topic: string,
  description: string,
  url: string
): Metadata {
  return generateMetadata({
    title: `${stateName} ${topic} 2025 | WorkPayTools`,
    description: `Learn about ${description} in ${stateName}. Current rates, rules, and compliance requirements for 2025.`,
    url,
    imageTitle: `${topic} in ${stateName}`,
    imageDescription: description,
  });
}
