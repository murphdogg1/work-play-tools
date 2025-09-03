import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import GuideLayout from "@/components/GuideLayout";
import Related, { type RelatedItem } from "@/components/Related";
import AdSlot from "@/components/AdSlot";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { generateOgImageUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Benefits & Deductions Guide",
  description: "Learn about employee benefits, deductions, and their impact on take-home pay.",
  openGraph: {
    title: "Benefits & Deductions Guide",
    description: "Learn about employee benefits, deductions, and their impact on take-home pay.",
    images: [
      {
        url: generateOgImageUrl("Benefits & Deductions Guide", "Learn about employee benefits, deductions, and their impact on take-home pay."),
        width: 1200,
        height: 630,
        alt: "Benefits & Deductions Guide - Learn about employee benefits, deductions, and their impact on take-home pay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benefits & Deductions Guide",
    description: "Learn about employee benefits, deductions, and their impact on take-home pay.",
    images: [generateOgImageUrl("Benefits & Deductions Guide", "Learn about employee benefits, deductions, and their impact on take-home pay.")],
  },
};

const relatedItems: RelatedItem[] = [
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    description: "Calculate gross pay before benefits and deductions are applied."
  },
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    description: "Learn how benefits and deductions fit into payroll processing."
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    description: "Calculate overtime pay before benefits and deductions."
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    description: "Track hours worked to determine benefit eligibility and accrual."
  }
];

export default function BenefitsGuide() {
  const breadcrumbs = [
    { title: "Guides", href: "/guides" },
    { title: "Benefits & Deductions" },
  ];

  return (
    <>
      {breadcrumbJsonLd([
        { name: "Home", url: "https://workpaytools.com/" },
        { name: "Guides", url: "https://workpaytools.com/guides" },
        { name: "Benefits & Deductions", url: "https://workpaytools.com/guides/benefits" },
      ])}
      
      <PageHeading title="Benefits & Deductions" subtitle="Health, retirement, and other common programs" />
      
      <GuideLayout breadcrumbs={breadcrumbs}>
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Benefits overview</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Key programs and typical employer/employee contributions.</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Deductions</h2>
            <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Pretax vs post-tax deductions and their impact on paychecks.</p>
          </section>
          <AdSlot id="benefits-guide-content" />
          <Related items={relatedItems} />
        </div>
      </GuideLayout>
    </>
  );
}


