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

export const TierTotalScore = ({
  powerValues,
  additionalValues,
}: TierTotalScoreProps) => {
  const totalScore = () => {
    return Number(
      Object.values(powerValues).reduce((acc, curr) => acc + curr, 0) +
        Object.values(additionalValues).reduce((acc, curr) => acc + curr, 0)
    ).toFixed(0);
  };
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center justify-between bg-destructive text-[#eaeaea] text-center p-5 text-9xl font-bold w-40 h-40 texture-item">
        <p className="mx-auto">S</p>
      </div>
      <div className="py-1">
        <h3 className="uppercase font-bold text-2xl mb-2">Pontuação total</h3>
        <h3 className="font-bold text-4xl">{totalScore()} / 1200 pontos</h3>
      </div>
    </div>
  );
};
