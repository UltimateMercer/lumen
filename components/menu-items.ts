import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import { Brain } from "lucide-react";
import {
  GraduationCapIcon,
  UserCircleIcon,
  FoldersIcon,
  ToolboxIcon,
  FileTextIcon,
} from "@phosphor-icons/react";
import { menuTranslations } from "@/utils/menu-translations";

export const useMenu = ({
  projectCount = "",
}: {
  projectCount: string | number;
}) => {
  const { language } = useLanguageStore() as LanguageStore;

  // const t = menuTranslations[language];
  const t = language === "pt-br" ? menuTranslations.pt : menuTranslations.en;

  return [
    {
      title: t.about.title,
      description: t.about.description,
      icon: UserCircleIcon,
      count: "",
      url: "/about",
    },
    {
      title: t.experiences.title,
      description: t.experiences.description,
      icon: Brain,
      count: "8",
      url: "/experiences",
    },
    {
      title: t.academics.title,
      description: t.academics.description,
      icon: GraduationCapIcon,
      count: "3",
      url: "/educations",
    },
    {
      title: t.projects.title,
      description: t.projects.description,
      icon: FoldersIcon,
      count: projectCount,
      url: "/projects",
    },
    {
      title: t.website.title,
      description: t.website.description,
      icon: ToolboxIcon,
      count: "",
      url: "#",
    },
    {
      title: t.cv.title,
      description: t.cv.description,
      icon: FileTextIcon,
      count: "",
      url: "#",
    },
  ];
};
