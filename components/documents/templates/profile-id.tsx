"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "@/lib/archive/documents";
import type { ResponsibleSignature } from "@/types/character-data";
import { Paper } from "../general-components/paper/paper";
import { PaperHeader } from "../general-components/paper/paper-header";
import { PaperSubject } from "../general-components/paper/paper-subject";
import { ProfileName } from "../general-components/ui/profile-name";
import { ItemValue } from "../general-components/ui/item-value";
import { NexusFormatDate } from "../general-components/ui/nexus-format-date";
import { SectionPaper } from "../general-components/paper/section-paper";
import { ResponsibleSignatures } from "../general-components/signatures/responsible-signatures";
import { StampRepAurora } from "../general-components/stamps/stamp-rep-aurora";
import { ProtectDoc } from "../general-components/ui/protect-doc-text";

interface ProfileIdFrontmatter extends DocumentFrontmatter {
  isHighSecurity: boolean;
  nrc: string;
  name: string;
  knownAs: string;
  age: number;
  birthDate: string;
  birthPlace: string;
  occupation: string;
  height: string;
  weight: string;
  bloodType: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
  responsibleSignaturesData: ResponsibleSignature[];
}

export function ProfileId({ doc }: { doc: ArchiveDocument }) {
  const fm = doc.frontmatter as unknown as ProfileIdFrontmatter;

  const {
    isHighSecurity,
    nrc,
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
    responsibleSignaturesData,
  } = fm;

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
            item="NRC"
            value={nrc}
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
}
