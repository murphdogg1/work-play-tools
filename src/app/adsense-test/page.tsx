import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "AdSense Test Page",
  description: "Test AdSense integration and ad rendering. Debug ad placement and verify AdSense configuration.",
  openGraph: {
    title: "AdSense Test Page",
    description: "Test AdSense integration and ad rendering. Debug ad placement and verify AdSense configuration.",
    url: "https://www.workpaytools.com/adsense-test",
    type: "website",
    siteName: "WorkPayTools",
  },
  twitter: {
    card: "summary",
    title: "AdSense Test Page",
    description: "Test AdSense integration and ad rendering. Debug ad placement and verify AdSense configuration.",
  },
  alternates: {
    canonical: "https://www.workpaytools.com/adsense-test",
  },
};

export default function AdSenseTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AdSense Test Page
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This page helps you test your AdSense integration. 
          Ads will only show in production mode or when testMode is enabled.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test Ad Slot 1 (Auto)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This ad uses automatic ad placement with your AdSense account.
          </p>
          <AdSlot id="test-ad-1" testMode={true} />
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test Ad Slot 2 (Auto)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Another test ad slot to verify multiple ads work.
          </p>
          <AdSlot id="test-ad-2" testMode={true} />
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Development Mode Preview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This shows what the ad placeholder looks like in development mode.
          </p>
          <AdSlot id="dev-preview" testMode={false} />
        </section>

        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Troubleshooting Tips
          </h2>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>• Check browser console for AdSense loading messages</li>
            <li>• Ensure your AdSense account is approved and active</li>
            <li>• Wait 24-48 hours after approval for ads to appear</li>
            <li>• Test in production mode: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">npm run build && npm start</code></li>
            <li>• Check your AdSense dashboard for ad unit status</li>
            <li>• Verify your domain is added to your AdSense account</li>
          </ul>
        </section>

        <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
            Your AdSense Configuration
          </h2>
          <div className="space-y-2 text-green-800 dark:text-green-200">
            <p><strong>Client ID:</strong> ca-pub-6178941739913559</p>
            <p><strong>Ad Format:</strong> Auto (responsive)</p>
            <p><strong>Ad Slots:</strong> Multiple throughout the site</p>
            <p><strong>Status:</strong> ✅ Script loaded in layout.tsx</p>
          </div>
        </section>
      </div>
    </div>
  );
}
