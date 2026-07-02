# Investigação: Navegação Interna do Batch — Scroll Contínuo → Folhas Empilhadas

## PARTE 1 — Estado Atual

### Renderização (`batch-template.tsx`)

O componente `BatchTemplate` recebe um `ArchiveDocument` com `type: "batch"` e renderiza em **duas seções sequenciais** dentro de um `motion.div` que aparece após o `DossierFolder` ser aberto:

1. **Seção Índice** (`<section id="indice">` dentro de `<PaperSheet>`):
   - `ClassificationBar`, título, issued_by, case_id, data
   - `cover_note` opcional
   - Lista `<ol>` de itens (`.batch-index`) — cada item é um `<a href="#peca-{slug}">` com:
     - Accent colorido (`TYPE_ACCENT[type]`)
     - Número `XX` pad (01, 02…)
     - Tipo (`DOCUMENT_TYPE_LABEL[type]`)
     - Título, role opcional, data
     - Chevron `›`
     - Animação de entrada escalonada (`.batch-index-row` com `animation-delay`)
   - Conteúdo MDX inline (`doc.mdxSource`) abaixo do índice

2. **Peças Individuais** (`items.map(…)`):
   - **Cada peça** é um `<div>` com `id="peca-{slug}"` e `scroll-mt-6`
   - **Sticky header** (`.sticky top-2 z-10`): botão `↑ Índice` + legenda `arquivo · {id} › peça XX / YY · {title}`, com backdrop-blur
   - **Template** renderizado dentro de `.paper-stack-bed`
   - **Scroll vertical contínuo** — todas as peças estão no DOM, uma após a outra, separadas pelo sticky header

### Estado de Rastreamento

**Não há estado para "qual peça está visível".** Não existe IntersectionObserver, scroll spy, ou tracking de posição. O scroll é puramente o navegador lidando com um documento HTML longo. O único "posicional" é:

- O índice com `href="#peca-{slug}"` (âncora nativa)
- O `scroll-mt-6` no container de cada peça (para o scroll suave da âncora)
- O texto `peça XX / YY` no sticky header é derivado do `idx` do map — é puramente decorativo, não reflete posição real de scroll

### Fluxo de Abertura

- Estado booleano `opened` controla se o `DossierFolder` (cover) ou o conteúdo aparece
- `AnimatePresence` envolve ambos os blocos
- `DossierFolder` está com `dismissible={false}` — não pode fechar depois de aberto

---

## PARTE 2 — DocumentNavigator como Referência Visual

### Estrutura Visual Completa (`components/government/document-navigator.tsx`, 59 linhas)

```
┌──────────────────────────────────────────────────┐
│  DOCUMENTO 3 DE 12    [← ANTERIOR] [PRÓXIMO →]  │
└──────────────────────────────────────────────────┘
```

- **"DOCUMENTO X DE Y"**: `<span className="text-xs font-mono text-muted-foreground">`
- **Botões**: `rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors`
- **Estado disabled**: mesma borda com `/30` opacity + `text-muted-foreground opacity-30 cursor-not-allowed`
- **Layout**: container flex com gap-2

### Uso no Classified (`app/government/classified/[slug]/page.tsx`)

O mesmo visual é **inline** (não reusa o componente `DocumentNavigator`), dentro de uma barra horizontal com `← VOLTAR` à esquerda e o navigator à direita. O navegador é renderizado no server component, usando `<Link>` do Next.js.

### Uso no Codex (`components/government/codex-doc-viewer.tsx`)

Reusa `DocumentNavigator` como componente importado, dentro de uma barra idêntica com `border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4`.

### Reutilizável vs Precisa Reescrita

| Parte | Reutilizável? | Motivo |
|---|---|---|
| `text-xs font-mono text-muted-foreground` + "DOCUMENTO X DE Y" | ✅ Sim | Só texto + formatação |
| Estilo dos botões (borda, padding, hover) | ✅ Sim | Classes puras, sem dependência de rota |
| Lógica de "disabled se first/last" | ✅ Sim | Mesmo pattern: `idx > 0 ? Link : span disabled` |
| `Link` do Next.js | ❌ Não | Sub-documentos não são rotas — precisa ser `button` ou `a #` |
| `basePath` + `href` | ❌ Não | Sem href de rota — navegação é estado interno (setState) |

### Conclusão da Parte 2

A **identidade visual** do DocumentNavigator é replicável com ~15 linhas de tailwind + um estado local. Não vale a pena extrair um sub-componente "visual only" — a barra é pequena demais para justificar a abstração. O ideal é **copiar o estilo inline** no batch-template, trocando `Link` por `button` + setState.

---

## PARTE 3 — Modelo de "Folhas Empilhadas"

### 3.1 Referências de Implementação

#### Referência A — Stack de Cards com Rotação/Offset (motion/react)
O padrão clássico de cartas empilhadas: cada "folha" não-ativa fica com:
- `rotate: -1deg` e `y: 4px` para as anteriores
- `rotate: 2deg` e `y: 8px` para as posteriores
- `z-index` decrescente conforme se afasta do topo
- A folha ativa no topo com `scale: 1, rotate: 0, y: 0`
- Transição com `layout` animation do motion/react

#### Referência B — "Carrossel de Folhas" com Slide Horizontal
- Cada folha ocupa 100% da largura
- Navegação com botões ANTERIOR/PRÓXIMO (slide horizontal ou fade)
- Indicador de posição tipo "peça 03 / 11"
- Entrada/saída com `AnimatePresence` + `animate={{ x: ... }}`

#### Referência C — "Flip Book / Virar Página"
- Transição 3D com `rotateY` no eixo central
- Mais complexo, mas tem sinergia com `DossierFolder` que já usa `flip3d`
- Risco: acessibilidade e performance em mobile

#### Recomendação: Referência A + B híbrida (Stack + Slide)
Motivo: o stack visual (A) dá a sensação tátil de "folhas empilhadas", e o slide (B) é a navegação principal (ANTERIOR/PRÓXIMO). As duas se complementam: o stack é o estado passivo (folhas não-ativas visíveis atrás da atual), o slide é a transição ativa.

### 3.2 Estrutura de Estado

O estado mais simples possível:

```typescript
const [activeIndex, setActiveIndex] = useState(0);
```

- **Local** no próprio `BatchTemplate` (não precisa de contexto — é uma view isolada)
- `activeIndex` vai de `0` (primeira peça) a `items.length - 1` (última)
- Botões ANTERIOR/PRÓXIMO usam `setActiveIndex(prev => prev - 1 / +1)`
- Navegação direta pelo índice (vinda do `#indice` reformulado) usa `setActiveIndex(n)`

### 3.3 Impacto no `#indice` Atual

O índice atual tem `href="#peca-{slug}"` que faz scroll nativo. No novo modelo:

- Cada item do índice vira um `button` com `onClick={() => setActiveIndex(idx)}`
- Visual do índice permanece idêntico (mesma classe `.batch-row`, accent colorido, etc.)
- O índice não precisa mais de âncoras — remove `id="peca-{slug}"` e `scroll-mt-6`

### 3.4 Impacto nos Elementos que Dependem de Scroll Contínuo

| Elemento | Hoje | Amanhã |
|---|---|---|
| **Sticky header** (`sticky top-2`) | Gruda no topo, mostra "peça XX / YY" baseado no idx do map | Vira **barra de navegação fixa** (não sticky, porque não há scroll longo). Mostra "peça XX / YY" + ANTERIOR/PRÓXIMO |
| **ClassificationBar por peça** | Cada template tem sua própria, dentro do PaperSheet | Continua funcionando — cada template é auto-contido |
| **TYPE_ACCENT** | Usado no índice para colorir a barra lateral | Continua funcionando — mesma cor, mesmo uso no índice |
| **paper-stack-bed** | Pseudo-elementos ::before/::after que criam as "folhas atrás" | Vira o contêiner do stack visual (rotação/offset das folhas inativas ao redor da ativa) |
| **paper-stack-in animation** | Anima cada peça individualmente ao entrar no DOM | Substituído por `AnimatePresence` + transition no activeIndex |
| **RenderMdx do índice** (doc.mdxSource) | Renderizado no final do índice | Permanece no índice (que agora vira a "peça 0" ou um painel separado antes das peças) |

#### Sobre o `paper-stack-bed`

O CSS atual de `.paper-stack-bed` cria **duas folhas decorativas atrás** de cada peça individual (via `::before` e `::after` com rotação). Esse efeito é por-peça hoje (cada template tem seu próprio `paper-stack-bed`). No modelo empilhado, a metáfora muda:

- O **stack inteiro** ganha um único `paper-stack-bed` (ou similar) como container
- As folhas "inativas" (anterior/posterior à ativa) são visualmente representadas como **miniaturas com rotação** no atrás (usando motion/react, não pseudo-elementos)
- As peças individuais deixam de ter `paper-stack-bed` próprio — o `Template` renderiza apenas o PaperSheet interno

#### Sobre o sticky header

O sticky header atual só faz sentido em scroll contínuo (é uma âncora flutuante). No modelo empilhado:

- Vira uma **barra fixa no topo da área de conteúdo**, com:
  - `← ANTERIOR` (disabled se `activeIndex === 0`)
  - `peça XX / YY` no centro
  - `PRÓXIMO →` (disabled se `activeIndex === items.length - 1`)
  - Botão `↑ Índice` à esquerda (volta activeIndex para -1 ou mostra o índice)
- Visualmente, reaproveita o estilo do DocumentNavigator (borda, font-mono, uppercase)

---

## PARTE 4 — Reintegração do Close do DossierFolder

### 4.1 O que muda no batch-template

Hoje:
```typescript
const [opened, setOpened] = useState(false);
// ...
dismissible={false}
onOpenChange={(isOpen) => { if (isOpen) setOpened(true); }}
```

Para reativar o close, basta:
```typescript
dismissible={true}
onOpenChange={setOpened}
```

Não há trabalho extra. O `DossierFolder` já implementa:
- Listener de `Escape` keydown (quando `dismissible` é true)
- Botão `[ESC] CLOSE` no canto (se `showCloseButton` — verificar se está habilitado no layout default)

### 4.2 Estado `opened` → false: resetar ou manter posição?

Duas opções:

**Opção A — Resetar para primeira peça:**
```typescript
const [opened, setOpened] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);

onOpenChange={(next) => {
  setOpened(next);
  if (!next) setActiveIndex(0); // reseta
}}
```
- Simples, previsível, o cover reabre sempre do início
- O usuário perde a posição se fechar e reabrir

**Opção B — Manter última posição:**
```typescript
const [opened, setOpened] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);
const lastActiveRef = useRef(0);

onOpenChange={(next) => {
  setOpened(next);
  if (!next) lastActiveRef.current = activeIndex;
  else setActiveIndex(lastActiveRef.current);
}}
```
- Mais polido para quem quer consultar a mesma peça após fechar
- Estado ligeiramente mais complexo (ref + sincronia)

**Recomendação:** Opção B (manter). O custo é mínimo e a experiência é melhor. Se o usuário quiser voltar ao início, pode usar o índice.

### 4.3 Animação Reversa

O `AnimatePresence` já envolve o `DossierFolder` e o conteúdo. Quando `opened` vai de `true → false`:

1. `AnimatePresence` detecta a saída do `<motion.div key="batch-content">`
2. Aplica `exit={{ opacity: 0, y: -20 }}`
3. Remove do DOM após a transição
4. `DossierFolder` reaparece com sua animação de entrada (flip3d → aberto)

**Nada precisa ser alterado.** O fluxo de `AnimatePresence` com `!opened` / `opened` já cobre os dois lados.

---

## PARTE 5 — Proposta de Caminhos

### Abordagem A — Reescrever batch-template.tsx do zero

Criar um novo `BatchStackedTemplate` que substitui o atual.

- **Prós**: Código limpo, sem legado de scroll, estado coeso
- **Contras**: Perde o histórico de git do componente atual; risco de regressão se algo for esquecido
- **Complexidade**: Média (reatar o índice, adaptar CSS, integrar DossierFolder)
- **Risco de quebrar templates existentes**: Baixo — cada `Template` individual é auto-contido

### Abordagem B — Criar `BatchStackViewer` que substitui só a renderização de items (recomendada)

Manter `BatchTemplate` como wrapper (DossierFolder + índice + layout externo), mas extrair a área de peças para um componente `BatchStackViewer` que gerencia o estado `activeIndex` e a navegação.

**Estrutura proposta:**

```
BatchTemplate
├── DossierFolder (cover, inalterado)
├── Índice (mesmo layout, onClick → setActiveIndex)
└── BatchStackViewer     ← novo componente
    ├── Barra de navegação (ANTERIOR / peça XX de YY / PRÓXIMO)
    ├── Stack de folhas (AnimatePresence + motion)
    │   └── Template ativo (it.doc → TEMPLATES[type])
    └── Folhas inativas decorativas (opcional: miniaturas com rotação)
```

**Prós:**
- `BatchTemplate` permanece como orquestrador (índice + cover + viewer)
- Separação clara de responsabilidades
- `BatchStackViewer` testável isoladamente
- Fácil de reverter se algo der errado (só trocar o componente filho)

**Contras:**
- Dois arquivos em vez de um
- `BatchTemplate` ainda carrega o índice (que poderia estar no viewer também)

**Complexidade:** Baixa-Média

**Risco de quebrar templates existentes:** Mínimo — o `Template` continua recebendo `doc` da mesma forma, só muda o container

### Abordagem C — Híbrida: scroll + stack (não recomendada)

Manter o scroll contínuo mas adicionar um "ver em tela cheia" que abre o stack viewer para uma peça específica.

**Prós:** Oferece ambas as experiências
**Contras:** Duplica manutenção, confunde o usuário, aumenta complexidade de estado e CSS
**Recomendação:** Descartar — o scroll atual não tem vantagem sobre o stack (não há "visão geral" que o índice não resolva melhor)

### Recomendação Final

**Abordagem B** — `BatchStackViewer` como novo componente que substitui a renderização de `items.map(...)` no `BatchTemplate`.

### Checklist de Implementação (para referência futura)

1. Criar `components/documents/templates/batch-stack-viewer.tsx`
   - Props: `items: BatchItem[]`, `classification: string` (para a barra)
   - Estado: `activeIndex: number` (useState)
   - Render: barra de navegação (estilo DocumentNavigator) + `AnimatePresence` com `motion.div` para cada folha
2. Em `BatchTemplate`:
   - Trocar `items.map(...)` por `<BatchStackViewer items={items} />`
   - Trocar `href="#peca-..."` no índice para `onClick` que atualiza um estado passado via callback (ou centralizar `activeIndex` no BatchTemplate)
3. CSS:
   - Reaproveitar `.batch-index-row` (inalterado)
   - Reavaliar `.paper-stack-bed` (específico por peça hoje) — provavelmente remover ou transformar em wrapper único do stack
   - Remover `.paper-stack-piece`, `.batch-row--link` (substituído por navegação de estado)
   - Manter `.batch-row`, `.batch-row-accent`, `.batch-row--missing` (índice continua igual)
4. DossierFolder close: `dismissible={true}` + `onOpenChange={setOpened}` + Opção B (manter posição)
5. Remover âncoras: deletar `id="peca-{slug}"`, `scroll-mt-6`, botão `↑ Índice` via href (trocar por navegação de estado)

### Efeito Visual Esperado

```
┌────────────────────────────────────────┐
│  [↑ ÍNDICE]    peça 03 / 11    [←] [→]│  ← barra fixa (DocumentNavigator style)
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐  │
│  │   Template da peça ativa         │  │  ← animação de entrada (slide/fade)
│  │   (PaperSheet + conteúdo)        │  │
│  └──────────────────────────────────┘  │
│                                        │
│   ┌────────────────────────────────┐   │  ← folha anterior (rotação, opacidade)
│   │   (peça anterior, mini)        │   │
│   └────────────────────────────────┘   │
│        ┌──────────────────────────┐    │  ← folha posterior (rotação contrária)
│        │  (próxima peça, mini)     │    │
│        └──────────────────────────┘    │
└────────────────────────────────────────┘
```

### Animação Sugerida

Usando `motion/react` (já instalado):

```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={items[activeIndex].slug}
    initial={{ opacity: 0, x: direction > 0 ? 60 : -60, rotate: direction > 0 ? 2 : -2 }}
    animate={{ opacity: 1, x: 0, rotate: 0 }}
    exit={{ opacity: 0, x: direction > 0 ? -60 : 60, rotate: direction > 0 ? -2 : 2 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
  >
    <Template doc={items[activeIndex].doc!} />
  </motion.div>
</AnimatePresence>
```

Onde `direction` é `1` (PRÓXIMO) ou `-1` (ANTERIOR), derivado de uma comparação entre o `activeIndex` anterior e o atual via `useRef`.

As folhas inativas ao redor podem ser `motion.div` com `rotate`, `scale(0.95)`, `y`, e `zIndex` calculados a partir de `activeIndex` — tudo com motion, sem pseudo-elementos.
