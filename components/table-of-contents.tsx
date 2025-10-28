"use client";

import { useEffect, useState } from "react";

interface TocItem {
  title: string;
  slug: string;
  depth: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.5,
      }
    );

    const timeoutId = setTimeout(() => {
      toc.forEach(({ slug }) => {
        const element = document.getElementById(slug);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [toc]);

  const handleClick = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="space-y-1">
      {toc.map(({ slug, title, depth }) => (
        <button
          key={slug}
          onClick={() => handleClick(slug)}
          className={`block text-xs py-2 px-3 hover:bg-[#444] transition-colors text-left w-full rounded ${
            depth === 2 ? "ml-0" : depth === 3 ? "ml-4" : "ml-8"
          } ${
            activeId === slug
              ? "bg-[#444] text-white font-bold"
              : "text-custom-brown"
          }`}
        >
          {depth === 2 && "▶ "}
          {depth === 3 && "  • "}
          {title}
        </button>
      ))}
    </nav>
  );
}
