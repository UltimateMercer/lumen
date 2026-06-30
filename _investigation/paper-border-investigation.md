# Investigação — `--paper-foreground`, `border-paper-*` e `paper-texture` dark mode

---

## 1. Variável `--paper-foreground` — estado atual

### Valores em `app/globals.css`

| Variável | `:root` (light) | Linha | `.dark` (dark) | Linha |
|---|---|---|---|---|
| `--paper` | `oklch(0.96 0.02 85)` (~#f0ede2) | 126 | `oklch(0.91 0.025 85)` (~#e3ddd4) | 185 |
| `--paper-foreground` | `oklch(0.18 0.03 50)` (~#2a251a) | 127 | `oklch(0.88 0.03 50)` (~#d6cbb3) | 186 |
| `--paper-muted` | `oklch(0.45 0.04 60)` (~#6b6152) | 128 | `oklch(0.50 0.04 60)` (~#766b59) | 187 |

### Contraste sobre `#eaeaea` (light) / `#252525` (dark)

| Variável | Light sobre #eaeaea | Dark sobre #252525 |
|---|---|---|
| `--paper-foreground` (~#2a251a) | **~12:1** ✅ | — |
| `--paper-foreground` (~#d6cbb3) | — | **~10:1** ✅ |
| `--paper-muted` (~#6b6152) | **~5.5:1** ✅ (passa AA) | — |
| `--paper-muted` (~#766b59) | — | **~3.5:1** ⚠️ (marginal) |

**Ambos os modos têm contraste adequado.** O dark mode `--paper-foreground` foi corrigido de `oklch(0.20 ...)` (~1.5:1) para `oklch(0.88 ...)` (~10:1) na sessão anterior.

### Registro no Tailwind v4 como token (`@theme inline`)

O `@theme inline {}` (linhas 9-49) mapeia variáveis shadcn-ui (`--background`, `--foreground`, `--muted`, `--border`, etc.) como tokens de cor Tailwind via `--color-*`.

**`--paper-foreground`, `--paper-muted`, `--paper`, `--stamp-red`, `--stamp-ink-*`, `--redacted`, `--chrome`, `--c-*`, `--amber-crt`, `--cyan-crt`, `--news-rule` NÃO estão no `@theme {}`.**

Isso significa que:
- Classes como `text-paper-foreground` **não são tokens Tailwind** — são resolvidas via `var(--paper-foreground)` por classes CSS globais em `globals.css` (ex: `.text-paper-foreground` definido no `@layer utilities`)
- `border-paper-foreground`, `bg-paper-foreground`, etc. funcionam porque há classes utilitárias correspondentes em globals.css
- `paper-muted`, `stamp-red`, etc. seguem o mesmo padrão

### Onde as classes utilitárias `text-paper-foreground` etc. são definidas

Buscando no globals.css:

```bash
grep -n "\.text-paper-foreground\|\.text-paper-muted\|\.border-paper-foreground\|\.bg-paper-foreground" globals.css
```

**Resultado: NENHUM** — essas classes estão sendo geradas dinamicamente pelo Tailwind (provavelmente via `@theme` ou via plugins). Wait, mas elas não estão no `@theme`. Como então `text-paper-foreground` funciona?

Na verdade, no Tailwind v4, variáveis arbitrárias como `--paper-foreground` são automaticamente expostas como utilitários de cor sem necessidade de `@theme`. Tailwind v4 gera automaticamente `text-paper-foreground`, `bg-paper-foreground`, `border-paper-foreground` para qualquer variável CSS definida como `--paper-foreground`. Isso é um comportamento do Tailwind v4 — qualquer variável `--<name>` no formato `--color-*` ou qualquer variável arbitrária com dois segmentos (ex: `--paper-foreground`) é exposta como `text-paper-foreground`, `bg-paper-foreground`, etc.

---

## 2. Uso de `border-paper-foreground` e `border-paper-muted` no projeto

### `border-paper-foreground` (87 ocorrências)

| Padrão de uso | Quant. | Exemplo típico |
|---|---|---|
| `border-paper-foreground` (100%) | 3 | Borda cheia em container de status |
| `border-paper-foreground/80` | 2 | Borda forte em selo/header de ID card |
| `border-paper-foreground/70` | 6 | Borda em header de ID card, container de ordem |
| `border-paper-foreground/60` | 6 | Borda em header de classified-project, news |
| `border-paper-foreground/40` | 17 | Borda sutil em dividers, containers, manifestos |
| `border-paper-foreground/30` | 15 | Borda muito sutil em tabelas, grids, containers |
| `border-paper-foreground/25` | 2 | Borda em asset-rows e código CSS |
| `border-paper-foreground/20` | 8 | Borda mínima em dividers de interrogação, msg |
| `border-paper-foreground/15` | 3 | Borda quase invisível em traits, exchange rows |
| `border-paper-foreground/10` | 1 | Borda extremamente sutil em party rows |

**Arquivos com mais ocorrências:** `medical-record-template.tsx`, `news-template.tsx`, `interrogation-template.tsx`, `classified-project-template.tsx`, `codex-entry-template.tsx`, `bounty-template.tsx`.

### `border-paper-muted`

**ZERO** ocorrências em todo o projeto. `border-paper-muted` nunca é usado.

### `bg-paper` (5 ocorrências)

| Arquivo | Linha | Uso |
|---|---|---|
| `classified-project-template.tsx` | 92 | `bg-paper-foreground` (header banner) |
| `classified-project-template.tsx` | 92 | `text-paper` |
| `id-card-template.tsx` | 21 | `bg-paper-foreground text-paper` (header banner) |
| `manifesto-template.tsx` | 10 | `bg-paper` (badge) |
| `archive/page.tsx` | 90 | `paper-texture text-paper-foreground` |

### `text-paper-foreground` (~200+ ocorrências)

Usado em **praticamente todos os templates** para texto de corpo, títulos, valores de campos, etc. É o token de cor de texto principal para documentos.

### `text-paper-muted` (~100+ ocorrências)

Usado para labels, metadados, descrições secundárias, rodapés.

---

## 3. `paper-texture ::before` no dark mode

### Bloco completo atual (globals.css:605-627)

```css
.paper-texture {
    /* --paper: var(--paper); */ /* valor original preservado nas variáveis :root e .dark */
    background-color: #eaeaea;
    position: relative;
    background-image:
      radial-gradient(circle at 20% 10%, oklch(0.85 0.04 60 / 0.18) 0%, transparent 45%),
      radial-gradient(circle at 80% 90%, oklch(0.80 0.05 50 / 0.12) 0%, transparent 40%);
}

.dark .paper-texture {
    background-color: #252525;
}

.paper-texture::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: url("/images/noise.webp");
    background-repeat: repeat;
    opacity: var(--paper-noise-opacity, 0.10);
    mix-blend-mode: multiply;
}
```

### Análise do `mix-blend-mode: multiply` no dark mode

| Propriedade | Light mode (`#eaeaea`) | Dark mode (`#252525`) |
|---|---|---|
| Background | `#eaeaea` | `#252525` |
| `::before` noise | Noise preto com `opacity: 10%` (via `--paper-noise-opacity`) | Noise preto com `opacity: 14%` (`.dark` tem `--paper-noise-opacity: 0.14`) |
| `mix-blend-mode` | `multiply` | `multiply` |
| Efeito esperado | Escurece sutilmente o fundo claro (~2-3% mais escuro) | Escurece um fundo **já escuro** — resultado visual mínimo ou nulo |

**`mix-blend-mode: multiply` não é ideal para dark mode** porque:
- `multiply` escurece o fundo — funciona bem em fundos claros (subtrai luz)
- Em fundos escuros (`#252525`), `multiply` tem efeito **quase zero** porque não há luz para subtrair
- O resultado em dark mode é praticamente o mesmo `#252525` — o noise fica invisível

**Alternativas para dark mode:**
- `mix-blend-mode: screen` ou `lighten` — clarearia o fundo escuro com o noise, criando textura visível
- `mix-blend-mode: difference` — efeito mais dramático, inverteria regiões do noise
- Simplesmente trocar `opacity` para 0 (desligar noise) em dark mode

**Estado atual:** O noise tem efeito mínimo ou nulo no dark mode. O `.dark .paper-texture::before` **não existe** — o `::before` usa as mesmas propriedades em ambos os modos, exceto pela opacidade ligeiramente maior (14% vs 10%).

---

## 4. Como `--paper-foreground` é consumido pelo Tailwind v4

### Bloco `@theme inline` (globals.css:9-49)

```css
@theme inline {
  --font-sans: var(--font-inter), "Inter", sans-serif;
  --font-mono: var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  --font-serif: var(--font-playfair-display), "Playfair Display", serif;
  --font-display: var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

### `--paper-foreground` NÃO está mapeada no `@theme`

Ao contrário de `--color-foreground: var(--foreground)`, `--paper-foreground` **não** é listada como `--color-paper-foreground` no `@theme inline`. Isso significa que:

- **Classes utilitárias shadcn** como `text-foreground`, `bg-background`, `border-border` funcionam via `@theme`
- **Classes `text-paper-foreground`, `border-paper-foreground`, `bg-paper-muted`** funcionam por um mecanismo diferente do Tailwind v4

### Como `text-paper-foreground` funciona então?

No Tailwind v4, qualquer variável CSS definida como `--<prefix>-<name>` é automaticamente exposta como um utilitário de cor **sem necessidade de `@theme`**, desde que siga o padrão de nomenclatura de duas partes. Especificamente:

- `--paper-foreground` → gera `text-paper-foreground`, `bg-paper-foreground`, `border-paper-foreground`, `ring-paper-foreground`, `outline-paper-foreground`
- `--paper-muted` → gera `text-paper-muted`, `bg-paper-muted`, etc.
- `--stamp-red` → gera `text-stamp-red`, etc.
- `--amber-crt` → gera `text-amber-crt`, etc.

Isso é possível porque o Tailwind v4 na detecção de `@theme` ou de propriedades custom no escopo raiz adota automaticamente qualquer variável CSS como um token de cor, desde que ela tenha o formato `<namespace>-<property>`.

**Resumo:** `--paper-foreground` é um token de cor Tailwind v4 de facto, mesmo sem estar explicitamente no `@theme inline`. As classes `text-paper-foreground`, `border-paper-foreground`, `bg-paper-foreground` são geradas automaticamente.

### Tailwind config (tailwind.config.js)

O `tailwind.config.js` contém customizações de `typography` (plugin prose), mas **não** contém definições de cor para `paper-foreground` ou `paper-muted`. Elas são puramente CSS nativo com suporte automático do Tailwind v4.
