"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "@/lib/archive/documents";
import type { MentorData, ResponsibleSignature } from "@/types/character-data";
import { cn } from "@/lib/utils";
import { ItemValue } from "../general-components/ui/item-value";
import { parseLumenDate, formatDate, getAge } from "@/lib/in-universe-rules/calendar";
import { CURRENT_DATE } from "@/lib/in-universe-rules/world-config";
import { Paper } from "../general-components/paper/paper";
import { PaperHeader } from "../general-components/paper/paper-header";
import { SectionPaper } from "../general-components/paper/section-paper";
import { tierColors } from "@/lib/power-system";
import type { PowerTier } from "@/lib/power-system";
import { StampRepAurora } from "../general-components/stamps/stamp-rep-aurora";
import { ResponsibleSignatures } from "../general-components/signatures/responsible-signatures";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PermitCardFrontmatter extends DocumentFrontmatter {
  id: string;
  registryName: string;
  birthDate: string;
  licenseStartDate: string;
  tier: string;
  mentor: MentorData | Record<string, never>;
  responsibleSignatures: ResponsibleSignature[];
}

export function PermitCard({ doc }: { doc: ArchiveDocument }) {
  const fm = doc.frontmatter as unknown as PermitCardFrontmatter;

  const {
    id,
    registryName,
    birthDate,
    licenseStartDate,
    tier,
    mentor = {},
    responsibleSignatures,
  } = fm;

  const tierStyle = tierColors[tier as PowerTier];

  return (
    <Paper>
      <PaperHeader department="Divisão de Gestão de Ativos Especiais" />
      <SectionPaper>
        <div
          className={cn(
            "flex gap-4 items-center mb-2 p-4 texture-item background-texture",
            tierStyle
          )}
        >
          <div className="w-40 h-40 bg-[#252525] dark:bg-[#eaeaea]"></div>
          <div className="flex flex-col gap-1">
            <ItemValue
              className="text-sm text-[#eaeaea]!"
              item="Nome de registro"
              value={registryName}
            />
            <ItemValue
              className="text-sm"
              item="data de nascimento"
              value={formatDate(parseLumenDate(birthDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
            />
            <ItemValue className="text-sm" item="idade" value={`${getAge(parseLumenDate(birthDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), CURRENT_DATE)}`} />
            <ItemValue
              className="text-sm"
              item="data de emissão"
              value={formatDate(parseLumenDate(licenseStartDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
            />
            <ItemValue className="text-sm" item="id" value={id} />
          </div>
          <div
            className={cn(
              "flex items-center justify-between text-center p-5 text-8xl font-bold ml-auto"
            )}
          >
            <p className="mx-auto">{tier}</p>
          </div>
        </div>
      </SectionPaper>
      <SectionPaper>
        <PermitCheckTable tier={tier} />
      </SectionPaper>
      {Object.keys(mentor).length > 0 && (
        <SectionPaper>
          <ResponsibleSignatures responsibleSignatures={[mentor as unknown as ResponsibleSignature]} />
        </SectionPaper>
      )}

      <SectionPaper>
        <ResponsibleSignatures responsibleSignatures={responsibleSignatures} />
      </SectionPaper>
      <div className="">
        {tier === "S" ? (
          <p className="text-paper-muted text-center uppercase">
            Documento válido indefinidamente. Renovação automática.
          </p>
        ) : (
          <p className="text-paper-muted text-center uppercase">
            Documento válido por 3 anos.
          </p>
        )}
      </div>
      <div
        className={cn("w-full h-4 texture-item background-texture", tierStyle)}
      ></div>
      <StampRepAurora />
    </Paper>
  );
}

export function PermitCheckTable({ tier }: { tier: string }) {
  return (
    <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
      <TableHeader className="">
        <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
          <TableHead className="text-[#eaeaea] dark:text-[#252525] uppercase">
            Permissões concedidas
          </TableHead>
          <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right uppercase">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">Acesso a todas as zonas</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">
            Formar grupos independentes
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">
            Aceitar missões de guildas licenciadas
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">
            Acesso a recursos públicos
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">Portar armas registradas</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">Missões governamentais</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase ">
            Acesso a informações classificadas
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Limitado"}
            {tier === "B" && "Limitado"}
            {tier === "C" && "Limitado"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase ">Dispensado de supervisão</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Dispensado"}
            {tier === "A" && "Dispensado"}
            {tier === "B" && "Necessário"}
            {tier === "C" && "Necessário"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase ">Imunidade diplomática</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Limitada"}
            {tier === "A" && "Sem imunidade"}
            {tier === "B" && "Sem imunidade"}
            {tier === "C" && "Sem imunidade"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
