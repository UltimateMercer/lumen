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
