"use client";

import type { Individual } from "@/utils/government-data";
import { RedactedText } from "../redacted-text";
import { WarningIcon } from "@phosphor-icons/react";
import { SchoolFinalEvaluationDoc } from "./ultimate/school-final-evaluation-doc";
import { ultimateSchoolFinalEvaluationData } from "@/data/school-final-evaluations/ultimate";

interface UltimateLayoutProps {
  individual: Individual;
  documentId: string;
}

export const UltimateLayout = ({
  individual,
  documentId,
}: UltimateLayoutProps) => {
  if (documentId === "profile") {
    return (
      <div className="border dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525]">
        <div className="p-6">
          <div className="dark:bg-[#eaeaea] bg-[#252525] p-4 mb-3 text-center">
            <div className="text-lg font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
              República da Aurora
            </div>
            <div className="text-sm font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
              Departamento de registros e cidadania
            </div>
          </div>

          <div className="inline-block border dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525] px-3 py-1 text-xs font-medium mb-4 uppercase">
            Confidencial
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            <RedactedText>{individual.name}</RedactedText>
          </h2>
          <div className="text-muted-foreground mt-1 mb-2">
            Conhecido como:{" "}
            <span className="font-bold uppercase">{individual.knownAs}</span>{" "}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm">
              <span className="text-muted-foreground">NOME COMPLETO: </span>
              <span className="font-bold">
                <RedactedText>{individual.name}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                data de nascimento:{" "}
              </span>
              <span className="font-bold">
                <RedactedText>{individual.birthDate}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">idade: </span>
              <span className="font-bold uppercase">{individual.age} Anos</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                Local de nascimento:{" "}
              </span>
              <span className="font-bold">
                <RedactedText>{individual.birthPlace}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                Ocupação:{" "}
              </span>
              <span className="font-bold uppercase">
                {individual.occupation}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">Altura: </span>
              <span className="font-bold">
                <RedactedText>{individual.height}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">peso: </span>
              <span className="font-bold">
                <RedactedText>{individual.weight}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                tipo sanguíneo:{" "}
              </span>
              <span className="font-bold">
                <RedactedText>{individual.bloodType}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                Cor dos olhos:{" "}
              </span>
              <span className="font-bold">
                <RedactedText>{individual.eyeColor}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                Cor do cabelo:{" "}
              </span>
              <span className="font-bold">
                <RedactedText>{individual.hairColor}</RedactedText>
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground uppercase">
                Cor de pele:{" "}
              </span>
              <span className="font-bold uppercase">
                <RedactedText>{individual.skinColor}</RedactedText>
              </span>
            </div>
          </div>
          <div className="mt-8 dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525]">
            <div className="text-xs text-muted-foreground mb-2">
              DOCUMENTO AUTENTICADO E ASSINADO POR:
            </div>
            <div className="font-bold text-foreground">asdkpaoksdpaoksdpak</div>
            <div className="text-xs text-muted-foreground mt-4">
              Este documento é propriedade da República da Aurora e seu conteúdo
              é protegido por lei.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (documentId === "school-final-evaluation") {
    return (
      <SchoolFinalEvaluationDoc
        individual={ultimateSchoolFinalEvaluationData}
      />
    );
  }
  return <div>Ultimate Layout</div>;
};
