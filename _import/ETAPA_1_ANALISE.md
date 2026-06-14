# Etapa 1 — Análise

Produzido em: 2026-06-13  
Base de análise: todos os 96 arquivos de código-fonte dos três conjuntos (velho, novo, dev showcase)

---

## Material Velho — `components/individual-layouts/`

**Total:** 31 arquivos (3 layouts + 3 templates + 25 componentes)

### Layouts (3) — despachadores por personagem

| Arquivo | Personagem | Documentos roteados |
|---|---|---|
| `diana-watson-layout.tsx` | Diana Watson | `profile`, `school-final-evaluation`, `permit-card` |
| `kendra-connors-layout.tsx` | Kendra Connors | `profile`, `school-final-evaluation` (permit-card comentado) |
| `ultimate-layout.tsx` | Ultimate | `profile`, `school-final-evaluation`, `permit-card` |

- **Arquitetura:** cada layout importa dados estáticos de `@/data/profile-id/*`, `@/data/school-final-evaluations/*`, `@/data/permissions/*` e renderiza o template correspondente.
- **Props compartilhadas:** `{ individual: Individual; documentId: string }` — `Individual` de `@/utils/government-data`.
- **Consumido por:** `@/data/individuals.ts` (mapeia personagem → layout).
- **Equivalente em `_import/`:** nenhum. `_import/` usa um registry flat `TEMPLATES[DocumentType]` sem despacho por personagem.

### Templates de documento (3)

| Arquivo | Props | O que faz | Dependências notáveis |
|---|---|---|---|
| `documents/permit-card.tsx` | `{ individual: any }` | Cartão de permissão com tier, info pessoal, tabela de permissões | `tierColors`/`PowerTier` de `lib/power-system`, `ItemValue`, `Paper`, `PaperHeader`, `SectionPaper`, `StampRepAurora`, `ResponsibleSignatures`, shadcn `Table` |
| `documents/profile-id.tsx` | `{ individual: any }` | Identidade com dados pessoais, alguns redactáveis | `RedactedText`, `Paper`, `PaperHeader`, `PaperSubject`, `ProfileName`, `ItemValue`, `NexusFormatDate`, `SectionPaper`, `ResponsibleSignatures`, `StampRepAurora`, `ProtectDoc` |
| `documents/school-final-evaluation-doc.tsx` | `{ individual: any }` | Avaliação escolar completa com tabelas de power base, tier, assinaturas | 18 sub-componentes de `general-components/` + `evaluatePower` de `lib/power-system` |

**Padrão:** todos recebem `{ individual: any }` (freeform data object, sem tipagem forte) e compõem vários `general-components/` em árvore hardcoded.

### Componentes gerais (25) — organizados por categoria

#### Estruturais / Layout (4)
| Arquivo | Props | Equivalente em `_import/` |
|---|---|---|
| `paper.tsx` | `{ children }` | **`PaperSheet`** — mesmo propósito, CSS diferente (old: `border bg-[#eaeaea] p-6`, new: `paper-texture border border-paper-muted/40 p-10 shadow-...`) |
| `section-paper.tsx` | `{ className?, children }` | Nenhum — templates novos usam `div` ad-hoc |
| `section-title.tsx` | `{ children }` | Nenhum — templates novos usam `<h2>` inline |
| `paper-header.tsx` | `{ department, isHighSecurity? }` | **`ClassificationBar`** — propósito diferente (old: república + departamento; new: nível de classificação + tipo doc) |

#### Header / Subject / Footer (3)
| Arquivo | Props | Equivalente |
|---|---|---|
| `paper-subject.tsx` | `{ divisionName?, documentName?, registry?, isHighSecurity? }` | Parcial — `ClassificationBar` cobre o badge de classificação |
| `paper-footer.tsx` | `{ isHighSecurity?, distribution?, redactDistribuition? }` | Nenhum — templates novos não têm footer componente |
| `protect-doc-text.tsx` | (sem props) | Nenhum — copyright/disclaimer |

#### Data Display (5)
| Arquivo | Props | Equivalente |
|---|---|---|
| `item-value.tsx` | `{ item, value, className?, redacted? }` | **`IdField`** (interno de `IdCardTemplate.tsx`) — mesmo padrão label+value |
| `profile-name.tsx` | `{ name, knownAs, isHighSecurity? }` | Nenhum — templates novos usam frontmatter direto |
| `nexus-format-date.tsx` | `(date: string): string` | Nenhum — `_import/` usa raw date |
| `digital-signature.tsx` | `{ signature?, registry?, timestamp?, color?, background? }` | **`DigitalSignature`** (`_import/DigitalSignature.tsx`) — mesma ideia, API diferente (old: `signature, registry, timestamp`; new: `name, role?, registry, timestamp, authority?`) |
| `responsible-signatures.tsx` | `{ responsibleSignatures }` | Nenhum — templates novos usam `<DigitalSignature>` direto |

#### Selos / Avisos (3)
| Arquivo | Equivalente |
|---|---|
| `access-level-7-only.tsx` | Nenhum |
| `final-reminder.tsx` | Nenhum |
| `stamp-rep-aurora.tsx` | Nenhum — novo usa `<CrestSvg>` para selo |

#### Tabelas do Power System (5)
| Arquivo | Função |
|---|---|
| `table-energy.tsx` | Tabela de Componente Energético (4 linhas + subtotal + avisos exceptionais) |
| `table-physical.tsx` | Tabela de Componente Físico (4 linhas + subtotal + avisos excepcionais) |
| `table-power-attributes.tsx` | Tabela consolidada de 8 atributos + subtotal |
| `table-additional-test.tsx` | Tabela de testes adicionais (4 linhas + subtotal) |
| `table-affinities.tsx` | Tabela de afinidades energéticas + badge EXCEPCIONAL |

**Todas usam** shadcn `Table` + `@phosphor-icons/react` (`WarningIcon`).  
**Nenhuma tem equivalente em `_import/`** — são exclusivas do sistema de fichas de personagem.

#### Resultados do Power System (2)
| Arquivo | Função |
|---|---|
| `total-power-base.tsx` | Exibe total base + alerta se acima do threshold |
| `tier-total-score.tsx` | Exibe letra do tier (S~F) + pontuação final; re-exporta `tierColors` |

#### Informações de Avaliação (2)
| Arquivo | Função |
|---|---|
| `personal-info-school-evaluation.tsx` | Dados pessoais na avaliação escolar |
| `final-evaluation-info.tsx` | Metadados da avaliação (data, instituição, examinadores) |

#### Utilitário (1)
| Arquivo | Observação |
|---|---|
| `energy-calculator.ts` | Motor de cálculo energético com 8 faixas (Humano Comum → Entidade Cósmica). **Importado por `lib/power-system/calculator.ts` e `lib/power-system/index.ts` — é o único arquivo velho consumido pelo código novo.** |

---

## `dev.componentes.tsx`

**Arquivo:** `/home/ultimate/personal/lumen/dev.componentes.tsx`

**Propósito:** Página showcase (rota `/dev/componentes` via TanStack Router) que cataloga todos os componentes reutilizáveis do projeto Lumen com exemplos visuais, props e notas de portabilidade.

### Componentes locais (apenas internos ao showcase)

| Componente | Props | Função |
|---|---|---|
| `Group` | `{ id, title, intro?, children }` | Seção visual que agrupa `Item`s por categoria |
| `Item` | `{ name, port?, props?, children }` | Card de demonstração com nome, props, notas de port, exemplo renderizado |
| `TOC` (constante) | — | Lookup table: 8 seções com labels em português |

### Componentes catalogados (39) — agrupados por categoria

#### A — Layout & Shell (3)
`ArchiveShell`, `PaperSheet`, `ClassificationBar`

#### B — Carimbos & Marcação (9)
`Redacted`, `Stamp` (flex variant+shape), `ApprovedStamp`, `DeniedStamp`, `ClassifiedStamp`, `ArchivedStamp`, `UrgentStamp`, `Classified`

#### C — Estrutura Editorial (8)
`Field`, `Pullquote`, `Caption`, `Article`, `LogLine`, `Evidence`, `CensorEntry`, `Section`

#### D — Interrogatório (2)
`Exchange` (speaker + tone), `Note` (pause/inaudible/off-record/action)

#### E — Comunicação Monitorada (4)
`Msg` (chat bubble left/right), `FlagPhrase`, `Gap` (time gap), `Attachment`

#### F — Codex / Poderes (4)
`Trait`, `Warning`, `RequirementList`, `Phase`

#### G — Projeto Classificado (5)
`Objective`, `RecruitProfile`, `AssetEntry`, `Safeguard`, `ProjectTOC`

#### H — Assinaturas / Transmissão (5)
`Signature`, `DigitalSignature`, `Transmission`, `ForeignBody`, `Translation`

**Observação:** todos os 39 componentes catalogados são os mesmos definidos em `_import/MdxComponents.tsx` e `_import/lib/mdx-components.tsx`.

---

## Material Novo — `_import/`

**Total:** ~39 arquivos de código-fonte + 30 MDX + 2 CSS/markdown

### Templates (22)

| Template | Caminho | Estilo | Componentes internos extraíveis |
|---|---|---|---|
| **AiLogTemplate** | `ai-log-template/AiLogTemplate.tsx` | CRT terminal verde (`bg-chrome`, `scanlines`, `crt-glow`) | — |
| **AutopsyTemplate** | `autopsy-template/AutopsyTemplate.tsx` | `PaperSheet` + `ClassificationBar` + grid forense | `Cell` (grid data cell) |
| **BatchTemplate** | `batch-template/BatchTemplate.tsx` | Folder animado + índice + peças flat | `TYPE_ACCENT` map |
| **BountyTemplate** | `bounty-template/BountyTemplate.tsx` | Poster de procurado com moldura dupla | placeholder de retrato |
| **BroadcastTemplate** | `broadcast-template/BroadcastTemplate.tsx` | `PaperSheet` + `ClassificationBar` | — |
| **BulletinTemplate** | `bulletin-template/BulletinTemplate.tsx` | `PaperSheet` + `ClassificationBar` | — |
| **ClassifiedProjectTemplate** | `classified-project-template/ClassifiedProjectTemplate.tsx` | `PaperSheet` + TOC + LED status | `StatusPanel`, `MetaCell` |
| **CodexEntryTemplate** | `codex-entry-template/CodexEntryTemplate.tsx` | `PaperSheet` + sigil SVG + threat gauge | `ThreatGauge`, `Sigil`, `StatChip` |
| **DecreeTemplate** | `decree-template/DecreeTemplate.tsx` | `PaperSheet` + `ClassificationBar` + gear | — |
| **DossierTemplate** | `dossier-template/DossierTemplate.tsx` | `PaperSheet` + photo placeholder | placeholder retrato |
| **ForeignLetterTemplate** | `foreign-letter-template/ForeignLetterTemplate.tsx` | Watermark + crest SVG + dual stamp | — |
| **ForensicTemplate** | `forensic-template/ForensicTemplate.tsx` | `PaperSheet` + `ClassificationBar` + 3-col grid | — |
| **IdCardTemplate** | `id-card-template/IdCardTemplate.tsx` | `PaperSheet` + ID visual + biometric | `IdField` |
| **IncidentTemplate** | `incident-template/IncidentTemplate.tsx` | `PaperSheet` + borda vermelha alerta | — |
| **InterrogationTemplate** | `interrogation-template/InterrogationTemplate.tsx` | `PaperSheet` + participantes + metadados | `Meta`, `PartyRow` |
| **ManifestoTemplate** | `manifesto-template/ManifestoTemplate.tsx` | `paper-texture` standalone, sem `ClassificationBar` | — |
| **MedicalRecordTemplate** | `medical-record-template/MedicalRecordTemplate.tsx` | `PaperSheet` + tabelas vitals/meds/procedures | `Section`, `Row` |
| **MemoTemplate** | `memo-template/MemoTemplate.tsx` | `PaperSheet` + `ClassificationBar` + grid From/To | — |
| **MonitoredThreadTemplate** | `monitored-thread-template/MonitoredThreadTemplate.tsx` | `PaperSheet` + surveillance header | `MetaRow` |
| **NewsTemplate** | `news-template/NewsTemplate.tsx` | Newspaper masthead + colunas | — |
| **OrderTemplate** | `order-template/OrderTemplate.tsx` | `PaperSheet` + grid Unit/Target/Window | `FormField` |
| **PropagandaTemplate** | `propaganda-template/PropagandaTemplate.tsx` | Poster com motif SVG + cantos | `PropagandaMotif` |

### Componentes (5 arquivos)

| Arquivo | Propósito | Observação |
|---|---|---|
| `components/DocumentHeader.tsx` | `ClassificationBar` + `PaperSheet` | **DUPLICADO** em `document-header/DocumentHeader.tsx` |
| `components/DigitalSignature.tsx` | Bloco de assinatura digital | **DUPLICADO** em `_import/DigitalSignature.tsx` |
| `components/ThemeToggle.tsx` | Alternador light/dark (next-themes) | Único |
| `components/batch/Folder.tsx` | Pasta animada com selo de cera (4 estágios) | Único — único componente com animação |
| `foreign/CrestSvg.tsx` | SVG de brasão (4 motifs) | **DUPLICADO** em `_import/CrestSvg.tsx` |

### Root Components (3)

| Arquivo | Propósito |
|---|---|
| `ArchiveShell.tsx` | Layout shell (header + footer + nav), já adaptado para `next/link` |
| `MdxComponents.tsx` (705 linhas) | 36+ componentes MDX + `RenderMdx({ Content })` — versão TanStack Router |
| `index.ts` | `TEMPLATES` registry: mapeia `DocumentType` → 22 templates |

### Bibliotecas (3)

| Arquivo | Propósito |
|---|---|
| `lib/documents.ts` | Types: `DocumentFrontmatter` (130+ campos), `ArchiveDocument`, `DocumentType` (23), `Classification` (4); constantes `DOCUMENT_TYPE_LABEL`, `CLASSIFICATION_TOKEN` |
| `lib/registry.ts` | Loader de MDX build-time: 30 imports estáticos + parser de frontmatter YAML customizado + `getBatchItems()` |
| `lib/mdx-components.tsx` (467 linhas) | 36+ componentes MDX + `RenderMdx({ source })` via `MDXRemote` — versão Next.js App Router |
| `lib/types/mdx.d.ts` | `declare module "*.mdx"` |

### Arquivos MDX (30)

Conteúdo narrativo do universo Lumen, organizados por template.

### CSS

`_import/styles.css` — 1022 linhas de classes customizadas (tokens, utilities, animações). ~400 linhas já portadas para `app/globals.css`.

---

## Comparação Cruzada

### Duplicações encontradas

| Item | Lado Velho | Lado Novo | Observação |
|---|---|---|---|
| **Container de documento** | `general-components/paper.tsx` | `PaperSheet` (em `components/DocumentHeader.tsx`) | Mesmo propósito, CSS diferente. Novo usa `paper-texture` e sombras maiores. |
| **Assinatura digital** | `general-components/digital-signature.tsx` | `DigitalSignature.tsx` (3 cópias em `_import/`) | Mesmo conceito, API diferente. Velho: `(signature, registry, timestamp, color?, background?)`. Novo: `(name, role?, registry, timestamp, authority?, className?)`. |
| **Label+value (Field)** | `general-components/item-value.tsx` | `IdField` (interno de `IdCardTemplate.tsx`) | Mesmo padrão label+value. Velho tem suporte a redação. Novo é inline simples. |
| **Identidade / Profile** | `documents/profile-id.tsx` | `IdCardTemplate.tsx` | Ambos renderizam documento de identidade. Velho: React hardcoded. Novo: MDX-driven. |
| **Badge de classificação** | `paper-header.tsx` + `paper-subject.tsx` | `ClassificationBar` | Função similar mas visual diferente. Velho mostra república+departamento; novo mostra nível+data. |
| **DocumentHeader** (cópia interna) | — | `_import/components/DocumentHeader.tsx` == `_import/document-header/DocumentHeader.tsx` | **Cópia exata** — manter apenas uma |
| **DigitalSignature** (cópia interna) | — | `_import/DigitalSignature.tsx` == `_import/components/DigitalSignature.tsx` | **Cópia exata** — manter apenas uma |
| **CrestSvg** (cópia interna) | — | `_import/CrestSvg.tsx` == `_import/foreign/CrestSvg.tsx` | **Cópia exata** — manter apenas uma |
| **MdxComponents** (duas versões) | — | `_import/MdxComponents.tsx` (705 linhas, `RenderMdx({ Content })`) vs `_import/lib/mdx-components.tsx` (467 linhas, `RenderMdx({ source })`) | Duas versões do mesmo conjunto de 36 componentes. A `lib/` já está adaptada para Next.js App Router com `next-mdx-remote`. A root usa TanStack Router. |
| **energy-calculator.ts** | `general-components/energy-calculator.ts` | `lib/power-system/calculator.ts` (importa do velho) | O arquivo velho **é** a origem — o novo `lib/power-system/` importa dele. Não é duplicação, é dependência compartilhada. |

### Componentes únicos por lado

#### Únicos no lado Velho (sem equivalente no Novo)

| Componente | Categoria | Motivo |
|---|---|---|
| Per-character layouts (3) | Roteamento | Sistema de fichas de personagem — não existe no `_import/` |
| `permit-card.tsx` | Template | Licença/permissão — sem análogo no `_import/` |
| `school-final-evaluation-doc.tsx` | Template | Avaliação escolar com power system — sem análogo |
| **5 tabelas de power system** | Tabelas | `table-energy`, `table-physical`, `table-power-attributes`, `table-additional-test`, `table-affinities` |
| `total-power-base.tsx` | Resultado | Exibe total de base de poder |
| `tier-total-score.tsx` | Resultado | Exibe tier S~F com cor |
| `access-level-7-only.tsx` | Aviso | Banner de segurança |
| `final-reminder.tsx` | Aviso | Lembrete de estado secreto |
| `stamp-rep-aurora.tsx` | Selo | Selo "República da Aurora" |
| `protect-doc-text.tsx` | Rodapé | Copyright/disclaimer |
| `paper-footer.tsx` | Footer | Rodapé completo com classificação + distribuição |
| `paper-subject.tsx` | Header | Assunto + divisão |
| `profile-name.tsx` | Display | Nome com "conhecido como" |
| `responsible-signatures.tsx` | Assinaturas | Lista de signatários |
| `section-paper.tsx` | Layout | Seção com borda |
| `section-title.tsx` | Título | Banner de seção uppercase fundo escuro |
| `personal-info-school-evaluation.tsx` | Info | Dados pessoais na avaliação |
| `final-evaluation-info.tsx` | Info | Metadados da avaliação |
| `nexus-format-date.tsx` | Utilitário | Formatador de data com interponto |

#### Únicos no lado Novo (sem equivalente no Velho)

| Componente | Categoria | Motivo |
|---|---|---|
| **BatchTemplate** | Template | Pasta de caso multi-documento com Folder animado — o mais complexo |
| **Folder** | Componente | Animação de abertura de pasta com selo de cera — único componente animado |
| **22 templates MDX** | Templates | Todos os templates de documento do universo Lumen |
| **~36 componentes MDX** | MDX library | `Redacted`, `Stamp` (5 variantes), `Exchange`, `Msg`, `FlagPhrase`, `LogLine`, `CensorEntry`, etc. |
| **RenderMdx** | Renderizador | Motor de renderização MDX (`next-mdx-remote`) |
| **Registry + parser YAML** | Biblioteca | Loader de MDX build-time + parser de frontmatter |
| **30 arquivos MDX** | Conteúdo | Lore narrativo do universo |
| **ArchiveShell** | Layout | Shell de layout com header/footer — versão Next.js |
| **ThemeToggle** | UI | Alternador de tema |
| **TYPE_ACCENT, DOCUMENT_TYPE_LABEL, CLASSIFICATION_TOKEN** | Constantes | Mapeamentos de tipo/classe → cor/label |
| **DocumentFrontmatter (130+ campos)** | Types | Sistema de tipos para 23 tipos de documento |
| **Sistema de 23 DocumentTypes** | Types | Taxonomia completa de documentos do universo |
| **`_import/styles.css` (1022 linhas)** | CSS | Tema retro-cyberpunk completo |

### Candidatos a componentes menores

#### Categoria `paper/` (containers, texturas, bordas)

| Candidato | Origem | Destino sugerido |
|---|---|---|
| `PaperSheet` | `_import/components/DocumentHeader.tsx` | `components/documents/general-components/paper/PaperSheet.tsx` |
| `Paper` (old) | `individual-layouts/general-components/paper.tsx` | Pode convergir para `PaperSheet` ou coexistir (estilos diferentes) |
| `SectionPaper` (old) | `individual-layouts/general-components/section-paper.tsx` | `components/documents/general-components/paper/SectionPaper.tsx` |
| `SectionTitle` (old) | `individual-layouts/general-components/section-title.tsx` | `components/documents/general-components/paper/SectionTitle.tsx` |
| `PaperHeader` (old) | `individual-layouts/general-components/paper-header.tsx` | `components/documents/general-components/paper/PaperHeader.tsx` |
| `PaperSubject` (old) | `individual-layouts/general-components/paper-subject.tsx` | `components/documents/general-components/paper/PaperSubject.tsx` |
| `PaperFooter` (old) | `individual-layouts/general-components/paper-footer.tsx` | `components/documents/general-components/paper/PaperFooter.tsx` |
| `ProtectDoc` (old) | `individual-layouts/general-components/protect-doc-text.tsx` | `components/documents/general-components/paper/ProtectDoc.tsx` |

#### Categoria `stamps/` (carimbos, classificações, selos)

| Candidato | Origem | Destino sugerido |
|---|---|---|
| `ClassificationBar` | `_import/components/DocumentHeader.tsx` | `components/documents/general-components/stamps/ClassificationBar.tsx` |
| `Redacted` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/stamps/Redacted.tsx` |
| `Stamp` + 5 variantes | `_import/lib/mdx-components.tsx` | `components/documents/general-components/stamps/Stamp.tsx` (todas variantes no mesmo arquivo) |
| `Classified` (wrapper) | `_import/lib/mdx-components.tsx` | `components/documents/general-components/stamps/Classified.tsx` |
| `AccessLevel7Only` (old) | `individual-layouts/general-components/access-level-7-only.tsx` | `components/documents/general-components/stamps/AccessLevel7Only.tsx` |
| `FinalReminder` (old) | `individual-layouts/general-components/final-reminder.tsx` | `components/documents/general-components/stamps/FinalReminder.tsx` |
| `StampRepAurora` (old) | `individual-layouts/general-components/stamp-rep-aurora.tsx` | `components/documents/general-components/stamps/StampRepAurora.tsx` |

#### Categoria `signatures/` (assinaturas digitais)

| Candidato | Origem | Destino sugerido |
|---|---|---|
| `DigitalSignature` (versão canônica editada) | `_import/components/DigitalSignature.tsx` | `components/documents/general-components/signatures/DigitalSignature.tsx` |
| `ResponsibleSignatures` (old) | `individual-layouts/general-components/responsible-signatures.tsx` | `components/documents/general-components/signatures/ResponsibleSignatures.tsx` |

#### Categoria `mdx/` (componentes injetáveis no MDX)

| Candidato | Origem | Destino sugerido |
|---|---|---|
| `Signature` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/Signature.tsx` |
| `Field` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/Field.tsx` |
| `Pullquote`, `Caption`, `Article`, `Evidence` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/{nome}.tsx` |
| `LogLine` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/LogLine.tsx` |
| `CensorEntry` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/CensorEntry.tsx` |
| `Exchange`, `Note` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/interrogation/{Exchange,Note}.tsx` |
| `Msg`, `FlagPhrase`, `Gap`, `Attachment` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/comms/{Msg,FlagPhrase,Gap,Attachment}.tsx` |
| `ForeignBody`, `Translation` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/ForeignBody.tsx` |
| `Transmission` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/Transmission.tsx` |
| `Section`, `ProjectTOC` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/{Section,ProjectTOC}.tsx` |
| `Trait`, `Warning`, `RequirementList`, `Phase` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/codex/{Trait,Warning,RequirementList,Phase}.tsx` |
| `Objective`, `RecruitProfile`, `AssetEntry`, `Safeguard` | `_import/lib/mdx-components.tsx` | `components/documents/general-components/mdx/project/{Objective,RecruitProfile,AssetEntry,Safeguard}.tsx` |

#### Categoria `ui/` (outros elementos menores)

| Candidato | Origem | Destino sugerido |
|---|---|---|
| `ItemValue` (old) | `individual-layouts/general-components/item-value.tsx` | `components/documents/general-components/ui/ItemValue.tsx` |
| `ProfileName` (old) | `individual-layouts/general-components/profile-name.tsx` | `components/documents/general-components/ui/ProfileName.tsx` |
| `NexusFormatDate` (old) | `individual-layouts/general-components/nexus-format-date.tsx` | `components/documents/general-components/ui/NexusFormatDate.tsx` |
| `ThemeToggle` | `_import/components/ThemeToggle.tsx` | `components/documents/general-components/ui/ThemeToggle.tsx` |
| `Sigil` (Codex SVG) | `_import/codex-entry-template/CodexEntryTemplate.tsx` | `components/documents/general-components/ui/Sigil.tsx` |
| `PropagandaMotif` | `_import/propaganda-template/PropagandaTemplate.tsx` | `components/documents/general-components/ui/PropagandaMotif.tsx` |
| `CrestSvg` | `_import/CrestSvg.tsx` | `components/documents/general-components/ui/CrestSvg.tsx` |
| `Folder` (animação) | `_import/components/batch/Folder.tsx` | `components/documents/general-components/ui/Folder.tsx` |

---

## Proposta de Estrutura Final — `components/documents/`

```
components/
└── documents/
    ├── templates/                     ← todos os templates (22 novos + 3 velhos)
    │   ├── archive/                   ← novos: cada tipo de documento
    │   │   ├── ai-log.tsx
    │   │   ├── autopsy.tsx
    │   │   ├── batch.tsx
    │   │   ├── bounty.tsx
    │   │   ├── broadcast.tsx
    │   │   ├── bulletin.tsx
    │   │   ├── classified-project.tsx
    │   │   ├── codex-entry.tsx
    │   │   ├── decree.tsx
    │   │   ├── dossier.tsx
    │   │   ├── foreign-letter.tsx
    │   │   ├── forensic.tsx
    │   │   ├── id-card.tsx
    │   │   ├── incident.tsx
    │   │   ├── interrogation.tsx
    │   │   ├── manifesto.tsx
    │   │   ├── medical-record.tsx
    │   │   ├── memo.tsx
    │   │   ├── monitored-thread.tsx
    │   │   ├── news.tsx
    │   │   ├── order.tsx
    │   │   └── propaganda.tsx
    │   └── individual/                ← velhos: fichas de personagem
    │       ├── permit-card.tsx
    │       ├── profile-id.tsx
    │       └── school-final-evaluation-doc.tsx
    │
    ├── general-components/            ← componentes quebrados e reutilizáveis
    │   ├── paper/
    │   │   ├── PaperSheet.tsx         ← do novo (canônico)
    │   │   ├── SectionPaper.tsx       ← do velho
    │   │   ├── SectionTitle.tsx       ← do velho
    │   │   ├── PaperHeader.tsx        ← do velho
    │   │   ├── PaperSubject.tsx       ← do velho
    │   │   └── PaperFooter.tsx        ← do velho
    │   │
    │   ├── stamps/
    │   │   ├── ClassificationBar.tsx  ← do novo
    │   │   ├── Redacted.tsx           ← do novo
    │   │   ├── Stamp.tsx              ← do novo (com ApprovedStamp, DeniedStamp, etc)
    │   │   ├── Classified.tsx         ← do novo
    │   │   ├── AccessLevel7Only.tsx   ← do velho
    │   │   ├── FinalReminder.tsx      ← do velho
    │   │   └── StampRepAurora.tsx     ← do velho
    │   │
    │   ├── signatures/
    │   │   ├── DigitalSignature.tsx   ← versão canônica (do novo)
    │   │   └── ResponsibleSignatures.tsx  ← do velho
    │   │
    │   ├── mdx/
    │   │   ├── MdxComponents.tsx      ← master: importa todos abaixo + HTML overrides
    │   │   ├── RenderMdx.tsx          ← adaptador next-mdx-remote
    │   │   ├── Signature.tsx
    │   │   ├── Field.tsx
    │   │   ├── Pullquote.tsx
    │   │   ├── Caption.tsx
    │   │   ├── Article.tsx
    │   │   ├── Evidence.tsx
    │   │   ├── LogLine.tsx
    │   │   ├── CensorEntry.tsx
    │   │   ├── Section.tsx
    │   │   ├── ProjectTOC.tsx
    │   │   ├── ForeignBody.tsx
    │   │   ├── Translation.tsx
    │   │   ├── Transmission.tsx
    │   │   ├── interrogation/
    │   │   │   ├── Exchange.tsx
    │   │   │   └── Note.tsx
    │   │   ├── comms/
    │   │   │   ├── Msg.tsx
    │   │   │   ├── FlagPhrase.tsx
    │   │   │   ├── Gap.tsx
    │   │   │   └── Attachment.tsx
    │   │   ├── codex/
    │   │   │   ├── Trait.tsx
    │   │   │   ├── Warning.tsx
    │   │   │   ├── RequirementList.tsx
    │   │   │   └── Phase.tsx
    │   │   └── project/
    │   │       ├── Objective.tsx
    │   │       ├── RecruitProfile.tsx
    │   │       ├── AssetEntry.tsx
    │   │       └── Safeguard.tsx
    │   │
    │   └── ui/
    │       ├── ItemValue.tsx          ← do velho (fundir com Field)
    │       ├── ProfileName.tsx        ← do velho
    │       ├── NexusFormatDate.tsx    ← do velho
    │       ├── ThemeToggle.tsx        ← do novo
    │       ├── Sigil.tsx              ← extraído de CodexEntryTemplate
    │       ├── PropagandaMotif.tsx    ← extraído de PropagandaTemplate
    │       ├── CrestSvg.tsx           ← do novo
    │       └── Folder.tsx             ← do novo (batch)
    │
    └── index.ts                      ← TEMPLATES registry + barrel exports
```

**Nota sobre arquivos que permanecem fora de `components/documents/`:**
- `_import/lib/registry.ts` → `lib/archive/registry.ts` (ou similar, é um loader build-time)
- `_import/lib/documents.ts` → `lib/archive/documents.ts` (types + constants)
- `_import/lib/types/mdx.d.ts` → `types/mdx.d.ts`
- `_import/ArchiveShell.tsx` → `components/layout/ArchiveShell.tsx` (já existe esboço em `components/layout/`)
- `styles.css` → integração com `app/globals.css` (parcialmente feito)
- Arquivos MDX → permanecem em `_import/*-template/` ou migram para `content/archive/`

---

## O que vem na Etapa 2

**Objetivo:** Quebrar componentes em peças menores reutilizáveis.

Com base na análise acima, a Etapa 2 deve:

1. **Extrair componentes internos dos templates novos** para `general-components/`:
   - `IdField` de `IdCardTemplate` → fundir com `ItemValue` velho como `Field` genérico
   - `Cell` de `AutopsyTemplate`
   - `FormField` de `OrderTemplate`
   - `Meta`/`PartyRow` de `InterrogationTemplate`
   - `Section`/`Row` de `MedicalRecordTemplate`
   - `StatusPanel`/`MetaCell` de `ClassifiedProjectTemplate`
   - `ThreatGauge`/`Sigil`/`StatChip` de `CodexEntryTemplate`
   - `PropagandaMotif` de `PropagandaTemplate`
   - `TYPE_ACCENT` de `BatchTemplate` → constante centralizada

2. **Consolidar duplicatas internas do `_import/`:**
   - Manter 1 `DocumentHeader.tsx`, 1 `DigitalSignature.tsx`, 1 `CrestSvg.tsx`
   - Manter apenas `lib/mdx-components.tsx` (versão next-mdx-remote); descartar root `MdxComponents.tsx`

3. **Criar `general-components/` vazia** com a estrutura de pastas proposta acima.

4. **Mover cada componente extraído** para seu lugar na estrutura, atualizando imports nos templates.

5. **Não alterar** o conteúdo MDX, os estilos CSS, nem a lógica de negócio. Apenas fatiar componentes.

**Restrições da Etapa 2:**
- NÃO mover templates para `components/documents/templates/` ainda (Etapa 4)
- NÃO mesclar material velho ainda (Etapa 3)
- Focar exclusivamente em extrair e organizar componentes reutilizáveis
