// energiaCalculator.ts

// Tipos
export interface FaixaEnergia {
  max: number;
  notaMax: number;
}

export interface AvaliacaoEnergia {
  energia: number;
  nota: number;
  classificacao: string;
}

export type Classificacao =
  | "Humano Comum"
  | "Iniciante/Competente"
  | "Experiente/Elite"
  | "Mestre"
  | "Grande Mestre"
  | "Lendário"
  | "Divino"
  | "Entidade Cósmica";

// Configuração das faixas (fácil de ajustar)
const FAIXAS_ENERGIA: FaixaEnergia[] = [
  { max: 1000, notaMax: 30 },
  { max: 10000, notaMax: 55 },
  { max: 50000, notaMax: 72 },
  { max: 150000, notaMax: 83 },
  { max: 500000, notaMax: 91 },
  { max: 1500000, notaMax: 96 },
  { max: 2500000, notaMax: 99 }, // ← AJUSTADO AQUI
  { max: Infinity, notaMax: 100 },
];

/**
 * Calcula a nota (0-100) baseada na energia total
 * @param energia - Energia total do personagem
 * @returns Nota de 0 a 100
 */
export function calcularNotaEnergia(energia: number): number {
  if (energia < 0 || isNaN(energia)) return 0;

  let energiaMin = 0;
  let notaMin = 0;

  for (const faixa of FAIXAS_ENERGIA) {
    if (energia <= faixa.max) {
      const progress = (energia - energiaMin) / (faixa.max - energiaMin);
      const notaRange = faixa.notaMax - notaMin;
      return notaMin + progress * notaRange;
    }

    energiaMin = faixa.max;
    notaMin = faixa.notaMax;
  }

  return 100;
}

/**
 * Retorna a classificação baseada na nota
 * @param nota - Nota de 0 a 100
 * @returns Classificação correspondente
 */
export function obterClassificacao(nota: number): Classificacao {
  if (nota <= 30) return "Humano Comum";
  if (nota <= 55) return "Iniciante/Competente";
  if (nota <= 72) return "Experiente/Elite";
  if (nota <= 83) return "Mestre";
  if (nota <= 91) return "Grande Mestre";
  if (nota <= 96) return "Lendário";
  if (nota <= 99) return "Divino";
  return "Entidade Cósmica";
}

/**
 * Função completa que retorna nota e classificação
 * @param energia - Energia total do personagem
 * @returns Objeto com nota e classificação
 */
export function avaliarEnergia(energia: number): AvaliacaoEnergia {
  const nota = calcularNotaEnergia(energia);
  const classificacao = obterClassificacao(nota);

  return {
    energia: Number(energia),
    nota: parseFloat(nota.toFixed(0)),
    classificacao: classificacao,
  };
}

// Constantes exportadas
export const ENERGIA_MINIMA = 0;
export const ENERGIA_MAXIMA_COMUM = 1000;
export const ENERGIA_MAXIMA_INICIANTE = 10000;
export const ENERGIA_MAXIMA_EXPERIENTE = 50000;
export const ENERGIA_MAXIMA_MESTRE = 150000;
export const ENERGIA_MAXIMA_GRANDE_MESTRE = 500000;
export const ENERGIA_MAXIMA_LENDARIO = 1500000;
export const ENERGIA_MAXIMA_DIVINO = 2500000; // ← AJUSTADO AQUI

// Helper para validação
export function isEnergiaValida(energia: number): boolean {
  return !isNaN(energia) && energia >= 0;
}
