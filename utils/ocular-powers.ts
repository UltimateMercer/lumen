// types.ts - Definições de tipos para os poderes oculares

/**
 * Classificação do poder ocular
 */
export type PowerClassification =
  | "Raro"
  | "Extremamente Raro"
  | "Mutação Extremamente Rara"
  | "Mutação Rara";

/**
 * Tipo de poder ocular (base ou mutação)
 */
export type PowerType = "base" | "mutation";

/**
 * Descrição visual dos olhos
 */
export interface VisualDescription {
  sclera: string;
  irisBorder: string;
  pupil: string;
  spaceBetweenIrisAndPupil: string;
}

/**
 * Modificadores de poder
 */
export interface PowerModifiers {
  powerMultiplier: {
    min: number;
    max: number;
  };
  efficiencyBonus: {
    baseValue: number;
    description?: string;
  };
}

/**
 * Habilidade individual (ativa, suprema, etc)
 */
export interface Ability {
  name: string;
  description: string;
  consumption: string;
  additionalNotes?: string[];
}

/**
 * Habilidades supremas especiais (como Avatar)
 */
export interface SpecialSupremeAbility extends Ability {
  duration?: string;
  specialRequirement?: string;
  differential?: string;
}

/**
 * Informações sobre limitações e custos
 */
export interface Limitations {
  supremeAbilitiesEffect: string;
  recoveryTime: string;
  energyCost: string;
  duringBlindness: string;
  additionalLimitations: string[];
}

/**
 * Limitações especiais para Insane Crimson Eyes
 */
export interface InsaneLimitations {
  uncontrolledVersion: string[];
  controlledVersion: string[];
  general: string[];
}

/**
 * Informações sobre evolução
 */
export interface Evolution {
  possible: boolean;
  description: string;
}

/**
 * Informações sobre capacidade de doação
 */
export interface DonationCapability {
  canDonate: boolean;
  description: string;
  knownMutations?: string[];
}

/**
 * Características especiais do Insane Crimson Eyes
 */
export interface InsanityCharacteristics {
  unstableNature: string[];
  insanityMode: string[];
  controlledVersion: string[];
}

/**
 * Modificadores duplos do Insane Crimson Eyes
 */
export interface DualModifiers {
  uncontrolledVersion: {
    powerMultiplier: string;
    efficiencyBonus: string;
    behavior: string[];
    triggers: string[];
    duration: string[];
  };
  controlledVersion: {
    powerMultiplier: {
      min: number;
      max: number;
    };
    efficiencyBonus: number;
    behavior: string[];
    howToAchieve: string[];
  };
}

/**
 * Interface principal para um poder ocular
 */
export interface OcularPower {
  id: string;
  name: string;
  classification: PowerClassification;
  type: PowerType;
  geneticOrigin: string;
  visualDescription: VisualDescription;
  activationCondition: string;
  modifiers: PowerModifiers;
  passiveAbilities: Ability[];
  abilities: Ability[];
  inheritedAbilities?: Ability[];
  supremeAbilities: Ability[];
  specialSupremeAbilities?: SpecialSupremeAbility[];
  limitations: Limitations;
  donationCapability: DonationCapability;
}

/**
 * Interface especial para Insane Crimson Eyes
 */
export interface InsaneOcularPower
  extends Omit<OcularPower, "modifiers" | "limitations"> {
  dualModifiers: DualModifiers;
  insanityCharacteristics: InsanityCharacteristics;
  limitations: InsaneLimitations;
}

/**
 * Union type para qualquer poder ocular
 */
export type AnyOcularPower = OcularPower | InsaneOcularPower;

/**
 * Type guard para verificar se é Insane Crimson Eyes
 */
export function isInsaneOcularPower(
  power: AnyOcularPower
): power is InsaneOcularPower {
  return power.id === "insane-crimson-eyes";
}
