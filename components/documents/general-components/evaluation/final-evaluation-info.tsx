import { parseLumenDate, formatDate } from "@/lib/in-universe-rules/calendar";
import { ItemValue } from "../ui/item-value";
import { SectionPaper } from "../paper/section-paper";
import { SectionTitle } from "../paper/section-title";

type FinalEvaluationInfoType = {
  date: string;
  institute: string;
  examiners: string;
  redactInstitute?: boolean;
  redactExaminers?: boolean;
};

interface FinalEvaluationInfoProps {
  finalEvaluationData: FinalEvaluationInfoType;
}

export const FinalEvaluationInfo = ({
  finalEvaluationData,
}: FinalEvaluationInfoProps) => {
  return (
    <SectionPaper>
      <SectionTitle>AVALIAÇÃO FINAL ESCOLAR</SectionTitle>
      <div className="flex flex-col gap-2 mb-2.5">
        <ItemValue
          className="text-sm"
          item="Data de avaliação"
          value={formatDate(parseLumenDate(finalEvaluationData.date, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
        />
        <ItemValue
          className="text-sm"
          item="Instituição"
          value={finalEvaluationData.institute}
          redacted={finalEvaluationData.redactInstitute}
        />
        <ItemValue
          className="text-sm"
          item="Examinadore(s)"
          value={finalEvaluationData.examiners}
          redacted={finalEvaluationData.redactExaminers}
        />
      </div>
    </SectionPaper>
  );
};
