import type { Entity } from "@/utils/government-data";

export const incidents = [
  {
    slug: "inc-2024-089",
    name: "Violação de Segurança",
    status: "CRÍTICO",
    id: "INC-2024-089",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
      { id: "forensic-analysis", name: "Análise Forense" },
      { id: "conclusion", name: "Conclusão" },
    ],
  },
  {
    slug: "inc-2024-090",
    name: "Anomalia Detectada",
    status: "ALTO",
    id: "INC-2024-090",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
      { id: "forensic-analysis", name: "Análise Forense" },
    ],
  },
  {
    slug: "inc-2024-091",
    name: "Falha de Sistema",
    status: "MÉDIO",
    id: "INC-2024-091",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
    ],
  },
  {
    slug: "inc-2024-092",
    name: "Acesso Não Autorizado",
    status: "ALTO",
    id: "INC-2024-092",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
      { id: "forensic-analysis", name: "Análise Forense" },
    ],
  },
] satisfies Entity[];
