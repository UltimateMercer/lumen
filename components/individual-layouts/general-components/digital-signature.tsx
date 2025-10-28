import { NexusFormatDate } from "./nexus-format-date";

export const DigitalSignature = ({
  signature,
  registry,
  timestamp,
}: {
  signature: string;
  registry: string;
  timestamp: string;
}) => {
  return (
    <div className="block">
      <span className="text-sm text-muted-foreground uppercase">
        Assinatura:{" "}
      </span>
      <div className="flex items-center justify-between bg-muted-foreground/5 background-texture min-h-28 max-h-32">
        <div className="min-h-20 border border-[#252525] dark:border-[#eaeaea] mx-auto py-1 px-2">
          <p className="text-[9px] uppercase">
            Documento assinado digitalmente
          </p>
          <p className="text-sm font-bold uppercase">{signature}</p>
          <p className="text-xs uppercase">{registry}</p>
          <p className="text-xs uppercase">{NexusFormatDate(timestamp)}</p>
          <p className="text-[9px] uppercase text-center mt-1">
            República da Aurora
          </p>
        </div>
      </div>
      <div className="flex flex-nowrap items-center">
        <div className="w-full h-px bg-muted-foreground"></div>
        <span className="block text-sm text-muted-foreground uppercase text-nowrap">
          [Assinatura Digital]
        </span>
      </div>
    </div>
  );
};
