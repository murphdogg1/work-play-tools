import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Link from "next/link";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.",
  openGraph: {
    title: "Privacy Policy",
    description: "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.",
    images: [
      {
        url: generateOgImageUrl("Privacy Policy", "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data."),
        width: 1200,
        height: 630,
        alt: "Privacy Policy - WorkPayTools privacy policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description: "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.",
    images: [generateOgImageUrl("Privacy Policy", "Learn about WorkPayTools privacy policy - we use minimal analytics and do not sell your data.")],
  },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Privacy Policy" subtitle="Your privacy matters to us" />
      
      {/* Related Tools */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Free Tools</h2>
        <p className="text-gray-600 dark:text-gray-400">
          While you're here, explore our comprehensive suite of free payroll and HR tools:
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/calculators/overtime-pay" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Overtime Pay Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate overtime pay with state-specific rules</p>
          </Link>
          <Link href="/calculators/payroll" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Payroll Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate gross pay, taxes, and deductions</p>
          </Link>
          <Link href="/guides/overtime-rules" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white">Overtime Rules Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn about federal and state overtime requirements</p>
          </Link>
        </div>
      </section>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <strong>Last Updated:</strong> December 2024
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            WorkPayTools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our calculators and tools.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          
          <h3 className="text-lg font-medium">2.1 Information You Provide</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Email addresses (only when you voluntarily subscribe to our newsletter)</li>
            <li>Calculation inputs you enter into our calculators (processed locally in your browser)</li>
            <li>Contact information when you reach out to us via our contact form</li>
          </ul>

          <h3 className="text-lg font-medium">2.2 Information We Collect Automatically</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Usage data and analytics through Google Analytics (anonymized)</li>
            <li>Device information (browser type, operating system)</li>
            <li>IP address (anonymized for analytics purposes)</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
          </ul>

          <h3 className="text-lg font-medium">2.3 Cookies and Tracking Technologies</h3>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Analyze site usage and improve user experience</li>
            <li>Remember your preferences and settings</li>
            <li>Provide personalized content and advertisements</li>
            <li>Ensure site security and prevent fraud</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide and maintain our calculator services</li>
            <li>Improve our website functionality and user experience</li>
            <li>Send newsletters and updates (only if you subscribe)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Analyze usage patterns to enhance our services</li>
            <li>Ensure compliance with legal obligations</li>
            <li>Protect against fraud and security threats</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:</p>
          
          <h3 className="text-lg font-medium">4.1 Service Providers</h3>
          <p>We may share information with trusted third-party service providers who assist us in:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Website hosting and maintenance</li>
            <li>Analytics and performance monitoring</li>
            <li>Email delivery services</li>
            <li>Customer support services</li>
          </ul>

          <h3 className="text-lg font-medium">4.2 Legal Requirements</h3>
          <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>

          <h3 className="text-lg font-medium">4.3 Business Transfers</h3>
          <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
          
          <h3 className="text-lg font-medium">5.1 Security Measures</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>SSL encryption for data transmission</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage and backup procedures</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. Your Rights and Choices</h2>
          
          <h3 className="text-lg font-medium">6.1 Access and Control</h3>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h3 className="text-lg font-medium">6.2 Cookie Preferences</h3>
          <p>You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.</p>

          <h3 className="text-lg font-medium">6.3 Newsletter Unsubscribe</h3>
          <p>You can unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email we send or by contacting us directly.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">7. Children&apos;s Privacy</h2>
          <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">8. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">9. International Data Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">10. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of our services after any modifications constitutes acceptance of the updated Privacy Policy.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">11. Contact Information</h2>
          <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Email: <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Form</Link></li>
            <li>Website: <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">WorkPayTools.com</Link></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">12. Legal Disclaimer</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm">
              <strong>Important Legal Notice:</strong> The calculators and tools provided on this website are for informational and educational purposes only. They are not intended to provide legal, tax, financial, or professional advice. Results should not be considered as definitive or binding for any legal, tax, or financial decisions. Users should consult with qualified professionals for specific advice related to their individual circumstances.
            </p>
            <p className="text-sm mt-2">
              WorkPayTools disclaims all liability for any errors, omissions, or inaccuracies in the calculations or information provided. We make no warranties, express or implied, regarding the accuracy, reliability, or completeness of any information on this website.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">13. Compliance with Laws</h2>
          <p>This Privacy Policy is designed to comply with applicable privacy laws, including but not limited to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>General Data Protection Regulation (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA)</li>
            <li>Children&apos;s Online Privacy Protection Act (COPPA)</li>
            <li>Other applicable federal, state, and local privacy laws</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">14. Data Retention</h2>
          <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">15. Limitation of Liability</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm">
              <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, WorkPayTools shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our website, calculators, or services, regardless of the theory of liability and even if we have been advised of the possibility of such damages.
            </p>
            <p className="text-sm mt-2">
              Our total liability to you for any claims arising from or related to this Privacy Policy or your use of our services shall not exceed the amount you paid us, if any, for accessing our services, or $100, whichever is greater.
            </p>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Tools</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our free payroll and HR tools while keeping your data secure:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/calculators/overtime-pay" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white">Overtime Pay Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate overtime pay with state-specific rules</p>
            </Link>
            <Link href="/calculators/payroll" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white">Payroll Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate gross pay, taxes, and deductions</p>
            </Link>
            <Link href="/guides/overtime-rules" className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-white">Overtime Rules Guide</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Learn about federal and state overtime requirements</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}


