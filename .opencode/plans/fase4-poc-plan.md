# Fase 4 PoC — Plano aprovado

## Tarefas
1. Adicionar `"trial-school-final-evaluation"` ao union `DocumentType` + `DOCUMENT_TYPE_LABEL`
2. Criar `components/documents/templates/trial/TrialSchoolFinalEvaluation.tsx` (visual idêntico ao `school-final-evaluation.tsx`, dados via frontmatter)
3. Registrar template em `components/documents/index.ts`
4. Criar `content/archive/trial/trial-sfe-ultimate.mdx` com dados de Ultimate
5. Registrar MDX em `lib/archive/registry.ts`
6. Adicionar aba "Trial MDX" em `app/archive/page.tsx`
7. `tsc --noEmit`, AGENTS.md, CHANGELOG.md, commit
