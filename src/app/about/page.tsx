import PageHeading from "@/components/PageHeading";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="About WorkPayTools" subtitle="Who we are and what we do" />
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        WorkPayTools provides simple, fast tools to help small teams and solo operators
        run payroll and HR with confidence.
      </p>
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        Explore our <Link href="/calculators" className="hover:underline">calculators</Link>,
        browse <Link href="/guides" className="hover:underline">guides</Link>, and download
        <Link href="/hr-templates" className="hover:underline"> HR templates</Link>.
      </p>
    </div>
  );
}


