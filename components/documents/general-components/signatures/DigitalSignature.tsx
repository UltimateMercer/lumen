import { cn } from "@/lib/utils";
import { NexusFormatDate } from "../ui/NexusFormatDate";

export const DigitalSignature = ({
  signature = "Ultimate Mercer",
  registry = "@ultimatemercer",
  timestamp = Date.now(),
  color,
  background,
}: {
  signature: string;
  registry: string;
  timestamp: any;
  color?: string;
  background?: string;
}) => {
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

  return (
    <div className="block font-mono">
      <span
        className={cn(
          "text-sm uppercase",
          hasTheme ? "tracking-wider" : "text-muted-foreground",
        )}
        style={hasTheme ? { color, opacity: 0.6 } : undefined}
      >
        Assinatura:{" "}
      </span>
      <div
        className={cn(
          "relative flex items-center justify-center min-h-28 max-h-40 background-texture bg-muted-foreground/10",
          // !hasTheme && "bg-muted-foreground/10 ",
        )}
      >
        <div
          className={cn(
            "py-1 px-2 mx-3 my-3 font-mono",
            !hasTheme && "border border-[#252525] dark:border-[#eaeaea]",
          )}
          style={cardStyle}
        >
          <p
            className="text-[9px] uppercase"
            style={hasTheme ? { color, opacity: 0.7 } : undefined}
          >
            Documento assinado digitalmente
          </p>
          <p
            className="text-sm font-bold uppercase"
            style={hasTheme ? { color } : undefined}
          >
            {signature}
          </p>
          <p className="text-xs" style={hasTheme ? { color } : undefined}>
            {registry}
          </p>
          <p
            className="text-xs uppercase"
            style={hasTheme ? { color } : undefined}
          >
            {NexusFormatDate(timestamp)}
          </p>
          <p
            className="text-[9px] uppercase text-center mt-1"
            style={hasTheme ? { color, opacity: 0.6 } : undefined}
          >
            República da Aurora
          </p>
        </div>

        {/* <div className="absolute size-10 border-l-2 border-t-2 top-0 left-0"></div> */}
        {/* Cantos */}
        {(["tl", "tr", "br", "bl"] as const).map((pos) => (
          <div
            key={pos}
            className={cn(
              "absolute",
              !hasTheme && "size-6",
              hasTheme && "size-4",
              pos === "tl" &&
                !hasTheme &&
                "border-l-2 border-t-2 border-muted-foreground top-0 left-0",
              pos === "tr" &&
                !hasTheme &&
                "border-r-2 border-t-2 border-muted-foreground top-0 right-0",
              pos === "br" &&
                !hasTheme &&
                "border-r-2 border-b-2 border-muted-foreground bottom-0 right-0",
              pos === "bl" &&
                !hasTheme &&
                "border-l-2 border-b-2 border-muted-foreground bottom-0 left-0",
              pos === "tl" && hasTheme && "top-0 left-0",
              pos === "tr" && hasTheme && "top-0 right-0",
              pos === "br" && hasTheme && "bottom-0 right-0",
              pos === "bl" && hasTheme && "bottom-0 left-0",
            )}
            style={cornerStyle(pos)}
          />
        ))}
      </div>
      {/* Footer */}
      <div className="flex flex-nowrap items-center mt-0.5">
        <div
          className={cn("w-full h-px", !hasTheme && "bg-muted-foreground")}
          style={hasTheme ? { background: color, opacity: 0.4 } : undefined}
        />
        <span
          className={cn(
            "block text-sm uppercase text-nowrap",
            !hasTheme && "text-muted-foreground",
          )}
          style={
            hasTheme ? { color, opacity: 0.6, fontSize: "11px" } : undefined
          }
        >
          [Assinatura Digital]
        </span>
      </div>
    </div>
  );
};
