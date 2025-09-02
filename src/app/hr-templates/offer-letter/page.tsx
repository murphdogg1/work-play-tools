import PageHeading from "@/components/PageHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function OfferLetterTemplate() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/hr-templates", label: "HR Templates" }, { label: "Offer Letter" }]} />
      <PageHeading title="Offer Letter" subtitle="A simple offer letter starting point" />
      <section className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <p className="text-sm sm:text-base text-black/80 dark:text-white/80">Use this template to outline role, compensation, and at-will terms.</p>
      </section>
    </div>
  );
}


