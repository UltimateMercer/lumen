import { cn } from "@/lib/utils";

/**
 * Bloco de assinatura digital — inspirado no exemplo do usuário.
 * Substitui o <Signature> manuscrito em documentos modernos (decretos, memos,
 * ordens). Aceita string "A.R. 2187.04.14" ou ISO.
 */
export function DigitalSignature({
  name,
  role,
  registry,
  timestamp,
  authority = "República Autônoma de Nova-Aurélia",
  className,
}: {
  name: string;
  role?: string;
  registry: string;
  timestamp: string;
  authority?: string;
  className?: string;
}) {
  return (
    <div className={cn("mt-10 block", className)}>
      <span className="text-xs uppercase tracking-widest text-paper-muted">
        Assinatura ::
      </span>
      <div className="relative mt-1 flex min-h-28 items-center justify-center border border-paper-foreground/20 bg-paper-foreground/[0.03] px-4 py-3">
        <div className="absolute left-0 top-0 size-8 border-l-2 border-t-2 border-paper-foreground/70" />
        <div className="absolute right-0 bottom-0 size-8 border-r-2 border-b-2 border-paper-foreground/70" />
        <div className="border border-paper-foreground/80 px-3 py-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-paper-muted">
            Documento assinado digitalmente
          </p>
          <p className="mt-1 text-sm font-bold uppercase tracking-wider text-paper-foreground">
            {name}
          </p>
          {role && (
            <p className="text-[10px] uppercase tracking-wider text-paper-muted">
              {role}
            </p>
          )}
          <p className="text-[10px] uppercase tracking-wider text-paper-foreground/80">
            reg. {registry}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-paper-foreground/80">
            {timestamp}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-paper-muted">
            {authority}
          </p>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <div className="h-px w-full bg-paper-muted/60" />
        <span className="text-[10px] uppercase tracking-widest text-paper-muted whitespace-nowrap">
          [assinatura digital]
        </span>
      </div>
    </div>
  );
}