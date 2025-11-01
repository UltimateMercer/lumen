import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { brandBtnStyles, btnStyles } from "@/utils/styles";
import { Logo } from "./logo";
import {
  CaretLeftIcon,
  SignOutIcon,
  TranslateIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { LangSwitcher } from "./lang-switcher";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { Button } from "./ui/button";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { language } = useLanguageStore() as LanguageStore;
  const { user, logout } = useAuthStore();
  const isGovernment = user?.accessLevel === "government";

  const route = useRouter();
  const segment = useSelectedLayoutSegments();
  const handleLogout = () => {
    logout();
    route.push("/");
  };
  return (
    <>
      <header className="background-header rounded-b-[2px]">
        <Link href="/home">
          <div className="flex items-center gap-3 pl-5">
            <div className="">
              <span className="w-2 h-2 block bg-[#121212] dark:bg-[#eaeaea] animate-pulse"></span>
            </div>
            <h1 className="text-xl font-bold tracking-wider">LUMEN</h1>
            <span className="text-xs text-muted-foreground">v2.47.3</span>
          </div>
        </Link>
        <div className="flex ">
          {segment && segment.length > 1 && (
            <Button
              variant={"link"}
              className="text-[#121212] dark:text-custom-brown-text cursor-pointer"
              onClick={() => route.back()}
              aria-label={
                language === "pt-br"
                  ? "Voltar para a página anterior"
                  : "Back to the previous page"
              }
            >
              <CaretLeftIcon size={32} weight="bold" />
              {language === "pt-br" ? "Voltar" : "Back"}
            </Button>
          )}
        </div>
        <div className="flex justify-end">
          <div className="md:flex hidden gap-1 items-center text-xs">
            <div className="text-muted-foreground whitespace-nowrap">
              USUÁRIO:
              <span className="font-bold text-foreground ml-1">
                {user?.username.toUpperCase()}
              </span>
            </div>

            <div
              className={cn(
                "whitespace-nowrap px-2",
                isGovernment ? "text-destructive font-bold" : "text-foreground"
              )}
            >
              NÍVEL:{" "}
              <span className="font-bold">
                {isGovernment ? "GOVERNAMENTAL" : "PÚBLICO"}
              </span>
            </div>
          </div>
          {/* <LangSwitcher /> */}
          <AnimatedThemeToggler />
          <button onClick={handleLogout} className={btnStyles("rounded-br-xs")}>
            <SignOutIcon size={20} weight="bold" />
          </button>
        </div>
      </header>
      {/* <header></header> */}
    </>
  );
};
