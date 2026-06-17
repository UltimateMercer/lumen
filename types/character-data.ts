export interface ResponsibleSignature {
  department: string;
  name: string;
  registry: string;
  signature: string;
  timestamp: string;
}

export interface MentorData {
  department?: string;
  name?: string;
  registry?: string;
  signature?: string;
  timestamp?: string;
}

export interface ProfileIdData {
  name: string;
  knownAs: string;
  birthDate: string;
  birthPlace: string;
  age: number;
  occupation: string;
  height: string;
  weight: string;
  bloodType: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
  responsibleSignaturesData: ResponsibleSignature[];
  isHighSecurity?: boolean;
}

export interface PermissionsData {
  id: string;
  registryName: string;
  age: number;
  birthDate: string;
  licenseStartDate: string;
  tier: string;
  mentor: MentorData;
  responsibleSignatures: ResponsibleSignature[];
}

export interface Affinities {
  chakra: number;
  mana: number;
  spectral: number;
}

export interface EnergyComponentValues {
  totalEnergy: number;
  energyControl: number;
  speedManipulation: number;
}

export interface PhysicalComponentValues {
  strength: number;
  physicalSpeed: number;
  durability: number;
  stamina: number;
}

export interface AdditionalTableValues {
  survivanceAndFirstAid: number;
  strategySkills: number;
  teamwork: number;
  historyAndGeography: number;
}

export interface PersonalInfoData {
  registryName: string;
  realName: string;
  redactRealName: boolean;
  age: string;
  birthDate: string;
  redactBirthDate: boolean;
  residence: string;
  redactResidence: boolean;
}

export interface FinalEvaluationData {
  date: string;
  institute: string;
  examiners: string;
  redactExaminers: boolean;
}

export interface SchoolFinalEvaluationData {
  registry: string;
  personalInfoData: PersonalInfoData;
  finalEvaluationData: FinalEvaluationData;
  affinities: Affinities;
  energyComponentValues: EnergyComponentValues;
  physicalComponentValues: PhysicalComponentValues;
  additionalTableValues: AdditionalTableValues;
  responsibleSignaturesData: ResponsibleSignature[];
  isHighSecurity?: boolean;
}
