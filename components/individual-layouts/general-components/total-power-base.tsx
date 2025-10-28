import { WarningIcon } from "@phosphor-icons/react";

export const TotalPowerBase = ({ energy, physical }: any) => {
  const evaluationWeight = 0.5;

  const totalBasePower = () => {
    // Subtotal Energy
    const energyTotal =
      energy.totalEnergy *
      energy.energyControl *
      energy.speedManipulation *
      energy.mediumAffinity *
      evaluationWeight;

    // Subtotal Physical
    const mediumValue =
      (physical.strength +
        physical.physicalSpeed +
        physical.durability +
        physical.stamina) /
      4;

    const physicalTotal = mediumValue * 100 * evaluationWeight;

    // Soma total e arredonda para inteiro
    const total = energyTotal + physicalTotal;
    const totalRounded = Number(total.toFixed(0));
    return totalRounded;
  };

  return (
    <>
      <div className="border border-[#252525] dark:border-[#eaeaea] pb-2">
        <div className="text-[#eaeaea] bg-[#252525] dark:text-[#252525] dark:bg-[#eaeaea] p-1 uppercase text-center text-lg font-bold mb-2">
          Poder Base total
        </div>
        <div className="text-center font-bold uppercase">
          {totalBasePower()} pontos
        </div>
      </div>
      {totalBasePower() >= 200000 && (
        <div className="bg-destructive">
          <div className="text-[#eaeaea] p-4">
            <div className="flex gap-2 items-center justify-center mb-2">
              <WarningIcon
                weight="fill"
                className="text-[#252525]! animate-pulse"
                size={18}
              />
              ALERTA CRÍTICO
              <WarningIcon
                weight="fill"
                className="text-[#252525]! animate-pulse"
                size={18}
              />
            </div>
            <p>
              Poder base total excede 200000 pontos. Apenas 0.001% da população
              atinge este nível.
            </p>
            <p className="text-center">
              ATIVO ESTRATÉGICO DE IMPORTÂNCIA MÁXIMA
            </p>
          </div>
        </div>
      )}
    </>
  );
};
