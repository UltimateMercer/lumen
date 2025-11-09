// yellow-eyes.ts - Yellow Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const yellowEyes: OcularPower = {
  id: "yellow-eyes",
  name: "Yellow Eyes",
  classification: "Raro",
  type: "base",
  geneticOrigin: "Manifestação esporádica - anomalia genética rara",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Amarela",
    pupil: "Amarela",
    spaceBetweenIrisAndPupil: "Preto",
  },
  activationCondition:
    "Desconhecida - surge esporadicamente, possivelmente ligada a momentos de extremo perigo ou necessidade de reação rápida",

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
      name: "Detecção de Trajetórias",
      description: "Detecta trajetórias de movimento em tempo real",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Previsão de Ataques",
      description: "Previsão de ataques próximos",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Visão de Rastreamento",
      description: "Visão aprimorada ao rastrear movimento",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Percepção de Momentum",
      description: "Percepção de velocidade e momentum",
      consumption: "Passiva (sem custo)",
    },
  ],

  abilities: [
    {
      name: "Desvio Preciso",
      description:
        "Detecta trajetória de ataque e desvia com movimento mínimo. Funciona em tempo real contra múltiplos ataques.",
      consumption: "Baixo de energia",
    },
    {
      name: "Redirecionamento",
      description:
        "Altera a trajetória de ataques recebidos. Pode redirecionar para outras direções ou inimigos.",
      consumption: "Moderado de energia",
    },
    {
      name: "Rastreamento Amarelo",
      description:
        "Marca um alvo e rastreia sua trajetória/movimento. Permite prever próximas ações do alvo.",
      consumption: "Baixo, mas aumenta com distância",
    },
    {
      name: "Aceleração Pessoal",
      description:
        "Aumenta sua própria velocidade e reflexos. Efeito temporário.",
      consumption: "Moderado de energia",
    },
    {
      name: "Visão de Trajetória",
      description:
        "Enxerga o caminho que objetos/inimigos percorrerão. Mostra múltiplas trajetórias possíveis.",
      consumption: "Contínuo enquanto ativa",
    },
    {
      name: "Impulso Direcionado",
      description:
        "Libera energia em uma direção específica para impulsionar-se ou repelir ataques. Controle preciso de direção.",
      consumption: "Varia conforme intensidade",
    },
    {
      name: "Raio Vindicativo Amarelo",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
  ],

  inheritedAbilities: [
    {
      name: "Salto Temporal",
      description:
        'Salta/avança para o futuro próximo, se movimentando livremente enquanto o tempo fica parado para tudo ao redor. Pode atacar enquanto está "fora do tempo".',
      consumption: "Moderado de energia",
    },
    {
      name: "Troca Instantânea",
      description:
        "Troca de lugar instantaneamente com um alvo ou objeto. Pode ser usada defensivamente ou ofensivamente.",
      consumption: "Baixo de energia",
    },
    {
      name: "Impacto Silencioso Amarelo",
      description:
        "Libera uma poderosa e invisível onda de energia apenas com a força da vontade e do olhar. Não requer movimento de mãos. Onda de impacto invisível atinge o alvo.",
      consumption: "Varia conforme poder do impacto",
    },
  ],

  supremeAbilities: [
    {
      name: "Redirecionar Absoluto",
      description:
        "Versão suprema do Redirecionamento. Redireciona ataques em escala massiva (explosões, raios, etc). Pode redirecionar para múltiplos alvos simultaneamente.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Parada Temporal",
      description:
        "Versão suprema do Salto Temporal (herdada). Para o tempo em uma grande área ao invés de apenas ao redor de si. Efeito devastador, todos ficam congelados temporalmente.",
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
      'Poder ocular não desativa, mas perde cor amarela, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "O poder é reativo - funciona melhor contra ataques previstos",
    ],
  },

  donationCapability: {
    canDonate: true,
    description:
      "Pode doar seus poderes uma única vez na vida. O receptor sofre mutação aleatória. A mutação resultante será mais forte que o Yellow Eyes. Geralmente escolha consciente do doador, exceto em caso de morte iminente.",
  },
};
