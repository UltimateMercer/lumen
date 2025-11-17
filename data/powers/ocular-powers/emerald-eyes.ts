// emerald-eyes.ts - Emerald Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const emeraldEyes: OcularPower = {
  id: "emerald-eyes",
  name: "Emerald Eyes",
  classification: "Raro",
  type: "base",
  geneticOrigin: "Manifestação esporádica - anomalia genética rara",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Verde Esmeralda",
    pupil: "Verde Esmeralda",
    spaceBetweenIrisAndPupil: "Preto",
  },
  activationCondition: "Desconhecida - surge esporadicamente",

  modifiers: {
    powerMultiplier: {
      min: 2,
      max: 25,
    },
    efficiencyBonus: {
      baseValue: 15,
      description: "Valor base de início",
    },
  },

  passiveAbilities: [
    {
      name: "Detecção de Energia",
      description: "Detecta e sente presença de energia ao redor",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Resistência a Drenagem",
      description: "Resistência aprimorada a efeitos de drenagem energética",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Visão de Estruturas Energéticas",
      description:
        "Visão aprimoada para enxergar estruturas energéticas invisíveis",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Compreensão de Fluxos",
      description: "Compreensão intuitiva de fluxos de energia",
      consumption: "Passiva (sem custo)",
    },
  ],

  abilities: [
    {
      name: "Amplificação Energética",
      description:
        "Amplifica energia própria ou de outros. Aumenta poder destrutivo de técnicas.",
      consumption: "Moderado de energia",
    },
    {
      name: "Transmissão Energética",
      description:
        "Transfere energia de um alvo para outro. Pode ser usada defensivamente ou ofensivamente.",
      consumption: "Varia conforme intensidade da transferência",
    },
    {
      name: "Barreira Energética",
      description:
        "Cria uma barreira de energia. Bloqueia ataques e repele inimigos.",
      consumption: "Contínuo enquanto mantém ativa",
    },
    {
      name: "Absorção de Energia",
      description:
        "Absorve energia do ambiente ou inimigos. Recupera stamina/energia ao usar.",
      consumption: "Baixo, mas risco aumenta com quantidade absorvida",
    },
    {
      name: "Rastreamento Energético",
      description:
        "Marca um alvo com energia. Rastreia localização do alvo indefinidamente.",
      consumption: "Baixo inicial, moderado para manutenção",
    },
    {
      name: "Controle de Energia",
      description:
        "Controla fluxos de energia próximos (próprios ou externos). Pode direcionar seus efeitos.",
      consumption: "Varia conforme complexidade do controle",
    },
    {
      name: "Raio Vindicativo Esmeralda",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
  ],

  inheritedAbilities: [
    {
      name: "Drenagem de Energia",
      description:
        "Absorve energia do alvo e a transfere para si. Recupera stamina/energia ao usar.",
      consumption: "Baixo, mas risco aumenta com quantidade drenada",
    },
    {
      name: "Correntes de Restrição Esmeralda",
      description:
        "Cria correntes/gaiolas de energia que prendem o alvo. Mantém confinado enquanto a técnica está ativa.",
      consumption: "Proporcional ao tempo de confinamento",
    },
    {
      name: "Área de Opressão Esmeralda",
      description:
        "Paralisa inimigos dentro de uma área usando poder dos olhos. Causa medo, terror, pânico em inimigos normais.",
      consumption: "Contínuo de energia enquanto mantém ativa",
    },
  ],

  supremeAbilities: [
    {
      name: "Explosão Energética Absoluta",
      description:
        "Libera toda energia acumulada em explosão devastadora. Afeta área massiva.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Correntes de Drenagem Colossal Esmeralda",
      description:
        "Versão suprema das Correntes de Restrição Esmeralda (herdada). Cria correntes gigantescas que prendem e drenam energia simultaneamente. Drena energia de todos os alvos confinados. Quanto maior o número de alvos e tempo, maior a cegueira.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Supremacia de Opressão Esmeralda",
      description:
        "Versão suprema da Área de Opressão Esmeralda (herdada). Intensifica o poder paralisa/aterrorizante para níveis extremos. Afeta inimigos muito fortes.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
  ],

  limitations: {
    supremeAbilitiesEffect:
      "Uso de habilidades ativas supremas causa cegueira temporária no usuário",
    recoveryTime: "20 minutos a 1 hora",
    energyCost: "Gasto massivo de energia quando ocorre cegueira",
    duringBlindness:
      'Poder ocular não desativa, mas perde cor verde esmeralda, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "Exposição prolongada a drenagem excessiva pode afetar a saúde do usuário",
    ],
  },

  donationCapability: {
    canDonate: true,
    description:
      "Pode doar seus poderes uma única vez na vida. O receptor sofre mutação aleatória. A mutação resultante será mais forte que o Emerald Eyes. Geralmente escolha consciente do doador, exceto em caso de morte iminente.",
  },
};
