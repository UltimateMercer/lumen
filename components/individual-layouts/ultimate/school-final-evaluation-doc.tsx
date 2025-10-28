import type { Individual } from "@/utils/government-data";
import { TablePowerAttributes } from "../general-components/table-power-attributes";
import { TableAdditionalTest } from "../general-components/table-additional-test";
import { TableEnergyComponent } from "../general-components/table-energy";
import { TablePhysicalComponent } from "../general-components/table-physical";
import { TotalPowerBase } from "../general-components/total-power-base";
import { TierTotalScore } from "../general-components/tier-total-score";
import { StampRepAurora } from "../general-components/stamp-rep-aurora";
import { ResponsibleSignatures } from "../general-components/responsible-signatures";
import { SectionPaper } from "../general-components/section-paper";
import { Paper } from "../general-components/paper";
import { PaperHeader } from "../general-components/paper-header";
import { SectionTitle } from "../general-components/section-title";
import { FinalEvaluationInfo } from "../general-components/final-evaluation-info";
import { PersonalInfoSchoolEvaluation } from "../general-components/personal-info-school-evaluation";
import { PaperSubject } from "../general-components/paper-subject";
import { PaperFooter } from "../general-components/paper-footer";

interface CompProps {
  individual: any;
}

// const energyComponentValues = {
//   totalEnergy: 498541,
//   energyControl: 0.98,
//   speedManipulation: 0.95,
//   mediumAffinity: 0.865,
// };

// const physicalComponentValues = {
//   strength: 95,
//   physicalSpeed: 95,
//   durability: 92,
//   stamina: 93,
// };

// const tablePowerValues = {
//   totalEnergy: 95,
//   energyControl: 98,
//   speedManipulation: 95,
//   mediumAffinity: 87,
//   strength: 95,
//   physicalSpeed: 95,
//   durability: 92,
//   stamina: 93,
// };

// const additionalTableValues = {
//   survivanceAndFirstAid: 90,
//   strategySkills: 97,
//   teamwork: 95,
//   historyAndGeography: 92,
// };

// const finalEvaluationData = {
//   date: "56 - Vernis - 1240",
//   institute: "Academia Escolar de New Raven",
//   examiners: "Mago Ozymandias e Cirah Tauv Freids",
//   redactExaminers: true,
// };

// const responsibleSignaturesData = [
//   {
//     department: "DEPARTAMENTO DE GESTÃO DE ATIVOS ESPECIAIS",
//     name: "Cirah Tauv Freids",
//     registry: "ra-csn-90123",
//     signature: "Cirah Tauv Freids",
//   },
// ];

// const personalInfoData = {
//   registryName: "Ultimate",
//   realName: "Johan Kyler Mercer",
//   redactRealName: true,
//   age: "17",
//   birthDate: "25 - Vernis - 1228",
//   redactBirthDate: true,
//   residence: "Academia Escolar de New Raven",
//   redactResidence: true,
// };

export const SchoolFinalEvaluationDoc = ({ individual }: CompProps) => {
  const {
    isHighSecurity,
    personalInfoData,
    finalEvaluationData,
    energyComponentValues,
    physicalComponentValues,
    tablePowerValues,
    additionalTableValues,
    responsibleSignaturesData,
  } = individual;
  return (
    <Paper>
      <PaperHeader
        department="DEPARTAMENTO DE GESTÃO DE ATIVOS ESPECIAIS"
        isHighSecurity={isHighSecurity}
      />
      <PaperSubject
        divisionName="DIVISÃO DE AVALIAÇÃO E CLASSIFICAÇÃO"
        documentName="FICHA DE REGISTRO NACIONAL - PRIORIDADE NACIONAL"
        registry="RA-1240-0000014"
        isHighSecurity={isHighSecurity}
      />

      <PersonalInfoSchoolEvaluation personalInfo={personalInfoData} />
      <FinalEvaluationInfo finalEvaluationData={finalEvaluationData} />
      <SectionPaper>
        <SectionTitle>PODER BASE</SectionTitle>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">CÁLCULO DETALHADO:</h2>
          <TableEnergyComponent attributes={energyComponentValues} />
          <TablePhysicalComponent attributes={physicalComponentValues} />
          <TotalPowerBase
            energy={energyComponentValues}
            physical={physicalComponentValues}
          />
        </div>
      </SectionPaper>
      <SectionPaper>
        <SectionTitle>COMPONENTES PARA CLASSIFICAÇÃO DE TIER</SectionTitle>
        <TablePowerAttributes attributes={tablePowerValues} />
        <TableAdditionalTest attributes={additionalTableValues} />
      </SectionPaper>
      <SectionPaper>
        <SectionTitle>RESULTADO FINAL</SectionTitle>
        <TierTotalScore
          powerValues={tablePowerValues}
          additionalValues={additionalTableValues}
        />
      </SectionPaper>

      <SectionPaper>
        <ResponsibleSignatures
          responsibleSignatures={responsibleSignaturesData}
        />
      </SectionPaper>
      <PaperFooter
        distribution="Conselho Nacional"
        isHighSecurity={isHighSecurity}
      />
      <StampRepAurora />
    </Paper>
  );
};
