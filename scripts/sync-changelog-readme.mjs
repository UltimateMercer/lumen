import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const CHANGELOG_PATH = join(ROOT, "_import", "CHANGELOG.md");
const README_PATH = join(ROOT, "README.md");
const MAX_ENTRIES = 3;
const MAX_BULLETS = 3;

function parseEntries(content) {
  // Split on `# ` at start of line (each entry begins with `# Title`)
  const blocks = content.split(/\n(?=# )/);
  return blocks
    .map((block) => block.trim())
    .filter((block) => block.startsWith("# ") && block.includes("**Data:**"));
}

function extractTitle(entry) {
  const m = entry.match(/^# (.+)/);
  return m ? m[1].trim() : "—";
}

function extractDate(entry) {
  const m = entry.match(/\*\*Data:\*\*\s*(.+)/);
  return m ? m[1].trim() : "—";
}

function extractBullets(entry) {
  const bullets = [];
  let current = null;
  for (const line of entry.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      // Finalize previous bullet
      if (current !== null && current.trim()) {
        bullets.push(current.trim());
        if (bullets.length >= MAX_BULLETS) break;
      }
      current = trimmed.replace(/^- /, "").trim();
    } else if (current !== null && trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("---")) {
      // Continuation line — append with a space (remove extra indent)
      current += " " + trimmed;
    }
  }
  // Finalize last bullet
  if (current !== null && current.trim() && bullets.length < MAX_BULLETS) {
    bullets.push(current.trim());
  }
  return bullets;
}

function formatSummary(entries) {
  const lines = [];
  for (const entry of entries) {
    const title = extractTitle(entry);
    const date = extractDate(entry);
    const bullets = extractBullets(entry);

    lines.push(`### ${date} — ${title}`);
    for (const b of bullets) {
      lines.push(`- ${b}`);
    }
    lines.push("");
  }
  lines.push(
    `[Ver histórico completo →](${join("_import", "CHANGELOG.md")})`,
  );
  return lines.join("\n");
}

function main() {
  // Read changelog
  const changelog = readFileSync(CHANGELOG_PATH, "utf-8");
  const allEntries = parseEntries(changelog);

  if (allEntries.length === 0) {
    console.error("No entries found in CHANGELOG.md");
    process.exit(1);
  }

  const topEntries = allEntries.slice(0, MAX_ENTRIES);
  const summary = formatSummary(topEntries);

  // Read README
  let readme = readFileSync(README_PATH, "utf-8");

  const START_MARKER = "<!-- CHANGELOG:START -->";
  const END_MARKER = "<!-- CHANGELOG:END -->";

  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf(END_MARKER);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace existing block
    const before = readme.slice(0, startIdx + START_MARKER.length);
    const after = readme.slice(endIdx);
    readme = before + "\n\n" + summary + "\n" + after;
  } else {
    // Add markers in a new section before "## Getting Started"
    const insertPoint = readme.indexOf("\n## Getting Started");
    if (insertPoint === -1) {
      // Fallback: append to end
      readme +=
        "\n\n## Changelog\n\n" +
        START_MARKER +
        "\n\n" +
        summary +
        "\n" +
        END_MARKER +
        "\n";
    } else {
      const before = readme.slice(0, insertPoint);
      const after = readme.slice(insertPoint);
      readme =
        before +
        "\n## Changelog\n\n" +
        START_MARKER +
        "\n\n" +
        summary +
        "\n" +
        END_MARKER +
        "\n" +
        after;
    }
  }

  writeFileSync(README_PATH, readme, "utf-8");
  console.log("README.md updated with latest changelog entries.");
}

main();
