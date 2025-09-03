"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import TOC from "@/components/TOC";
import { useHeadingAnchors } from "@/lib/heading-utils";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface GuideLayoutProps {
  children: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

export default function GuideLayout({ 
  children, 
  breadcrumbs, 
  className 
}: GuideLayoutProps) {
  // Add anchor links to headings
  useHeadingAnchors();

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-4 gap-8", className)}>
      {/* Main content */}
      <div className="lg:col-span-3">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
          <Link 
            href="/" 
            className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {item.href ? (
                <Link 
                  href={item.href}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.title}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {children}
        </div>
      </div>

      {/* Table of Contents */}
      <TOC />
    </div>
  );
}
