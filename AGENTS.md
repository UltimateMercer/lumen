# Regras para o agente — Projeto Lumen

## Arquivos read-only
- `components/individual-layouts/` — não modificar
- `_import/*.mdx` — não modificar

## Convenções
- `@/*` path alias mapeia para a raiz do projeto
- Templates em `_import/*-template/` usam imports relativos (../lib/...)
- MDX é carregado via `_import/lib/registry.ts` (fs.readFileSync, build-time)
- MDX é serializado via `next-mdx-remote/serialize` nas rotas
- Renderização MDX usa `RenderMdx` de `_import/lib/mdx-components.tsx`
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

## Archive routes
- `/archive` — listagem de documentos
- `/archive/[slug]` — renderização individual com template + MDX
- `app/archive/[slug]/page.tsx` usa `generateStaticParams` (Next.js 16)
- `TEMPLATES` registry em `_import/index.ts`
