import { cn } from "@/lib/utils";
import type { PowerTier } from "@/lib/power-system";
import { tierColors } from "@/lib/power-system";

interface TierTotalScoreProps {
  totalScore: number;
  tier: PowerTier;
}

export { tierColors };

export const TierTotalScore = ({
  totalScore = 0,
  tier = "F" as PowerTier,
}: TierTotalScoreProps) => {
  const tierStyle = tierColors[tier];
  return (
    <div className="flex items-center gap-6">
      <div
        className={cn(
          "flex items-center justify-between text-center p-5 text-9xl font-bold w-40 h-40 texture-item background-texture",
          tierStyle
        )}
      >
        <p className="mx-auto">{tier}</p>
      </div>
      <div className="py-1">
        <h3 className="uppercase font-bold text-2xl mb-2">Pontuação total</h3>
        <h3 className="font-bold text-4xl">{totalScore} / 1200+ pontos</h3>
      </div>
    </div>
  );
};
