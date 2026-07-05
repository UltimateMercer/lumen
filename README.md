This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Power System

Power calculation logic is centralized in `lib/power-system/`. The `evaluatePower()`
function computes all subtotals, tiers, and derived values from raw JSON data.
See `ANALYSIS.md` for the full architecture.

## Changelog

<!-- CHANGELOG:START -->

### 04-Jul-2026 — Calendar system — lib/in-universe-rules/calendar.ts
- `lib/in-universe-rules/calendar.ts`: `LumenInstant`, `LumenDate`, `Era`, `Hemisphere`, `Season`, `FormatStyle` types; constants `DAYS_PER_YEAR`, `DAYS_PER_SEASON`, `SEASON_MAP`, `SEASONS_ORDER`, `HEMISPHERE_FULL`
- `vitest.config.ts`: created with `globals: true`
- `package.json`: `"test": "vitest run"` script added

### 02-Jul-2026 — DossierFolder integration
- `components/documents/general-components/ui/dossier-folder.tsx`: criado a partir de `_import/Dossier.standalone.tsx`
- Imports corrigidos para `motion/react`
- `cn()` substituído pelo `@/lib/utils`

### 02-Jul-2026 — Cleanup: _investigation and _import naming docs
- `_investigation/`: 9 arquivos .md de investigação (archive-sidebar-interface, classified-investigation, classified-layout-investigation, contrast-and-layout-investigation, contrast-deep-investigation, incidents-investigation, paper-border-investigation, paper-investigation, profiles-migration-plan, cleanup-inventory)
- `_import/`: 3 arquivos de investigação de naming (NAMING_INVESTIGATION.md, NAMING_INVESTIGATION_SINGLE.md, NAV_INVESTIGATION.md)
- Mantido: `_import/CHANGELOG.md`

[Ver histórico completo →](_import/CHANGELOG.md)
<!-- CHANGELOG:END -->

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
