export function StatChip({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border border-paper-foreground/30 px-3 py-2">
      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-paper-muted">{label}</div>
      <div className="mt-0.5 font-mono text-xs uppercase text-paper-foreground">{value ?? "—"}</div>
    </div>
  );
}
