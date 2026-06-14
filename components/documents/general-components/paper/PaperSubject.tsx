import { cn } from "@/lib/utils";
import { SectionPaper } from "./SectionPaper";
import { AccessLevel7Only } from "../stamps/AccessLevel7Only";

export const PaperSubject = ({
  divisionName,
  documentName,
  registry,
  isHighSecurity = false,
}: {
  divisionName?: string;
  documentName?: string;
  registry?: string;
  isHighSecurity?: boolean;
}) => {
  return (
    <SectionPaper>
      <div
        className={cn(
          "inline-block border px-3 py-1 text-xs font-medium mb-4 uppercase",
          isHighSecurity && "bg-destructive border-[#252525] text-[#eaeaea]",
          !isHighSecurity &&
            "border-[#252525] text-[#252525] dark:border-[#eaeaea] dark:text-[#eaeaea]"
        )}
      >
        {isHighSecurity ? "Ultra-Confidencial" : "Confidencial"}
      </div>
      {divisionName && (
        <h3 className="uppercase font-bold text-xl">{divisionName}</h3>
      )}

      {documentName && (
        <h3 className="uppercase font-bold text-xl">{documentName}</h3>
      )}

      {registry && <p>Nº: {registry}</p>}
      {isHighSecurity && <AccessLevel7Only />}
    </SectionPaper>
  );
};
