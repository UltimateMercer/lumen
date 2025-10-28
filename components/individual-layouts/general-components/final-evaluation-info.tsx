import { ItemValue } from "./item-value";
import { NexusFormatDate } from "./nexus-format-date";
import { SectionPaper } from "./section-paper";
import { SectionTitle } from "./section-title";

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
          value={NexusFormatDate(finalEvaluationData.date)}
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
