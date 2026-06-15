# Debug: 500 em /archive/[slug]

## Stack trace completo

Extraído do template HTML de erro renderizado por Next.js (`data-next-error-stack`):

```
TypeError: Cannot read properties of null (reading 'useState')
    at process.env.NODE_ENV.exports.useState
        (/home/ultimate/personal/lumen/node_modules/react/cjs/react.development.js:1263:33)
    at MDXRemote
        (file:///home/ultimate/personal/lumen/node_modules/next-mdx-remote/dist/index.js:13:51)
    at Object.react_stack_bottom_frame
        (/home/ultimate/personal/lumen/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js:2:307520)
    at renderWithHooks
        (/home/ultimate/personal/lumen/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js:2:117854)
    at renderElement
        (/home/ultimate/personal/lumen/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js:2:132526)
    at retryNode
        (/home/ultimate/personal/lumen/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js:2:201278)
```

## Fluxo verificado

### 1. lib/archive/registry.ts — localiza arquivos MDX

- Os 30 arquivos `.mdx` estao em `content/archive/{codex,classified-project,examples}/`
- Importados estaticamente via webpack `asset/source` em `lib/archive/registry.ts`:
  `import codexAsc01Ascendente from "../../content/archive/codex/codex-asc-01-ascendente.mdx"`
- O mapeamento `RAW[slug] = raw_string` usa o frontmatter parseado
- `getAllSlugs()` retorna 30 slugs (confirmado na pagina `/archive` que renderiza 200 OK)

### 2. getDocument('codex-ax-01-ascendente')

- `getDocument()` faz `DOCS.get(slug)` (Map populado no init do modulo)
- Arquivo MDX existe em disco: `content/archive/codex/codex-asc-01-ascendente.mdx` (3549 bytes)
- confirmado que retorna objeto valido com frontmatter + mdx string

### 3. serialize() do next-mdx-remote

- Testado com log `[D1]` — **serialize() executa sem erro**
- O resultado `mdxSource` contem `{ compiledSource, frontmatter, scope }`

### 4. TEMPLATES[type]

- `TEMPLATES["codex_entry"]` → `CodexEntryTemplate` (existe no barrel)
- templates estao em `components/documents/templates/` — todos com `"use client"`
- Subcomponentes compartilhados (PaperSheet, ClassificationBar, DigitalSignature, RenderMdx) tambem tem `"use client"`

## Causa raiz

O erro ocorre **exclusivamente no rendering de `MDXRemote`** de `next-mdx-remote`.

```
next-mdx-remote/dist/index.js:13:51
    const [isReadyToRender, setIsReadyToRender] = useState(!lazy || typeof window === 'undefined');
```

O modulo `next-mdx-remote/dist/index.js`:
1. Importa hooks de React: `import React, { useEffect, useState, useMemo } from 'react'`
2. Usa `useState` na linha 13
3. **NAO tem diretiva `"use client"`**

Na arquitetura RSC + Turbopack do Next.js 16, modulos importados por um Client Component que nao tenham `"use client"` sao processados no contexto SSR, onde o dispatcher de hooks do React nao esta inicializado. O `React` importado e `null` no contexto de renderizacao RSC, causando `Cannot read properties of null (reading 'useState')`.

### Confirmacoes adicionais

- `TestClient` (componente "use client" simples): funciona (200)
- `TestTemplate` com `Paper` apenas: funciona (200)
- `PaperSheet` + `ClassificationBar`: funciona (200)
- **Adicionar `RenderMdx` (que usa `MDXRemote`)**: 500
- **`MDXRemote` diretamente no server component**: 500
- Erro pre-existente: reproduzido com `git stash` no codigo original de `_import/`

## Solucao proposta

`next-mdx-remote` v6.0.0 nao tem `"use client"`. Tres abordagens possiveis:

1. **`next/dynamic`** — envolver `MDXRemote` com `next/dynamic` em `RenderMdx.tsx`:
   ```tsx
   const MDXRemote = dynamic(() => import("next-mdx-remote").then(m => m.MDXRemote), { ssr: false });
   ```
   Isso cria um boundary async que o bundler reconhece como client-side.

2. **Wrapper com `"use client"`** — criar `MDXRemoteClient.tsx`:
   ```tsx
   "use client";
   export { MDXRemote } from "next-mdx-remote";
   ```
   Re-exportar explicitamente para forcar o modulo a ser tratado como client bundle.

3. **Patch no modulo** — adicionar `"use client"` no topo de `node_modules/next-mdx-remote/dist/index.js` (fragil, perde no `npm install`).

**Recomendacao:** Opcao 1 (`next/dynamic` com `ssr: false`) e a mais segura e deixa explicito que o componente so roda no cliente.

## Solucao implementada

Implementada a opcao 1 em `components/documents/general-components/mdx/RenderMdx.tsx`:

```tsx
"use client";
import dynamic from "next/dynamic";
import { mdxComponents } from "./MdxComponents";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false },
);

export function RenderMdx({ source }: { source?: Record<string, unknown> }) {
  if (!source) return null;
  return <MDXRemote {...(source as any)} components={mdxComponents as Record<string, React.ComponentType<any>>} />;
}
```

### Resultado apos correcao

| Slug | Status |
|------|--------|
| `/archive/codex-asc-01-ascendente` | 200 OK |
| `/archive/decreto-0421` | 200 OK |
| `/archive/projeto-red-suns` | 200 OK |
| `/archive/dossie-ministra-ouro-preto` | 200 OK |

Nenhum erro no log do servidor. O HTML retornado (24KB) nao contem `__next_error__` nem `digest`. O componente MDX e carregado assincronamente no cliente via `next/dynamic`, eliminando o conflito de hooks durante SSR.

### Observacao sobre `_import/styles.css`

O CSS com classes como `paper-texture`, `stamp-ink-red`, `crt-glow` nao esta integrado ao `app/globals.css`. Mesmo corrigindo o erro de hook, a pagina de slug podera renderizar sem a estilizacao tematica. Isso e uma issue separada registrada em `AGENTS.md`.
