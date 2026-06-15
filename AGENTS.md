# Regras para o agente — Projeto Lumen

## Arquivos read-only
- `_import/*.mdx` — não modificar

## Convenções
- `@/*` path alias mapeia para a raiz do projeto
- Templates em `components/documents/templates/` usam imports por `@/lib/archive/` e `../general-components/`
- MDX é carregado via `lib/archive/registry.ts` (build-time, webpack asset/source)
- MDX é serializado via `next-mdx-remote/serialize` nas rotas
- Renderização MDX usa `RenderMdx` de `components/documents/general-components/mdx/RenderMdx.tsx`
- Archive routes em `app/archive/`

## Build
- `npx tsc --noEmit` para type checking
- `bun run build` para build completo
- Pre-existing errors (missing modules): ignorar, não são causados por nossas mudanças

## CSS
- `_import/styles.css` contém 1022 linhas de classes customizadas
- Classes como `paper-texture`, `stamp-ink-red`, `crt-glow`, `redacted`,
  `text-paper-foreground`, `text-classification-public` etc. dependem desse CSS
- Ainda não integrado ao `app/globals.css`

## Estrutura do projeto
- `components/documents/templates/` — 26 templates (23 archive + 3 fichas de personagem)
- `components/documents/general-components/` — componentes compartilhados (paper/, stamps/, signatures/, ui/, evaluation/, mdx/)
- `components/archives/individuals/` — layouts de personagem (roteamento de documentos por character)
- `lib/power-system/` — motor de cálculo energético
- `lib/archive/` — lib do archive (documents.ts com tipos + registry.ts com carregamento MDX)
- `content/archive/` — arquivos MDX (codex/, classified-project/, examples/)

## Archive routes
- `/archive` — listagem de documentos
- `/archive/[slug]` — renderização individual com template + MDX
- `app/archive/[slug]/page.tsx` usa `generateStaticParams` (Next.js 16)
- `TEMPLATES` registry em `components/documents/index.ts`
