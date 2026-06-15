"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/RenderMdx";
import { Stamp } from "../general-components/mdx/Stamp";
import { PaperSheet } from "../general-components/paper/PaperSheet";
import { ClassificationBar } from "../general-components/stamps/ClassificationBar";
import { DigitalSignature } from "../general-components/signatures/DigitalSignature";
import { cn } from "@/lib/utils";

const FLAG_TONE: Record<NonNullable<NonNullable<DocumentFrontmatter["vitals"]>[number]["flag"]>, string> = {
  normal: "text-cyan-crt",
  alerta: "text-amber-crt",
  "crítico": "text-stamp-red",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-baseline justify-between border-b border-paper-foreground/60 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-paper-foreground">
        <span>◆ {title}</span>
      </div>
      {children}
    </section>
  );
}

export function MedicalRecordTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            {fm.facility ?? "Hospital Civil"}
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
            {fm.title}
          </h1>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-paper-muted">
            prontuário · {fm.case_id ?? fm.reference ?? "—"} · {fm.date}
          </div>
        </div>
        <div className="rotate-[-6deg]">
          <Stamp variant="red" shape="rect" subtitle={fm.intake_at}>
            prontuário médico
          </Stamp>
        </div>
      </div>

      <Section title="identificação do paciente">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <Row label="Nome">{fm.patient_name ?? "—"}</Row>
          <Row label="ID Cívico">{fm.patient_id ?? "—"}</Row>
          <Row label="Nasc.">{fm.birth_date ?? "—"}</Row>
          <Row label="Sexo">{fm.sex ?? "—"}</Row>
          <Row label="Tipo sanguíneo">{fm.blood_type ?? "—"}</Row>
          <Row label="Médico resp.">{fm.attending ?? "—"}</Row>
          <Row label="Admissão">{fm.intake_at ?? "—"}</Row>
          <Row label="Alta">{fm.discharge_at ?? "em curso"}</Row>
        </div>
      </Section>

      {fm.vitals && fm.vitals.length > 0 && (
        <Section title="sinais vitais">
          <table className="med-table">
            <thead>
              <tr>
                <th>parâmetro</th>
                <th>valor</th>
                <th>unid.</th>
                <th>condição</th>
              </tr>
            </thead>
            <tbody>
              {fm.vitals.map((v, i) => (
                <tr key={i}>
                  <td>{v.label}</td>
                  <td className="font-bold">{v.value}</td>
                  <td className="text-paper-muted">{v.unit ?? "—"}</td>
                  <td className={cn("font-bold uppercase tracking-widest", v.flag && FLAG_TONE[v.flag])}>
                    {v.flag ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {fm.medications && fm.medications.length > 0 && (
        <Section title="medicações em curso">
          <table className="med-table">
            <thead>
              <tr>
                <th>fármaco</th>
                <th>dose</th>
                <th>posologia</th>
                <th>via</th>
              </tr>
            </thead>
            <tbody>
              {fm.medications.map((m, i) => (
                <tr key={i}>
                  <td className="font-bold">{m.name}</td>
                  <td>{m.dose}</td>
                  <td>{m.schedule}</td>
                  <td className="text-paper-muted uppercase">{m.route ?? "VO"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {fm.procedures && fm.procedures.length > 0 && (
        <Section title="procedimentos">
          <table className="med-table">
            <thead>
              <tr>
                <th>cód.</th>
                <th>descrição</th>
                <th>executado</th>
              </tr>
            </thead>
            <tbody>
              {fm.procedures.map((p, i) => (
                <tr key={i}>
                  <td className="font-mono">{p.code}</td>
                  <td>{p.name}</td>
                  <td className="text-paper-muted">{p.performed_at ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {fm.diagnosis && fm.diagnosis.length > 0 && (
        <Section title="diagnóstico">
          <ul className="ml-5 list-disc text-sm text-paper-foreground">
            {fm.diagnosis.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="observações clínicas">
        <div className="text-paper-foreground">
          <RenderMdx source={doc.mdxSource} />
        </div>
      </Section>

      {fm.attending && (
        <DigitalSignature
          name={fm.attending}
          role="Médico responsável"
          registry={fm.registry_id ?? `MED/${fm.patient_id ?? "----"}`}
          timestamp={fm.signed_at ?? fm.date}
        />
      )}
    </PaperSheet>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2 border-b border-dashed border-paper-foreground/20 py-1 text-sm">
      <div className="text-[10px] font-bold uppercase tracking-wider text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{children}</div>
    </div>
  );
}