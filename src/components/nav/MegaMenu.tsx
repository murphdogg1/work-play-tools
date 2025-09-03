"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  section: {
    title: string;
    description: string;
    links: Array<{
      title: string;
      href: string;
      description: string;
    }>;
  };
  onClose: () => void;
}

export default function MegaMenu({ section, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleMouseEnter = () => {
    // Keep menu open when hovering over it
  };

  const handleMouseLeave = () => {
    // Close menu when leaving it
    onClose();
  };

  // Split links into two columns
  const midPoint = Math.ceil(section.links.length / 2);
  const leftColumn = section.links.slice(0, midPoint);
  const rightColumn = section.links.slice(midPoint);

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
      role="menu"
      aria-label={`${section.title} submenu`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {section.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {section.description}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-3">
            {leftColumn.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                role="menuitem"
                tabIndex={0}
                onClick={onClose}
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

          {/* Right Column */}
          <div className="space-y-3">
            {rightColumn.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                role="menuitem"
                tabIndex={0}
                onClick={onClose}
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

        {/* View All Link */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors"
            onClick={onClose}
          >
            View all {section.title.toLowerCase()} →
          </Link>
        </div>
      </div>
    </div>
  );
}
