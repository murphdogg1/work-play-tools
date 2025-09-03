import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Offer Letter Template",
  description: "Professional offer letter template for hiring new employees with role, compensation, and terms.",
  openGraph: {
    title: "Offer Letter Template",
    description: "Professional offer letter template for hiring new employees with role, compensation, and terms.",
    images: [
      {
        url: generateOgImageUrl("Offer Letter Template", "Professional offer letter template for hiring new employees with role, compensation, and terms."),
        width: 1200,
        height: 630,
        alt: "Offer Letter Template - Professional offer letter template for hiring new employees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offer Letter Template",
    description: "Professional offer letter template for hiring new employees with role, compensation, and terms.",
    images: [generateOgImageUrl("Offer Letter Template", "Professional offer letter template for hiring new employees with role, compensation, and terms.")],
  },
};

export default function OfferLetterTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "Offer Letter" }]} />
      <PageHeading title="Offer Letter Template" subtitle="Professional job offer letter template with legal compliance" />
      <AdSlot id="offer-letter-template" />

      {/* Template Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Offer Letter Template</h2>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4 text-sm">
            <div className="text-right text-gray-600 dark:text-gray-400">
              [Date]
            </div>
            
            <div>
              <p>[Candidate Name]</p>
              <p>[Address]</p>
            </div>
            
            <div>
              <p className="font-semibold">Dear [Candidate Name],</p>
            </div>
            
            <div>
              <p>We are pleased to offer you the position of <strong>[Job Title]</strong> at [Company Name]. We believe your skills and experience will be a valuable addition to our team.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Position Details:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Job Title:</strong> [Job Title]</li>
                <li><strong>Department:</strong> [Department]</li>
                <li><strong>Reports to:</strong> [Manager Name]</li>
                <li><strong>Start Date:</strong> [Start Date]</li>
                <li><strong>Work Location:</strong> [Address/City, State]</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Compensation:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Annual Salary:</strong> $[Amount] (paid [bi-weekly/monthly])</li>
                <li><strong>Pay Period:</strong> [Frequency]</li>
                <li><strong>Overtime:</strong> [Exempt/Non-exempt status]</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Benefits:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Health insurance (effective [date])</li>
                <li>Dental and vision coverage</li>
                <li>401(k) retirement plan with [company match details]</li>
                <li>Paid time off: [X] days annually</li>
                <li>[Additional benefits specific to your company]</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Employment Terms:</h3>
              <p>This is an at-will employment position, meaning either you or [Company Name] may terminate this employment relationship at any time, with or without cause or notice. This offer is contingent upon:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Successful completion of background check</li>
                <li>Verification of employment eligibility (I-9 form)</li>
                <li>Reference checks</li>
                <li>[Any other specific requirements]</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Confidentiality and Non-Compete:</h3>
              <p>As a condition of employment, you will be required to sign our standard confidentiality agreement and [non-compete/non-solicitation agreement if applicable].</p>
            </div>
            
            <div>
              <p>We are excited about the possibility of you joining our team. Please indicate your acceptance of this offer by signing and returning this letter by [Date]. If you have any questions, please don't hesitate to contact me.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p>Sincerely,</p>
                <br />
                <p>[Hiring Manager Name]</p>
                <p>[Title]</p>
                <p>[Company Name]</p>
              </div>
              
              <div className="border-t pt-4">
                <p className="mb-4">I accept this offer of employment:</p>
                <div className="flex justify-between">
                  <div>
                    <p>Signature: _________________________</p>
                    <p>Date: _________________________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Best Practices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold">Essential Elements</h3>
            <ul className="space-y-2 text-sm">
              <li>• Include specific job title and department</li>
              <li>• State exact compensation and pay frequency</li>
              <li>• Specify start date and work location</li>
              <li>• List key benefits and eligibility dates</li>
              <li>• Include at-will employment language</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Legal Considerations</h3>
            <ul className="space-y-2 text-sm">
              <li>• Ensure compliance with state employment laws</li>
              <li>• Include contingency clauses for background checks</li>
              <li>• Specify any required agreements (NDA, non-compete)</li>
              <li>• Set clear acceptance deadline</li>
              <li>• Review with legal counsel for complex roles</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related Resources</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href="/guides/payroll-basics" className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-medium">Payroll Basics Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn about payroll processing and compliance</p>
          </a>
          <a href="/calculators/hourly-to-salary" className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-medium">Salary Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Convert hourly rates to annual salary</p>
          </a>
        </div>
      </section>
    </div>
  );
}


