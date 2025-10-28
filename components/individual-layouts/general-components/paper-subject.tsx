import { cn } from "@/lib/utils";
import { SectionPaper } from "./section-paper";
import { AccessLevel7Only } from "./access-level-7-only";

export const PaperSubject = ({
  divisionName,
  documentName,
  registry,
  isHighSecurity = false,
}: {
  divisionName: string;
  documentName: string;
  registry: string;
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
      <h3 className="uppercase font-bold text-xl">{divisionName}</h3>
      <h3 className="uppercase font-bold text-xl">{documentName}</h3>
      {registry && <p>Nº: {registry}</p>}
      {isHighSecurity && <AccessLevel7Only />}
    </SectionPaper>
  );
};
