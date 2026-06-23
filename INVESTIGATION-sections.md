# INVESTIGATION: Seções do Governo e Dashboard Público

**Data:** 21-Jun-2026
**Objetivo:** Mapear conteúdo real vs. placeholder de todas as seções do governo
e do dashboard público.

---

## 1. Seções do Governo

Todas em `components/government/*.tsx`. Contrato comum: recebem `{ onCloseMobileSidebar?: () => void }` e retornam `{ sidebar: JSX, content: JSX }`.

O `GovernmentDashboard` em `components/government-dashboard.tsx` faz:

```tsx
<sectionMap = {
  classified: "sigiloso",
  profiles:   "individuos",
  missions:   "missoes",
  incidents:  "incidentes",
}>

switch (activeSection) {
  case "individuos": return IndividualsSection({...});
  case "sigiloso":   return ClassifiedSection({...});
  case "missoes":    return MissionsSection({...});
  case "incidentes": return IncidentsSection({...});
  case "poderes":    return PowersSection({...});   // ← ERRO: não importado
}
```

**`PowersSection` não é importado** no dashboard (linhas 15-18 só importam as outras 4). O `tsc` acusa `TS2304: Cannot find name 'PowersSection'`. O arquivo existe em `components/government/powers-section.tsx`, mas falta o `import` no dashboard.

---

### 1.1 IndividualsSection → `components/government/individuals-section.tsx`

*(Lido em INVESTIGATION-routes.md — incluído aqui como referência)*

| Item | Status |
|---|---|
| **Props** | `{ onCloseMobileSidebar? }` |
| **Sidebar** | Accordion de 4 indivíduos de `data/individuals.ts` com sub-lista de `documents[]` |
| **Content** | `FileLoading` → `DocumentNavigator` com `generateIndividualDocuments()` → `IndividualResolver` → MDX |
| **Dados** | **Reais** — dados de `data/individuals.ts` + MDX em `content/archive/` |
| **Tipos** | Usa `Individual` de `@/utils/government-data` |
| **Tamanho** | 197 linhas |

---

### 1.2 ClassifiedSection → `components/government/classified-section.tsx`

| Item | Status |
|---|---|
| **Props** | `{ onCloseMobileSidebar? }` |
| **Sidebar** | Lista flat de 4 itens hardcoded de `sigilosoData` (const local, linhas 13-30) |
| **Content** | `FileLoading` → `DocumentViewer` com conteúdo mock (RedactedText, dados genéricos) |
| **Dados** | **Mock hardcoded** — `sigilosoData` local com 4 entries: |
| | `PROJETO AURORA` / `OPERAÇÃO ECLIPSE` / `PROTOCOLO SIGMA` / `INICIATIVA NEXUS` |
| **Sem DocumentNavigator** | Usa `DocumentViewer` direto com botão "VOLTAR" |
| **Tipos** | `ClassifiedSectionProps` local (interface inline) |
| **Tamanho** | 217 linhas |

Código do data mock:

```tsx
const sigilosoData = [
  { name: "PROJETO AURORA",        classification: "ULTRA-SECRETO", date: "2024.03.15" },
  { name: "OPERAÇÃO ECLIPSE",      classification: "SECRETO",       date: "2024.03.10" },
  { name: "PROTOCOLO SIGMA",       classification: "CONFIDENCIAL",  date: "2024.03.05" },
  { name: "INICIATIVA NEXUS",      classification: "ULTRA-SECRETO", date: "2024.02.28" },
];
```

O content usa `DocumentViewer` com conteúdo estático genérico preenchido de `<RedactedText>` — nenhum dado real.

---

### 1.3 MissionsSection → `components/government/missions-section.tsx`

| Item | Status |
|---|---|
| **Props** | `{ onCloseMobileSidebar? }` |
| **Sidebar** | Lista flat de 4 itens hardcoded de `missoesData` (const local, linhas 13-38) |
| **Content** | `FileLoading` → `DocumentViewer` com conteúdo mock |
| **Dados** | **Mock hardcoded** — `missoesData` local com 4 entries: |
| | `M-2024-047` / `M-2024-048` / `M-2024-049` / `M-2024-050` |
| **Sem DocumentNavigator** | Usa `DocumentViewer` direto |
| **Tipos** | `MissionsSectionProps` local (interface inline) |
| **Tamanho** | 171 linhas |

```tsx
const missoesData = [
  { code: "M-2024-047", name: "Operação Tempestade",      status: "CONCLUÍDA",    success: "SIM" },
  { code: "M-2024-048", name: "Resgate Setor 7",          status: "EM ANDAMENTO", success: "N/A" },
  { code: "M-2024-049", name: "Infiltração Delta",        status: "CONCLUÍDA",    success: "PARCIAL" },
  { code: "M-2024-050", name: "Reconhecimento Norte",     status: "PLANEJAMENTO", success: "N/A" },
];
```

---

### 1.4 IncidentsSection → `components/government/incidents-section.tsx`

| Item | Status |
|---|---|
| **Props** | `{ onCloseMobileSidebar? }` |
| **Sidebar** | Lista flat de 4 itens hardcoded de `incidentesData` (const local, linhas 13-38) |
| **Content** | `FileLoading` → `DocumentViewer` com conteúdo mock |
| **Dados** | **Mock hardcoded** — `incidentesData` local com 4 entries: |
| | `INC-2024-089` / `INC-2024-090` / `INC-2024-091` / `INC-2024-092` |
| **Sem DocumentNavigator** | Usa `DocumentViewer` direto |
| **Tipos** | `IncidentsSectionProps` local (interface inline) |
| **Tamanho** | 171 linhas |

```tsx
const incidentesData = [
  { id: "INC-2024-089", type: "VIOLAÇÃO DE SEGURANÇA", severity: "CRÍTICO", date: "2024.03.15" },
  { id: "INC-2024-090", type: "ANOMALIA DETECTADA",    severity: "ALTO",    date: "2024.03.14" },
  { id: "INC-2024-091", type: "FALHA DE SISTEMA",      severity: "MÉDIO",   date: "2024.03.12" },
  { id: "INC-2024-092", type: "ACESSO NÃO AUTORIZADO", severity: "ALTO",    date: "2024.03.10" },
];
```

---

### 1.5 PowersSection → `components/government/powers-section.tsx`

| Item | Status |
|---|---|
| **Props** | `{ onCloseMobileSidebar? }` |
| **Sidebar** | Accordion de 5 poderes de `data/powers.ts` com sub-lista de `documents[]` |
| **Content** | `FileLoading` → `DocumentNavigator` com `generatePowerDocuments()` |
| **Dados** | **Mock/tipado como `any`** — `data/powers.ts` exporta `powers: any[]` com 5 grupos de poder |
| **Tem DocumentNavigator** | Sim — igual ao `IndividualsSection`, com prev/next |
| **Tipos** | Nenhum — `power: any`, `doc: any`, `powers: any[]` |
| **Import quebrado** | `PowersSection` não é importado em `government-dashboard.tsx` → erro `TS2304` |
| **Tamanho** | 162 linhas |

Estrutura em `data/powers.ts`:

```tsx
export const powers: any[] = [
  { name: "Energias",                      layoutComponent: "", documents: [{id:"ki",name:"Ki"}, ...] },
  { name: "Poderes Oculares",              layoutComponent: "", documents: [{id:"crimson-eyes",name:"Crimson/Scarlet Eyes"}, ...] },
  { name: "Poderes Oculares - Mutações",   layoutComponent: "", documents: [{id:"insane-crimson-eyes",name:"Insane Crimson Eyes"}, ...] },
  { name: "Transformações",                layoutComponent: "", documents: [{id:"ascendent",name:"Ascendente"}, ...] },
  { name: "Habilidades",                   layoutComponent: "", documents: [{id:"rupture",name:"Ruptura do Espirito Escarlate"}] },
];
```

`generatePowerDocuments()` em `data/power-generators.tsx`:

```tsx
export const generatePowerDocuments = (powerName: string, powers: any[]): any[] => {
  const power = powers.find(...);
  if (!power) return [];
  const LayoutComponent = power.layoutComponent;  // ← string vazia ""
  return power.documents.map((doc: any) => ({
    content: <LayoutComponent power={power} documentId={doc.id} />,
  }));
};
```

**Problema:** `power.layoutComponent` é `""` (string vazia) — não é um componente React. `generatePowerDocuments` retorna `any[]` com `{ content: <LayoutComponent .../> }` onde `LayoutComponent` é `""`, que React renderiza como texto vazio. A navegação funciona (DocumentNavigator itera os documentos), mas o conteúdo renderizado é vazio. Além disso, os dados retornados não incluem `title`, `classification`, `department`, `date`, `signedBy` como o `DocumentNavigator.Document` espera — só `content`.

---

## 2. GovernmentDashboard

**Arquivo:** `components/government-dashboard.tsx` (148 linhas)

| Aspecto | Detalhe |
|---|---|
| **Props** | `{ user: {username, accessLevel}, onLogout, section: string }` |
| **sectionMap** | `{ classified → "sigiloso", profiles → "individuos", missions → "missoes", incidents → "incidentes" }` |
| **Seções no menu** | 5: sigiloso, individuos, missoes, incidentes, poderes |
| **Loading** | `setTimeout 2s` → `LoadingScreen` |
| **Sidebar** | Sempre presente no conteúdo de cada seção (retornado como `{sidebar, content}`) |
| **Mobile** | Sheet overlay com o sidebar |
| **Instanciação** | Chama cada Section como função: `IndividualsSection({onCloseMobileSidebar: closeSidebar})` |

**Problema:** `PowersSection` é chamado na linha 73 mas **não importado** (linhas 15-18). Causa `TS2304` em build e quebra em runtime.

---

## 3. PublicDashboard → `components/public-dashboard.tsx`

| Item | Status |
|---|---|
| **Props** | `{ user: {username, accessLevel}, onLogout, section: string }` |
| **sectionMap** | `{ library → "biblioteca", maps → "mapas", history → "historia", news → "noticias" }` |
| **Sidebar** | **Não tem** — é um layout flat sem navegação lateral |
| **Content** | 4 seções inline: biblioteca (lista de documentos mock), mapas (placeholder), história (timeline mock), notícias (cards mock) |
| **Dados** | **100% mock hardcoded** — nada vem de `data/` ou do archive |
| **Loading** | `setTimeout 2s` |
| **Tipos** | `PublicDashboardProps` local |
| **Tamanho** | 262 linhas |

Seções do PublicDashboard:

| section param | activeSection | Conteúdo |
|---|---|---|
| `library` | `biblioteca` | Lista de 4 itens mock (Fundamentos do Mundo, Guia de Sobrevivência, etc.) → DocumentViewer com texto estático |
| `maps` | `mapas` | Placeholder com ícone 🗺️ e texto "MAPA INTERATIVO" |
| `history` | `historia` | Timeline mock com 4 eventos (2150-2225) |
| `news` | `noticias` | 3 cards mock de notícias |

---

## 4. Estrutura de dados existente por seção

| Seção | Arquivo de dados | Shape | Dados reais? |
|---|---|---|---|
| Individuals (`individuos`) | `data/individuals.ts` | `Individual[]` com `documents`, `layoutComponent`, `slug` | ✅ Sim — 4 personagens com MDX |
| Classified (`sigiloso`) | Nenhum — mock inline | `sigilosoData` local | ❌ Mock hardcoded |
| Missions (`missoes`) | Nenhum — mock inline | `missoesData` local | ❌ Mock hardcoded |
| Incidents (`incidentes`) | Nenhum — mock inline | `incidentesData` local | ❌ Mock hardcoded |
| Powers (`poderes`) | `data/powers.ts` | `any[]` com `layoutComponent: ""` | ⚠️ Esboço v0, sem tipos, sem MDX |
| Public dashboard | Nenhum — mock inline | Texto estático | ❌ Mock hardcoded |

---

## 5. Resumo do estado de cada seção

```
Seção           Sidebar         Content         Dados       Usa Archive?   Funciona?
──────          ───────         ───────         ─────       ───────────    ─────────
individuos      Accordion(4)    DocNav+MDX      Reais       ✅ profile-id   ✅
                                                             sfe, permit
sigiloso        Lista flat(4)   DocViewer       Mock        ❌             ✅ (mock)
missoes         Lista flat(4)   DocViewer       Mock        ❌             ✅ (mock)
incidentes      Lista flat(4)   DocViewer       Mock        ❌             ✅ (mock)
poderes         Accordion(5)    DocNav+vazio    Esboço      ❌             ❌ (import+data)
```

**Nenhuma seção além de `individuos` tem dados reais ou integração com o archive MDX.** Todas as outras são mocks v0 gerados por ferramenta (cópia do padrão `IndividualsSection` com dados trocados).
