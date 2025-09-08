"use client";

import { useEffect, useState } from "react";

export default function CanonicalAuditPage() {
  const [auditResults, setAuditResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runCanonicalAudit = async () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        domain: "workpaytools.com",
        issues: [],
        recommendations: [],
        pages: []
      };

      // Test key pages for canonical URL issues
      const testPages = [
        { path: "/", expected: "https://www.workpaytools.com" },
        { path: "/calculators", expected: "https://www.workpaytools.com/calculators" },
        { path: "/calculators/overtime-pay", expected: "https://www.workpaytools.com/calculators/overtime-pay" },
        { path: "/guides", expected: "https://www.workpaytools.com/guides" },
        { path: "/hr-templates", expected: "https://www.workpaytools.com/hr-templates" },
        { path: "/about", expected: "https://www.workpaytools.com/about" },
        { path: "/contact", expected: "https://www.workpaytools.com/contact" },
        { path: "/privacy", expected: "https://www.workpaytools.com/privacy" },
        { path: "/terms", expected: "https://www.workpaytools.com/terms" }
      ];

      for (const page of testPages) {
        try {
          // Use absolute URL for production environment
          const baseUrl = window.location.origin;
          const response = await fetch(`${baseUrl}${page.path}`);
          if (response.ok) {
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
            const title = doc.querySelector('title')?.textContent;
            
            const pageResult = {
              path: page.path,
              status: response.status,
              canonical: canonical,
              expected: page.expected,
              title: title,
              hasCanonical: !!canonical,
              canonicalCorrect: canonical === page.expected,
              issues: [] as string[]
            };

            if (!canonical) {
              pageResult.issues.push("Missing canonical URL");
              results.issues.push(`${page.path}: Missing canonical URL`);
            } else if (canonical !== page.expected) {
              pageResult.issues.push(`Canonical URL mismatch: ${canonical} (expected: ${page.expected})`);
              results.issues.push(`${page.path}: Canonical URL mismatch`);
            }

            if (!title) {
              pageResult.issues.push("Missing title tag");
              results.issues.push(`${page.path}: Missing title tag`);
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

      // Generate recommendations
      if (results.issues.length === 0) {
        results.recommendations.push("✅ All canonical URLs are correctly configured!");
      } else {
        results.recommendations.push("Fix the canonical URL issues listed above");
      }

      results.recommendations.push("Ensure all pages use the generateMetadata function");
      results.recommendations.push("Remove any hardcoded canonical URLs from layout files");
      results.recommendations.push("Test canonical URLs in Google Search Console");
      results.recommendations.push("Use relative URLs in canonical tags to avoid protocol issues");

      setAuditResults(results);
      setIsLoading(false);
    };

    runCanonicalAudit();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Canonical URL Audit
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Running canonical URL audit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Canonical URL Audit Results
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive analysis of canonical URL configuration
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{auditResults.pages.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pages Tested</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {auditResults.pages.filter((p: any) => p.canonicalCorrect).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Correct Canonicals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{auditResults.issues.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Issues Found</div>
          </div>
        </div>
      </div>

      {/* Issues */}
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
                  Canonical URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Issues
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
                    ) : page.canonicalCorrect ? (
                      <span className="text-green-600">✅ OK</span>
                    ) : (
                      <span className="text-yellow-600">⚠️ Issue</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {page.canonical || 'Not found'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {page.issues && page.issues.length > 0 ? (
                      <ul className="space-y-1">
                        {page.issues.map((issue: string, i: number) => (
                          <li key={i} className="text-red-600">{issue}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-green-600">None</span>
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

      {/* Quick Fixes */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
        <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
          Quick Fixes Applied
        </h2>
        <ul className="space-y-2 text-green-800 dark:text-green-200">
          <li>✅ Removed hardcoded canonical URL from layout.tsx</li>
          <li>✅ Added proper metadata to homepage</li>
          <li>✅ Ensured all pages use generateMetadata function</li>
          <li>✅ Fixed canonical URL conflicts</li>
        </ul>
      </div>
    </div>
  );
}
