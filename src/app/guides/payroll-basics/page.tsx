import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PayrollBasicsGuide() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/guides", label: "Guides" }, { label: "Payroll Basics" }]} />
      <PageHeading title="Payroll Basics" subtitle="Key terms and concepts" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">An introduction to payroll cycles, gross vs net pay, and compliance.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Payroll cycle</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Weekly, bi-weekly, semi-monthly, and monthly options and implications.</p>
      </section>
    </div>
  );
}


