import type { PowerTier } from './types'

export const ENERGY_EVALUATION_WEIGHT = 0.5
export const PHYSICAL_EVALUATION_WEIGHT = 0.5

export const BASE_POWER_WARNING_THRESHOLD = 200_000
export const ENERGY_EXCEPTIONAL_THRESHOLD = 300_000
export const EXCEPTIONAL_PERCENT_THRESHOLD = 95

export const TIER_THRESHOLDS: { tier: PowerTier; min: number }[] = [
  { tier: 'S', min: 1100 },
  { tier: 'A', min: 900 },
  { tier: 'B', min: 700 },
  { tier: 'C', min: 600 },
  { tier: 'D', min: 400 },
  { tier: 'E', min: 200 },
  { tier: 'F', min: 0 },
]

export const tierColors: Record<PowerTier, string> = {
  S: "bg-indigo-500 text-[#eaeaea]",
  A: "bg-blue-500 text-[#eaeaea]",
  B: "bg-sky-500 text-[#eaeaea]",
  C: "bg-teal-500 text-[#eaeaea]",
  D: "bg-yellow-500 text-[#252525]",
  E: "bg-green-500 text-[#252525]",
  F: "bg-muted-foreground/50 text-[#252525]",
}
