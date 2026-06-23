# INVESTIGATION: IndividualResolver → EntityResolver

**Data:** 21-Jun-2026
**Objetivo:** Mapear cada ponto de acoplamento do `IndividualResolver` antes de
generalizá-lo para suportar entidades como missões, incidentes, poderes, etc.

---

## 1. IndividualResolver — código completo

**Arquivo:** `components/individual-resolver.tsx` (54 linhas)

```tsx
"use client";

import type { IndividualLayoutProps } from "@/types/character-data";
import type {
  ProfileIdData,
  SchoolFinalEvaluationData,
  PermissionsData,
} from "@/types/character-data";
import type { Individual } from "@/utils/government-data";
import { individuals } from "@/data/individuals";
import { getDocument } from "@/lib/archive/registry";

interface IndividualResolverProps {
  slug: string;
  documentId: string;
}

export const IndividualResolver = ({
  slug,
  documentId,
}: IndividualResolverProps) => {
  const individual: Individual | undefined = individuals.find(
    (p) => p.slug === slug,
  );
  if (!individual || !individual.layoutComponent) return null;

  const LayoutComponent = individual.layoutComponent;

  const currentDoc = individual.documents.find((d) => d.id === documentId);
  if (currentDoc?.mdxSlug) {
    const mdxDoc = getDocument(currentDoc.mdxSlug);
    if (mdxDoc) {
      const fm = mdxDoc.frontmatter;
      const data: IndividualLayoutProps = {
        documentId,
        profileId:
          documentId === "profile"
            ? (fm as unknown as ProfileIdData)
            : undefined,
        schoolFinalEvaluation:
          documentId === "school-final-evaluation"
            ? (fm as unknown as SchoolFinalEvaluationData)
            : undefined,
        permissions:
          documentId === "permit-card"
            ? (fm as unknown as PermissionsData)
            : undefined,
      };
      return <LayoutComponent {...data} />;
    }
  }

  return null;
};
```

### Pontos de acoplamento identificados

| # | O quê | Linha | Detalhe |
|---|---|---|---|
| A1 | Import de `data/individuals` | 10 | `import { individuals } from "@/data/individuals"` — busca em array fixo de 4 registros |
| A2 | Import de `Individual` type | 9 | `import type { Individual } from "@/utils/government-data"` |
| A3 | Busca por slug em `individuals` | 18-19 | `individuals.find(p => p.slug === slug)` — hardcoded no array |
| A4 | `layoutComponent` vindo de `Individual` | 21 | `individual.layoutComponent` — o layout é propriedade da entidade |
| A5 | `documents` vindo de `Individual` | 23 | `individual.documents.find(d => d.id === documentId)` — documentos são propriedade da entidade |
| A6 | `mdxSlug` assumido como campo de Document | 24 | `currentDoc.mdxSlug` — acoplado ao tipo `Document` de `government-data.ts` |
| A7 | Cast condicional por `documentId` | 27-38 | 3 valores hardcoded: `"profile"`, `"school-final-evaluation"`, `"permit-card"` |
| A8 | `IndividualLayoutProps` | 26 | Props tipadas para indivíduo — não genéricas |
| A9 | Retorno `null` sem fallback | 41 | Se não achar entidade, layout, ou MDX, retorna `null` silenciosamente |

---

## 2. IndividualsSection — como chama o resolver

**Arquivo:** `components/government/individuals-section.tsx` (197 linhas)

### Contrato de props

```tsx
interface IndividualsSectionProps {
  onCloseMobileSidebar?: () => void;
}
```

Retorna `{ sidebar: JSX, content: JSX }` — o `GovernmentDashboard` espera esse shape.

### Fluxo de instanciação do IndividualResolver

```
IndividualsSection
├── sidebar: individuals.map() →
│   accordion → individual.documents.map() →
│     → handleIndividualDocumentClick(individualName, docId)
│       → setSelectedFile(`${individualName}-${docId}`)
│       → setIsLoadingFile(true) → FileLoading
│
└── content (após FileLoading):
    const documentId = selectedFile.replace(`${selectedIndividual}-`, "");
    const individual = individuals.find(...);
    const initialIndex = individual?.documents.findIndex(...) ?? 0;

    <IndividualsNavigationProvider onNavigate={...}>
      <DocumentNavigator
        documents={generateIndividualDocuments(selectedIndividual, individuals)}
        initialIndex={initialIndex}
        onBack={() => { setSelectedFile(null); setSelectedIndividual(null); }}
      />
    </IndividualsNavigationProvider>
```

### Como o IndividualResolver é chamado

Não é chamado diretamente aqui — é chamado dentro de `generateIndividualDocuments()`:

```tsx
// data/document-generators.tsx
export const generateIndividualDocuments = (individualName, individuals) => {
  const individual = individuals.find(...);
  if (!individual) return [];

  if (individual.layoutComponent) {
    return individual.documents.map(doc => ({
      title: `${doc.name}: ${individualName}`,
      classification: "CONFIDENCIAL",
      department: individual.department || "DEPARTAMENTO DE REGISTROS E ARQUIVOS",
      date: "2024.03.15",
      signedBy: "Sistema de Documentação Automatizado",
      content: <IndividualResolver slug={individual.slug ?? ""} documentId={doc.id} />,
    }));
  }

  // Fallback: documentGenerators hardcoded (nunca usado — todos têm layoutComponent)
};
```

**Shape do objeto para o DocumentNavigator:**

```tsx
interface Document {     // ← definido localmente em document-navigator.tsx
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}
```

---

## 3. generateIndividualDocuments

**Arquivo:** `data/document-generators.tsx` (inteiro — 461 linhas)

### O que recebe

```tsx
export const generateIndividualDocuments = (
  individualName: string,
  individuals: Individual[]
): DocumentContent[]
```

### O que retorna

`DocumentContent[]` onde `DocumentContent` é:

```tsx
interface DocumentContent {     // utils/government-data.ts
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}
```

### Fluxo interno

1. Busca o indivíduo por `name` ou `knownAs`
2. Se tem `layoutComponent` → mapeia `documents[]` para `DocumentContent[]` com
   `content: <IndividualResolver slug={slug} documentId={doc.id} />`
3. Se **não** tem `layoutComponent` → usa geradores hardcoded:
   - `perfil`, `psicologico`, `analise-risco`, `historico-missoes`,
     `mandado`, `ultimas-localizacoes`, `default`
   - Chaves são strings soltas (`"perfil"`, `"psicologico"`, etc.)
   - Nenhum indivíduo atual usa este caminho (todos têm `layoutComponent`)

### O que precisa mudar para ser genérica

| Aspecto | Atual | Genérico |
|---|---|---|
| Nome da função | `generateIndividualDocuments` | `generateEntityDocuments` |
| Parâmetro | `individualName: string` | `entityName: string` |
| Array | `individuals: Individual[]` | `entities: Entity[]` (genérico) |
| Documentos | `individual.documents` | `entity.documents` |
| Resolver | `<IndividualResolver slug={...} />` | `<EntityResolver slug={...} />` |
| Layout component | `individual.layoutComponent` | `entity.layoutComponent` |
| Fallback | documentGenerators hardcoded (morto) | Remover ou generalizar |

---

## 4. Interfaces relevantes

### `utils/government-data.ts` — interfaces base

```tsx
import type React from "react";
import type { IndividualLayoutProps } from "@/types/character-data";

export interface Document {
  id: string;
  name: string;
  mdxSlug?: string;
}

export interface Individual {
  slug?: string;
  name: string;
  knownAs?: string;
  codename?: string;
  status: string;
  threat: string;
  id: string;
  documents: Document[];
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
  department?: string;
  yearsOfService?: number;
  lastKnownLocation?: string;
  aliases?: string[];
  relatedDocuments?: { slug: string; label?: string }[];
  layoutComponent?: React.ComponentType<IndividualLayoutProps>;
}

export interface ClassifiedInfo {
  name: string;
  classification: string;
  date: string;
}

export interface Mission {
  code: string;
  name: string;
  status: string;
  success: string;
}

export interface Incident {
  id: string;
  type: string;
  severity: string;
  date: string;
}

export interface DocumentContent {
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}
```

**Campos específicos de `Individual`:**
- `knownAs`, `codename`, `threat`, `age`, `birthDate`, `birthPlace`,
  `occupation`, `nationality`, `height`, `weight`, `bloodType`, `eyeColor`,
  `hairColor`, `skinColor`, `specializations`, `clearanceLevel`, `department`,
  `yearsOfService`, `lastKnownLocation`, `aliases`, `relatedDocuments`

**Campos genéricos para qualquer entidade:**
- `slug`, `name`, `status`, `id`, `documents[]`, `layoutComponent`

### `types/character-data.ts` — interfaces de dados do archive

```tsx
export interface ResponsibleSignature { /* department, name, registry, signature, timestamp */ }
export interface MentorData { /* department?, name?, registry?, signature?, timestamp? */ }

export interface ProfileIdData {
  name, knownAs, birthDate, birthPlace, age, occupation,
  height, weight, bloodType, eyeColor, hairColor, skinColor,
  responsibleSignaturesData: ResponsibleSignature[],
  isHighSecurity?: boolean,
}

export interface PermissionsData {
  id, registryName, age, birthDate, licenseStartDate,
  tier: string,
  mentor: MentorData,
  responsibleSignatures: ResponsibleSignature[],
}

export interface Affinities { chakra, mana, spectral: number }
export interface EnergyComponentValues { totalEnergy, energyControl, speedManipulation: number }
export interface PhysicalComponentValues { strength, physicalSpeed, durability, stamina: number }
export interface AdditionalTableValues { survivanceAndFirstAid, strategySkills, teamwork, historyAndGeography: number }
export interface PersonalInfoData { registryName, realName, redactRealName, age, birthDate, redactBirthDate, residence, redactResidence }
export interface FinalEvaluationData { date, institute, examiners, redactExaminers }

export interface SchoolFinalEvaluationData {
  registry: string;
  personalInfoData: PersonalInfoData;
  finalEvaluationData: FinalEvaluationData;
  affinities: Affinities;
  energyComponentValues: EnergyComponentValues;
  physicalComponentValues: PhysicalComponentValues;
  additionalTableValues: AdditionalTableValues;
  responsibleSignaturesData: ResponsibleSignature[];
  isHighSecurity?: boolean;
}

export interface IndividualLayoutProps {
  documentId: string;
  profileId?: ProfileIdData;
  schoolFinalEvaluation?: SchoolFinalEvaluationData;
  permissions?: PermissionsData;
}
```

**`IndividualLayoutProps` é o ponto central de acoplamento:** tem 3 props opcionais
nomeadas para os 3 tipos de documento de indivíduo. Qualquer nova entidade (missão,
incidente, poder) precisaria de:
- Um novo conjunto de interfaces de dados
- Novas props opcionais em `IndividualLayoutProps` (ou uma substituição genérica)

---

## 5. Como layoutComponent é usado

### No IndividualResolver

```tsx
const LayoutComponent = individual.layoutComponent;  // ComponentType<IndividualLayoutProps>
return <LayoutComponent {...data} />;                 // data é IndividualLayoutProps
```

### Exemplo: `components/archives/individuals/ultimate-archive.tsx`

```tsx
export const UltimateLayout = ({
  documentId,
  profileId,
  schoolFinalEvaluation,
  permissions,
}: IndividualLayoutProps) => {
  if (documentId === "profile" && profileId) {
    const doc = { frontmatter: profileId, mdx: "" } as unknown as ArchiveDocument;
    return <ProfileId doc={doc} />;
  }
  if (documentId === "school-final-evaluation" && schoolFinalEvaluation) {
    const doc = { frontmatter: schoolFinalEvaluation, mdx: "" } as unknown as ArchiveDocument;
    return <SchoolFinalEvaluationDoc doc={doc} />;
  }
  if (documentId === "permit-card" && permissions) {
    const doc = { frontmatter: permissions, mdx: "" } as unknown as ArchiveDocument;
    return <PermitCard doc={doc} />;
  }
  return <div>Ultimate Layout</div>;
};
```

**Padrão:** Cada layout component recebe `IndividualLayoutProps`, faz `if(documentId)`,
converte a prop correspondente para `ArchiveDocument` via `as unknown`, e renderiza
o template.

---

## 6. Mapa de mudanças necessárias

### Legenda
- **Essencial** — precisa mudar para desacoplar
- **Desejável** — melhoria, mas não bloqueia
- **Morto** — código sem uso ativo

| # | Arquivo | O que muda | Por quê |
|---|---|---|---|
| 1 | `utils/government-data.ts` | Extrair interface `Entity { slug, name, status, id, documents, layoutComponent }` de `Individual` | Ter tipo base que missões, incidentes, poderes, indivíduos compartilham |
| 2 | `utils/government-data.ts` | Remover `IndividualLayoutProps` do tipo do `layoutComponent` | `layoutComponent` precisa aceitar props genéricas |
| 3 | `types/character-data.ts` | Substituir `IndividualLayoutProps` por `EntityLayoutProps { documentId, frontmatter? }` | Desacoplar props do layout dos tipos de indivíduo |
| 4 | `components/individual-resolver.tsx` | Renomear para `entity-resolver.tsx` | Nome refletir propósito genérico |
| 5 | `components/individual-resolver.tsx` | Import `individuals` → receber entidades por props | Não buscar em array fixo |
| 6 | `components/individual-resolver.tsx` | Cast condicional `"profile"`/`"school-final-evaluation"`/`"permit-card"` → genérico (`frontmatter as unknown`) | Suportar qualquer `DocumentType` |
| 7 | `components/individual-resolver.tsx` | `IndividualLayoutProps` → `EntityLayoutProps` | Props genéricas |
| 8 | `components/archives/individuals/*.tsx` (4) | `IndividualLayoutProps` → `EntityLayoutProps` | Assinatura do layout component |
| 9 | `components/archives/individuals/*.tsx` (4) | Cast `as unknown as ArchiveDocument` permanece igual | Funciona com qualquer frontmatter |
| 10 | `data/document-generators.tsx` | Renomear `generateIndividualDocuments` → `generateEntityDocuments` | Alinhar com nova nomenclatura |
| 11 | `data/document-generators.tsx` | Aceitar `Entity[]` genérico em vez de `Individual[]` | Suportar missões, incidentes, etc. |
| 12 | `data/document-generators.tsx` | `IndividualResolver` → `EntityResolver` | Componente renomeado |
| 13 | `data/document-generators.tsx` | Remover fallback hardcoded (documentGenerators) | Morto — todos usam MDX |
| 14 | `data/powers.ts` | `powers: any[]` → `powers: Entity[]` compatível | Poderes como entidade |
| 15 | `data/powers.ts` | `layoutComponent: ""` → `layoutComponent: ComponentType` | Valores reais |
| 16 | `data/power-generators.tsx` | Substituir por fluxo via `generateEntityDocuments` | Unificar com o sistema de entidades |
| 17 | `components/government/powers-section.tsx` | Importar `PowersSection` no dashboard | Consertar erro TS2304 |
| 18 | `components/government/powers-section.tsx` | Usar `Entity` types em vez de `any` | Type safety |
| 19 | `components/government/powers-section.tsx` | Usar `generateEntityDocuments` | Unificar |
| 20 | `components/government/individuals-section.tsx` | Renomear variáveis para genérico | Alinhar |
| 21 | `components/government-dashboard.tsx` | Adicionar import de `PowersSection` | Consertar erro existente |
| 22 | `components/government/classified-section.tsx` | (Fora do escopo) | Dados mock, não usa resolver |
| 23 | `components/government/missions-section.tsx` | (Futuro) | Dados mock |
| 24 | `components/government/incidents-section.tsx` | (Futuro) | Dados mock |

### Mudanças essenciais (ordem de implementação)

```
1. types/character-data.ts   → EntityLayoutProps
2. utils/government-data.ts  → Entity interface, layoutComponent tipo genérico
3. components/individual-resolver.tsx → entity-resolver.tsx (props, imports, cast)
4. components/archives/individuals/*.tsx → assinatura EntityLayoutProps
5. data/document-generators.tsx → generateEntityDocuments
6. data/powers.ts → tipar como Entity[], layoutComponent real
7. components/government/powers-section.tsx → import no dashboard, tipos
8. components/government-dashboard.tsx → import PowersSection
```

### Diagrama de dependências

```
government-dashboard.tsx
├── individuals-section.tsx
│   └── generateIndividualDocuments()      [data/document-generators.tsx]
│       └── IndividualResolver              [components/individual-resolver.tsx]
│           ├── individuals                 [data/individuals.ts]
│           ├── getDocument()               [lib/archive/registry.ts]
│           └── IndividualLayoutProps       [types/character-data.ts]
│
├── classified-section.tsx    (mock — não usa resolver)
├── missions-section.tsx      (mock — não usa resolver)
├── incidents-section.tsx     (mock — não usa resolver)
└── powers-section.tsx        [SEM IMPORT — quebrado]
    └── generatePowerDocuments()            [data/power-generators.tsx]
        └── powers                          [data/powers.ts] (any[], layoutComponent: "")
```

O `IndividualResolver` está no centro do grafo. Qualquer entidade nova que queira
usar MDX + layout component + DocumentNavigator precisa passar por ele.

---

## 7. Estratégia de generalização (esboço)

```tsx
// Novo EntityLayoutProps (genérico)
interface EntityLayoutProps {
  documentId: string;
  frontmatter: DocumentFrontmatter;  // direto do MDX, sem cast por tipo
}

// EntityResolver aceita props genéricas
interface EntityResolverProps {
  slug: string;
  documentId: string;
  entities: Entity[];   // ← recebido por props, não importado
}

// Entity base
interface Entity {
  slug: string;
  name: string;
  documents: Document[];  // { id, name, mdxSlug? }
  layoutComponent?: ComponentType<EntityLayoutProps>;
}
```

Cada layout component (ex: `UltimateLayout`, futuro `MissionLayout`) recebe
`EntityLayoutProps` e faz o cast `frontmatter as unknown as NeededType`.
O `EntityResolver` não precisa saber quais tipos de documento existem —
só passa o `frontmatter`.
