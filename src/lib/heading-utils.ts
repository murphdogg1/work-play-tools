import { useEffect } from "react";

export function useHeadingAnchors() {
  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3");
    
    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";
      
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = id;
      }

      // Add anchor link if it doesn't exist
      if (!heading.querySelector(".anchor-link")) {
        const anchor = document.createElement("a");
        anchor.href = `#${id}`;
        anchor.className = "anchor-link ml-2 text-gray-400 hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100";
        anchor.innerHTML = "#";
        anchor.setAttribute("aria-label", `Link to ${heading.textContent}`);
        
        // Add group class to heading for hover effect
        heading.classList.add("group", "flex", "items-center");
        
        // Wrap heading content in a span
        const content = document.createElement("span");
        content.innerHTML = heading.innerHTML;
        heading.innerHTML = "";
        heading.appendChild(content);
        heading.appendChild(anchor);
      }
    });
  }, []);
}

export function generateHeadingId(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
