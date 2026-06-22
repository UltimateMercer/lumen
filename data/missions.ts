import type { Entity } from "@/utils/government-data";

export const missions = [
  {
    slug: "operacao-tempestade",
    name: "Operação Tempestade",
    status: "CONCLUÍDA",
    id: "M-2024-047",
    department: "DIVISÃO DE OPERAÇÕES",
    documents: [
      { id: "briefing", name: "Briefing" },
      { id: "field-report", name: "Relatório de Campo" },
      { id: "debrief", name: "Debrief" },
    ],
  },
  {
    slug: "resgate-setor-7",
    name: "Resgate Setor 7",
    status: "EM ANDAMENTO",
    id: "M-2024-048",
    department: "DIVISÃO DE OPERAÇÕES",
    documents: [
      { id: "briefing", name: "Briefing" },
      { id: "field-report", name: "Relatório de Campo" },
    ],
  },
  {
    slug: "infiltracao-delta",
    name: "Infiltração Delta",
    status: "CONCLUÍDA",
    id: "M-2024-049",
    department: "DIVISÃO DE OPERAÇÕES",
    documents: [
      { id: "briefing", name: "Briefing" },
      { id: "field-report", name: "Relatório de Campo" },
      { id: "debrief", name: "Debrief" },
    ],
  },
  {
    slug: "reconhecimento-norte",
    name: "Reconhecimento Norte",
    status: "PLANEJAMENTO",
    id: "M-2024-050",
    department: "DIVISÃO DE OPERAÇÕES",
    documents: [
      { id: "briefing", name: "Briefing" },
    ],
  },
] satisfies Entity[];
