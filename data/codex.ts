export interface CodexDocument {
  id: string;
  name: string;
  mdxSlug: string;
}

export interface CodexItem {
  id: string;
  name: string;
  description?: string;
  documents: CodexDocument[];
}

export interface CodexCategory {
  id: string;
  name: string;
  description?: string;
  items: CodexItem[];
}

export const CODEX_CATEGORIES: CodexCategory[] = [
  {
    id: "transformacoes",
    name: "Transformações",
    items: [
      {
        id: "ascendente",
        name: "Ascendente",
        description: "Linhagem de formas combativas e celestiais documentadas.",
        documents: [
          {
            id: "asc-01",
            name: "ASC-01 · Ascendente",
            mdxSlug: "codex-asc-01-ascendente",
          },
          {
            id: "asc-02",
            name: "ASC-02 · Ascendente Carmesim Celestial Divino",
            mdxSlug: "codex-asc-02-carmesim-celestial-divino",
          },
          {
            id: "asc-03",
            name: "ASC-03 · Ascendente Azul Celestial Supremo",
            mdxSlug: "codex-asc-03-azul-celestial-supremo",
          },
        ],
      },
    ],
  },
  {
    id: "anomalias",
    name: "Anomalias",
    items: [
      {
        id: "fic-01",
        name: "Fantasma da Insanidade Carmesim",
        description: "Constructo psíquico-parasitário irreproduzível.",
        documents: [
          {
            id: "fic-01-doc",
            name: "FIC-01 · Fantasma da Insanidade Carmesim",
            mdxSlug: "codex-fic-01-fantasma-carmesim",
          },
        ],
      },
    ],
  },
];
