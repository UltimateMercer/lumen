export function RecruitProfile({ items }: { items: string[] }) {
  const safeItems = items ?? [];
  return (
    <ul className="my-4 grid gap-1.5 border border-paper-foreground/30 bg-paper-foreground/[0.03] p-3 text-sm">
      {safeItems.map((it, i) => (
        <li key={i} className="grid grid-cols-[2ch_1fr] gap-2 text-paper-foreground">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stamp-red">&#9656;</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
