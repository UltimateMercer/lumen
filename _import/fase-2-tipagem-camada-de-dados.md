# Fase 2 — Tipagem da Camada de Dados

## Interfaces Criadas (`types/character-data.ts`)

| Interface | Campos principais | Observação |
|-----------|-------------------|------------|
| `ResponsibleSignature` | department, name, registry, signature, timestamp | Reutilizada em 3 tipos |
| `MentorData` | department?, name?, registry?, signature?, timestamp? | Todos opcionais — `mentor` pode ser `{}` vazio |
| `ProfileIdData` | name, knownAs, birthDate, ..., responsibleSignaturesData, isHighSecurity? | `isHighSecurity` opcional (só Ultimate tem) |
| `PermissionsData` | id, registryName, age, birthDate, licenseStartDate, tier, mentor, responsibleSignatures | |
| `Affinities` | chakra, mana, spectral | |
| `EnergyComponentValues` | totalEnergy, energyControl, speedManipulation | |
| `PhysicalComponentValues` | strength, physicalSpeed, durability, stamina | |
| `AdditionalTableValues` | survivanceAndFirstAid, strategySkills, teamwork, historyAndGeography | |
| `PersonalInfoData` | registryName, realName, redactRealName, age, birthDate, redactBirthDate, residence, redactResidence | |
| `FinalEvaluationData` | date, institute, examiners, redactExaminers | |
| `SchoolFinalEvaluationData` | registry, personalInfoData, finalEvaluationData, affinities, energyComponentValues, physicalComponentValues, additionalTableValues, responsibleSignaturesData, isHighSecurity? | |

## Arquivos Anotados

### `satisfies ProfileIdData`
- `data/profile-id/ultimate.ts`
- `data/profile-id/diana-watson.ts`
- `data/profile-id/kendra-connors.ts`

### `satisfies PermissionsData`
- `data/permissions/ultimate.ts`
- `data/permissions/diana-watson.ts`

### `satisfies SchoolFinalEvaluationData`
- `data/school-final-evaluations/ultimate.ts`
- `data/school-final-evaluations/diana-watson.ts`
- `data/school-final-evaluations/kendra-connors.ts`
- `data/school-final-evaluations/kira.ts`

## Correções em `utils/government-data.ts`

Removida a index signature `[key: string]: any` (linhas 34–35) da interface `Individual`.
Não havia outras ocorrências de `any` ou index signatures no arquivo.

## Decisões de Tipo

- **`MentorData` com todos os campos opcionais**: Justificado porque `ultimate.ts` tem `mentor: {}` (objeto vazio) enquanto `diana-watson.ts` tem o objeto preenchido. A união dos dois casos exige que todos os campos sejam opcionais.
- **`isHighSecurity` como `boolean?` em todos os tipos**: Justificado porque nem todos os personagens têm o campo (ex: Diana Watson profile-id não tem `isHighSecurity`).
- **Uso de `satisfies` em vez de anotação de tipo na variável**: `satisfies` valida a estrutura sem alargar o tipo inferido, preservando inferência literal para templates que esperam o formato exato.
