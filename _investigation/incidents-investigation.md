# Investigação — Seção de Incidentes

> Gerado em 2026-06-28. Handoff para migração da rota incidents para o padrão codex/classified.

---

## 1. IncidentTemplate

**Arquivo:** `components/documents/templates/incident-template.tsx`

```tsx
"use client";
import type { ArchiveDocument } from "@/lib/archive/documents";
import { RenderMdx } from "../general-components/mdx/render-mdx";
import { PaperSheet } from "../general-components/paper/paper-sheet";
import { ClassificationBar } from "../general-components/stamps/classification-bar";

export function IncidentTemplate({ doc }: { doc: ArchiveDocument }) {
  const { frontmatter: fm } = doc;
  return (
    <PaperSheet>
      <ClassificationBar fm={fm} />
      <div className="mt-6 border-2 border-stamp-red/70 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-stamp-red">
          <span>⚠ Relatório de incidente</span>
          <span>{fm.incident_code ?? fm.reference}</span>
        </div>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-paper-foreground">
          {fm.title}
        </h1>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs uppercase tracking-wider text-paper-muted">
          <div>Local: <span className="text-paper-foreground">{fm.location ?? "indefinido"}</span></div>
          <div>Data: <span className="text-paper-foreground">{fm.date}</span></div>
          <div>Status: <span className="text-paper-foreground">{fm.status ?? "em apuração"}</span></div>
          <div>Emitido por: <span className="text-paper-foreground">{fm.issued_by}</span></div>
        </div>
      </div>

      <div className="mt-6 text-paper-foreground">
        <RenderMdx source={doc.mdxSource} />
      </div>
    </PaperSheet>
  );
}
```

**Campos do frontmatter consumidos:**

| Campo | Onde | Fallback |
|-------|------|----------|
| `type` | — | — |
| `incident_code` | Badge superior direito | `fm.reference` |
| `title` | h1 | — |
| `location` | Grid linha 1 | `"indefinido"` |
| `date` | Grid linha 1 | — |
| `status` | Grid linha 2 | `"em apuração"` |
| `issued_by` | Grid linha 2 | — |

**Dependências:** `PaperSheet`, `ClassificationBar`, `RenderMdx`.

---

## 2. Classified — Padrão de referência

### `app/government/classified/layout.tsx`

```tsx
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { FolderOpen, Folder, ChevronDown } from "lucide-react";
import { classified } from "@/data/classified";
import type { Entity } from "@/utils/government-data";

const statusColors: Record<string, string> = {
  ATIVO: "text-green-600 dark:text-green-400",
  INATIVO: "text-gray-500 dark:text-gray-400",
  DESCLASSIFICADO: "text-blue-600 dark:text-blue-400",
};

export default function ClassifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const currentSlug = params.slug as string | undefined;

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemName: string) => {
    const next = new Set(expandedItems);
    if (next.has(itemName)) next.delete(itemName);
    else next.add(itemName);
    setExpandedItems(next);
  };

  const toggleGroup = (entitySlug: string, groupId: string) => {
    const key = `${entitySlug}-${groupId}`;
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // lookup map: doc.id → mdxSlug
  const slugMap = new Map<string, string>();
  for (const e of classified) {
    for (const d of e.documents) {
      if ("mdxSlug" in d && d.mdxSlug) slugMap.set(d.id, d.mdxSlug);
    }
    for (const g of e.documentGroups ?? []) {
      for (const d of g.documents) {
        if ("mdxSlug" in d && d.mdxSlug) slugMap.set(d.id, d.mdxSlug);
      }
    }
  }

  const handleDocClick = (entity: Entity, docId: string) => {
    const mdxSlug = slugMap.get(docId);
    if (mdxSlug) {
      router.push(`/government/classified/${mdxSlug}`);
    }
  };

  const sidebar = (
    <div className="space-y-1">
      <div className="text-xs font-bold text-muted-foreground mb-2 px-2">
        ARQUIVOS:
      </div>
      {classified.map((entity) => (
        <div key={entity.name}>
          <button
            onClick={() => toggleExpanded(entity.name)}
            className="w-full text-left px-2 py-2 text-xs font-mono border border-foreground bg-background hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="truncate uppercase font-bold">
                {entity.name}
              </span>
              {expandedItems.has(entity.name) ? (
                <FolderOpen className="w-4 h-4 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 shrink-0" />
              )}
            </div>
            <div
              className={`text-[10px] mt-0.5 ${statusColors[entity.status] || ""}`}
            >
              {entity.status}
            </div>
          </button>
          {expandedItems.has(entity.name) && (
            <div className="ml-4 space-y-1 mt-1">
              {entity.documents.map((doc) => {
                const mdxSlug = slugMap.get(doc.id);
                const isActive = !!mdxSlug && currentSlug === mdxSlug;
                return (
                  <button
                    key={doc.id}
                    onClick={() => handleDocClick(entity, doc.id)}
                    className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                      isActive
                        ? "border-foreground bg-foreground/10 text-foreground"
                        : "border-foreground bg-background hover:bg-muted text-foreground"
                    } ${!mdxSlug ? "opacity-40 cursor-default" : ""}`}
                  >
                    → {doc.name}
                  </button>
                );
              })}
              {entity.documentGroups?.map((group) => (
                <div key={group.groupId} className="ml-2">
                  <button
                    onClick={() => toggleGroup(entity.slug, group.groupId)}
                    className="w-full text-left px-2 py-1.5 text-[10px] font-mono border border-foreground/60 bg-background hover:bg-muted transition-colors flex items-center justify-between uppercase tracking-wider text-muted-foreground"
                  >
                    <span>{group.groupName}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        expandedGroups.has(
                          `${entity.slug}-${group.groupId}`,
                        )
                          ? "rotate-0"
                          : "-rotate-90"
                      }`}
                    />
                  </button>
                  {expandedGroups.has(`${entity.slug}-${group.groupId}`) && (
                    <div className="ml-2 space-y-1 mt-1">
                      {group.documents.map((doc) => {
                        const mdxSlug = slugMap.get(doc.id);
                        const isActive =
                          !!mdxSlug && currentSlug === mdxSlug;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => handleDocClick(entity, doc.id)}
                            className={`w-full text-left px-2 py-1.5 text-xs font-mono border transition-colors flex items-center gap-2 uppercase ${
                              isActive
                                ? "border-foreground bg-foreground/10 text-foreground"
                                : "border-foreground bg-background hover:bg-muted text-foreground"
                            } ${!mdxSlug ? "opacity-40 cursor-default" : ""}`}
                          >
                            → {doc.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <AuthGuard requireGovernment>
      <div className="grid md:grid-cols-[250px_1fr] gap-px h-full">
        <div className="hidden md:block sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
          {sidebar}
        </div>
        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)] rounded-xs">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
```

### `app/government/classified/[slug]/page.tsx`

```tsx
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { getDocument, getBatchItems } from "@/lib/archive/registry";
import { TEMPLATES } from "@/components/documents/index";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";

const ALL_SLUGS = [
  "red-suns-batch",
  "red-suns-overview",
  "red-suns-training",
  "red-suns-evaluation",
  "red-suns-specialized",
  "red-suns-psychological",
  "red-suns-score-guide",
  "red-suns-classification",
  "red-suns-annex-a",
  "red-suns-annex-b",
  "red-suns-annex-c",
  "red-suns-annex-d",
];

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function ClassifiedDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = getDocument(slug);
  if (!raw) {
    return (
      <div className="p-8 text-center opacity-50">
        DOCUMENTO NÃO ENCONTRADO
      </div>
    );
  }

  const mdxSource = await serialize(raw.mdx);
  const doc: ArchiveDocument = { ...raw, mdxSource };

  let augmentedDoc: ArchiveDocument & {
    batchItems?: Array<{
      slug: string;
      role?: string;
      note?: string;
      doc?: ArchiveDocument;
    }>;
  } = doc;

  if (doc.frontmatter.type === "batch") {
    const items = getBatchItems(doc.frontmatter);
    const sources = await Promise.all(
      items.map(async (it) => {
        if (!it.doc) return null;
        return { slug: it.slug, source: await serialize(it.doc.mdx) };
      }),
    );
    const sourceMap = Object.fromEntries(
      sources.filter(Boolean).map((s) => [s!.slug, s!.source]),
    );
    const batchItems = items.map((it) => ({
      ...it,
      doc:
        it.doc && sourceMap[it.slug]
          ? { ...it.doc, mdxSource: sourceMap[it.slug] }
          : it.doc,
    }));
    augmentedDoc = { ...doc, batchItems };
  }

  const idx = ALL_SLUGS.indexOf(slug);
  const type = doc.frontmatter.type as DocumentType;
  const Template = TEMPLATES[type];

  if (!Template) {
    return (
      <div className="p-8 text-center opacity-50">
        TEMPLATE NÃO ENCONTRADO
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
        <Link
          href="/government/classified"
          className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
        >
          ← VOLTAR
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground">
            DOCUMENTO {idx + 1} DE {ALL_SLUGS.length}
          </span>

          <div className="flex gap-2">
            {idx > 0 ? (
              <Link
                href={`/government/classified/${ALL_SLUGS[idx - 1]}`}
                className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
              >
                ← ANTERIOR
              </Link>
            ) : (
              <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
                ← ANTERIOR
              </span>
            )}
            {idx < ALL_SLUGS.length - 1 ? (
              <Link
                href={`/government/classified/${ALL_SLUGS[idx + 1]}`}
                className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
              >
                PRÓXIMO →
              </Link>
            ) : (
              <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
                PRÓXIMO →
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
        <Template doc={augmentedDoc as ArchiveDocument} />
      </div>
    </div>
  );
}
```

---

## 3. `data/incidents.ts` — dados atuais

```ts
import type { Entity } from "@/utils/government-data";

export const incidents = [
  {
    slug: "inc-2024-089",
    name: "Violação de Segurança",
    status: "CRÍTICO",
    id: "INC-2024-089",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
      { id: "forensic-analysis", name: "Análise Forense" },
      { id: "conclusion", name: "Conclusão" },
    ],
  },
  {
    slug: "inc-2024-090",
    name: "Anomalia Detectada",
    status: "ALTO",
    id: "INC-2024-090",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
      { id: "forensic-analysis", name: "Análise Forense" },
    ],
  },
  {
    slug: "inc-2024-091",
    name: "Falha de Sistema",
    status: "MÉDIO",
    id: "INC-2024-091",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
    ],
  },
  {
    slug: "inc-2024-092",
    name: "Acesso Não Autorizado",
    status: "ALTO",
    id: "INC-2024-092",
    department: "DIVISÃO DE SEGURANÇA",
    documents: [
      { id: "initial-report", name: "Relatório Inicial" },
      { id: "forensic-analysis", name: "Análise Forense" },
    ],
  },
] satisfies Entity[];
```

---

## 4. MDX `incidente-bruma-iv`

**Caminho:** `content/archive/examples/incidente-bruma-iv.mdx`

### Frontmatter

```yaml
type: incident
slug: incidente-bruma-iv
title: "Incidente BRUMA-IV"
classification: "ULTRASSECRETO"
date: "A.R. 2187.04.19"
issued_by: "Divisão de Anomalias Atmosféricas"
incident_code: "IA/BRUMA-IV-019"
location: "Setor 9 · perímetro portuário antigo"
status: "contido · em monitoramento"
tags: ["anomalia", "setor-9", "bruma"]
```

### Body MDX

```markdown
## Sinopse

Às **03h17** do dia indicado, sensores barométricos da torre
<Redacted length={4} /> registraram queda anômala de pressão acompanhada
de luminescência azul-esverdeada em três focos não-adjacentes do Setor 9.

## Linha do tempo

- **03h17** — primeira leitura anômala (torre <Redacted length={4} />)
- **03h22** — colapso parcial do sistema de iluminação pública
- **03h31** — três (3) civis relatam "sensação de já ter vivido isto"
- **03h44** — chegada da equipe de contenção ⟨BRUMA⟩
- **04h02** — restabelecimento aparente de normalidade
- **04h03** — desaparecimento dos três civis citados

## Avaliação preliminar

A coincidência entre os três relatos e a sequência atmosférica
sugere recorrência do fenômeno já documentado nos relatórios
**BRUMA-I** a **BRUMA-III**. Recomenda-se:

1. Elevação imediata da classificação para **ULTRASSECRETO**.
2. Apreensão dos registros das torres adjacentes.
3. <Redacted length={32} />

<Classified>
  Quaisquer testemunhas remanescentes deverão ser conduzidas ao
  procedimento de **desambiguação mnêmica**. Não há,
  oficialmente, evento a relatar.
</Classified>

<div className="mt-8 flex items-center justify-between">
  <Stamp variant="red">não-evento · não-arquivar</Stamp>
  <Signature name="Eng. R. Tessari-Kuo" role="Chefe da Divisão de Anomalias" />
</div>
```

**Componentes MDX usados:** `<Redacted>`, `<Classified>`, `<Stamp>`, `<Signature>`.

---

## 5. Registry — entrada de incidentes

### Import (linha 11)

```ts
import incidenteBruma4 from "../../content/archive/examples/incidente-bruma-iv.mdx";
```

### Mapeamento RAW (linha 64)

```ts
"incidente-bruma-iv": incidenteBruma4,
```

### Estrutura do `RAW`

```ts
const RAW: Record<string, string> = {
  // ... 50 entries total
  "incidente-bruma-iv": incidenteBruma4,
  // ...
};
```

### Processamento

Cada entrada é parseada por `parseFrontmatter(raw)` (linhas 122-192) que extrai `{ frontmatter: DocumentFrontmatter; mdx: string }` e armazenada em:

```ts
const DOCS = new Map<string, ArchiveDocument>();
// ...
DOCS.set(slug, { frontmatter: { ...frontmatter, slug }, mdx });
```

### `getDocument()` (linha 211)

```ts
export function getDocument(slug: string): ArchiveDocument | undefined {
  return DOCS.get(slug);
}
```

### `getAllDocuments()` (linha 205)

```ts
export function getAllDocuments(): ArchiveDocument[] {
  return Array.from(DOCS.values()).sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}
```

### Estrutura do objeto retornado

```ts
interface ArchiveDocument {
  frontmatter: DocumentFrontmatter;  // { type, slug, title, classification, date, ... }
  mdx: string;                        // raw MDX body (after frontmatter)
  mdxSource?: Record<string, unknown>; // serialized MDX (added by [slug]/page.tsx)
}
```

---

## 6. GovernmentDashboard — navegação para incidentes

**Arquivo:** `components/government-dashboard.tsx`

### Mapeamento de seção (linhas 32-36)

```ts
const sectionMap: Record<string, string> = {
  profiles: "individuos",
  missions: "missoes",
  incidents: "incidentes",
};
```

### Menu lateral (linhas 52-57)

```ts
const sections = [
  { id: "individuos", name: "INDIVÍDUOS DE DESTAQUE", icon: "👤" },
  { id: "missoes", name: "RELATÓRIOS DE MISSÕES", icon: "📋" },
  { id: "incidentes", name: "REGISTRO DE INCIDENTES", icon: "⚠️" },
  { id: "poderes", name: "SISTEMA DE PODERES", icon: "🔑" },
];
```

O menu **não usa links/hrefs** — são botões que alteram `activeSection` (estado local via `useState`). A URL `/government/incidents` é resolvida pelo `[section]/page.tsx` que faz:

```tsx
const section = params.section as string;
// ...
<GovernmentDashboard section={section} />
```

Dentro do dashboard, `sectionMap[section]` traduz `"incidents"` → `"incidentes"` → ativa o case no switch.

### O que precisará ser atualizado

Para criar uma rota dedicada (`/government/incidents/[slug]`), o `GovernmentDashboard` não precisa ser alterado — a rota atual `[section]/page.tsx` continuará funcionando para as seções não migradas (profiles, missions, powers). A nova rota incidents será adicionada em paralelo, assim como codex e classified já foram.

---

## Resumo consolidado

| Aspecto | Incidentes (hoje) | Classified (padrão) |
|---------|-------------------|---------------------|
| Rota | `[section]` genérico | `classified/[slug]` dedicada |
| Sidebar | `IncidentsSection` retorna `{sidebar, content}` | `layout.tsx` renderiza sidebar + `{children}` |
| Dados | `data/incidents.ts` (4 entidades, sem mdxSlug) | `data/classified.ts` (entidades com mdxSlug) |
| MDX reais | 1 (`incidente-bruma-iv`) | 13 |
| Template | `IncidentTemplate` (33 linhas) | `ClassifiedProjectTemplate` |
| Prev/next | `DocumentNavigator` (antigo, data-based) | Inline no `[slug]/page.tsx` (ALL_SLUGS array) |
| Renderização | Client-side via `generateEntityDocuments()` | Server component com `serialize()` + `<Template>` |
