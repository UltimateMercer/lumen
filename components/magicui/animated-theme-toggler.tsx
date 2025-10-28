"use client";

import { Moon, Sun, SunDim } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { btnStyles } from "@/utils/styles";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguageStore() as LanguageStore;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isDarkMode = theme === "dark";

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    const newTheme = isDarkMode ? "light" : "dark";

    // Verifica se o browser suporta View Transitions
    if (!document.startViewTransition) {
      // Fallback para browsers que não suportam
      setTheme(newTheme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={changeTheme}
      className={btnStyles("rounded-bl-xs cursor-pointer")}
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
};
