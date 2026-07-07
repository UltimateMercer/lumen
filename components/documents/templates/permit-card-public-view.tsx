"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "@/lib/archive/documents";
import { parseLumenDate, formatDate, getAge } from "@/lib/in-universe-rules/calendar";
import { CURRENT_DATE } from "@/lib/in-universe-rules/world-config";
import { Paper } from "../general-components/paper/paper";
import { SectionPaper } from "../general-components/paper/section-paper";
import { ItemValue } from "../general-components/ui/item-value";

interface PermitCardPublicFrontmatter extends DocumentFrontmatter {
  id: string;
  registryName: string;
  birthDate: string;
  tier: string;
}

export function PermitCardPublicView({ doc }: { doc: ArchiveDocument }) {
  const fm = doc.frontmatter as unknown as PermitCardPublicFrontmatter;

  const { id, registryName, birthDate, tier, date } = fm;

  const tierLabel = `Nível ${tier}`;

  return (
    <Paper>
      <SectionPaper>
        <div className="flex gap-4 items-center mb-2 p-4 texture-item background-texture">
          <div className="w-40 h-40 bg-[#252525] dark:bg-[#eaeaea]"></div>
          <div className="flex flex-col gap-1">
            <ItemValue
              className="text-sm"
              item="Nome de registro"
              value={registryName}
            />
            <ItemValue
              className="text-sm"
              item="data de nascimento"
              value={formatDate(parseLumenDate(birthDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
            />
            <ItemValue
              className="text-sm"
              item="idade"
              value={`${getAge(parseLumenDate(birthDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), CURRENT_DATE)}`}
            />
            <ItemValue className="text-sm" item="id" value={id} />
          </div>
          <div className="flex items-center justify-center text-center p-5 text-6xl font-bold ml-auto">
            <p className="mx-auto">{tierLabel}</p>
          </div>
        </div>
      </SectionPaper>
      <div className="px-4 pb-4 text-paper-muted text-center text-xs uppercase">
        Registro Oficial · {date}
      </div>
    </Paper>
  );
}
