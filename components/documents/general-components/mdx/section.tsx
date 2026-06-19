import type { ReactNode } from "react";

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="project-section scroll-mt-24">
      <h2 className="project-section-title">{title}</h2>
      {children}
    </section>
  );
}
