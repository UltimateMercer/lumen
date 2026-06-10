import type { ArchiveDocument } from "@/lib/documents";
import { RenderMdx } from "@/components/mdx/MdxComponents";
import { ClassificationBar, PaperSheet } from "./DocumentHeader";

export function BulletinTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm, Content } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-8 flex items-end justify-between border-b-2 border-paper-foreground/60 pb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
            Boletim Oficial de Censura · {fm.issued_by}
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
            {fm.title}
          </h1>
        </div>
        <div className="text-right text-[10px] uppercase tracking-widest text-paper-muted">
          <div>ref. {fm.reference}</div>
          <div>{fm.date}</div>
        </div>
      </div>
      <div className="mt-6 text-paper-foreground">
        <RenderMdx Content={Content} />
      </div>
    </PaperSheet>
  );
}