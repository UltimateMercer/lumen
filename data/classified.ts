import type { Entity } from "@/utils/government-data";

export const classified = [
  {
    slug: "red-suns",
    name: "Projeto Red Suns",
    status: "ATIVO",
    id: "CLASS-001",
    department: "DIVISÃO CLASSIFICADA",
    documents: [
      { id: "batch", name: "Dossiê Completo", mdxSlug: "red-suns-batch" },
    ],
    documentGroups: [
      {
        groupId: "documentos",
        groupName: "Documentos",
        documents: [
          { id: "overview", name: "Visão Geral", mdxSlug: "red-suns-overview" },
          { id: "training", name: "Estrutura de Treinamento", mdxSlug: "red-suns-training" },
          { id: "evaluation", name: "Sistema de Avaliação", mdxSlug: "red-suns-evaluation" },
          { id: "specialized", name: "Componentes Especializados", mdxSlug: "red-suns-specialized" },
          { id: "psychological", name: "Perfil Psicológico", mdxSlug: "red-suns-psychological" },
          { id: "score-guide", name: "Guias de Interpretação", mdxSlug: "red-suns-score-guide" },
          { id: "classification", name: "Sistema de Classificação", mdxSlug: "red-suns-classification" },
          { id: "annex-a", name: "Anexo A — Protocolos", mdxSlug: "red-suns-annex-a" },
          { id: "annex-b", name: "Anexo B — Equipamento", mdxSlug: "red-suns-annex-b" },
          { id: "annex-c", name: "Anexo C — Glossário", mdxSlug: "red-suns-annex-c" },
          { id: "annex-d", name: "Anexo D — Template", mdxSlug: "red-suns-annex-d" },
        ],
      },
    ],
  },
  {
    slug: "arma-suprema",
    name: "Arma Suprema da República",
    status: "ATIVO",
    id: "CLASS-002",
    department: "DIVISÃO CLASSIFICADA",
    documents: [
      { id: "dossier", name: "Dossiê" },
    ],
  },
] satisfies Entity[];
