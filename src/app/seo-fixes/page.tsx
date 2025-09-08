"use client";

import { useEffect, useState } from "react";

export default function SEOFixesPage() {
  const [auditResults, setAuditResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runSEOAudit = async () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        domain: "workpaytools.com",
        issues: [],
        fixes: [],
        recommendations: [],
        pages: []
      };

      // Test key pages for SEO issues
      const testPages = [
        { path: "/", expected: "https://workpaytools.com" },
        { path: "/calculators", expected: "https://workpaytools.com/calculators" },
        { path: "/calculators/overtime-pay", expected: "https://workpaytools.com/calculators/overtime-pay" },
        { path: "/guides", expected: "https://workpaytools.com/guides" },
        { path: "/hr-templates", expected: "https://workpaytools.com/hr-templates" },
        { path: "/about", expected: "https://workpaytools.com/about" },
        { path: "/contact", expected: "https://workpaytools.com/contact" },
        { path: "/privacy", expected: "https://workpaytools.com/privacy" },
        { path: "/terms", expected: "https://workpaytools.com/terms" }
      ];

      for (const page of testPages) {
        try {
          const response = await fetch(page.path);
          if (response.ok) {
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
            const title = doc.querySelector('title')?.textContent;
            const descriptions = doc.querySelectorAll('meta[name="description"]');
            const viewport = doc.querySelector('meta[name="viewport"]');
            const robots = doc.querySelector('meta[name="robots"]');
            
            const pageResult = {
              path: page.path,
              status: response.status,
              canonical: canonical,
              expected: page.expected,
              title: title,
              titleLength: title?.length || 0,
              hasCanonical: !!canonical,
              canonicalCorrect: canonical === page.expected,
              metaDescriptions: descriptions.length,
              descriptionLength: descriptions[0]?.getAttribute('content')?.length || 0,
              hasViewport: !!viewport,
              hasRobots: !!robots,
              issues: [] as string[],
              fixes: [] as string[]
            };

            // Check for issues
            if (!canonical) {
              pageResult.issues.push("Missing canonical URL");
            } else if (canonical !== page.expected) {
              pageResult.issues.push(`Canonical URL mismatch: ${canonical} (expected: ${page.expected})`);
            }

            if (pageResult.titleLength === 0) {
              pageResult.issues.push("Missing title tag");
            } else if (pageResult.titleLength > 60) {
              pageResult.issues.push(`Title too long: ${pageResult.titleLength} characters (max 60)`);
            }

            if (pageResult.metaDescriptions === 0) {
              pageResult.issues.push("Missing meta description");
            } else if (pageResult.metaDescriptions > 1) {
              pageResult.issues.push(`Multiple meta descriptions: ${pageResult.metaDescriptions}`);
            } else if (pageResult.descriptionLength > 0) {
              if (pageResult.descriptionLength < 120) {
                pageResult.issues.push(`Meta description too short: ${pageResult.descriptionLength} characters (min 120)`);
              } else if (pageResult.descriptionLength > 160) {
                pageResult.issues.push(`Meta description too long: ${pageResult.descriptionLength} characters (max 160)`);
              }
            }

            if (!pageResult.hasViewport) {
              pageResult.issues.push("Missing viewport meta tag");
            }

            // Add fixes applied
            if (pageResult.canonicalCorrect) {
              pageResult.fixes.push("✅ Canonical URL correctly configured");
            }
            if (pageResult.titleLength > 0 && pageResult.titleLength <= 60) {
              pageResult.fixes.push("✅ Title length optimized");
            }
            if (pageResult.metaDescriptions === 1 && pageResult.descriptionLength >= 120 && pageResult.descriptionLength <= 160) {
              pageResult.fixes.push("✅ Meta description optimized");
            }

            results.pages.push(pageResult);
          } else {
            results.issues.push(`${page.path}: HTTP ${response.status}`);
            results.pages.push({
              path: page.path,
              status: response.status,
              error: true
            });
          }
        } catch (error) {
          results.issues.push(`${page.path}: Error testing page`);
          results.pages.push({
            path: page.path,
            error: true,
            errorMessage: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      // Generate summary
      const totalIssues = results.pages.reduce((sum: number, page: any) => sum + (page.issues?.length || 0), 0);
      const totalFixes = results.pages.reduce((sum: number, page: any) => sum + (page.fixes?.length || 0), 0);

      results.summary = {
        totalPages: results.pages.length,
        totalIssues,
        totalFixes,
        issuesFixed: totalIssues === 0,
        canonicalFixed: results.pages.every((p: any) => p.canonicalCorrect),
        metaDescriptionFixed: results.pages.every((p: any) => p.metaDescriptions === 1),
        titleLengthFixed: results.pages.every((p: any) => p.titleLength > 0 && p.titleLength <= 60)
      };

      // Generate recommendations
      if (totalIssues === 0) {
        results.recommendations.push("🎉 All SEO issues have been resolved!");
      } else {
        results.recommendations.push("Continue monitoring and fixing remaining issues");
      }

      results.recommendations.push("Submit updated sitemap to Google Search Console");
      results.recommendations.push("Monitor Google Search Console for indexing improvements");
      results.recommendations.push("Test pages with Google's Rich Results Test");
      results.recommendations.push("Consider implementing structured data for better search results");

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
            SEO Fixes Audit
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Running comprehensive SEO audit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          SEO Fixes Audit Results
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive analysis of SEO issues and fixes applied
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{auditResults.summary?.totalPages || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pages Tested</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{auditResults.summary?.totalIssues || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Issues Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{auditResults.summary?.totalFixes || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fixes Applied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {auditResults.summary?.issuesFixed ? "✅" : "⚠️"}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
          </div>
        </div>
      </div>

      {/* Fixes Applied */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
        <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
          Fixes Applied
        </h2>
        <ul className="space-y-2 text-green-800 dark:text-green-200">
          <li>✅ Removed hardcoded meta description from layout.tsx</li>
          <li>✅ Fixed canonical URL conflicts</li>
          <li>✅ Optimized title lengths (removed "Free" and "Guide" from titles)</li>
          <li>✅ Ensured single meta description per page</li>
          <li>✅ Added proper metadata to homepage</li>
          <li>✅ Fixed redirect issues in sitemap</li>
        </ul>
      </div>

      {/* Page Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Page Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title Length
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Meta Desc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fixes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {auditResults.pages.map((page: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {page.path}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {page.error ? (
                      <span className="text-red-600">❌ Error</span>
                    ) : page.issues?.length === 0 ? (
                      <span className="text-green-600">✅ OK</span>
                    ) : (
                      <span className="text-yellow-600">⚠️ Issues</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.titleLength || 0} chars
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.metaDescriptions || 0} tags
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {page.issues && page.issues.length > 0 ? (
                      <ul className="space-y-1">
                        {page.issues.map((issue: string, i: number) => (
                          <li key={i} className="text-red-600 text-xs">{issue}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-green-600">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {page.fixes && page.fixes.length > 0 ? (
                      <ul className="space-y-1">
                        {page.fixes.map((fix: string, i: number) => (
                          <li key={i} className="text-green-600 text-xs">{fix}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Next Steps
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
    </div>
  );
}
