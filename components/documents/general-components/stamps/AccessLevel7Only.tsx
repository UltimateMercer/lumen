import { WarningIcon } from "@phosphor-icons/react";

export const AccessLevel7Only = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-2 animate-pulse">
      <WarningIcon weight="fill" className="text-destructive!" size={18} />
      <WarningIcon weight="fill" className="text-destructive!" size={18} />
      <WarningIcon weight="fill" className="text-destructive!" size={18} />
      ACESSO RESTRITO A AUTORIDADES DE NÍVEL 7+
      <WarningIcon weight="fill" className="text-destructive!" size={18} />
      <WarningIcon weight="fill" className="text-destructive!" size={18} />
      <WarningIcon weight="fill" className="text-destructive!" size={18} />
    </div>
  );
};
