import type { ReactNode } from "react";

export function Transmission({ children }: { children: ReactNode }) {
  return (
    <pre className="my-4 whitespace-pre-wrap border-l-2 border-amber-crt bg-chrome/60 p-4 font-mono text-sm leading-relaxed text-amber-crt crt-glow">{children}</pre>
  );
}
