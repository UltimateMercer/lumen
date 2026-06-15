# Etapa 4 — Migração do material `_import/`

## DigitalSignature unificada

`components/documents/general-components/signatures/DigitalSignature.tsx` foi reescrita como
uma versão única que amalgama as duas implementações anteriores (Etapa 3 canônica + `_import/`).

**Props:** `name`, `role?`, `registry`, `timestamp`, `authority?`, `color?`, `background?`, `className?`

**Comportamento dual:**
- Sem `color`: renderiza com classes `paper-*` (estilo `_import/`)
- Com `color`: renderiza com temas dinâmicos via `color-mix` (estilo Etapa 3)
- Sempre usa `NexusFormatDate` para formatar `timestamp`
- `"use client"` preservado

**`ResponsibleSignatures.tsx`** ajustado para passar `name={data.signature}`.

## Fase 1 — `_import/lib/` → `lib/archive/`

| Origem | Destino | Mudanças |
|---|---|---|
| `_import/lib/documents.ts` | `lib/archive/documents.ts` | Nenhuma |
| `_import/lib/registry.ts` | `lib/archive/registry.ts` | 30 imports de MDX atualizados para `../../content/archive/...` |
| `_import/lib/mdx-components.tsx` | Descartado | Nenhum template importa mais dele |

## Fase 2 — Templates → `components/documents/templates/`

23 templates copiados de `_import/*-template/*.tsx` para `components/documents/templates/`.

**Mudanças de import em cada template:**
- `"../lib/documents"` → `"@/lib/archive/documents"`
- `"../lib/mdx-components"` desmembrado em imports individuais:
  - `RenderMdx` → `"../general-components/mdx/RenderMdx"`
  - `Stamp` → `"../general-components/mdx/Stamp"` (4 templates)
  - `Redacted` → `"../general-components/mdx/Redacted"` (1: ClassifiedProject)
  - `ProjectTOC` → `"../general-components/mdx/ProjectTOC"` (1: ClassifiedProject)

Imports de `../general-components/` mantidos (mesmo path relativo).

## Fase 3 — general-components `mdx/`

`_import/general-components/mdx/` → `components/documents/general-components/mdx/`
(sem mudanças de conteúdo; imports relativos internos preservados)

`MdxComponents.tsx` barrel ajustado: import de `DigitalSignature` aponta para
`../signatures/DigitalSignature` (a unified).

## Fase 4 — MDX → `content/archive/`

30 arquivos `.mdx` movidos:
- `content/archive/codex/` — 4 codex entries
- `content/archive/classified-project/` — 1 projeto red-suns
- `content/archive/examples/` — 25 demais

`lib/archive/registry.ts` atualizado com os novos caminhos.

## Fase 5 — ArchiveShell

`_import/ArchiveShell.tsx` → `components/ArchiveShell.tsx`
Import de `ThemeToggle` ajustado para `./documents/general-components/ui/ThemeToggle`.

## Fase 6 — `app/archive/` imports

- `@/_import/lib/documents` → `@/lib/archive/documents`
- `@/_import/lib/registry` → `@/lib/archive/registry`
- `@/_import/index` → `@/components/documents/index`

## Fase 7 — Barrel `components/documents/index.ts`

Novo barrel com `TEMPLATES` registry, importando todos os 23 templates
de `./templates/` e type `ArchiveDocument` / `DocumentType` de `@/lib/archive/documents`.

## Importações residuais de `_import/general-components/`

Componentes avulsos (PaperSheet, ClassificationBar, CrestSvg, Folder, ThemeToggle)
foram copiados para `components/documents/general-components/`.
Imports de `../../lib/documents` ajustados para `@/lib/archive/documents`.

## Resultado

- `npx tsc --noEmit`: **0 novos erros** (apenas 18 preexistentes, ignorados)
- `@/_import/` não é mais importado por nenhum arquivo dentro do projeto
- Todo o conteúdo que antes estava em `_import/` agora está acessível via
  `lib/archive/`, `components/documents/`, `components/ArchiveShell.tsx`,
  e `content/archive/`
