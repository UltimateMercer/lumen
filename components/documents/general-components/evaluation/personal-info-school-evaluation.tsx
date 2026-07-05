import { parseLumenDate, formatDate, getAge } from "@/lib/in-universe-rules/calendar";
import { CURRENT_DATE } from "@/lib/in-universe-rules/world-config";
import { ItemValue } from "../ui/item-value";
import { SectionPaper } from "../paper/section-paper";

type PersonalInfoSchoolEvaluationType = {
  registryName: string;
  realName: string;
  redactRealName?: boolean;
  birthDate: string;
  redactBirthDate?: boolean;
  residence: string;
  redactResidence?: boolean;
};

interface PersonalInfoSchoolEvaluationProps {
  personalInfo: PersonalInfoSchoolEvaluationType;
}

export const PersonalInfoSchoolEvaluation = ({
  personalInfo: {
    registryName,
    realName,
    redactRealName,
    birthDate,
    redactBirthDate,
    residence,
    redactResidence,
  },
}: PersonalInfoSchoolEvaluationProps) => {
  return (
    <SectionPaper>
      <div className="flex flex-col gap-2 mb-2.5">
        <h2 className="text-xl uppercase font-bold">Dados pessoais:</h2>
        <ItemValue item="Nome de registro" value={registryName} />
        <ItemValue
          item="Nome de real"
          value={realName}
          redacted={redactRealName}
        />
        <ItemValue item="Idade atual" value={`${getAge(parseLumenDate(birthDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), CURRENT_DATE)} anos`} />
        <ItemValue
          item="Data de nascimento"
          value={formatDate(parseLumenDate(birthDate, { fallbackEra: "N.E.C.", fallbackHemisphere: "S" }), "official-abbr")}
          redacted={redactBirthDate}
        />
        <ItemValue
          item="Residência"
          value={residence}
          redacted={redactResidence}
        />
      </div>
    </SectionPaper>
  );
};
