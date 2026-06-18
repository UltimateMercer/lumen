# Naming Investigation

Data: 17-Jun-2026 22:00 BRT
Escopo: `components/`, `lib/`, `utils/`
Tipo: ~~leitura-only — sem renomeações executadas~~ **TODAS AS 62 RENOMEAÇÕES EXECUTADAS EM 18-Jun-2026 20:52 BRT (Fase 5c)**

---

## Resumo

| Métrica | Valor |
|---|---|
| Arquivos a renomear (PascalCase → kebab-case) | **62** |
| `lib/` ou `utils/` afetados | **0** (todos já lowercase/kebab) |
| Arquivos single-word (excluídos) | ~30 (Paper, Stamp, Article, etc.) |
| Barrel files que precisam de update | **2** |
| Config files afetados (tsconfig, next.config) | **0** |
| Imports afetados (estimativa total) | **~220-280** |

---

## Arquivos a renomear

### `components/` (raiz) — 3 arquivos

| Atual | Proposto |
|---|---|
| `components/ArchiveShell.tsx` | `components/archive-shell.tsx` |
| `components/IndividualResolver.tsx` | `components/individual-resolver.tsx` |
| `components/RotatingText/RotatingText.tsx` | `components/RotatingText/rotating-text.tsx` |

> Nota: o diretório `RotatingText/` também está em PascalCase. Se quiser consistência total, viraria `rotating-text/`.

### `components/documents/general-components/mdx/` — 6 + 3 em subdirs

| Atual | Proposto |
|---|---|
| `.../mdx/CensorEntry.tsx` | `.../mdx/censor-entry.tsx` |
| `.../mdx/ForeignBody.tsx` | `.../mdx/foreign-body.tsx` |
| `.../mdx/LogLine.tsx` | `.../mdx/log-line.tsx` |
| `.../mdx/MdxComponents.tsx` | `.../mdx/mdx-components.tsx` |
| `.../mdx/ProjectTOC.tsx` | `.../mdx/project-toc.tsx` |
| `.../mdx/RenderMdx.tsx` | `.../mdx/render-mdx.tsx` |
| `.../mdx/codex/RequirementList.tsx` | `.../mdx/codex/requirement-list.tsx` |
| `.../mdx/project/AssetEntry.tsx` | `.../mdx/project/asset-entry.tsx` |
| `.../mdx/project/RecruitProfile.tsx` | `.../mdx/project/recruit-profile.tsx` |

### `components/documents/general-components/paper/` — 6

| Atual | Proposto |
|---|---|
| `.../paper/PaperFooter.tsx` | `.../paper/paper-footer.tsx` |
| `.../paper/PaperHeader.tsx` | `.../paper/paper-header.tsx` |
| `.../paper/PaperSheet.tsx` | `.../paper/paper-sheet.tsx` |
| `.../paper/PaperSubject.tsx` | `.../paper/paper-subject.tsx` |
| `.../paper/SectionPaper.tsx` | `.../paper/section-paper.tsx` |
| `.../paper/SectionTitle.tsx` | `.../paper/section-title.tsx` |

### `components/documents/general-components/signatures/` — 2

| Atual | Proposto |
|---|---|
| `.../signatures/DigitalSignature.tsx` | `.../signatures/digital-signature.tsx` |
| `.../signatures/ResponsibleSignatures.tsx` | `.../signatures/responsible-signatures.tsx` |

### `components/documents/general-components/stamps/` — 4

| Atual | Proposto |
|---|---|
| `.../stamps/AccessLevel7Only.tsx` | `.../stamps/access-level7-only.tsx` |
| `.../stamps/ClassificationBar.tsx` | `.../stamps/classification-bar.tsx` |
| `.../stamps/FinalReminder.tsx` | `.../stamps/final-reminder.tsx` |
| `.../stamps/StampRepAurora.tsx` | `.../stamps/stamp-rep-aurora.tsx` |

### `components/documents/general-components/ui/` — 14

| Atual | Proposto |
|---|---|
| `.../ui/CrestSvg.tsx` | `.../ui/crest-svg.tsx` |
| `.../ui/FormField.tsx` | `.../ui/form-field.tsx` |
| `.../ui/IdField.tsx` | `.../ui/id-field.tsx` |
| `.../ui/ItemValue.tsx` | `.../ui/item-value.tsx` |
| `.../ui/MetaCell.tsx` | `.../ui/meta-cell.tsx` |
| `.../ui/NexusFormatDate.tsx` | `.../ui/nexus-format-date.tsx` |
| `.../ui/PartyRow.tsx` | `.../ui/party-row.tsx` |
| `.../ui/ProfileName.tsx` | `.../ui/profile-name.tsx` |
| `.../ui/PropagandaMotif.tsx` | `.../ui/propaganda-motif.tsx` |
| `.../ui/ProtectDocText.tsx` | `.../ui/protect-doc-text.tsx` |
| `.../ui/StatChip.tsx` | `.../ui/stat-chip.tsx` |
| `.../ui/StatusPanel.tsx` | `.../ui/status-panel.tsx` |
| `.../ui/ThemeToggle.tsx` | `.../ui/theme-toggle.tsx` |
| `.../ui/ThreatGauge.tsx` | `.../ui/threat-gauge.tsx` |

### `components/documents/templates/` — 24

| Atual | Proposto |
|---|---|
| `.../templates/AiLogTemplate.tsx` | `.../templates/ai-log-template.tsx` |
| `.../templates/AutopsyTemplate.tsx` | `.../templates/autopsy-template.tsx` |
| `.../templates/BatchTemplate.tsx` | `.../templates/batch-template.tsx` |
| `.../templates/BountyTemplate.tsx` | `.../templates/bounty-template.tsx` |
| `.../templates/BroadcastTemplate.tsx` | `.../templates/broadcast-template.tsx` |
| `.../templates/BulletinTemplate.tsx` | `.../templates/bulletin-template.tsx` |
| `.../templates/ClassifiedProjectTemplate.tsx` | `.../templates/classified-project-template.tsx` |
| `.../templates/CodexEntryTemplate.tsx` | `.../templates/codex-entry-template.tsx` |
| `.../templates/DecreeTemplate.tsx` | `.../templates/decree-template.tsx` |
| `.../templates/DossierTemplate.tsx` | `.../templates/dossier-template.tsx` |
| `.../templates/ForeignLetterTemplate.tsx` | `.../templates/foreign-letter-template.tsx` |
| `.../templates/ForensicTemplate.tsx` | `.../templates/forensic-template.tsx` |
| `.../templates/IdCardTemplate.tsx` | `.../templates/id-card-template.tsx` |
| `.../templates/IncidentTemplate.tsx` | `.../templates/incident-template.tsx` |
| `.../templates/InterrogationTemplate.tsx` | `.../templates/interrogation-template.tsx` |
| `.../templates/ManifestoTemplate.tsx` | `.../templates/manifesto-template.tsx` |
| `.../templates/MedicalRecordTemplate.tsx` | `.../templates/medical-record-template.tsx` |
| `.../templates/MemoTemplate.tsx` | `.../templates/memo-template.tsx` |
| `.../templates/MonitoredThreadTemplate.tsx` | `.../templates/monitored-thread-template.tsx` |
| `.../templates/NewsTemplate.tsx` | `.../templates/news-template.tsx` |
| `.../templates/OrderTemplate.tsx` | `.../templates/order-template.tsx` |
| `.../templates/PropagandaTemplate.tsx` | `.../templates/propaganda-template.tsx` |
| `.../templates/TransmissionTemplate.tsx` | `.../templates/transmission-template.tsx` |
| `.../templates/trial/TrialSchoolFinalEvaluation.tsx` | `.../templates/trial/trial-school-final-evaluation.tsx` |

---

## Impacto por arquivo renomeado

### IndividualResolver.tsx → individual-resolver.tsx

1 import afetado:

| Arquivo | Linha | Atual | Novo |
|---|---|---|---|
| `data/document-generators.tsx` | 5 | `import { IndividualResolver } from "@/components/IndividualResolver"` | `import { IndividualResolver } from "@/components/individual-resolver"` |

### RotatingText/RotatingText.tsx → RotatingText/rotating-text.tsx

1 import afetado:

| Arquivo | Linha | Atual | Novo |
|---|---|---|---|
| `components/presentation.tsx` | 4 | `import RotatingText from "@/components/RotatingText/RotatingText"` | `import RotatingText from "@/components/RotatingText/rotating-text"` |

### ArchiveShell.tsx → archive-shell.tsx

0 imports (é um componente raiz, não importado por ninguém atualmente).

### PaperSheet.tsx → paper-sheet.tsx

16 imports:

| Arquivo | Linha |
|---|---|
| `app/archive/page.tsx` | 29 |
| `components/documents/templates/AutopsyTemplate.tsx` | 4 |
| `components/documents/templates/BatchTemplate.tsx` | 6 |
| `components/documents/templates/BountyTemplate.tsx` | 4 |
| `components/documents/templates/BroadcastTemplate.tsx` | 4 |
| `components/documents/templates/BulletinTemplate.tsx` | 4 |
| `components/documents/templates/ClassifiedProjectTemplate.tsx` | 7 |
| `components/documents/templates/CodexEntryTemplate.tsx` | 4 |
| `components/documents/templates/DecreeTemplate.tsx` | 4 |
| `components/documents/templates/DossierTemplate.tsx` | 4 |
| `components/documents/templates/ForeignLetterTemplate.tsx` | 4 |
| `components/documents/templates/ForensicTemplate.tsx` | 4 |
| `components/documents/templates/IdCardTemplate.tsx` | 4 |
| `components/documents/templates/IncidentTemplate.tsx` | 4 |
| `components/documents/templates/InterrogationTemplate.tsx` | 4 |
| `components/documents/templates/MedicalRecordTemplate.tsx` | 5 |
| `components/documents/templates/MemoTemplate.tsx` | 4 |
| `components/documents/templates/MonitoredThreadTemplate.tsx` | 5 |
| `components/documents/templates/NewsTemplate.tsx` | 4 |
| `components/documents/templates/OrderTemplate.tsx` | 4 |
| `components/documents/templates/propaganda.tsx` | — |
| ... (outros templates) | |

> Padrão consistente: `import { PaperSheet } from "../general-components/paper/PaperSheet"` em todos.

### ClassificationBar.tsx → classification-bar.tsx

13 imports (todos os templates com `DocumentType` + `app/archive/page.tsx`).

Mesmo padrão: `import { ClassificationBar } from "../general-components/stamps/ClassificationBar"`.

### RenderMdx.tsx → render-mdx.tsx

19 imports (quase todos os templates):

| Arquivos |
|---|
| AiLogTemplate, AutopsyTemplate, BatchTemplate, BountyTemplate, BroadcastTemplate, BulletinTemplate, ClassifiedProjectTemplate, CodexEntryTemplate, DecreeTemplate, DossierTemplate, ForensicTemplate, ForeignLetterTemplate, IdCardTemplate, IncidentTemplate, InterrogationTemplate, ManifestoTemplate, MedicalRecordTemplate, MemoTemplate, MonitoredThreadTemplate, NewsTemplate, OrderTemplate, PropagandaTemplate, TransmissionTemplate |

### DigitalSignature.tsx → digital-signature.tsx

8 imports:

| Arquivo | Linha |
|---|---|
| `app/archive/page.tsx` | 21 |
| `MdxComponents.tsx` | 31 |
| `ClassifiedProjectTemplate.tsx` | 9 |
| `CodexEntryTemplate.tsx` | 6 |
| `InterrogationTemplate.tsx` | 6 |
| `MedicalRecordTemplate.tsx` | 7 |
| `MonitoredThreadTemplate.tsx` | 7 |

### StampRepAurora.tsx → stamp-rep-aurora.tsx

5 imports:

| Arquivo | Linha |
|---|---|
| `app/archive/page.tsx` | 20 |
| `school-final-evaluation.tsx` | 7 |
| `permit-card.tsx` | 18 |
| `profile-id.tsx` | 10 |
| `trial/TrialSchoolFinalEvaluation.tsx` | 18 |

### PaperHeader.tsx → paper-header.tsx

8 imports: `app/archive/page.tsx` + school-final-evaluation, permit-card, profile-id, TrialSchoolFinalEvaluation + 3 `*-archive.tsx`.

### PaperSubject.tsx → paper-subject.tsx

5 imports: `app/archive/page.tsx` + school-final-evaluation, profile-id, TrialSchoolFinalEvaluation + 3 `*-archive.tsx`.

### SectionPaper.tsx → section-paper.tsx

7 imports: `app/archive/page.tsx` + school-final-evaluation, permit-card, profile-id, TrialSchoolFinalEvaluation + 3 `*-archive.tsx`.

### SectionTitle.tsx → section-title.tsx

5 imports: `app/archive/page.tsx` + school-final-evaluation, permit-card, TrialSchoolFinalEvaluation + 3 `*-archive.tsx`.

### PaperFooter.tsx → paper-footer.tsx

4 imports: `app/archive/page.tsx` + school-final-evaluation, TrialSchoolFinalEvaluation + 3 `*-archive.tsx`.

### ResponsibleSignatures.tsx → responsible-signatures.tsx

5 imports: `app/archive/page.tsx` + school-final-evaluation, permit-card, profile-id, TrialSchoolFinalEvaluation.

### ItemValue.tsx → item-value.tsx

3 imports: `app/archive/page.tsx` + permit-card, profile-id.

### NexusFormatDate.tsx → nexus-format-date.tsx

4 imports: `app/archive/page.tsx` + `app/demo/page.tsx` + permit-card, profile-id.

### ProfileName.tsx → profile-name.tsx

2 imports: `app/archive/page.tsx` + profile-id.

### ProtectDocText.tsx → protect-doc-text.tsx

5 imports: `app/archive/page.tsx` + school-final-evaluation, permit-card, profile-id, TrialSchoolFinalEvaluation.

### ProjectTOC.tsx → project-toc.tsx

2 imports: `app/archive/page.tsx` + ClassifiedProjectTemplate.

### LogLine.tsx → log-line.tsx

1 import: `app/archive/page.tsx`.

### CensorEntry.tsx → censor-entry.tsx

1 import: `app/archive/page.tsx`.

### ForeignBody.tsx → foreign-body.tsx

1 import: `app/archive/page.tsx`.

### CrestSvg.tsx → crest-svg.tsx

1 import: `ForeignLetterTemplate.tsx`.

### RequirementList.tsx → requirement-list.tsx

1 import: `MdxComponents.tsx`.

### RecruitProfile.tsx → recruit-profile.tsx

1 import: `MdxComponents.tsx`.

### AssetEntry.tsx → asset-entry.tsx

1 import: `MdxComponents.tsx`.

### AccessLevel7Only.tsx → access-level7-only.tsx

1 import: `app/archive/page.tsx`.

### FinalReminder.tsx → final-reminder.tsx

1 import: `app/archive/page.tsx`.

### ThemeToggle.tsx → theme-toggle.tsx

1 import: `ArchiveShell.tsx`.

### FormField.tsx, IdField.tsx, MetaCell.tsx, PartyRow.tsx, PropagandaMotif.tsx, StatChip.tsx, StatusPanel.tsx, ThreatGauge.tsx

Nenhum import ativo encontrado — são componentes definidos mas aparentemente não importados em lugar nenhum (exceto talvez dinamicamente).

---

## Barrel files afetados

### 1. `components/documents/index.ts`

24 linhas a atualizar (linhas 3-26):

| Linha | Atual | Novo |
|---|---|---|
| 3 | `import { DecreeTemplate } from "./templates/DecreeTemplate"` | `"./templates/decree-template"` |
| 4 | `import { DossierTemplate } from "./templates/DossierTemplate"` | `"./templates/dossier-template"` |
| 5 | `import { MemoTemplate } from "./templates/MemoTemplate"` | `"./templates/memo-template"` |
| 6 | `import { IncidentTemplate } from "./templates/IncidentTemplate"` | `"./templates/incident-template"` |
| 7 | `import { TransmissionTemplate } from "./templates/TransmissionTemplate"` | `"./templates/transmission-template"` |
| 8 | `import { BulletinTemplate } from "./templates/BulletinTemplate"` | `"./templates/bulletin-template"` |
| 9 | `import { ManifestoTemplate } from "./templates/ManifestoTemplate"` | `"./templates/manifesto-template"` |
| 10 | `import { OrderTemplate } from "./templates/OrderTemplate"` | `"./templates/order-template"` |
| 11 | `import { ForensicTemplate } from "./templates/ForensicTemplate"` | `"./templates/forensic-template"` |
| 12 | `import { AiLogTemplate } from "./templates/AiLogTemplate"` | `"./templates/ai-log-template"` |
| 13 | `import { IdCardTemplate } from "./templates/IdCardTemplate"` | `"./templates/id-card-template"` |
| 14 | `import { BountyTemplate } from "./templates/BountyTemplate"` | `"./templates/bounty-template"` |
| 15 | `import { BroadcastTemplate } from "./templates/BroadcastTemplate"` | `"./templates/broadcast-template"` |
| 16 | `import { AutopsyTemplate } from "./templates/AutopsyTemplate"` | `"./templates/autopsy-template"` |
| 17 | `import { InterrogationTemplate } from "./templates/InterrogationTemplate"` | `"./templates/interrogation-template"` |
| 18 | `import { NewsTemplate } from "./templates/NewsTemplate"` | `"./templates/news-template"` |
| 19 | `import { BatchTemplate } from "./templates/BatchTemplate"` | `"./templates/batch-template"` |
| 20 | `import { ForeignLetterTemplate } from "./templates/ForeignLetterTemplate"` | `"./templates/foreign-letter-template"` |
| 21 | `import { PropagandaTemplate } from "./templates/PropagandaTemplate"` | `"./templates/propaganda-template"` |
| 22 | `import { MonitoredThreadTemplate } from "./templates/MonitoredThreadTemplate"` | `"./templates/monitored-thread-template"` |
| 23 | `import { CodexEntryTemplate } from "./templates/CodexEntryTemplate"` | `"./templates/codex-entry-template"` |
| 24 | `import { MedicalRecordTemplate } from "./templates/MedicalRecordTemplate"` | `"./templates/medical-record-template"` |
| 25 | `import { ClassifiedProjectTemplate } from "./templates/ClassifiedProjectTemplate"` | `"./templates/classified-project-template"` |
| 26 | `import { TrialSchoolFinalEvaluation } from "./templates/trial/TrialSchoolFinalEvaluation"` | `"./templates/trial/trial-school-final-evaluation"` |

### 2. `components/documents/general-components/mdx/MdxComponents.tsx`

8 linhas a atualizar das 28 (linhas 12-31):

| Linha | Atual | Novo |
|---|---|---|
| 12 | `import { LogLine } from "./LogLine"` | `import { LogLine } from "./log-line"` |
| 13 | `import { CensorEntry } from "./CensorEntry"` | `import { CensorEntry } from "./censor-entry"` |
| 18 | `import { ForeignBody } from "./ForeignBody"` | `import { ForeignBody } from "./foreign-body"` |
| 23 | `import { RequirementList } from "./codex/RequirementList"` | `import { RequirementList } from "./codex/requirement-list"` |
| 25 | `import { RecruitProfile } from "./project/RecruitProfile"` | `import { RecruitProfile } from "./project/recruit-profile"` |
| 26 | `import { AssetEntry } from "./project/AssetEntry"` | `import { AssetEntry } from "./project/asset-entry"` |
| 30 | `import { ProjectTOC } from "./ProjectTOC"` | `import { ProjectTOC } from "./project-toc"` |
| 31 | `import { DigitalSignature } from "../signatures/DigitalSignature"` | `import { DigitalSignature } from "../signatures/digital-signature"` |

> Nota: Single-word files como `Redacted`, `Stamp`, `Classified`, `Field`, `Signature`, `Article`, `Transmission`, `Evidence`, `Pullquote`, `Caption`, `Exchange`, `Note`, `Translation`, `Msg`, `Trait`, `Warning`, `Phase`, `Objective`, `Safeguard`, `Section` — NÃO entram no rename.

---

## Configurações afetadas

### `tsconfig.json`

**Não afetado.** O único alias de path é `@/*` (wildcard de diretório, linha 22). Nenhum alias aponta para arquivo específico.

### `next.config.ts`

**Não afetado.** Só contém regra de loader para arquivos `.mdx` (raw-loader). Nenhuma referência a caminhos de componentes.

---

## Estratégia recomendada

Para minimizar risco de quebra, sugere-se renomear em **batches por diretório**, rodando `tsc --noEmit` após cada batch:

1. `general-components/ui/` (14 arquivos)
2. `general-components/paper/` (6 arquivos)
3. `general-components/stamps/` (4 arquivos)
4. `general-components/signatures/` (2 arquivos)
5. `general-components/mdx/` + subdirs (9 arquivos)
6. `templates/` (24 arquivos)
7. `components/` raiz (3 arquivos — ArchiveShell, IndividualResolver, RotatingText)
8. Atualizar barrels: `MdxComponents.tsx` + `documents/index.ts`

### Riscos conhecidos

- **Imports relativos** (`../general-components/paper/PaperSheet`) — o TypeScript resolverá corretamente desde que o `git mv` seja feito primeiro e o import seja atualizado na mesma batelada.
- **`ArchiveShell.tsx`** — ninguém importa atualmente, mas o arquivo existe. Pode ser que seja importado dinamicamente em algum lugar não pego pelo grep estático.
- **`@/` path alias** — todos os imports com `@/components/...` são resolvidos contra a raiz do projeto, então o rename de arquivo + update de import funciona sem surpresas.
- **8 componentes `ui/` sem imports ativos** (`FormField`, `IdField`, `MetaCell`, `PartyRow`, `PropagandaMotif`, `StatChip`, `StatusPanel`, `ThreatGauge`) — podem ser lixo ou podem ser usados dinamicamente. Investigar antes de renomear.
