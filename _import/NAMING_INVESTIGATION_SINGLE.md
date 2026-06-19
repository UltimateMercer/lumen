# Single-Word Naming Investigation

Data: 18-Jun-2026 21:00 BRT
Escopo: `components/`, `lib/`, `utils/`
Tipo: leitura-only — sem renomeações executadas

---

## Resumo

| Métrica | Valor |
|---|---|
| Arquivos a renomear (single-word PascalCase → lowercase) | **26** |
| `lib/` ou `utils/` afetados | **0** (todos já lowercase) |
| Barrel files que precisam de update | **1** (`components/documents/index.ts` — não importa nenhum destes) |
| Config files afetados (tsconfig, next.config) | **0** |
| Imports afetados (estimativa total) | **44** |

---

## Arquivos a renomear

| # | Caminho atual | Caminho proposto |
|---|---|---|
| 1 | `components/documents/general-components/paper/Paper.tsx` | `components/documents/general-components/paper/paper.tsx` |
| 2 | `components/documents/general-components/mdx/Pullquote.tsx` | `components/documents/general-components/mdx/pullquote.tsx` |
| 3 | `components/documents/general-components/mdx/Classified.tsx` | `components/documents/general-components/mdx/classified.tsx` |
| 4 | `components/documents/general-components/mdx/interrogation/Note.tsx` | `components/documents/general-components/mdx/interrogation/note.tsx` |
| 5 | `components/documents/general-components/mdx/interrogation/Exchange.tsx` | `components/documents/general-components/mdx/interrogation/exchange.tsx` |
| 6 | `components/documents/general-components/mdx/Transmission.tsx` | `components/documents/general-components/mdx/transmission.tsx` |
| 7 | `components/documents/general-components/mdx/Field.tsx` | `components/documents/general-components/mdx/field.tsx` |
| 8 | `components/documents/general-components/mdx/Translation.tsx` | `components/documents/general-components/mdx/translation.tsx` |
| 9 | `components/documents/general-components/mdx/codex/Phase.tsx` | `components/documents/general-components/mdx/codex/phase.tsx` |
| 10 | `components/documents/general-components/mdx/codex/Warning.tsx` | `components/documents/general-components/mdx/codex/warning.tsx` |
| 11 | `components/documents/general-components/mdx/codex/Trait.tsx` | `components/documents/general-components/mdx/codex/trait.tsx` |
| 12 | `components/documents/general-components/mdx/Stamp.tsx` | `components/documents/general-components/mdx/stamp.tsx` |
| 13 | `components/documents/general-components/mdx/project/Safeguard.tsx` | `components/documents/general-components/mdx/project/safeguard.tsx` |
| 14 | `components/documents/general-components/mdx/project/Objective.tsx` | `components/documents/general-components/mdx/project/objective.tsx` |
| 15 | `components/documents/general-components/mdx/comms/Msg.tsx` | `components/documents/general-components/mdx/comms/msg.tsx` |
| 16 | `components/documents/general-components/mdx/Section.tsx` | `components/documents/general-components/mdx/section.tsx` |
| 17 | `components/documents/general-components/mdx/Signature.tsx` | `components/documents/general-components/mdx/signature.tsx` |
| 18 | `components/documents/general-components/mdx/Article.tsx` | `components/documents/general-components/mdx/article.tsx` |
| 19 | `components/documents/general-components/mdx/Evidence.tsx` | `components/documents/general-components/mdx/evidence.tsx` |
| 20 | `components/documents/general-components/mdx/Caption.tsx` | `components/documents/general-components/mdx/caption.tsx` |
| 21 | `components/documents/general-components/mdx/Redacted.tsx` | `components/documents/general-components/mdx/redacted.tsx` |
| 22 | `components/documents/general-components/ui/Row.tsx` | `components/documents/general-components/ui/row.tsx` |
| 23 | `components/documents/general-components/ui/Meta.tsx` | `components/documents/general-components/ui/meta.tsx` |
| 24 | `components/documents/general-components/ui/Cell.tsx` | `components/documents/general-components/ui/cell.tsx` |
| 25 | `components/documents/general-components/ui/Folder.tsx` | `components/documents/general-components/ui/folder.tsx` |
| 26 | `components/documents/general-components/ui/Sigil.tsx` | `components/documents/general-components/ui/sigil.tsx` |

---

## Impacto por arquivo

### 1. Paper.tsx → paper.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 12 | `import { Paper } from "@/components/documents/general-components/paper/Paper"` |
| 2 | `components/documents/templates/school-final-evaluation.tsx` | 10 | `import { Paper } from "../general-components/paper/Paper"` |
| 3 | `components/documents/templates/profile-id.tsx` | 2 | `import { Paper } from "../general-components/paper/Paper"` |
| 4 | `components/documents/templates/permit-card.tsx` | 4 | `import { Paper } from "../general-components/paper/Paper"` |
| 5 | `components/documents/templates/trial/trial-school-final-evaluation.tsx` | 21 | `import { Paper } from "../../general-components/paper/Paper"` |

### 2. Pullquote.tsx → pullquote.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 37 | `import { Pullquote } from "@/components/documents/general-components/mdx/Pullquote"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 14 | `import { Pullquote } from "./Pullquote"` |

### 3. Classified.tsx → classified.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 35 | `import { Classified } from "@/components/documents/general-components/mdx/Classified"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 6 | `import { Classified } from "./Classified"` |

### 4. Note.tsx → note.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 50 | `import { Note } from "@/components/documents/general-components/mdx/interrogation/Note"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 17 | `import { Note } from "./interrogation/Note"` |

### 5. Exchange.tsx → exchange.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 49 | `import { Exchange } from "@/components/documents/general-components/mdx/interrogation/Exchange"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 16 | `import { Exchange } from "./interrogation/Exchange"` |

### 6. Transmission.tsx → transmission.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 45 | `import { Transmission } from "@/components/documents/general-components/mdx/Transmission"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 10 | `import { Transmission } from "./Transmission"` |

### 7. Field.tsx → field.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 36 | `import { Field } from "@/components/documents/general-components/mdx/Field"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 7 | `import { Field } from "./Field"` |

### 8. Translation.tsx → translation.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 47 | `import { Translation } from "@/components/documents/general-components/mdx/Translation"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 19 | `import { Translation } from "./Translation"` |

### 9. Phase.tsx → phase.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 57 | `import { Phase } from "@/components/documents/general-components/mdx/codex/Phase"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 24 | `import { Phase } from "./codex/Phase"` |

### 10. Warning.tsx → warning.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 55 | `import { Warning } from "@/components/documents/general-components/mdx/codex/Warning"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 22 | `import { Warning } from "./codex/Warning"` |

### 11. Trait.tsx → trait.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 54 | `import { Trait } from "@/components/documents/general-components/mdx/codex/Trait"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 21 | `import { Trait } from "./codex/Trait"` |

### 12. Stamp.tsx → stamp.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 33-34 | `Stamp, ApprovedStamp, DeniedStamp, ClassifiedStamp, ArchivedStamp, UrgentStamp } from "@/components/documents/general-components/mdx/Stamp"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 5 | `import { Stamp, ApprovedStamp, DeniedStamp, ClassifiedStamp, ArchivedStamp, UrgentStamp } from "./Stamp"` |
| 3 | `components/documents/templates/foreign-letter-template.tsx` | 4 | `import { Stamp } from "../general-components/mdx/Stamp"` |
| 4 | `components/documents/templates/monitored-thread-template.tsx` | 4 | `import { Stamp } from "../general-components/mdx/Stamp"` |
| 5 | `components/documents/templates/medical-record-template.tsx` | 4 | `import { Stamp } from "../general-components/mdx/Stamp"` |
| 6 | `components/documents/templates/classified-project-template.tsx` | 4 | `import { Stamp } from "../general-components/mdx/Stamp"` |

### 13. Safeguard.tsx → safeguard.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 61 | `import { Safeguard } from "@/components/documents/general-components/mdx/project/Safeguard"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 27 | `import { Safeguard } from "./project/Safeguard"` |

### 14. Objective.tsx → objective.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 58 | `import { Objective } from "@/components/documents/general-components/mdx/project/Objective"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 28 | `import { Objective } from "./project/Objective"` |

### 15. Msg.tsx → msg.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 52-53 | `Msg, FlagPhrase, Gap, Attachment } from "@/components/documents/general-components/mdx/comms/Msg"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 20 | `import { Msg, FlagPhrase, Gap, Attachment } from "./comms/Msg"` |

### 16. Section.tsx → section.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 43 | `import { Section } from "@/components/documents/general-components/mdx/Section"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 29 | `import { Section } from "./Section"` |

### 17. Signature.tsx → signature.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 44 | `import { Signature } from "@/components/documents/general-components/mdx/Signature"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 8 | `import { Signature } from "./Signature"` |

### 18. Article.tsx → article.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 39 | `import { Article } from "@/components/documents/general-components/mdx/Article"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 9 | `import { Article } from "./Article"` |

### 19. Evidence.tsx → evidence.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 41 | `import { Evidence } from "@/components/documents/general-components/mdx/Evidence"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 11 | `import { Evidence } from "./Evidence"` |

### 20. Caption.tsx → caption.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 38 | `import { Caption } from "@/components/documents/general-components/mdx/Caption"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 15 | `import { Caption } from "./Caption"` |

### 21. Redacted.tsx → redacted.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `app/archive/page.tsx` | 31 | `import { Redacted } from "@/components/documents/general-components/mdx/Redacted"` |
| 2 | `components/documents/general-components/mdx/mdx-components.tsx` | 4 | `import { Redacted } from "./Redacted"` |
| 3 | `components/documents/general-components/mdx/project/asset-entry.tsx` | 3 | `import { Redacted } from "../Redacted"` |
| 4 | `components/documents/templates/classified-project-template.tsx` | 5 | `import { Redacted } from "../general-components/mdx/Redacted"` |

### 22. Row.tsx → row.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| | *Nenhum import encontrado* | | |

### 23. Meta.tsx → meta.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| | *Nenhum import encontrado* | | |

### 24. Cell.tsx → cell.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| | *Nenhum import encontrado* | | |

### 25. Folder.tsx → folder.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| 1 | `components/documents/templates/batch-template.tsx` | 8 | `import { Folder } from "../general-components/ui/Folder"` |

### 26. Sigil.tsx → sigil.tsx
| # | Arquivo | Linha | Import |
|---|---|---|---|
| | *Nenhum import encontrado* | | |

---

## Crossing the `components/ui/` boundary

Files under `components/ui/` (shadcn/ui) are intentionally excluded:
- They are single-word PascalCase by convention (e.g., `Button.tsx`, `Card.tsx`, `Input.tsx`)
- They are never imported by project code via explicit path — always via `@/components/ui/button`
- The shadcn/ui convention keeps them PascalCase; renaming them would break `@/components/ui/*` imports throughout the project
- **Suggested rule**: exclude `components/ui/` (shadcn) from any single-word renaming

---

## Notas

- `components/documents/general-components/mdx/mdx-components.tsx` imports 19 destes 26 arquivos — é o maior consumidor
- 4 arquivos ui/ (`Row.tsx`, `Meta.tsx`, `Cell.tsx`, `Sigil.tsx`) têm **zero imports** — existem como ativos não referenciados
- `components/documents/index.ts` não importa nenhum destes arquivos diretamente (o barrel só importa templates)
- Após a renomeação, `git mv` preservará o histórico de cada arquivo
- `npx tsc --noEmit` deve ser executado após cada batch

