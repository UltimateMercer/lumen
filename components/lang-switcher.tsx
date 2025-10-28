"use client";

import * as React from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { LanguageStore } from "@/utils/interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";
import { btnStyles } from "@/utils/styles";
import { TranslateIcon } from "@phosphor-icons/react";

export function LangSwitcher() {
  const { language, setLanguage } = useLanguageStore() as LanguageStore;

  const currentParams = useParams();
  const pathname = usePathname();
  const router = useRouter();

  // if (currentParams.lang && language !== currentParams.lang) {
  //   return redirect(`/${language}/${currentParams.slug}`);
  // }

  React.useEffect(() => {
    if (
      pathname.startsWith("/projects") &&
      currentParams.lang &&
      language !== currentParams.lang
    ) {
      return router.replace(`/projects/${language}/${currentParams.slug}`);
      // return redirect(`/projects/${language}/${currentParams.slug}`);
    }

    if (currentParams.lang && language !== currentParams.lang) {
      return router.replace(`/${language}/${currentParams.slug}`);
      // return redirect(`/${language}/${currentParams.slug}`);
    }
  }, [currentParams, language, pathname, router]);

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger id="lang-toggle-trigger" asChild>
              <button type="button" className={btnStyles("rounded-bl-xs")}>
                <TranslateIcon size={24} />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            <p>
              {language === "en-us" ? "Change Language..." : "Mudar idioma..."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        align="end"
        className="bg-[#eaeaea] dark:bg-[#252525]"
      >
        <DropdownMenuItem
          id="lang-toggle-en"
          className="cursor-pointer"
          onClick={() => setLanguage("en-us")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          id="lang-toggle-pt"
          className="cursor-pointer"
          onClick={() => setLanguage("pt-br")}
        >
          Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
