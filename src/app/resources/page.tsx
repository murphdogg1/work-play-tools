import type { Metadata } from "next";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import AdSlot from "@/components/AdSlot";
import { generateOgImageUrl } from "@/lib/og";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Resources - WorkPayTools",
  description: "Additional tools, information, and resources for payroll, HR, and business compliance. Find help, learn about our mission, and access important policies.",
  openGraph: {
    title: "Resources - WorkPayTools",
    description: "Additional tools, information, and resources for payroll, HR, and business compliance. Find help, learn about our mission, and access important policies.",
    images: [
      {
        url: generateOgImageUrl("Resources", "Additional tools, information, and resources for payroll, HR, and business compliance"),
        width: 1200,
        height: 630,
        alt: "Resources - WorkPayTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources - WorkPayTools",
    description: "Additional tools, information, and resources for payroll, HR, and business compliance.",
    images: [generateOgImageUrl("Resources", "Additional tools, information, and resources for payroll, HR, and business compliance")],
  },
};

const resourceCategories = [
  {
    title: "Company Information",
    description: "Learn about WorkPayTools and our mission",
    icon: "🏢",
    links: [
      {
        title: "About WorkPayTools",
        href: "/about",
        description: "Learn about our mission, team, and commitment to providing free payroll tools"
      },
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get help, provide feedback, or ask questions about our tools"
      }
    ]
  },
  {
    title: "Legal & Privacy",
    description: "Important policies and legal information",
    icon: "⚖️",
    links: [
      {
        title: "Privacy Policy",
        href: "/privacy",
        description: "How we protect and handle your personal data and information"
      },
      {
        title: "Terms of Service",
        href: "/terms",
        description: "Terms and conditions for using WorkPayTools services"
      }
    ]
  },
  {
    title: "Quick Access",
    description: "Popular tools and calculators",
    icon: "⚡",
    links: [
      {
        title: "All Calculators",
        href: "/calculators",
        description: "Browse all our free payroll and HR calculators"
      },
      {
        title: "All Guides",
        href: "/guides",
        description: "Comprehensive guides on payroll, overtime, and HR topics"
      },
      {
        title: "HR Templates",
        href: "/hr-templates",
        description: "Ready-to-use HR documents and templates"
      }
    ]
  }
];

const additionalResources = [
  {
    title: "Methodology",
    href: "/methodology",
    description: "Learn how our calculators work and our data sources",
    status: "Available"
  },
  {
    title: "Editorial Policy",
    href: "/editorial-policy",
    description: "How we create, review, and maintain our content",
    status: "Available"
  }
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <PageHeading 
        title="Resources" 
        subtitle="Additional tools, information, and resources to help you with payroll, HR, and business compliance" 
      />
      {breadcrumbJsonLd([
        { name: "Home", url: "https://www.workpaytools.com/" },
        { name: "Resources", url: "https://www.workpaytools.com/resources" },
      ])}

      <AdSlot id="resources-overview" />

      {/* Resource Categories */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Resource Categories</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resourceCategories.map((category) => (
            <div key={category.title} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {link.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {link.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot id="resources-additional" />

      {/* Additional Resources */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {additionalResources.map((resource) => (
            <div key={resource.href} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
                </div>
                <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  resource.status === 'Available' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {resource.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Need Help?</h2>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          Can't find what you're looking for? We're here to help you with your payroll and HR needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Contact Support
          </Link>
          <Link
            href="/calculators/overtime-pay"
            className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-colors"
          >
            Try Our Calculators
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">How do I get help with a specific calculator?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each calculator page includes detailed instructions and examples. If you need additional help, 
              feel free to <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact us</Link> with your specific question.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">Are your calculators accurate for my state?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our calculators use current federal and state tax rates and labor laws. However, these are estimates 
              and should not replace professional tax or legal advice for complex situations.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2">Do you store my calculation data?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No, we don't store any of your personal information or calculation data. All calculations are 
              performed locally in your browser for your privacy and security.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
