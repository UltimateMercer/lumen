import type { ArchiveDocument, DocumentFrontmatter } from "@/lib/documents";
import { RenderMdx } from "@/components/mdx/MdxComponents";
import { ClassificationBar, PaperSheet } from "./DocumentHeader";
import { DigitalSignature } from "@/components/mdx/DigitalSignature";
import { Stamp } from "@/components/mdx/MdxComponents";

function MetaRow({ fm }: { fm: DocumentFrontmatter }) {
  const items: Array<[string, string | undefined]> = [
    ["operação", fm.operation_code ?? fm.reference],
    ["canal", fm.channel],
    ["janela", fm.capture_window],
    ["dispositivo", fm.device_fingerprint],
    ["analista", fm.analyst],
  ];
  return (
    <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper-muted">
      {items.map(([k, v]) =>
        v ? (
          <div key={k} className="flex items-baseline gap-2">
            <dt>{k}:</dt>
            <dd className="text-paper-foreground">{v}</dd>
          </div>
        ) : null,
      )}
    </dl>
  );
}

export function MonitoredThreadTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm, Content } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />

      <header className="mt-7">
        <div className="flex items-center justify-between border-b border-paper-foreground/40 pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          <span className="text-stamp-red">● captura em curso</span>
          <span>vigilância · {fm.issued_by}</span>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground md:text-3xl">
          {fm.title}
        </h1>
        <MetaRow fm={fm} />
      </header>

      <section className="mt-5 grid gap-3 border border-paper-foreground/30 p-4 text-xs uppercase tracking-wider md:grid-cols-2">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] text-paper-muted">alvo monitorado</div>
          <div className="mt-1 font-mono text-sm text-paper-foreground">{fm.monitored_target ?? "—"}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] text-paper-muted">contraparte</div>
          <div className="mt-1 font-mono text-sm text-paper-foreground">{fm.counterpart ?? "—"}</div>
        </div>
        {fm.participants && fm.participants.length > 0 && (
          <div className="md:col-span-2">
            <div className="text-[10px] font-bold tracking-[0.3em] text-paper-muted">participantes registrados</div>
            <ul className="mt-1 grid gap-1 md:grid-cols-2">
              {fm.participants.map((p) => (
                <li key={p.handle} className="font-mono text-[11px] text-paper-foreground">
                  ▸ <span className="font-bold">{p.handle}</span>
                  {p.role ? <span className="opacity-70"> · {p.role}</span> : null}
                  {p.device ? <span className="opacity-50"> · {p.device}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div className="thread-body mt-6">
        <RenderMdx Content={Content} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-paper-foreground/30 pt-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">
          ▸ fim do segmento capturado
        </div>
        <Stamp variant="red" shape="rect" subtitle="vigilância 14-B">
          Monitorado · não encaminhar
        </Stamp>
      </div>

      {fm.signed_by && fm.registry_id && (
        <DigitalSignature
          name={fm.signed_by}
          role={fm.analyst ? "Analista · " + fm.issued_by : fm.issued_by}
          registry={fm.registry_id}
          timestamp={fm.signed_at ?? fm.date}
        />
      )}
    </PaperSheet>
  );
}