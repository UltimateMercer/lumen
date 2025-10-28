"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react"; // Import useCallback

import { TableOfContentsNav } from "./toc-nav";
import { TableOfContentsContent } from "./toc-content";

export interface GenericItem {
  [key: string]: any;
}

export interface FieldConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  tags?: string;
  id?: string;
}

export interface TableOfContentsProps<T extends GenericItem> {
  data: T[];
  fields: FieldConfig;
  title?: string;
  subtitle?: string;
  tocTitle?: string;
  tocDescription?: string;
  formatDate?: (date: string) => string;
  generateId?: (item: T) => string;
  renderCustomContent?: (item: T) => React.ReactNode;
  type?: string;
}

/* ---------- helpers ---------------------------------------------------- */
function defaultFormatDate(dateString: string): string {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

function defaultGenerateId<T extends GenericItem>(
  item: T,
  titleField: string,
  startField: string
): string {
  const raw = (
    `${item[titleField]}-${item[startField]}` || `item-${Math.random()}`
  ).toString();
  return raw.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const getNested = (obj: any, path?: string) =>
  path ? path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj) : "";

/* ---------- component -------------------------------------------------- */
export default function GenericTableOfContents<T extends GenericItem>({
  data,
  fields,
  title = "Table of Contents",
  subtitle = "Navigate through the sections below",
  tocTitle = "Navigation",
  tocDescription = "Click on an item to navigate to that section",
  formatDate = defaultFormatDate,
  generateId,
  renderCustomContent,
  type = "",
}: TableOfContentsProps<T>) {
  /* Fallbacks so data.map never throws */
  const safeData = Array.isArray(data) ? data : [];

  // Wrap getItemId in useCallback
  const getItemId = useCallback(
    (item: T) =>
      generateId
        ? generateId(item)
        : fields.id
        ? getNested(item, fields.id)
        : defaultGenerateId(
            item,
            fields.title ?? "title",
            fields.startDate ?? ""
          ),
    [generateId, fields.id, fields.title, fields.startDate] // Dependencies for getItemId
  );

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        const intersectingEntries = entries.filter((e) => e.isIntersecting);
        if (intersectingEntries.length > 0) {
          // Sort by boundingClientRect.top to find the one highest on the page
          intersectingEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveSection(intersectingEntries[0].target.id);
        } else {
          // If no sections are intersecting, clear active section or set to first
          // For this TOC, we'll keep the last active or default to first if scrolled past all
          // For simplicity, we'll just let it remain the last active if nothing is intersecting
          // or you could set it to an empty string: setActiveSection("");
        }
      },
      { threshold: 0, rootMargin: "-50% 0px" } // Adjusted threshold and rootMargin
    );

    safeData.forEach((it) => {
      const el = document.getElementById(getItemId(it));
      el && io.observe(el);
    });

    return () => io.disconnect();
  }, [safeData, getItemId]);

  const scrollToSection = useCallback(
    (item: T) => {
      const el = document.getElementById(getItemId(item));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [getItemId] // Add getItemId to scrollToSection dependencies
  );

  return (
    <div className="flex flex-col lg:flex-row gap-0.25">
      {/* ---- TOC sidebar ------------------------------------------- */}
      <TableOfContentsNav
        data={safeData}
        fields={fields}
        tocTitle={tocTitle}
        tocDescription={tocDescription}
        getItemId={getItemId}
        getNested={getNested}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* ---- main content ----------------------------------------- */}
      <TableOfContentsContent
        data={safeData}
        fields={fields}
        title={title}
        subtitle={subtitle}
        getItemId={getItemId}
        getNested={getNested}
        renderCustomContent={renderCustomContent}
        type={type}
      />
    </div>
  );
}
