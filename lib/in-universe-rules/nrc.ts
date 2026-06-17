// NRC — Número de Registro Civil
//
// Formato completo: XX-AAAA-NNNNNNNN  (ex: NM-1230-28467351)
//   XX        = código da nação (2 letras maiúsculas)
//   AAAA      = ano de nascimento (4 dígitos)
//   NNNNNNNN  = sequência de 8 dígitos
//
// Quando nacionalidade ou ano de nascimento são desconhecidos,
// usa-se "??" para o campo ausente e "????" para o ano ausente,
// mantendo a estrutura XX-AAAA-NNNNNNNN.
//
// Códigos de nações disponíveis:
//   Normandy → NM  | Arken → AK  | Varask → VR | Vohtag → VT
//   Mireth   → MR  | Zephral → ZP | Dravos → DR

export const NATION_CODES = {
  normandy: "NM",
  arken: "AK",
  varask: "VR",
  vohtag: "VT",
  mireth: "MR",
  zephral: "ZP",
  dravos: "DR",
} as const;

export type NationCode = (typeof NATION_CODES)[keyof typeof NATION_CODES];

export interface NRC {
  nationCode: string;
  birthYear: string;
  sequence: string;
}

const NATION_CODE_VALUES = new Set(Object.values(NATION_CODES));
const NATION_KEYS = Object.keys(NATION_CODES) as (keyof typeof NATION_CODES)[];

export function getNationCode(nation: string): NationCode | undefined {
  const key = nation.toLowerCase().replace(/\s+/g, "") as keyof typeof NATION_CODES;
  return NATION_CODES[key];
}

export function generateNRC(
  nationCode: string,
  birthYear: number | string,
  sequence: string,
): string {
  if (!/^[A-Z]{2}$/.test(nationCode)) {
    throw new Error(
      `Código de nação inválido: "${nationCode}". Deve ter exatamente 2 letras maiúsculas.`,
    );
  }
  if (!NATION_CODE_VALUES.has(nationCode as NationCode)) {
    throw new Error(
      `Código de nação desconhecido: "${nationCode}". Use um dos: ${Array.from(NATION_CODE_VALUES).join(", ")}`,
    );
  }
  if (!/^\d{8}$/.test(sequence)) {
    throw new Error(
      `Sequência inválida: "${sequence}". Deve ter exatamente 8 dígitos.`,
    );
  }
  const year = String(birthYear);
  if (!/^\d{4}$/.test(year)) {
    throw new Error(
      `Ano de nascimento inválido: "${birthYear}". Deve ter 4 dígitos.`,
    );
  }
  return `${nationCode}-${year}-${sequence}`;
}

export function generatePartialNRC(
  birthYear: string | undefined,
  sequence: string,
): string {
  if (!/^\d{8}$/.test(sequence)) {
    throw new Error(
      `Sequência inválida: "${sequence}". Deve ter exatamente 8 dígitos.`,
    );
  }
  const nationPart = "??";
  const yearPart = birthYear && /^\d{4}$/.test(birthYear) ? birthYear : "????";
  return `${nationPart}-${yearPart}-${sequence}`;
}

export function parseNRC(nrc: string): NRC | null {
  const match = nrc.match(/^(\?\?|[A-Z]{2})-(\?\?\?\?|\d{4})-(\d{8})$/);
  if (!match) return null;
  return {
    nationCode: match[1],
    birthYear: match[2],
    sequence: match[3],
  };
}
