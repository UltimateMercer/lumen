# Relatório de Investigação Pós-Implementação

**Data:** 2026-07-05  
**Escopo:** `visibility` no frontmatter e `<AnomalyProfile>` no body do MDX

---

## 1. `visibility` no Frontmatter

### Onde foi adicionado

- **Único arquivo de schema:** `lib/archive/documents.ts:22`  
  Dentro da interface `DocumentFrontmatter`, logo abaixo de `classification`.

### Assinatura

```ts
visibility?: "public" | "classified" | "both";
```

O campo é opcional (`?`) e aceita exatamente um dos três literais. **OK.**

### Fallback/Default

**NÃO HÁ fallback implementado.** O campo nunca é lido, verificado, nem padronizado em lugar nenhum do código. O tipo é opcional, mas não existe qualquer lógica do tipo `const effectiveVisibility = fm.visibility ?? "classified"` ou similar em template, componente, resolver, rota, AuthGuard ou grid.

- **Consumo do campo (`.visibility`):** 0 ocorrências em `.ts`/`.tsx`.
- **Lógica condicional sobre `visibility`:** 0 ocorrências.
- **Menção a `visibility` em JSX/TSX:** 0 ocorrências (a única ocorrência textual é a propriedade CSS `visibility: hidden` em `app/globals.css:966` — animação `@keyframes blink`, não relacionada).

**Achado:** O campo é um tipo fantasma — declarado, mas sem nenhum consumidor. Não há gating, AuthGuard, filtro em grids, ou qualquer outro código que o referencie.

### `tsc --noEmit`

**Passa limpo.** Os mesmos 10 erros preexistentes (app/educations, app/experiences, app/projects, components/list-project-cards, components/mdx-custom-components, components/mdx/heading, components/menu) continuam exatamente os mesmos. Nenhum erro novo causado pelo campo ou por sua ausência de consumo.

### Pendências / Inconsistências

1. Nenhum template ou componente consome `visibility` — se a intenção era usá-lo para controle de acesso ou filtro de exibição, isso ainda precisa ser implementado.
2. Nenhum MDX foi alterado para incluir o campo — todos os 39 documentos continuam sem `visibility` no frontmatter.

---

## 2. `<AnomalyProfile>` no Body do MDX

### Localização do componente

- **Path:** `components/documents/general-components/mdx/codex/anomaly-profile.tsx` (44 linhas)
- **Registro em:** `components/documents/general-components/mdx/mdx-components.tsx` — importado na linha 21 e listado no objeto `mdxComponents` (linha 35).

### Props aceitas

```tsx
{
  autonomy?: DocumentFrontmatter["autonomy"];     // "nula" | "parcial" | "plena"
  contagion?: DocumentFrontmatter["contagion"];   // "nenhuma" | "baixa" | "alta" | "epidêmica"
  host_required?: DocumentFrontmatter["host_required"]; // boolean
  containment_status?: DocumentFrontmatter["containment_status"]; // string
}
```

### Estrutura de renderização

Um `section` com `grid gap-2 md:grid-cols-3` contendo 4 `StatChip` privados. Cada `StatChip` tem exatamente o mesmo markup CSS do `StatChip` removido do template (`codex-entry-template.tsx`). A única diferença é a ausência de `mt-5` no wrapper (intencional — o fluxo natural do MDB provê espaçamento superior).

### Documentos migrados vs. total

| Total codex MDX | Migrados | % |
|---|---|---|
| 4 | 4 | 100% |

### Verificação de resíduos

- Os 4 campos (`autonomy`, `contagion`, `host_required`, `containment_status`) **não aparecem mais em nenhum frontmatter** de nenhum MDX em `content/archive/` (nem codex, nem profile-id, nem sfe, etc.).
- **Nenhum codex MDX ficou de fora** — todos os 4 têm `<AnomalyProfile ... />` como primeiro elemento do body (linha 22, logo após o frontmatter).

### Campos de tipo mantidos no schema

Os 4 campos continuam declarados em `DocumentFrontmatter` (`lib/archive/documents.ts:108-111`). Isso é intencional e correto — o componente `AnomalyProfile` usa indexed access types (`DocumentFrontmatter["autonomy"]`) para tipar suas props. A presença deles no schema não causa dano e mantém compatibilidade para usos futuros.

### Comparação visual (código)

- **StatChip (template original, agora removido):** `border border-paper-foreground px-3 py-2` / `text-[9px] font-bold uppercase tracking-[0.3em] text-paper-muted` / `mt-0.5 font-mono text-xs uppercase text-paper-foreground` / fallback `" —"`
- **StatChip (AnomalyProfile):** **idêntico byte a byte**.
- **Grid wrapper:** ambos usam `grid gap-2 md:grid-cols-3`. O componente removeu o `mt-5` — esperado, sem impacto visual porque o parágrafo/heading anterior no body MDX já provê margem.

**Conclusão visual:** Sem diferença perceptível na renderização.

### `tsc --noEmit`

**Passa limpo.** Nenhum erro novo. Os mesmos 10 erros preexistentes.

### Pendências / Inconsistências

- **Nenhuma.** A migração está completa e limpa: 4/4 documentos, visual idêntico, template sem resíduos, sem erros de tipo.

---

## Resumo Geral

| Item | Status |
|---|---|
| `visibility` adicionado ao schema | ✅ Implementado |
| `visibility` com fallback default `"classified"` | ❌ **Não implementado** — campo não é consumido em lugar nenhum |
| `visibility` sendo usado para gating/AuthGuard | ❌ Não (e nem era escopo) |
| `AnomalyProfile` componente criado | ✅ OK |
| `AnomalyProfile` registrado em mdx-components | ✅ OK |
| 4 MDX codex migrados (frontmatter → body) | ✅ 100% |
| Resíduos de frontmatter antigo em MDX | ✅ Nenhum |
| Visual idêntico ao anterior | ✅ Confirmado |
| `tsc --noEmit` sem erros novos | ✅ Confirmado (10 preexistentes inalterados) |
