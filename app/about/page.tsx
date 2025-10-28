"use client";
import { AboutMeEnUs } from "@/components/about/about-me-en-us";
import { AboutMePtBr } from "@/components/about/about-me-pt-br";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

export default function About() {
  const { language } = useLanguageStore() as LanguageStore;

  return (
    <section className="bg-custom-brown dark:bg-[#252525] border-b border-[#121212] dark:border-custom-brown rounded-2xl p-8">
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-5">
          <img
            src="https://i.imgur.com/rkCtudG.jpg"
            className="w-48 h-48 mx-auto rounded-lg"
            width="156"
            height="156"
            alt="Julian Silva da Cunha"
          />
          <div className="flex flex-col">
            <h1 className="text-5xl leading-normal">
              {language === "pt-br" ? (
                <strong> Oi! Eu sou o Julian Silva da Cunha</strong>
              ) : (
                <strong> Hi! I'm Julian Silva da Cunha</strong>
              )}
            </h1>
          </div>
        </div>
        {language === "pt-br" ? <AboutMePtBr /> : <AboutMeEnUs />}

        {/* <h4 className="text-xl font-bold mb-8">
          Sou formado em Tecnologia em Sistemas para Internet no IFSul, e
          atualmente estou cursando o 8º semestre do Design Digital na UFPel e
          moro em Pelotas/RS.
        </h4>
        <div className="">
          <p className="text-xl leading-normal tracking-wide mb-4">
            Do início de 2013 a setembro de 2016, estudei no Instituto Federal
            Sul-riograndense no curso superior em tecnologias em sistemas para
            internet. Recém formado fui em busca de algumas oportunidades, mas
            infelizmente as que apareceram não se concretizaram.
          </p>
          <p className="text-xl leading-normal tracking-wide mb-4">
            Foi então que no fim de 2017, retornei à universidade, desta vez na
            Universidade Federal de Pelotas, no curso de bacharelado em Design
            Digital, sendo esta uma oportunidade para aprender ainda mais, e
            numa área que eu curti trabalhar desde o IFSul, Web
            Design/Desenvolvimento Front-end.
          </p>
          <p className="text-xl leading-normal tracking-wide mb-4">
            Neste período em que estou no design da UFPel, tive diversas
            oportunidades de interagir e aprender com diferentes áreas e
            diferentes atividades, sendo mais recentemente uma das minhas
            paixões atuais a edição digital, onde curto criar algumas imagens a
            partir de algumas ideias (sendo basicamente um hobby). Além disso,
            este curso tem me oferecido a oportunidade de conhecer diferentes
            pessoas e a desenvolver melhor a minha visão do mundo.
          </p>
          <p className="text-xl leading-normal tracking-wide mb-4">
            No meio disso tudo também tive a oportunidade de ingressar em um
            curso de inglês na Topway, para poder me qualificar ainda mais.
          </p>
          <p className="text-xl leading-normal tracking-wide mb-4">
            Além do mais, este curso tem me ensinado a ser mais criativo, onde
            sempre que possível, em algumas atividades procuro desenvolver
            alguns websites, assim posso seguir aprimorando tanto o conhecimento
            em design como desenvolver o front-end dos projetos.
          </p>
          <h4 className="font-bold leading-normal tracking-wide text-3xl mb-4">
            Em atualização...
          </h4>

          <h4 className="font-bold leading-normal tracking-wide text-2xl">
            Mas se quiser pode me chamar também de Ultimate Mercer
          </h4>
        </div> */}
      </div>
    </section>
  );
}
