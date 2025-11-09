// iridescent-eyes.ts - Iridescent Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const iridescentEyes: OcularPower = {
  id: "iridescent-eyes",
  name: "Iridescent Eyes",
  classification: "Mutação Extremamente Rara",
  type: "mutation",
  geneticOrigin:
    "Mutação aleatória resultante da doação do Crimson/Scarlet Eyes (potencialmente mais forte)",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Iridescente (múltiplas cores que mudam)",
    pupil: "Iridescente (múltiplas cores que mudam)",
    spaceBetweenIrisAndPupil: "Preto",
  },
  activationCondition:
    "Surge apenas através de doação do Crimson/Scarlet Eyes - mutação completamente aleatória",

  modifiers: {
    powerMultiplier: {
      min: 10,
      max: 70,
    },
    efficiencyBonus: {
      baseValue: 40,
      description: "Valor base de início, superior ao Crimson/Scarlet",
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
      name: "Esfera Iridescente",
      description:
        "Cria um domo de energia que confina tudo dentro. Quando o domo desaparece, teleporta todos dentro para outra área.",
      consumption: "Proporcional ao tamanho do domo",
    },
    {
      name: "Correntes de Restrição Iridescente",
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
      name: "Regeneração Iridescente",
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
      name: "Área de Opressão Iridescente",
      description:
        "Paralisa inimigos dentro de uma área usando poder dos olhos. Causa medo, terror, pânico em inimigos normais.",
      consumption: "Contínuo de energia enquanto mantém ativa",
    },
    {
      name: "Compressão da Singularidade Iridescente",
      description:
        "Concentra energia massiva em um ponto/área compacto. Pode comprimir não só energia, mas também matéria. Controle muito mais preciso que a versão Carmesim. Pode moldar a energia/matéria comprimida em formas específicas. Permite manipular e redirecionar o que seria impossível de controlar. Possibilidade de cegueira ao comprimir em escala muito grande.",
      consumption: "Varia conforme tamanho e complexidade",
      additionalNotes: [
        "APRIMORADO: Controle superior ao Crimson/Scarlet Eyes",
      ],
    },
    {
      name: "Raio Vindicativo Iridescente",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
    {
      name: "Lacre Iridescente",
      description:
        "Ao tocar o alvo com energia específica, sela aquele tipo de energia. Alvo fica impossibilitado de usar aquele tipo de energia por 5+ minutos.",
      consumption: "Moderado de energia",
    },
    {
      name: "Conexão de Consciência Iridescente",
      description:
        "Ao olhar nos olhos de um alvo imobilizado, acessa sua mente e alma. Permite ler pensamentos, memórias e essência espiritual.",
      consumption:
        "Alto gasto de energia. Varia conforme profundidade do acesso",
    },
    {
      name: "Impacto Silencioso Iridescente",
      description:
        "Libera uma poderosa e invisível onda de energia apenas com a força da vontade e do olhar. Não requer movimento de mãos. Onda de impacto invisível atinge o alvo.",
      consumption: "Varia conforme poder do impacto",
    },
    {
      name: "Prisão Dimensional Iridescente",
      description:
        "Prende o alvo em uma dimensão paralela temporariamente. Alvo fica completamente isolado e imóvel. Duração proporcional ao gasto de energia.",
      consumption: "Moderado a alto conforme duração",
    },
  ],

  supremeAbilities: [
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
        "Versão suprema da Ilusão Infinita. Intensifica ao máximo o bombardeio sensorial. Alvo fica completamente incapacitado mentalmente. Pode afetar múltiplos alvos simultaneamente.",
      consumption: "Gasto massivo de energia",
      additionalNotes: [
        "Causa cegueira temporária no usuário (dependendo da intensidade)",
      ],
    },
    {
      name: "Nulificação Iridescente",
      description:
        "Cria uma área onde todos os poderes são anulados temporariamente. Pode ser aplicada em área ampla OU em uma pessoa específica.",
      consumption: "Alto consumo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Esfera Iridescente Colossal",
      description:
        "Versão suprema da Esfera Iridescente. Cria um domo gigantesco que confina uma área imensa. Teleporta todos dentro para outra dimensão quando desaparece. Cegueira proporcional ao tamanho do domo + número de pessoas.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Correntes de Drenagem Colossal Iridescente",
      description:
        "Versão suprema das Correntes de Restrição Iridescente. Cria correntes gigantescas que prendem e drenam energia simultaneamente. Drena energia de todos os alvos confinados. Quanto maior o número de alvos e tempo, maior a cegueira.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Esfera de Drenagem Iridescente",
      description:
        "Versão alternativa suprema da Esfera Iridescente. Cria um domo gigantesco que drena energia de todos dentro. Não teleporta, apenas confina e drena.",
      consumption: "Consumo massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Supremacia de Opressão Iridescente",
      description:
        "Versão suprema da Área de Opressão Iridescente. Intensifica o poder paralisa/aterrorizante para níveis extremos. Afeta inimigos muito fortes.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Singularidade Absoluta Iridescente",
      description:
        "Versão suprema da Compressão da Singularidade Iridescente. Comprime energia E matéria em escala cósmica/infinita em um ponto minúsculo. Controle perfeito sobre a forma e aplicação. Concentração tão extrema que pode criar efeitos destrutivos ou reconstruir matéria ao liberar. Alto risco de cegueira dependendo da quantidade comprimida.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Lacre Absoluto Iridescente",
      description:
        "Versão suprema do Lacre Iridescente. Sela todos os três tipos de energia simultaneamente. Alvo fica completamente impossibilitado de usar qualquer tipo de energia. Requer concentração nos três tipos de energia. Duração: 5+ minutos.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Reescrita de Percepção",
      description:
        "Versão suprema de controle mental/sensorial. Reescreve completamente como o alvo percebe a realidade. Diferente de ilusão, afeta diretamente os sentidos em nível fundamental. Pode fazer o alvo perceber aliados como inimigos e vice-versa. Extremamente difícil de quebrar.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Anulação de Causalidade Iridescente",
      description:
        "Anula o efeito/causa de algo que aconteceu ou está acontecendo. Ex: Anula um ataque antes de acontecer, cancela uma habilidade ativada, desfaz um evento recente. Extremamente poderoso mas gasto massivo de energia. Limitado a eventos/ações recentes (segundos/minutos atrás). Uma das habilidades mais versáteis e estratégicas.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
  ],

  specialSupremeAbilities: [
    {
      name: "Manifestação do Avatar Iridescente",
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
      'Poder ocular não desativa, mas perde cores iridescentes, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "Usuário extremamente habilidoso pode escolher sacrificar apenas um olho, mantendo o outro funcional",
      "Foco em controle significa menos poder destrutivo direto",
    ],
  },

  donationCapability: {
    canDonate: false,
    description:
      "NENHUMA - Como mutação, não pode ser doada. Apenas poderes oculares base podem ser doados.",
  },
};
