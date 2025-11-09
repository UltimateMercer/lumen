// white-eyes.ts - White Eyes Data

import { OcularPower } from "@/utils/ocular-powers";

export const whiteEyes: OcularPower = {
  id: "white-eyes",
  name: "White Eyes",
  classification: "Mutação Extremamente Rara",
  type: "mutation",
  geneticOrigin:
    "Mutação aleatória resultante da doação do Crimson/Scarlet Eyes (potencialmente mais forte)",
  visualDescription: {
    sclera: "Preto",
    irisBorder: "Branca",
    pupil: "Branca",
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
      name: "Esfera Branca",
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
      name: "Correntes de Restrição Branca",
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
      name: "Regeneração Branca",
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
      name: "Área de Opressão Branca",
      description:
        "Paralisa inimigos dentro de uma área usando poder dos olhos. Causa medo, terror, pânico em inimigos normais.",
      consumption: "Contínuo de energia enquanto mantém ativa",
    },
    {
      name: "Compressão da Singularidade Branca",
      description:
        "Concentra energia massiva (de qualquer tamanho) em um ponto/área compacto. Permite manipular e redirecionar energia que seria impossível de controlar normalmente. Possibilidade de cegueira ao comprimir energias muito grandes.",
      consumption: "Varia conforme tamanho da energia comprimida",
    },
    {
      name: "Raio Vindicativo Branco",
      description:
        "Dispara um raio de energia que persegue o alvo automaticamente. O raio segue a trajetória do alvo mesmo com desvios. Alvo pode tentar se desviar ou usar defesa.",
      consumption: "Moderado de energia",
    },
    {
      name: "Lacre Branco",
      description:
        "Ao tocar o alvo com energia específica, sela aquele tipo de energia. Alvo fica impossibilitado de usar aquele tipo de energia por 5+ minutos.",
      consumption: "Moderado de energia",
    },
    {
      name: "Impacto Silencioso Branco",
      description:
        "Libera uma poderosa e invisível onda de energia apenas com a força da vontade e do olhar. Poder significativamente maior que a versão Carmesim. Pode penetrar defesas energéticas. Não requer movimento de mãos. Onda de impacto invisível atinge o alvo.",
      consumption: "Varia conforme poder do impacto",
      additionalNotes: ["APRIMORADO: Poder superior ao Crimson/Scarlet Eyes"],
    },
    {
      name: "Perfuração Absoluta Branca",
      description:
        "Cria um raio perfurante que atravessa qualquer defesa. Foco em um único alvo com poder devastador. Capacidade de perfuração incomparável.",
      consumption: "Alto de energia",
    },
    {
      name: "Martelo Branco",
      description:
        "Concentra energia em formato de martelo/impacto pesado. Causa dano massivo por força bruta concentrada. Pode esmagar defesas e estruturas.",
      consumption: "Moderado a alto conforme intensidade",
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
      name: "Nulificação Branca",
      description:
        "Cria uma área onde todos os poderes são anulados temporariamente. Pode ser aplicada em área ampla OU em uma pessoa específica.",
      consumption: "Alto consumo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Esfera Branca Colossal",
      description:
        "Versão suprema da Esfera Branca. Cria um domo gigantesco que confina uma área imensa. Teleporta todos dentro para outra dimensão quando desaparece. Cegueira proporcional ao tamanho do domo + número de pessoas.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Correntes de Drenagem Colossal Branca",
      description:
        "Versão suprema das Correntes de Restrição Branca. Cria correntes gigantescas que prendem e drenam energia simultaneamente. Drena energia de todos os alvos confinados. Quanto maior o número de alvos e tempo, maior a cegueira.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Esfera de Drenagem Branca",
      description:
        "Versão alternativa suprema da Esfera Branca. Cria um domo gigantesco que drena energia de todos dentro. Não teleporta, apenas confina e drena.",
      consumption: "Consumo massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Supremacia de Opressão Branca",
      description:
        "Versão suprema da Área de Opressão Branca. Intensifica o poder paralisa/aterrorizante para níveis extremos. Afeta inimigos muito fortes.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Singularidade Absoluta Branca",
      description:
        "Versão suprema da Compressão da Singularidade Branca. Comprime energia em escala cósmica/infinita em um ponto minúsculo. Concentração tão extrema que pode criar efeitos destrutivos ao liberar. Alto risco de cegueira dependendo da quantidade de energia comprimida.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Lacre Absoluto Branco",
      description:
        "Versão suprema do Lacre Branco. Sela todos os três tipos de energia simultaneamente. Alvo fica completamente impossibilitado de usar qualquer tipo de energia. Requer concentração nos três tipos de energia. Duração: 5+ minutos.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Impacto Devastador Branco",
      description:
        "Versão suprema do Impacto Silencioso Branco. Libera ondas de choque massivas e invisíveis. Destrói tudo em um cone amplo à frente. Poder destrutivo absoluto.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
    {
      name: "Tempestade de Energia Branca",
      description:
        "Cria tempestade de projéteis energéticos que caem do céu. Saturação de ataques em área ampla. Devastação contínua por vários segundos. Um dos ataques mais destrutivos em área.",
      consumption: "Gasto massivo de energia",
      additionalNotes: ["Causa cegueira temporária no usuário"],
    },
  ],

  specialSupremeAbilities: [
    {
      name: "Manifestação do Avatar Branco",
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
      'Poder ocular não desativa, mas perde cor branca, ficando totalmente preto e "vazio"',
    additionalLimitations: [
      "Usuário extremamente habilidoso pode escolher sacrificar apenas um olho, mantendo o outro funcional",
      "Foco em destruição significa menos versatilidade utilitária",
    ],
  },

  donationCapability: {
    canDonate: false,
    description:
      "NENHUMA - Como mutação, não pode ser doada. Apenas poderes oculares base podem ser doados.",
  },
};
