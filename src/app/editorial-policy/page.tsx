import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Editorial Policy - Content Standards | WorkPayTools",
  description: "Learn about our editorial policy, content creation standards, review process, and how we maintain accuracy in our payroll and HR guides.",
  openGraph: {
    title: "Editorial Policy - Content Standards | WorkPayTools",
    description: "Learn about our editorial policy, content creation standards, review process, and how we maintain accuracy in our payroll and HR guides.",
    images: [
      {
        url: generateOgImageUrl("Editorial Policy", "Our content creation standards and review process"),
        width: 1200,
        height: 630,
        alt: "Editorial Policy - Content Standards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy - Content Standards | WorkPayTools",
    description: "Learn about our editorial policy, content creation standards, review process, and how we maintain accuracy.",
    images: [generateOgImageUrl("Editorial Policy", "Our content creation standards and review process")],
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="space-y-8">
      <PageHeading 
        title="Editorial Policy" 
        subtitle="Our commitment to accurate, helpful, and up-to-date content" 
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Editorial Policy", url: "https://www.workpaytools.com/editorial-policy" },
      ])}

      <AdSlot id="editorial-overview" />

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">
          At WorkPayTools, we're committed to providing accurate, helpful, and up-to-date content 
          about payroll, HR, and employment law. This editorial policy outlines our standards for 
          content creation, review processes, and how we handle corrections and updates.
        </p>
      </section>

      {/* Content Creation Standards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Content Creation Standards</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Accuracy First</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• All content is based on current laws, regulations, and official sources</li>
              <li>• Tax rates and labor laws are verified against official government sources</li>
              <li>• Calculations are tested and validated before publication</li>
              <li>• Sources are cited and linked when possible</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Clarity & Accessibility</h3>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Complex topics are explained in plain English</li>
              <li>• Content is structured for easy scanning and comprehension</li>
              <li>• Examples and scenarios are provided when helpful</li>
              <li>• Technical jargon is minimized and explained</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">User-Focused</h3>
            <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Content addresses real user needs and questions</li>
              <li>• Practical examples and actionable advice are prioritized</li>
              <li>• Content is organized for easy navigation and discovery</li>
              <li>• Related tools and resources are linked appropriately</li>
            </ul>
          </div>
        </div>
      </section>

      <AdSlot id="editorial-review" />

      {/* Review Process */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Review Process</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Initial Review</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Content is reviewed for accuracy, clarity, and completeness</li>
              <li>• Sources are verified and citations are checked</li>
              <li>• Technical accuracy is validated by subject matter experts</li>
              <li>• Grammar, spelling, and style are reviewed</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Regular Updates</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Content is reviewed quarterly for accuracy and relevance</li>
              <li>• Tax rates and labor laws are updated as they change</li>
              <li>• User feedback is incorporated into content improvements</li>
              <li>• Last reviewed dates are displayed on all content</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Citation Standards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Citation Standards</h2>
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Primary Sources</h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>• IRS publications and tax forms</li>
              <li>• Department of Labor regulations and fact sheets</li>
              <li>• State labor department websites and publications</li>
              <li>• Official government websites and databases</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Secondary Sources</h3>
            <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
              <li>• Reputable HR and payroll industry publications</li>
              <li>• Professional association guidelines and best practices</li>
              <li>• Legal databases and court decisions (when relevant)</li>
              <li>• Academic research and studies (when applicable)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Last Reviewed Dates */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Last Reviewed Dates</h2>
        <p className="text-gray-600 dark:text-gray-400">
          All content includes a "Last Reviewed" date to help users understand when information 
          was last verified and updated. This transparency helps users make informed decisions 
          about the currency of our information.
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Review Schedule</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• <strong>Tax-related content:</strong> Reviewed annually in January</li>
            <li>• <strong>Labor law content:</strong> Reviewed quarterly</li>
            <li>• <strong>Calculator functionality:</strong> Tested monthly</li>
            <li>• <strong>General guides:</strong> Reviewed semi-annually</li>
          </ul>
        </div>
      </section>

      {/* Corrections Process */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How We Handle Corrections</h2>
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Error Reporting</h3>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
              <li>• Users can report errors through our contact form</li>
              <li>• All error reports are investigated within 48 hours</li>
              <li>• Corrections are made promptly when errors are confirmed</li>
              <li>• Users who report errors are notified of the resolution</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Correction Process</h3>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Errors are verified against official sources</li>
              <li>• Content is updated with correct information</li>
              <li>• A correction note may be added when appropriate</li>
              <li>• Last reviewed date is updated to reflect the correction</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact for Corrections */}
      <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Report an Error</h2>
        <p className="text-indigo-800 dark:text-indigo-200 mb-4">
          Found an error in our content? We take accuracy seriously and appreciate your help 
          in maintaining the highest standards. Please contact us with specific details about 
          the error and the correct information.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
