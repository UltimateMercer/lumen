import { WarningIcon } from "@phosphor-icons/react";
import { SectionPaper } from "./section-paper";

export const FinalReminder = () => {
  return (
    <SectionPaper>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center justify-center mb-2">
          <WarningIcon
            weight="fill"
            className="text-destructive! animate-pulse"
            size={18}
          />
          <WarningIcon
            weight="fill"
            className="text-destructive! animate-pulse"
            size={18}
          />
          <WarningIcon
            weight="fill"
            className="text-destructive! animate-pulse"
            size={18}
          />
          LEMBRETE FINAL
          <WarningIcon
            weight="fill"
            className="text-destructive! animate-pulse"
            size={18}
          />
          <WarningIcon
            weight="fill"
            className="text-destructive! animate-pulse"
            size={18}
          />
          <WarningIcon
            weight="fill"
            className="text-destructive! animate-pulse"
            size={18}
          />
        </div>
        <p className="text-center">
          A EXISTÊNCIA E IDENTIDADE REAL DESTE INDIVÍDUO SÃO SEGREDO DE ESTADO
          DE NÍVEL MÁXIMO. VAZAMENTO DE INFORMAÇÕES = TRAIÇÃO
        </p>
      </div>
    </SectionPaper>
  );
};
