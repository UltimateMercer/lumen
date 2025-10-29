import { ItemValue } from "./item-value";
import { NexusFormatDate } from "./nexus-format-date";
import { SectionPaper } from "./section-paper";

type PersonalInfoSchoolEvaluationType = {
  registryName: string;
  realName: string;
  redactRealName?: boolean;
  age: string;
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
    age,
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
        <ItemValue item="Idade atual" value={`${age} anos`} />
        <ItemValue
          item="Data de nascimento"
          value={NexusFormatDate(birthDate)}
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
