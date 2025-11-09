// crimson-eyes.ts - Crimson/Scarlet Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const crimsonEyes: OcularPower = {
  id: "crimson-eyes",
  name: "Crimson/Scarlet Eyes",
  classification: "Extremamente Raro",
  type: "base",
  geneticOrigin:
    "Manifestação esporádica - anomalia genética praticamente única (3-4 portadores conhecidos na história, 1 no presente)",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Vermelha",
    pupil: "Vermelha/Crimson/Scarlet",
    spaceBetweenIrisAndPupil: "Preto",
  },
  activationCondition:
    "Desconhecida - surge esporadicamente, possivelmente ligada a trauma emocional extremo ou potencial genético latente",

  modifiers: {
    powerMultiplier: {
      min: 5,
      max: 50,
    },
    efficiencyBonus: {
      baseValue: 30,
      description: "Valor base de início",
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
    {
      name: "Análise Absoluta",
      description:
        "Copia/analisa qualquer habilidade, detecta ameaças e inimigos, mapeia pontos fracos",
      consumption: "Passiva (sem custo)",
    },
  ],

  abilities: [
    {
      name: "Distorção Dimensional",
      description:
        "Transporta objetos/pessoas para outra dimensão. Usuário pode ficar intangível. Uso defensivo primário, mas pode evoluir para ataque.",
      consumption: "Moderado de energia",
    },
    {
      name: "Salto Temporal",
      description:
        'Salta/avança para o futuro próximo, se movimentando livremente enquanto o tempo fica parado para tudo ao redor. Pode atacar enquanto está "fora do tempo".',
      consumption: "Moderado de energia",
    },
    {
      name: "Domínio de Energia",
      description:
        "Controle absurdo sobre sua própria energia. Pode manipular energia de outras pessoas conforme situação. Nível quase ilimitado de refinamento.",
      consumption: "Varia conforme uso",
    },
    {
      name: "Ilusão Infinita",
      description:
        "Cria ilusões perfeitas enquanto bombarda os sentidos com informações infinitas simultaneamente. Alvo fica incapaz de diferenciar o que é real do que é ilusório. Manipulação completa da percepção e confusão mental.",
      consumption: "Contínuo de energia enquanto mantém ativa",
    },
    {
      name: "Esfera Carmesim",
      description:
        "Cria um domo de energia que confina tudo dentro. Quando o domo desaparece, teleporta todos dentro para outra área.",
      consumption: "Proporcional ao tamanho do domo",
    },
    {
      name: "Lâmina Dimensional",
      description:
        "Cria cortes de energia que atravessam dimensões. Pode ser projetada ou usada em corpo a corpo.",
      consumption: "Moderado",
    },
    {
      name: "Correntes de Restrição Carmesim",
      description:
        "Cria correntes/gaiolas de energia que prendem o alvo. Mantém confinado enquanto a técnica está ativa.",
      consumption: "Proporcional ao tempo de confinamento",
    },
    {
      name: "Drenagem de Energia",
      description:
        "Absorve energia do alvo e a transfere para si. Recupera stamina/energia ao usar.",
      consumption: "Baixo, mas risco aumenta com quantidade drenada",
    },
    {
      name: "Regeneração Carmesim",
      description:
        "Regenera ferimentos usando energia própria. Pode regenerar membros inteiros.",
      consumption: "Alto de energia",
    },
    {
      name: "Troca Instantânea",
      description:
        "Troca de lugar instantaneamente com um alvo ou objeto. Pode ser usada defensivamente ou ofensivamente.",
      consumption: "Baixo de energia",
    },
    {
      name: "Área de Opressão Carmesim",
      description:
        "Paralisa inimigos dentro de uma área usando poder dos olhos. Causa medo, terror, pânico em inimigos normais.",
      consumption: "Contínuo de energia enquanto mantém ativa",
    },
    {
      name: "Compressão da Singularidade Carmesim",
      description:
        "Concentra energia massiva (de qualquer tamanho) em um ponto/área compacto (tamanho de bola de boliche, por exemplo). Permite manipular e redirecionar energia que seria impossível de controlar normalmente. Possibilidade de cegueira ao comprimir energias muito grandes.",
      consumption: "Varia conforme tamanho da energia comprimida",
    },
    {
      name: "Raio Vindicativo Carmesim",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
    {
      name: "Lacre Carmesim",
      description:
        "Ao tocar o alvo com energia específica (chakra/mana/amaldiçoada), sela aquele tipo de energia. Alvo fica impossibilitado de usar aquele tipo de energia por 5+ minutos.",
      consumption: "Moderado de energia",
    },
    {
      name: "Conexão de Consciência Carmesim",
      description:
        "Ao olhar nos olhos de um alvo imobilizado, acessa sua mente e alma. Permite ler pensamentos, memórias e essência espiritual.",
      consumption:
        "Alto gasto de energia. Varia conforme profundidade do acesso",
    },
    {
      name: "Impacto Silencioso Carmesim",
      description:
        "Libera uma poderosa e invisível onda de energia apenas com a força da vontade e do olhar. Não requer movimento de mãos. Onda de impacto invisível atinge o alvo.",
      consumption: "Varia conforme poder do impacto",
    },
  ],

  supremeAbilities: [
    {
      name: "Parada Temporal",
      description:
        "Versão suprema do Salto Temporal. Para o tempo em uma grande área ao invés de apenas ao redor de si. Efeito devastador, todos ficam congelados temporalmente.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Barreira Dimensional Absoluta",
      description:
        "Versão suprema da Distorção Dimensional. Cria uma esfera gigantesca de energia dimensional. Tudo dentro é transportado para outra dimensão.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Bombardeio Infinito",
      description:
        "Versão suprema da Ilusão Infinita. Intensifica ao máximo o bombardeio sensorial. Alvo fica completamente incapacitado mentalmente.",
      consumption: "Gasto massivo de energia",
      additionalNotes: [
        "Causa cegueira temporária no usuário (dependendo da intensidade)",
      ],
    },
    {
      name: "Nulificação Carmesim",
      description:
        "Cria uma área onde todos os poderes são anulados temporariamente. Pode ser aplicada em área ampla OU em uma pessoa específica.",
      consumption: "Alto consumo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Esfera Carmesim Colossal",
      description:
        "Versão suprema da Esfera Carmesim. Cria um domo gigantesco que confina uma área imensa. Teleporta todos dentro para outra dimensão quando desaparece. Cegueira proporcional ao tamanho do domo + número de pessoas.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Correntes de Drenagem Colossal",
      description:
        "Versão suprema das Correntes de Restrição Carmesim. Cria correntes gigantescas que prendem e drenam energia simultaneamente. Drena energia de todos os alvos confinados. Quanto maior o número de alvos e tempo, maior a cegueira.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Esfera de Drenagem Carmesim",
      description:
        "Versão alternativa suprema da Esfera Carmesim. Cria um domo gigantesco que drena energia de todos dentro. Não teleporta, apenas confina e drena.",
      consumption: "Consumo massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Supremacia de Opressão Carmesim",
      description:
        "Versão suprema da Área de Opressão Carmesim. Intensifica o poder paralisa/aterrorizante para níveis extremos. Afeta inimigos muito fortes causando cegueira temporária no usuário.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Singularidade Absoluta Carmesim",
      description:
        "Versão suprema da Compressão da Singularidade Carmesim. Comprime energia em escala cósmica/infinita em um ponto minúsculo. Concentração tão extrema que pode criar efeitos destrutivos ao liberar. Alto risco de cegueira dependendo da quantidade de energia comprimida.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Lacre Absoluto Carmesim",
      description:
        "Versão suprema do Lacre Carmesim. Sela todos os três tipos de energia simultaneamente (chakra/mana/amaldiçoada). Alvo fica completamente impossibilitado de usar qualquer tipo de energia. Requer concentração nos três tipos de energia. Duração: 5+ minutos.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
  ],

  specialSupremeAbilities: [
    {
      name: "Manifestação do Avatar Carmesim",
      description:
        "Cria um gigantesco avatar de energia (forma animal ou desejada pelo usuário). Avatar pode ser usado em combate direto.",
      consumption: "Gasto excessivo de energia",
      duration: "3-5 minutos",
      specialRequirement:
        "Usuário precisa dominar manipulação de energia cósmica",
      differential: "NÃO causa cegueira, apenas gasto energético extremo",
    },
  ],

  limitations: {
    supremeAbilitiesEffect:
      "Uso de habilidades ativas supremas causa cegueira temporária de um ou ambos os olhos no usuário",
    recoveryTime: "30 minutos a algumas horas",
    energyCost: "Gasto massivo de energia quando ocorre cegueira",
    duringBlindness:
      'Poder ocular não desativa, mas perde cores vermelhas, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "Usuário extremamente habilidoso pode escolher sacrificar apenas um olho, mantendo o outro funcional",
    ],
  },

  donationCapability: {
    canDonate: true,
    description:
      "Pode doar seus poderes uma única vez na vida. O receptor sofre mutação aleatória. A mutação resultante pode ser mais forte que o Crimson/Scarlet Eyes. Geralmente escolha consciente do doador, exceto em caso de morte iminente.",
    knownMutations: [
      "White Eyes",
      "Iridescent Eyes",
      "Insane Crimson/Scarlet Eyes",
    ],
  },
};
