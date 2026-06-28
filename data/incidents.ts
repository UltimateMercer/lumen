import type { Entity } from "@/utils/government-data";

export interface IncidentEntry {
  slug: string;
  mdxSlug: string;
  incident_code: string;
  title: string;
  classification: "PÚBLICO" | "CONFIDENCIAL" | "SECRETO" | "ULTRASSECRETO";
  status: string;
  date: string;
  issued_by: string;
  location: string;
}

export const INCIDENTS: IncidentEntry[] = [
  {
    slug: "bruma-iv",
    mdxSlug: "incidente-bruma-iv",
    incident_code: "IA/BRUMA-IV-019",
    title: "Incidente BRUMA-IV",
    classification: "ULTRASSECRETO",
    status: "contido · em monitoramento",
    date: "A.R. 2187.04.19",
    issued_by: "Divisão de Anomalias Atmosféricas",
    location: "Setor 9 · perímetro portuário antigo",
  },
  {
    slug: "tempestade-k7",
    mdxSlug: "incidente-tempestade-k7",
    incident_code: "FE/TEMP-K7-003",
    title: "Incidente TEMPESTADE-K7",
    classification: "SECRETO",
    status: "encerrado · sem resolução",
    date: "A.R. 2189.07.03",
    issued_by: "Divisão de Fenômenos Energéticos",
    location: "Distrito Industrial · Bloco 7",
  },
  {
    slug: "sombra-zero",
    mdxSlug: "incidente-sombra-zero",
    incident_code: "OE/SOMBRA-0-117",
    title: "Incidente SOMBRA-ZERO",
    classification: "ULTRASSECRETO",
    status: "ativo · sem resolução",
    date: "A.R. 2190.11.17",
    issued_by: "Divisão de Operações Especiais",
    location: "Setor 4 · zona de quarentena",
  },
  {
    slug: "aurora-i",
    mdxSlug: "incidente-aurora-i",
    incident_code: "MI/AURORA-I-028",
    title: "Incidente AURORA-I",
    classification: "ULTRASSECRETO",
    status: "em monitoramento",
    date: "A.R. 2191.02.28",
    issued_by: "Divisão de Monitoramento de Indivíduos",
    location: "Setor 2 · zona residencial norte",
  },
] satisfies IncidentEntry[];

export const STATUS_COLORS: Record<string, string> = {
  "contido · em monitoramento": "bg-[var(--c-public)]",
  "encerrado · sem resolução":  "text-muted-foreground",
  "ativo · sem resolução":      "bg-[var(--c-ultra)]",
  "em monitoramento":           "bg-[var(--c-confidential)]",
};

// Legacy export for IncidentsSection (dashboard)
export const incidents: Entity[] = [
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

export const CLASS_ACCENT: Record<string, { chip: string; border: string }> = {
  "PÚBLICO":       { chip: "bg-[var(--c-public)] text-white",       border: "border-l-[var(--c-public)]" },
  "CONFIDENCIAL":  { chip: "bg-[var(--c-confidential)] text-white", border: "border-l-[var(--c-confidential)]" },
  "SECRETO":       { chip: "bg-[var(--c-secret)] text-white",       border: "border-l-[var(--c-secret)]" },
  "ULTRASSECRETO": { chip: "bg-[var(--c-ultra)] text-white",        border: "border-l-[var(--c-ultra)]" },
};
