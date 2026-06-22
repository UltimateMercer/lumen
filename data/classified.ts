import type { Entity } from "@/utils/government-data";

export const classified = [
  {
    slug: "red-suns",
    name: "Projeto Red Suns",
    status: "ATIVO",
    id: "CLASS-001",
    department: "DIVISÃO CLASSIFICADA",
    documents: [
      { id: "overview", name: "Visão Geral" },
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
