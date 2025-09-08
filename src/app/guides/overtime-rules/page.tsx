import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import GuideLayout from "@/components/GuideLayout";
import FAQ, { FaqJsonLd, type FaqItem } from "@/components/FAQ";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Overtime Rules Guide",
  description: "Learn about overtime thresholds, rates, and compliance requirements by state.",
  openGraph: {
    title: "Overtime Rules Guide",
    description: "Learn about overtime thresholds, rates, and compliance requirements by state.",
    images: [
      {
        url: generateOgImageUrl("Overtime Rules Guide", "Learn about overtime thresholds, rates, and compliance requirements by state."),
        width: 1200,
        height: 630,
        alt: "Overtime Rules Guide - Learn about overtime thresholds, rates, and compliance requirements by state",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overtime Rules Guide",
    description: "Learn about overtime thresholds, rates, and compliance requirements by state.",
    images: [generateOgImageUrl("Overtime Rules Guide", "Learn about overtime thresholds, rates, and compliance requirements by state.")],
  },
};

const faqItems: FaqItem[] = [
  {
    q: "What is the federal overtime threshold?",
    a: "The federal Fair Labor Standards Act (FLSA) requires overtime pay of 1.5x the regular rate for hours worked over 40 in a workweek. This applies to non-exempt employees regardless of how they are paid (hourly, salary, commission, etc.)."
  },
  {
    q: "Are salaried employees exempt from overtime?",
    a: "Not necessarily. Salary alone doesn't determine overtime exemption. Employees must meet specific duties tests and salary thresholds ($684 per week/$35,568 annually as of 2024) to be exempt from overtime requirements."
  },
  {
    q: "Can states have different overtime rules than federal law?",
    a: "Yes, states can have more protective overtime laws than federal law, but not less protective. For example, California requires daily overtime after 8 hours, while federal law only requires weekly overtime after 40 hours."
  },
  {
    q: "What happens if I work overtime but my employer doesn't pay it?",
    a: "You may file a complaint with the Department of Labor's Wage and Hour Division or pursue legal action. Employers who violate overtime laws may be required to pay back wages plus liquidated damages equal to the back wages."
  }
];

const relatedItems: RelatedItem[] = [
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate your overtime pay based on hours worked and state rules."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track your weekly hours to determine overtime eligibility."
  },
  {
    title: "California Overtime Rules",
    href: "/guides/overtime-rules/ca",
    description: "Daily overtime, double-time, and meal break requirements in California."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn the fundamentals of payroll processing and overtime compliance."
  },
  {
    title: "Benefits & Deductions Guide",
    href: "/guides/benefits",
    description: "Understand how overtime affects benefits and deductions."
  },
  {
    title: "Hourly to Salary Calculator",
    href: "/calculators/hourly-to-salary",
    description: "Convert hourly rates to salary equivalents for overtime calculations."
  }
];

export default function OvertimeRulesGuide() {
  const breadcrumbs = [
    { title: "Guides", href: "/guides" },
    { title: "Overtime Rules" },
  ];

  return (
    <>
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Guides", url: "https://www.workpaytools.com/guides" },
        { name: "Overtime Rules", url: "https://www.workpaytools.com/guides/overtime-rules" },
      ])}
      
      <PageHeading title="Overtime Rules" subtitle="Thresholds, rates, and compliance basics" />
      
      <GuideLayout breadcrumbs={breadcrumbs}>
        <div className="space-y-8">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">What Are Overtime Rules?</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              Overtime rules are federal and state labor laws that require employers to pay eligible employees additional compensation for hours worked beyond standard work periods. These rules protect workers from excessive hours without fair compensation.
            </p>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              The primary federal law governing overtime is the Fair Labor Standards Act (FLSA), which establishes minimum wage, overtime pay, recordkeeping, and child labor standards. States can have additional or more protective overtime requirements.
            </p>
          </section>

          {/* Federal Overtime Rules */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Federal Overtime Rules (FLSA)</h2>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Key Federal Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Overtime Threshold:</strong> 40 hours per workweek</li>
                <li>• <strong>Overtime Rate:</strong> 1.5x regular rate of pay</li>
                <li>• <strong>Workweek Definition:</strong> Any fixed 7 consecutive days (168 hours)</li>
                <li>• <strong>Exemptions:</strong> Certain executive, administrative, professional, and outside sales employees</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Who Is Covered?</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                Most employees are covered by FLSA overtime rules unless they meet specific exemption criteria. Coverage depends on:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600 dark:text-gray-400">
                <li>Enterprise coverage (businesses with $500,000+ annual sales)</li>
                <li>Individual coverage (employees engaged in interstate commerce)</li>
                <li>Specific industry coverage (hospitals, schools, government agencies)</li>
              </ul>
            </div>
          </section>

          {/* Exempt vs Non-Exempt */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Exempt vs Non-Exempt Employees</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">Non-Exempt Employees</h3>
                <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                  <li>• Must receive overtime pay for hours over 40/week</li>
                  <li>• Can be paid hourly, salary, or commission</li>
                  <li>• Must track all hours worked</li>
                  <li>• Protected by minimum wage laws</li>
                  <li>• Most hourly workers are non-exempt</li>
                </ul>
              </div>
              
              <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">Exempt Employees</h3>
                <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <li>• Not entitled to overtime pay</li>
                  <li>• Must meet salary and duties tests</li>
                  <li>• Minimum salary: $684/week ($35,568/year)</li>
                  <li>• Executive, administrative, or professional duties</li>
                  <li>• Computer professionals, outside sales</li>
                </ul>
              </div>
            </div>
          </section>

          {/* State Variations */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">State Overtime Variations</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
              States can have more protective overtime laws than federal law, but not less protective. Here are common state variations:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold">Daily Overtime States</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Some states require overtime pay for daily hours over 8, regardless of weekly total:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600 dark:text-gray-400">
                  <li><strong>California:</strong> 1.5x after 8 hours/day, 2x after 12 hours/day</li>
                  <li><strong>Nevada:</strong> 1.5x after 8 hours/day</li>
                  <li><strong>Alaska:</strong> 1.5x after 8 hours/day</li>
                  <li><strong>Colorado:</strong> 1.5x after 12 hours/day</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold">Higher Salary Thresholds</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Some states have higher salary requirements for exemption:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600 dark:text-gray-400">
                  <li><strong>New York:</strong> $1,125/week ($58,500/year) for most exemptions</li>
                  <li><strong>California:</strong> $1,280/week ($66,560/year) for most exemptions</li>
                  <li><strong>Washington:</strong> $1,101.80/week ($57,293.60/year)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Overtime Calculations */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">How Overtime Is Calculated</h2>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Regular Rate of Pay</h3>
              <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
                The regular rate includes all compensation for hours worked, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600 dark:text-gray-400">
                <li>Base hourly rate or salary converted to hourly</li>
                <li>Shift differentials</li>
                <li>Bonuses (if earned during the workweek)</li>
                <li>Commissions (prorated over hours worked)</li>
                <li>Non-discretionary bonuses</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Overtime Calculation Example</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Regular hours (40 × $20):</span>
                  <span className="font-medium">$800.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Overtime hours (5 × $30):</span>
                  <span className="font-medium">$150.00</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total Pay:</span>
                  <span className="font-medium">$950.00</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Overtime rate = $20 × 1.5 = $30/hour
              </p>
            </div>
          </section>

          {/* Common Overtime Scenarios */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Common Overtime Scenarios</h2>
            
            <div className="grid gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Salaried Non-Exempt Employees</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Even salaried employees can be entitled to overtime if they don&apos;t meet exemption criteria. Their regular rate is calculated by dividing weekly salary by hours worked.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Commission-Based Employees</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Commission employees are often non-exempt. Their regular rate includes commissions earned during the workweek, divided by total hours worked.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Compensatory Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Private sector employers generally cannot offer comp time instead of overtime pay. Public sector employers have limited comp time options under specific conditions.
                </p>
              </div>
            </div>
          </section>

          {/* Compliance Requirements */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Compliance Requirements</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Employer Responsibilities</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Properly classify employees as exempt or non-exempt</li>
                  <li>• Track all hours worked by non-exempt employees</li>
                  <li>• Pay overtime at 1.5x regular rate</li>
                  <li>• Maintain accurate payroll records</li>
                  <li>• Post required labor law notices</li>
                  <li>• Comply with both federal and state laws</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">Recordkeeping Requirements</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Employee name and social security number</li>
                  <li>• Hours worked each day and week</li>
                  <li>• Regular rate of pay and overtime rate</li>
                  <li>• Total wages paid each pay period</li>
                  <li>• Date of payment and pay period covered</li>
                  <li>• Records must be kept for 3 years</li>
                </ul>
              </div>
            </div>
          </section>

          <AdSlot id="overtime-rules-guide-content" />
          
          {/* FAQ */}
          <FAQ items={faqItems} />
          <FaqJsonLd items={faqItems} />

          {/* References */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">References & Sources</h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Fair Labor Standards Act (FLSA):</strong> 29 U.S.C. § 201 et seq.</li>
                <li>• <strong>Department of Labor:</strong> Wage and Hour Division Fact Sheets</li>
                <li>• <strong>Code of Federal Regulations:</strong> 29 CFR Part 541 (Exemptions)</li>
                <li>• <strong>State Labor Departments:</strong> Individual state overtime laws</li>
                <li>• <strong>Bureau of Labor Statistics:</strong> Overtime and Hours Worked Data</li>
                <li>• <strong>Society for Human Resource Management (SHRM):</strong> Overtime Compliance Guidelines</li>
                <li>• <strong>National Employment Law Project:</strong> State Overtime Law Summaries</li>
              </ul>
            </div>
          </section>

          <Related items={relatedItems} tool="overtime-rules" />
          
          <p className="text-xs text-black/60 dark:text-white/60">
            This guide provides general information only and is not legal advice. Consult with qualified professionals for specific situations.
          </p>
        </div>
      </GuideLayout>
    </>
  );
}


