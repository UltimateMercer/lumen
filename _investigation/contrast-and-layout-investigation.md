# Investigação — Sumário sticky + contraste light mode

---

## Relatório 1 — Sumário sticky no ClassifiedProjectTemplate

**Arquivo:** `components/documents/templates/classified-project-template.tsx`

### Código completo

```tsx
"use client";
import type { ArchiveDocument, DocumentFrontmatter } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { Stamp } from "../general-components/mdx/stamp";
import { Redacted } from "../general-components/mdx/redacted";
import { ProjectTOC } from "../general-components/mdx/project-toc";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";
import { DigitalSignature } from "../general-components/signatures/digital-signature";
import { cn } from "@/lib/utils";

type ProjectStatus = NonNullable<DocumentFrontmatter["project_status"]>;

const STATUS_META: Record<
  ProjectStatus,
  { dot: string; label: string; integrity: number; tone: string }
> = {
  ativo:         { dot: "bg-amber-crt",   label: "OPERAÇÃO ATIVA",     integrity: 100, tone: "text-amber-crt" },
  suspenso:     { dot: "bg-amber-crt/60", label: "EM SUSPENSÃO",       integrity: 40,  tone: "text-amber-crt" },
  encerrado:    { dot: "bg-paper-muted",  label: "ENCERRADO",          integrity: 0,   tone: "text-paper-muted" },
  comprometido: { dot: "bg-stamp-red",    label: "COMPROMETIDO",       integrity: 15,  tone: "text-stamp-red" },
};

function StatusPanel({ status, code, phase }: { status?: ProjectStatus; code?: string; phase?: string }) {
  const s = status ?? "ativo";
  const meta = STATUS_META[s];
  return (
    <div className="status-panel">
      <div className="status-panel-head">
        <span className="status-panel-head-l">programa // status</span>
        <span className="status-panel-head-r">{code ?? "—"}</span>
      </div>
      <div className="status-panel-body">
        <span className={cn("status-led", meta.dot, s === "ativo" && "status-led-pulse")} />
        <div>
          <div className={cn("status-panel-state", meta.tone)}>{s}</div>
          <div className="status-panel-sub">{meta.label}</div>
        </div>
      </div>
      <div className="status-panel-bar" aria-hidden>
        <div className={cn("status-panel-bar-fill", meta.dot)} style={{ width: `${meta.integrity}%` }} />
      </div>
      <div className="status-panel-foot">
        <span>integridade · {meta.integrity}%</span>
        <span>{phase ?? "fase —"}</span>
      </div>
    </div>
  );
}

function MetaCell({ label, value, emphasis = false, fullWidth = false }: { label: string; value?: React.ReactNode; emphasis?: boolean; fullWidth?: boolean }) {
  return (
    <div className={cn("meta-cell", fullWidth && "meta-cell--full")}>
      <span className="meta-cell-corner meta-cell-corner-tl">◤</span>
      <span className="meta-cell-corner meta-cell-corner-br">◢</span>
      <div className="meta-cell-label">{label}</div>
      <div className={cn("meta-cell-value", emphasis && "meta-cell-value--em")}>{value ?? "—"}</div>
    </div>
  );
}

export function ClassifiedProjectTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  const sections = fm.sections ?? [];
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-3 flex items-center justify-between border-y-2 border-paper-foreground bg-paper-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper">
        <span>◆ programa não reconhecido</span>
        <span>negação plausível aplicável</span>
        <span>{fm.deniability_clause ?? "cláusula 14-B"}</span>
      </div>
      <header className="mt-6 grid gap-6 border-b-2 border-paper-foreground/60 pb-5 md:grid-cols-[1fr_auto]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-muted">◆ projeto classificado</div>
          <div className="mt-2 font-mono text-3xl font-bold tracking-[0.18em] text-paper-foreground md:text-4xl">{fm.project_code ?? "—"}</div>
          <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.2em] text-stamp-red md:text-3xl">{fm.project_codename ?? fm.title}</h1>
          {fm.project_class && <div className="mt-1 text-xs uppercase tracking-[0.25em] text-paper-muted">{fm.project_class}</div>}
        </div>
        <StatusPanel status={fm.project_status} code={fm.project_code} phase={fm.current_phase} />
      </header>
      <section className="meta-grid mt-6">
        <MetaCell label="supervisão" value={fm.oversight} emphasis />
        <MetaCell label="diretiva-mãe" value={fm.directive_origin} emphasis />
        <MetaCell label="em vigor desde" value={fm.operational_since} />
        <MetaCell label="fase atual" value={fm.current_phase} />
        <MetaCell label="ativos" value={fm.asset_count} />
        <MetaCell label="recrutamento" value={fm.recruit_pool} />
        <MetaCell label="métrica primária" value={fm.success_metric} fullWidth />
        <MetaCell label="linha orçamentária" value={fm.budget_line ? fm.budget_line : <Redacted length={20} />} fullWidth />
      </section>
      <div className={cn("classified-project-body mt-8 text-paper-foreground", sections.length > 0 && "md:grid md:grid-cols-[14rem_1fr] md:gap-8")}>
        {sections.length > 0 && <aside className="project-toc-wrap"><ProjectTOC items={sections} /></aside>}
        <div className="min-w-0"><RenderMdx source={doc.mdxSource} /></div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-paper-foreground/30 pt-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">▸ fim do verbete de programa</div>
        <Stamp variant="black" shape="rect" subtitle={fm.deniability_clause ?? "14-B"}>Não reconhecido</Stamp>
      </div>
      {fm.signed_by && (
        <DigitalSignature name={fm.signed_by} role={fm.oversight ?? "Diretoria de Operações Especiais"} registry={fm.registry_id ?? fm.project_code ?? "—"} timestamp={fm.signed_at ?? fm.date} />
      )}
    </PaperSheet>
  );
}
```

### Identificação do elemento sticky

**Grid container (cria as duas colunas)** — `classified-project-template.tsx:137-141`:

```tsx
<div className={cn(
  "classified-project-body mt-8 text-paper-foreground",
  sections.length > 0 && "md:grid md:grid-cols-[14rem_1fr] md:gap-8",
)}>
```

- `md:grid` — `display: grid` em `min-width: 768px`
- `md:grid-cols-[14rem_1fr]` — coluna fixa 14rem + coluna flexível
- `md:gap-8` — gap de 2rem

**Sidebar wrapper (torna o sumário sticky)** — `classified-project-template.tsx:143`:

```tsx
<aside className="project-toc-wrap">
```

Classe definida em `app/globals.css:897-898`:

```css
.project-toc-wrap { position: relative; }
@media (min-width: 768px) {
  .project-toc-wrap {
    position: sticky;
    top: 1.5rem;
    align-self: start;
  }
}
```

O `position: sticky; top: 1.5rem; align-self: start;` no breakpoint `md+` fixa o sumário lateral durante o scroll.

### Alterações necessárias para fluxo normal

| Onde | Arquivo | Linhas | Classe/Propriedade atual | Mudança |
|---|---|---|---|---|
| Grid container | `classified-project-template.tsx` | 139-140 | `md:grid md:grid-cols-[14rem_1fr] md:gap-8` | Remover as 3 classes |
| Sidebar wrapper | `globals.css` | 898 | `@media (min-width: 768px) { .project-toc-wrap { position: sticky; top: 1.5rem; align-self: start; } }` | Remover todo o bloco `@media` |
| Sidebar wrapper | `globals.css` | 897 | `.project-toc-wrap { position: relative; }` | Remover (não mais necessário) |

Após estas mudanças, o `<aside>` com `ProjectTOC` renderizará como um bloco normal acima do `<RenderMdx />`, empilhado verticalmente — sem sticky, sem coluna separada.

---

## Relatório 2 — Contraste insuficiente no light mode

### Valores das variáveis CSS

| Variável | Light (`:root`) | Aprox. Hex | Dark (`.dark`) | Aprox. Hex |
|---|---|---|---|---|
| `--paper` | `oklch(0.96 0.02 85)` | ~#f0ede2 | `oklch(0.91 0.025 85)` | ~#e3ddd4 |
| `--paper-foreground` | `oklch(0.18 0.03 50)` | ~#2a251a | `oklch(0.20 0.03 50)` | ~#2f2a1f |
| `--paper-muted` | `oklch(0.45 0.04 60)` | ~#6b6152 | `oklch(0.50 0.04 60)` | ~#766b59 |
| `--muted-foreground` (shadcn) | `oklch(0.556 0 0)` | ~#767676 | — | — |
| `--foreground` (shadcn) | `oklch(0.145 0 0)` | ~#212121 | — | — |

**Contraste estimado:**
- `text-muted-foreground` (~#767676) sobre `#eaeaea`: **~3.5:1 — FALHA WCAG AA** (mín. 4.5:1 para texto normal)
- `text-paper-muted` (~#6b6152) sobre `#eaeaea`: **~5.5:1 — PASSA WCAG AA** (4.5:1)
- `text-paper-foreground` (~#2a251a) sobre `#eaeaea`: **~12:1 — PASSA AAA**

---

### Ocorrências por arquivo

#### A) `text-muted-foreground` sobre fundo `PaperSheet` (#eaeaea) — FALHA WCAG AA

| # | Arquivo | Linha | Contexto |
|---|---|---|---|
| 1 | `permit-card.tsx` | 103, 107 | Validade disclaimer ("Válido por tempo indeterminado") |
| 2 | `digital-signature.tsx` | 58 | Label "Assinatura ::" |
| 3 | `digital-signature.tsx` | 149 | Label "[assinatura digital]" |
| 4 | `responsible-signatures.tsx` | 23 | Label "NOME:" |
| 5 | `responsible-signatures.tsx` | 27 | Label "Registro:" |
| 6 | `profile-name.tsx` | 18 | "Conhecido como:" |
| 7 | `protect-doc-text.tsx` | 2 | Texto de proteção de documento (12px) |

**Severidade: ALTA** — ~3.5:1 é insuficiente para texto normal. Afeta componentes compartilhados usados em múltiplos templates.

#### B) `opacity-*` em texto sobre fundo #eaeaea — contraste reduzido

| # | Arquivo | Linha | Opacidade | Efetivo (est.) | Severidade |
|---|---|---|---|---|---|
| 1 | `batch-template.tsx` | 131 | `opacity-30` | ~1.2:1 | **ALTA** — quase invisível |
| 2 | `batch-template.tsx` | 196, 201 | `opacity-50` | ~2:1 | **ALTA** — FALHA AA |
| 3 | `monitored-thread-template.tsx` | 65 | `opacity-50` | ~2:1 | **ALTA** — FALHA AA |
| 4 | `classified.tsx` | 8 | `opacity-60` | ~2.8:1 | **MÉDIA** — FALHA AA |
| 5 | `msg.tsx` | 41, 42, 87 | `opacity-60` | ~2.8:1 | **MÉDIA** — FALHA AA |
| 6 | `monitored-thread-template.tsx` | 64 | `opacity-70` | ~3.5:1 | **MÉDIA** — marginal |
| 7 | `transmission-template.tsx` | 24 | `opacity-70` | ~3.5:1 | **MÉDIA** — marginal |
| 8 | `ai-log-template.tsx` | 23 | `opacity-70` | ~3.5:1 | **MÉDIA** — marginal |
| 9 | `codex-entry-template.tsx` | 122 | `opacity-70` | ~3.5:1 | **MÉDIA** — marginal |
| 10 | `batch-template.tsx` | 202 | `text-foreground/80` | ~4:1 | **BAIXA** — próximo do limite |
| 11 | `propaganda-template.tsx` | 102 | `text-paper-foreground/80` | ~8:1 | **BAIXA** — ainda OK |
| 12 | `transmission-template.tsx` | 17 | `opacity-80` | ~4.5:1 | **BAIXA** — no limite |
| 13 | `stamp.tsx` | 26 | `opacity-80` | ~4.5:1 | **BAIXA** — no limite |
| 14 | `censor-entry.tsx` | 12 | `opacity-80` | ~4.5:1 | **BAIXA** — no limite |
| 15 | `mdx-components.tsx` | 93 | `opacity-80` (blockquote) | ~4.5:1 | **BAIXA** — no limite |

#### C) Hardcoded `text-gray-*`, `text-zinc-*`, `text-slate-*`, `text-neutral-*`

**Nenhuma** ocorrência encontrada em todos os templates e componentes analisados. A codebase usa exclusivamente tokens semânticos (`text-paper-*`, `text-muted-foreground`, `text-foreground`, `text-stamp-*`) ou cores hardcoded via `text-[#...]`.

#### D) Hardcoded `text-[#...]` — potencialmente problemáticos

| # | Arquivo | Linha | Valor | Risco |
|---|---|---|---|---|
| 1 | **`permit-card.tsx`** | **63** | **`text-[#eaeaea]!`** com `!important` | **ALTO**: cor clara forçada com `!important` — se o background do tier for claro (#eaeaea), o texto fica invisível |
| 2 | `permit-card.tsx` | 125, 128 | `text-[#eaeaea]` em `<TableHead>` | MÉDIO: texto claro sobre `bg-[#252525]` — OK em light mode, não quebra em dark mode |
| 3 | `paper-header.tsx` | 12, 15, 19 | `text-[#eaeaea]` com `dark:text-[#121212]` | BAIXO: pareado com `bg-[#252525]`, flip correto em dark mode |
| 4 | `section-title.tsx` | 3 | `text-[#eaeaea] bg-[#252525]` + dark flip | BAIXO: banner de alto contraste intencional |
| 5 | `paper-subject.tsx` | 21, 23 | `text-[#eaeaea]` / `text-[#252525]` + dark flip | BAIXO: pareado com bg |
| 6 | `stamp-rep-aurora.tsx` | 7, 15, 21 | `text-[#eaeaea]` | BAIXO: sobre `bg-[#252525]` |
| 7 | Tabelas de avaliação (5 arquivos) | várias | `text-[#eaeaea] dark:text-[#252525]` | BAIXO: header rows com bg escuro, flip correto |

#### E) Revisão geral dos templates (sem problemas)

Os seguintes templates **não** contêm `text-muted-foreground`, `opacity-*` baixa, nem hardcoded colors problemáticos. Usam exclusivamente `text-paper-foreground`, `text-paper-muted`, `text-stamp-red`:

`bounty-template`, `order-template`, `forensic-template`, `dossier-template`, `manifesto-template`, `classified-project-template`, `bulletin-template`, `interrogation-template`, `news-template`, `decree-template`, `profile-id`, `medical-record-template`, `id-card-template`, `incident-template`, `autopsy-template`, `broadcast-template`, `memo-template`, `foreign-letter-template`, `school-final-evaluation`

---

### Lista consolidada por severidade

#### ALTA — Falha clara de acessibilidade

| # | Arquivo | Linha | Problema |
|---|---|---|---|
| 1 | `responsible-signatures.tsx` | 23, 27 | `text-muted-foreground` (~3.5:1) sobre #eaeaea |
| 2 | `digital-signature.tsx` | 58, 149 | `text-muted-foreground` (~3.5:1) sobre #eaeaea |
| 3 | `profile-name.tsx` | 18 | `text-muted-foreground` (~3.5:1) sobre #eaeaea |
| 4 | `protect-doc-text.tsx` | 2 | `text-muted-foreground` (~3.5:1) sobre #eaeaea |
| 5 | `permit-card.tsx` | 103, 107 | `text-muted-foreground` (~3.5:1) sobre #eaeaea |
| 6 | `permit-card.tsx` | 63 | `text-[#eaeaea]!` com `!important` — risco de invisibilidade |
| 7 | `batch-template.tsx` | 131 | `opacity-30` (~1.2:1) — quase invisível |
| 8 | `batch-template.tsx` | 196, 201 | `opacity-50` (~2:1) — FALHA AA |
| 9 | `monitored-thread-template.tsx` | 65 | `opacity-50` (~2:1) — FALHA AA |

#### MÉDIA — Abaixo do limiar, mas visível

| # | Arquivo | Linha | Problema |
|---|---|---|---|
| 1 | `classified.tsx` (mdx) | 8 | `opacity-60` (~2.8:1) — FALHA AA |
| 2 | `msg.tsx` (mdx/comms) | 41, 42, 87 | `opacity-60` (~2.8:1) — FALHA AA |
| 3 | `monitored-thread-template.tsx` | 64 | `opacity-70` (~3.5:1) — marginal |
| 4 | `transmission-template.tsx` | 24 | `opacity-70` (~3.5:1) — marginal |
| 5 | `ai-log-template.tsx` | 23 | `opacity-70` (~3.5:1) — marginal |
| 6 | `codex-entry-template.tsx` | 122 | `opacity-70` (~3.5:1) — marginal |
| 7 | `permit-card.tsx` | 125, 128 | `text-[#eaeaea]` sem fallback |

#### BAIXA — Aceitável ou no limiar

| # | Arquivo | Linha | Problema |
|---|---|---|---|
| 1 | `batch-template.tsx` | 202 | `text-foreground/80` (~4:1) |
| 2 | `transmission-template.tsx` | 17 | `opacity-80` (~4.5:1) |
| 3 | `stamp.tsx` (mdx) | 26 | `opacity-80` (~4.5:1) |
| 4 | `censor-entry.tsx` | 12 | `opacity-80` (~4.5:1) |
| 5 | `mdx-components.tsx` | 93 | `opacity-80` (~4.5:1) blockquote |

---

### Recomendação principal

Substituir `text-muted-foreground` por `text-paper-muted` nos 5 componentes compartilhados que renderizam dentro de `Paper`/`PaperSheet`. `--paper-muted` dá ~5.5:1 sobre #eaeaea, enquanto `--muted-foreground` dá apenas ~3.5:1. Esta única mudança resolve os 7 itens de severidade ALTA relacionados a `text-muted-foreground`.
