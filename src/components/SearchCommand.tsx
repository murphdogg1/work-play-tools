"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Calculator, BookOpen, FileText, Info, ArrowRight } from "lucide-react";
import { searchIndex, type SearchItem } from "@/data/searchIndex";
import { cn } from "@/lib/utils";
import { trackSearchOpen, trackSearchSelect } from "@/lib/analytics";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sectionIcons = {
  "Calculators": Calculator,
  "Guides": BookOpen,
  "HR Templates": FileText,
  "Resources": Info,
};

export default function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  // Track search open events
  useEffect(() => {
    if (open) {
      trackSearchOpen();
    }
  }, [open]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  const handleSelect = (href: string) => {
    trackSearchSelect(search, href);
    router.push(href);
    onOpenChange(false);
  };

  // Filter items based on search query
  const filteredItems = searchIndex.filter((item) => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchLower));
    const descriptionMatch = item.description?.toLowerCase().includes(searchLower);
    
    return titleMatch || tagsMatch || descriptionMatch;
  });

  // Group items by section
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={onOpenChange}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
    >

      <Command className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <Search className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search calculators, guides, templates..."
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            autoFocus
          />
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-600 dark:text-gray-400 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
        
        <Command.List className="max-h-96 overflow-y-auto p-2">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found for "{search}"
            </div>
          ) : (
            Object.entries(groupedItems).map(([section, items]) => {
              const IconComponent = sectionIcons[section as keyof typeof sectionIcons] || Info;
              
              return (
                <div key={section}>
                  <Command.Group 
                    heading={
                      <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        <IconComponent className="h-3 w-3" />
                        {section}
                      </div>
                    }
                  >
                    {items.map((item) => (
                      <Command.Item
                        key={item.href}
                        value={`${item.title} ${item.tags.join(" ")} ${item.description || ""}`}
                        onSelect={() => handleSelect(item.href)}
                        className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white truncate">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {item.description}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{item.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </Command.Item>
                    ))}
                  </Command.Group>
                </div>
              );
            })
          )}
        </Command.List>
        
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span>Press Enter to navigate</span>
            <span>↑↓ to navigate • Esc to close</span>
          </div>
        </div>
      </Command>
    </Command.Dialog>
  );
}
