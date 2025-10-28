"use client";
import { GlobeIcon } from "@phosphor-icons/react";
import Image from "next/image";
import RotatingText from "@/components/RotatingText/RotatingText";
import { MorphingText } from "@/components/magicui/morphing-text";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
export const Presentation = () => {
  const { user } = useAuthStore();
  const isGovernment = user?.accessLevel === "government";
  const [currentTime, setCurrentTime] = useState(new Date());

  const { language } = useLanguageStore() as LanguageStore;
  return (
    <section className="w-full relative overflow-hidden bg-[#252525] dark:bg-[#eaeaea] mb-px">
      <div className="flex items-center gap-8 px-5 py-10 rounded-[2px] bg-[#eaeaea] dark:bg-[#252525]">
        <div className="text-[#121212] dark:text-custom-brown-text flex flex-col gap-0.5 flex-1">
          <div className="text-sm text-muted-foreground mb-1">
            REPÚBLICA DE ARCANUM
          </div>
          <div className="text-2xl font-bold uppercase font-mono text-[#121212] dark:text-[#eaeaea]">
            Bem vindo a rede lumen, {user?.username}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {isGovernment
              ? "DEPARTAMENTO DE DEFESA E SEGURANÇA"
              : "ARQUIVO PÚBLICO NACIONAL"}
          </div>

          <div className="">
            <div className="text-sm text-muted-foreground leading-relaxed mb-4">
              Este portal foi criado para oferecer a todos os cidadãos de
              Arcanum acesso livre e gratuito ao conhecimento público. Explore
              nossa biblioteca, descubra a geografia de nossa nação, aprenda
              sobre nossa história e mantenha-se informado sobre os
              acontecimentos atuais.
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-bold">Horário:</span> Disponível 24/7
              </div>
              <div>
                <span className="font-bold">Suporte:</span> suporte@arcanum.gov
              </div>
              <div>
                <span className="font-bold">Última atualização:</span>{" "}
                {currentTime.toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
