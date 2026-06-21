import type { ArchiveDocument, DocumentFrontmatter } from "./documents";

// Static raw imports via webpack asset/source — all .mdx files in content/archive/
import decreto0421 from "../../content/archive/examples/decreto-0421.mdx";
import dossieTenenteCorvo from "../../content/archive/examples/dossie-tenente-corvo.mdx";
import dossieMinistraOuroPreto from "../../content/archive/examples/dossie-ministra-ouro-preto.mdx";
import dossieDoutoraHyorin from "../../content/archive/examples/dossie-doutora-hyorin.mdx";
import dossieCidadao0 from "../../content/archive/examples/dossie-cidadao-0.mdx";
import dossieAgenteVeil from "../../content/archive/examples/dossie-agente-veil.mdx";
import memoQuarentena42 from "../../content/archive/examples/memo-quarentena-42.mdx";
import incidenteBruma4 from "../../content/archive/examples/incidente-bruma-iv.mdx";
import transmissaoPassarosDeVidro from "../../content/archive/examples/transmissao-passaros-de-vidro.mdx";
import boletimCensura218704 from "../../content/archive/examples/boletim-censura-2187-04.mdx";
import manifestoPassarosLivres from "../../content/archive/examples/manifesto-passaros-livres.mdx";
import ordemServico7745Iii from "../../content/archive/examples/ordem-servico-7745-iii.mdx";
import relatorioForenseBruma4 from "../../content/archive/examples/relatorio-forense-bruma-iv.mdx";
import logIaInc0414 from "../../content/archive/examples/log-ia-inc-0414.mdx";
import identidadeMinistraOuroPreto from "../../content/archive/examples/identidade-ministra-ouro-preto.mdx";
import procuradoPassarosLivres from "../../content/archive/examples/procurado-passaros-livres.mdx";
import pautaRadioContinental44 from "../../content/archive/examples/pauta-radio-continental-44.mdx";
import laudoNecroscopicoBruma403 from "../../content/archive/examples/laudo-necroscopico-bruma-iv-03.mdx";
import interrogatorioMaranCorvo001 from "../../content/archive/examples/interrogatorio-maran-corvo-001.mdx";
import tribunaBruma4 from "../../content/archive/examples/tribuna-bruma-iv.mdx";
import arquivoBruma4 from "../../content/archive/examples/arquivo-bruma-iv.mdx";
import cartaSevranTal001 from "../../content/archive/examples/carta-sevran-tal-001.mdx";
import cartazOrdemEBruma from "../../content/archive/examples/cartaz-ordem-e-bruma.mdx";
import monitoramentoCorvoCifra3 from "../../content/archive/examples/monitoramento-corvo-cifra3.mdx";
import codexFic01FantasmaCarmesim from "../../content/archive/codex/codex-fic-01-fantasma-carmesim.mdx";
import codexAsc01Ascendente from "../../content/archive/codex/codex-asc-01-ascendente.mdx";
import codexAsc02CarmesimCelestialDivino from "../../content/archive/codex/codex-asc-02-carmesim-celestial-divino.mdx";
import codexAsc03AzulCelestialSupremo from "../../content/archive/codex/codex-asc-03-azul-celestial-supremo.mdx";
import fichaMedicaBruma403 from "../../content/archive/examples/ficha-medica-bruma-iv-paciente-03.mdx";
import projetoRedSuns from "../../content/archive/classified-project/projeto-red-suns.mdx";
import trialSfeUltimate from "../../content/archive/trial/trial-sfe-ultimate.mdx";
import trialProfileIdUltimate from "../../content/archive/trial/trial-profile-id-ultimate.mdx";
import trialPermitCardUltimate from "../../content/archive/trial/trial-permit-card-ultimate.mdx";
import trialProfileIdDianaWatson from "../../content/archive/trial/trial-profile-id-diana-watson.mdx";
import trialSfeDianaWatson from "../../content/archive/trial/trial-sfe-diana-watson.mdx";
import trialPermitCardDianaWatson from "../../content/archive/trial/trial-permit-card-diana-watson.mdx";
import trialProfileIdKendraConnors from "../../content/archive/trial/trial-profile-id-kendra-connors.mdx";
import trialSfeKendraConnors from "../../content/archive/trial/trial-sfe-kendra-connors.mdx";
import trialSfeKira from "../../content/archive/trial/trial-sfe-kira.mdx";

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
  "trial-sfe-ultimate": trialSfeUltimate,
  "trial-profile-id-ultimate": trialProfileIdUltimate,
  "trial-permit-card-ultimate": trialPermitCardUltimate,
  "trial-profile-id-diana-watson": trialProfileIdDianaWatson,
  "trial-sfe-diana-watson": trialSfeDianaWatson,
  "trial-permit-card-diana-watson": trialPermitCardDianaWatson,
  "trial-profile-id-kendra-connors": trialProfileIdKendraConnors,
  "trial-sfe-kendra-connors": trialSfeKendraConnors,
  "trial-sfe-kira": trialSfeKira,
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
