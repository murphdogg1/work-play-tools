import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PtoPolicyTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "PTO Policy" }]} />
      <PageHeading title="PTO Policy" subtitle="A clear time-off policy outline" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Covers accruals, requests, holidays, and approvals.</p>
      </section>
    </div>
  );
}


