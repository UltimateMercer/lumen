# Regras para o agente — Projeto Lumen

## Arquivos read-only
- `_import/*.md` (raiz) — histórico de sessão, não modificar
- `_import/` foi limpo: todo código migrado, restam apenas 6 `.md` de histórico

## Convenções
- `@/*` path alias mapeia para a raiz do projeto
- Templates em `components/documents/templates/` usam imports por `@/lib/archive/` e `../general-components/`
- MDX é carregado via `lib/archive/registry.ts` (build-time, webpack asset/source)
- MDX é serializado via `next-mdx-remote/serialize` nas rotas
- Renderização MDX usa `RenderMdx` de `components/documents/general-components/mdx/RenderMdx.tsx`
- Archive routes em `app/archive/`
- `types/mdx.d.ts` declara `declare module "*.mdx"` para type safety dos imports estáticos

## Build
- `npx tsc --noEmit` para type checking
- `bun run build` para build completo
- Pre-existing errors (missing modules): ignorar, não são causados por nossas mudanças

## CSS
- `_import/styles.css` (1022 linhas) foi integralmente migrado para `app/globals.css` (912 linhas)
- Classes como `paper-texture`, `stamp-ink-red`, `crt-glow`, `redacted`,
  `text-paper-foreground`, `text-classification-public` etc. estão em `app/globals.css` em `@layer utilities`

## NRC (Número de Registro Civil)
- `lib/in-universe-rules/nrc.ts` — geração e parse de NRCs no formato `XX-AAAA-NNNNNNNN`
- `lib/in-universe-rules/README.md` — documentação diegética do formato
- NRCs atribuídos em `data/individuals.ts` (4 personagens: Diana, Ultimate, Kendra, Kira)
- Nacionalidade desconhecida → `??` no lugar do código de nação

## Estrutura do projeto
- `components/documents/templates/` — 26 templates (23 archive + 3 fichas de personagem)
- `components/documents/general-components/` — componentes compartilhados (paper/, stamps/, signatures/, ui/, evaluation/, mdx/)
- `components/documents/index.ts` — barrel que exporta `TEMPLATES`
- `components/archives/individuals/` — layouts de personagem (roteamento de documentos por character)
- `lib/power-system/` — motor de cálculo energético
- `lib/archive/` — lib do archive (documents.ts com tipos + registry.ts com carregamento MDX)
- `lib/in-universe-rules/` — regras do universo (NRC)
- `content/archive/` — 30 arquivos MDX (codex/, classified-project/, examples/)

## Archive routes
- `/archive` — listagem de documentos com shadcn/ui `Tabs` (3 abas: Documentos, Componentes Existentes, Componentes Novos)
- `/archive/[slug]` — renderização individual com template + MDX
- `app/archive/[slug]/page.tsx` usa `generateStaticParams` (Next.js 16)
- `TEMPLATES` registry em `components/documents/index.ts`
- `app/archive/page.tsx` — showcase inline de ~45 componentes via Group/Item helpers locais

## Fase 3 — executada
- `slug` e `relatedDocuments` adicionados à interface `Individual` e aos 4 registros em `data/individuals.ts`
- `IndividualLayoutProps` criado em `types/character-data.ts` com `documentId`, `profileId?`, `schoolFinalEvaluation?`, `permissions?`
- `layoutComponent` em `Individual` agora recebe `IndividualLayoutProps` em vez de `{ individual, documentId }`
- 3 `*-archive.tsx` refatorados para receber dados via props (sem imports diretos de dados)
- `components/IndividualResolver.tsx` criado — orquestrador que resolve slug → dados → layout
- `data/document-generators.tsx` atualizado para compatibilidade com nova props interface

## Fase 2 — executada
- `types/character-data.ts` criado com 14 interfaces: `ProfileIdData`, `PermissionsData`, `SchoolFinalEvaluationData` +
  `ResponsibleSignature`, `MentorData`, `Affinities`, `EnergyComponentValues`, `PhysicalComponentValues`,
  `AdditionalTableValues`, `PersonalInfoData`, `FinalEvaluationData`
- 9 arquivos de dados anotados com `satisfies <Tipo>` (3 profile-id, 2 permissions, 4 school-final-evaluations)
- Index signature `[key: string]: any` removida de `utils/government-data.ts`

## Fase 1 — executada
- Import fantasma removido de `diana-watson-archive.tsx`
- Kira registrada em `data/individuals.ts` com NRC `??-1229-90814563`
- `ID-2846` substituído por NRCs únicos em todos os 4 personagens
- `lib/in-universe-rules/` criada com `nrc.ts` + `README.md`
- `components/government-dashboard copy.tsx` deletado (sem referências no projeto)
