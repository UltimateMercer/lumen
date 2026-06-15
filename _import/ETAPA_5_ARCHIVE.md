# ETAPA 5 — Archive: migração, correções e página de showcase

## Resumo

Migração completa do diretório `_import/` para a estrutura definitiva. Correção do erro 500 em `/archive/[slug]`. Criação da página `/archive` com showcase de componentes.

## O que foi feito

### 1. Migração de código `_import/` → estruturas finais

- `lib/archive/documents.ts` — tipos e constantes (movido de `_import/lib/documents.ts`)
- `lib/archive/registry.ts` — 30 imports MDX estáticos + `getDocument`, `getAllSlugs`, `getAllDocuments` (movido de `_import/lib/registry.ts`)
- `types/mdx.d.ts` — declaração global `declare module "*.mdx"` (movido de `_import/lib/types/`)
- `components/documents/templates/` — 26 templates (movidos de `_import/*-template/`)
- `components/documents/general-components/` — paper/, stamps/, signatures/, ui/, mdx/, evaluation/ (movidos de `_import/general-components/`)
- `components/documents/index.ts` — barrel com `TEMPLATES` registry
- `components/documents/general-components/signatures/DigitalSignature.tsx` — componente unificado (Etapa 3 + `_import/`)
- `content/archive/` — 30 arquivos MDX em codex/, classified-project/, examples/
- `_import/` — limpo: restam apenas 6 `.md` de histórico de sessão

### 2. Correção: 500 em `/archive/[slug]`

**Causa raiz:** `next-mdx-remote/dist/index.js` (v6.0.0) exporta o componente `MDXRemote` que usa `useState`, `useEffect`, `useMemo` mas **não possui diretiva `"use client"`**. No Next.js 16 com Turbopack, módulos importados por um Client Component sem `"use client"` são processados no contexto SSR, onde o dispatcher de hooks do React é `null`, causando:

```
TypeError: Cannot read properties of null (reading 'useState')
    at useState (react.development.js:1263)
    at MDXRemote (next-mdx-remote/dist/index.js:13)
```

**Solução:** Substituir o import direto por `next/dynamic` com `ssr: false` em `components/documents/general-components/mdx/RenderMdx.tsx`:

```tsx
const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false },
);
```

**Resultado:** Todos os slugs testados retornam 200 OK sem erros.

### 3. Página `/archive` com showcase

Reescrita completa de `app/archive/page.tsx` com 3 abas (shadcn/ui `Tabs`):

- **Documentos** — listagem dos 30 documentos agrupados por Códex, Projetos Classificados e Exemplos
- **Componentes — Material Existente** — 15 componentes legados (Paper, stamps, signatures, UI) via helpers Group/Item
- **Componentes — Material Novo** — 30+ componentes MDX e gerais em 8 grupos (A–H) com TOC navegável

### 4. Arquivos modificados/criados

| Arquivo | Ação |
|---------|------|
| `lib/archive/documents.ts` | criado |
| `lib/archive/registry.ts` | criado |
| `types/mdx.d.ts` | criado |
| `components/documents/index.ts` | criado |
| `components/documents/templates/*.tsx` | 26 criados |
| `components/documents/general-components/**/*.tsx` | ~40 copiados |
| `app/archive/page.tsx` | reescrito |
| `app/archive/[slug]/page.tsx` | atualizado imports |
| `components/documents/general-components/mdx/RenderMdx.tsx` | corrigido (dynamic import) |
| `AGENTS.md` | atualizado |
| `_import/` | limpo (só `.md` históricos) |

### 5. Pendências futuras

- [ ] **`_import/styles.css`** — integração ao `app/globals.css` (classes temáticas `paper-texture`, `stamp-ink-red`, `crt-glow`, etc.)
- [ ] **`next-mdx-remote`** — ao atualizar o pacote, verificar se a diretiva `"use client"` foi adicionada upstream (a partir da v7+), o que tornaria o `next/dynamic` desnecessário.
- [ ] **Build completo** — falha por erros preexistentes em `app/educations/`, `app/experiences/`, `app/projects/` (módulos não encontrados: `@/lib/educations`, `@/lib/source`, `slugify`, etc.)
