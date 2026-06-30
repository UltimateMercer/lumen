"use client";
import type {
  ArchiveDocument,
  DocumentFrontmatter,
} from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";
import { DigitalSignature } from "../general-components/signatures/digital-signature";
import { cn } from "@/lib/utils";

const THREAT_BARS: Record<
  NonNullable<DocumentFrontmatter["threat_tier"]>,
  number
> = {
  baixa: 1,
  moderada: 2,
  severa: 3,
  crítica: 4,
  apocalíptica: 5,
};

function ThreatGauge({ tier }: { tier?: DocumentFrontmatter["threat_tier"] }) {
  const filled = tier ? THREAT_BARS[tier] : 0;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-3 border border-paper-foreground/40",
            i < filled ? "bg-stamp-red" : "bg-transparent",
          )}
        />
      ))}
    </div>
  );
}

function Sigil({
  motif = "crimson",
}: {
  motif?: DocumentFrontmatter["sigil_motif"];
}) {
  const stroke = "currentColor";
  const common = {
    width: 96,
    height: 96,
    viewBox: "0 0 100 100",
    fill: "none" as const,
    stroke,
    strokeWidth: 1.6,
  };
  switch (motif) {
    case "eye":
      return (
        <svg {...common}>
          <path d="M5 50 Q50 10 95 50 Q50 90 5 50 Z" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="5" fill={stroke} />
        </svg>
      );
    case "spiral":
      return (
        <svg {...common}>
          <path d="M50 50 m-30 0 a30 30 0 1 1 60 0 a22 22 0 1 1 -44 0 a15 15 0 1 1 30 0 a8 8 0 1 1 -16 0" />
        </svg>
      );
    case "thorn":
      return (
        <svg {...common}>
          <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
        </svg>
      );
    case "mask":
      return (
        <svg {...common}>
          <path d="M15 30 Q50 10 85 30 L80 70 Q50 95 20 70 Z" />
          <path d="M30 45 L42 52 M70 45 L58 52" />
          <path d="M40 70 Q50 78 60 70" />
        </svg>
      );
    case "circuit":
      return (
        <svg {...common}>
          <rect x="15" y="15" width="70" height="70" />
          <path d="M15 35 H40 V55 H60 V75 H85 M35 15 V35 M65 85 V65" />
          <circle cx="40" cy="35" r="3" fill={stroke} />
          <circle cx="60" cy="55" r="3" fill={stroke} />
        </svg>
      );
    case "crimson":
    default:
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="42" />
          <path d="M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80" />
          <circle cx="50" cy="50" r="10" fill={stroke} />
        </svg>
      );
  }
}

function StatChip({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border border-paper-foreground px-3 py-2">
      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-paper-muted">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-xs uppercase text-paper-foreground">
        {value ?? "—"}
      </div>
    </div>
  );
}

export function CodexEntryTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />

      <header className="mt-7 grid gap-6 border-b-2 border-paper-foreground/60 pb-5 md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            <span>◆ codex</span>
            <span className="text-stamp-red">
              {fm.access_level ?? "acesso restrito"}
            </span>
          </div>
          <div className="mt-2 font-mono text-4xl font-bold tracking-[0.15em] text-stamp-red md:text-5xl">
            {fm.designation ?? "—"}
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-wider text-paper-foreground md:text-3xl">
            {fm.codex_name ?? fm.title}
          </h1>
          {fm.codex_class && (
            <div className="mt-2 text-xs uppercase tracking-[0.25em] text-paper-muted">
              classificação técnica ·{" "}
              <span className="text-paper-foreground">{fm.codex_class}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center text-stamp-red/80">
          <Sigil motif={fm.sigil_motif} />
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] opacity-80">
            sigilum
          </div>
        </div>
      </header>

      <section className="mt-5 grid gap-2 md:grid-cols-3">
        <StatChip label="autonomia" value={fm.autonomy} />
        <StatChip label="contagiosidade" value={fm.contagion} />
        <StatChip
          label="hospedeiro"
          value={
            fm.host_required === false
              ? "dispensável"
              : fm.host_required
                ? "obrigatório"
                : "—"
          }
        />
        <StatChip label="contenção" value={fm.containment_status} />
        <StatChip label="registrado em" value={fm.first_recorded ?? fm.date} />
        <div className="border border-paper-foreground/30 px-3 py-2">
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-paper-muted">
            ameaça
          </div>
          <div className="mt-1 flex items-center gap-2">
            <ThreatGauge tier={fm.threat_tier} />
            <span className="font-mono text-[10px] uppercase text-paper-foreground">
              {fm.threat_tier ?? "—"}
            </span>
          </div>
        </div>
      </section>

      <div className="codex-body mt-7 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>

      {fm.verified_by && (
        <DigitalSignature
          name={fm.verified_by}
          role={"Conselho Superior · verificação de codex"}
          registry={fm.registry_id ?? fm.designation ?? "—"}
          timestamp={fm.signed_at ?? fm.date}
        />
      )}
    </PaperSheet>
  );
}
