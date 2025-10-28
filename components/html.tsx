"use client";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

export const Html = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguageStore() as LanguageStore;
  return (
    <html lang={language} suppressHydrationWarning>
      {children}
    </html>
  );
};
