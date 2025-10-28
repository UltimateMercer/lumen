"use client";
import * as React from "react";
import { ProjectCard } from "./project-card";
import { getProjects } from "@/lib/projects";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
export const ListProjectCards = ({ projects }: { projects: any }) => {
  const { language } = useLanguageStore() as LanguageStore;
  const filteredProjects = React.useMemo(
    () => getProjects({ projects, lang: language }),
    [projects, language]
  );

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0.25 no-overlay">
      {filteredProjects.map((project: any) => (
        <ProjectCard
          key={`${project.title}-${project.lang}`}
          project={project}
        />
      ))}
    </div>
  );
};
