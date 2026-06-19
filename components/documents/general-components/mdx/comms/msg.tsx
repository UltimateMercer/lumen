"use client";
import type { ReactNode } from "react";
import { Children, createContext, isValidElement, useContext, useRef } from "react";
import { cn } from "@/lib/utils";

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
