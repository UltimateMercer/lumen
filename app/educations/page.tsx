"use client";
import * as React from "react";
import GenericTableOfContents from "@/components/toc-for-pages";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import { SectionHero } from "@/components/section-hero";
import { educationDataEnSorted, educationDataPtSorted } from "@/lib/educations";

export default function Educations() {
  const { language } = useLanguageStore() as LanguageStore;

  const educationData = React.useMemo(() => {
    return language === "pt-br" ? educationDataPtSorted : educationDataEnSorted;
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
        {educationData && educationData.length > 0 && (
          <div className="">
            {educationData.map((data, i) => (
              <div
                key={i}
                className="bg-custom-brown dark:bg-[#252525] text-[#121212] dark:text-custom-brown-text border-0 px-12 py-32 rounded-2xl flex gap-5 mb-0.25"
              >
                <img
                  src={data.image || "/images/ultimate-mercer-base.jpg"}
                  alt={`${data.institute} logo`}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {data.institute}
                  </h1>
                  <p className="text-lg">{data.status}</p>
                  <p className="text-lg">{data.course}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
