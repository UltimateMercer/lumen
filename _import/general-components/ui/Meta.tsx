export function Meta({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper-muted">{label}</dt>
      <dd className="font-mono text-[11px] uppercase tracking-wider text-paper-foreground">{value ?? "—"}</dd>
    </div>
  );
}
