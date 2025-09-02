import PageHeading from "@/components/PageHeading";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Privacy Policy" subtitle="Your privacy matters to us" />
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">
        This site uses minimal analytics to improve the product. We do not sell your data.
        Contact us via the <Link href="/contact" className="hover:underline">contact page</Link> with any questions.
      </p>
    </div>
  );
}


