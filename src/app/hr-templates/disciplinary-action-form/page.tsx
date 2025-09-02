import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DisciplinaryActionFormTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "Disciplinary Action Form" }]} />
      <PageHeading title="Disciplinary Action Form" subtitle="Document incidents and corrective steps" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Capture incident details, expectations, and follow-up plans.</p>
      </section>
    </div>
  );
}


