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
