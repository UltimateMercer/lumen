import type { ArchiveDocument } from "@/lib/documents";
import { RenderMdx } from "@/components/mdx/MdxComponents";
import { ClassificationBar, PaperSheet } from "./DocumentHeader";

export function IncidentTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm, Content } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6 border-2 border-stamp-red/70 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-stamp-red">
          <span>⚠ Relatório de incidente</span>
          <span>{fm.incident_code ?? fm.reference}</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
          {fm.title}
        </h1>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs uppercase tracking-wider text-paper-muted">
          <div>Local: <span className="text-paper-foreground">{fm.location ?? "indefinido"}</span></div>
          <div>Data: <span className="text-paper-foreground">{fm.date}</span></div>
          <div>Status: <span className="text-paper-foreground">{fm.status ?? "em apuração"}</span></div>
          <div>Emitido por: <span className="text-paper-foreground">{fm.issued_by}</span></div>
        </div>
      </div>

      <div className="mt-6 text-paper-foreground">
        <RenderMdx Content={Content} />
      </div>
    </PaperSheet>
  );
}
