"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { btnStyles } from "@/utils/styles";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage } = useLanguageStore() as LanguageStore;

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
  return (
    <button
      type="button"
      className={btnStyles("rounded-bl-2xl")}
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
        aria-label={
          language === "en-us"
            ? "Toggle light and dark modes"
            : "Alternar modos de luz e escuro"
        }
      >
        <title>
          {language === "en-us"
            ? "Toggle light and dark modes"
            : "Alternar modos de luz e escuro"}
        </title>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span className="sr-only">
        {language === "en-us"
          ? "Toggle light and dark modes"
          : "Alternar modos de luz e escuro"}
      </span>
    </button>
  );
}
