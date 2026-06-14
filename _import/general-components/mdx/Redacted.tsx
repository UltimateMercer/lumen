import type { ReactNode } from "react";

export function Redacted({ children, length }: { children?: ReactNode; length?: number }) {
  const text = children ?? "█".repeat(length ?? 12);
  return <span className="redacted" aria-label="conteúdo redigido">{text}</span>;
}
