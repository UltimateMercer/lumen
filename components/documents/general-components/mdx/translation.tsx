import type { ReactNode } from "react";

export function Translation({ children }: { children: ReactNode }) {
  return <div className="foreign-translation">{children}</div>;
}
