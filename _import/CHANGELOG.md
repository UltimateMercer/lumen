# DossierFolder integration
**Data:** 02-Jul-2026

### Phase 1 — Port
- `components/documents/general-components/ui/dossier-folder.tsx`: criado a partir de `_import/Dossier.standalone.tsx`
  - Imports corrigidos para `motion/react`
  - `cn()` substituído pelo `@/lib/utils`
  - Sub-componentes mantidos: PaperTexture (3 variantes), HudOverlay, Barcode, AgencyCrest, ClassifiedStamp (rect + circle), CaseMetadata, InnerCover, DossierContent, EmptyPayload
  - 9 presets de animação mantidos (flip3d, slide, glitch, combo, scale-rise, peel, shred, iris, double-cover)
  - 4 layouts mantidos (default, crest-hero, minimal, field-report)
  - 3 surfaces mantidos (paper, glass, carbon)
  - `CLASSIFICATION_STAMP_MAP` adicionado: Lumen PT → Dossier EN
  - `DossierAspect` type estendido com "16:9" | "4:3"
- `app/globals.css`: 14 novas CSS vars em `:root` e `.dark` (dossier-radius, paper-edge, ink-red, neon-*, hud-grid, glass-*, carbon-*, shadow-folder*)

### Phase 2 — Landscape aspect ratios
- `aspectToClass` mapping inclui `aspect-video` para 16:9 e `aspect-[4/3]` para 4:3
- Layouts responsivos adaptam-se naturalmente via flex + clamp()

### Phase 3 — Batch cover
- `batch-template.tsx`: `Folder` substituído por `DossierFolder`
- `AnimatePresence` gerencia entrada/saída da capa e do conteúdo
- `Folder.tsx` mantido (órfão)

# Cleanup: _investigation and _import naming docs
**Data:** 02-Jul-2026

### Deletados
- `_investigation/`: 9 arquivos .md de investigação (archive-sidebar-interface,
  classified-investigation, classified-layout-investigation,
  contrast-and-layout-investigation, contrast-deep-investigation,
  incidents-investigation, paper-border-investigation, paper-investigation,
  profiles-migration-plan, cleanup-inventory)
- `_import/`: 3 arquivos de investigação de naming (NAMING_INVESTIGATION.md,
  NAMING_INVESTIGATION_SINGLE.md, NAV_INVESTIGATION.md)
- Mantido: `_import/CHANGELOG.md`

# Profiles migration to dedicated route
**Data:** 01-Jul-2026

### `data/individuals.ts`
- `ALL_PROFILE_SLUGS` — flatten de todos `mdxSlug` dos `individuals.documents` (9 slugs)
- `findSiblingSlugs(slug)` — retorna `mdxSlug`s do indivíduo que contém `slug`
- `getProfileSections()` — monta `SidebarSection[]` para `ArchiveSidebar`, um por indivíduo
- `PRIMARY_CLASSIFICATION` — hardcoded para cor dos cards (ULTRA para Ultimate, CONFIDENCIAL para os demais)

### `app/government/profiles/layout.tsx` (novo)
- `AuthGuard` + `<main>` wrapper; sem sidebar (nível 1)

### `app/government/profiles/page.tsx` (novo)
- Grid de indivíduos com card por indivíduo, cor por classificação do doc primário
- Chip `CLASS` com `bg-[var(--c-{classification})]`
- Linka para o primeiro `mdxSlug` do indivíduo

### `app/government/profiles/[slug]/layout.tsx` (novo)
- `"use client"`, `ArchiveSidebar` com `getProfileSections()`, `label="PERFIS"`

### `app/government/profiles/[slug]/page.tsx` (novo)
- Server component: `generateStaticParams` via `ALL_PROFILE_SLUGS`
- `getDocument(slug)` + `serialize()` + `TEMPLATES[type]` (resolve `profile-id`, `school-final-evaluation`, `permit-card`)
- `DocumentNavigator` link-based com `findSiblingSlugs(slug)`

### `components/government-dashboard.tsx`
- Removido: `profiles: "individuos"` do `sectionMap`
- Removido: `{ id: "individuos", name: "INDIVÍDUOS DE DESTAQUE" }` do array `sections`
- Removido: `case "individuos":` do switch + `IndividualsSection` import
- `IndividualsSection`, `document-generators.tsx`, `document-navigator.tsx` (stateful) — intocados

# Async MDX serialization via API route for entity-resolver
**Data:** 22-Jun-2026

### `app/api/mdx/serialize/route.ts` (novo)
- POST endpoint que serializa MDX via `next-mdx-remote/serialize`
- Aceita `{ mdx }` para doc único ou `{ mdx, items: [{ slug, mdx }] }` para batch
- Retorna `{ mdxSource, itemSources?: Record<string, mdxSource> }`

### `lib/mdx-cache.ts` (novo)
- `getSerializedMdx(slug, mdx)` — cache em memória por slug, fetch POST
- `getSerializedBatch(slug, mdx, items)` — serializa batch + items em 1 request
- Cache evita serializar o mesmo doc múltiplas vezes

### `components/entity-resolver.tsx`
- Caminho B (fallback TEMPLATES): se `mdxDoc.mdxSource` existe → renderiza direto
- Se não → `AsyncTemplateRenderer` stateful com useEffect:
  - `useEffect` → `getSerializedMdx` ou `getSerializedBatch`
  - Loading state "CARREGANDO DOCUMENTO..."
  - Batch: constrói `batchItems` com `mdxSource` nos docs filhos
  - Cache: mesma slug não faz 2 requests
- Indivíduos (Caminho A) inalterados

---

# EntityResolver TEMPLATES fallback + ClassifiedSection document groups
**Data:** 22-Jun-2026

### `components/entity-resolver.tsx`
- Remove early `if (!entity.layoutComponent) return null`
- Caminho A: se entity tem layoutComponent → renderiza com `EntityLayoutProps` (indivíduos)
- Caminho B: fallback genérico via `TEMPLATES[mdxDoc.frontmatter.type]` (classified, missions, incidents)
- Sem layoutComponent → usa os templates de archive (`BatchTemplate`, `ClassifiedProjectTemplate`, `MemoTemplate`, etc.)

### `utils/government-data.ts`
- Nova interface `DocumentGroup { groupId, groupName, documents }`
- `Entity.documentGroups?: DocumentGroup[]` adicionado

### `data/document-generators.tsx`
- `generateEntityDocuments` combina `entity.documents` + `entity.documentGroups[*].documents` em flat array
- Condição mudada de `entity.layoutComponent && doc.mdxSlug` para `doc.mdxSlug` — deixando EntityResolver decidir
- Passa `combinedEntity` com docs flat para EntityResolver

### `data/classified.ts`
- "Projeto Red Suns": 1 doc direto (Dossiê Completo) + 1 documentGroup "Documentos" com 11 itens
- "Arma Suprema": inalterado

### `components/government/classified-section.tsx`
- `expandedGroups` state + `toggleGroup` para sub-accordion de grupos
- `handleEntityDocumentClick` aceita `Entity` diretamente (sem double lookup)
- Sidebar: botões diretos de `documents[]` + sub-accordion para `documentGroups[]`
- `renderContent`: usa `combinedDocs` para `initialIndex` (cobre docs em ambas as fontes)

---

# Red Suns: 12 documentos classificados conectados ao sistema
**Data:** 22-Jun-2026

### `lib/archive/registry.ts`
- 12 novos imports estáticos + RAW entries para todos os MDX Red Suns
- Slugs: `red-suns-{batch,overview,training,evaluation,specialized,psychological,score-guide,classification,annex-a,annex-b,annex-c,annex-d}`

### `data/classified.ts`
- "Projeto Red Suns" expandido de 1 para 12 documentos, todos com `mdxSlug`
- "Arma Suprema da República" mantido (1 doc sem mdxSlug → placeholder)

### `components/government/classified-section.tsx`
- Já estava no padrão Entity (accordion + DocumentNavigator + generateEntityDocuments)
- Nenhuma alteração necessária — dados fluem automaticamente

---

# Estruturação: Missions, Incidents, Classified sections com Entity pattern
**Data:** 22-Jun-2026

### `data/missions.ts` (novo)
- 4 missões como `Entity[]` — Operação Tempestade, Resgate Setor 7,
  Infiltração Delta, Reconhecimento Norte
- Cada uma com `slug`, `name`, `status`, `id`, `department`, `documents[]`

### `data/incidents.ts` (novo)
- 4 incidentes como `Entity[]` — Violação de Segurança, Anomalia Detectada,
  Falha de Sistema, Acesso Não Autorizado

### `data/classified.ts` (novo)
- 2 projetos como `Entity[]` — Projeto Red Suns, Arma Suprema da República

### `data/document-generators.tsx`
- `generateEntityDocuments` agora aceita entidades sem `layoutComponent`/`mdxSlug`
- Se doc não tem mdxSlug → renderiza placeholder "DOCUMENTO EM PROCESSAMENTO"
- Fallback por documento (não por entidade inteira)

### `components/government/missions-section.tsx`
- Substituído mock v0 por implementação real com Entity pattern
- Sidebar: accordion com status badge colorido (CONCLUÍDA/EM ANDAMENTO/PLANEJAMENTO)
- Content: DocumentNavigator + generateEntityDocuments
- Placeholder enquanto não há MDX

### `components/government/incidents-section.tsx`
- Substituído mock v0 por implementação real com Entity pattern
- Status badge: CRÍTICO (red), ALTO (orange), MÉDIO (yellow)

### `components/government/classified-section.tsx`
- Substituído mock v0 por implementação real com Entity pattern
- Status badge: ATIVO (green), INATIVO (gray), DESCLASSIFICADO (blue)

# Refatoração: IndividualResolver → EntityResolver
**Data:** 22-Jun-2026

### `types/character-data.ts`
- Adicionada `EntityLayoutProps { documentId, frontmatter }`
- `IndividualLayoutProps` agora é alias de `EntityLayoutProps`

### `utils/government-data.ts`
- Adicionada interface `Entity` (slug, name, status, id, documents, layoutComponent, department)
- `Individual extends Entity` — campos específicos mantidos, `slug` agora obrigatório
- `layoutComponent` em `Entity` usa `EntityLayoutProps`

### `components/entity-resolver.tsx` (novo)
- Props: `{ entity: Entity; documentId: string }`
- Sem import de data source — recebe entidade já resolvida
- Usa `getDocument(mdxSlug)` do registry, passa `frontmatter` direto ao layout

### `components/individual-resolver.tsx`
- Atualizado para usar `EntityLayoutProps` em vez de `IndividualLayoutProps` com cast condicional
- Passa `frontmatter` diretamente (sem `profileId`/`schoolFinalEvaluation`/`permissions`)

### `components/archives/individuals/*.tsx` (4 layouts)
- Assinatura migrada de `IndividualLayoutProps` para `EntityLayoutProps`
- Destrutura `{ documentId, frontmatter }` em vez de props nomeadas
- Cast `frontmatter as unknown as NeededType` direto

### `data/document-generators.tsx`
- Nova função `generateEntityDocuments(entity: Entity): DocumentContent[]`
- Usa `EntityResolver`, sem fallback hardcoded
- `generateIndividualDocuments` mantido por compatibilidade

### `components/government/individuals-section.tsx`
- Estado migrado: `selectedIndividual: string` → `selectedEntity: Individual | null`
- Usa `generateEntityDocuments(selectedEntity)` em vez da função legada

### `components/government-dashboard.tsx`
- Import de `PowersSection` adicionado (resolve TS2304 pré-existente)

# Limpeza pós-migração: remoção do prefixo `trial-`
**Data:** 21-Jun-2026

### `content/archive/`
- Pasta `trial/` deletada; 9 MDX movidos para `profile-id/`, `school-final-evaluation/`, `permit-card/`
- Slugs atualizados: `trial-profile-id-ultimate` → `profile-id-ultimate`, `trial-sfe-ultimate` → `sfe-ultimate`, etc.
- Types atualizados: `trial-profile-id` → `profile-id`, `trial-school-final-evaluation` → `school-final-evaluation`, `trial-permit-card` → `permit-card`
- Frontmatter limpo: labels "(TRIAL MDX)" removidos, references atualizadas

### `components/documents/templates/`
- Pasta `trial/` deletada
- `profile-id.tsx` substituído pelo código de `TrialProfileId` (export `ProfileId`, assinatura `{ doc }`)
- `school-final-evaluation.tsx` substituído pelo código de `TrialSchoolFinalEvaluation` (export `SchoolFinalEvaluationDoc`, assinatura `{ doc }`)
- `permit-card.tsx` substituído pelo código de `TrialPermitCard` (export `PermitCard`, assinatura `{ doc }`, `PermitCheckTable` incluso)

### `lib/archive/documents.ts`
- `DocumentType`: `"trial-school-final-evaluation"`, `"trial-profile-id"`, `"trial-permit-card"` removidos
- `"profile-id"`, `"school-final-evaluation"`, `"permit-card"` adicionados
- `DOCUMENT_TYPE_LABEL`: labels atualizados (sem "(TRIAL)")

### `components/documents/index.ts`
- Imports de `./templates/trial/` substituídos por `./templates/profile-id` etc.
- `TEMPLATES` map: trial- removidos, canônicos adicionados

### `components/individual-resolver.tsx`
- 9 imports JSON removidos
- `DATA_MAP` inteiro removido
- Fluxo simplificado: único caminho MDX, sem fallback JSON

### `data/`
- `profile-id/`, `permissions/`, `school-final-evaluations/` deletados (verificados sem outras referências)

### `app/archive/page.tsx`
- Aba "Trial MDX" removida

### `tsc --noEmit`
- 13 erros, todos pre-existentes, zero novos

---

# Migração Kendra Connors + Kira: JSON → MDX na Navegação Interna
**Data:** 20-Jun-2026

### `content/archive/trial/`
- 3 MDX criados: `trial-profile-id-kendra-connors.mdx`, `trial-sfe-kendra-connors.mdx`, `trial-sfe-kira.mdx`
- Kendra: profile-id com NRC `??-1228-53682917` + SFE com `isHighSecurity: true` e 2 signatures
- Kira: SFE com NRC `??-1229-90814563` e `energyControl: 1.5` (valor original dos dados)
- Tags: `"kendra-connors"` e `"kira"` respectivamente

### `lib/archive/registry.ts`
- 3 imports estáticos + 3 entries no `RAW` Map

### `data/individuals.ts`
- Kendra: `mdxSlug` adicionado nos 2 documentos (profile + SFE)
- Kira: `mdxSlug` adicionado no documento SFE
- Kira: `layoutComponent: KiraLayout` adicionado — antes não tinha, caía no `documentGenerators.default`

### `components/archives/individuals/kendra-connors-archive.tsx`
- Templates trocados: `ProfileId` → `TrialProfileId`, `SchoolFinalEvaluationDoc` → `TrialSchoolFinalEvaluation`
- Dados passam via `doc.frontmatter`

### `components/archives/individuals/kira-archive.tsx` (NOVO)
- Layout minimal (14 linhas) que só trata `documentId === "school-final-evaluation"` via `TrialSchoolFinalEvaluation`
- Necessário porque Kira não tinha `layoutComponent` antes

### `components/individual-resolver.tsx`
- Inalterado. Kendra e Kira agora cobertas pelo fallback MDX via `mdxSlug`

### Estado final da migração
- Ultimate ✓ — 3 documentos MDX + 3 templates trial
- Diana Watson ✓ — 3 documentos MDX + 3 templates trial
- Kendra Connors ✓ — 2 documentos MDX + 2 templates trial
- Kira ✓ — 1 documento MDX + 1 template trial
- Todos os 4 personagens migrados para MDX na navegação interna

# Migração Diana Watson: JSON → MDX na Navegação Interna
**Data:** 20-Jun-2026

### `content/archive/trial/`
- 3 MDX criados: `trial-profile-id-diana-watson.mdx`, `trial-sfe-diana-watson.mdx`, `trial-permit-card-diana-watson.mdx`
- Dados reais de Diana Watson (profile-id, school-final-evaluation, permissions) no frontmatter
- NRC `??-1230-28467351` incluso no profile-id
- Mentor populado no permit-card (5 campos, ao contrário do Ultimate que era `{}`)
- Tags: `["trial", "mdx", "diana-watson"]`

### `lib/archive/registry.ts`
- 3 imports estáticos + 3 entries no `RAW` Map

### `data/individuals.ts`
- Diana Watson: `mdxSlug` adicionado aos 3 documentos

### `components/archives/individuals/diana-watson-archive.tsx`
- Templates trocados: `ProfileId` → `TrialProfileId`, `SchoolFinalEvaluationDoc` → `TrialSchoolFinalEvaluation`, `PermitCard` → `TrialPermitCard`
- Dados passam via `doc.frontmatter` (pseudo `ArchiveDocument`)

### `components/individual-resolver.tsx`
- Inalterado. Diana agora coberta pelo fallback MDX via `mdxSlug`
- DATA_MAP mantido como fallback (com `// TODO`)

### Estado da migração
- Ultimate ✓ (3 MDX trial, 3 templates trial)
- Diana Watson ✓ (3 MDX trial, 3 templates trial)
- Kendra Connors pendente (DATA_MAP + `// TODO`)
- Kira pendente (DATA_MAP + `// TODO`)

# Migração Ultimate: JSON → MDX na Navegação Interna
**Data:** 20-Jun-2026

### `utils/government-data.ts`
- Interface `Document`: campo `mdxSlug?: string` adicionado

### `data/individuals.ts`
- Ultimate: `mdxSlug` adicionado aos 3 documentos (`trial-profile-id-ultimate`, `trial-sfe-ultimate`, `trial-permit-card-ultimate`)

### `components/individual-resolver.tsx`
- Fluxo alterado: antes de cair no `DATA_MAP`, verifica se o documento atual do indivíduo tem `mdxSlug`
- Se sim: `getDocument(mdxSlug)` → frontmatter → cast `as unknown` → `IndividualLayoutProps` → renderiza via `layoutComponent` (`UltimateLayout`)
- O cast preenche apenas a prop relevante baseada no `documentId`: `profileId`, `schoolFinalEvaluation`, ou `permissions`
- Se não: fallback para `DATA_MAP` (comportamento original)
- Diana, Kendra e Kira: entries mantidas ativas com `// TODO: migrar para MDX`

# NRC no Profile ID do Ultimate
**Data:** 20-Jun-2026

### `content/archive/trial/trial-profile-id-ultimate.mdx`
- Campo `nrc` adicionado ao frontmatter com valor `"??-1228-71938042"`

### `components/documents/templates/trial/trial-profile-id.tsx`
- `nrc` adicionado à interface `TrialProfileIdFrontmatter`
- `nrc` destructured do frontmatter
- Renderizado como `ItemValue` logo após "NOME COMPLETO" — posição escolhida por ser o identificador civil único, antes dos dados biográficos

### `app/archive/page.tsx`
- Filtro da aba Trial corrigido: `=== "trial-school-final-evaluation"` → `startsWith("trial-")`

# Fase 6 — Trial Templates ProfileId e PermitCard
**Data:** 18-Jun-2026 21:30 BRT

### `lib/archive/documents.ts`
- `DocumentType` estendido com `"trial-profile-id"` e `"trial-permit-card"`
- `DOCUMENT_TYPE_LABEL` com labels correspondentes

### `components/documents/templates/trial/trial-profile-id.tsx`
- Template pixel-perfect ao `profile-id.tsx` original
- Interface `TrialProfileIdFrontmatter extends DocumentFrontmatter` com `ProfileIdData`
- Cast `as unknown as TrialProfileIdFrontmatter`
- Consome dados de `doc.frontmatter` em vez de `props.individual`

### `components/documents/templates/trial/trial-permit-card.tsx`
- Template pixel-perfect ao `permit-card.tsx` original
- Interface `TrialPermitCardFrontmatter extends DocumentFrontmatter` com `PermissionsData`
- `PermitCheckTable` reimportado do template original (evita duplicação)
- Cast `as unknown as TrialPermitCardFrontmatter`

### `content/archive/trial/trial-{profile-id,permit-card}-ultimate.mdx`
- 2 MDX de exemplo com dados reais de Ultimate em frontmatter inline JSON
- Formato consistente com `trial-sfe-ultimate.mdx`

### `lib/archive/registry.ts`
- Imports e registros dos 2 novos MDX

### `components/documents/index.ts`
- Barrel atualizado com imports e entradas no `TEMPLATES`

### TypeScript
- `npx tsc --noEmit`: 13 erros, todos pre-existentes, **zero novos**

---

# Fase 5d — Renomeação single-word para lowercase
**Data:** 18-Jun-2026 21:00 BRT

**26 arquivos renomeados | 52 imports atualizados | 0 novos erros tsc**

### Batch 1: `paper/` (1 arquivo)
- `Paper.tsx` → `paper.tsx` (5 imports: page.tsx + 4 templates)

### Batch 2: `ui/` (5 arquivos)
- `Row.tsx` → `row.tsx`, `Meta.tsx` → `meta.tsx`, `Cell.tsx` → `cell.tsx`,
  `Folder.tsx` → `folder.tsx`, `Sigil.tsx` → `sigil.tsx`
- Apenas `Folder.tsx` tinha 1 import (batch-template.tsx); demais: zero imports

### Batch 3: `mdx/` + subdirs (20 arquivos)
**Raiz (12):** `Pullquote.tsx`, `Classified.tsx`, `Transmission.tsx`, `Field.tsx`,
`Translation.tsx`, `Stamp.tsx`, `Section.tsx`, `Signature.tsx`, `Article.tsx`,
`Evidence.tsx`, `Caption.tsx`, `Redacted.tsx`
**interrogation/ (2):** `Note.tsx`, `Exchange.tsx`
**codex/ (3):** `Phase.tsx`, `Warning.tsx`, `Trait.tsx`
**project/ (2):** `Safeguard.tsx`, `Objective.tsx`
**comms/ (1):** `Msg.tsx`
- 46 imports atualizados em 7 arquivos (page.tsx, mdx-components.tsx,
  asset-entry.tsx, 4 templates)

### Notas
- `components/ui/` (shadcn) excluído intencionalmente — convenção própria
- `npx tsc --noEmit`: 13 erros, todos pre-existentes, zero novos

---

# Fase 5c — Renomeação para kebab-case
**Data:** 18-Jun-2026 20:52 BRT

## Mudanças

### Batch 1: `ui/` (14 arquivos)
- `CrestSvg.tsx`, `FormField.tsx`, `IdField.tsx`, `ItemValue.tsx`, `MetaCell.tsx`, `NexusFormatDate.tsx`,
  `PartyRow.tsx`, `ProfileName.tsx`, `PropagandaMotif.tsx`, `ProtectDocText.tsx`, `StatChip.tsx`,
  `StatusPanel.tsx`, `ThemeToggle.tsx`, `ThreatGauge.tsx` → kebab-case

### Batch 2: `paper/` (6 arquivos)
- `PaperFooter.tsx`, `PaperHeader.tsx`, `PaperSheet.tsx`, `PaperSubject.tsx`,
  `SectionPaper.tsx`, `SectionTitle.tsx` → kebab-case
- `Paper.tsx` (single-word) mantido

### Batch 3: `stamps/` (4 arquivos)
- `AccessLevel7Only.tsx`, `ClassificationBar.tsx`, `FinalReminder.tsx`, `StampRepAurora.tsx` → kebab-case

### Batch 4: `signatures/` (2 arquivos)
- `DigitalSignature.tsx`, `ResponsibleSignatures.tsx` → kebab-case

### Batch 5: `mdx/` (9 arquivos)
- `RenderMdx.tsx`, `MdxComponents.tsx`, `ProjectTOC.tsx`, `LogLine.tsx`, `CensorEntry.tsx`,
  `ForeignBody.tsx` (raiz), `RequirementList.tsx` (codex/), `RecruitProfile.tsx` (project/),
  `AssetEntry.tsx` (project/) → kebab-case

### Batch 6: `templates/` (24 arquivos)
- Todos os 24 templates PascalCase → kebab-case
- `components/documents/index.ts`: barrel atualizado com 24 novos paths

### Batch 7: `components/` raiz (3 arquivos)
- `ArchiveShell.tsx` → `archive-shell.tsx` (0 imports)
- `IndividualResolver.tsx` → `individual-resolver.tsx` (1 import em `data/document-generators.tsx`)
- `RotatingText/RotatingText.tsx` → `rotating-text/rotating-text.tsx` (1 import em `presentation.tsx`)

### Verificação
- `npx tsc --noEmit`: 13 erros, todos pre-existentes (missing modules), zero erros novos.

---

# Fase 5a — Limpeza Geral
**Data:** 17-Jun-2026 21:10 BRT

## Mudanças

### `app/globals.css`
- Adicionadas 4 utility classes em `@layer utilities`:
  `.text-classification-public`,
  `.text-classification-confidential`,
  `.text-classification-secret`,
  `.text-classification-ultra`
- Cada uma conecta a classificação ao CSS custom property correspondente (`--c-public`, etc.)
- As variáveis já existiam (temas claro e escuro), mas as classes nunca foram definidas

### `_import/`
- Deletados 8 arquivos históricos de sessões anteriores:
  `ARCHIVE_SLUG_DEBUG.md`, `ETAPA_1_ANALISE.md`, `ETAPA_2_COMPONENTES.md`,
  `ETAPA_3_REORGANIZACAO.md`, `ETAPA_4_MIGRACAO.md`, `ETAPA_5_ARCHIVE.md`,
  `IMPORT_ANALYSIS.md`, `SESSION_LOG.md`
- Mantido apenas `CHANGELOG.md`

### `package.json`
- Auditoria concluída: nenhuma dependência órfã encontrada
- 4 pacotes importados mas não declarados (fora do escopo de limpeza):
  `fumadocs-ui`, `slugify`, `framer-motion`, `motion/react` — são imports
  fantasmas em componentes específicos, não listados em dependencies

## Verificação
- `npx tsc --noEmit`: zero novos erros (apenas os 13 pré-existentes)
- Nenhum arquivo `* copy.*` ou `*.bak` encontrado no projeto

---

# Fase 4 PoC — Trial School Final Evaluation via MDX
**Data:** 17-Jun-2026 20:30 BRT

## Mudanças

### `lib/archive/documents.ts`
- Adicionado `"trial-school-final-evaluation"` ao union `DocumentType`
- Adicionada label `"AVALIAÇÃO FINAL (TRIAL)"` em `DOCUMENT_TYPE_LABEL`

### `components/documents/templates/trial/TrialSchoolFinalEvaluation.tsx` (novo)
- Template visualmente idêntico a `school-final-evaluation.tsx` (Paper, PaperHeader, TableEnergyComponent, etc.)
- Assinatura padrão dos templates do archive: `({ doc }: { doc: ArchiveDocument })`
- Lê dados de `doc.frontmatter` em vez de `props.individual`
- `TrialFrontmatter` estende `DocumentFrontmatter` com campos de `SchoolFinalEvaluationData`
- Cast via `as unknown as TrialFrontmatter` (interface local, sem poluir o tipo global)
- Chama `evaluatePower` com dados do frontmatter — mesmo cálculo energético

### `components/documents/index.ts`
- Importa `TrialSchoolFinalEvaluation` e registra em `TEMPLATES`
- Chave usa `"trial-school-final-evaluation"` (kebab case, com aspas) — compatível com `Record<DocumentType, ...>`

### `content/archive/trial/trial-sfe-ultimate.mdx` (novo)
- Frontmatter inline JSON para campos complexos (parser caseiro não suporta YAML aninhado multi-linha)
- Dados reais de Ultimate: personalInfoData, finalEvaluationData, affinities, energyComponentValues, physicalComponentValues, additionalTableValues, responsibleSignaturesData
- Corpo MDX com nota diegética curta sobre a PoC

### `lib/archive/registry.ts`
- Import estático do novo MDX: `trialSfeUltimate`
- Registrado no `RAW` como `"trial-sfe-ultimate"`

### `app/archive/page.tsx`
- Nova aba `"Trial MDX"` (última, após as 3 existentes)
- Filtra documentos por `type === "trial-school-final-evaluation"` e exibe via `DocLink`

## Decisões
- **Frontmatter inline JSON**: O parser caseiro de `registry.ts` não suporta YAML aninhado multi-linha (objetos com indentação de 2 espaços). Para campos como `personalInfoData`, usa-se `chave: {"json":"inline"}` — o parser tenta `JSON.parse` e, se falhar, usa o raw string.
- **Interface local `TrialFrontmatter`**: Em vez de poluir `DocumentFrontmatter` com campos da avaliação escolar, estendemos o tipo com cast `as unknown as`. Isso isola o template trial do sistema de tipos do archive.
- **Aba separada**: Os documentos trial têm visual de ficha de personagem, não archive MDX tradicional. A aba isolada evita confusão com as listas de documentos convencionais.
- **Nenhuma alteração nos `*-archive.tsx` ou `IndividualResolver`**: A PoC é paralela ao sistema existente de fichas de personagem.

## Pendências para migração completa
- O parser de frontmatter precisaria suportar YAML aninhado para evitar inline JSON
- Ou migrar para gray-matter (ou similar) quando sair do PoC
- O campo `type` precisaria ser unificado entre DocumentType e os tipos internos de personagem
- A aba `school-final-evaluation` no `/archive` poderia exibir dados tanto de personagem quanto de trial MDX

---

# fix: conectar IndividualResolver na rota de personagens
**Data:** 17-Jun-2026 20:00 BRT

## Mudanças

### `data/document-generators.tsx`
- Import adicionado de `IndividualResolver` de `@/components/IndividualResolver`
- Substituída chamada direta a `<LayoutComponent documentId={doc.id} />` por `<IndividualResolver slug={individual.slug ?? ""} documentId={doc.id} />`
- Variável `LayoutComponent` removida (já não referenciada)

## Verificação
- `npx tsc --noEmit`: zero novos erros (apenas os 13 pré-existentes de módulos ausentes)
- Nenhum `*-archive.tsx` é importado diretamente fora de `data/individuals.ts`

---

# Fase 3 — IndividualResolver + relatedDocuments
**Data:** 17-Jun-2026

## Mudanças

### `utils/government-data.ts`
- Adicionado campo `slug?: string` à interface `Individual` para lookup por identificador
- Adicionado campo `relatedDocuments?: { slug: string; label?: string }[]` para vincular documentos do archive a personagens
- `layoutComponent` agora recebe `IndividualLayoutProps` de `types/character-data.ts`

### `data/individuals.ts`
- Todos os 4 registros agora têm `slug` (diana-watson, ultimate, kendra-connors, kira)
- Ultimate: `relatedDocuments` → `codex-fic-01-fantasma-carmesim`
- Kendra: `relatedDocuments` → `projeto-red-suns`
- Diana e Kira: sem `relatedDocuments`

### `types/character-data.ts`
- Nova interface `IndividualLayoutProps` com `documentId` (obrigatório) + `profileId?`, `schoolFinalEvaluation?`, `permissions?`
- Todos os campos de dados opcionais — cada personagem tem um subconjunto diferente de documentos

### `components/archives/individuals/*-archive.tsx` (3 arquivos)
- Removidos todos os imports diretos de `data/profile-id/`, `data/permissions/`, `data/school-final-evaluations/`
- Props alteradas de `{ individual: Individual; documentId: string }` para `IndividualLayoutProps`
- Roteamento por `documentId` mantido, mas lendo de `profileId`, `schoolFinalEvaluation`, `permissions`
- Dados ausentes tratados com early return (não assume presença)

### `components/IndividualResolver.tsx` (novo)
- Componente client que orquestra a resolução slug → dados → layout
- Importa estaticamente todos os 9 arquivos de dados e constrói um mapa slug → dados
- Busca o `Individual` em `data/individuals.ts` pelo slug
- Renderiza o `layoutComponent` do indivíduo com as props corretas
- Slug ou `layoutComponent` ausentes → retorna `null`

### `data/document-generators.tsx`
- Atualizado para compatibilidade com novo tipo de `layoutComponent` (removida prop `individual` obsoleta)

## Decisões

- **`IndividualLayoutProps` com campos opcionais**: Cada personagem tem documentos diferentes (ex: Kira só tem school-final-evaluation). Novos tipos de documento podem surgir sem quebrar layouts existentes.
- **Resolver como orquestrador, não substituto**: Os 3 `*-archive.tsx` continuam existindo. O resolver apenas centraliza a passagem de dados — não substitui os layouts.
- **Import estático vs dinâmico**: Todos os dados são constantes pequenas. Import estático é mais seguro (type checking em tempo de compilação) do que `import()` dinâmico.
- **`slug` como campo separado do `name`**: Permite URLs limpas independentes do nome do personagem, que pode mudar (apelidos, codinomes).

---

# Fase 2 — Tipagem da Camada de Dados

## Interfaces Criadas (`types/character-data.ts`)

| Interface | Campos principais | Observação |
|-----------|-------------------|------------|
| `ResponsibleSignature` | department, name, registry, signature, timestamp | Reutilizada em 3 tipos |
| `MentorData` | department?, name?, registry?, signature?, timestamp? | Todos opcionais — `mentor` pode ser `{}` vazio |
| `ProfileIdData` | name, knownAs, birthDate, ..., responsibleSignaturesData, isHighSecurity? | `isHighSecurity` opcional (só Ultimate tem) |
| `PermissionsData` | id, registryName, age, birthDate, licenseStartDate, tier, mentor, responsibleSignatures | |
| `Affinities` | chakra, mana, spectral | |
| `EnergyComponentValues` | totalEnergy, energyControl, speedManipulation | |
| `PhysicalComponentValues` | strength, physicalSpeed, durability, stamina | |
| `AdditionalTableValues` | survivanceAndFirstAid, strategySkills, teamwork, historyAndGeography | |
| `PersonalInfoData` | registryName, realName, redactRealName, age, birthDate, redactBirthDate, residence, redactResidence | |
| `FinalEvaluationData` | date, institute, examiners, redactExaminers | |
| `SchoolFinalEvaluationData` | registry, personalInfoData, finalEvaluationData, affinities, energyComponentValues, physicalComponentValues, additionalTableValues, responsibleSignaturesData, isHighSecurity? | |

## Arquivos Anotados

### `satisfies ProfileIdData`
- `data/profile-id/ultimate.ts`
- `data/profile-id/diana-watson.ts`
- `data/profile-id/kendra-connors.ts`

### `satisfies PermissionsData`
- `data/permissions/ultimate.ts`
- `data/permissions/diana-watson.ts`

### `satisfies SchoolFinalEvaluationData`
- `data/school-final-evaluations/ultimate.ts`
- `data/school-final-evaluations/diana-watson.ts`
- `data/school-final-evaluations/kendra-connors.ts`
- `data/school-final-evaluations/kira.ts`

## Correções em `utils/government-data.ts`

Removida a index signature `[key: string]: any` (linhas 34–35) da interface `Individual`.
Não havia outras ocorrências de `any` ou index signatures no arquivo.

## Decisões de Tipo

- **`MentorData` com todos os campos opcionais**: Justificado porque `ultimate.ts` tem `mentor: {}` (objeto vazio) enquanto `diana-watson.ts` tem o objeto preenchido. A união dos dois casos exige que todos os campos sejam opcionais.
- **`isHighSecurity` como `boolean?` em todos os tipos**: Justificado porque nem todos os personagens têm o campo (ex: Diana Watson profile-id não tem `isHighSecurity`).
- **Uso de `satisfies` em vez de anotação de tipo na variável**: `satisfies` valida a estrutura sem alargar o tipo inferido, preservando inferência literal para templates que esperam o formato exato.
