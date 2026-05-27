import type { AffinityValues } from './types'

function calcRawMedium(affinities: AffinityValues): number {
  return (affinities.chakra + affinities.mana + affinities.spectral) / 3
}

export function calcMediumAffinityForEnergyTable(affinities: AffinityValues): string {
  const total = calcRawMedium(affinities)
  return total.toFixed(2)
}

export function calcMediumAffinityToPercent(affinities: AffinityValues): number {
  const total = calcRawMedium(affinities)
  const toPercent = Number((total * 100).toFixed(2))
  return Number(toPercent.toFixed(0))
}

export function calcMediumAffinityRounded(affinities: AffinityValues): number {
  const total = calcRawMedium(affinities)
  return Number(total.toFixed(3))
}
