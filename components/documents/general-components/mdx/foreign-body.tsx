import type { ReactNode } from "react";

export function ForeignBody({ children }: { children: ReactNode }) {
  return <div className="foreign-original">{children}</div>;
}
