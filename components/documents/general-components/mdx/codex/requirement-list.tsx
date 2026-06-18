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
