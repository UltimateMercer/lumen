# Etapa 3 — Reorganização do Material Velho

## Objetivo

Mover o material de `components/individual-layouts/` para a nova estrutura sob `components/documents/` e `components/archives/`, garantindo que os documentos de personagem continuem funcionando.

## Estrutura Final

```
components/
├── documents/
│   ├── templates/
│   │   ├── permit-card.tsx
│   │   ├── profile-id.tsx
│   │   └── school-final-evaluation.tsx
│   └── general-components/
│       ├── paper/
│       │   ├── Paper.tsx
│       │   ├── SectionPaper.tsx
│       │   ├── SectionTitle.tsx
│       │   ├── PaperHeader.tsx
│       │   ├── PaperSubject.tsx
│       │   └── PaperFooter.tsx
│       ├── stamps/
│       │   ├── AccessLevel7Only.tsx
│       │   ├── FinalReminder.tsx
│       │   └── StampRepAurora.tsx
│       ├── signatures/
│       │   ├── DigitalSignature.tsx
│       │   └── ResponsibleSignatures.tsx
│       ├── ui/
│       │   ├── ItemValue.tsx
│       │   ├── ProfileName.tsx
│       │   ├── NexusFormatDate.tsx
│       │   └── ProtectDocText.tsx
│       └── evaluation/
│           ├── table-energy.tsx
│           ├── table-physical.tsx
│           ├── table-power-attributes.tsx
│           ├── table-additional-test.tsx
│           ├── table-affinities.tsx
│           ├── total-power-base.tsx
│           ├── tier-total-score.tsx
│           ├── personal-info-school-evaluation.tsx
│           └── final-evaluation-info.tsx
└── archives/
    └── individuals/
        ├── ultimate-archive.tsx
        ├── diana-watson-archive.tsx
        └── kendra-connors-archive.tsx
```

## Arquivos Movidos (Origem → Destino)

### Templates (3)
| Origem | Destino |
|---|---|
| `individual-layouts/documents/permit-card.tsx` | `documents/templates/permit-card.tsx` |
| `individual-layouts/documents/profile-id.tsx` | `documents/templates/profile-id.tsx` |
| `individual-layouts/documents/school-final-evaluation-doc.tsx` | `documents/templates/school-final-evaluation.tsx` |

### paper/ (6)
| Origem | Destino |
|---|---|
| `individual-layouts/general-components/paper.tsx` | `documents/general-components/paper/Paper.tsx` |
| `individual-layouts/general-components/section-paper.tsx` | `documents/general-components/paper/SectionPaper.tsx` |
| `individual-layouts/general-components/section-title.tsx` | `documents/general-components/paper/SectionTitle.tsx` |
| `individual-layouts/general-components/paper-header.tsx` | `documents/general-components/paper/PaperHeader.tsx` |
| `individual-layouts/general-components/paper-subject.tsx` | `documents/general-components/paper/PaperSubject.tsx` |
| `individual-layouts/general-components/paper-footer.tsx` | `documents/general-components/paper/PaperFooter.tsx` |

### stamps/ (3)
| Origem | Destino |
|---|---|
| `individual-layouts/general-components/access-level-7-only.tsx` | `documents/general-components/stamps/AccessLevel7Only.tsx` |
| `individual-layouts/general-components/final-reminder.tsx` | `documents/general-components/stamps/FinalReminder.tsx` |
| `individual-layouts/general-components/stamp-rep-aurora.tsx` | `documents/general-components/stamps/StampRepAurora.tsx` |

### signatures/ (2)
| Origem | Destino |
|---|---|
| `individual-layouts/general-components/digital-signature.tsx` | `documents/general-components/signatures/DigitalSignature.tsx` |
| `individual-layouts/general-components/responsible-signatures.tsx` | `documents/general-components/signatures/ResponsibleSignatures.tsx` |

### ui/ (4)
| Origem | Destino |
|---|---|
| `individual-layouts/general-components/item-value.tsx` | `documents/general-components/ui/ItemValue.tsx` |
| `individual-layouts/general-components/profile-name.tsx` | `documents/general-components/ui/ProfileName.tsx` |
| `individual-layouts/general-components/nexus-format-date.tsx` | `documents/general-components/ui/NexusFormatDate.tsx` |
| `individual-layouts/general-components/protect-doc-text.tsx` | `documents/general-components/ui/ProtectDocText.tsx` |

### evaluation/ (9)
| Origem | Destino |
|---|---|
| `individual-layouts/general-components/table-energy.tsx` | `documents/general-components/evaluation/table-energy.tsx` |
| `individual-layouts/general-components/table-physical.tsx` | `documents/general-components/evaluation/table-physical.tsx` |
| `individual-layouts/general-components/table-power-attributes.tsx` | `documents/general-components/evaluation/table-power-attributes.tsx` |
| `individual-layouts/general-components/table-additional-test.tsx` | `documents/general-components/evaluation/table-additional-test.tsx` |
| `individual-layouts/general-components/table-affinities.tsx` | `documents/general-components/evaluation/table-affinities.tsx` |
| `individual-layouts/general-components/total-power-base.tsx` | `documents/general-components/evaluation/total-power-base.tsx` |
| `individual-layouts/general-components/tier-total-score.tsx` | `documents/general-components/evaluation/tier-total-score.tsx` |
| `individual-layouts/general-components/personal-info-school-evaluation.tsx` | `documents/general-components/evaluation/personal-info-school-evaluation.tsx` |
| `individual-layouts/general-components/final-evaluation-info.tsx` | `documents/general-components/evaluation/final-evaluation-info.tsx` |

### energy-calculator.ts (1 — movido separadamente)
| Origem | Destino |
|---|---|
| `individual-layouts/general-components/energy-calculator.ts` | `lib/power-system/energy-calculator.ts` |

### Layouts de personagem (3)
| Origem | Destino | Export mantido |
|---|---|---|
| `individual-layouts/ultimate-layout.tsx` | `archives/individuals/ultimate-archive.tsx` | `UltimateLayout` |
| `individual-layouts/diana-watson-layout.tsx` | `archives/individuals/diana-watson-archive.tsx` | `DianaWatsonLayout` |
| `individual-layouts/kendra-connors-layout.tsx` | `archives/individuals/kendra-connors-archive.tsx` | `KendraConnorsLayout` |

## Imports Atualizados

### Internos dos templates (relative paths)
Todos os 3 templates tiveram imports de `../general-components/X` atualizados para `../general-components/{categoria}/X` (ex: `section-paper` → `paper/SectionPaper`, `item-value` → `ui/ItemValue`, `table-energy` → `evaluation/table-energy`).

### Internos dos general-components (cross-category)
| Arquivo | Import antigo | Import novo |
|---|---|---|
| `paper/PaperSubject.tsx` | `./section-paper` | `./SectionPaper` |
| `paper/PaperSubject.tsx` | `./access-level-7-only` | `../stamps/AccessLevel7Only` |
| `paper/PaperFooter.tsx` | `./item-value` | `../ui/ItemValue` |
| `paper/PaperFooter.tsx` | `./section-paper` | `./SectionPaper` |
| `paper/PaperFooter.tsx` | `./final-reminder` | `../stamps/FinalReminder` |
| `stamps/FinalReminder.tsx` | `./section-paper` | `../paper/SectionPaper` |
| `signatures/DigitalSignature.tsx` | `./nexus-format-date` | `../ui/NexusFormatDate` |
| `signatures/ResponsibleSignatures.tsx` | `./digital-signature` | `./DigitalSignature` |
| `evaluation/final-evaluation-info.tsx` | `./item-value` | `../ui/ItemValue` |
| `evaluation/final-evaluation-info.tsx` | `./nexus-format-date` | `../ui/NexusFormatDate` |
| `evaluation/final-evaluation-info.tsx` | `./section-paper` | `../paper/SectionPaper` |
| `evaluation/final-evaluation-info.tsx` | `./section-title` | `../paper/SectionTitle` |
| `evaluation/personal-info-school-evaluation.tsx` | `./item-value` | `../ui/ItemValue` |
| `evaluation/personal-info-school-evaluation.tsx` | `./nexus-format-date` | `../ui/NexusFormatDate` |
| `evaluation/personal-info-school-evaluation.tsx` | `./section-paper` | `../paper/SectionPaper` |

### Externos
| Arquivo | Import antigo | Import novo |
|---|---|---|
| `data/individuals.ts` | `@/components/individual-layouts/...` | `@/components/archives/individuals/...` |
| `lib/power-system/index.ts` | `@/components/individual-layouts/general-components/energy-calculator` | `./energy-calculator` |
| `lib/power-system/calculator.ts` | `@/components/individual-layouts/general-components/energy-calculator` | `./energy-calculator` |
| `app/demo/page.tsx` | `@/components/individual-layouts/general-components/nexus-format-date` | `@/components/documents/general-components/ui/NexusFormatDate` |

## Arquivos Removidos

`components/individual-layouts/` (31 arquivos, completamente removido)

## Resultado do Build

```
npx tsc --noEmit → 0 erros novos
```

Apenas erros pré-existentes não relacionados (missing modules).

## O que vem na Etapa 4

Migrar o material novo (`_import/`) para a estrutura `components/documents/`, unificando tudo:
- 22 templates MDX → `components/documents/templates/`
- 47 componentes extraídos → `components/documents/general-components/` (fundir com os 27 desta etapa)
- `RenderMdx` + barrel `MdxComponents`
- `TEMPLATES` registry unificado
