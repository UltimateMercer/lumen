# Etapa 2 — Extração de Componentes (`_import/general-components/`)

## Objetivo

Extrair todos os componentes reutilizáveis do `_import/` (material novo) para uma estrutura organizada em `_import/general-components/`, eliminando duplicações e preparando o terreno para a migração final para `components/documents/`.

## Estrutura Final

```
_import/general-components/
├── paper/
│   └── PaperSheet.tsx              ← Fase 2 (ex-DocumentHeader)
├── stamps/
│   └── ClassificationBar.tsx       ← Fase 2 (ex-DocumentHeader)
├── signatures/
│   └── DigitalSignature.tsx        ← Fase 2 (ex-components/DigitalSignature)
├── mdx/
│   ├── MdxComponents.tsx           ← Fase 4 (barrel — importa todos + re-exporta mdxComponents)
│   ├── RenderMdx.tsx               ← Fase 4
│   ├── Redacted.tsx                ← Fase 4
│   ├── Stamp.tsx                   ← Fase 4 (Stamp + 5 variantes)
│   ├── Classified.tsx              ← Fase 4
│   ├── Pullquote.tsx               ← Fase 4
│   ├── Caption.tsx                 ← Fase 4
│   ├── ForeignBody.tsx             ← Fase 4
│   ├── Translation.tsx             ← Fase 4
│   ├── Field.tsx                   ← Fase 4
│   ├── Signature.tsx               ← Fase 4
│   ├── Article.tsx                 ← Fase 4
│   ├── Transmission.tsx            ← Fase 4
│   ├── Evidence.tsx                ← Fase 4
│   ├── LogLine.tsx                 ← Fase 4
│   ├── CensorEntry.tsx             ← Fase 4
│   ├── Section.tsx                 ← Fase 4
│   ├── ProjectTOC.tsx              ← Fase 4
│   ├── interrogation/
│   │   ├── Exchange.tsx            ← Fase 4
│   │   └── Note.tsx                ← Fase 4
│   ├── comms/
│   │   └── Msg.tsx                 ← Fase 4 (Msg + FlagPhrase + Gap + Attachment)
│   ├── codex/
│   │   ├── Trait.tsx               ← Fase 4
│   │   ├── Warning.tsx             ← Fase 4
│   │   ├── RequirementList.tsx     ← Fase 4
│   │   └── Phase.tsx               ← Fase 4
│   └── project/
│       ├── Objective.tsx           ← Fase 4
│       ├── RecruitProfile.tsx      ← Fase 4
│       ├── AssetEntry.tsx          ← Fase 4
│       └── Safeguard.tsx           ← Fase 4
└── ui/
    ├── Folder.tsx                  ← Fase 2 (ex-components/batch/Folder)
    ├── ThemeToggle.tsx             ← Fase 2 (ex-components/ThemeToggle)
    ├── CrestSvg.tsx                ← Fase 2 (unificado de 2 origens)
    ├── Cell.tsx                    ← Fase 3 (ex-AutopsyTemplate)
    ├── StatusPanel.tsx             ← Fase 3 (ex-ClassifiedProjectTemplate)
    ├── MetaCell.tsx                ← Fase 3 (ex-ClassifiedProjectTemplate)
    ├── ThreatGauge.tsx             ← Fase 3 (ex-CodexEntryTemplate)
    ├── Sigil.tsx                   ← Fase 3 (ex-CodexEntryTemplate)
    ├── StatChip.tsx                ← Fase 3 (ex-CodexEntryTemplate)
    ├── PropagandaMotif.tsx         ← Fase 3 (ex-PropagandaTemplate)
    ├── Meta.tsx                    ← Fase 3 (ex-InterrogationTemplate)
    ├── PartyRow.tsx                ← Fase 3 (ex-InterrogationTemplate)
    ├── Row.tsx                     ← Fase 3 (ex-MedicalRecordTemplate)
    ├── FormField.tsx               ← Fase 3 (ex-OrderTemplate)
    ├── IdField.tsx                 ← Fase 3 (ex-IdCardTemplate)
    ├── batch-constants.ts          ← Fase 3 (ex-BatchTemplate)
```

**Total: 47 arquivos** (6 Fase 2 + 13 Fase 3 + 28 Fase 4)

## Componentes Extraídos por Fase

### Fase 2 — Componentes Compartilhados Movidos (6)
| Componente | Origem | Destino |
|---|---|---|
| `PaperSheet` | `components/DocumentHeader.tsx` | `general-components/paper/PaperSheet.tsx` |
| `ClassificationBar` | `components/DocumentHeader.tsx` | `general-components/stamps/ClassificationBar.tsx` |
| `DigitalSignature` | `components/DigitalSignature.tsx` | `general-components/signatures/DigitalSignature.tsx` |
| `ThemeToggle` | `components/ThemeToggle.tsx` | `general-components/ui/ThemeToggle.tsx` |
| `Folder` | `components/batch/Folder.tsx` | `general-components/ui/Folder.tsx` |
| `CrestSvg` | `CrestSvg.tsx` + `foreign/CrestSvg.tsx` | `general-components/ui/CrestSvg.tsx` (unificado) |

### Fase 3 — Componentes Internos Extraídos dos Templates (13)
| Componente | Template de Origem |
|---|---|
| `Cell` | AutopsyTemplate |
| `StatusPanel`, `MetaCell` | ClassifiedProjectTemplate |
| `ThreatGauge`, `Sigil`, `StatChip` | CodexEntryTemplate |
| `PropagandaMotif` | PropagandaTemplate |
| `Meta`, `PartyRow` | InterrogationTemplate |
| `Row` | MedicalRecordTemplate |
| `FormField` | OrderTemplate |
| `IdField` | IdCardTemplate |
| `batch-constants` | BatchTemplate |

### Fase 4 — Componentes MDX Extraídos (28)
| Componente | Subpasta |
|---|---|
| `MdxComponents` (barrel) | `mdx/` |
| `RenderMdx` | `mdx/` |
| `Redacted`, `Stamp` (+5 vars), `Classified`, `Pullquote`, `Caption`, `ForeignBody`, `Translation`, `Field`, `Signature`, `Article`, `Transmission`, `Evidence`, `LogLine`, `CensorEntry`, `Section`, `ProjectTOC` | `mdx/` |
| `Exchange`, `Note` | `mdx/interrogation/` |
| `Msg`, `FlagPhrase`, `Gap`, `Attachment` | `mdx/comms/Msg.tsx` |
| `Trait`, `Warning`, `RequirementList`, `Phase` | `mdx/codex/` |
| `Objective`, `RecruitProfile`, `AssetEntry`, `Safeguard` | `mdx/project/` |

## Imports Alterados (Fase 5)

Todos os 22 templates + `ArchiveShell.tsx` + `lib/mdx-components.tsx` + `general-components/mdx/MdxComponents.tsx` tiveram imports corrigidos. Padrão de mudança:

```
../components/DocumentHeader        → ../general-components/paper/PaperSheet
                                     + ../general-components/stamps/ClassificationBar
../components/DigitalSignature      → ../general-components/signatures/DigitalSignature
../components/batch/Folder          → ../general-components/ui/Folder
../components/ThemeToggle           → ../general-components/ui/ThemeToggle
../foreign/CrestSvg                 → ../general-components/ui/CrestSvg
```

### Arquivos modificados
- `_import/lib/mdx-components.tsx`
- `_import/ArchiveShell.tsx`
- Todos os 22 templates em `_import/*-template/`
- `_import/general-components/mdx/MdxComponents.tsx`
- `_import/general-components/mdx/project/AssetEntry.tsx` (importa `Redacted` de `../Redacted`)

## Arquivos Removidos (Fase 6)

| Arquivo | Motivo |
|---|---|
| `_import/components/DigitalSignature.tsx` | Movido |
| `_import/components/DocumentHeader.tsx` | Dividido |
| `_import/components/ThemeToggle.tsx` | Movido |
| `_import/components/batch/Folder.tsx` | Movido |
| `_import/components/batch/` | Vazio |
| `_import/components/` | Stale |
| `_import/document-header/DocumentHeader.tsx` | Stale (cópia extra) |
| `_import/document-header/` | Stale |
| `_import/CrestSvg.tsx` | Unificado |
| `_import/foreign/CrestSvg.tsx` | Unificado |
| `_import/foreign/` | Vazio |
| `_import/MdxComponents.tsx` (705 linhas) | Versão TanStack obsoleta |
| `_import/DigitalSignature.tsx` (root) | Duplicata com comentários |
| `_import/batch/` | Vazio |

## Resultado do Build

```
npx tsc --noEmit → 0 erros novos
```

Apenas 11 erros pré-existentes não relacionados (missing modules: `@/lib/educations`, `@/lib/experiences`, `@/lib/source`, `@/lib/projects`, `framer-motion`, `slugify`, `fumadocs-ui/mdx`, `@tanstack/react-router`). Nenhum erro nos arquivos de `_import/` ou `general-components/`.

## Próximos Passos

1. **Etapa 3** — Reorganizar material velho em `components/individual-layouts/` e migrar para `components/documents/`
2. **Etapa 4** — Migrar material novo (`_import/`) para estrutura `components/documents/`
3. **Etapa 5** — Rota `/archive` com Tabs shadcn/ui mostrando todo o acervo
