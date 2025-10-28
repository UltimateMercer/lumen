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
import { ProtectDoc } from "../general-components/protect-doc-text";

interface CompProps {
  individual: any;
}

export const SchoolFinalEvaluationDoc = ({ individual }: CompProps) => {
  const {
    isHighSecurity,
    registry,
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
        registry={registry}
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
      <ProtectDoc />

      <StampRepAurora />
    </Paper>
  );
};
