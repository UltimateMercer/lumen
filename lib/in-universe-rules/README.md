# NRC — Número de Registro Civil

## Propósito Diegético

O NRC (Número de Registro Civil) é o documento primário de identificação civil
no universo de Lumen. Ele acompanha todo cidadão registrado desde o nascimento
e é utilizado em todos os documentos oficiais: identidade, permissões, avaliações
escolares, fichas militares, entre outros.

O NRC é emitido pelo Departamento de Registros e Cidadania (DRC) de cada nação
e segue um formato padronizado internacionalmente para permitir interoperabilidade
entre os sistemas civis das diferentes nações.

## Formato

```
XX-AAAA-NNNNNNNN
```

| Parte | Descrição | Exemplo |
|-------|-----------|---------|
| `XX` | Código da nação (2 letras maiúsculas) | `NM` |
| `AAAA` | Ano de nascimento (4 dígitos) | `1230` |
| `NNNNNNNN` | Sequência única de 8 dígitos | `28467351` |

## Códigos de Nações

| Nação | Código |
|-------|--------|
| Normandy | `NM` |
| Arken | `AK` |
| Varask | `VR` |
| Vohtag | `VT` |
| Mireth | `MR` |
| Zephral | `ZP` |
| Dravos | `DR` |

## NRC Parcial

Quando a nacionalidade e/ou o ano de nascimento de um indivíduo são
desconhecidos (órfãos, apátridas, registros perdidos), o NRC é emitido com
valores placeholder:

- `??` no lugar do código da nação
- `????` no lugar do ano de nascimento

Exemplo: `??-????-90814563`

A estrutura `XX-AAAA-NNNNNNNN` é sempre mantida.

## Exemplos

```ts
import { generateNRC, generatePartialNRC, parseNRC } from "@/lib/in-universe-rules/nrc";

// Completo
generateNRC("NM", 1230, "28467351");
// → "NM-1230-28467351"

// Parcial (nacionalidade desconhecida)
generatePartialNRC("1229", "90814563");
// → "??-1229-90814563"

// Parcial (nacionalidade e ano desconhecidos)
generatePartialNRC(undefined, "90814563");
// → "??-????-90814563"

// Parse
parseNRC("NM-1230-28467351");
// → { nationCode: "NM", birthYear: "1230", sequence: "28467351" }

parseNRC("??-1229-90814563");
// → { nationCode: "??", birthYear: "1229", sequence: "90814563" }
```
