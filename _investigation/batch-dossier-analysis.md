# Análise: Animação de Abertura de Batch + Dossier.standalone.tsx

---

## PARTE 1 — Estado atual da animação de batch

### 1.1 batch-template.tsx — Estrutura completa

**Arquivo:** `components/documents/templates/batch-template.tsx` (216 linhas)

**Estado open/closed:** `useState(false)` local — estado booleano `opened` no próprio componente. Nenhum URL param, nenhum Zustand, nenhum contexto. Resetado a cada montagem.

**Animação:** O `Folder` (capa) roda uma sequência de timers, não Framer Motion:

```
stage 0 (700ms) → stage 1 (550ms) → stage 2 (700ms) → stage 3
```

- Stage 0 → 1: selo começa a "quebrar" (classe `seal--broken`)
- Stage 1 → 2: pasta começa a abrir (classe `folder--opening`)
- Stage 2 → 3: pasta aberta (classe `folder--open`), `onOpened()` é chamado

**Revelação do conteúdo:** Quando `opened = true`, o BatchTemplate renderiza um `<div>` que antes estava com `pointer-events-none absolute inset-0 opacity-0`, agora com `opacity-100`. É uma transição CSS de 500ms (`transition-opacity duration-500`). **Não há stagger, não há spring, não há escala — cada sub-documento não tem animação de entrada individual.**

**Sub-documentos:** Array `items` (extraído de `batchItems` do `ArchiveDocument`). Renderizados em sequência com:

- `#indice` — índice com links âncora para cada peça
- Cada peça renderizada via `<Template doc={it.doc} />` (resolvido por `TEMPLATES[type]`)
- `ClassificationBar` individual, `DOCUMENT_TYPE_LABEL`, `TYPE_ACCENT` color coding
- Sticky header com navegação "↑ Índice" e contagem `peça XX / YY`

**Dependências de componentes:**
- `PaperSheet` — wrapper visual dos sub-documentos
- `ClassificationBar` — barra de classificação no topo
- `Folder` — `components/documents/general-components/ui/folder.tsx` (ícone decorativo com animação própria de selo quebrando)
- `RenderMdx` — renderização de MDX inline no corpo do batch
- `TEMPLATES` — barrel de templates
- `cn` — `clsx` + `twMerge`

**Fallback para sub-documento sem template:**
```tsx
{Template ? <Template doc={item.doc} /> : <p>{role ?? slug}</p>}
```

**Fallback para batch vazio:**
```tsx
{items.length === 0 && <RenderMdx mdxSource={doc.mdxSource} />}
```

**TYPE_ACCENT:** Mapeamento de 22 tipos de documento para classes de cor (`bg-stamp-red`, `bg-amber-crt`, `bg-cyan-crt`, `bg-paper-foreground`).

### 1.2 folder.tsx — A "capa" existente

**Arquivo:** `components/documents/general-components/ui/folder.tsx` (126 linhas)

- Estado local `stage` (0-3) com `setTimeout` encadeados
- `onOpened` callback para o BatchTemplate saber quando revelar o conteúdo
- `storageKey` opcional para `sessionStorage` — se já visto, pula a animação
- `prefers-reduced-motion` check — pula direto
- Visual: pasta marrom com selo redondo vermelho que "quebra" no centro
- Selo tricolor: `bg-stamp-ink-red` | `bg-stamp-ink-black` | `bg-stamp-ink-amber`
- Acessível via `role="button"`, `tabIndex={0}`, `aria-label`
- **Sem Framer Motion**, **sem spring**, **sem stagger**

### 1.3 Consumo do batch-template

**Onde é consumido:**
1. `components/documents/index.ts` — registrado em `TEMPLATES["batch"]` (linha 18)
2. `app/government/classified/[slug]/page.tsx` — rota que serve `red-suns-batch`
3. `lib/archive/registry.ts` — `"red-suns-batch"` registrado em `RAW`

**Fluxo de dados até batch-template:**
```
classified/[slug]/page.tsx (server component)
  → getDocument(slug) → RAW["red-suns-batch"]
  → serialize(raw.mdx) → ArchiveDocument
  → se type === "batch":
      getBatchItems(fm) → items (raw de registry)
      serialize cada item.mdx → sourceMap
      monta batchItems com mdxSource serializado
  → TEMPLATES["batch"] → BatchTemplate
```

**getBatchItems(fm):** (registry.ts:221-226)
- Lê `fm.items` (array de slugs), chama `getDocument(slug)` para cada
- Retorna `Array<{ slug, role?, note?, doc? }>` — doc pode ser `undefined` se slug não existir no registry

**Frontmatter do batch (red-suns-batch MDX):**
```yaml
type: batch
items:
  - slug: red-suns-overview
  - slug: red-suns-training
  - slug: red-suns-evaluation
    role: "Avaliação primária"
  ...
```

### 1.4 Limitações conhecidas

1. **Animação de capa frágil:** Timers manuais (`setTimeout` 700ms → 550ms → 700ms) — qualquer variação de rede/performance quebra timing.
2. **Capa some instantaneamente:** Quando `opened = true`, o `<Folder>` **não é mais renderizado** (`{!opened && <Folder ... />}`). Não há transição de saída do Folder — ele simplesmente desaparece.
3. **Conteúdo aparece de uma vez:** `transition-opacity duration-500` no wrapper inteiro. Sub-documentos não têm entrada escalonada.
4. **`max-h` não é usado:** Na versão atual, o conteúdo não tem animação de altura — é opacidade binária.
5. **Estado fechado cobre conteúdo:** `pointer-events-none + absolute + opacity-0` — o conteúdo já está no DOM, invisível mas renderizado.
6. **Sem loading/skeleton:** `getBatchItems` é síncrono (memória), mas se um dia for async, não há tratamento.
7. **Sem hotkey ou keyboard nav:** Folder tem `onKeyDown` (Enter, Space, Escape), mas só "pular" a animação. Não há keyboard nav entre sub-docs.
8. **Sem metáfora física de dossiê:** O Folder é uma capa simples com selo. Não há clipe, elástico, abas, carimbo, textura de papel envelhecido, fita adesiva, canto de metal — zero elementos que sugiram "pasta de arquivo físico".

---

## PARTE 2 — Análise do Dossier.standalone.tsx

**Arquivo:** `_import/Dossier.standalone.tsx` (1699 linhas)
**Origem:** Gerado no Lovable, ainda fora do build do projeto.
**Dependência faltante:** `framer-motion` **não está instalado** no projeto (grep em `package.json` retorna 0 ocorrências).

### 2.1 Elementos visuais

O componente simula uma **pasta de arquivo físico** completa:

| Elemento | Implementação | Descrição |
|---|---|---|
| **Capa da pasta** | `DossierCover` + 4 layouts (`default`, `crest-hero`, `minimal`, `field-report`) | Cada layout varia título, brasão, metadados e disposição dos selos |
| **Textura de papel** | `PaperTexture` sub-componente | 3 variantes: `noise` (SVG feTurbulence), `grain` (turbulence + flecks), `fiber` (SVG pattern de linhas + specks) |
| **HUD overlay** | `HudOverlay` sub-componente | Scanlines (linhas horizontais), grid (quadriculado 28px), corner brackets (cantos tipo interface) |
| **Código de barras** | `Barcode` sub-componente | Procedural: mapeia charCode de `caseId` para largura de barras SVG |
| **Brasão** | `AgencyCrest` sub-componente | SVG circular com anel tipográfico, linhas internas, label |
| **Selo de classificação** | `ClassifiedStamp` sub-componente | 2 shapes: `rect` (com presets para TOP SECRET, CLASSIFIED, EYES ONLY, REDACTED, CONFIDENTIAL) e `circle` (anel tipográfico). Ambos com distorção SVG (feTurbulence + feDisplacementMap) |
| **Metadados** | `CaseMetadata` sub-componente | Grid de CASE #, DATE, CLEARANCE em fonte monospace |
| **Contracapa interna** | `InnerCover` sub-componente | Mostrada na animação `double-cover` — selo circular neon + classificação |
| **Conteúdo interno** | `DossierContent` wrapper | Aplica surfaceStyle + shadow-folder-open, renderiza `children` ou `EmptyPayload` |
| **Botão de fechar** | `[ESC] CLOSE` com Framer Motion | Aparece no topo quando aberto, fade-in com delay 200ms. Esc key fecha |

### 2.2 Animações e interações

**Todas implementadas com Framer Motion** (nenhuma CSS transition pura):

| Aspecto | Detalhe |
|---|---|
| **9 animações de capa** | `flip3d` (default), `slide`, `glitch`, `combo`, `scale-rise`, `peel`, `shred`, `iris`, `double-cover` |
| **Mola spring** | `transition: { type: "spring", stiffness: 300, damping: 25 }` ou easing custom `[0.22, 1, 0.36, 1]` |
| **Stagger** | `shred` anima 5 tiras com delay `i * 0.06s`. `double-cover` tem cover + inner cover com delay de 0.4s |
| **Reduced motion** | `useReducedMotion()` → fallback para `slide` |
| **Trigger** | `click` (default), `hover`, ou `manual` (controlled) |
| **Controlled mode** | `open`/`onOpenChange` props para controle externo |
| **Drag** | Mencionado no cabeçalho do arquivo como interação planejada, mas **não implementado** no código atual (sem `drag` props) |
| **Foco acessível** | Conteúdo recebe `tabIndex={-1}` e `focus()` ao abrir. Trigger é `<button>` com `aria-expanded` + `aria-controls` |
| **Esc key** | `useEffect` com `keydown` listener — fecha se `dismissible` (default true) |

### 2.3 Props e mapping com Lumen

```typescript
interface DossierProps {
  title?: string;           // → fm.title
  caseId?: string;          // → fm.case_id ?? fm.reference
  date?: string;            // → fm.date
  classification?: string;  // → fm.classification (mas Lumen usa "SECRETO" e Dossier espera "TOP SECRET")
  stamps?: DossierStamp[];  // → derivado da classification
  showBarcode?: boolean;    // default true
  showHud?: boolean;        // default true
  crest?: boolean | DossierCrest;
  layout?: DossierLayout;   // "default" | "crest-hero" | "minimal" | "field-report"
  surface?: DossierSurface; // "paper" | "glass" | "carbon"
  paperTexture?: DossierPaperTexture;
  animation?: DossierAnimation;
  trigger?: DossierTrigger;
  open?: boolean;           // controlled
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  children?: ReactNode;
  aspect?: "portrait" | "landscape" | "square";
}
```

**Compatibilidade com `DocumentFrontmatter`:**
- `title` → `fm.title` ✓
- `caseId` → `fm.case_id ?? fm.reference` ✓
- `date` → `fm.date` ✓
- `classification` → nomes diferentes (Dossier usa "TOP SECRET" etc, Lumen usa "ULTRASSECRETO" etc) **requer adaptação**
- `stamps` → não existe no frontmatter, seria derivado
- `children` → equivalente ao conteúdo do batch (sub-documentos renderizados)

### 2.4 Riscos técnicos de integração

1. **Framer Motion não instalado** — zero ocorrências em `package.json`. Seria dependência nova.
2. **CSS vars não existentes no Lumen:** O Dossier espera:
   - `--dossier-radius`, `--paper`, `--paper-ink`, `--paper-edge`
   - `--ink-red`, `--neon-red`, `--neon-amber`, `--neon-cyan`
   - `--hud-grid`, `--glass-bg`, `--glass-border`, `--glass-blur`
   - `--carbon-bg`, `--carbon-ink`, `--carbon-edge`
   - `--shadow-folder`, `--shadow-folder-open`
   - `--font-mono`
   
   O Lumen tem vars próprias (`--c-public`, `--paper-foreground`, `--paper-muted`, etc.) em `@theme inline`. As vars do Dossier **não existem** e muitas têm overlap semântico (ex: `--paper` do Dossier ≈ `oklch(0.955 0.018 90)` vs papel do Lumen é outro).
3. **Conflito de nomes:** Já existe `DossierTemplate` em `components/documents/templates/dossier-template.tsx` (39 linhas, template simples com PaperSheet + foto placeholder). O `Dossier.standalone` exporta `Dossier` — nomes não colidem diretamente, mas causam confusão.
4. **Tema escuro não implementado:** Dossier só tem modo claro com fundo papel envelhecido. Lumen já tem dark mode via `@media (prefers-color-scheme: dark)` e CSS vars.
5. **Performance:** ~15 elementos Framer Motion simultâneos (cover, textures, overlays, stamps, barcode, crest). Cada layout renderiza `PaperTexture` (SVG filters pesados) + `HudOverlay` (scanlines + grid). Pode ser pesado em mobile.
6. **Labels de classificação:** Dossier usa inglês ("TOP SECRET", "CLASSIFIED", "CONFIDENTIAL"). Lumen usa português ("ULTRASSECRETO", "SECRETO", "CONFIDENCIAL"). Mapeamento necessário.
7. **Aspect ratio fixo:** `aspect-[3/4]` portrait — se o conteúdo do batch for muito longo, fica espremido. Layout do Lumen é scroll vertical livre.
8. **`cn()` helper próprio:** Dossier define `cn()` inline — colide com `@/lib/utils`. Se integrado, precisaria importar de lá.

---

## PARTE 3 — Viabilidade de integração

### 3.1 Comparação: experiência atual vs Dossier

| Aspecto | batch-template + Folder (atual) | Dossier.standalone |
|---|---|---|
| **Metáfora visual** | Pasta simples com selo | Pasta completa com textura, HUD, selos, brasão, código de barras, cantos |
| **Animações** | CSS transições + timers manuais (setTimeout) | Framer Motion spring com 9 presets de animação |
| **Capa some** | Instantaneamente (condicional de render) | Animação de saída via AnimatePresence |
| **Conteúdo** | Renderizado sempre (só invisível) | Só montado quando `open = true` |
| **Stagger** | Não tem | `shred` tem stagger por tira |
| **Sub-docs** | Array de ArchiveDocument com templates | `children` React genéricos |
| **Acessibilidade** | `role="button"`, keydown handler, aria-label | `<button>` nativo, `aria-expanded`, `aria-controls`, focus management, Esc key |
| **Reduced motion** | `prefers-reduced-motion: reduce` → skip | `useReducedMotion()` → fallback `slide` |
| **Estados** | 4 stages manuais (0-3) | Controlled ou uncontrolled com `open`/`onOpenChange` |
| **Customização** | TYPE_ACCENT (22 cores) | 4 layouts, 3 surfaces, 3 paper textures, 9 animations |
| **Tema escuro** | Suportado via PaperSheet | Não implementado |
| **Dependências** | Só React + Tailwind | React + Tailwind + Framer Motion |
| **Linhas** | 216 (batch) + 126 (folder) = 342 | 1699 (arquivo único) |
| **CSS vars** | Usa vars do Lumen | Define vars próprias (13+ novas) |

### 3.2 Caminhos de integração

#### Caminho A — Substituir completamente batch-template + Folder pelo Dossier

**Descrição:** `BatchTemplate` e `Folder` são removidos. `TEMPLATES["batch"]` passa a ser um wrapper que monta `<Dossier>` com os `batchItems` transformados em `children`.

**Estrutura conceitual:**
```
BatchTemplate (adaptado)
  → busca fm.title, fm.case_id, fm.classification
  → mapeia classification Lumen → Dossier (ex: "ULTRASSECRETO" → "TOP SECRET")
  → renderiza <Dossier title={...} caseId={...} classification={...} layout="default" surface="paper">
      {items.map(it => <Template doc={it.doc} />)}
    </Dossier>
```

**O que ganha:**
- Metáfora física completa (textura, HUD, selos, brasão, barcode)
- 9 animações de abertura (flip3d, slide, glitch, etc.)
- AnimatePresence (capa não some instantaneamente)
- Acessibilidade melhorada (foco, aria, Esc key)
- Componente controlled (pode abrir/fechar de fora)

**O que custa:**
- `framer-motion` precisa ser adicionado ao projeto
- 13+ CSS vars novas precisam ser declaradas (no `@theme inline` ou globals.css)
- Mapeamento de classification EN → PT e vice-versa
- `aspect-[3/4]` fixo do Dossier conflita com layout scrollável do Lumen
- Tema escuro precisa ser implementado no Dossier (ou aceitar que só funciona em light mode)
- Performance precisa ser testada no batch real (11 sub-docs do red-suns)
- Perde `TYPE_ACCENT` color coding por tipo de sub-doc (Dossier não tem esse conceito)

**Complexidade:** **Alta** — requer adição de dependência, 13+ CSS vars, adaptação de props, implementação de dark mode, ajuste de aspect ratio, e perda de funcionalidade existente (TYPE_ACCENT).

**Impacto em outras rotas:** Afeta qualquer rota que use `TEMPLATES["batch"]` → codex, classified, profiles, archive. Muda a experiência do usuário globalmente. `Folder.tsx` deixa de ser usado (pode ser removido ou mantido para outros fins).

#### Caminho B — Dossier como wrapper opcional que envolve batch-template

**Descrição:** O `BatchTemplate` existente permanece intacto como o conteúdo interno. Um novo wrapper (ex: `DossierBatch`) usa apenas o `Dossier` como capa: quando fechado, mostra a capa; quando clicado, anima a abertura e revela o `BatchTemplate` abaixo.

**Estrutura conceitual:**
```
DossierBatch (novo componente)
  → estado open (useState ou controlled)
  → renderiza <Dossier title={...} caseId={...} classification={...} layout="minimal" surface="paper" open={open} onOpenChange={setOpen}>
      <BatchTemplate doc={doc} />
    </Dossier>
```

**Mas como o Dossier cobre o BatchTemplate por dentro?** O `DossierContent` é o que aparece quando `open = true`. Então o `BatchTemplate` passado como `children` do Dossier seria renderizado **dentro** do espaço do Dossier (que tem `aspect-[3/4]`). Isso provavelmente ficaria espremido.

**Alternativa B2:** Usar o Dossier **apenas como capa independente** (quando fechado, mostra a capa; quando clicado, **navega** para a página de batch). Mas isso muda a UX de "revelar no lugar" para "navegação entre páginas".

**O que ganha:**
- Metáfora de capa de pasta na entrada
- Não altera `BatchTemplate` em nada
- Pode ser usado seletivamente (ex: só em classified, não em codex)

**O que custa:**
- Framer Motion + CSS vars ainda necessários
- Conflito de layout: Dossier tem `aspect-[3/4]` fixo, batch é scroll livre
- "Wrapper que abre e revela" não funciona bem porque o Dossier espera que o children caiba dentro do mesmo espaço da capa
- Duplicação de lógica de renderização de conteúdo

**Complexidade:** **Alta** — o mismatch de layout (aspect ratio fixo vs scroll livre) torna difícil usar o Dossier como wrapper sem repensar a estrutura visual.

#### Caminho C — Extrair apenas o padrão de animação do Dossier e injetar no batch-template existente

**Descrição:** Em vez de importar o Dossier inteiro, extrair apenas os conceitos de animação (spring physics, stagger, AnimatePresence) e reimplementá-los dentro do `batch-template.tsx` + `folder.tsx` existentes, usando Framer Motion no lugar dos timers manuais e CSS transitions.

**Mudanças específicas:**
1. Substituir `setTimeout` encadeados do `folder.tsx` por `motion.div` com variantes Framer Motion (spring, duração 0.7s)
2. Substituir `transition-opacity` do wrapper de conteúdo por `<AnimatePresence>` com saída animada
3. Adicionar stagger nos sub-documentos (cada peça entra com delay `index * 80ms`)
4. Manter `Folder.tsx` como o visual da capa (pasta + selo), mas com animação spring em vez de timers

**O que ganha:**
- Animações fluidas (spring physics, sem timers manuais)
- Stagger nos sub-documentos
- Capa não some instantaneamente (exit animation)
- Mantém todo o visual e pipeline existente
- `TYPE_ACCENT`, `ClassificationBar`, `PaperSheet` — tudo permanece
- `Folder.tsx` continua sendo a "capa", mas com spring

**O que custa:**
- `framer-motion` precisa ser adicionado
- Perde a metáfora visual completa do Dossier (textura, HUD, selos, brasão, barcode)
- Perde os 9 presets de animação (só usaria 1 ou 2)
- Ainda é uma implementação "caseira" — não ganha a riqueza visual do Dossier

**Complexidade:** **Baixa-Média** — alterações localizadas no `folder.tsx` (~30 linhas alteradas) e `batch-template.tsx` (~20 linhas). Adicionar stagger nos sub-docs (~10 linhas). Adicionar framer-motion ao projeto.

**Impacto em outras rotas:** Global via `TEMPLATES["batch"]`, mas apenas na *qualidade* da animação — visual, comportamento e dados permanecem idênticos. Nada quebra.

#### Caminho D — Dossier como capa temática no classified, batch-template como conteúdo interno

**Descrição:** Caminho híbrido que aproveita o que cada um faz melhor: o `Dossier` é usado **apenas como a capa de entrada** (cover), e quando o usuário clica para abrir, em vez de revelar conteúdo dentro do aspect ratio fixo, faz uma transição de página (client-side navigation ou view transition) para a página de batch atual.

**Estrutura conceitual:**
```
classified/[slug]/page.tsx (para red-suns-batch)
  → Mostra <Dossier layout="default" trigger="click" open={false} dismissible={false}>
      (sem children — só a capa)
    </Dossier>
  → Ao clicar, navega para /government/classified/batch/red-suns-batch (nova rota?)
  → Ou: usa View Transition API para animar a capa saindo e o batch entrando

NOVIDADE: classified/batch/[slug]/page.tsx
  → Renderiza o BatchTemplate atual exatamente como hoje
```

**O que ganha:**
- Capa temática do Dossier na landing do batch
- BatchTemplate inalterado como conteúdo
- Separação clara de responsabilidades
- Dossier funciona standalone (sem children) — que é o caso de uso dele

**O que custa:**
- Framer Motion + CSS vars
- Nova rota ou client-side navigation
- Duas páginas em vez de uma
- UX de "abrir pasta" → navegação, não revelação in-place

**Complexidade:** **Média** — Dossier standalone é mais simples de integrar (sem conflito de layout). Requer nova rota ou transição, mas o Dossier em si é plug-and-play sem children.

**Impacto em outras rotas:** Nenhum — `TEMPLATES["batch"]` continua existindo. O Dossier é adicionado como um "front-end" opcional para a rota classified.

### 3.3 Recomendação

**Caminho C** como primeiro passo (curto prazo):

- Adiciona Framer Motion (que abre portas para outros usos futuros)
- Melhora a animação existente sem mudar visual nem pipeline
- Baixo risco, não quebra nada
- Stagger nos sub-docs melhora a percepção de "abrir pasta" com custo quase zero
- Spring physics substitui timers manuais frágeis

**Caminho D** como segundo passo (médio prazo):

- Depois de Framer Motion instalado, integrar o Dossier como capa standalone
- Requer decidir se navigation in-place vs nova rota
- Dá a metáfora visual completa sem o problema de aspect ratio
- O Dossier pode ser reutilizado como capa temática em outros lugares (codex entries, dossiês de personagem)

**Caminho A** é o destino ideal (experiência unified de pasta física), mas o custo de adaptar 1699 linhas + 13 CSS vars + dark mode + aspect ratio + mapeamento de classification torna arriscado como primeiro ou segundo passo. Só vale se houver intenção de longo prazo de abandonar o visual atual do BatchTemplate completamente.

**O que NÃO fazer:** Caminho B (wrapper que revela batch-template por dentro) — o mismatch de aspect ratio torna a integração problemática e o resultado final seria pior que o atual.
