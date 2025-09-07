export default function SEOCheckPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        SEO Status Check
      </h1>
      
      <div className="space-y-6">
        {/* Quick Status Checks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick SEO Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Domain</h3>
              <p className="text-green-600">✅ workpaytools.com</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Status</h3>
              <p className="text-yellow-600">⚠️ Not yet indexed by Google</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Robots.txt</h3>
              <p className="text-green-600">✅ Available at /robots.txt</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Sitemap</h3>
              <p className="text-green-600">✅ Available at /sitemap.xml</p>
            </div>
          </div>
        </div>

        {/* Immediate Actions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Immediate Actions Needed
          </h2>
          <ol className="space-y-3 text-blue-800 dark:text-blue-200">
            <li>
              <strong>1. Submit to Google Search Console:</strong>
              <br />
              <span className="text-sm">Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="underline">Google Search Console</a> and add your property</span>
            </li>
            <li>
              <strong>2. Verify Domain Ownership:</strong>
              <br />
              <span className="text-sm">Use the HTML tag method with: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">uORANjBwxHNbfacAtskWGmKWnB7YMV_3ukAG2L9J_44</code></span>
            </li>
            <li>
              <strong>3. Submit Sitemap:</strong>
              <br />
              <span className="text-sm">Submit: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">https://workpaytools.com/sitemap.xml</code></span>
            </li>
            <li>
              <strong>4. Request Indexing:</strong>
              <br />
              <span className="text-sm">Use URL Inspection Tool to request indexing for key pages</span>
            </li>
          </ol>
        </div>

        {/* Test Your URLs */}
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
            Test Your URLs
          </h2>
          <div className="space-y-2">
            <p className="text-green-800 dark:text-green-200">
              <strong>Check if these are working:</strong>
            </p>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>• <a href="/robots.txt" target="_blank" className="underline">/robots.txt</a></li>
              <li>• <a href="/sitemap.xml" target="_blank" className="underline">/sitemap.xml</a></li>
              <li>• <a href="/" className="underline">Homepage</a></li>
              <li>• <a href="/calculators" className="underline">Calculators</a></li>
            </ul>
          </div>
        </div>

        {/* Search Test */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
            Search Test
          </h2>
          <p className="text-yellow-800 dark:text-yellow-200 mb-2">
            Test if your site appears in Google search:
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded">
            <code className="text-yellow-900 dark:text-yellow-100">
              site:workpaytools.com
            </code>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
            If no results appear, your site is not yet indexed by Google.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Expected Timeline
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>Immediate:</strong> SEO files now accessible</p>
            <p><strong>24-48 hours:</strong> Google starts crawling your site</p>
            <p><strong>1-2 weeks:</strong> Full indexing of all pages</p>
            <p><strong>Ongoing:</strong> Monitor in Google Search Console</p>
          </div>
        </div>
      </div>
    </div>
  );
}
