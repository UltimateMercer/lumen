# INVESTIGATION: Rotas, Navegação e Acoplamento

**Data:** 21-Jun-2026
**Objetivo:** Mapear todas as rotas e entender o acoplamento do sistema de navegação
(DocumentNavigator + IndividualResolver) antes de planejar expansões.

---

## 1. Mapa completo de rotas

### Estrutura de `app/`

```
app/
├── layout.tsx              ✅ Root layout: fonts, ThemeProvider, metadata
├── page.tsx                ✅ Login screen (LoginScreen, GovernmentLoginModal, etc.)
├── globals.css
├── favicon.ico
│
├── about/
│   └── page.tsx            ✅ Bilingual about-me (pt-br/en-us)
│
├── archive/
│   ├── page.tsx            ✅ Archive listing (Tabs: Documentos / Componentes Existentes / Componentes Novos)
│   └── [slug]/
│       └── page.tsx        ✅ MDX renderer via TEMPLATES registry (generateStaticParams)
│
├── demo/
│   ├── layout.tsx          ✅ BaseLayout + border frame
│   └── page.tsx            ✅ "Tribuna da Aurora" demo page
│
├── educations/
│   └── page.tsx            ✅ Bilingual education timeline
│
├── experiences/
│   └── page.tsx            ✅ Bilingual experience timeline
│
├── government/
│   ├── layout.tsx          ✅ BaseLayout + border frame
│   └── [section]/
│       └── page.tsx        ✅ GovernmentDashboard + AuthGuard(requireGovernment)
│
├── home/
│   ├── layout.tsx          ✅ BaseLayout + border frame
│   └── page.tsx            ✅ HomeScreen + AuthGuard → redireciona para /government/:section ou /public/:section
│
├── projects/
│   ├── page.tsx            ✅ Project cards listing (fumadocs)
│   └── [lang]/
│       └── [slug]/
│           └── page.tsx    ✅ MDX project detail (fumadocs)
│
├── public/
│   ├── layout.tsx          ✅ BaseLayout + border frame
│   └── [section]/
│       └── page.tsx        ✅ PublicDashboard + AuthGuard (sem requireGovernment)
│
└── public-dashboard/       ⚠️ VAZIO — sem arquivos, rota morta
```

### Sumário

| Item | Quantidade |
|---|---|
| `page.tsx` | 10 |
| `layout.tsx` | 6 (root + demo + gov + home + public) |
| `loading.tsx` / `error.tsx` / `route.ts` | 0 |
| Route groups `(...)` | 0 |
| Rotas dinâmicas `[param]` | 4 (`[slug]`, `[section]`×2, `[lang]`) |
| Catch-all `[...slug]` | 0 |
| Diretórios vazios | 1 (`public-dashboard/`) |

### Hierarquia de layouts

```
app/layout.tsx (raiz — fonts, ThemeProvider)
├── app/demo/layout.tsx        → demo/*
├── app/government/layout.tsx  → government/*
├── app/home/layout.tsx        → home/*
├── app/public/layout.tsx      → public/*
└── (demais herdam apenas root layout)
```

---

## 2. Rotas do governo

Tudo em `app/government/` — rota única `/government/[section]`.

### `/government/[section]/page.tsx`

```tsx
export default function GovernmentSectionPage() {
  const section = params.section as string;
  return (
    <AuthGuard requireGovernment>
      {user && <GovernmentDashboard user={user} section={section} />}
    </AuthGuard>
  );
}
```

O `GovernmentDashboard` mapeia `section` para seções internas:

```tsx
sectionMap = {
  classified: "sigiloso",
  profiles:   "individuos",
  missions:   "missoes",
  incidents:  "incidentes",
};
// "poderes" também existe como seção mas não está no sectionMap
// — é acessada diretamente como /government/poderes
```

**Seções existentes no dashboard:**

| section param | activeSection | Componente |
|---|---|---|
| `profiles` | `"individuos"` | `IndividualsSection` |
| `classified` | `"sigiloso"` | `ClassifiedSection` |
| `missions` | `"missoes"` | `MissionsSection` |
| `incidents` | `"incidentes"` | `IncidentsSection` |
| `poderes` | `"poderes"` | `PowersSection` **(pre-existing TS error)** |

Cada seção renderiza `{ sidebar, content }` — dois slots. A sidebar é fixa à esquerda
(ou num Sheet em mobile), o conteúdo ocupa o restante.

### `IndividualsSection` — o elo do governo com o archive

1. Sidebar: lista `individuals` (de `data/individuals.ts`) com accordion; cada
   indivíduo expande para mostrar seus `documents[]`.
2. Ao clicar num documento: `handleIndividualDocumentClick(individualName, docId)`
   → seta `selectedFile`, `selectedIndividual`, ativa `FileLoading`.
3. Após loading: renderiza `DocumentNavigator` com
   `documents={generateIndividualDocuments(selectedIndividual, individuals)}`.

### `generateIndividualDocuments` — o orquestrador

```tsx
export const generateIndividualDocuments = (individualName, individuals) => {
  const individual = individuals.find(...)
  if (!individual) return [];

  // Se tem layoutComponent → usa IndividualResolver (fluxo MDX)
  if (individual.layoutComponent) {
    return individual.documents.map(doc => ({
      title, classification, department, date, signedBy,
      content: <IndividualResolver slug={individual.slug} documentId={doc.id} />,
    }));
  }

  // Fallback: documentGenerators hardcoded (perfil, psicologico, etc.)
  return individual.documents.map(doc => ({
    ...(documentGenerators[doc.id] || documentGenerators.default)
  }));
};
```

**Fluxo completo (governo → archive):**

```
/government/profiles
  → GovernmentDashboard(section="profiles")
    → IndividualsSection
      → sidebar: lista indivíduos + documentos
      → click: FileLoading → DocumentNavigator
        → generateIndividualDocuments()
          → [se layoutComponent] IndividualResolver(slug, documentId)
            → individuals.find(slug) → getDocument(mdxSlug) → cast frontmatter
            → layoutComponent({ profileId|schoolFinalEvaluation|permissions })
              → renderiza template (ProfileId, SchoolFinalEvaluationDoc, PermitCard)
          → [fallback] documentGenerators hardcoded
```

---

## 3. Rotas públicas

Fora de `/government/`:
- `/` — login
- `/home` — home pós-login (redireciona conforme `accessLevel`)
- `/about` — sobre
- `/demo` — Tribuna da Aurora
- `/educations` — timeline educacional
- `/experiences` — timeline experiência
- `/projects` + `/projects/[lang]/[slug]` — projetos (fumadocs)
- `/archive` + `/archive/[slug]` — archive público de documentos MDX
- `/public/[section]` — dashboard público (AuthGuard sem `requireGovernment`)
- `/public-dashboard/*` — **rota morta** (diretório vazio)

---

## 4. Acoplamento do sistema de navegação

### `IndividualResolver` (`components/individual-resolver.tsx`)

- **Props:** `{ slug: string, documentId: string }`
- **Imports:** `IndividualLayoutProps`, `ProfileIdData`, `SchoolFinalEvaluationData`,
  `PermissionsData` (de `@/types/character-data`); `Individual` (de `@/utils/government-data`);
  `individuals` (de `@/data/individuals`); `getDocument` (de `@/lib/archive/registry`).
- **Acoplamento forte:** hardcoded a buscar em `individuals[]` (4 registros fixos);
  hardcoded `documentId` → `"profile" | "school-final-evaluation" | "permit-card"`;
  cast condicional baseado nesses 3 valores.
- **Sem fallback:** se `mdxSlug` não existir ou `getDocument` falhar, retorna `null`.

### `DocumentNavigator` (`components/document-navigator.tsx`)

- **Props:** `{ documents: Document[], onBack, initialIndex? }`
- **Genérico:** recebe qualquer array de `Document` (`{title, classification, department, date, signedBy, content}`).
- **Navegação:** prev/next com slide animation, indicadores de posição.
- **Não sabe de indivíduos, MDX, ou archive.** Zero acoplamento.

### `data/individuals.ts`

```typescript
interface Individual {
  slug?: string;
  name: string;
  knownAs?: string;
  codename?: string;
  status: string;
  threat: string;
  id: string;              // NRC
  documents: Document[];   // { id, name, mdxSlug? }
  layoutComponent?: React.ComponentType<IndividualLayoutProps>;
  relatedDocuments?: { slug: string; label?: string }[];
  // + campos pessoais (age, birthDate, height, etc.)
}
```

**4 indivíduos registrados:**

| slug | documents | layoutComponent |
|---|---|---|
| `ultimate` | 3: profile, sfe, permit-card | `UltimateLayout` |
| `diana-watson` | 3: profile, sfe, permit-card | `DianaWatsonLayout` |
| `kendra-connors` | 2: profile, sfe | `KendraConnorsLayout` |
| `kira` | 1: sfe | `KiraLayout` |

`relatedDocuments` (opcional) referencia slugs do archive (ex: codex, projetos classificados).

### `data/document-generators.tsx`

- Fallback hardcoded com 7 geradores: `perfil`, `psicologico`, `analise-risco`,
  `historico-missoes`, `mandado`, `ultimas-localizacoes`, `default`.
- As chaves são strings soltas (`"perfil"`, `"psicologico"`, etc.) — não estão
  ligadas a `DocumentType` do archive.
- Se o indivíduo tem `layoutComponent`, usa `IndividualResolver` (MDX) e ignora
  os geradores hardcoded. Caso contrário, usa os geradores.

---

## 5. Registry e DocumentType

### `lib/archive/registry.ts`

- Importa estaticamente todos os 39 `.mdx` (webpack asset/source).
- Mapeia slug → raw string MDX em `RAW: Record<string, string>`.
- `parseFrontmatter()`: parser YAML caseiro lê bloco `---` do MDX.
- Constrói `Map<string, ArchiveDocument>` em runtime.
- Exporta:
  - `getAllSlugs()` — todos os slugs
  - `getAllDocuments()` — ordenados por data decrescente
  - `getDocument(slug)` — lookup por slug
  - `getBatchItems(fm)` — resolve items de documentos batch

**Genérico:** `getDocument(slug)` não assume tipo de conteúdo.

### `lib/archive/documents.ts`

**`DocumentType` (25 valores):**

```
decree | dossier | memo | incident | transmission | bulletin | manifesto |
order | forensic | ai_log | id_card | bounty | broadcast | autopsy |
interrogation | news | batch | foreign_letter | propaganda |
monitored_thread | codex_entry | medical_record | classified_project |
profile-id | school-final-evaluation | permit-card
```

**`DocumentFrontmatter`:** ~140 campos opcionais. A interface gigante cobre
todos os tipos via campos opcionais — sem discriminação por tipo.

**`ArchiveDocument`:** `{ frontmatter: DocumentFrontmatter, mdx: string, mdxSource? }`

---

## 6. Conteúdo em `content/archive/`

39 arquivos MDX em 6 diretórios:

| Diretório | Qtd | Tipos |
|---|---|---|
| `profile-id/` | 3 | `profile-id` |
| `school-final-evaluation/` | 4 | `school-final-evaluation` |
| `permit-card/` | 2 | `permit-card` |
| `codex/` | 4 | `codex_entry` |
| `classified-project/` | 1 | `classified_project` |
| `examples/` | 25 | 16 tipos diferentes |

O MDX carrega dados de personagem via frontmatter JSON inline (parseado pelo
parser YAML caseiro que suporta objetos aninhados inline).

---

## 7. Pontos de atenção

1. **Acoplamento `IndividualResolver`:** hardcoded para `"profile" | "school-final-evaluation" | "permit-card"`.
   Qualquer novo tipo de documento exige:
   - Adicionar ao union em `DocumentType`
   - Adicionar ao cast condicional em `IndividualResolver`
   - Adicionar template barrel, pasta MDX, registry entry

2. **`data/document-generators.tsx`:** 7 geradores com chaves soltas (`"perfil"`, `"psicologico"`).
   Nenhum indivíduo ativo usa esses geradores (todos têm `layoutComponent`).
   Código morto a menos que novos indivíduos sem `layoutComponent` sejam adicionados.

3. **`public-dashboard/` vazio:** diretório morto, sem rotas.

4. **`PowersSection`** em `government-dashboard.tsx:73`: nome importado mas módulo
   não encontrado (erro TS pre-existente). Seção "poderes" quebra em runtime.

5. **Parser YAML caseiro:** não suporta YAML aninhado multi-linha. Dados complexos
   (objetos aninhados) precisam ser serializados como JSON inline em uma linha.
   Limitação relevante se novos tipos com frontmatter rico forem adicionados.

6. **Navegação dual:** `/archive/[slug]` (rota pública, MDX puro via TEMPLATES) vs.
   `/government/profiles` (navegação interna, IndividualResolver → MDX → layoutComponent).
   Duas maneiras de renderizar o mesmo conteúdo MDX, com pathways diferentes.

7. **`Individual` vs `ArchiveDocument`:** O sistema de governo usa `Individual` +
   `DocumentContent` (interfaces próprias em `utils/government-data.ts`). O archive
   usa `ArchiveDocument` + `DocumentFrontmatter` (em `lib/archive/documents.ts`).
   O `IndividualResolver` faz a ponte entre os dois via cast `as unknown`.

---

## 8. Diagrama simplificado do fluxo de dados

```
                    ┌─────────────────────────┐
                    │  /government/[section]   │
                    │  GovernmentDashboard     │
                    └──────────┬──────────────┘
                               │
                    ┌──────────▼──────────────┐
                    │  IndividualsSection      │
                    │  (sidebar + content)     │
                    └──────────┬──────────────┘
                               │
                    ┌──────────▼──────────────┐
                    │  DocumentNavigator       │ ← genérico, recebe Document[]
                    │  (prev/next navigation)  │
                    └──────────┬──────────────┘
                               │
                    ┌──────────▼──────────────┐
                    │  generateIndividualDocs  │
                    │  [layoutComponent?]      │
                    └──────┬──────────┬───────┘
                           │          │
               ┌───────────▼──┐  ┌───▼──────────┐
               │ Individual   │  │ documentGen. │
               │ Resolver     │  │ (fallback)   │
               │ (MDX path)   │  │ (hardcoded)  │
               └───────┬──────┘  └──────────────┘
                       │
            ┌──────────▼──────────┐
            │  getDocument(slug)  │
            │  (lib/archive/reg.) │
            └──────────┬──────────┘
                       │
            ┌──────────▼──────────┐
            │  *.mdx file          │
            │  (content/archive/)  │
            └─────────────────────┘
```
