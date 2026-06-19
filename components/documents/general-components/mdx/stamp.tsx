"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
