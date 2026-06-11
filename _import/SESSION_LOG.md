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

---
## Sessão: Fixes — undefined items e Folder.tsk órfão (2026-06-10)

### O que foi feito
- **`_import/lib/mdx-components.tsx`**: fallback defensivo em 3 componentes que faziam `.map()` em `items` sem verificar null:
  - `RequirementList` → `const safeItems = items ?? []`
  - `RecruitProfile` → `const safeItems = items ?? []`
  - `ProjectTOC` → `const safeItems = items ?? []` (incluindo `safeItems.length` no footer)
- **`_import/Folder.tsx`**: removido (arquivo órfão solto na raiz)
  - `BatchTemplate.tsx` já importa de `../components/batch/Folder` → `_import/components/batch/Folder.tsx`
  - Nenhum outro arquivo importava `_import/Folder.tsx`

### Decisões
- Preferimos `const safeItems = items ?? []` antes do `.map()` em vez de inline `(items ?? []).map(...)` por clareza
- TypeScript não acusava erro porque a prop é tipada como `items: string[]` (não opcional), mas MDX pode omitir a prop

### Status
- TypeScript: 0 erros em `_import/`
- Total de erros: 13 (mesmos pre-existing)

---
## Sessão: BatchTemplate — YAML parser e Folder.tsx (2026-06-10)

### Problema
BatchTemplate não exibia o índice de peças porque `getBatchItems()` sempre retornava array vazio.

### Causa raiz
`parseFrontmatter()` em `registry.ts` só tratava linhas `key: value`. O campo `items` no MDX usa sintaxe YAML de lista multilinha:
```yaml
items:
  - slug: decreto-0421
    role: "Base legal"
```
O parser antigo produzia `fm["items"] = ""` (falsy), então `getBatchItems` retornava `[]`.

### Escopo do bug
3 campos do frontmatter usam YAML list e estavam todos quebrados:
- `items` (batch) — multi-line `- key: value`
- `participants` (monitored_thread) — multi-line `- key: value`
- `sections` (classified_project) — inline `- { id, label }`

### O que foi feito
- **`registry.ts`**: reescrita `parseFrontmatter()` com state machine que reconhece:
  - `key:` com valor vazio → inicia lista
  - `  - key: value` → item de lista + `parseValue()` (JSON ou string)
  - `    key: value` → continuação do item anterior
  - `  - { id, label }` → objeto inline com fallback para chaves sem aspas
  - `key: |` / `key: >` → literal block (pula conteúdo)
  - linha em branco dentro da lista → finaliza lista
- **`_import/components/batch/Folder.tsx`**: removido bloco de código comentado (73 linhas) que duplicava a export
- `_import/Folder.tsx` já havia sido removido na sessão anterior

### Verificado
- Parser testado com frontmatter real de batch, monitored_thread e classified_project
- `BatchTemplate.tsx` importa `Folder` de `../components/batch/Folder` → correto
- TypeScript: 0 erros em `_import/`

---
## Sessão: React render phase — window.history (2026-06-10)

### Problema
"React cannot update a component while rendering another" porque
`openItem()` chamava `window.history.pushState` dentro do updater
de `setActiveSlug` (fase de render).

### O que foi feito
- Removida manipulação de `window.history` e `requestAnimationFrame`
  de dentro de `openItem()` e `closeItem()` — agora só chamam
  `setActiveSlug(slug)` / `setActiveSlug(null)`
- Novo `useEffect` que observa `activeSlug`:
  - `activeSlug != null` → `replaceState` com hash (não empilha)
  - `activeSlug === null` após primeira sincronia → `pushState`
    limpa hash (empilha para que o botão "voltar" retorne à peça)
  - `requestAnimationFrame` para scrollIntoView movido para cá
- `useRef(initialSyncDone)` impede pushState desnecessário no mount
  (a URL inicial já é a fonte da verdade)

### Decisões
- `replaceState` para navegação entre peças (sem poluir o histórico)
- `pushState` apenas ao fechar (voltar → reabre a última peça)
- ScrollIntoView é efeito colateral, não pertence ao callback de click

### Status
- TypeScript: 0 erros
