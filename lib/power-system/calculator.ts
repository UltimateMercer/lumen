import type {
  PowerEvaluationInput,
  PowerEvaluationResult,
  PowerTier,
} from './types'
import {
  ENERGY_EVALUATION_WEIGHT,
  PHYSICAL_EVALUATION_WEIGHT,
  BASE_POWER_WARNING_THRESHOLD,
} from './constants'
import {
  calcMediumAffinityForEnergyTable,
  calcMediumAffinityToPercent,
  calcMediumAffinityRounded,
} from './affinity'
import { avaliarEnergia } from '@/components/individual-layouts/general-components/energy-calculator'

export function getTier(score: number): PowerTier {
  if (score >= 1100) return 'S'
  if (score >= 900) return 'A'
  if (score >= 700) return 'B'
  if (score >= 600) return 'C'
  if (score >= 400) return 'D'
  if (score >= 200) return 'E'
  return 'F'
}

export function evaluatePower(input: PowerEvaluationInput): PowerEvaluationResult {
  const { affinities, energy, physical, additionalTests } = input

  const mediumAffinityRaw = calcMediumAffinityRounded(affinities)
  const mediumAffinityString = calcMediumAffinityForEnergyTable(affinities)
  const mediumAffinityPercent = calcMediumAffinityToPercent(affinities)

  const energySubtotal = Number((
    energy.totalEnergy *
    energy.energyControl *
    energy.speedManipulation *
    Number(mediumAffinityString) *
    ENERGY_EVALUATION_WEIGHT
  ).toFixed(0))

  const physicalMean = (
    physical.strength + physical.physicalSpeed + physical.durability + physical.stamina
  ) / 4
  const physicalSubtotal = Number((
    physicalMean * 100 * PHYSICAL_EVALUATION_WEIGHT
  ).toFixed(0))

  const totalBasePower = energySubtotal + physicalSubtotal

  const { nota: convertedTotalEnergyNote, classificacao: energyClassification } =
    avaliarEnergia(energy.totalEnergy)

  const energyControlPercent = Math.min(Math.round(energy.energyControl * 100), 100)
  const speedManipulationPercent = Math.round(energy.speedManipulation * 100)

  const powerAttributesSubtotal = Number((
    convertedTotalEnergyNote +
    energyControlPercent +
    speedManipulationPercent +
    mediumAffinityPercent +
    physical.strength +
    physical.physicalSpeed +
    physical.durability +
    physical.stamina
  ).toFixed(0))

  const additionalTestsSubtotal =
    additionalTests.survivanceAndFirstAid +
    additionalTests.strategySkills +
    additionalTests.teamwork +
    additionalTests.historyAndGeography

  const totalScore = powerAttributesSubtotal + additionalTestsSubtotal

  const tier = getTier(totalScore)

  return {
    mediumAffinity: mediumAffinityRaw,
    mediumAffinityString,
    mediumAffinityPercent,
    energySubtotal,
    physicalSubtotal,
    totalBasePower,
    isAboveWarningThreshold: totalBasePower >= BASE_POWER_WARNING_THRESHOLD,
    convertedTotalEnergyNote,
    energyClassification,
    powerAttributesSubtotal,
    additionalTestsSubtotal,
    totalScore,
    tier,
  }
}
