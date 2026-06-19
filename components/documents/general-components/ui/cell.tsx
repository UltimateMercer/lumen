export function Cell({ label, value, full = false }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={`border-b border-paper-foreground/30 px-3 py-2 ${full ? "col-span-2" : ""} odd:border-r odd:border-paper-foreground/30`}>
      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-paper-muted">{label}</div>
      <div className="text-paper-foreground">{value}</div>
    </div>
  );
}
