"use client";
import Link from "next/link";
import { socials } from "@/utils/socials";
import { Button } from "./ui/button";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

export const Footer = () => {
  const { language } = useLanguageStore() as LanguageStore;
  return (
    <footer className="max-w-full py-5 px-6 print:hidden rounded-t-xs bg-[#eaeaea] dark:bg-[#252525] border-t dark:border-[#eaeaea] border-[#252525]">
      <div className="container mx-auto text-xs text-center text-muted-foreground">
        Sistema mantido pelo Arquivo Público Nacional • Informações verificadas
        e atualizadas regularmente • Dúvidas ou sugestões? Entre em contato
        conosco
      </div>
    </footer>
  );
};
