import fs from "fs";
import path from "path";
import type { ArchiveDocument, DocumentFrontmatter } from "./documents";

const TEMPLATE_DIRS = [
  "decree-template", "dossier-template", "memo-template",
  "incident-template", "transmission-template", "bulletin-template",
  "manifesto-template", "order-template", "forensic-template",
  "ai-log-template", "id-card-template", "bounty-template",
  "broadcast-template", "autopsy-template", "interrogation-template",
  "news-template", "batch-template", "foreign-letter-template",
  "propaganda-template", "monitored-thread-template",
  "codex-entry-template", "medical-record-template",
  "classified-project-template",
];

const IMPORT_DIR = path.resolve(process.cwd(), "_import");
const MDX_CACHE: Map<string, ArchiveDocument> = new Map();
let INITIALIZED = false;

function parseFrontmatter(raw: string): { frontmatter: DocumentFrontmatter; mdx: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter block");

  const fmLines = match[1].split("\n");
  const fm: Record<string, unknown> = {};
  for (const line of fmLines) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const val = line.slice(sep + 1).trim();
    try {
      fm[key] = JSON.parse(val);
    } catch {
      fm[key] = val;
    }
  }
  return {
    frontmatter: fm as unknown as DocumentFrontmatter,
    mdx: match[2],
  };
}

function initCache(): void {
  if (INITIALIZED) return;
  INITIALIZED = true;

  for (const dir of TEMPLATE_DIRS) {
    const dirPath = path.join(IMPORT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const slug = file.replace(/\.mdx$/, "");
      const { frontmatter, mdx } = parseFrontmatter(raw);
      MDX_CACHE.set(slug, { frontmatter: { ...frontmatter, slug }, mdx });
    }
  }
}

export function getAllSlugs(): string[] {
  initCache();
  return Array.from(MDX_CACHE.keys());
}

export function getAllDocuments(): ArchiveDocument[] {
  initCache();
  return Array.from(MDX_CACHE.values()).sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getDocument(slug: string): ArchiveDocument | undefined {
  initCache();
  return MDX_CACHE.get(slug);
}

export function getBatchItems(
  fm: DocumentFrontmatter,
): Array<{ slug: string; role?: string; note?: string; doc?: ArchiveDocument }> {
  if (!fm.items) return [];
  return fm.items.map((it) => ({ ...it, doc: MDX_CACHE.get(it.slug) }));
}
