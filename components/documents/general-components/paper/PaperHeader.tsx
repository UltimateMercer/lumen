import { WarningIcon } from "@phosphor-icons/react";

export const PaperHeader = ({
  department,
  isHighSecurity = false,
}: {
  department: string;
  isHighSecurity?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-0.5 dark:bg-[#eaeaea] bg-[#252525] background-texture texture-item p-4 mb-3 text-center">
      <div className="text-lg font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
        República da Aurora
      </div>
      <div className="text-sm font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
        DEPARTAMENTO DE GESTÃO DE ATIVOS ESPECIAIS
      </div>
      {isHighSecurity && (
        <div className="flex items-center justify-center gap-2 text-sm font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
          <WarningIcon weight="fill" className="text-destructive!" size={16} />{" "}
          NÍVEL MÁXIMO DE SEGURANÇA{" "}
          <WarningIcon weight="fill" className="text-destructive!" size={16} />
        </div>
      )}
    </div>
  );
};
