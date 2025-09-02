import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BenefitsGuide() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/guides", label: "Guides" }, { label: "Benefits & Deductions" }]} />
      <PageHeading title="Benefits & Deductions" subtitle="Health, retirement, and other common programs" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Benefits overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Key programs and typical employer/employee contributions.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Deductions</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Pretax vs post-tax deductions and their impact on paychecks.</p>
      </section>
    </div>
  );
}


