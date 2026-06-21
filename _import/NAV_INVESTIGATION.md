# Navegação Interna — Investigation Report

**Data:** 20-Jun-2026

**Contexto:** O projeto Lumen tem **dois sistemas de navegação de documentos** que coexistem. Este relatório mapeia ambos.

---

## 1. Rotas de personagem

### Sistema A — Government (JSON data, legado)

`/government/profiles` → `app/government/[section]/page.tsx`

- Rota dinâmica com `[section]` param via `useParams()`
- `section` é passado para `GovernmentDashboard` que faz match para `"individuos"`
- Renderiza `IndividualsSection` com dados de `data/individuals.ts`
- **Não** é rota de App Router estática — é client-side state-driven

### Sistema B — MDX Archive (novo)

`/archive/[slug]` → `app/archive/[slug]/page.tsx`

- Rota dinâmica com `generateStaticParams` (Next.js 16)
- Slug vem da URL
- Carrega MDX via `lib/archive/registry.ts`
- Renderiza com `TEMPLATES[doc.frontmatter.type]`
- Listagem em `/archive` com 4 abas (Documentos, Componentes Existentes, Componentes Novos, Trial MDX)

---

## 2. Fluxo até o IndividualResolver

Apenas no **Sistema A**:

```
/government/profiles
  → GovernmentDashboard (section="individuos")
    → IndividualsSection
      → handleIndividualDocumentClick(individualName, docId)
        → setSelectedIndividual("Ultimate"), setSelectedFile("Ultimate-profile")
        → isLoadingFile → FileLoading → onComplete
        → renderContent:
            generateIndividualDocuments("Ultimate", individuals)
              → individual.layoutComponent existe → mapeia doc → <IndividualResolver slug="ultimate" documentId="profile" />
```

`IndividualResolver` é chamado dentro de `generateIndividualDocuments` em `data/document-generators.tsx:64`:

```tsx
content: (
  <IndividualResolver slug={individual.slug ?? ""} documentId={doc.id} />
),
```

O `slug` vem de `individual.slug` (campo opcional em `Individual`). O `documentId` vem do `doc.id` do array `individual.documents`.

---

## 3. Navegação entre documentos

### Sistema A — DocumentNavigator

- **Estado local** em `IndividualsSection` (useState):
  - `selectedFile: string | null` — ex: `"Ultimate-profile"`
  - `selectedIndividual: string | null` — ex: `"Ultimate"`
  - Parâmetro extraído: `documentId = selectedFile.replace(\`\${selectedIndividual}-\`, "")`

- `generateIndividualDocuments()` gera array `DocumentContent[]` com TODOS os docs do indivíduo
- `DocumentNavigator` recebe esse array + `initialIndex` e gerencia navegação **interna** com `currentIndex` (useState local)
- Botões "ANTERIOR" / "PRÓXIMO" + dots indicadores
- Slide animation CSS (translate-x)
- `IndividualsNavigationProvider` (context) permite navegação de componentes filhos (ex: `DocumentLink`)

**Não usa Tabs do shadcn/ui.** A navegação é sequencial (prev/next), não por abas paralelas.

### Sistema B — MDX Archive

- Listagem em `/archive` com shadcn/ui `Tabs` (4 abas) → link para `/archive/[slug]`
- Na página individual: navegação **entre slugs** (prev/next) baseada em ordem alfabética de `getAllSlugs()`
- Template selecionado por `TEMPLATES[doc.frontmatter.type]`

---

## 4. Lista de documentos disponíveis

### Sistema A

Vem do campo `documents` em `data/individuals.ts`:

```ts
documents: [
  { id: "profile", name: "Perfil" },
  { id: "school-final-evaluation", name: "Avaliação Final Escolar" },
  { id: "permit-card", name: "Permissões" },
]
```

Cada indivíduo tem seu próprio array. `IndividualsSection` renderiza um botão por item no sidebar expandido.

### Sistema B

Vem do `lib/archive/registry.ts` (build-time). Cada MDX registrado manualmente com slug + import estático.

---

## 5. IndividualResolver internamente

Arquivo: `components/individual-resolver.tsx`

```tsx
const DATA_MAP: DataMap = {
  "diana-watson": { profileId, schoolFinalEvaluation, permissions },
  ultimate: { profileId, schoolFinalEvaluation, permissions },
  "kendra-connors": { profileId, schoolFinalEvaluation },
  kira: { schoolFinalEvaluation },
};
```

1. Recebe `slug` + `documentId`
2. Busca `individual` em `data/individuals.ts` por `slug`
3. Se `layoutComponent` existe, carrega o layout específico (ex: `UltimateLayout`)
4. Busca dados em `DATA_MAP[slug]`
5. Renderiza `<LayoutComponent {...data} documentId={documentId} />`

O layoutComponent faz switch em `documentId`:
- `"profile"` → `<ProfileId individual={profileId} />`
- `"school-final-evaluation"` → `<SchoolFinalEvaluationDoc individual={schoolFinalEvaluation} />`
- `"permit-card"` → `<PermitCard individual={permissions} />`

**Quando documentId muda:**
- `IndividualsSection` atualiza `selectedFile` → novo `documentId`
- `generateIndividualDocuments()` é chamado novamente
- `DocumentNavigator` recebe novo `initialIndex`
- `IndividualResolver` renderiza novo template via `layoutComponent`

---

## 6. Pontos de entrada externos

### Login → Home
1. `/` → login → `/home`
2. `/home` → `HomeScreen` → "PERFIS DE INDIVÍDUOS" → `/government/profiles`

### Navegação cross-document
- Componentes filhos podem usar `useIndividualsContext().navigateToDocument(id, docId)`
- Usado por `DocumentLink` e `DocumentPreview`

### Archive (MDX)
- `/archive` → listagem → `/archive/[slug]`
- Independente do login — rota pública

---

## Diagrama de fluxo (texto)

### Sistema A (Government, legado)
```
/ (login) → /home → /government/profiles
  → GovernmentDashboard (section="profiles" → "individuos")
    → IndividualsSection
      → Sidebar: lista de individuals[] com expand/collapse
        → Click doc → setSelectedFile("Individual-docId"), setSelectedIndividual("Individual")
          → FileLoading (animação) → onComplete
            → generateIndividualDocuments("Individual", individuals)
              → individual.layoutComponent existe?
                → SIM: mapeia cada doc → { content: <IndividualResolver slug={slug} documentId={doc.id} /> }
                → NÃO: usa documentGenerators["perfil"|"psicologico"|etc.]
            → DocumentNavigator(documents[], initialIndex)
              → useState currentIndex (0..n)
              → [ANTERIOR | PRÓXIMO] altera currentIndex → slide animation
                → DocumentViewer(title, classification, ..., content)
                  → content = <IndividualResolver slug documentId />
                    → DATA_MAP[slug] → layoutComponent({...data, documentId})
                      → diana-watson-archive.tsx / ultimate-archive.tsx / kendra-connors-archive.tsx
                        → switch(documentId):
                            "profile"              → ProfileId
                            "school-final-evaluation" → SchoolFinalEvaluationDoc
                            "permit-card"          → PermitCard
```

### Sistema B (MDX Archive, novo)
```
/archive → Tabs (docs | old | new | trial)
  → DocLink → /archive/[slug]
    → app/archive/[slug]/page.tsx
      → getDocument(slug) → mdx
      → serialize(mdx)
      → TEMPLATES[type]({ doc, mdxSource })
      → navegação prev/next entre slugs (ordem alfabética)
```

---

## Pontos de atenção para a migração

1. **Duas fontes de verdade para dados de personagem** — `data/individuals.ts` + `DATA_MAP` vs. frontmatter de MDX na pasta `content/archive/trial/`. A migração precisará unificar ambas, mantendo compatibilidade com `IndividualLayoutProps` (profileId, schoolFinalEvaluation, permissions).

2. **`generateIndividualDocuments` é o ponto de acoplamento** — essa função (em `data/document-generators.tsx`) decide se usa `IndividualResolver` (layoutComponent) ou geradores inline. Qualquer mudança no formato dos dados precisa passar por ela.

3. **DocumentNavigator é sequencial, não por abas** — diferentemente do Archive (que tem Tabs), a navegação entre documentos de um indivíduo é linear (prev/next). A ordem vem do array `documents[]` em `data/individuals.ts`. Migrar para MDX precisará preservar essa ordem OU substituir por Tabs.

4. **`slug` é opcional em `Individual`** (`slug?: string`) — Kira não tem `layoutComponent`. O `IndividualResolver` só funciona se `slug` existir. Indivíduos sem layoutComponent usam os geradores inline em `documentGenerators`.

5. **Contexto vs props** — `IndividualsNavigationProvider` injeta `navigateToDocument` via context. A navegação cross-component depende desse contexto estar presente. Migração precisa manter ou substituir esse mecanismo.
