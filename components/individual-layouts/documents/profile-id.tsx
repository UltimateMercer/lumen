import { RedactedText } from "@/components/redacted-text";
import { Paper } from "../general-components/paper";
import { PaperHeader } from "../general-components/paper-header";
import { PaperSubject } from "../general-components/paper-subject";
import { ProfileName } from "../general-components/profile-name";
import { ItemValue } from "../general-components/item-value";
import { NexusFormatDate } from "../general-components/nexus-format-date";
import { SectionPaper } from "../general-components/section-paper";
import { ResponsibleSignatures } from "../general-components/responsible-signatures";
import { StampRepAurora } from "../general-components/stamp-rep-aurora";
import { ProtectDoc } from "../general-components/protect-doc-text";
import { Section } from "lucide-react";
interface CompProps {
  individual: any;
}
export const ProfileId = ({ individual }: CompProps) => {
  const {
    isHighSecurity,
    responsibleSignaturesData,
    name,
    knownAs,
    age,
    birthDate,
    birthPlace,
    occupation,
    height,
    weight,
    bloodType,
    eyeColor,
    hairColor,
    skinColor,
  } = individual;
  return (
    <Paper>
      <PaperHeader department="DEPARTAMENTO DE REGISTROS E CIDADANIA" />
      <PaperSubject
        documentName="Documento de perfil de identificação"
        isHighSecurity={false}
      />
      <ProfileName
        name={name}
        knownAs={knownAs}
        isHighSecurity={isHighSecurity}
      />
      <SectionPaper>
        <div className="flex flex-col gap-2">
          <ItemValue
            className="text-sm"
            item="NOME COMPLETO"
            value={name}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="data de nascimento"
            value={NexusFormatDate(birthDate)}
            redacted={isHighSecurity}
          />
          <ItemValue className="text-sm" item="idade" value={`${age} anos`} />
          <ItemValue
            className="text-sm"
            item="Local de nascimento"
            value={birthPlace}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="Ocupação"
            value={occupation}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="Altura"
            value={height}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="peso"
            value={weight}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="tipo sanguíneo"
            value={bloodType}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="Cor dos olhos"
            value={eyeColor}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="Cor do cabelo"
            value={hairColor}
            redacted={isHighSecurity}
          />
          <ItemValue
            className="text-sm"
            item="Cor de pele"
            value={skinColor}
            redacted={isHighSecurity}
          />
        </div>
      </SectionPaper>
      <SectionPaper>
        <ResponsibleSignatures
          responsibleSignatures={responsibleSignaturesData}
        />
      </SectionPaper>

      <ProtectDoc />
      <StampRepAurora />
    </Paper>
  );
};
