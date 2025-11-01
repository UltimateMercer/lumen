import { cn } from "@/lib/utils";
import { avaliarEnergia } from "./energy-calculator";

type TablePowerValues = {
  totalEnergy: number;
  energyControl: number;
  speedManipulation: number;
  mediumAffinity: number;
  strength: number;
  physicalSpeed: number;
  durability: number;
  stamina: number;
};

type AdditionalTableValues = {
  survivanceAndFirstAid: number;
  strategySkills: number;
  teamwork: number;
  historyAndGeography: number;
};

interface TierTotalScoreProps {
  powerValues: TablePowerValues;
  additionalValues: AdditionalTableValues;
}

export const tierColors: Record<string, string> = {
  S: "bg-indigo-500 text-[#eaeaea]",
  A: "bg-blue-500 text-[#eaeaea]",
  B: "bg-sky-500 text-[#eaeaea]",
  C: "bg-teal-500 text-[#eaeaea]",
  D: "bg-yellow-500 text-[#252525]",
  E: "bg-green-500 text-[#252525]",
  F: "bg-muted-foreground/50 text-[#252525]",
};

export const TierTotalScore = ({
  powerValues,
  additionalValues,
}: TierTotalScoreProps) => {
  const fixedPowerValues = {
    ...powerValues,
    totalEnergy: avaliarEnergia(powerValues.totalEnergy).nota,
  };
  const totalScore = () => {
    return Number(
      Object.values(fixedPowerValues).reduce((acc, curr) => acc + curr, 0) +
        Object.values(additionalValues).reduce((acc, curr) => acc + curr, 0)
    ).toFixed(0);
  };

  const getTier = (score: number) => {
    if (Number(score) >= 1100) return "S";
    if (Number(score) >= 900 && Number(score) <= 1099) return "A";
    if (Number(score) >= 700 && Number(score) <= 899) return "B";
    if (Number(score) >= 600 && Number(score) <= 699) return "C";
    if (Number(score) >= 400 && Number(score) <= 599) return "D";
    if (Number(score) >= 200 && Number(score) <= 399) return "E";
    return "F";
  };

  const score = totalScore();
  const tier = getTier(Number(score));
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
        <h3 className="font-bold text-4xl">{score} / 1200+ pontos</h3>
      </div>
    </div>
  );
};
