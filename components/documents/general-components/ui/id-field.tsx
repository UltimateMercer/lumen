export function IdField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[100px_1fr] items-baseline gap-2 border-b border-dotted border-paper-foreground/30 pb-0.5">
      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-paper-muted">{label}</span>
      <span className={`text-paper-foreground ${mono ? "font-mono text-xs" : "text-sm font-bold uppercase tracking-wider"}`}>{value}</span>
    </div>
  );
}
