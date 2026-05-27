import { WarningIcon } from "@phosphor-icons/react";
import { BASE_POWER_WARNING_THRESHOLD } from "@/lib/power-system";

interface TotalPowerBaseProps {
  totalBasePower: number;
  isAboveWarningThreshold: boolean;
}

export const TotalPowerBase = ({
  totalBasePower = 0,
  isAboveWarningThreshold = false,
}: TotalPowerBaseProps) => {
  return (
    <>
      <div className="border border-[#252525] dark:border-[#eaeaea] pb-2">
        <div className="text-[#eaeaea] bg-[#252525] dark:text-[#252525] dark:bg-[#eaeaea] p-1 text-center text-lg font-bold uppercase mb-2">
          Poder Base total
        </div>
        <div className="text-center font-bold uppercase">
          {totalBasePower} pontos
        </div>
      </div>
      {totalBasePower >= BASE_POWER_WARNING_THRESHOLD && (
        <div className="bg-destructive">
          <div className="text-[#eaeaea] p-4">
            <div className="flex gap-2 items-center justify-center font-bold text-lg mb-2">
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
            <div className="flex gap-1 items-center justify-center animate-pulse mt-2">
              <WarningIcon
                weight="fill"
                className="text-[#252525]!"
                size={18}
              />
              <p className="text-center font-bold">
                ATIVO ESTRATÉGICO DE IMPORTÂNCIA MÁXIMA
              </p>
              <WarningIcon
                weight="fill"
                className="text-[#252525]!"
                size={18}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
