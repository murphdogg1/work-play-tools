import PageHeading from "@/components/PageHeading";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Terms of Service" subtitle="Please read these terms carefully" />
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        By using WorkPayTools, you agree to our terms. If you have questions,
        please <Link href="/contact" className="hover:underline">contact us</Link>.
      </p>
    </div>
  );
}


