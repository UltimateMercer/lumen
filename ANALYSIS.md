# Lumen — Análise de Qualidade

## Resumo Executivo

O projeto Lumen é um site Next.js 16 ficcional-diegético com arquitetura App Router, bem estruturado em termos de separação de pastas e com uma identidade visual consistente usando Tailwind CSS v4 e shadcn/ui. O sistema de "documentos" por personagem — com dados estáticos em `data/` e layouts dedicados em `components/individual-layouts/` — é criativo e bem executado visualmente, com componentes reutilizáveis de "papelaria" (Paper, SectionPaper, assinaturas, carimbos) que mantêm a coerência diegética.

Os pontos críticos estão na modelagem dos dados: os JSONs em `data/` contêm valores pré-calculados que deveriam ser derivados (ex: `tablePowerValues`, `mediumAffinity` duplicado em múltiplos formatos), os cálculos do sistema de poder estão espalhados por 6+ componentes em vez de centralizados, e praticamente toda a camada de dados carece de tipagem TypeScript (uso dominante de `any`). Além disso, há dependências não declaradas usadas no código (`fumadocs-ui`, `slugify`) e dependências instaladas mas aparentemente não utilizadas.

O projeto está em um estágio intermediário de desenvolvimento — a base visual e conceitual é sólida, mas a engenharia de dados e a tipagem precisam de atenção antes que o sistema cresça.

## Pontos Fortes

- Identidade visual ficcional muito consistente: papéis timbrados, selos, assinaturas digitais e texturas criam uma imersão diegética forte
- Componentes de "papelaria" (Paper, SectionPaper, PaperHeader, StampRepAurora, etc.) são reutilizáveis e bem abstraídos
- Separação clara entre `data/` (dados estáticos) e `components/individual-layouts/` (apresentação)
- Uso de Zustand com persistência para auth e language store é adequado e enxuto
- Sistema de lazy loading simulado (FileLoading) para documentos cria boa experiência narrativa
- Navegação de documentos com transições (slide animation) é um toque polido
- Server Components vs Client Components razoavelmente separados nos layouts de rota

## individual-layouts/ e data/ — Análise Detalhada

### Estrutura dos JSONs

**Duplicação e Formatação Inconsistente**

Os dados de avaliação escolar (`school-final-evaluations/*.ts`) sofrem de duplicação severa entre três estruturas:

| Campo | `energyComponentValues` | `tablePowerValues` | `physicalComponentValues` |
|-------|------------------------|-------------------|--------------------------|
| totalEnergy | 502541 (raw) | 502541 (raw) | — |
| energyControl | 0.98 (decimal) | 98 (inteiro) | — |
| speedManipulation | 0.95 (decimal) | 95 (inteiro) | — |
| mediumAffinity | 0.857 (calculado) | 85 (calculado) | — |
| strength/durability/etc | — | duplicado de physical | 95 (raw) |

O campo `mediumAffinity` existe em *três* formas: (1) derivável de `affinities.{chakra,mana,spectral}`, (2) pré-calculado como decimal em `energyComponentValues`, e (3) pré-calculado como inteiro percentual em `tablePowerValues`. Isso é um sinal claro de que o JSON foi moldado para servir à UI em vez de representar dados naturais.

**Ausência Total de Tipagem**

Todos os dados em `data/` são objetos TypeScript anônimos — não há uma única interface ou type definindo a estrutura de `ProfileId`, `SchoolFinalEvaluation`, ou `Permissions`. Todos os componentes consomem esses dados via `individual: any`. Isso significa que:
- Renomear um campo exige busca manual em todo o código
- Não há autocomplete ou verificação em tempo de compilação
- Erros de digitação como `survivanceAndFirstAid` (grafia não padrão) passam despercebidos

**Campos Misturando Domínio e UI**

O campo `isHighSecurity` aparece nos dados como um valor de domínio, mas aciona flags de redação e selos visuais. Seria mais limpo ter um campo de domínio (ex: `clearanceLevel: "ultra-confidential"`) e deixar a UI decidir como renderizar. O mesmo vale para `redactRealName`, `redactBirthDate`, `redactResidence`, etc. — são flags de UI embutidas nos dados.

### Documento de Avaliação — Cálculos do Sistema de Poder

**Cálculos Distribuídos por 7 Componentes**

A lógica de avaliação de poder está espalhada em:

1. `school-final-evaluation-doc.tsx` — `calcMediumAffinity()` e `calcMediumAffinityToPercent()` inline (linhas 38-58)
2. `table-energy.tsx` — `subtotal()` inline com multiplicação dos 4 atributos x peso 0.5 (linhas 36-44)
3. `table-physical.tsx` — `mediumValue` e `subtotal()` inline (média dos 4 atributos x 100 x 0.5) (linhas 36-44)
4. `total-power-base.tsx` — `totalBasePower()` inline, **duplicando a lógica** dos dois componentes acima (linhas 6-29)
5. `table-power-attributes.tsx` — `subtotal()` inline (soma simples de 8 atributos) (linhas 43-54)
6. `table-additional-test.tsx` — `subtotal()` inline (soma simples de 4 atributos) (linhas 34-41)
7. `tier-total-score.tsx` — `totalScore()` e `getTier()` inline (linhas 45-59)

**Fluxo de Cálculo Atual (disperso):**

```
affinities (chakra, mana, spectral)  ──calcMediumAffinity()──▶  energyComponentValues.mediumAffinity
energyComponentValues (raw)           ──TableEnergy.subtotal()──▶  subtotal energético
physicalComponentValues (raw)         ──TablePhysical.subtotal()──▶ subtotal físico
                                                                   ↓
                                     total-power-base.tsx ────▶  Total Poder Base + alerta 200K
                                                                   ↓
          ┌── avaliarEnergia() ──▶ nota 0-100 ──┐
energy ───┤                                      ├── tablePowerAttributes.subtotal() ──┐
          └── (energyControl, speed, affinity) ──┘                                        │
physical ────────────────────────────────────────────────────────────────────────────────┤
additional tests ───────────────────────────────────────────────────────────────────────┤
                                                                                        ↓
                                                                  tier-total-score.tsx ──▶ Tier S-F
```

**Sugestão de Separação:**

Criar uma camada de lógica isolada em `lib/power-system/`:

```
lib/power-system/
├── types.ts              # interfaces para todos os dados brutos e intermediários
├── calculator.ts         # funções puras: calcBasePower(), calcTierScore(), getTier()
├── energy.ts             # energy-calculator.ts já existe (pode ficar ou ser movido)
├── affinity.ts           # calcMediumAffinity() e derivados
└── constants.ts          # thresholds, pesos, faixas de energia
```

Os componentes passariam a receber dados brutos tipados e chamariam funções puras dos módulos acima, em vez de conter a lógica inline.

### Duplicação e Oportunidades de Abstração

**Tabelas com muita repetição visual**: `table-energy.tsx`, `table-physical.tsx`, `table-power-attributes.tsx`, `table-additional-test.tsx` e `table-affinities.tsx` compartilham ~90% do markup (Table > TableHeader > TableRow > TableCell > TableFooter). Cada uma difere apenas no número de linhas, nos labels, e na lógica de subtotal. Poderiam compartilhar um componente base `DataTable` que recebe configuração:

```tsx
<DataTable
  title="COMPONENTE ENERGÉTICO"
  weight={0.5}
  rows={[
    { label: "Energia Total", value: energy.totalEnergy, warning: 300000 },
    { label: "Controle", value: energy.energyControl, format: "percent" },
  ]}
  subtotal={computedValue}
/>
```

**Isso não destruiria a identidade visual** — o layout visual (cores, bordas, texturas) viria do componente base. Cada tabela continuaria tendo seu conteúdo único via configuração.

**Estruturas de documento duplicadas**: `profile-id.tsx`, `school-final-evaluation-doc.tsx` e `permit-card.tsx` compartilham os mesmos wrappers (Paper > PaperHeader > PaperSubject > SectionPaper > ...), mas cada um monta seu conteúdo interno de forma única. Isso é esperado e desejável — a abstração já existe nos componentes de papelaria.

**Layouts de personagem**: `ultimate-layout.tsx`, `diana-watson-layout.tsx` e `kendra-connors-layout.tsx` são virtualmente idênticos — cada um faz um switch manual importando dados específicos. Poderiam ser substituídos por um mapper centralizado:

```ts
const individualDataMap = {
  "Ultimate": {
    profile: ultimateProfileId,
    "school-final-evaluation": ultimateSchoolFinalEvaluationData,
    "permit-card": ultimatePermissions,
  },
  ...
};
```

Isso reduziria 3 arquivos de layout para 1, centralizaria os imports de dados e eliminaria a repetição.

### Estratégia para Markdown/MDX (futuro)

**Conteúdo narrativo identificado:**

- `profile-id.tsx`: `name`, `occupation`, `birthPlace` — todos strings curtas, OK como dados estruturados
- `school-final-evaluation-doc.tsx`: `institute`, `examiners` — strings curtas
- Dados do tipo dossier (`utils/dossier.ts`): `CharacterDossier` contém múltiplos campos de texto longo — `description`, `analysis`, `recommendations`, `finalNotes.analysis`, etc. — natural candidato a MDX

**Nenhum campo de texto longo existe hoje nos JSONs de personagem** — todo o conteúdo é estruturado e tabular. A necessidade de MDX surgiria com:

1. Dossiês psicológicos completos (`CharacterDossier`)
2. Descrições narrativas de poderes (histórico, origem lendária)
3. Relatórios de missão com prosa
4. Conteúdo de "Biblioteca Pública" (textos históricos do universo)

**Arquitetura sugerida:**

```
data/
├── individuals/           # JSONs estruturados (como hoje)
│   ├── ultimate/
│   │   ├── profile-id.ts
│   │   ├── school-evaluation.ts
│   │   └── permissions.ts
│   └── ...
├── dossiers/              # MDX para conteúdo narrativo longo
│   ├── ultimate/
│   │   ├── psychological-profile.mdx
│   │   └── incident-report-001.mdx
│   └── ...
└── content/               # MDX para páginas públicas
    ├── historia-de-arcanum.mdx
    └── biblioteca/
```

**Estratégia de migração gradual:**

1. Criar loader MDX unificado em `lib/content-loader.ts` que aceita `id` + `type` e retorna conteúdo renderizado OU dados estruturados
2. Nos components de layout, tentar carregar `.mdx` primeiro; se não existir, fallback para dados JSON
3. Componente `MarkdownRenderer` atual — frágil e inseguro (`dangerouslySetInnerHTML`) — deve ser substituído por um parser robusto (remark/rehype) ou MDX nativo do Next.js quando a migração começar
4. Não há necessidade iminente de refatorar os layouts de documentos de avaliação/perfil para MDX — eles são fundamentalmente dados tabulares. A migração MDX faz sentido apenas para os blocos de texto narrativo que ainda não existem no projeto

**Pontos de mudança mapeados para o futuro:**
- `components/mdx-custom-components.tsx` — já preparado, mas importa de `fumadocs-ui/mdx` que não está em package.json
- `components/mdx-with-layout.tsx` — arquitetura de dynamic layout loading pronta, mas as pages que usariam isso não existem
- `Heading` component (`components/mdx/heading.tsx`) — importa `slugify` que não está em package.json

## Pontos de Melhoria Gerais

### Crítico (deve ser resolvido)

- **Dados sem tipagem (`any` em toda camada de dados)**: Nenhum JSON em `data/` tem interface TypeScript. Os componentes de layout usam `individual: any`. O `Individual` interface em `utils/government-data.ts` tem `[key: string]: any`. → Criar interfaces para `ProfileIdData`, `SchoolEvaluationData`, `PermissionCardData` e tipar todos os consumidores. Remover o index signature do `Individual`.

- **Cálculos duplicados e dispersos do sistema de poder**: A mesma lógica de `totalBasePower` é calculada em `table-energy.tsx`, `table-physical.tsx` e novamente em `total-power-base.tsx` com resultados divergentes (o `mediumAffinity` usado em cada local pode ser diferente devido a arredondamentos). → Centralizar toda a lógica de cálculo em `lib/power-system/calculator.ts` com funções puras e testáveis.

- **Dependências ausentes usadas em produção**: `fumadocs-ui` (importado em `mdx-custom-components.tsx`) e `slugify` (importado em `components/mdx/heading.tsx`) não estão em `package.json`. → Adicionar ou remover os imports.

- **Valores pré-calculados nos JSONs**: `tablePowerValues.mediumAffinity` e `energyComponentValues.mediumAffinity` são derivados de `affinities` mas armazenados como dados brutos. → Remover campos derivados dos JSONs; calcular no runtime ou memoizar.

### Importante (alta prioridade)

- **Duplicação de layouts de personagem**: `ultimate-layout.tsx`, `diana-watson-layout.tsx` e `kendra-connors-layout.tsx` têm a mesma estrutura switch-case. → Substituir por um mapper centralizado em `data/individuals.ts` ou um único `IndividualLayout` componente.

- **Flags de UI nos dados**: `redactRealName`, `redactBirthDate`, `redactResidence` em `personalInfoData`, e `isHighSecurity` misturam lógica de apresentação com dados de domínio. → Separar: dados devem conter `clearanceLevel`, e a UI decide regras de redação.

- **Arquivo duplicado leftover**: `components/government-dashboard copy.tsx` (534 linhas) — aparentemente uma versão anterior mantida por engano.

- **`page.tsx` raiz inteiramente Client Component**: A página inicial (login) não precisa ser toda client-side. O `LoginScreen` e `GovernmentLoginModal` são naturalmente clientes, mas o wrapper poderia ser Server Component.

- **`recharts@2.15.4` com React 19**: Recharts 2.x não foi oficialmente testado com React 19. Pode haver warnings de `findDOMNode` e problemas em Strict Mode. Considerar atualizar para recharts 3.x beta ou monitorar.

- **`utils/dossier.ts` enorme (593 linhas)**: A interface `CharacterDossier` e seu template vazio ocupam um arquivo que não é importado por nenhum outro arquivo no projeto (aparentemente código preparado para uso futuro). → Mover para `data/dossier/` ou remover até ser necessário.

### Sugerido (nice to have)

- **53 componentes shadcn/ui, muitos não utilizados**: `Avatar`, `AspectRatio`, `Breadcrumb`, `ButtonGroup`, `Calendar`, `Carousel`, `Chart`, `Checkbox`, `ContextMenu`, `Empty`, `Field`, `Form`, `HoverCard`, `InputOTP`, `Kbd`, `Menubar`, `NavigationMenu`, `Pagination`, `Progress`, `RadioGroup`, `Resizable`, `Select`, `Slider`, `Spinner`, `Switch`, `Tabs`, `Textarea`, `Toggle`, `ToggleGroup` — embora mantenha-se o ecossistema shadcn, seria bom auditar quais são efetivamente usados.

- **Duas bibliotecas de ícones**: `@phosphor-icons/react` e `lucide-react`. Ambas são usadas, mas há sobreposição. Considerar padronizar.

- **`date-fns` instalado mas não usado**: Todos os formatos de data usam `NexusFormatDate` customizado. `date-fns` pode ser removido.

- **`sonner` instalado mas não usado**: Biblioteca de toasts. Remover ou implementar.

- **`react-hook-form` + `@hookform/resolvers` instalados mas sem `useForm()` em lugar nenhum**: Parecem ter sido instalados para formulários futuros.

- **`utils/menu-translations.ts`** — arquivo não lido, mas pode estar subutilizado.

- **Rotas `/public/[section]` e `/public-dashboard/` vazias**: A UI pública existe (`home-screen.tsx` seção pública) mas as rotas de destino não têm conteúdo.

- **`next/image` não usado em nenhum lugar**: Para um site que pode ter imagens de personagens, vale considerar otimização de imagens.

## Dependências a Revisar

| Dependência | Status | Ação Sugerida |
|---|---|---|
| `fumadocs-ui` | **Usada mas não instalada** | Adicionar ao package.json |
| `slugify` | **Usada mas não instalada** | Adicionar ao package.json |
| `date-fns` | Instalada, não usada | Remover |
| `sonner` | Instalada, não usada | Remover ou implementar |
| `react-hook-form` | Instalada, não usada | Remover (não há formulários no momento) |
| `@hookform/resolvers` | Instalada, não usada | Remover |
| `recharts@2.15.4` | Instalada e usada | Monitorar compatibilidade React 19; considerar v3 |
| `@radix-ui/react-avatar` | Instalada (wrapper shadcn existe), não usada | Remover wrapper ou manter (ecossistema shadcn) |
| `@radix-ui/react-aspect-ratio` | Instalada (wrapper shadcn existe), não usada | Remover wrapper ou manter |
| `@phosphor-icons/react` | Instalada e usada | OK (ícones ativos) |
| `lucide-react` | Instalada e usada | OK (ícones ativos) |

## Próximos Passos Recomendados

1. **Tipar todos os dados em `data/`** — criar interfaces em `utils/government-data.ts` (ou `utils/types-data.ts`) para `ProfileIdData`, `SchoolEvaluationData`, `PermissionCardData`. Substituir todo `any` nos componentes.

2. **Centralizar cálculos do sistema de poder** — criar `lib/power-system/` com módulos de cálculo puros; remover lógica inline dos componentes de tabela.

3. **Resolver dependências faltantes** — adicionar `fumadocs-ui` e `slugify` ao `package.json`, ou remover os imports se não forem essenciais.

4. **Eliminar valores duplicados/derivados dos JSONs** — remover `tablePowerValues` e `energyComponentValues.mediumAffinity`; calcular no runtime sob demanda.

5. **Unificar layouts de personagem** — substituir 3 arquivos de layout por 1 mapper centralizado.

6. **Remover arquivo duplicado** — deletar `components/government-dashboard copy.tsx`.

7. **Separar flags de UI dos dados** — substituir `isHighSecurity` por `clearanceLevel` e eliminar `redact*` flags.

8. **Avaliar necessidade de cada dependência** — remover `date-fns`, `sonner`, `react-hook-form`, `@hookform/resolvers` se não forem usar; ou mantê-las se há planos concretos.
