"use client";

import { useEffect, useState } from "react";
import AdSlot from "@/components/AdSlot";
import ResponsiveAdSlot from "@/components/ResponsiveAdSlot";

export default function AdSenseDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    // Capture console logs
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      setConsoleLogs(prev => [...prev, `LOG: ${args.join(' ')}`]);
      originalLog(...args);
    };

    console.error = (...args) => {
      setConsoleLogs(prev => [...prev, `ERROR: ${args.join(' ')}`]);
      originalError(...args);
    };

    console.warn = (...args) => {
      setConsoleLogs(prev => [...prev, `WARN: ${args.join(' ')}`]);
      originalWarn(...args);
    };

    // Check AdSense status
    const checkAdSenseStatus = () => {
      const info: any = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        adBlockers: [],
        adsenseLoaded: false,
        adsenseVersion: null,
        errors: []
      };

      // Check if AdSense is loaded
      if (typeof window !== 'undefined') {
        info.adsenseLoaded = !!window.adsbygoogle;
        info.adsenseVersion = window.adsbygoogle ? window.adsbygoogle.length : 0;
      }

      // Check for common ad blockers
      const adBlockTests = [
        'googlesyndication.com',
        'googletagservices.com',
        'doubleclick.net',
        'adsystem.amazon.com'
      ];

      adBlockTests.forEach(domain => {
        const testImg = new Image();
        testImg.onerror = () => {
          info.adBlockers.push(domain);
        };
        testImg.src = `https://${domain}/test.png`;
      });

      // Check for AdSense script
      const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
      info.adsenseScriptFound = !!adsenseScript;
      info.adsenseScriptSrc = adsenseScript?.getAttribute('src') || 'Not found';

      // Check for AdSense meta tag
      const adsenseMeta = document.querySelector('meta[name="google-adsense-account"]');
      info.adsenseMetaFound = !!adsenseMeta;
      info.adsenseMetaContent = adsenseMeta?.getAttribute('content') || 'Not found';

      // Check page content
      info.pageContentLength = document.body.innerText.length;
      info.hasEnoughContent = document.body.innerText.length > 500;

      setDebugInfo(info);
    };

    // Run initial check
    checkAdSenseStatus();

    // Check again after a delay
    setTimeout(checkAdSenseStatus, 3000);

    // Cleanup
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AdSense Debug Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive diagnostic tool for AdSense issues
        </p>
      </div>

      {/* Debug Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">AdSense Status</h3>
            <p className={`text-sm ${debugInfo.adsenseLoaded ? 'text-green-600' : 'text-red-600'}`}>
              {debugInfo.adsenseLoaded ? '✅ Loaded' : '❌ Not Loaded'}
            </p>
            <p className="text-sm text-gray-500">
              Version: {debugInfo.adsenseVersion || 'Unknown'}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Script Status</h3>
            <p className={`text-sm ${debugInfo.adsenseScriptFound ? 'text-green-600' : 'text-red-600'}`}>
              {debugInfo.adsenseScriptFound ? '✅ Found' : '❌ Not Found'}
            </p>
            <p className="text-sm text-gray-500 break-all">
              {debugInfo.adsenseScriptSrc}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Meta Tag</h3>
            <p className={`text-sm ${debugInfo.adsenseMetaFound ? 'text-green-600' : 'text-red-600'}`}>
              {debugInfo.adsenseMetaFound ? '✅ Found' : '❌ Not Found'}
            </p>
            <p className="text-sm text-gray-500">
              {debugInfo.adsenseMetaContent}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Content Quality</h3>
            <p className={`text-sm ${debugInfo.hasEnoughContent ? 'text-green-600' : 'text-yellow-600'}`}>
              {debugInfo.hasEnoughContent ? '✅ Sufficient' : '⚠️ Low Content'}
            </p>
            <p className="text-sm text-gray-500">
              {debugInfo.pageContentLength} characters
            </p>
          </div>
        </div>
      </div>

      {/* Ad Blockers Detection */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Ad Blocker Detection
        </h2>
        {debugInfo.adBlockers && debugInfo.adBlockers.length > 0 ? (
          <div className="text-red-600">
            <p className="font-medium">⚠️ Potential ad blockers detected:</p>
            <ul className="list-disc list-inside mt-2">
              {debugInfo.adBlockers.map((blocker: string, index: number) => (
                <li key={index} className="text-sm">{blocker}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-green-600">✅ No ad blockers detected</p>
        )}
      </div>

      {/* Test Ad Slots */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Test Ad Slots - Different Sizes
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Small Ad (300x250)</h3>
            <ResponsiveAdSlot id="debug-small" size="small" testMode={true} />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Medium Ad (336x280)</h3>
            <ResponsiveAdSlot id="debug-medium" size="medium" testMode={true} />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Large Ad (728x90)</h3>
            <ResponsiveAdSlot id="debug-large" size="large" testMode={true} />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Auto Responsive Ad</h3>
            <ResponsiveAdSlot id="debug-auto" size="auto" testMode={true} />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Original AdSlot (Fixed Size)</h3>
            <AdSlot id="debug-original" testMode={true} />
          </div>
        </div>
      </div>

      {/* Console Logs */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Console Logs
        </h2>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
          {consoleLogs.length > 0 ? (
            consoleLogs.map((log, index) => (
              <div key={index} className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-1">
                {log}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No console logs yet...</p>
          )}
        </div>
      </div>

      {/* Troubleshooting Steps */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Troubleshooting Steps
        </h2>
        <ol className="space-y-2 text-blue-800 dark:text-blue-200">
          <li>1. <strong>Check AdSense Dashboard:</strong> Log in to your AdSense account and verify your account status</li>
          <li>2. <strong>Verify Domain:</strong> Make sure your domain is added to your AdSense account</li>
          <li>3. <strong>Check Policy Center:</strong> Look for any policy violations or warnings</li>
          <li>4. <strong>Wait for Activation:</strong> New ad units can take 15-30 minutes to start showing ads</li>
          <li>5. <strong>Test Without Ad Blockers:</strong> Use incognito mode or disable ad blockers</li>
          <li>6. <strong>Check Content Quality:</strong> Ensure your pages have sufficient text content</li>
          <li>7. <strong>Verify Ad Code:</strong> Make sure the ad code is not modified or placed incorrectly</li>
        </ol>
      </div>

      {/* Quick Actions */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
        <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
          Quick Actions
        </h2>
        <div className="space-y-2">
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Refresh Page
          </button>
          <button
            onClick={() => {
              if (window.adsbygoogle) {
                window.adsbygoogle.push({});
                console.log('Manually triggered AdSense refresh');
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ml-2"
          >
            Force AdSense Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
