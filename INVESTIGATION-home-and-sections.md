# INVESTIGATION: Home → Sections — fluxo de navegação e contrato

**Data:** 22-Jun-2026
**Objetivo:** Mapear como a home redireciona para as seções do governo e o
contrato exato que cada Section component precisa cumprir, antes de criar
missions, incidents e classified com dados reais.

---

## 1. Home → redirect

### `app/home/page.tsx`

Recebe `onNavigate` do `HomeScreen` que chama `router.push`:

```tsx
const handleNavigate = (section: string) => {
  if (user?.accessLevel === "government") {
    router.push(`/government/${section}`);
  } else {
    router.push(`/public/${section}`);
  }
};
```

### `components/home-screen.tsx`

As seções **linkadas** para `accessLevel === "government"` são 4 botões com
`id` que vira o parâmetro `section` na URL:

| id | name | URL resultante |
|---|---|---|
| `"classified"` | INFORMAÇÕES CLASSIFICADAS | `/government/classified` |
| `"profiles"` | PERFIS DE INDIVÍDUOS | `/government/profiles` |
| `"missions"` | RELATÓRIOS DE MISSÕES | `/government/missions` |
| `"incidents"` | REGISTRO DE INCIDENTES | `/government/incidents` |

⚠️ **Nota:** a aba "SISTEMA DE PODERES" (`poderes`) **não está linkada na home** —
só aparece no menu lateral do `GovernmentDashboard`. Não há botão com `id: "powers"`
no `HomeScreen`. É uma rota morta via URL direta (`/government/powers`).

Para `accessLevel === "public"` as seções são `library`, `maps`, `history`, `news`.

---

## 2. Route → Dashboard

### `app/government/[section]/page.tsx`

```tsx
export default function GovernmentSectionPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const section = params.section as string;  // ex: "profiles", "classified"

  return (
    <AuthGuard requireGovernment>
      {user && (
        <GovernmentDashboard user={user} onLogout={handleBack} section={section} />
      )}
    </AuthGuard>
  );
}
```

### `app/government/layout.tsx` — sem navegação entre seções

```tsx
export default function GovLayout({ children }) {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
      <div id="padding" />
      <div id="frame" />
    </>
  );
}
```

Apenas `BaseLayout` (header/footer) + bordas decorativas. **Não há navegação entre
seções no layout**. A troca de seção exige voltar para `/home`.

---

## 3. GovernmentDashboard — o orquestrador

**Arquivo:** `components/government-dashboard.tsx`

### Mapa de seção URL → interno

```tsx
const sectionMap: Record<string, string> = {
  classified: "sigiloso",
  profiles: "individuos",
  missions: "missoes",
  incidents: "incidentes",
};
// "powers" não está no mapa → cai no default do switch
```

### Seções listadas no menu lateral

```tsx
const sections = [
  { id: "sigiloso", name: "INFORMAÇÕES SIGILOSAS", icon: "🔒" },
  { id: "individuos", name: "INDIVÍDUOS DE DESTAQUE", icon: "👤" },
  { id: "missoes", name: "RELATÓRIOS DE MISSÕES", icon: "📋" },
  { id: "incidentes", name: "REGISTRO DE INCIDENTES", icon: "⚠️" },
  { id: "poderes", name: "SISTEMA DE PODERES", icon: "🔑" },
];
```

### Switch que resolve Section component

```tsx
const getSectionContent = () => {
  switch (activeSection) {
    case "individuos":  return IndividualsSection({ onCloseMobileSidebar: closeSidebar });
    case "sigiloso":    return ClassifiedSection({ onCloseMobileSidebar: closeSidebar });
    case "missoes":     return MissionsSection({ onCloseMobileSidebar: closeSidebar });
    case "incidentes":  return IncidentsSection({ onCloseMobileSidebar: closeSidebar });
    case "poderes":     return PowersSection({ onCloseMobileSidebar: closeSidebar });
    default:            return { sidebar: null, content: <div>SEÇÃO NÃO ENCONTRADA</div> };
  }
};
```

### Consumo do retorno — o contrato

```tsx
const { sidebar, content } = getSectionContent();
```

O layout renderiza:
```
desktop: grid md:grid-cols-[250px_1fr]
  ├── sidebar (sticky, left column)
  └── content (main, right column)

mobile: Sheet (sidebar em drawer) + content full-width
```

**Contrato: toda Section deve retornar `{ sidebar: JSX.Element, content: JSX.Element }`**

---

## 4. IndivíduosSection — referência (a única com dados reais)

**Arquivo:** `components/government/individuals-section.tsx` (197 linhas)

### Props
```tsx
interface IndividualsSectionProps {
  onCloseMobileSidebar?: () => void;
}
```

### Shape retornado
```tsx
return {
  sidebar: renderSidebar(),  // JSX.Element — accordion de indivíduos + documentos
  content: renderContent(),  // JSX.Element — FileLoading | DocumentNavigator | empty state
};
```

### Fluxo interno
```
sidebar:
  individuals.map() →
    button toggle → expande seção do indivíduo
      → documents.map() → handleIndividualDocumentClick(name, docId)

content:
  └─ isLoadingFile → <FileLoading />
  └─ selectedEntity && selectedFile → <DocumentNavigator
       documents={generateEntityDocuments(selectedEntity)}
       initialIndex={...} />
  └─ else → empty state "SELECIONE UM ARQUIVO"
```

### Estado local
```tsx
const [selectedFile, setSelectedFile] = useState<string | null>(null);
const [selectedEntity, setSelectedEntity] = useState<Individual | null>(null);
const [isLoadingFile, setIsLoadingFile] = useState(false);
const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
```

---

## 5. As outras 3 Sections (mock) — mesmo padrão

Todas seguem idêntico contrato `{ sidebar, content }`:

| Section | Data source | Sidebar | Content | Usa DocumentNavigator? |
|---|---|---|---|---|
| `ClassifiedSection` | `sigilosoData[]` inline (4 itens) | lista de arquivos | `DocumentViewer` direto | ❌ |
| `MissionsSection` | `missoesData[]` inline (4 itens) | lista de missões | `DocumentViewer` direto | ❌ |
| `IncidentsSection` | `incidentesData[]` inline (4 itens) | lista de incidentes | `DocumentViewer` direto | ❌ |
| `PowersSection` | `powers[]` de `data/powers.ts` | accordion powers | `DocumentNavigator` via `generatePowerDocuments()` | ✅ |

A diferença principal: `IndividualsSection` e `PowersSection` usam `DocumentNavigator`
com navegação entre documentos; as demais usam `DocumentViewer` direto (sem navegação).

---

## 6. DocumentContent interface — o shape do DocumentNavigator

### Em `utils/government-data.ts` (linha 65)

```tsx
export interface DocumentContent {
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}
```

### Em `components/document-navigator.tsx` (linha 9) — duplicado localmente

```tsx
interface Document {
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}
```

**Mesmo shape exato**, mas definido separadamente (não importa de `government-data.ts`).
`DocumentNavigator` recebe `documents: Document[]` e renderiza cada um via
`DocumentViewer`.

```tsx
interface DocumentNavigatorProps {
  documents: Document[];
  onBack: () => void;
  initialIndex?: number;
}
```

---

## 7. Individual — shape atual (pós-refatoração)

### Em `utils/government-data.ts`

```tsx
export interface Entity {
  slug: string;
  name: string;
  status: string;
  id: string;
  documents: Document[];
  department?: string;
  layoutComponent?: React.ComponentType<EntityLayoutProps>;
}

export interface Individual extends Entity {
  slug: string;
  knownAs?: string;
  codename?: string;
  threat: string;
  age?: number;
  birthDate?: string;
  birthPlace?: string;
  occupation?: string;
  nationality?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  eyeColor?: string;
  hairColor?: string;
  skinColor?: string;
  specializations?: string[];
  clearanceLevel?: string;
  yearsOfService?: number;
  lastKnownLocation?: string;
  aliases?: string[];
  relatedDocuments?: { slug: string; label?: string }[];
}

export interface Document {
  id: string;
  name: string;
  mdxSlug?: string;
}
```

### Em `data/individuals.ts` (primeiro registro)

```tsx
{
  slug: "diana-watson",
  name: "Diana Watson",
  knownAs: "",
  codename: "",
  status: "",       // ← vazio nos 4 indivíduos
  threat: "",       // ← vazio em Diana, Kendra, Kira
  id: "??-1230-28467351",
  age: 15,
  birthDate: "87 - Solaris - 1230",
  birthPlace: "Isaac's Village",
  occupation: "Aventureiro/Estudante",
  nationality: "",
  height: "1.65m",
  weight: "50kg",
  bloodType: "O-",
  eyeColor: "Castanho",
  hairColor: "Castanho",
  skinColor: "branco",
  specializations: [],
  clearanceLevel: "NÍVEL 1",
  department: "",
  yearsOfService: 0,
  layoutComponent: DianaWatsonLayout,
  documents: [
    { id: "profile", name: "Perfil", mdxSlug: "profile-id-diana-watson" },
    { id: "school-final-evaluation", name: "Avaliação Final Escolar", mdxSlug: "sfe-diana-watson" },
    { id: "permit-card", name: "Permissões", mdxSlug: "permit-card-diana-watson" },
  ],
}
```

---

## 8. Resumo do contrato para criar novas Sections

Para criar uma nova seção (ex: `MissionsSection` real, `IncidentsSection` real):

1. **Props:** `{ onCloseMobileSidebar?: () => void }`
2. **Retorno:** `{ sidebar: JSX.Element, content: JSX.Element }`
3. **Sidebar:** navegação entre entidades (accordion, lista, etc.)
4. **Content:** `FileLoading` → `DocumentNavigator` com `generateEntityDocuments(entity)`
   ou `DocumentViewer` direto
5. **Registro:** adicionar `case` no switch do `GovernmentDashboard.getSectionContent()`
6. **Dados:** a entidade precisa ter `Entity`-compatible shape:
   `{ slug, name, status, id, documents: Document[], layoutComponent?, department? }`
7. **DocumentNavigator** espera `DocumentContent[]` — que `generateEntityDocuments()` produz
8. **Se usar MDX:** a entidade precisa de `layoutComponent` + cada documento com `mdxSlug`
   apontando para o registry
