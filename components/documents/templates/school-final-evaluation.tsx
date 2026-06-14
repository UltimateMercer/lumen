import { TablePowerAttributes } from "../general-components/evaluation/table-power-attributes";
import { TableAdditionalTest } from "../general-components/evaluation/table-additional-test";
import { TableEnergyComponent } from "../general-components/evaluation/table-energy";
import { TablePhysicalComponent } from "../general-components/evaluation/table-physical";
import { TotalPowerBase } from "../general-components/evaluation/total-power-base";
import { TierTotalScore } from "../general-components/evaluation/tier-total-score";
import { StampRepAurora } from "../general-components/stamps/StampRepAurora";
import { ResponsibleSignatures } from "../general-components/signatures/ResponsibleSignatures";
import { SectionPaper } from "../general-components/paper/SectionPaper";
import { Paper } from "../general-components/paper/Paper";
import { PaperHeader } from "../general-components/paper/PaperHeader";
import { SectionTitle } from "../general-components/paper/SectionTitle";
import { FinalEvaluationInfo } from "../general-components/evaluation/final-evaluation-info";
import { PersonalInfoSchoolEvaluation } from "../general-components/evaluation/personal-info-school-evaluation";
import { PaperSubject } from "../general-components/paper/PaperSubject";
import { PaperFooter } from "../general-components/paper/PaperFooter";
import { ProtectDoc } from "../general-components/ui/ProtectDocText";
import { TableAffinitiesComponent } from "../general-components/evaluation/table-affinities";
import { evaluatePower } from "@/lib/power-system";

interface CompProps {
  individual: any;
}

export const SchoolFinalEvaluationDoc = ({ individual }: CompProps) => {
  const {
    isHighSecurity,
    registry,
    personalInfoData,
    finalEvaluationData,
    affinities,
    energyComponentValues,
    physicalComponentValues,
    additionalTableValues,
    responsibleSignaturesData,
  } = individual;

  const powerResult = evaluatePower({
    affinities,
    energy: energyComponentValues,
    physical: physicalComponentValues,
    additionalTests: additionalTableValues,
  });

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
          <TableEnergyComponent
            attributes={{
              totalEnergy: energyComponentValues.totalEnergy,
              energyControl: energyComponentValues.energyControl,
              speedManipulation: energyComponentValues.speedManipulation,
            }}
            mediumAffinityString={powerResult.mediumAffinityString}
            subtotal={powerResult.energySubtotal}
          />
          <TablePhysicalComponent
            attributes={physicalComponentValues}
            subtotal={powerResult.physicalSubtotal}
          />
          <TotalPowerBase
            totalBasePower={powerResult.totalBasePower}
            isAboveWarningThreshold={powerResult.isAboveWarningThreshold}
          />
        </div>
      </SectionPaper>
      <SectionPaper>
        <SectionTitle>Afinidades</SectionTitle>
        <TableAffinitiesComponent attributes={affinities} />
      </SectionPaper>
      <SectionPaper>
        <SectionTitle>COMPONENTES PARA CLASSIFICAÇÃO DE TIER</SectionTitle>
        <TablePowerAttributes
          attributes={{
            energyControl: Math.min(Math.round(energyComponentValues.energyControl * 100), 100),
            speedManipulation: Math.round(energyComponentValues.speedManipulation * 100),
            mediumAffinity: powerResult.mediumAffinityPercent,
            strength: physicalComponentValues.strength,
            physicalSpeed: physicalComponentValues.physicalSpeed,
            durability: physicalComponentValues.durability,
            stamina: physicalComponentValues.stamina,
          }}
          convertedTotalEnergyNote={powerResult.convertedTotalEnergyNote}
          subtotal={powerResult.powerAttributesSubtotal}
        />
        <TableAdditionalTest
          attributes={additionalTableValues}
          subtotal={powerResult.additionalTestsSubtotal}
        />
      </SectionPaper>
      <SectionPaper>
        <SectionTitle>RESULTADO FINAL</SectionTitle>
        <TierTotalScore
          totalScore={powerResult.totalScore}
          tier={powerResult.tier}
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
