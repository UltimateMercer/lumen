import type { ArchiveDocument, DocumentFrontmatter } from "./documents";

// Static raw imports via webpack asset/source — all .mdx files in _import/
import decreto0421 from "../decree-template/decreto-0421.mdx";
import dossieTenenteCorvo from "../dossier-template/dossie-tenente-corvo.mdx";
import dossieMinistraOuroPreto from "../dossier-template/dossie-ministra-ouro-preto.mdx";
import dossieDoutoraHyorin from "../dossier-template/dossie-doutora-hyorin.mdx";
import dossieCidadao0 from "../dossier-template/dossie-cidadao-0.mdx";
import dossieAgenteVeil from "../dossier-template/dossie-agente-veil.mdx";
import memoQuarentena42 from "../memo-template/memo-quarentena-42.mdx";
import incidenteBruma4 from "../incident-template/incidente-bruma-iv.mdx";
import transmissaoPassarosDeVidro from "../transmission-template/transmissao-passaros-de-vidro.mdx";
import boletimCensura218704 from "../bulletin-template/boletim-censura-2187-04.mdx";
import manifestoPassarosLivres from "../manifesto-template/manifesto-passaros-livres.mdx";
import ordemServico7745Iii from "../order-template/ordem-servico-7745-iii.mdx";
import relatorioForenseBruma4 from "../forensic-template/relatorio-forense-bruma-iv.mdx";
import logIaInc0414 from "../ai-log-template/log-ia-inc-0414.mdx";
import identidadeMinistraOuroPreto from "../id-card-template/identidade-ministra-ouro-preto.mdx";
import procuradoPassarosLivres from "../bounty-template/procurado-passaros-livres.mdx";
import pautaRadioContinental44 from "../broadcast-template/pauta-radio-continental-44.mdx";
import laudoNecroscopicoBruma403 from "../autopsy-template/laudo-necroscopico-bruma-iv-03.mdx";
import interrogatorioMaranCorvo001 from "../interrogation-template/interrogatorio-maran-corvo-001.mdx";
import tribunaBruma4 from "../news-template/tribuna-bruma-iv.mdx";
import arquivoBruma4 from "../batch-template/arquivo-bruma-iv.mdx";
import cartaSevranTal001 from "../foreign-letter-template/carta-sevran-tal-001.mdx";
import cartazOrdemEBruma from "../propaganda-template/cartaz-ordem-e-bruma.mdx";
import monitoramentoCorvoCifra3 from "../monitored-thread-template/monitoramento-corvo-cifra3.mdx";
import codexFic01FantasmaCarmesim from "../codex-entry-template/codex-fic-01-fantasma-carmesim.mdx";
import codexAsc01Ascendente from "../codex-entry-template/codex-asc-01-ascendente.mdx";
import codexAsc02CarmesimCelestialDivino from "../codex-entry-template/codex-asc-02-carmesim-celestial-divino.mdx";
import codexAsc03AzulCelestialSupremo from "../codex-entry-template/codex-asc-03-azul-celestial-supremo.mdx";
import fichaMedicaBruma403 from "../medical-record-template/ficha-medica-bruma-iv-paciente-03.mdx";
import projetoRedSuns from "../classified-project-template/projeto-red-suns.mdx";

const RAW: Record<string, string> = {
  "decreto-0421": decreto0421,
  "dossie-tenente-corvo": dossieTenenteCorvo,
  "dossie-ministra-ouro-preto": dossieMinistraOuroPreto,
  "dossie-doutora-hyorin": dossieDoutoraHyorin,
  "dossie-cidadao-0": dossieCidadao0,
  "dossie-agente-veil": dossieAgenteVeil,
  "memo-quarentena-42": memoQuarentena42,
  "incidente-bruma-iv": incidenteBruma4,
  "transmissao-passaros-de-vidro": transmissaoPassarosDeVidro,
  "boletim-censura-2187-04": boletimCensura218704,
  "manifesto-passaros-livres": manifestoPassarosLivres,
  "ordem-servico-7745-iii": ordemServico7745Iii,
  "relatorio-forense-bruma-iv": relatorioForenseBruma4,
  "log-ia-inc-0414": logIaInc0414,
  "identidade-ministra-ouro-preto": identidadeMinistraOuroPreto,
  "procurado-passaros-livres": procuradoPassarosLivres,
  "pauta-radio-continental-44": pautaRadioContinental44,
  "laudo-necroscopico-bruma-iv-03": laudoNecroscopicoBruma403,
  "interrogatorio-maran-corvo-001": interrogatorioMaranCorvo001,
  "tribuna-bruma-iv": tribunaBruma4,
  "arquivo-bruma-iv": arquivoBruma4,
  "carta-sevran-tal-001": cartaSevranTal001,
  "cartaz-ordem-e-bruma": cartazOrdemEBruma,
  "monitoramento-corvo-cifra3": monitoramentoCorvoCifra3,
  "codex-fic-01-fantasma-carmesim": codexFic01FantasmaCarmesim,
  "codex-asc-01-ascendente": codexAsc01Ascendente,
  "codex-asc-02-carmesim-celestial-divino": codexAsc02CarmesimCelestialDivino,
  "codex-asc-03-azul-celestial-supremo": codexAsc03AzulCelestialSupremo,
  "ficha-medica-bruma-iv-paciente-03": fichaMedicaBruma403,
  "projeto-red-suns": projetoRedSuns,
};

function parseValue(val: string): unknown {
  try { return JSON.parse(val); }
  catch { return val; }
}

function parseInlineItem(str: string): Record<string, unknown> | null {
  const s = str.trim();
  try { return JSON.parse("{" + s + "}"); } catch {}
  const fixed = s.replace(/(^|[{,]\s*)([-\w]+)(\s*:)/g, '$1"$2"$3');
  try { return JSON.parse("{" + fixed + "}"); } catch { return null; }
}

function parseFrontmatter(raw: string): { frontmatter: DocumentFrontmatter; mdx: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter block");

  const fmLines = match[1].split("\n");
  const fm: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentList: unknown[] | null = null;
  let currentItem: Record<string, unknown> | null = null;

  for (const rawLine of fmLines) {
    const line = rawLine.trimEnd();

    // blank lines inside a list = end of list
    if (line === "" && currentList !== null) {
      if (currentKey) fm[currentKey] = currentList;
      currentKey = null; currentList = null; currentItem = null;
      continue;
    }

    // top-level key:value
    const top = line.match(/^([-\w]+):\s*(.*)$/);
    if (top && line[0] !== " " && line[0] !== "-") {
      if (currentKey && currentList !== null) fm[currentKey] = currentList;
      currentKey = top[1];
      const val = top[2].trim();
      currentList = null;
      currentItem = null;
      if (val === "" || val === "|" || val === ">") continue; // list / literal block
      try { fm[currentKey] = JSON.parse(val); }
      catch { fm[currentKey] = val; }
      currentKey = null;
      continue;
    }

    // YAML list item — inline object `  - { key: val, ... }`
    const inlineItem = line.match(/^\s+-\s+\{(.+)\}\s*$/);
    if (inlineItem && currentKey) {
      if (currentList === null) currentList = [];
      const parsed = parseInlineItem(inlineItem[1]);
      if (parsed) currentList.push(parsed);
      currentItem = null;
      continue;
    }

    // YAML list item — `  - key: value` (start of multi-line item)
    const itemStart = line.match(/^\s+-\s+([-\w]+):\s*(.*)$/);
    if (itemStart && currentKey) {
      if (currentList === null) currentList = [];
      currentItem = {};
      currentList.push(currentItem);
      const v = itemStart[2].trim();
      if (v !== "") currentItem[itemStart[1]] = parseValue(v);
      continue;
    }

    // continuation of previous list item: `    key: value`
    const cont = line.match(/^\s{4,}([-\w]+):\s*(.*)$/);
    if (cont && currentList && currentItem) {
      const v = cont[2].trim();
      if (v !== "") currentItem[cont[1]] = parseValue(v);
    }
  }

  if (currentKey && currentList !== null) fm[currentKey] = currentList;

  return {
    frontmatter: fm as unknown as DocumentFrontmatter,
    mdx: match[2],
  };
}

const DOCS = new Map<string, ArchiveDocument>();

for (const [slug, raw] of Object.entries(RAW)) {
  const { frontmatter, mdx } = parseFrontmatter(raw);
  DOCS.set(slug, { frontmatter: { ...frontmatter, slug }, mdx });
}

export function getAllSlugs(): string[] {
  return Array.from(DOCS.keys());
}

export function getAllDocuments(): ArchiveDocument[] {
  return Array.from(DOCS.values()).sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getDocument(slug: string): ArchiveDocument | undefined {
  return DOCS.get(slug);
}

export function getBatchItems(
  fm: DocumentFrontmatter,
): Array<{ slug: string; role?: string; note?: string; doc?: ArchiveDocument }> {
  if (!fm.items) return [];
  return fm.items.map((it) => ({ ...it, doc: DOCS.get(it.slug) }));
}
