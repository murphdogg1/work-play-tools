import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { generateOgImageUrl } from "@/lib/og";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools.",
  openGraph: {
    title: "Contact",
    description: "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools.",
    images: [
      {
        url: generateOgImageUrl("Contact", "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools."),
        width: 1200,
        height: 630,
        alt: "Contact - Get in touch with WorkPayTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools.",
    images: [generateOgImageUrl("Contact", "Get in touch with WorkPayTools - we'd love to hear from you about our payroll and HR tools.")],
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <PageHeading title="Contact" subtitle="We'd love to hear from you" />
      <ContactForm />
    </div>
  );
}


