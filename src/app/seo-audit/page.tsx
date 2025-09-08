"use client";

import { useEffect, useState } from "react";

export default function SEOAuditPage() {
  const [auditResults, setAuditResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runSEOAudit = async () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        domain: "workpaytools.com",
        issues: [],
        recommendations: [],
        checks: {}
      };

      // Check 1: Robots.txt
      try {
        const robotsResponse = await fetch('/robots.txt');
        if (robotsResponse.ok) {
          const robotsText = await robotsResponse.text();
          results.checks.robotsTxt = {
            status: "✅ Found",
            content: robotsText.substring(0, 200) + "..."
          };
        } else {
          results.issues.push("Robots.txt not accessible");
          results.checks.robotsTxt = { status: "❌ Not Found" };
        }
      } catch (error) {
        results.issues.push("Robots.txt check failed");
        results.checks.robotsTxt = { status: "❌ Error" };
      }

      // Check 2: Sitemap
      try {
        const sitemapResponse = await fetch('/sitemap.xml');
        if (sitemapResponse.ok) {
          const sitemapText = await sitemapResponse.text();
          results.checks.sitemap = {
            status: "✅ Found",
            content: sitemapText.substring(0, 200) + "..."
          };
        } else {
          results.issues.push("Sitemap not accessible");
          results.checks.sitemap = { status: "❌ Not Found" };
        }
      } catch (error) {
        results.issues.push("Sitemap check failed");
        results.checks.sitemap = { status: "❌ Error" };
      }

      // Check 3: Meta tags
      const metaTags = {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content'),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
        ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
        ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content')
      };

      results.checks.metaTags = metaTags;

      // Check for missing meta tags
      if (!metaTags.description) {
        results.issues.push("Missing meta description");
      }
      if (!metaTags.canonical) {
        results.issues.push("Missing canonical URL");
      }
      if (!metaTags.ogTitle) {
        results.issues.push("Missing Open Graph title");
      }

      // Check 4: Page structure
      const headings = {
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length
      };

      results.checks.headings = headings;

      if (headings.h1 === 0) {
        results.issues.push("No H1 tag found");
      }
      if (headings.h1 > 1) {
        results.issues.push("Multiple H1 tags found");
      }

      // Check 5: Content length
      const contentLength = document.body.innerText.length;
      results.checks.contentLength = contentLength;

      if (contentLength < 300) {
        results.issues.push("Page content too short (less than 300 characters)");
      }

      // Check 6: Images alt text
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
      results.checks.images = {
        total: images.length,
        withoutAlt: imagesWithoutAlt.length
      };

      if (imagesWithoutAlt.length > 0) {
        results.issues.push(`${imagesWithoutAlt.length} images missing alt text`);
      }

      // Generate recommendations
      if (results.issues.length === 0) {
        results.recommendations.push("✅ All basic SEO checks passed!");
      } else {
        results.recommendations.push("Fix the issues listed above");
      }

      results.recommendations.push("Submit your sitemap to Google Search Console");
      results.recommendations.push("Request indexing for your main pages");
      results.recommendations.push("Build quality backlinks to improve domain authority");
      results.recommendations.push("Monitor your site's performance in Google Search Console");

      setAuditResults(results);
      setIsLoading(false);
    };

    runSEOAudit();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            SEO Audit
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Running SEO audit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          SEO Audit Results
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive SEO analysis for workpaytools.com
        </p>
      </div>

      {/* Issues Found */}
      {auditResults.issues && auditResults.issues.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-4">
            Issues Found ({auditResults.issues.length})
          </h2>
          <ul className="space-y-2">
            {auditResults.issues.map((issue: string, index: number) => (
              <li key={index} className="text-red-800 dark:text-red-200 flex items-start">
                <span className="text-red-500 mr-2">❌</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Recommendations
        </h2>
        <ul className="space-y-2">
          {auditResults.recommendations.map((rec: string, index: number) => (
            <li key={index} className="text-blue-800 dark:text-blue-200 flex items-start">
              <span className="text-blue-500 mr-2">💡</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed Checks */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Detailed Checks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Technical SEO</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Robots.txt:</span>
                <span className={auditResults.checks.robotsTxt?.status?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                  {auditResults.checks.robotsTxt?.status || 'Not checked'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sitemap:</span>
                <span className={auditResults.checks.sitemap?.status?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                  {auditResults.checks.sitemap?.status || 'Not checked'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Content Analysis</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Content Length:</span>
                <span>{auditResults.checks.contentLength} characters</span>
              </div>
              <div className="flex justify-between">
                <span>H1 Tags:</span>
                <span>{auditResults.checks.headings?.h1 || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Images:</span>
                <span>{auditResults.checks.images?.total || 0} total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
        <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
          Quick Actions to Get Indexed
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">1. Submit to Google Search Console</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mb-2">
              Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="underline">Google Search Console</a> and:
            </p>
            <ul className="text-sm text-green-700 dark:text-green-300 list-disc list-inside ml-4">
              <li>Add your property: workpaytools.com</li>
              <li>Verify ownership using the HTML tag method</li>
              <li>Submit your sitemap: https://www.workpaytools.com/sitemap.xml</li>
              <li>Request indexing for your main pages</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">2. Test Your URLs</h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Use Google's URL Inspection Tool to test individual pages and request indexing.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">3. Check Indexing Status</h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Search for: <code className="bg-green-100 dark:bg-green-800 px-2 py-1 rounded">site:workpaytools.com</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
