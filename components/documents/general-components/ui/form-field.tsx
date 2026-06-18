export function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-paper-foreground/40 px-4 py-2 last:border-b-0">
      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-paper-muted">{label}</div>
      <div className="text-sm font-bold uppercase tracking-wider text-paper-foreground">{value}</div>
    </div>
  );
}
