import Link from "next/link";
import type { DocumentType } from "@/lib/archive/documents";
import { getAllDocuments } from "@/lib/archive/registry";
import { DOCUMENT_TYPE_LABEL, CLASSIFICATION_TOKEN } from "@/lib/archive/documents";

export default function ArchivePage() {
  const docs = getAllDocuments();
  const grouped = new Map<DocumentType, typeof docs>();

  for (const doc of docs) {
    const t = doc.frontmatter.type;
    if (!grouped.has(t)) grouped.set(t, []);
    grouped.get(t)!.push(doc);
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 font-display text-3xl font-bold uppercase tracking-wider">
          ◆ Arquivo MINCONT-OS
        </h1>
        <p className="mb-8 text-sm uppercase tracking-widest text-muted-foreground">
          {docs.length} documento(s) · {grouped.size} tipo(s) · acesso restrito
        </p>

        {Array.from(grouped.entries()).map(([type, items]) => (
          <section key={type} className="mb-10">
            <h2 className="mb-3 border-b border-border pb-1 font-display text-lg font-bold uppercase tracking-wider text-amber-crt">
              {DOCUMENT_TYPE_LABEL[type]}
            </h2>
            <div className="grid gap-2">
              {items.map((doc) => {
                const fm = doc.frontmatter;
                return (
                  <Link
                    key={fm.slug}
                    href={`/archive/${fm.slug}`}
                    className="group flex items-center justify-between border border-border bg-card/80 px-4 py-3 text-sm transition-colors hover:bg-card hover:border-amber-crt/50"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${CLASSIFICATION_TOKEN[fm.classification]}`}>
                        {fm.classification}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-bold uppercase tracking-wider text-foreground">
                          {fm.title}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          {fm.date}
                        </div>
                      </div>
                    </div>
                    <span className="text-amber-crt opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
