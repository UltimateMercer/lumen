import type { ArchiveDocument } from "@/lib/documents";
import { RenderMdx } from "@/components/mdx/MdxComponents";
import { ClassificationBar, PaperSheet } from "./DocumentHeader";

export function OrderTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm, Content } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6 border-2 border-paper-foreground/70">
        <div className="border-b-2 border-paper-foreground/70 bg-paper-muted/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.3em] text-paper-foreground">
          Ordem de Serviço · {fm.reference}
        </div>
        <div className="grid grid-cols-2 divide-x-2 divide-paper-foreground/40">
          <FormField label="Unidade" value={fm.unit ?? "—"} />
          <FormField label="Janela" value={fm.window ?? "—"} />
          <FormField label="Alvo" value={fm.target ?? "—"} />
          <FormField label="Emissor" value={fm.issued_by} />
        </div>
      </div>
      <h1 className="mt-6 font-display text-xl font-bold uppercase tracking-wider text-paper-foreground">
        {fm.title}
      </h1>
      <div className="mt-4 text-paper-foreground">
        <RenderMdx Content={Content} />
      </div>
    </PaperSheet>
  );
}

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-paper-foreground/40 px-4 py-2 last:border-b-0">
      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-paper-muted">
        {label}
      </div>
      <div className="text-sm font-bold uppercase tracking-wider text-paper-foreground">
        {value}
      </div>
    </div>
  );
}