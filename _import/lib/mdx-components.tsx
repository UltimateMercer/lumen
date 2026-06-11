"use client";

import type { ReactNode } from "react";
import { Children, createContext, isValidElement, useContext, useRef } from "react";
import { MDXRemote } from "next-mdx-remote";
import { cn } from "@/lib/utils";
import { DigitalSignature } from "../components/DigitalSignature";

export function Redacted({ children, length }: { children?: ReactNode; length?: number }) {
  const text = children ?? "█".repeat(length ?? 12);
  return <span className="redacted" aria-label="conteúdo redigido">{text}</span>;
}

type StampVariant = "red" | "blue" | "amber" | "black";
type StampShape = "circle" | "oval" | "rect" | "triangle";

function hashRotate(seed: string, range = 8): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return ((h % (range * 2 + 1)) - range);
}

export function Stamp({
  children, variant = "red", shape = "rect", rotate, subtitle,
}: {
  children: ReactNode; variant?: StampVariant; shape?: StampShape;
  rotate?: number; subtitle?: string;
}) {
  const seed = typeof children === "string" ? children : String(children ?? variant);
  const r = rotate ?? hashRotate(seed, 6);
  return (
    <span className={cn("stamp", `stamp-shape-${shape}`, `stamp-ink-${variant}`)} style={{ ["--stamp-rotate" as string]: `${r}deg` }}>
      <span>{children}</span>
      {subtitle && (
        <><span className="stamp-divider" /><span className="text-[0.55rem] opacity-80">{subtitle}</span></>
      )}
    </span>
  );
}

export function ApprovedStamp({ subtitle }: { subtitle?: string } = {}) {
  return <Stamp variant="blue" shape="circle" subtitle={subtitle ?? "MINCONT · 14-B"}>Aprovado</Stamp>;
}
export function DeniedStamp({ subtitle }: { subtitle?: string } = {}) {
  return <Stamp variant="red" shape="circle" subtitle={subtitle ?? "indeferido"}>Negado</Stamp>;
}
export function ClassifiedStamp({ subtitle }: { subtitle?: string } = {}) {
  return <Stamp variant="red" shape="oval" subtitle={subtitle ?? "cláusula 14-B"}>Classificado</Stamp>;
}
export function ArchivedStamp({ date }: { date?: string } = {}) {
  return <Stamp variant="black" shape="rect" subtitle={date ?? "A.R. ____.__.__"}>Arquivado</Stamp>;
}
export function UrgentStamp() {
  return <Stamp variant="amber" shape="triangle">Urgente</Stamp>;
}

export function Classified({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 border-2 border-stamp-red/70 p-4 relative">
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-stamp-red/30 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-stamp-red">
        <span>◆ acesso restrito · cláusula 14-B</span>
        <span className="opacity-60">// confidencial</span>
      </div>
      <div className="text-sm text-paper-foreground">{children}</div>
    </div>
  );
}

export function Pullquote({ children, by }: { children: ReactNode; by?: string }) {
  return (
    <blockquote className="my-4 break-inside-avoid border-y-2 border-paper-foreground/50 py-3 text-center font-display text-lg italic leading-snug text-paper-foreground">
      &ldquo;{children}&rdquo;
      {by && <footer className="mt-1 text-[10px] not-italic uppercase tracking-[0.3em] text-paper-muted">&mdash; {by}</footer>}
    </blockquote>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="my-3 break-inside-avoid border-l-2 border-paper-foreground/50 bg-paper-foreground/[0.04] px-3 py-2 text-[11px] italic leading-snug text-paper-muted">
      {children}
    </figcaption>
  );
}

export function ForeignBody({ children }: { children: ReactNode }) {
  return <div className="foreign-original">{children}</div>;
}
export function Translation({ children }: { children: ReactNode }) {
  return <div className="foreign-translation">{children}</div>;
}

export function Exchange({
  speaker, ts, tone = "calm", children,
}: {
  speaker: string; ts?: string; tone?: "calm" | "tense" | "redacted"; children: ReactNode;
}) {
  const toneClass = tone === "tense" ? "text-stamp-red" : tone === "redacted" ? "text-paper-muted italic" : "text-paper-foreground";
  const accent = tone === "tense" ? "before:bg-stamp-red" : tone === "redacted" ? "before:bg-paper-muted/50" : "before:bg-paper-foreground/20";
  return (
    <div className={cn("exchange-row relative grid gap-x-4 gap-y-1 border-b border-dashed border-paper-foreground/15 py-2.5 pl-3 text-sm md:grid-cols-[6ch_14ch_1fr]", "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px]", accent)}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-paper-muted">{ts ?? "--:--"}</span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-paper-foreground">{speaker}</span>
      <span className={cn("leading-relaxed", toneClass)}>{children}</span>
    </div>
  );
}

export function Note({ kind = "pause", children }: { kind?: "pause" | "inaudible" | "off-record" | "action"; children?: ReactNode }) {
  const label = kind === "pause" ? "pausa" : kind === "inaudible" ? "inaudível" : kind === "off-record" ? "fora do registro" : "ação";
  return (
    <div className="my-3 flex justify-center">
      <span className="border border-dashed border-paper-foreground/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">
        [ {label}{children ? <> &middot; <span className="text-paper-foreground/70">{children}</span></> : null} ]
      </span>
    </div>
  );
}

const SUPERSCRIPTS = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
function toSuperscript(n: number): string {
  return String(n).split("").map((d) => SUPERSCRIPTS[Number(d)] ?? d).join("");
}

type FootnoteCounter = { next: () => number };
const MsgFootnoteContext = createContext<FootnoteCounter | null>(null);

function collectFlagNotes(children: ReactNode, acc: ReactNode[] = []): ReactNode[] {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as { note?: ReactNode; reason?: ReactNode; children?: ReactNode };
    if (child.type === (FlagPhrase as any)) {
      const n = props.note ?? props.reason;
      if (n != null && n !== "") acc.push(n);
    }
    if (props?.children) collectFlagNotes(props.children, acc);
  });
  return acc;
}

export function Msg({
  from, ts, side = "left", device, flagged = false, children,
}: {
  from: string; ts?: string; side?: "left" | "right"; device?: string; flagged?: boolean; children: ReactNode;
}) {
  const notes = collectFlagNotes(children);
  const counterRef = useRef(0);
  counterRef.current = 0;
  const counter: FootnoteCounter = { next: () => ++counterRef.current };

  return (
    <div className={cn("thread-msg", side === "right" ? "thread-msg--right" : "thread-msg--left")}>
      <div className="thread-msg-meta">
        <span className="font-bold text-paper-foreground">{from}</span>
        {device ? <span className="opacity-60"> &middot; {device}</span> : null}
        {ts ? <span className="opacity-60"> &middot; {ts}</span> : null}
        {flagged ? <span className="ml-2 text-stamp-red">&#9650; alerta</span> : null}
      </div>
      <MsgFootnoteContext.Provider value={counter}>
        <div className={cn("thread-msg-bubble", flagged && "thread-msg-bubble--flag")}>{children}</div>
        {notes.length > 0 && (
          <ol className="thread-msg-notes">
            {notes.map((n, i) => (
              <li key={i}><span className="thread-msg-notes-ref">{toSuperscript(i + 1)}</span><span>{n}</span></li>
            ))}
          </ol>
        )}
      </MsgFootnoteContext.Provider>
    </div>
  );
}

export function FlagPhrase({ children, note, reason }: { children: ReactNode; note?: ReactNode; reason?: ReactNode }) {
  const counter = useContext(MsgFootnoteContext);
  const effective = note ?? reason;
  const index = counter && effective ? counter.next() : null;
  return (
    <span className="flag-phrase">
      {children}
      {index !== null ? <sup className="flag-phrase-ref">{toSuperscript(index)}</sup> : null}
    </span>
  );
}

export function Gap({ minutes, reason }: { minutes?: number; reason?: string }) {
  return (
    <div className="my-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-paper-muted">
      <span className="h-px flex-1 bg-paper-foreground/20" />
      <span>&#9670; lacuna de captura{minutes ? ` · ${minutes} min` : ""}{reason ? ` · ${reason}` : ""}</span>
      <span className="h-px flex-1 bg-paper-foreground/20" />
    </div>
  );
}

export function Attachment({ kind = "file", hash, label }: { kind?: "img" | "file" | "audio" | "video"; hash?: string; label?: string }) {
  const icon = kind === "img" ? "&#x29F6;" : kind === "audio" ? "&#x266A;" : kind === "video" ? "&#x25B6;" : "&#x25A3;";
  return (
    <div className="my-2 inline-flex max-w-full items-center gap-2 border border-paper-foreground/30 bg-paper-foreground/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
      <span className="text-base text-paper-foreground/70">{icon}</span>
      <span className="text-paper-foreground">{label ?? `anexo ${kind}`}</span>
      {hash ? <span className="opacity-60">· sha {hash}</span> : null}
    </div>
  );
}

export function Trait({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="my-2 grid grid-cols-[12ch_1fr] gap-3 border-b border-paper-foreground/15 py-1.5 text-sm">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border-l-4 border-stamp-red bg-stamp-red/[0.06] px-4 py-3 text-sm text-paper-foreground">
      <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-stamp-red">&#9888; advertência do conselho</div>
      {children}
    </div>
  );
}

export function RequirementList({ items }: { items: string[] }) {
  const safeItems = items ?? [];
  return (
    <ol className="my-4 grid gap-2">
      {safeItems.map((it, i) => (
        <li key={i} className="grid grid-cols-[3ch_1fr] items-baseline gap-3 border border-paper-foreground/25 px-3 py-2 text-sm text-paper-foreground">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-stamp-red">{String(i + 1).padStart(2, "0")}</span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function Phase({ n, name, children }: { n: number; name: string; children?: ReactNode }) {
  return (
    <div className="my-3 grid grid-cols-[5ch_1fr] gap-3 border-l-2 border-paper-foreground/40 py-1.5 pl-3">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper-muted">E.{String(n).padStart(2, "0")}</div>
      <div>
        <div className="font-display text-sm font-bold uppercase tracking-wider text-paper-foreground">{name}</div>
        {children && <div className="mt-1 text-sm text-paper-foreground/90">{children}</div>}
      </div>
    </div>
  );
}

export function RecruitProfile({ items }: { items: string[] }) {
  const safeItems = items ?? [];
  return (
    <ul className="my-4 grid gap-1.5 border border-paper-foreground/30 bg-paper-foreground/[0.03] p-3 text-sm">
      {safeItems.map((it, i) => (
        <li key={i} className="grid grid-cols-[2ch_1fr] gap-2 text-paper-foreground">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stamp-red">&#9656;</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function AssetEntry({ codename, age, intake, status = "ativo", children }: {
  codename: string; age?: string | number; intake?: string;
  status?: "ativo" | "embedded" | "descontinuado" | "comprometido"; children?: ReactNode;
}) {
  const statusTone = status === "descontinuado" ? "text-paper-muted" : status === "comprometido" ? "text-stamp-red" : status === "embedded" ? "text-cyan-crt" : "text-paper-foreground";
  return (
    <div className="asset-row my-2 grid grid-cols-[12ch_4ch_1fr_auto] items-baseline gap-3 border-b border-dashed border-paper-foreground/25 py-2 text-sm">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper-foreground">{codename}</span>
      <span className="font-mono text-[10px] text-paper-muted">{age ?? "—"}</span>
      <span className="text-paper-foreground/90">{children ?? <Redacted length={18} />}{intake ? <span className="ml-2 text-[10px] uppercase tracking-widest text-paper-muted">ingresso {intake}</span> : null}</span>
      <span className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.25em]", statusTone)}>{status}</span>
    </div>
  );
}

export function Safeguard({ code, children }: { code?: string; children: ReactNode }) {
  return (
    <div className="safeguard-block my-4 grid grid-cols-[auto_1fr] gap-3 border border-dashed border-stamp-red/60 bg-stamp-red/[0.04] p-3 text-sm text-paper-foreground">
      <div className="flex h-full items-start">
        <span className="rotate-180 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-stamp-red [writing-mode:vertical-rl]">salvaguarda {code ?? ""}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Objective({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 border-l-4 border-paper-foreground/70 bg-paper-foreground/[0.04] px-4 py-3 text-sm text-paper-foreground">
      <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper-muted">&#9670; objetivo declarado</div>
      {children}
    </div>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="project-section scroll-mt-24">
      <h2 className="project-section-title">{title}</h2>
      {children}
    </section>
  );
}

export function ProjectTOC({ items }: { items: Array<{ id: string; label: string }> }) {
  const safeItems = items ?? [];
  return (
    <nav aria-label="Sumário do projeto" className="project-toc">
      <div className="project-toc-head">&#9670; sumário</div>
      <ol className="project-toc-list">
        {safeItems.map((it, i) => (
          <li key={it.id} className="project-toc-item">
            <a href={`#${it.id}`} className="project-toc-link">
              <span className="project-toc-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="project-toc-label">{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="project-toc-foot">{safeItems.length} seções · uso interno</div>
    </nav>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 border-b border-paper-muted/30 py-2 text-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{children}</div>
    </div>
  );
}

export function Signature({ name, role }: { name: string; role: string }) {
  return (
    <div className="mt-10 max-w-xs">
      <div className="border-b border-paper-foreground/60 pb-1 font-display text-2xl italic text-paper-foreground">{name}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-paper-muted">{role}</div>
    </div>
  );
}

export function Article({ number, children }: { number: string | number; children: ReactNode }) {
  return (
    <p className="my-4 text-sm leading-relaxed text-paper-foreground">
      <span className="mr-2 font-bold uppercase tracking-wider">Art. {number}º — </span>
      {children}
    </p>
  );
}

export function Transmission({ children }: { children: ReactNode }) {
  return (
    <pre className="my-4 whitespace-pre-wrap border-l-2 border-amber-crt bg-chrome/60 p-4 font-mono text-sm leading-relaxed text-amber-crt crt-glow">{children}</pre>
  );
}

export function Evidence({ code, custody, children }: { code: string; custody?: string; children: ReactNode }) {
  return (
    <div className="my-4 border border-paper-foreground/40 p-3 text-sm">
      <div className="flex items-center justify-between border-b border-dashed border-paper-foreground/30 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-paper-muted">
        <span>&#9670; evid. {code}</span>
        {custody && <span>custódia :: {custody}</span>}
      </div>
      <div className="mt-2 text-paper-foreground">{children}</div>
    </div>
  );
}

export function LogLine({ ts, level = "INFO", children }: { ts: string; level?: "INFO" | "WARN" | "ERR" | "REDACT"; children: ReactNode }) {
  const tone = level === "ERR" ? "text-stamp-red" : level === "WARN" ? "text-amber-crt" : level === "REDACT" ? "text-paper-muted" : "text-cyan-crt";
  return (
    <div className="grid grid-cols-[140px_60px_1fr] gap-2 border-b border-cyan-crt/20 py-1 font-mono text-xs">
      <span className="text-cyan-crt/70">{ts}</span>
      <span className={cn("font-bold", tone)}>[{level}]</span>
      <span className="text-cyan-crt">{children}</span>
    </div>
  );
}

export function CensorEntry({ num, title, author, clause, children }: {
  num: string | number; title: string; author?: string; clause: string; children?: ReactNode;
}) {
  return (
    <div className="my-3 grid grid-cols-[40px_1fr_120px] gap-3 border-b border-paper-foreground/20 py-2 text-sm">
      <div className="font-bold text-paper-muted">{num}.</div>
      <div>
        <div className="font-bold uppercase tracking-wider text-paper-foreground">{title}</div>
        {author && <div className="text-[10px] uppercase tracking-widest text-paper-muted">atribuído a {author}</div>}
        {children && <div className="mt-1 text-xs opacity-80">{children}</div>}
      </div>
      <div className="text-right text-[10px] uppercase tracking-widest text-stamp-red">{clause}</div>
    </div>
  );
}

export const mdxComponents = {
  Redacted,
  Stamp,
  ApprovedStamp,
  DeniedStamp,
  ClassifiedStamp,
  ArchivedStamp,
  UrgentStamp,
  Classified,
  Field,
  Signature,
  DigitalSignature,
  Article,
  Transmission,
  Evidence,
  LogLine,
  CensorEntry,
  Pullquote,
  Caption,
  Exchange,
  Note,
  ForeignBody,
  Translation,
  Msg,
  FlagPhrase,
  Gap,
  Attachment,
  Trait,
  Warning,
  RequirementList,
  Phase,
  RecruitProfile,
  AssetEntry,
  Safeguard,
  Objective,
  Section,
  ProjectTOC,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-2 font-display text-2xl font-bold uppercase tracking-wider" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-6 mb-2 font-display text-lg font-bold uppercase tracking-wider" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-4 mb-1 text-sm font-bold uppercase tracking-wider" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 text-sm leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-3 ml-6 list-disc text-sm leading-relaxed" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-3 ml-6 list-decimal text-sm leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold" {...props} />
  ),
  hr: () => <hr className="my-6 border-current opacity-20" />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-4 border-l-2 border-current pl-4 text-sm italic opacity-80" {...props} />
  ),
};

export function RenderMdx({ source }: { source?: Record<string, unknown> }) {
  if (!source) return null;
  return <MDXRemote {...(source as any)} components={mdxComponents as Record<string, React.ComponentType<any>>} />;
}
