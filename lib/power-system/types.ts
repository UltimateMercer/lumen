export interface AffinityValues {
  chakra: number
  mana: number
  spectral: number
}

export interface EnergyComponentValues {
  totalEnergy: number
  energyControl: number
  speedManipulation: number
}

export interface PhysicalComponentValues {
  strength: number
  physicalSpeed: number
  durability: number
  stamina: number
}

export interface AdditionalTestValues {
  survivanceAndFirstAid: number
  strategySkills: number
  teamwork: number
  historyAndGeography: number
}

export interface PowerEvaluationInput {
  affinities: AffinityValues
  energy: EnergyComponentValues
  physical: PhysicalComponentValues
  additionalTests: AdditionalTestValues
}

export type PowerTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface PowerEvaluationResult {
  mediumAffinity: number
  mediumAffinityString: string
  mediumAffinityPercent: number
  energySubtotal: number
  physicalSubtotal: number
  totalBasePower: number
  isAboveWarningThreshold: boolean
  convertedTotalEnergyNote: number
  energyClassification: string
  powerAttributesSubtotal: number
  additionalTestsSubtotal: number
  totalScore: number
  tier: PowerTier
}
