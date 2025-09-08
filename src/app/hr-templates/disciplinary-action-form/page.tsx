import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Disciplinary Action Form Template",
  description: "Document incidents and corrective actions with this professional disciplinary action form template. Get accurate calculations and expert guidance.",
  openGraph: {
    title: "Disciplinary Action Form Template",
    description: "Document incidents and corrective actions with this professional disciplinary action form template. Get accurate calculations and expert guidance.",
    images: [
      {
        url: generateOgImageUrl("Disciplinary Action Form Template", "Document incidents and corrective actions with this professional disciplinary action form template."),
        width: 1200,
        height: 630,
        alt: "Disciplinary Action Form Template - Document incidents and corrective actions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disciplinary Action Form Template",
    description: "Document incidents and corrective actions with this professional disciplinary action form template. Get accurate calculations and expert guidance.",
    images: [generateOgImageUrl("Disciplinary Action Form Template", "Document incidents and corrective actions with this professional disciplinary action form template.")],
  },
};

export default function DisciplinaryActionFormTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "Disciplinary Action Form" }]} />
      <PageHeading title="Disciplinary Action Form" subtitle="Document incidents and corrective steps" />
      <AdSlot id="disciplinary-action-form-template" />

      {/* Template Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disciplinary Action Form Template</h2>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-base mb-2">DISCIPLINARY ACTION FORM</h3>
              <p className="text-gray-600 dark:text-gray-400">Date: [Date] | Form ID: [ID]</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">1. EMPLOYEE INFORMATION</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Employee Name:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Employee Name]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Employee ID:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Employee ID]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Position/Title:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Position]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Department:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Department]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Hire Date:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Hire Date]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Supervisor:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Supervisor Name]</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. INCIDENT DETAILS</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Date of Incident:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Date]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Time of Incident:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Time]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Location:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Location]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Description of Incident:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[100px] bg-gray-50 dark:bg-gray-700">
                    [Detailed description of what occurred, including specific behaviors, actions, or violations observed]
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. INVESTIGATION</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Investigation Conducted By:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Investigator Name & Title]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Investigation Date:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Date]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Witnesses Interviewed:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[80px] bg-gray-50 dark:bg-gray-700">
                    [List names and contact information of witnesses]
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Evidence Reviewed:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[80px] bg-gray-50 dark:bg-gray-700">
                    [List documents, records, or other evidence reviewed]
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. POLICY VIOLATION</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Policy/Procedure Violated:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Specific policy or procedure]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Severity Level:</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="severity" className="mr-2" />
                      <span>Minor - First offense</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="severity" className="mr-2" />
                      <span>Moderate - Repeated offense or serious violation</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="severity" className="mr-2" />
                      <span>Major - Serious misconduct or safety violation</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. CORRECTIVE ACTION</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Action Taken:</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Verbal Warning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Written Warning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Final Warning</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Suspension (specify duration)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>Termination</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Specific Corrective Measures:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[100px] bg-gray-50 dark:bg-gray-700">
                    [Detailed description of corrective actions, training requirements, or performance improvement plans]
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Expected Improvement:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[80px] bg-gray-50 dark:bg-gray-700">
                    [Clear expectations for future behavior and performance]
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6. EMPLOYEE ACKNOWLEDGMENT</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Employee Response:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[100px] bg-gray-50 dark:bg-gray-700">
                    [Space for employee to provide their perspective or response]
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Employee Signature:</label>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-1 min-h-[40px]"></div>
                    <div className="text-xs text-gray-500 mt-1">Date: _______________</div>
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">Supervisor Signature:</label>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-1 min-h-[40px]"></div>
                    <div className="text-xs text-gray-500 mt-1">Date: _______________</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">7. FOLLOW-UP</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Follow-up Date:</label>
                  <div className="border-b border-gray-300 dark:border-gray-600 pb-1">[Date]</div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">Follow-up Notes:</label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded p-3 min-h-[80px] bg-gray-50 dark:bg-gray-700">
                    [Space for follow-up observations and outcomes]
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Legal Notice:</strong> This form should be reviewed by legal counsel before use. Ensure compliance with local labor laws and company policies. Maintain confidentiality and proper documentation procedures.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage Guidelines</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">When to Use This Form</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Employee performance issues that require documentation</li>
                <li>Policy violations that need formal correction</li>
                <li>Behavioral issues that impact workplace safety or productivity</li>
                <li>Attendance or punctuality problems</li>
                <li>Insubordination or unprofessional conduct</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Conduct thorough investigation before taking action</li>
                <li>Document all incidents objectively and factually</li>
                <li>Provide clear expectations for improvement</li>
                <li>Follow progressive discipline when appropriate</li>
                <li>Maintain consistency across similar situations</li>
                <li>Keep all documentation confidential and secure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
