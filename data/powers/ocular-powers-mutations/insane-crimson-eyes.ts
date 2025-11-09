// insane-crimson-eyes.ts - Insane Crimson/Scarlet Eyes Data

import { InsaneOcularPower } from "@/utils/ocular-powers";

export const insaneCrimsonEyes: InsaneOcularPower = {
  id: "insane-crimson-eyes",
  name: "Insane Crimson/Scarlet Eyes",
  classification: "Mutação Rara",
  type: "mutation",
  geneticOrigin:
    'Surge de trauma/desespero extremo - manifestação "quebrada" do Crimson/Scarlet Eyes (porém mais fraca)',
  visualDescription: {
    sclera: "Branca",
    irisBorder:
      "Vermelha com estrela de 4 pontas verde-limão ao redor da pupila",
    pupil: "Preta (como um olho normal)",
    spaceBetweenIrisAndPupil: "N/A",
  },
  activationCondition:
    'Trauma emocional extremo ou desespero profundo - é como se o Crimson/Scarlet Eyes fosse surgir, mas "quebrou" durante a manifestação',

  dualModifiers: {
    uncontrolledVersion: {
      powerMultiplier:
        "Escalona progressivamente sem limite (2x, 3x, 4x, 5x, 6x... e continua subindo indefinidamente)",
      efficiencyBonus: "0%",
      behavior: [
        "Usuário perde controle total da consciência",
        "Age de forma violenta, irracional e destrutiva (similar ao Broly)",
        "Ataca tudo ao redor sem distinção entre aliado e inimigo",
        "Poder aumenta continuamente conforme o tempo passa",
      ],
      triggers: [
        "Emoções extremas (raiva, desespero, medo intenso)",
        "Perda de controle emocional",
      ],
      duration: [
        "Até a energia do usuário se esgotar completamente",
        "Até alguém desmaiar o usuário à força",
        "Safety Rule: Único caso onde o esgotamento total de energia NÃO mata o usuário",
      ],
    },
    controlledVersion: {
      powerMultiplier: {
        min: 25,
        max: 50,
      },
      efficiencyBonus: 25,
      behavior: [
        "Usuário mantém consciência e controle pleno",
        "Pode usar habilidades estrategicamente",
        "Funciona como poder ocular normal",
      ],
      howToAchieve: [
        "Treino intenso e contínuo",
        "Adaptação progressiva ao poder",
        "Força de vontade extrema",
      ],
    },
  },

  passiveAbilities: [
    {
      name: "Percepção Aprimorada",
      description: "Percepção aprimorada de movimentos e fluxos de energia",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Detecção de Poderes Oculares",
      description: "Capacidade de detectar presença de outros poderes oculares",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Visão Aguçada",
      description: "Visão aguçada em condições normais",
      consumption: "Passiva (sem custo)",
    },
  ],

  abilities: [
    {
      name: "Regeneração Carmesim",
      description:
        "Regenera ferimentos usando energia própria. Pode regenerar membros inteiros.",
      consumption: "Alto de energia",
      additionalNotes: [
        "No Insanity Mode: Regeneração acontece automaticamente e de forma mais agressiva",
      ],
    },
    {
      name: "Raio Vindicativo Carmesim",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
      additionalNotes: [
        "No Insanity Mode: Dispara múltiplos raios sem controle",
      ],
    },
    {
      name: "Impacto Silencioso Carmesim",
      description:
        "Libera uma poderosa e invisível onda de energia apenas com a força da vontade e do olhar. Não requer movimento de mãos. Onda de impacto invisível atinge o alvo.",
      consumption: "Varia conforme poder do impacto",
      additionalNotes: [
        "No Insanity Mode: Libera impactos constantemente em todas as direções",
      ],
    },
  ],

  supremeAbilities: [],

  insanityCharacteristics: {
    unstableNature: [
      'Poder "defeituoso" que foi corrompido durante manifestação',
      "Oscila entre controle e descontrole",
      "Extremamente perigoso para o usuário e todos ao redor",
    ],
    insanityMode: [
      "Multiplicador escala infinitamente (sem teto)",
      "Usuário se torna uma força destrutiva pura",
      "Sem distinção entre aliado e inimigo",
      "Energia se esgota progressivamente até acabar",
      "Quando energia acaba, usuário desmaia mas não morre (Safety Rule única)",
    ],
    controlledVersion: [
      "Requer anos de treinamento para alcançar",
      "Mesmo controlado, o risco de perder controle sempre existe",
      "Emoções extremas podem disparar Insanity Mode a qualquer momento",
    ],
  },

  limitations: {
    uncontrolledVersion: [
      "Perda total de consciência e controle",
      "Ataca indiscriminadamente",
      "Consome energia até esgotamento total",
      "Deixa o usuário extremamente vulnerável após desmaiar",
      "Sem cegueira temporária (compensado pelo descontrole)",
    ],
    controlledVersion: [
      "Risco constante de perder controle",
      "Alto consumo de energia mesmo na versão controlada",
      "Necessidade de manter equilíbrio emocional constante",
      "Sem habilidades supremas disponíveis",
      "Sem cegueira temporária (compensado pelo descontrole)",
    ],
    general: [
      "Poder instável e imprevisível",
      "Trauma emocional é a raiz da manifestação",
      'Estigma social por ser uma versão "defeituosa"',
      "Dificuldade em confiar no próprio poder",
    ],
  },

  donationCapability: {
    canDonate: false,
    description:
      "NENHUMA - Como mutação, não pode ser doada. Apenas poderes oculares base podem ser doados.",
  },
};
