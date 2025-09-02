import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function OvertimeRulesGuide() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/guides", label: "Guides" }, { label: "Overtime Rules" }]} />
      <PageHeading title="Overtime Rules" subtitle="Thresholds, rates, and compliance basics" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Weekly thresholds</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Common threshold is 40 hours, but local laws may differ.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Rates</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Typical overtime is 1.5x; double-time may apply in specific cases.</p>
      </section>
    </div>
  );
}


