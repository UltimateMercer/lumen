import { WarningIcon } from "@phosphor-icons/react";
import { ItemValue } from "./item-value";
import { SectionPaper } from "./section-paper";
import { FinalReminder } from "./final-reminder";

export const PaperFooter = ({
  isHighSecurity = false,
  distribution,
  redactDistribuition = false,
}: {
  isHighSecurity?: boolean;
  distribution: string;
  redactDistribuition?: boolean;
}) => {
  return (
    <SectionPaper className="border-0 pb-0">
      {isHighSecurity && <FinalReminder />}
      <div className="flex flex-col gap-2">
        <ItemValue
          className="text-sm"
          item="CLASSIFICAÇÃO DE SEGURANÇA"
          value={isHighSecurity ? "ULTRA-CONFIDENCIAL" : "CONFIDENCIAL"}
        />
        <ItemValue
          className="text-sm"
          item="DISTRIBUIÇÃO"
          value={distribution}
          redacted={redactDistribuition}
        />
      </div>

      <div className="flex gap-2 items-center justify-center mt-2 ">
        <WarningIcon
          weight="fill"
          className="text-[#252525]! dark:text[#eaeaea] animate-pulse"
          size={18}
        />
        DESTRUIÇÃO AUTORIZADA APENAS POR ORDEM DO CONSELHO
        <WarningIcon
          weight="fill"
          className="text-[#252525]! dark:text[#eaeaea] animate-pulse"
          size={18}
        />
      </div>
      {isHighSecurity && (
        <div className="text-center text-sm font-bold text-[#121212] dark:text-[#eaeaea] uppercase">
          [ULTRA-CONFIDENCIAL - NÍVEL 7+]
        </div>
      )}
    </SectionPaper>
  );
};
