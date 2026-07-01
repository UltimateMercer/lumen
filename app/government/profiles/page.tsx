"use client";

import { useRouter } from "next/navigation";
import { getProfileSections } from "@/data/individuals";
import { individuals } from "@/data/individuals";

const CLASS_ACCENT: Record<string, { chip: string; text: string }> = {
  PÚBLICO:       { chip: "bg-[var(--c-public)] text-white",       text: "text-[var(--c-public)]" },
  CONFIDENCIAL:  { chip: "bg-[var(--c-confidential)] text-white", text: "text-[var(--c-confidential)]" },
  SECRETO:       { chip: "bg-[var(--c-secret)] text-white",       text: "text-[var(--c-secret)]" },
  ULTRASSECRETO: { chip: "bg-[var(--c-ultra)] text-white",        text: "text-[var(--c-ultra)]" },
};

const DEFAULT_CHIP = "bg-[var(--c-confidential)] text-white";
const DEFAULT_TEXT = "text-[var(--c-confidential)]";

function firstDocSlug(ind: typeof individuals[number]): string | undefined {
  return ind.documents.find((d) => d.mdxSlug)?.mdxSlug;
}

export default function ProfilesPage() {
  const router = useRouter();
  const sections = getProfileSections();

  const handleDocClick = (slug: string) => {
    router.push(`/government/profiles/${slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">PERFIS DE INDIVÍDUOS</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Registros civis e documentação pessoal
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {sections.map((sec) => {
          const accent = CLASS_ACCENT[sec.classification] ?? { chip: DEFAULT_CHIP, text: DEFAULT_TEXT };
          const firstSlug = sec.documents[0]?.mdxSlug;
          const individual = individuals.find((ind) => ind.slug === sec.id);
          return (
            <button
              key={sec.id}
              onClick={() => {
                if (firstSlug) handleDocClick(firstSlug);
              }}
              className={`group text-left flex flex-col border border-border border-l-4 bg-background texture-item overflow-hidden shadow-[4px_4px_0_0_color-mix(in_oklab,var(--foreground)_6%,transparent)] transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-[6px_6px_0_0_color-mix(in_oklab,var(--foreground)_12%,transparent)] rounded-xs w-full min-h-[180px] border-l-[var(--c-confidential)] ${
                !firstSlug ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex items-stretch border-b border-border">
                <div className={`flex items-center justify-center px-3 py-1.5 font-mono text-xs font-extrabold tracking-tight ${accent.chip}`}>
                  DOC
                </div>
                <div className="flex flex-1 items-center border-l border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  REGISTRO CIVIL
                </div>
                <div className={`flex items-center gap-1.5 border-l border-border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] ${accent.text}`}>
                  <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                  {sec.classification}
                </div>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {individual?.id ?? sec.id}
                </div>
                <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground group-hover:underline">
                  {sec.name}
                </h3>
                <div className="text-xs text-muted-foreground">
                  {sec.documents.length} documento{sec.documents.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {sec.id}
                </span>
                <span className={`text-[10px] font-extrabold uppercase tracking-widest ${accent.text}`}>
                  {firstSlug ? "ACESSAR →" : "INDISPONÍVEL"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
