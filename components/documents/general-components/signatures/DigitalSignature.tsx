"use client";
import { cn } from "@/lib/utils";
import { NexusFormatDate } from "../ui/NexusFormatDate";

export function DigitalSignature({
  name,
  role,
  registry,
  timestamp,
  authority = "República Autônoma de Nova-Aurélia",
  color,
  background,
  className,
}: {
  name: string;
  role?: string;
  registry: string;
  timestamp: string | number;
  authority?: string;
  color?: string;
  background?: string;
  className?: string;
}) {
  const hasTheme = !!color;

  const frameStyle = hasTheme
    ? {
        background: `color-mix(in srgb, ${color} 4%, ${background ?? "transparent"})`,
      }
    : undefined;

  const cardStyle = hasTheme
    ? { border: `1px solid ${color}`, color }
    : undefined;

  const cornerStyle = (position: "tl" | "tr" | "br" | "bl") => {
    const borders = {
      tl: "2px 0 0 2px",
      tr: "2px 2px 0 0",
      br: "0 2px 2px 0",
      bl: "0 0 2px 2px",
    };
    return hasTheme
      ? {
          borderWidth: borders[position],
          borderStyle: "solid" as const,
          borderColor: color,
          opacity: 0.5,
        }
      : undefined;
  };

  const cornerClasses = (pos: "tl" | "tr" | "br" | "bl") => {
    if (hasTheme) return `absolute size-4 ${pos === "tl" ? "top-0 left-0" : pos === "tr" ? "top-0 right-0" : pos === "br" ? "bottom-0 right-0" : "bottom-0 left-0"}`;
    const map = {
      tl: "absolute size-8 left-0 top-0 border-l-2 border-t-2 border-paper-foreground/70",
      tr: "hidden",
      br: "absolute size-8 right-0 bottom-0 border-r-2 border-b-2 border-paper-foreground/70",
      bl: "hidden",
    };
    return map[pos];
  };

  return (
    <div className={cn("mt-10 block", className)}>
      <span
        className={cn(
          "text-xs uppercase tracking-widest",
          hasTheme ? "block" : "text-paper-muted",
        )}
        style={hasTheme ? { color, opacity: 0.6 } : undefined}
      >
        Assinatura ::
      </span>
      <div
        className={cn(
          "relative mt-1 flex min-h-28 items-center justify-center",
          hasTheme
            ? "background-texture"
            : "border border-paper-foreground/20 bg-paper-foreground/[0.03]",
        )}
        style={frameStyle}
      >
        {(["tl", "tr", "br", "bl"] as const).map((pos) => (
          <div
            key={pos}
            className={cornerClasses(pos)}
            style={cornerStyle(pos)}
          />
        ))}

        <div
          className={cn(
            "border border-paper-foreground/80 px-3 py-2 text-center",
            hasTheme && "border",
          )}
          style={cardStyle}
        >
          <p
            className={cn(
              "text-[9px] uppercase tracking-wider",
              hasTheme ? "" : "text-paper-muted",
            )}
            style={hasTheme ? { color, opacity: 0.7 } : undefined}
          >
            Documento assinado digitalmente
          </p>
          <p
            className={cn(
              "mt-1 text-sm font-bold uppercase tracking-wider",
              hasTheme ? "" : "text-paper-foreground",
            )}
            style={hasTheme ? { color } : undefined}
          >
            {name}
          </p>
          {role && (
            <p
              className={cn(
                "text-[10px] uppercase tracking-wider",
                hasTheme ? "" : "text-paper-muted",
              )}
              style={hasTheme ? { color, opacity: 0.7 } : undefined}
            >
              {role}
            </p>
          )}
          <p
            className={cn(
              "text-[10px] uppercase tracking-wider",
              hasTheme ? "" : "text-paper-foreground/80",
            )}
            style={hasTheme ? { color, opacity: 0.8 } : undefined}
          >
            reg. {registry}
          </p>
          <p
            className={cn(
              "text-[10px] uppercase tracking-wider",
              hasTheme ? "" : "text-paper-foreground/80",
            )}
            style={hasTheme ? { color, opacity: 0.8 } : undefined}
          >
            {NexusFormatDate(String(timestamp))}
          </p>
          <p
            className={cn(
              "mt-1 text-[8px] uppercase tracking-[0.2em]",
              hasTheme ? "text-center" : "text-paper-muted",
            )}
            style={hasTheme ? { color, opacity: 0.6 } : undefined}
          >
            {authority}
          </p>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <div
          className={cn("h-px w-full", hasTheme ? "" : "bg-paper-muted/60")}
          style={hasTheme ? { background: color, opacity: 0.4 } : undefined}
        />
        <span
          className={cn(
            "text-[10px] uppercase tracking-widest whitespace-nowrap",
            hasTheme ? "" : "text-paper-muted",
          )}
          style={hasTheme ? { color, opacity: 0.6 } : undefined}
        >
          [assinatura digital]
        </span>
      </div>
    </div>
  );
}
