import Link from "next/link";
import { tierColors } from "@/lib/power-system";
import type { PowerTier } from "@/lib/power-system";

interface HeroCardProps {
  name: string;
  id: string;
  tier: string;
  slug: string;
  variant: "tier" | "rank";
  rank?: number;
}

export function HeroCard({
  name,
  id,
  tier,
  slug,
  variant,
  rank,
}: HeroCardProps) {
  const tierStyle = tierColors[tier as PowerTier] ?? "bg-muted-foreground/50 text-[#252525]";

  if (variant === "rank") {
    return (
      <Link
        href={`/public/heroes/${slug}`}
        className="block border-2 border-border rounded-xs hover:bg-muted transition-colors overflow-hidden"
      >
        <div className={`${tierStyle.split(" ")[0]} h-1.5`} />
        <div className="flex items-center gap-6 p-4">
          <div className="text-4xl font-black tabular-nums shrink-0">
            {rank}
          </div>
          <div className="w-16 h-16 rounded-full bg-[#252525] dark:bg-[#eaeaea] shrink-0" />
          <div className="min-w-0">
            <div className="text-lg font-bold truncate">{name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{id}</div>
          </div>
          <div className="ml-auto shrink-0">
            <span
              className={`${tierStyle} text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs`}
            >
              Nível {tier}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/public/heroes/${slug}`}
      className="block border-2 border-border rounded-xs hover:bg-muted transition-colors overflow-hidden"
    >
      <div className={`${tierStyle.split(" ")[0]} h-2`} />
      <div className="p-4 flex flex-col gap-3">
        <div className="w-16 h-16 bg-[#252525] dark:bg-[#eaeaea]" />
        <div className="min-w-0">
          <div className="text-base font-bold truncate">{name}</div>
          <div className="text-xs text-muted-foreground mt-0.5 truncate">{id}</div>
        </div>
        <div className="mt-auto self-end">
          <span
            className={`${tierStyle} text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs`}
          >
            Nível {tier}
          </span>
        </div>
      </div>
    </Link>
  );
}
