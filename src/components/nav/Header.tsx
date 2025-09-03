"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import Container from "@/components/Container";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import SearchCommand from "@/components/SearchCommand";

const navigation = {
  calculators: {
    title: "Calculators",
    description: "Payroll & HR calculation tools",
    links: [
      { title: "Payroll Calculator", href: "/calculators/payroll", description: "Calculate employee pay and taxes" },
      { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", description: "Calculate regular and overtime pay" },
      { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", description: "Calculate net pay after taxes and deductions" },
      { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", description: "Convert hourly rates to annual salary" },
      { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", description: "Calculate FICA, Medicare, and Social Security taxes" },
      { title: "Timecard Calculator", href: "/calculators/timecard", description: "Track hours and calculate totals" },
    ]
  },
  guides: {
    title: "Guides",
    description: "Payroll & HR knowledge base",
    links: [
      { title: "Payroll Basics", href: "/guides/payroll-basics", description: "Essential payroll concepts and processes" },
      { title: "Overtime Rules by State", href: "/guides/overtime-rules", description: "State-specific overtime regulations" },
      { title: "Benefits & Deductions", href: "/guides/benefits", description: "Employee benefits and tax deductions" },
      { title: "Payroll Software Comparison", href: "/guides/payroll-software-comparison", description: "Compare the best payroll software for 2025" },
    ]
  },
  hrTemplates: {
    title: "HR Templates",
    description: "Ready-to-use HR documents",
    links: [
      { title: "Offer Letter Template", href: "/hr-templates/offer-letter", description: "Professional job offer letters" },
      { title: "PTO Policy Template", href: "/hr-templates/pto-policy", description: "Paid time off policy examples" },
      { title: "Disciplinary Action Form", href: "/hr-templates/disciplinary-action-form", description: "Employee discipline documentation" },
    ]
  },
  resources: {
    title: "Resources",
    description: "Additional tools and information",
    links: [
      { title: "About WorkPayTools", href: "/about", description: "Learn about our mission and team" },
      { title: "Contact Us", href: "/contact", description: "Get help or provide feedback" },
      { title: "Privacy Policy", href: "/privacy", description: "How we protect your data" },
    ]
  }
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (key: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // Small delay to allow moving to the dropdown
    setHoverTimeout(timeout);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <header 
      className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50"
      onKeyDown={handleKeyDown}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" 
            aria-label="WorkPayTools home"
          >
            WorkPayTools
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary navigation">
            {Object.entries(navigation).map(([key, section]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => setActiveMenu(key)}
                onBlur={(e) => {
                  // Only close if focus is moving outside the menu
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setActiveMenu(null);
                  }
                }}
              >
                <button
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
                  aria-expanded={activeMenu === key}
                  aria-haspopup="true"
                >
                  {section.title}
                </button>
                {activeMenu === key && (
                  <MegaMenu 
                    section={section} 
                    onClose={() => setActiveMenu(null)}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Search and CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500"
              aria-label="Search (Cmd+K)"
            >
              <Search size={16} />
              <span className="text-sm">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-600 dark:text-gray-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
            <Link
              href="/calculators/overtime-pay"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Start with Overtime Calculator
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={handleMobileMenuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <MobileDrawer 
          navigation={navigation}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Search Command */}
      <SearchCommand 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
      />
    </header>
  );
}
