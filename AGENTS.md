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

## Changelog sync
- Rodar `pnpm sync-changelog` como parte do ritual de fim de sessão,
  junto com `tsc --noEmit`
- O script lê `_import/CHANGELOG.md`, extrai as 3 entradas mais recentes,
  e insere no `README.md` entre os marcadores `<!-- CHANGELOG:START -->`
  e `<!-- CHANGELOG:END -->`
- Os marcadores são adicionados automaticamente na primeira execução

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

## Calendar system — executada
- `lib/in-universe-rules/calendar.ts`: sistema completo — `LumenInstant`/`LumenDate`, validação, estações por hemisfério, formatação (3 estilos), parser tolerante (canônico `·` + legado `-`), cronologia via `toTimelineValue` (TV), `addDays`, `getAge`
- `lib/in-universe-rules/world-config.ts`: `CURRENT_DATE` (day 1, year 1228, N.E.C., S)
- `vitest.config.ts` criado; `vitest@4.1.9` adicionado como devDependency
- 65 testes unitários em `calendar.test.ts` — todos passando
- `tvToInstant` usa `Math.ceil((1 - tv) / 360)` para A.E.C. (corrige zero-day e boundary bugs de `Math.floor`)
- `addDays` cruza era boundary (360/1/AEC → 1/1/NEC) sem gap
- `tsc --noEmit`: 10 erros (todos pre-existentes), zero novos

## Fase 1 — executada
- Import fantasma removido de `diana-watson-archive.tsx`
- Kira registrada em `data/individuals.ts` com NRC `??-1229-90814563`
- `ID-2846` substituído por NRCs únicos em todos os 4 personagens
- `lib/in-universe-rules/` criada com `nrc.ts` + `README.md`
- `components/government-dashboard copy.tsx` deletado (sem referências no projeto)

## Orphan cleanup — executada (05-Jul-2026)
- `components/government/individuals-section.tsx` deletado (0 refs)
- `components/documents/general-components/ui/folder.tsx` deletado (substituído por DossierFolder)
- `data/document-generators.tsx`: dead `documentGenerators` fallback + 3 phantom imports removidos
- `generateEntityDocuments` e `document-navigator.tsx` (legado): mantidos (ainda têm consumidores ativos)

## `visibility` no schema — schema-only (05-Jul-2026)
- `visibility?: "public" | "classified" | "both"` adicionado a `DocumentFrontmatter` em `lib/archive/documents.ts`
- **Nenhum consumo/gating implementado ainda** — campo não é lido por template, AuthGuard, grid, ou qualquer outra lógica
- Quando for implementar, decidir explicitamente onde o fallback `?? "classified"` entra (AuthGuard? layout? grid?)

## `<AnomalyProfile>` no body do MDX — executada (05-Jul-2026)
- `components/documents/general-components/mdx/codex/anomaly-profile.tsx`: componente criado (4 StatChips, props tipadas via indexed access types)
- Registrado em `components/documents/general-components/mdx/mdx-components.tsx`
- 4/4 codex MDX migrados: anomalia (autonomy, contagion, host_required, containment_status) migrou do frontmatter para `<AnomalyProfile ... />` no body
- Campos de anomalia mantidos em `DocumentFrontmatter` (para tipagem das props do componente) — não remover sem atualizar o componente

## Calendar system conectado a conteúdo real — executada (05-Jul-2026)
- 4 templates migrados (profile-id, permit-card, personal-info-school-evaluation, final-evaluation-info): `NexusFormatDate` → `formatDate(parseLumenDate(...))`; `age` estático → `getAge(parseLumenDate(birthDate, ...), CURRENT_DATE)`
- `age` removido do frontmatter de 9 MDX (agora derivado sempre); Kira's `birthDate` corrigido de `"Vernis-1229-S"` para `"01-Vernis-1229-S"` (formato B → A, parseável)
- `hemisphere?: "N" | "S"` adicionado a `Entity` em `utils/government-data.ts`; `data/individuals.ts`: `hemisphere: "S"` nos 4 indivíduos
- `parseLumenDate` usado com `{ fallbackEra: "N.E.C.", fallbackHemisphere: "S" }` — cobre todos os formatos canônicos de personagem
- `NexusFormatDate` mantido (ainda importado por `digital-signature.tsx`, que ficou fora do escopo); showcases em `/archive` e `/demo` limpos
- `tsc --noEmit`: 10 erros preexistentes, zero novos

## Datas "A.R." — decisão fechada (não converter)
- 33 MDX em `content/archive/{codex,classified-project,examples}/` usam formato `"A.R. YYYY.MM.DD"` — resíduo de scaffolding do Lovable (prompt original cyberpunk genérico, sem relação com a lore Lumen)
- Decisão consciente: **NÃO converter** para A.E.C./N.E.C. Esses arquivos são não-canônicos — conteúdo de prototipagem que nunca deveria ter virado conteúdo real. Dar peso de lore a eles (convertendo as datas) seria pior do que mantê-los como estão
- Mantidos como estão por enquanto. Sem conversão, sem deleção, sem flag especial nesta fase

## Rotas de conteúdo público — mapeamento de propósito
- **`/archive/*`**: ferramenta de desenvolvimento para visualizar templates de documentos. NÃO é a interface pública real. Intencionalmente SEM gating de visibility — não é destinado a usuário final, é referência visual interna.
- **`/public/[section]`**: interface pública REAL, destinada a cidadãos logados (AuthGuard `requireAuth` já bloqueia acesso anônimo — não existe "visitante anônimo", todo acesso exige login). Hoje ainda renderiza conteúdo fake/hardcoded via `PublicDashboard` — rebuild pendente para puxar MDX real filtrado por `visibility`.
- `app/public-dashboard/` deletado (06-Jul-2026): diretório vazio, dead code, zero referências.
