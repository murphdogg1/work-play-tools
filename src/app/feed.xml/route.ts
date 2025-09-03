import { MetadataRoute } from 'next'

export async function GET(): Promise<Response> {
  const baseUrl = 'https://workpaytools.com'
  
  const guides = [
    {
      title: 'Payroll Basics Guide',
      description: 'Essential payroll concepts and step-by-step processing guide',
      url: '/guides/payroll-basics',
      date: new Date('2025-01-15')
    },
    {
      title: 'Overtime Rules by State',
      description: 'State-specific overtime regulations and compliance requirements',
      url: '/guides/overtime-rules',
      date: new Date('2025-01-10')
    },
    {
      title: 'Benefits & Deductions Guide',
      description: 'Employee benefits and tax deduction guidelines',
      url: '/guides/benefits',
      date: new Date('2025-01-05')
    },
    {
      title: 'Payroll Software Comparison',
      description: 'Compare popular payroll software solutions and features',
      url: '/guides/payroll-software-comparison',
      date: new Date('2025-01-01')
    }
  ]

  const rssItems = guides.map(guide => ({
    title: guide.title,
    description: guide.description,
    url: `${baseUrl}${guide.url}`,
    lastModified: guide.date.toISOString(),
  }))

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WorkPayTools Guides</title>
    <description>Latest payroll and HR guides from WorkPayTools</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${new Date(item.lastModified).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
