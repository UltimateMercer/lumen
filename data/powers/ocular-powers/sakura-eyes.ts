// sakura-eyes.ts - Sakura Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const sakuraEyes: OcularPower = {
  id: "sakura-eyes",
  name: "Sakura Eyes",
  classification: "Raro",
  type: "base",
  geneticOrigin: "Manifestação esporádica - anomalia genética rara",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Rosa Sakura",
    pupil: "Rosa Sakura",
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
      name: "Detecção de Presença Energética",
      description: "Detecta presença de energia no ambiente",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Regeneração de Energia Aprimorada",
      description: "Regeneração de energia aprimorada (recupera mais rápido)",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Sensibilidade a Manipulações",
      description: "Sensibilidade a manipulações energéticas",
      consumption: "Passiva (sem custo)",
    },
    {
      name: "Visão de Estruturas Energéticas",
      description: "Visão de estruturas energéticas e fluxos",
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
      name: "Absorção Energética",
      description:
        "Absorve energia do ambiente ou de ataques. Recupera stamina/energia ao usar.",
      consumption: "Baixo, mas risco aumenta com quantidade absorvida",
    },
    {
      name: "Barreira Energética",
      description:
        "Cria uma barreira de energia pura. Protege contra ataques físicos e energéticos.",
      consumption: "Contínuo enquanto mantém ativa",
    },
    {
      name: "Dissipação de Energia",
      description:
        "Cancela ou enfraquece ataques energéticos. Pode dissipar efeitos energéticos persistentes.",
      consumption: "Varia conforme poder do ataque",
    },
    {
      name: "Rastreamento Energético",
      description:
        "Marca um alvo com assinatura energética. Rastreia localização do alvo indefinidamente.",
      consumption: "Baixo inicial, moderado para manutenção",
    },
    {
      name: "Canalização de Energia",
      description:
        "Canaliza energia do ambiente para amplificar próximas técnicas. Quanto mais tempo canalizando, mais poder acumula.",
      consumption: "Varia conforme tempo de canalização",
    },
    {
      name: "Raio Vindicativo Sakura",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
  ],

  inheritedAbilities: [
    {
      name: "Ilusão Infinita",
      description:
        "Cria ilusões perfeitas enquanto bombarda os sentidos com informações infinitas simultaneamente. Alvo fica incapaz de diferenciar o que é real do que é ilusório. Manipulação completa da percepção e confusão mental.",
      consumption: "Contínuo de energia enquanto mantém ativa",
    },
    {
      name: "Regeneração Sakura",
      description:
        "Regenera ferimentos usando energia própria. Pode regenerar membros inteiros.",
      consumption: "Alto de energia",
    },
    {
      name: "Conexão de Consciência Sakura",
      description:
        "Ao olhar nos olhos de um alvo imobilizado, acessa sua mente e alma. Permite ler pensamentos, memórias e essência espiritual.",
      consumption:
        "Alto gasto de energia. Varia conforme profundidade do acesso",
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
      name: "Anulação Energética Suprema",
      description:
        "Versão suprema da Dissipação de Energia. Anula completamente todas as manipulações energéticas em uma área. Ataques e efeitos energéticos são completamente desfeitos. Efeito persiste enquanto a habilidade estiver ativa.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Bombardeio Infinito",
      description:
        "Versão suprema da Ilusão Infinita (herdada). Intensifica ao máximo o bombardeio sensorial. Alvo fica completamente incapacitado mentalmente.",
      consumption: "Gasto massivo de energia",
      additionalNotes: [
        "Causa cegueira temporária no usuário (dependendo da intensidade)",
      ],
    },
  ],

  limitations: {
    supremeAbilitiesEffect:
      "Uso de habilidades ativas supremas causa cegueira temporária no usuário",
    recoveryTime: "20 minutos a 1 hora",
    energyCost: "Gasto massivo de energia quando ocorre cegueira",
    duringBlindness:
      'Poder ocular não desativa, mas perde cor rosa sakura, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "Dependência do ambiente com energia - em lugares energeticamente vazios, o poder é reduzido",
      "Absorção de energia muito intensa pode causar instabilidade",
    ],
  },

  donationCapability: {
    canDonate: true,
    description:
      "Pode doar seus poderes uma única vez na vida. O receptor sofre mutação aleatória. A mutação resultante será mais forte que o Sakura Eyes. Geralmente escolha consciente do doador, exceto em caso de morte iminente.",
  },
};
