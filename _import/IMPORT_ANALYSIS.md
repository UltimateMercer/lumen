# _import/ — Análise de Material

## Inventário Completo

### Raiz (`_import/`)
| Caminho | Tipo | Descrição |
|---------|------|-----------|
| `ArchiveShell.tsx` | Componente | Layout shell do arquivo (header/footer/navegação) com `@tanstack/react-router` |
| `DigitalSignature.tsx` | Componente | Bloco de assinatura digital estilizado para documentos |
| `MdxComponents.tsx` | Componente | Biblioteca de 30+ componentes injetáveis em MDX (texto redigido, carimbos, transcriptos, etc.) |
| `documents.ts` | Utilitário | Registry de documentos com `import.meta.glob` (Vite), tipos e funções de query |
| `index.ts` | Utilitário | Mapeamento `DocumentType → Componente Template` |

### `document-header/`
| Caminho | Tipo | Descrição |
|---------|------|-----------|
| `DocumentHeader.tsx` | Componente | `ClassificationBar` (faixa colorida de classificação) + `PaperSheet` (container texturizado) |

### `foreign/`
| Caminho | Tipo | Descrição |
|---------|------|-----------|
| `CrestSvg.tsx` | Componente | Gerador SVG de brasão (4 motivos: estrela/folha/onda/coroa) |

### Pastas `*-template/` (25 diretórios)

Cada pasta contém 1 template `.tsx` + pelo menos 1 `.mdx` de conteúdo:

| Pasta | Template | MDX(s) | Tipo de Documento |
|-------|----------|--------|-------------------|
| `ai-log-template/` | `AiLogTemplate.tsx` | `log-ia-inc-0414.mdx` | Log de IA |
| `autopsy-template/` | `AutopsyTemplate.tsx` | `laudo-necroscopico-bruma-iv-03.mdx` | Laudo Necroscópico |
| `batch-template/` | `BatchTemplate.tsx` | `arquivo-bruma-iv.mdx` | Arquivo de Caso (multi-peças) |
| `bounty-template/` | `BountyTemplate.tsx` | `procurado-passaros-livres.mdx` | Procuração/Recompensa |
| `broadcast-template/` | `BroadcastTemplate.tsx` | `pauta-radio-continental-44.mdx` | Pauta de Rádio |
| `bulletin-template/` | `BulletinTemplate.tsx` | `boletim-censura-2187-04.mdx` | Boletim de Censura |
| `classified-project-template/` | `ClassifiedProjectTemplate.tsx` | `projeto-red-suns.mdx` | Projeto Classificado |
| `codex-entry-template/` | `CodexEntryTemplate.tsx` | `codex-asc-01-ascendente.mdx` + 3 outros | Verbete de Codex |
| `decree-template/` | `DecreeTemplate.tsx` | `decreto-0421.mdx` | Decreto |
| `dossier-template/` | `DossierTemplate.tsx` | 5 dossiês (Veil, Cidadão-0, Hyorin, Ouro-Preto, Corvo) | Dossiê |
| `foreign-letter-template/` | `ForeignLetterTemplate.tsx` | `carta-sevran-tal-001.mdx` | Carta Diplomática |
| `forensic-template/` | `ForensicTemplate.tsx` | `relatorio-forense-bruma-iv.mdx` | Relatório Forense |
| `id-card-template/` | `IdCardTemplate.tsx` | `identidade-ministra-ouro-preto.mdx` | Identidade Civil |
| `incident-template/` | `IncidentTemplate.tsx` | `incidente-bruma-iv.mdx` | Relatório de Incidente |
| `interrogation-template/` | `InterrogationTemplate.tsx` | `interrogatorio-maran-corvo-001.mdx` | Auto de Interrogatório |
| `manifesto-template/` | `ManifestoTemplate.tsx` | `manifesto-passaros-livres.mdx` | Manifesto/Panfleto |
| `medical-record-template/` | `MedicalRecordTemplate.tsx` | `ficha-medica-bruma-iv-paciente-03.mdx` | Prontuário Médico |
| `memo-template/` | `MemoTemplate.tsx` | `memo-quarentena-42.mdx` | Memorando Interno |
| `monitored-thread-template/` | `MonitoredThreadTemplate.tsx` | `monitoramento-corvo-cifra3.mdx` | Thread Monitorada |
| `news-template/` | `NewsTemplate.tsx` | `tribuna-bruma-iv.mdx` | Jornal |
| `order-template/` | `OrderTemplate.tsx` | `ordem-servico-7745-iii.mdx` | Ordem de Serviço |
| `propaganda-template/` | `PropagandaTemplate.tsx` | `cartaz-ordem-e-bruma.mdx` | Cartaz de Propaganda |
| `transmission-template/` | `TransmissionTemplate.tsx` | `transmissao-passaros-de-vidro.mdx` | Transmissão Interceptada |

### Vazia
| Pasta | Status |
|-------|--------|
| `batch/` | Vazia (referenciada por `BatchTemplate.tsx` → `./batch/Folder`) |

**Total: 55 arquivos (27 .tsx, 2 .ts, 30 .mdx), 26 diretórios, 1 vazio**

---

## Componentes — Detalhamento

### Padrão dominante (23/27 templates)
A maioria absoluta dos templates segue um padrão idêntico:
- Importam `{ type ArchiveDocument }` de `@/lib/documents`
- Importam `{ RenderMdx }` de `@/components/mdx/MdxComponents`
- Importam `{ ClassificationBar, PaperSheet }` de `./DocumentHeader`
- São **stateless** (zero hooks)
- **Sem "use client"**
- **Sem dependências de roteamento**
- 100% Tailwind CSS via `className` / `cn()`

### Exceções — componentes que fogem do padrão

#### `ArchiveShell.tsx`
- **Importa `{ Link }` de `@tanstack/react-router`** — incompatível com Next.js App Router (usar `next/link`)
- Usa `useEffect` + `useState` para gerar código de sessão
- Sem "use client" (precisa: usa hooks)
- **Problema:** `@/components/theme/ThemeToggle` — verificar se existe no projeto alvo

#### `BatchTemplate.tsx`
- **Único componente com browser APIs**: `window.location.hash`, `window.history.pushState/replaceState`, `window.addEventListener("popstate"`, `"hashchange"`, `"keydown")`
- Usa `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`
- Sem "use client" (precisa: usa hooks + browser APIs)
- Referencia `./batch/Folder` → diretório `batch/` está **vazio** (componente Folder ausente)
- Lógica de navegação por hash → adaptar para Next.js (searchParams ou router)

#### `MdxComponents.tsx`
- Usa `useRef`, `useContext` (precisa de "use client")
- Sem "use client"
- Maior componente da base (~30+ sub-componentes injetáveis)

#### `ClassifiedProjectTemplate.tsx`, `CodexEntryTemplate.tsx`, `MedicalRecordTemplate.tsx`, `MonitoredThreadTemplate.tsx`, `PropagandaTemplate.tsx`
- Importam `{ DocumentFrontmatter }` de `@/lib/documents` (além do `ArchiveDocument` base)
- Importam `{ DigitalSignature }` de `@/components/mdx/DigitalSignature` e/ou `{ Stamp }` de `@/components/mdx/MdxComponents`
- Nada incompatível — apenas mais dependências

#### `DocumentHeader.tsx`
- Importa `CLASSIFICATION_TOKEN` e `DOCUMENT_TYPE_LABEL` de `@/lib/documents`
- Sem dependências problemáticas

#### `CrestSvg.tsx`
- **Zero imports** — SVG puro
- Sem problemas

### Dependências compartilhadas que precisam existir no projeto alvo

| Import Path | Usado por | Observação |
|-------------|-----------|------------|
| `@/lib/documents` | Todos os templates + documents.ts | **Precisa ser criado** (tipos + funções) |
| `@/components/mdx/MdxComponents` | Todos os templates | **Precisa ser criado** ou adaptado do `MdxComponents.tsx` |
| `@/components/mdx/DigitalSignature` | ~5 templates | Precisa existir |
| `@/lib/utils` (função `cn`) | Vários | Já existe no projeto (`lib/utils.ts`) |
| `@tanstack/react-router` | Apenas `ArchiveShell.tsx` | **Incompatível** — substituir por `next/link` |
| `@/components/theme/ThemeToggle` | Apenas `ArchiveShell.tsx` | Verificar existência |

---

## Arquivos MDX — Detalhamento

### Características Gerais
- **Todos os 30 MDX pertencem ao universo Lumen** — nenhum é genérico/exemplo
- **Todos têm frontmatter YAML completo** — nenhum está sem frontmatter
- Frontmatter varia de 9 a 40+ campos dependendo do tipo de documento
- Conteúdo narrativo em português, mescla prosa oficial (relatórios, decretos) com elementos visuais (stamps, redacted, alerts)

### Frontmatter — campos comuns
`type`, `slug`, `title`, `classification`, `date`, `issued_by`, `reference`, `summary`, `tags`

### Frontmatter — campos específicos por tipo
| Tipo | Campos extras |
|------|---------------|
| batch | `seal_color`, `cover_note`, `items`, `editor_notes` |
| bounty | `holder_name`, `alias`, `bounty_amount`, `crimes`, `contact` |
| classified_project | `project_code`, `project_codename`, `project_status`, `oversight`, `directive_origin`, `asset_count`, `recruit_pool`, `success_metric`, `deniability_clause` |
| codex | `designation`, `codex_name`, `codex_class`, `access_level`, `threat_tier`, `autonomy`, `contagion`, `host_required`, `containment_status`, `first_recorded`, `sigil_motif`, `verified_by`, `registry_id` |
| dossier | `subject_name`, `status` |
| foreign_letter | `origin_country`, `origin_country_native`, `origin_authority`, `recipient`, `delivered_via`, `language_code`, `translator`, `seal_motif` |
| id_card | `holder_name`, `holder_id`, `civic_class`, `loyalty_tier`, `issued_on`, `valid_until`, `restrictions`, `biometric_hash`, `photo_status` |
| interrogation | `session_code`, `interrogator`, `interrogated`, `counsel`, `clerk`, `recording`, `duration`, `room`, `status` |
| medical_record | `patient_name`, `patient_id`, `birth_date`, `sex`, `blood_type`, `vitals`, `medications`, `procedures`, `diagnosis` |
| monitored_thread | `operation_code`, `channel`, `monitored_target`, `counterpart`, `analyst`, `capture_window`, `device_fingerprint`, `participants` |
| news | `outlet`, `edition`, `section`, `byline`, `dateline`, `motto`, `approved_by` |
| propaganda | `slogan`, `subtitle`, `campaign_code`, `printer`, `poster_year`, `motif` |

### MDX do Universo Lumen — Notas Especiais

#### `codex-asc-01-ascendente.mdx`
- **Tipo:** Verbete de Codex — classificação técnica de anomalia
- **Conteúdo:** Forma primária de combate Ascendente (ASC-01). Gatilho por colapso emocional intenso (luto, raiva). Converte excesso afetivo em energia bruta com multiplicador ~50×. 3 fases: Ignição, Sustentação, Estabilização.
- **Universo:** Diretamente ligado ao sistema de poder do Lumen (afinidades energéticas, classificação de poder). **Relevante para o sistema de `PowerEvaluationResult` existente no projeto.**

#### `codex-asc-02-carmesim-celestial-divino.mdx`
- **Tipo:** Verbete de Codex
- **Conteúdo:** Forma superior ASC-02, concedida via ritual coletivo por 5 voluntários compatíveis. Não pode ser treinada individualmente. Aura carmesim, dilatação perceptual extrema, ~10× sobre ASC-01 estável. Pré-requisito para ASC-03.
- **Universo:** Continuação direta da linhagem Ascendente.

#### `codex-asc-03-azul-celestial-supremo.mdx`
- **Tipo:** Verbete de Codex
- **Conteúdo:** Forma apical ASC-03 — energia "encarnada" em vez de emprestada. Aura azul-celestial, centenas de × sobre ASC-01. Apenas 3 portadores conhecidos, todos sob vigilância contínua do Conselho. Uso unilateral proibido.
- **Universo:** Corresponde ao topo da hierarquia de poder. Diretamente conectado às fichas de avaliação escolar (personagens "Ultimate" etc.).

#### `codex-fic-01-fantasma-carmesim.mdx`
- **Tipo:** Verbete de Codex
- **Conteúdo:** FIC-01 (Fantasma da Insanidade Carmesim) — constructo psíquico-parasita formado por resíduos psíquicos de Olhos Carmesins/Escarlates. Processo de infecção em 8 estágios. Neutralizado pelo portador original ("Ultimate"), convertido em habilidades em vez de destruído.
- **Universo:** Entidade que o protagonista (Ultimate) enfrentou e neutralizou. **Conexão direta com o personagem de maior poder na base de dados do projeto.**

#### `projeto-red-suns.mdx`
- **Tipo:** Projeto Classificado (black ops)
- **Conteúdo:** Programa RED SUNS — aquisição e condicionamento de órfãos de guerra (5-9 anos) como agentes stealth indistinguíveis infiltrados na sociedade civil. 5 fases: triagem a deployment ativo. Dispositivos de término biométrico, protocolo de negação plausível, protocolo de descarte se parcialmente exposto.
- **Universo:** Operação secreta do Ministério da Continuidade. Recruta órfãos de BRUMA-IV. Conexão com o sistema de vigilância do estado.

### Observações sobre os 5 slugs especiais
- Os 4 codex entries têm **estrutura de frontmatter idêntica** (24 campos cada) — podem usar o mesmo template com variação de dados
- `projeto-red-suns.mdx` tem frontmatter mais extenso (26 campos) e estrutura de seções (sections array no frontmatter)
- Todos os 5 são 100% lore do universo — **nenhum é conteúdo genérico**

---

## Repetição e Oportunidades de Consolidação

### Componentes que fazem essencialmente a mesma coisa

| Grupo | Componentes | Diferença |
|-------|-------------|-----------|
| Templates simples com ClassificationBar + PaperSheet | `AiLogTemplate`, `AutopsyTemplate`, `BountyTemplate`, `BroadcastTemplate`, `BulletinTemplate`, `DecreeTemplate`, `DossierTemplate`, `ForensicTemplate`, `IdCardTemplate`, `IncidentTemplate`, `MemoTemplate`, `OrderTemplate` | Apenas variação no layout interno (grid de metadados + corpo MDX). Poderiam ser unificados em 1-2 templates parametrizáveis. |
| Templates com ClassificationBar + PaperSheet + extras | `ClassifiedProjectTemplate`, `CodexEntryTemplate`, `InterrogationTemplate`, `MedicalRecordTemplate`, `MonitoredThreadTemplate` | Compartilham o mesmo esqueleto mas têm painéis de metadados especializados. Podem permanecer separados ou usar slots. |
| Templates especiais sem ClassificationBar | `ManifestoTemplate`, `NewsTemplate`, `PropagandaTemplate` | Visual radicalmente diferente (sem barra de classificação, estética própria) — devem permanecer separados. |
| Templates de terminal/CRT | `AiLogTemplate`, `TransmissionTemplate` | Ambos usam estética CRT (verde/âmbar). Poderiam compartilhar um `CrtShell` wrapper. |

### Potencial de unificação
- **~13 templates poderiam ser reduzidos para 2-3** usando um `DocumentTemplate` genérico com slots para metadados
- O `DocumentHeader.tsx` (ClassificationBar + PaperSheet) é usado por 20+ templates — **base sólida para reuso**
- `MdxComponents.tsx` já é o maior componente compartilhado — deve ser mantido como está

### Padrões de estrutura MDX
- **Frontmatter altamente consistente** — todos têm `type`, `slug`, `title`, `classification`, `date`, `issued_by`, `reference`, `tags`
- **Inconsistência menor:** `summary` aparece em 28/30 arquivos (falta em `identidade-ministra-ouro-preto.mdx` e `monitoramento-corvo-cifra3.mdx` — verificar se é intencional)
- Conteúdo MDX usa uma linguagem de componentes injetáveis (`<Redacted>`, `<Stamp>`, `<Classified>`, `<Alert>`, `<Transcript>`, etc.) definida em `MdxComponents.tsx` — extremamente consistente entre arquivos

### Duplicação com projeto existente
- `DigitalSignature.tsx` do `_import/` é similar ao `DigitalSignature.tsx` em `components/individual-layouts/general-components/` — **verificar se fazem a mesma coisa**
- `_import/DigitalSignature.tsx` importa apenas `cn` de `@/lib/utils` e renderiza bloco de assinatura; o existente pode ser diferente
- `MdxComponents.tsx` contém componentes injetáveis que **não existem** no projeto atual (Redacted, Stamp, Classified, Transcript, etc.) — será necessário criar

---

## Mapa de Pares template ↔ MDX

| Template | MDX(s) | Pareados? |
|----------|--------|-----------|
| `AiLogTemplate` | `log-ia-inc-0414.mdx` | ✅ 1:1 |
| `AutopsyTemplate` | `laudo-necroscopico-bruma-iv-03.mdx` | ✅ 1:1 |
| `BatchTemplate` | `arquivo-bruma-iv.mdx` | ✅ 1:1 |
| `BountyTemplate` | `procurado-passaros-livres.mdx` | ✅ 1:1 |
| `BroadcastTemplate` | `pauta-radio-continental-44.mdx` | ✅ 1:1 |
| `BulletinTemplate` | `boletim-censura-2187-04.mdx` | ✅ 1:1 |
| `ClassifiedProjectTemplate` | `projeto-red-suns.mdx` | ✅ 1:1 |
| `CodexEntryTemplate` | 4 codex .mdx | ✅ 1:N (N=4) |
| `DecreeTemplate` | `decreto-0421.mdx` | ✅ 1:1 |
| `DossierTemplate` | 5 dossiês .mdx | ✅ 1:N (N=5) |
| `ForeignLetterTemplate` | `carta-sevran-tal-001.mdx` | ✅ 1:1 |
| `ForensicTemplate` | `relatorio-forense-bruma-iv.mdx` | ✅ 1:1 |
| `IdCardTemplate` | `identidade-ministra-ouro-preto.mdx` | ✅ 1:1 |
| `IncidentTemplate` | `incidente-bruma-iv.mdx` | ✅ 1:1 |
| `InterrogationTemplate` | `interrogatorio-maran-corvo-001.mdx` | ✅ 1:1 |
| `ManifestoTemplate` | `manifesto-passaros-livres.mdx` | ✅ 1:1 |
| `MedicalRecordTemplate` | `ficha-medica-bruma-iv-paciente-03.mdx` | ✅ 1:1 |
| `MemoTemplate` | `memo-quarentena-42.mdx` | ✅ 1:1 |
| `MonitoredThreadTemplate` | `monitoramento-corvo-cifra3.mdx` | ✅ 1:1 |
| `NewsTemplate` | `tribuna-bruma-iv.mdx` | ✅ 1:1 |
| `OrderTemplate` | `ordem-servico-7745-iii.mdx` | ✅ 1:1 |
| `PropagandaTemplate` | `cartaz-ordem-e-bruma.mdx` | ✅ 1:1 |
| `TransmissionTemplate` | `transmissao-passaros-de-vidro.mdx` | ✅ 1:1 |
| `DocumentHeader` | (sem MDX) | ⚠️ Componente compartilhado, sem MDX próprio |
| `CrestSvg` | (sem MDX) | ⚠️ Sub-componente, sem MDX próprio |
| `ArchiveShell` | (sem MDX) | ⚠️ Layout, sem MDX próprio |

### Soltos
- `batch/` está VAZIO — `BatchTemplate.tsx` importa `./batch/Folder` que não existe
- Nenhum MDX está órfão; todos os 30 MDX têm um template correspondente

### Estrutura de pastas
- **Bem organizada**: cada tipo de documento em sua própria pasta `*-template/` com template + conteúdo
- Exceções: `document-header/` e `foreign/` são sub-componentes (não templates), faz sentido estarem separados
- Raiz contém os arquivos de orquestração (ArchiveShell, documents.ts, index.ts, MdxComponents)

---

## Problemas de Compatibilidade com Next.js

### Críticos (impedem build)

| # | Arquivo | Problema | Solução |
|---|---------|----------|---------|
| 1 | `documents.ts:14` | `import.meta.glob("/src/content/*.mdx", { eager: true })` — API exclusiva Vite. Next.js não tem equivalente direto; usa MDX loader baseado em sistema de arquivos + `import()` dinâmico ou `fs` | Substituir por registro manual de imports MDX ou usar `next-mdx-remote` com `serialize()` |
| 2 | `documents.ts` | Caminho `/src/content/*.mdx` — o projeto Next.js usa `content/` ou `data/` | Mapear para diretório real de conteúdo |
| 3 | `ArchiveShell.tsx` | `import { Link } from "@tanstack/react-router"` — pacote não instalado, roteador incompatível | Substituir por `import Link from "next/link"` + `usePathname()` do `next/navigation` |
| 4 | `ArchiveShell.tsx` | `@/components/theme/ThemeToggle` — verificar se existe no projeto alvo | Criar ou substituir |

### Médios (requerem "use client" ou adaptação)

| # | Arquivo | Problema | Solução |
|---|---------|----------|---------|
| 5 | `ArchiveShell.tsx` | Usa `useState` + `useEffect` sem `"use client"` | Adicionar `"use client"` |
| 6 | `BatchTemplate.tsx` | Usa hooks + browser APIs sem `"use client"` | Adicionar `"use client"` |
| 7 | `MdxComponents.tsx` | Usa `useRef` + `useContext` sem `"use client"` | Adicionar `"use client"` |
| 8 | `BatchTemplate.tsx` | `window.location.hash`, `window.history.*` — quebram SSR | Envolver em `useEffect` ou usar `next/navigation` searchParams |
| 9 | `BatchTemplate.tsx` | Navegação hash → substituir por rotas Next.js | Usar `useRouter()` + `searchParams` para navegação entre peças |

### Leves (verificação necessária)

| # | Arquivo | Problema |
|---|---------|----------|
| 10 | Todos os templates | Importam `@/lib/documents` — módulo precisa ser criado |
| 11 | Todos os templates | Importam `@/components/mdx/MdxComponents` (`RenderMdx`, `Stamp`, `Redacted`, etc.) — componentes precisam ser criados |
| 12 | `ClassifiedProjectTemplate`, `CodexEntryTemplate`, `InterrogationTemplate`, `MedicalRecordTemplate`, `MonitoredThreadTemplate`, `ForeignLetterTemplate` | Importam `@/components/mdx/DigitalSignature` — precisa existir |
| 13 | `MdxComponents.tsx` | Importa `{ DigitalSignature }` de `"./DigitalSignature"` — resolver caminho no novo contexto |
| 14 | `BatchTemplate.tsx` | Importa `./batch/Folder` — diretório vazio, componente ausente |

### Nulos (sem problemas)
- `CrestSvg.tsx` — zero imports, 100% compatível
- `DigitalSignature.tsx` — apenas `cn()` de `@/lib/utils`
- `DocumentHeader.tsx` — apenas imports de `@/lib/documents` + `cn()`
- Todos os templates que só usam `@/lib/documents` + `@/components/mdx/MdxComponents` (23/27) — compatíveis uma vez que as dependências sejam criadas

---

## Recomendações para Próxima Sessão

### Prioridade 1 — Infraestrutura base
1. **Criar `lib/documents.ts`** no projeto com os tipos `Classification`, `DocumentType`, `DocumentFrontmatter`, `ArchiveDocument` e constantes `DOCUMENT_TYPE_LABEL`, `CLASSIFICATION_TOKEN` (portar de `_import/documents.ts` sem `import.meta.glob`)
2. **Criar `components/mdx/` no projeto** com:
   - `MdxComponents.tsx` — portar os ~30 componentes injetáveis (Redacted, Stamp, Classified, Transcript, etc.)
   - `DigitalSignature.tsx` — portar ou integrar com o existente
3. **Criar `_import/index.ts` adaptado** — mapeamento `DocumentType → Componente`

### Prioridade 2 — Templates principais (sem "use client")
4. **Mover `document-header/DocumentHeader.tsx`** → `components/mdx/DocumentHeader.tsx`
5. **Portar templates "simples" (13×)** — ClassificationBar + PaperSheet + metadados + RenderMdx
6. **Portar templates "especiais"** — ClassifiedProjectTemplate, CodexEntryTemplate, InterrogationTemplate, MedicalRecordTemplate, MonitoredThreadTemplate, ForeignLetterTemplate
7. **Portar templates "sem classificação"** — ManifestoTemplate, NewsTemplate, PropagandaTemplate

### Prioridade 3 — Componentes com "use client"
8. **Adaptar `MdxComponents.tsx`** — adicionar `"use client"` no topo
9. **Adaptar `ArchiveShell.tsx`** — trocar `@tanstack/react-router` por `next/link`, adicionar `"use client"`
10. **Adaptar `BatchTemplate.tsx`** — substituir hash navigation por Next.js searchParams, adicionar `"use client"`

### Prioridade 4 — Conteúdo MDX
11. **Mover todos os 30 MDX** para o diretório de conteúdo do projeto (ex: `content/archive/`)
12. **Verificar componentização** — os MDX usam componentes como `<Redacted>`, `<Stamp>`, `<Transcript>` — garantir que `MdxComponents.tsx` os exporte com os mesmos nomes

### Prioridade 5 — Resolver dangling references
13. **Criar `batch/Folder.tsx`** — referenciado por `BatchTemplate.tsx`, diretório vazio
14. **Verificar `ThemeToggle`** — se não existir no projeto, criar versão mínima ou remover de `ArchiveShell.tsx`

### Nota sobre consolidação
- **Não consolidar templates na primeira sessão.** Portar primeiro, unificar depois.
- Os 13 templates "simples" são candidatos óbvios a unificação futura, mas a prioridade é ter todos funcionando.
