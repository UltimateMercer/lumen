# Investigação profunda — Contraste e estilos globais de documento

---

## 1. Tailwind Typography (prose)

### A) `@tailwindcss/typography` no package.json

**Presente** em `dependencies` (line 40):
```json
"@tailwindcss/typography": "^0.5.19"
```

Registrado como plugin em `globals.css:4`:
```css
@plugin "@tailwindcss/typography";
```

### B) Configuração em tailwind.config.js

```js
typography: {
  DEFAULT: {
    css: {
      '--tw-prose-bullets': '#121212',
      maxWidth: "100%",
      color: '#121212',
      lineHeight: '1.5',
      pre: { whiteSpace: "pre-wrap", marginTop: "0.5rem", marginBottom: "1.25rem", fontSize: "15px" },
    }
  },
  dark: {
    css: {
      '--tw-prose-invert-bullets': 'var(--color-custom-brown-text)',
      color: 'var(--color-custom-brown-text)',
      h1: { color: 'var(--color-custom-brown-text)' },
      h2: { color: 'var(--color-custom-brown-text)' },
    }
  },
  invert: {
    css: {
      '--tw-prose-invert-bullets': 'var(--color-custom-brown-text)',
      '--tw-prose-links': 'var(--color-custom-brown-text)',
      '--tw-prose-bold': 'var(--color-custom-brown-text)',
      color: 'var(--color-custom-brown-text)',
      h1: { color: 'var(--color-custom-brown-text)' },
      h2: { color: 'var(--color-custom-brown-text)' },
    }
  }
}
```

**Nota:** `--color-custom-brown-text` **não está definido** em globals.css — pode ser de configuração anterior não migrada.

### C) Todas as ocorrências de "prose" no projeto

| Arquivo | Linha | Uso |
|---|---|---|
| `components/article-layouts/fullpage-layout.tsx` | 61 | `<article className="two-column-article prose max-w-none dark:prose-invert">` |
| `components/article-layouts/basic-layout.tsx` | 52 | `<article className="article-grid text-dark dark:text-light prose max-w-none dark:prose-invert">` |
| `components/article-layouts/portrait-layout.tsx` | 38 | `<article className="article-grid prose max-w-none dark:prose-invert">` |
| `components/article-layouts/parallax-layout.tsx` | 32 | `<article className="article-grid prose max-w-none dark:prose-invert">` |
| `components/about/about-me-pt-br.tsx` | 3 | `<section className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto px-4 py-12">` |
| `components/about/about-me-en-us.tsx` | 3 | `<section className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto px-4 py-12">` |
| `components/markdown-renderer.tsx` | 51 | `className="prose max-w-none"` (dangerouslySetInnerHTML) |
| `app/projects/[lang]/[slug]/page.tsx` | 130 | `<div className="prose min-w-0">` (envolve Mdx + InlineTOC) |

**Conclusão:** `prose` é usado EXCLUSIVAMENTE em article-layouts, about-me e páginas de projetos. **NENHUM** template de documento de archive usa `prose`. O `RenderMdx` dos documentos de archive estiliza seus elementos HTML via classes Tailwind explícitas nos `mdx-components`.

---

## 2. Estilos globais de documento no globals.css

### Elementos HTML em contexto de documento

| Seletor | Linhas | Cor/Borda | Contraste estimado (#eaeaea) |
|---|---|---|---|
| `blockquote` | — | **NENHUM** seletor global. Só `.main-article .article-grid > blockquote` (linhas 403-406) — apenas grid placement, sem cor/borda | N/A |
| `table`, `thead`, `tbody`, `tr`, `th`, `td` | — | **NENHUM** seletor global. Apenas `.med-table thead th`, `.med-table tbody td` (linhas 866-869) | ~12:1 (--paper-foreground 85% sobre papel) |
| `hr` | — | **NENHUM** seletor global. Apenas `.main-article .article-grid > hr` (linha 414) — sem cor | N/A |
| `pre` | — | **NENHUM** seletor global. Apenas `.main-article .article-grid > figure > pre` (linhas 398-401) | N/A |
| `code` | — | **NENHUM** seletor global | N/A |
| `ul`, `ol`, `li` | — | **NENHUM** seletor global. Apenas específicos (thread-msg-notes, codex-body ul li, project-toc-list) | N/A |

### Classes utilitárias de documento

#### `.paper-texture` (linhas 605-627)
```css
.paper-texture {
    background-color: #eaeaea;
    position: relative;
    background-image:
      radial-gradient(circle at 20% 10%, oklch(0.85 0.04 60 / 0.18) 0%, transparent 45%),
      radial-gradient(circle at 80% 90%, oklch(0.80 0.05 50 / 0.12) 0%, transparent 40%);
}
.dark .paper-texture { background-color: #252525; }
.paper-texture::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background-image: url("/images/noise.webp"); background-repeat: repeat;
    opacity: var(--paper-noise-opacity, 0.10); mix-blend-mode: multiply;
}
```
- **Contraste:** `#eaeaea` + `--paper-foreground` (~#2a251a) → **~12:1** (bom). Dark: `#252525` + `--paper-foreground` (~#2f2a1f) → **~1.5:1** (muito baixo).

#### `.meta-grid` (linhas 884-885)
```css
.meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
```

#### `.meta-cell` (linhas 886-894)
```css
.meta-cell {
  border: 1px solid color-mix(in oklab, var(--paper-foreground) 35%, transparent);
  background: color-mix(in oklab, var(--paper-foreground) 2%, transparent);
}
.meta-cell-label { color: color-mix(in oklab, var(--paper-foreground) 60%, transparent); }
.meta-cell-value { color: var(--paper-foreground); }
```
- **Borda:** 35% de `--paper-foreground` → ~2:1 sobre #eaeaea (sutil)
- **Label:** 60% de `--paper-foreground` → ~5.5:1 (passa AA)
- **Value:** 100% de `--paper-foreground` → ~12:1 (bom)

#### `.status-panel` (linhas 872-882)
```css
.status-panel { border: 2px solid var(--paper-foreground); }
.status-panel-head { background: var(--paper-foreground); color: var(--paper); }
.status-panel-sub { color: color-mix(in oklab, var(--paper-foreground) 60%, transparent); }
.status-panel-foot { color: color-mix(in oklab, var(--paper-foreground) 60%, transparent); }
```
- **Borda:** `--paper-foreground` 100% → ~12:1
- **Cabeçalho:** fundo escuro, texto claro → invertido, bom contraste
- **Sub/rodapé:** 60% de `--paper-foreground` → ~5.5:1

#### `.project-toc` (linhas 899-906)
```css
.project-toc { border: 1px solid color-mix(in oklab, var(--paper-foreground) 40%, transparent); }
.project-toc-head { background: var(--paper-foreground); color: var(--paper); }
.project-toc-link { color: var(--paper-foreground); }
.project-toc-link:hover { color: var(--stamp-red); }
```
- Mesmo padrão do status-panel: borda 40%, cabeçalho invertido, links full foreground

#### `.classified-project-body`
**NÃO TEM regras em globals.css** — depende inteiramente de classes Tailwind (`mt-8 text-paper-foreground`).

#### `.project-toc-wrap`
**Removido** (linha 897): `/* .project-toc-wrap was removed — no longer sticky */`

---

## 3. RenderMdx e mdx-components

### `render-mdx.tsx`
```tsx
"use client";
import dynamic from "next/dynamic";
import { mdxComponents } from "./mdx-components";

const MDXRemote = dynamic(() => import("next-mdx-remote").then((m) => m.MDXRemote), { ssr: false });

export function RenderMdx({ source }: { source?: Record<string, unknown> }) {
  if (!source) return null;
  return <MDXRemote {...(source as any)} components={mdxComponents as Record<string, React.ComponentType<any>>} />;
}
```

- **Wrapper:** **NENHUM** — retorna apenas `<MDXRemote>` sem div extra
- **`prose`:** **NÃO** é usado
- **SSR:** Desabilitado (`{ ssr: false }`)

### `mdx-components.tsx`

**Elementos HTML com classes Tailwind:**

| Elemento | Classes |
|---|---|
| `h1` | `mb-2 font-display text-2xl font-bold uppercase tracking-wider` |
| `h2` | `mt-6 mb-2 font-display text-lg font-bold uppercase tracking-wider` |
| `h3` | `mt-4 mb-1 text-sm font-bold uppercase tracking-wider` |
| `p` | `my-3 text-sm leading-relaxed` |
| `ul` | `my-3 ml-6 list-disc text-sm leading-relaxed` |
| `ol` | `my-3 ml-6 list-decimal text-sm leading-relaxed` |
| `strong` | `font-bold` |
| `hr` | `my-6 border-current opacity-20` |
| `blockquote` | `my-4 border-l-2 border-current pl-4 text-sm italic opacity-80` |

**Observações:**
- Nenhum usa `prose` ou `prose-*`
- Nenhum usa classes de cor diretas (`text-red-500`, etc.) — herdam do pai via `border-current` e `text-inherit`
- `blockquote` e `hr` usam `opacity-80` e `opacity-20` respectivamente — a cor vem de `border-current`/`text-inherit`
- **`table`, `thead`, `tbody`, `tr`, `th`, `td`, `pre`, `code`** **NÃO** são registrados — usam renderização padrão do navegador

**Componentes customizados (sem classes de cor/borda inline — estilos vêm de globals.css):**
`Redacted`, `Stamp`, `ApprovedStamp`, `DeniedStamp`, `ClassifiedStamp`, `ArchivedStamp`, `UrgentStamp`, `Classified`, `Field`, `Signature`, `DigitalSignature`, `Article`, `Transmission`, `Evidence`, `LogLine`, `CensorEntry`, `Pullquote`, `Caption`, `Exchange`, `Note`, `ForeignBody`, `Translation`, `Msg`, `FlagPhrase`, `Gap`, `Attachment`, `Trait`, `Warning`, `RequirementList`, `Phase`, `RecruitProfile`, `AssetEntry`, `Safeguard`, `Objective`, `Section`, `ProjectTOC`

---

## 4. Estilos aplicados via globals.css ao conteúdo MDX renderizado

### Seletores descendentes em wrappers MDX

**NENHUM** seletor descendente atinge filhos de:
- `.classified-project-body` (esta classe não tem regras em globals.css)
- `.paper-texture` (só estilos para si mesma e `::before`)
- Nenhuma classe contendo "render" ou "mdx"

### Seletores descendentes específicos de body

`.codex-body` (linhas 852-857):
```css
.codex-body h2 { border-bottom: 1px solid color-mix(in oklab, var(--paper-foreground) 30%, transparent); }
.codex-body h2::before { color: var(--stamp-red); }
.codex-body h3 { color: color-mix(in oklab, var(--paper-foreground) 80%, transparent); }
.codex-body p { font-size: 0.85rem; line-height: 1.6; }
.codex-body ul li { margin: 0.15rem 0; }
```

`.interrogation-body` (linhas 860-863):
```css
.interrogation-body > h2 { border-bottom: 1px solid color-mix(in oklab, var(--paper-foreground) 25%, transparent); }
.interrogation-body > h2::before { color: var(--paper-muted); }
```

`.thread-body` (linhas 831-849):
```css
.thread-body { display: flex; flex-direction: column; gap: 0.55rem; }
.thread-msg-meta { color: color-mix(in oklab, var(--paper-foreground) 55%, transparent); }
.thread-msg-bubble { color: var(--paper-foreground);
  border: 1px solid color-mix(in oklab, var(--paper-foreground) 28%, transparent);
  background: color-mix(in oklab, var(--paper-foreground) 3%, transparent); }
.thread-msg-notes { color: color-mix(in oklab, var(--paper-foreground) 80%, transparent); }
.thread-msg-notes-ref { color: var(--stamp-red); }
```

`.foreign-body` (linhas 801-810):
```css
.foreign-body .foreign-original { color: oklch(0.30 0.05 250); /* azul escuro */
  border-left: 2px solid oklch(0.30 0.05 250 / 0.4); }
.foreign-body .foreign-translation { color: var(--paper-muted);
  border-left: 2px dashed var(--paper-muted); }
```

`.propaganda-body p` (linha 828): `font-size: 0.95rem; line-height: 1.55;` (sem cor explícita)

---

## 5. Varredura de cores problemáticas — abrangente

### A) `border-border`

| Arquivo | Linha | Contexto |
|---|---|---|
| `globals.css` | 210 | `@apply border-border outline-ring/50;` (global `*`) |
| `globals.css` | 568 | `@apply border-border outline-ring/50;` (segundo bloco `*`) |
| `batch-template.tsx` | 185 | Sticky piece header — sobre `bg-card/95`, não sobre paper |
| `app/archive/page.tsx` | 67, 68, 81, 123, 158, 164, 170, 256, 261 | Archive showcase — background `bg-card/*`, não paper |
| `app/government/codex/page.tsx` | 139, 141, 147, 151, 169, 203, 209, 213, 218, 252, 288, 290, 296, 300, 323 | Codex grid cards — background `bg-background`, não paper |
| `app/government/incidents/layout.tsx` | 29, 45 | Sidebar header + items — sobre `bg-[#eaeaea] dark:bg-[#252525]`, mesma cor de fundo do paper |

**Análise:** `border-border` é usado principalmente em contextos de cards shadcn (`bg-card`, `bg-background`), não dentro de `PaperSheet`. A exceção é `incidents/layout.tsx` onde `border-border` aparece no sidebar com fundo `#eaeaea`/`#252525` → `--border` sobre `#eaeaea` é praticamente invisível (~1.005:1).

### B) `border-muted-foreground` (não existe `border-muted` puro)

| Arquivo | Linha | Contexto |
|---|---|---|
| `digital-signature.tsx` | 125, 128, 131, 134 | Cantos decorativos da moldura de assinatura digital |

### C) `text-muted-foreground` — após correções anteriores

| Arquivo | Linha | Contexto | Sobre fundo |
|---|---|---|---|
| `batch-template.tsx` | 185 | Sticky piece header | `bg-card/95` (shadcn card) |
| `folder.tsx` | 121 | Skip hint text | Folder background (não paper) |
| `theme-toggle.tsx` | 17 | Toggle text | Não paper |
| `digital-signature.tsx` | 58 | "Assinatura ::" label | **PaperSheet** (#eaeaea) |
| `digital-signature.tsx` | 149 | "[assinatura digital]" label | **PaperSheet** (#eaeaea) |
| `app/archive/` | vários | Archive navigator | `bg-background`, não paper |
| `app/government/classified/` | vários | Classified sidebar | `bg-[#eaeaea]` (mesmo fundo do paper) |
| `app/government/codex/` | vários | Codex sidebar e cards | `bg-background` ou `bg-[#eaeaea]` |
| `app/government/incidents/` | vários | Incidents sidebar | `bg-[#eaeaea]` |

**Nota:** As 5 ocorrências em `components/documents/` que estão sobre `PaperSheet` (#eaeaea) — `digital-signature.tsx:58,149` — ainda usam `text-muted-foreground` (não foram alteradas porque o user explicitamente pediu para não modificar digital-signature.tsx). As demais (`folder.tsx`, `theme-toggle.tsx`, `batch-template.tsx:185`) estão sobre outros fundos.

### D) `opacity-[00-59]` baixa

| Arquivo | Linha | Opacidade | Contexto | Fundo |
|---|---|---|---|---|
| `mdx-components.tsx` | 91 | `opacity-20` | `<hr>` (não é texto) | PaperSheet |
| `globals.css` | — | `opacity-40` | Classified layout items disabled | `bg-[#eaeaea]` |
| `app/government/incidents/page.tsx` | 4 | `opacity-40` | Empty state | `bg-[#eaeaea]` |
| `app/government/incidents/[slug]/page.tsx` | 52, 64 | `opacity-30` | Disabled nav buttons | `bg-[#eaeaea]` |
| `app/government/classified/[slug]/page.tsx` | 110, 122 | `opacity-30` | Disabled nav buttons | `bg-[#eaeaea]` |
| `app/government/codex/[slug]/page.tsx` | 23 | `opacity-50` | Not found state | `bg-[#eaeaea]` |
| `app/government/codex/page.tsx` | 44 | `opacity-50` | Empty state | `bg-[#eaeaea]` |

### E) `opacity-60` (após correções)

| Arquivo | Linha | Contexto |
|---|---|---|
| `batch-template.tsx` | 131 | Chevron × em item ausente (`opacity-60`, era `opacity-30`) |

### F) `border-gray`, `border-zinc`, `border-slate`

**ZERO** ocorrências em toda a base de código.

### G) `divide-*`

| Arquivo | Linha | Contexto |
|---|---|---|
| `order-template.tsx` | 16 | `divide-x-2 divide-paper-foreground/40` — sobre PaperSheet, OK |
| `interrogation-template.tsx` | 56 | `md:divide-x md:divide-paper-foreground/20` — sobre PaperSheet, OK |

---

## 6. Variáveis CSS de borda e separadores

### Valores exatos

| Variável | Light (`:root`) | Dark (`.dark`) |
|---|---|---|
| `--muted` | `oklch(0.97 0 0)` (#f7f7f7) | `oklch(0.269 0 0)` (#3d3d3d) |
| `--muted-foreground` | `oklch(0.556 0 0)` (#767676) | `oklch(0.708 0 0)` (#a3a3a3) |
| `--border` | `oklch(0.922 0 0)` (#ebebeb) | `oklch(1 0 0 / 10%)` (branco 10%) |

### Contrast ratio estimado

#### `--border` como cor de borda sobre `#eaeaea` (light):
- `--border` = `#ebebeb`, background = `#eaeaea`
- **~1.005:1** — praticamente invisível. Bordas com `border-border` sobre fundo `#eaeaea` desaparecem.

#### `--border` como cor de borda sobre `#252525` (dark):
- `--border` = branco 10% sobre `#252525` → `rgb(59,59,59)` = `#3b3b3b`
- **~1.43:1** — extremamente baixo, quase invisível.

**Conclusão:** `--border` tem contraste extremamente baixo em ambos os modos. Pode ser intencional para um design ultra-sutil, mas falha qualquer critério de acessibilidade (WCAG mínimo 3:1 para elementos não-texto). As bordas mais visíveis no projeto usam `border-paper-foreground/*` ou `border-foreground/*` em vez de `border-border`.

---

## Resumo consolidado

| Aspecto | Status |
|---|---|
| `prose` usado em templates de documento | **NÃO** — só em article-layouts/about/projects |
| `RenderMdx` usa wrapper com `prose` | **NÃO** — sem wrapper |
| `table`/`pre`/`code` estilizados em MDX | **NÃO** — sem componentes registrados, sem estilos globais |
| `border-border` sobre fundo `#eaeaea` | **SIM** — incidents sidebar (linhas 29, 45) — ~1:1, invisível |
| `text-muted-foreground` sobre `#eaeaea` | **SIM** — `digital-signature.tsx:58,149` (fora do escopo, proibido alterar) |
| `--paper-foreground` no dark mode | **CONTRASTE BAIXO** (~1.5:1 sobre `#252525`) — problema potencial |
| Cores hardcoded `text-gray*`/`text-zinc*` | **ZERO** na codebase |
| `border-gray*`/`border-zinc*`/`border-slate*` | **ZERO** na codebase |
| `--border` como cor de borda | **CONTRASTE MUITO BAIXO** (~1:1 light, ~1.4:1 dark) — provavelmente intencional |
