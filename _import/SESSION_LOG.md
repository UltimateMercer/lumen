# SESSION_LOG — Adaptação _import/ para Next.js App Router

## Status: Primeira versão completa — 4 pendências abertas

---

## Infraestrutura criada

### `_import/lib/documents.ts`
- Types: Classification, DocumentType, DocumentFrontmatter, ArchiveDocument
- Constants: DOCUMENT_TYPE_LABEL, CLASSIFICATION_TOKEN
- ArchiveDocument opção `mdxSource?: Record<string, unknown>` para serialized MDX

### `_import/lib/registry.ts`
- Leitor de MDX via `fs.readFileSync` durante build time
- Parse de frontmatter YAML manual
- Cache estático em memória
- Funções: getAllSlugs(), getAllDocuments(), getDocument(), getBatchItems()
- Escaneia todos os 23 diretórios `_import/*-template/` por arquivos .mdx

### `_import/lib/mdx-components.tsx`
- Port completo de `_import/MdxComponents.tsx` (704 linhas)
- "use client" no topo (usa hooks como useContext, useRef)
- RenderMdx adaptado para next-mdx-remote → usa MDXRemote de 'next-mdx-remote'
- Props: `{ source?: Record<string, unknown> }` (serialized MDX)
- All ~36 MDX custom components + HTML heading/paragraph overrides

### `_import/components/`
- DigitalSignature.tsx — props: name, role, registry, timestamp, authority, className
- DocumentHeader.tsx — ClassificationBar + PaperSheet (port de _import/document-header/)
- ThemeToggle.tsx — "use client", next-themes, botão ☀/☾
- batch/Folder.tsx — "use client", pasta lacrada com animação de abertura

### `app/archive/`
- page.tsx — Listagem de documentos com link para /archive/[slug]
- [slug]/page.tsx — Serialização MDX + renderização via template

---

## Templates adaptados (23/23)

Todos os arquivos em `_import/*-template/` foram adaptados:

### Import paths
| Original | Novo |
|---|---|
| @/lib/documents | ../lib/documents |
| @/components/mdx/MdxComponents | ../lib/mdx-components |
| ./DocumentHeader | ../components/DocumentHeader |
| @/components/mdx/DigitalSignature | ../components/DigitalSignature |
| @/components/theme/ThemeToggle | ../components/ThemeToggle |

### RenderMdx migration
- `{ frontmatter: fm, Content } = doc` → `const fm = doc.frontmatter`
- `<Content />` → `<RenderMdx source={doc.mdxSource} />`
- BatchTemplate: import getBatchItems de ../lib/registry (não ../lib/documents)

### ArchiveShell.tsx
- @tanstack/react-router → next/link
- @/components/theme/ThemeToggle → ../components/ThemeToggle
- `to=` → `href=`

### `_import/index.ts`
- TEMPLATES registry com imports relativos

---

## Decisões

- **DigitalSignature**: versão separada em `_import/components/`; não tocar na existente em components/mdx/
- **ThemeToggle**: minimalista, next-themes. Projeto não tinha ThemeToggle antes
- **CSS**: templates usam classes customizadas (paper-texture, stamp-ink-red, crt-glow, etc.) definidas em `_import/styles.css` (1022 linhas). Não integrado ainda
- **BatchTemplate**: usa useSearchParams/useRouter (next/navigation) e window.location.hash — testar em produção

---

## Pendências

1. [x] CSS — Classes portadas para `app/globals.css` (extração seletiva)
2. [ ] BatchTemplate — Testar interação client-side (useSearchParams, window.location.hash)
3. [ ] Archive routes — Testar dev em /archive e /archive/[slug] com documentos reais
4. [x] ArchiveShell.css — Classes `crt-glow`, `flicker`, `scanlines` portadas para `app/globals.css`

---
## Sessão: CSS + Navegação do Archive (2026-06-10)

### O que foi feito
- **CSS port**: extração seletiva de `_import/styles.css` para `app/globals.css`:
  - `--font-display` adicionado a `@theme inline`
  - Variáveis CSS archive-specific adicionadas a `:root` e `.dark` (amber-crt, cyan-crt, paper, stamp-*, etc.)
  - `@layer utilities` com ~400 linhas de classes (scanlines, crt-glow, paper-texture, stamp, redacted, folder, batch-row, thread-msg, codex-body, etc.)
- **Archive page.tsx**: documentos agrupados por DocumentType
- **Archive [slug]/page.tsx**: navegação "← Arquivo" + "← anterior" / "próximo →" (ordem alfabética por slug) + tipo/classificação no topo

### Decisões
- CSS port foi seletivo (não append total) para evitar conflito com tokens shadcn existentes
- Ordem de navegação: alfabética por slug (simples, determinística)
- Pre-existing errors ignorados (framer-motion, @/lib/educations etc.)

### Status
- TypeScript: 0 erros nos arquivos modificados
- Pendências anteriores mantidas (CSS noise images, BatchTemplate interação)

---
## Sessão: Registry estático — remoção de fs (2026-06-10)

### O que foi feito
- **`_import/lib/registry.ts`**: reescrito sem `fs`/`path`:
  - 30 `.mdx` files importados estaticamente via `import ... from "...mdx"`
  - `parseFrontmatter()` mantido, executa uma vez no module scope
  - `Map<string, ArchiveDocument>` populado no load do módulo
  - Mesma API pública: `getAllSlugs()`, `getAllDocuments()`, `getDocument()`, `getBatchItems()`
- **`next.config.ts`**: adicionado `webpack` rule com `type: "asset/source"` para `.mdx` → posteriormente migrado para `turbopack.rules` com `raw-loader`
- **`_import/lib/types/mdx.d.ts`**: declaração de tipo `declare module "*.mdx"` com `export default string`
- **`tsconfig.json`**: adicionado `"types": ["node", "react", "react-dom"]` para excluir `@types/mdx` da auto-inclusão

### Decisões
- `asset/source` (webpack 5 built-in) → resolve `.mdx` imports como strings raw sem necessidade de loader externo
- `"types"` restrito em tsconfig → `@types/mdx` (transitivo de next-mdx-remote) conflitava com a declaração local
- `_import/index.ts` e templates não foram alterados — continuam sem importar registry.ts
- `app/archive/` continua sendo o único consumer de registry.ts (Server Components)

### Status
- TypeScript: 0 erros nos arquivos modificados
- Total de erros no projeto: 13 (mesmos pre-existing de antes)
- Compatível com GitHub Pages: sem `fs`, sem Node.js runtime

### Pendências atualizadas
5. [x] registry.ts com fs → substituído por imports estáticos + webpack asset/source

---
## Sessão: Webpack → Turbopack rules para .mdx (2026-06-10)

### O que foi feito
- **`next.config.ts`**: substituído `webpack()` com `type: "asset/source"` por `turbopack.rules` com `raw-loader`:
  ```ts
  turbopack: {
    rules: {
      "*.mdx": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  }
  ```
- **`raw-loader`** adicionado como devDependency (único loader suportado pelo Turbopack para raw text)

### Decisões
- `asset/source` (webpack only) conflitava com Turbopack (default no `next dev` do Next.js 16)
- `raw-loader` é um dos loaders testados oficialmente com Turbopack (listado na doc)
- `type: "raw"` não está disponível no Next.js 16.0.0 (adicionado em 16.2.0) — por isso usamos `raw-loader`
- Compatível tanto com `next dev` (Turbopack) quanto `next build` (se usando Turbopack ou webpack)

### Status
- TypeScript: 0 erros nos arquivos modificados
- Total de erros: 13 (mesmos pre-existing)
