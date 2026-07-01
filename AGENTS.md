# Regras para o agente — Projeto Lumen

## Limpeza pós-migração: remoção do prefixo `trial-` — executada
- `content/archive/trial/` deletado; 9 MDX movidos para `content/archive/{profile-id,school-final-evaluation,permit-card}/` com slugs flat (`profile-id-ultimate`, `sfe-ultimate`, `permit-card-ultimate` etc.)
- `components/documents/templates/trial/` deletado; `profile-id.tsx`, `school-final-evaluation.tsx`, `permit-card.tsx` substituídos pelo código dos trial (assinatura `{ doc }`, sem `{ individual }`)
- `DocumentType`: `"trial-school-final-evaluation"` etc. removidos; `"profile-id"`, `"school-final-evaluation"`, `"permit-card"` adicionados
- `DOCUMENT_TYPE_LABEL` atualizado com labels canônicos (sem "(TRIAL)")
- `components/individual-resolver.tsx`: `DATA_MAP` + 9 imports JSON removidos; único fluxo MDX
- `data/profile-id/`, `data/permissions/`, `data/school-final-evaluations/` deletados (sem outras referências)
- `app/archive/page.tsx`: aba "Trial MDX" removida
- `tsc --noEmit`: 13 erros (todos pre-existentes), zero novos
- Estado: todos os 39 MDX em pastas canônicas, 0 referências a `trial-`, 0 dados JSON redundantes

## Migração Kendra + Kira: JSON → MDX na Navegação Interna — executada
- 3 MDX criados: `trial-profile-id-kendra-connors.mdx`, `trial-sfe-kendra-connors.mdx`, `trial-sfe-kira.mdx` em `content/archive/trial/`
- `lib/archive/registry.ts`: 3 imports + 3 entries adicionados
- `data/individuals.ts`: `mdxSlug` adicionado nos 2 docs da Kendra e 1 doc da Kira; `layoutComponent: KiraLayout` adicionado em Kira (não tinha)
- `components/archives/individuals/kendra-connors-archive.tsx`: templates trocados para `TrialProfileId`, `TrialSchoolFinalEvaluation`
- `components/archives/individuals/kira-archive.tsx`: criado — layout minimal só com SFE via `TrialSchoolFinalEvaluation`
- `components/individual-resolver.tsx`: inalterado — fallback MDX cobre ambos via `mdxSlug`
- `tsc --noEmit`: 13 erros (todos pre-existentes), zero novos
- Estado: Ultimate ✓, Diana Watson ✓, Kendra Connors ✓, Kira ✓ — todos os 4 personagens migrados para MDX

## Migração Diana Watson: JSON → MDX na Navegação Interna — executada
- `utils/government-data.ts`: campo `mdxSlug?: string` adicionado à interface `Document`
- `data/individuals.ts`: `mdxSlug` adicionado nos 3 documentos do Ultimate
- `components/individual-resolver.tsx`: resolver agora tenta MDX primeiro (`getDocument(mdxSlug)`) com fallback para `DATA_MAP`. Se o documento atual do indivíduo tem `mdxSlug`, carrega frontmatter do registry e mapeia via cast `as unknown` para `ProfileIdData` / `SchoolFinalEvaluationData` / `PermissionsData`. O `layoutComponent` (`UltimateLayout`) continua sendo usado — só a origem dos dados muda. Diana, Kendra e Kira inalterados (DATA_MAP + `// TODO`)
- `tsc --noEmit`: 13 erros (todos pre-existentes), zero novos

## NRC no Profile ID do Ultimate — executada
- `content/archive/trial/trial-profile-id-ultimate.mdx`: campo `nrc: "??-1228-71938042"` adicionado ao frontmatter
- `components/documents/templates/trial/trial-profile-id.tsx`: `nrc` adicionado à interface `TrialProfileIdFrontmatter`, destructured, renderizado como `ItemValue` logo após "NOME COMPLETO"
- `app/archive/page.tsx`: filtro da aba Trial corrigido de `=== "trial-school-final-evaluation"` para `startsWith("trial-")`, capturando os 3 tipos trial
- `tsc --noEmit`: 13 erros (todos pre-existentes), zero novos

## Fase 6 — executada
- `DocumentType`: `"trial-profile-id"` e `"trial-permit-card"` adicionados
- `TrialProfileId` e `TrialPermitCard` templates criados em `components/documents/templates/trial/`
- `PermitCheckTable` reutilizado do template original
- 2 MDX de exemplo em `content/archive/trial/` (dados de Ultimate)
- Barrel e registry atualizados
- `tsc --noEmit`: zero erros novos

## Fase 5d — executada
- 26 arquivos single-word PascalCase renomeados para lowercase em 3 batches (paper/1, ui/5, mdx/20)
- Total de 52 imports atualizados
- `npx tsc --noEmit`: 13 erros, todos pre-existentes, zero novos
- `components/ui/` (shadcn) intencionalmente excluído — convenção própria

## Fase 5c — executada
- 62 arquivos PascalCase renomeados para kebab-case em 7 batches (ui/ paper/ stamps/ signatures/ mdx/ templates/ raiz)
- `components/documents/index.ts` barrel atualizado
- `npx tsc --noEmit`: 13 erros, todos pre-existentes (missing modules), zero erros novos

## Fase 5a — executada
- Auditoria de dependências: nenhuma dependência órfã encontrada em package.json (fumadocs-ui, slugify, framer-motion, motion/react não estão declarados, só importados como fantasma)
- Utilities `text-classification-{public,confidential,secret,ultra}` adicionadas em `app/globals.css` em `@layer utilities`, conectando as variáveis CSS `--c-*` já existentes
- 8 arquivos históricos deletados de `_import/` (mantido apenas `CHANGELOG.md`)
- `tsc --noEmit`: zero erros novos

## Fase 4 PoC — executada
- Novo `DocumentType` `"trial-school-final-evaluation"` em `lib/archive/documents.ts`
- `TrialSchoolFinalEvaluation` em `components/documents/templates/trial/` — template visualmente idêntico ao `SchoolFinalEvaluationDoc`, mas lê dados de `doc.frontmatter` em vez de `props.individual`
- Interface `TrialFrontmatter` estende `DocumentFrontmatter` com campos `SchoolFinalEvaluationData` — cast via `as unknown as TrialFrontmatter`
- MDX de exemplo em `content/archive/trial/trial-sfe-ultimate.mdx` — dados reais de Ultimate em frontmatter inline JSON (parser caseiro não suporta YAML aninhado multi-linha)
- Aba "Trial MDX" em `app/archive/page.tsx` — filtra por `type === "trial-school-final-evaluation"`
- Nenhum `*-archive.tsx` foi alterado; `IndividualResolver` não foi tocado
- `tsc --noEmit`: zero erros novos

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

## Profiles: rota dedicada app/government/profiles/ — executada
- `data/individuals.ts`: `ALL_PROFILE_SLUGS`, `findSiblingSlugs`, `getProfileSections` adicionados
- `app/government/profiles/layout.tsx`: AuthGuard + main wrapper
- `app/government/profiles/page.tsx`: grid de indivíduos com cards coloridos por classificação do documento primário
- `app/government/profiles/[slug]/layout.tsx`: ArchiveSidebar com `getProfileSections()`, label "PERFIS"
- `app/government/profiles/[slug]/page.tsx`: server component, `generateStaticParams`, `DocumentNavigator` link-based entre irmãos do mesmo indivíduo
- `components/government-dashboard.tsx`: mapeamento `profiles → individuos`, seção `"individuos"` e `IndividualsSection` removidos (rota dedicada assume)
- `tsc --noEmit`: 10 erros (todos preexistentes), zero novos

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
- `content/archive/` — 39 arquivos MDX (profile-id/, school-final-evaluation/, permit-card/, codex/, classified-project/, examples/)

## Archive routes
- `/archive` — listagem de documentos com shadcn/ui `Tabs` (3 abas: Documentos, Componentes Existentes, Componentes Novos; aba Trial removida pós-migração)
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
