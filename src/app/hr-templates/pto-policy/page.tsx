import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "PTO Policy Template",
  description: "Clear paid time off policy template covering accruals, requests, holidays, and approval processes. Get accurate calculations and expert guidance.",
  openGraph: {
    title: "PTO Policy Template",
    description: "Clear paid time off policy template covering accruals, requests, holidays, and approval processes. Get accurate calculations and expert guidance.",
    images: [
      {
        url: generateOgImageUrl("PTO Policy Template", "Clear paid time off policy template covering accruals, requests, holidays, and approval processes."),
        width: 1200,
        height: 630,
        alt: "PTO Policy Template - Clear paid time off policy template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PTO Policy Template",
    description: "Clear paid time off policy template covering accruals, requests, holidays, and approval processes. Get accurate calculations and expert guidance.",
    images: [generateOgImageUrl("PTO Policy Template", "Clear paid time off policy template covering accruals, requests, holidays, and approval processes.")],
  },
};

export default function PtoPolicyTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "PTO Policy" }]} />
      <PageHeading title="PTO Policy Template" subtitle="Comprehensive paid time off policy with accrual and approval guidelines" />
      <AdSlot id="pto-policy-template" />

      {/* Policy Template */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">PTO Policy Template</h2>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-base mb-2">PAID TIME OFF (PTO) POLICY</h3>
              <p className="text-gray-600 dark:text-gray-400">Effective Date: [Date]</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">1. PURPOSE</h3>
              <p>[Company Name] recognizes the importance of work-life balance and provides paid time off (PTO) to eligible employees for rest, relaxation, personal business, and family needs.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">2. ELIGIBILITY</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All full-time employees are eligible for PTO after completing [X] days of employment</li>
                <li>Part-time employees working [X] hours or more per week are eligible for pro-rated PTO</li>
                <li>PTO accrual begins on the first day of employment</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">3. PTO ACCRUAL</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p className="font-medium mb-2">Accrual Schedule:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>0-1 years:</strong> [X] hours per pay period ([X] days annually)</li>
                  <li><strong>1-3 years:</strong> [X] hours per pay period ([X] days annually)</li>
                  <li><strong>3-5 years:</strong> [X] hours per pay period ([X] days annually)</li>
                  <li><strong>5+ years:</strong> [X] hours per pay period ([X] days annually)</li>
                </ul>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">*Accrual rates may vary by state law requirements</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">4. REQUESTING PTO</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>PTO requests must be submitted through [HR system/email] at least [X] business days in advance</li>
                <li>Emergency situations may be approved with less notice at manager discretion</li>
                <li>Requests for [X] or more consecutive days require [X] weeks advance notice</li>
                <li>All requests are subject to manager approval based on business needs</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">5. APPROVAL PROCESS</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Managers will respond to PTO requests within [X] business days</li>
                <li>Approval is based on business needs, staffing requirements, and fairness</li>
                <li>Conflicts will be resolved by seniority or first-come, first-served basis</li>
                <li>Denied requests will include explanation and alternative dates when possible</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">6. COMPANY HOLIDAYS</h3>
              <p>The following holidays are observed by [Company Name]:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>New Year&apos;s Day</li>
                <li>Martin Luther King Jr. Day</li>
                <li>Presidents&apos; Day</li>
                <li>Memorial Day</li>
                <li>Independence Day</li>
                <li>Labor Day</li>
                <li>Thanksgiving Day</li>
                <li>Day after Thanksgiving</li>
                <li>Christmas Day</li>
                <li>[Additional company-specific holidays]</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">7. CARRYOVER AND CAPS</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Maximum carryover: [X] hours from year to year</li>
                <li>Maximum PTO balance: [X] hours</li>
                <li>Excess PTO above the cap will be forfeited on [Date]</li>
                <li>Employees may request payout of excess PTO before forfeiture</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">8. TERMINATION</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Upon voluntary termination: Unused PTO will be paid out according to state law</li>
                <li>Upon involuntary termination: PTO payout subject to company policy and state law</li>
                <li>Final PTO payout will be included in the final paycheck</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">9. SICK LEAVE</h3>
              <p>PTO may be used for illness, medical appointments, and family care. For extended medical leave, employees should refer to our FMLA policy and consider short-term disability benefits.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">10. POLICY CHANGES</h3>
              <p>[Company Name] reserves the right to modify this policy at any time. Employees will be notified of changes in writing with at least [X] days notice.</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                This policy is subject to applicable federal, state, and local laws. In case of conflict, applicable law will take precedence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Implementation Guide</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold">Customization Checklist</h3>
            <ul className="space-y-2 text-sm">
              <li>• Update company name and effective date</li>
              <li>• Set accrual rates based on your needs</li>
              <li>• Define advance notice requirements</li>
              <li>• List your company&apos;s specific holidays</li>
              <li>• Set carryover limits and caps</li>
              <li>• Review state-specific requirements</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Legal Considerations</h3>
            <ul className="space-y-2 text-sm">
              <li>• Check state laws on PTO payout requirements</li>
              <li>• Ensure compliance with sick leave laws</li>
              <li>• Review FMLA and ADA requirements</li>
              <li>• Consider union contract obligations</li>
              <li>• Update employee handbook accordingly</li>
              <li>• Train managers on policy application</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related Resources</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href="/guides/benefits" className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-medium">Benefits & Deductions Guide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn about employee benefits and tax implications</p>
          </a>
          <a href="/calculators/timecard" className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h3 className="font-medium">Timecard Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track work hours and calculate totals</p>
          </a>
        </div>
      </section>
    </div>
  );
}


