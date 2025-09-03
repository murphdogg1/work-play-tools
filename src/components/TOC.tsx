"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  className?: string;
}

export default function TOC({ className }: TOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Extract headings from the page
    const headings = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const items: TOCItem[] = headings.map((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";
      const level = parseInt(heading.tagName.charAt(1));
      
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = id;
      }

      return {
        id,
        title: heading.textContent || "",
        level,
      };
    });

    setTocItems(items);

    // Set up IntersectionObserver
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Find the entry that's most visible (highest intersection ratio)
          const mostVisible = visibleEntries.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: "-20% 0% -60% 0%", // Trigger when heading is in the top 20% of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Observe all headings
    headings.forEach((heading) => {
      if (observerRef.current) {
        observerRef.current.observe(heading);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80; // Account for sticky header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("hidden lg:block", className)}>
      <div className="sticky top-24">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Table of Contents
          </h3>
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "block w-full text-left text-sm transition-colors rounded-md px-2 py-1",
                  item.level === 2 && "font-medium",
                  item.level === 3 && "ml-3 text-gray-600 dark:text-gray-400",
                  activeId === item.id
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
