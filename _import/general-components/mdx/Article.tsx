import type { ReactNode } from "react";

export function Article({ number, children }: { number: string | number; children: ReactNode }) {
  return (
    <p className="my-4 text-sm leading-relaxed text-paper-foreground">
      <span className="mr-2 font-bold uppercase tracking-wider">Art. {number}º — </span>
      {children}
    </p>
  );
}
