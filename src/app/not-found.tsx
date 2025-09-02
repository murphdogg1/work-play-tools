import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-sm sm:text-base text-black/80 dark:text-white/80">We couldn’t find that page. Try one of these:</p>
      <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
        <li><Link href="/calculators" className="hover:underline">Calculators</Link></li>
        <li><Link href="/guides" className="hover:underline">Guides</Link></li>
        <li><Link href="/" className="hover:underline">Home</Link></li>
      </ul>
    </div>
  );
}


