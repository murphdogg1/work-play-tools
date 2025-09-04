"use client";

import { useEffect, useState } from "react";

export default function AdSenseDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<any>({});

  useEffect(() => {
    const runDiagnostics = () => {
      const results: any = {
        timestamp: new Date().toISOString(),
        issues: [],
        recommendations: []
      };

      // Check 1: AdSense Script Loading
      if (typeof window !== 'undefined') {
        if (!window.adsbygoogle) {
          results.issues.push("AdSense script not loaded");
          results.recommendations.push("Check if AdSense script is properly included in layout.tsx");
        } else {
          results.adsenseLoaded = true;
          results.adsenseVersion = window.adsbygoogle.length;
        }
      }

      // Check 2: AdSense Meta Tag
      const adsenseMeta = document.querySelector('meta[name="google-adsense-account"]');
      if (!adsenseMeta) {
        results.issues.push("AdSense meta tag not found");
        results.recommendations.push("Add meta tag with your AdSense account ID");
      } else {
        results.adsenseMeta = adsenseMeta.getAttribute('content');
      }

      // Check 3: AdSense Script Source
      const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (!adsenseScript) {
        results.issues.push("AdSense script tag not found");
        results.recommendations.push("Add AdSense script to layout.tsx");
      } else {
        results.adsenseScript = adsenseScript.getAttribute('src');
      }

      // Check 4: Content Quality
      const contentLength = document.body.innerText.length;
      if (contentLength < 500) {
        results.issues.push("Insufficient content for AdSense");
        results.recommendations.push("Add more text content to your pages");
      }
      results.contentLength = contentLength;

      // Check 5: Ad Blockers (basic check)
      const testImg = new Image();
      testImg.onerror = () => {
        results.issues.push("Potential ad blocker detected");
        results.recommendations.push("Test in incognito mode or disable ad blockers");
      };
      testImg.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

      // Check 6: Console Errors
      const originalError = console.error;
      const errors: string[] = [];
      console.error = (...args) => {
        errors.push(args.join(' '));
        originalError(...args);
      };

      setTimeout(() => {
        results.consoleErrors = errors;
        console.error = originalError;
        setDiagnostics(results);
      }, 2000);
    };

    runDiagnostics();
  }, []);

  if (Object.keys(diagnostics).length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">Running diagnostics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        AdSense Diagnostic Results
      </h3>
      
      {diagnostics.issues && diagnostics.issues.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-red-600 mb-2">Issues Found:</h4>
          <ul className="list-disc list-inside space-y-1">
            {diagnostics.issues.map((issue: string, index: number) => (
              <li key={index} className="text-sm text-red-600">{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {diagnostics.recommendations && diagnostics.recommendations.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-blue-600 mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1">
            {diagnostics.recommendations.map((rec: string, index: number) => (
              <li key={index} className="text-sm text-blue-600">{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">AdSense Loaded:</span>
          <span className={`ml-2 ${diagnostics.adsenseLoaded ? 'text-green-600' : 'text-red-600'}`}>
            {diagnostics.adsenseLoaded ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <span className="font-medium">Content Length:</span>
          <span className="ml-2">{diagnostics.contentLength} chars</span>
        </div>
        <div>
          <span className="font-medium">AdSense Meta:</span>
          <span className="ml-2">{diagnostics.adsenseMeta || 'Not found'}</span>
        </div>
        <div>
          <span className="font-medium">Script Found:</span>
          <span className={`ml-2 ${diagnostics.adsenseScript ? 'text-green-600' : 'text-red-600'}`}>
            {diagnostics.adsenseScript ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
}
