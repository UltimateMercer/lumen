export function PartyRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <li className="grid grid-cols-[10ch_1fr] gap-3 border-b border-paper-foreground/10 py-1 text-xs">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper-muted">{label}</span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-paper-foreground">{value}</span>
    </li>
  );
}
