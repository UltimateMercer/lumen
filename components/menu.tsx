"use client";
import * as React from "react";
import { MenuCard } from "@/components/menu-card";
// import { Brain } from "lucide-react";
// import {
//   GraduationCapIcon,
//   UserCircleIcon,
//   FoldersIcon,
//   ToolboxIcon,
//   FileTextIcon,
// } from "@phosphor-icons/react";
import { useMenu } from "./menu-items";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import { getProjects } from "@/lib/projects";

export const MenuSection = ({ projects = [] }: { projects: any }) => {
  const { language } = useLanguageStore() as LanguageStore;
  const filteredProjects = React.useMemo(
    () => getProjects({ projects, lang: language }),
    [projects, language]
  );
  const projectCount = filteredProjects.length;

  const menu = useMenu({ projectCount });
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-[#252525] dark:bg-custom-brown gap-0.25 border-b border-[#121212] dark:border-custom-brown">
      {menu.map((item) => (
        <MenuCard data={item} key={item.title} />
      ))}
    </section>
  );
};
