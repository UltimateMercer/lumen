"use client";
import * as React from "react";
import GenericTableOfContents from "@/components/toc-for-pages";
import {
  experienceDataEnSorted,
  experienceDataPtSorted,
} from "@/lib/experiences";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import { SectionHero } from "@/components/section-hero";

export default function Experiences() {
  const { language } = useLanguageStore() as LanguageStore;

  const experienceData = React.useMemo(() => {
    return language === "pt-br"
      ? experienceDataPtSorted
      : experienceDataEnSorted;
  }, [language]);

  return (
    <div className="relative dark:bg-custom-brown bg-[#252525] h-full">
      <SectionHero />
      <div className="w-full h-[42px] px-5 flex items-center z-[2]">
        {/* <div className="text-custom-brown-text dark:text-[#121212]  font-medium flex-shrink-0">
          Modos de visualização: em construção
        </div> */}
      </div>
      <div className="">
        <GenericTableOfContents
          data={experienceData}
          type="experiences"
          fields={{
            title: "company",
            subtitle: "role",
            description: "description",
            startDate: "start",
            endDate: "end",
            image: "image",
            tags: "tags",
          }}
          tocTitle="Companies"
          tocDescription="Click a company to jump to the details"
          formatDate={(d) =>
            !d
              ? "Presente"
              : new Date(d).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                })
          }
        />
      </div>
    </div>
  );
}
