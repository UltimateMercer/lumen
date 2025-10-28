"use client";

import { Button } from "@/components/ui/button";

import type { GenericItem, FieldConfig } from "./toc-for-pages";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

interface TableOfContentsNavProps<T extends GenericItem> {
  data: T[];
  fields: FieldConfig;
  tocTitle: string;
  tocDescription: string;
  // formatDate: (date: string) => string;
  getItemId: (item: T) => string;
  getNested: (obj: any, path?: string) => any;
  activeSection: string;
  scrollToSection: (item: T) => void;
}

export function TableOfContentsNav<T extends GenericItem>({
  data,
  fields,
  getItemId,
  getNested,
  activeSection,
  scrollToSection,
}: TableOfContentsNavProps<T>) {
  const { language } = useLanguageStore() as LanguageStore;

  return (
    <aside className="flex flex-col sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-[48px] w-1/6 p-2.5 bg-custom-brown dark:bg-[#252525] border-b border-[#121212] dark:border-custom-brown rounded-2xl">
      <nav className="space-y-1 border border-[#121212] dark:border-custom-brown rounded-lg p-2">
        <div className="px-4 py-2 rounded-t-md rounded-b bg-[#252525] dark:bg-custom-brown border-b border-[#252525] dark:border-custom-brown">
          <p className="dark:text-[#121212] text-custom-brown-text font-semibold">
            {language === "pt-br" ? "Sumário" : "Table of contents"}
          </p>
        </div>

        {data.map((it, i) => {
          const id = getItemId(it);
          const titleTxt = getNested(it, fields.title);

          return (
            <Button
              key={i}
              variant="ghost"
              className={`w-full justify-start text-left py-2 px-4 h-auto rounded cursor-pointer dark:text-custom-brown-text hover:text-custom-brown-text hover:dark:text-[#121212] hover:bg-[#252525] hover:dark:bg-custom-brown ${
                activeSection === id &&
                "bg-[#252525] dark:bg-custom-brown text-custom-brown-text dark:text-[#121212]"
              } ${i === data.length - 1 && "rounded-b-md"}`}
              onClick={() => scrollToSection(it)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium text-sm">{titleTxt}</span>
              </div>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
