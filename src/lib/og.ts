export function generateOgImageUrl(title: string, subtitle?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://workpaytools.com';
  const params = new URLSearchParams({
    title: title,
    ...(subtitle && { subtitle }),
  });
  
  return `${baseUrl}/og?${params.toString()}`;
}
