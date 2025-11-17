// orange-eyes.ts - Orange Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const orangeEyes: OcularPower = {
  id: "orange-eyes",
  name: "Orange Eyes",
  classification: "Raro",
  type: "base",
  geneticOrigin: "Manifestação esporádica - anomalia genética rara",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Laranja",
    pupil: "Laranja",
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
      name: "Detecção de Fluxo Energético",
      description: "Detecta e sente fluxo de energia ao redor",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Reserva Aprimorada",
      description: "Reserva de energia aprimorada (maior capacidade)",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Controle Refinado",
      description: "Controle de energia mais refinado e preciso",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Visão de Pontos Energéticos",
      description: "Visão de pontos e fluxos energéticos",
      consumption: "Passiva (sem custo)",
    },
  ],

  abilities: [
    {
      name: "Amplificação de Energia",
      description:
        "Amplifica energia própria ou de aliados. Aumenta poder de técnicas energéticas.",
      consumption: "Moderado de energia",
    },
    {
      name: "Circulação de Energia Aprimorada",
      description:
        "Circunda seu corpo com camada de energia defensiva. Protege contra ataques físicos e energéticos.",
      consumption: "Contínuo enquanto mantém ativa",
    },
    {
      name: "Transmissão de Energia",
      description:
        "Transfere energia própria para aliados ou objetos. Pode restaurar energia de outros ou ativar artefatos.",
      consumption: "Igual à quantidade transferida",
    },
    {
      name: "Bloqueio de Energia",
      description:
        "Bloqueia pontos energéticos de um inimigo. Impede uso temporário de técnicas que usam energia.",
      consumption: "Varia conforme número de pontos bloqueados",
    },
    {
      name: "Rastreamento Energético",
      description:
        "Marca um alvo com assinatura energética. Rastreia localização do alvo indefinidamente.",
      consumption: "Baixo inicial, moderado para manutenção",
    },
    {
      name: "Liberação de Energia Controlada",
      description:
        "Libera energia em forma de onda ou pulso direcionado. Controle preciso de intensidade e área.",
      consumption: "Varia conforme poder liberado",
    },
    {
      name: "Raio Vindicativo Laranja",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
  ],

  inheritedAbilities: [
    {
      name: "Distorção Dimensional",
      description:
        "Transporta objetos/pessoas para outra dimensão. Usuário pode ficar intangível. Uso defensivo primário, mas pode evoluir para ataque.",
      consumption: "Moderado de energia",
    },
    {
      name: "Lacre Laranja",
      description:
        "Ao tocar o alvo com energia específica (chakra/mana/amaldiçoada), sela aquele tipo de energia. Alvo fica impossibilitado de usar aquele tipo de energia por 5+ minutos.",
      consumption: "Moderado de energia",
    },
    {
      name: "Lâmina Dimensional",
      description:
        "Cria cortes de energia que atravessam dimensões. Pode ser projetada ou usada em corpo a corpo.",
      consumption: "Moderado",
    },
  ],

  supremeAbilities: [
    {
      name: "Explosão de Energia Absoluta",
      description:
        "Libera toda energia acumulada em explosão devastadora. Afeta área massiva com ondas de energia pura.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Barreira Dimensional Absoluta",
      description:
        "Versão suprema da Distorção Dimensional (herdada). Cria uma esfera gigantesca de energia dimensional. Tudo dentro é transportado para outra dimensão.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Lacre Absoluto Laranja",
      description:
        "Versão suprema do Lacre Laranja (herdada). Sela todos os três tipos de energia simultaneamente (chakra/mana/amaldiçoada). Alvo fica completamente impossibilitado de usar qualquer tipo de energia. Requer concentração nos três tipos de energia. Duração: 5+ minutos.",
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
      'Poder ocular não desativa, mas perde cor laranja, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "Transferência de energia drena recursos do usuário rapidamente",
    ],
  },

  donationCapability: {
    canDonate: true,
    description:
      "Pode doar seus poderes uma única vez na vida. O receptor sofre mutação aleatória. A mutação resultante será mais forte que o Orange Eyes. Geralmente escolha consciente do doador, exceto em caso de morte iminente.",
  },
};
