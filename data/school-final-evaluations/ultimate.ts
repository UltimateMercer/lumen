import type { SchoolFinalEvaluationData } from "@/types/character-data";

export const ultimateSchoolFinalEvaluationData = {
  isHighSecurity: true,
  registry: "RA-1243-0000014",
  personalInfoData: {
    registryName: "Ultimate",
    realName: "Johan Kyler Mercer",
    redactRealName: true,
    age: "17",
    birthDate: "25-Vernis-1228-S",
    redactBirthDate: true,
    residence: "Academia Escolar de New Raven",
    redactResidence: true,
  },
  finalEvaluationData: {
    date: "56-Vernis-1243-S",
    institute: "Academia Escolar de New Raven",
    examiners: "Mago Ozymandias e Cirah Tauv Freids",
    redactExaminers: true,
  },
  affinities: {
    chakra: 0.95,
    mana: 0.92,
    spectral: 0.7,
  },
  energyComponentValues: {
    totalEnergy: 502541,
    energyControl: 0.98,
    speedManipulation: 0.95,
  },
  physicalComponentValues: {
    strength: 95,
    physicalSpeed: 95,
    durability: 92,
    stamina: 93,
  },
  additionalTableValues: {
    survivanceAndFirstAid: 90,
    strategySkills: 96,
    teamwork: 95,
    historyAndGeography: 92,
  },
  responsibleSignaturesData: [
    {
      department: "DEPARTAMENTO DE GESTÃO DE ATIVOS ESPECIAIS",
      name: "Cirah Tauv Freids",
      registry: "ra-dgae-90123",
      signature: "Cirah Tauv Freids",
      timestamp: "58-Vernis-1243-S - 14:42:19",
    },
  ],
} satisfies SchoolFinalEvaluationData;
