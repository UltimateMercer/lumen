"use client";
import type { ArchiveDocument } from "../lib/documents";
import { RenderMdx } from "../lib/mdx-components";
import { PaperSheet } from "../general-components/paper/PaperSheet";
import { ClassificationBar } from "../general-components/stamps/ClassificationBar";
import { DigitalSignature } from "../general-components/signatures/DigitalSignature";

function Meta({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper-muted">{label}</dt>
      <dd className="font-mono text-[11px] uppercase tracking-wider text-paper-foreground">{value ?? "—"}</dd>
    </div>
  );
}

function PartyRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <li className="grid grid-cols-[10ch_1fr] gap-3 border-b border-paper-foreground/10 py-1 text-xs">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper-muted">{label}</span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-paper-foreground">{value}</span>
    </li>
  );
}

export function InterrogationTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  const isInterview = fm.mode === "interview";
  const interrogators = Array.isArray(fm.interrogator)
    ? fm.interrogator
    : fm.interrogator
      ? [fm.interrogator]
      : [];

  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />

      <header className="mt-7 border-b-2 border-paper-foreground/70 pb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          <span>◆ {fm.issued_by}</span>
          <span>{isInterview ? "registro de entrevista" : "auto de interrogatório"}</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase leading-tight tracking-wider text-paper-foreground md:text-3xl">
          {fm.title}
        </h1>
        <dl className="mt-3 flex flex-wrap gap-x-7 gap-y-1.5">
          <Meta label="sessão" value={fm.session_code ?? fm.reference} />
          <Meta label="data" value={fm.date} />
          <Meta label="sala" value={fm.room} />
          <Meta label="duração" value={fm.duration} />
        </dl>
      </header>

      <section className="mt-5 grid gap-0 border border-paper-foreground/30 md:grid-cols-2 md:divide-x md:divide-paper-foreground/20">
        <div className="p-4">
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper-muted">
            partes presentes
          </div>
          <ul>
            {interrogators.map((i, idx) => (
              <PartyRow
                key={idx}
                label={interrogators.length > 1 ? `interrog. ${idx + 1}` : "interrog."}
                value={i}
              />
            ))}
            <PartyRow label={isInterview ? "entrevist." : "interrogado"} value={fm.interrogated} />
            <PartyRow label="defensor" value={fm.counsel} />
            <PartyRow label="escrivão" value={fm.clerk} />
          </ul>
        </div>
        <div className="border-t border-paper-foreground/20 p-4 md:border-t-0">
          <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper-muted">
            equipamento &amp; condições
          </div>
          <ul>
            <PartyRow label="gravação" value={fm.recording ?? "áudio cifrado · ch.4"} />
            <PartyRow
              label="modo"
              value={isInterview ? "entrevista voluntária" : "compulsório · cláusula 14-B"}
            />
            <PartyRow label="referência" value={fm.reference} />
            <PartyRow label="status" value={fm.status} />
          </ul>
        </div>
      </section>

      <div className="interrogation-body mt-7 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>

      {fm.signed_by && fm.registry_id && (
        <DigitalSignature
          name={fm.signed_by}
          role={fm.clerk ? "Escrivão · " + fm.issued_by : fm.issued_by}
          registry={fm.registry_id}
          timestamp={fm.signed_at ?? fm.date}
        />
      )}
    </PaperSheet>
  );
}