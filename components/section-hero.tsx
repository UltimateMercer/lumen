"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

const sectionData = {
  "/educations": {
    "pt-br": {
      title: "Educação",
      description: "Lista de minhas formações acadêmicas",
    },
    "en-us": {
      title: "Education",
      description: "List of my educations",
    },
  },
  "/experiences": {
    "pt-br": {
      title: "Experiências",
      description: "Lista de minhas experiências profissionais",
    },
    "en-us": {
      title: "Experiences",
      description: "List of my professional experiences",
    },
  },
  "/projects": {
    "pt-br": {
      title: "Meus projetos",
      description: "Lista de meus projetos pessoais e profissionais",
    },
    "en-us": {
      title: "My projects",
      description: "List of my personal and professional projects",
    },
  },
};

export const SectionHero = () => {
  const { language } = useLanguageStore() as LanguageStore;

  const currentPath = usePathname();

  const content = React.useMemo(() => {
    return sectionData[currentPath as keyof typeof sectionData][language];
  }, [currentPath, language]);

  return (
    <div className="flex items-center gap-8 px-8 py-10 rounded-2xl bg-custom-brown dark:bg-[#252525]">
      <div className="text-[#121212] dark:text-custom-brown-text">
        <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
        <p className="text-lg">{content.description}</p>
      </div>
    </div>
  );
};
