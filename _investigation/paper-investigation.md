# Investigação — Paper vs PaperSheet

## 1. Componente Paper (original, manual)

**Arquivo:** `components/documents/general-components/paper/paper.tsx`

```tsx
export const Paper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="border dark:border-[#eaeaea] border-[#252525] bg-[#eaeaea] dark:bg-[#252525] p-6 max-w-3xl mx-auto">
      {children}
    </div>
  );
};
```

- Sem `"use client"`
- Cores hardcoded (sem CSS variables)
- Padding `p-6`
- Usa `max-w-3xl mx-auto` para centralizar
- Sem textura de papel, sem sombra, sem noise overlay

---

## 2. Componente PaperSheet (Lovable)

**Arquivo:** `components/documents/general-components/paper/paper-sheet.tsx`

```tsx
"use client";

export function PaperSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-texture relative mx-auto max-w-3xl border border-paper-muted/40 p-10 shadow-[0_24px_64px_-32px_oklch(0_0_0/0.6)] md:p-14">
      {children}
    </div>
  );
}
```

- Com `"use client"`
- Usa a classe `.paper-texture` (background + noise via CSS)
- Borda via `--paper-muted`
- Sombra generosa: `0_24px_64px_-32px_oklch(0_0_0/0.6)`
- Padding responsivo: `p-10` / `md:p-14`
- Também centralizado com `max-w-3xl mx-auto`

---

## 3. Classe `.paper-texture` e variáveis `--paper` no globals.css

**Arquivo:** `app/globals.css`

### Light mode (`:root`, linhas 120-147)

```css
--paper: oklch(0.96 0.02 85);
--paper-foreground: oklch(0.18 0.03 50);
--paper-muted: oklch(0.45 0.04 60);
--paper-noise-opacity: 0.10;
```

### Dark mode (`.dark`, linhas 182-206)

```css
--paper: oklch(0.91 0.025 85);
--paper-foreground: oklch(0.20 0.03 50);
--paper-muted: oklch(0.50 0.04 60);
--paper-noise-opacity: 0.14;
```

### Definição da classe `.paper-texture` (linhas 605-621)

```css
.paper-texture {
  background-color: var(--paper);
  position: relative;
  background-image:
    radial-gradient(circle at 20% 10%, oklch(0.85 0.04 60 / 0.18) 0%, transparent 45%),
    radial-gradient(circle at 80% 90%, oklch(0.80 0.05 50 / 0.12) 0%, transparent 40%);
}
.paper-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("/images/noise.webp");
  background-repeat: repeat;
  opacity: var(--paper-noise-opacity, 0.10);
  mix-blend-mode: multiply;
}
```

---

## 4. Onde PaperSheet é usado

### Templates (18 arquivos)

| Arquivo | Linhas |
|---|---|
| `components/documents/templates/autopsy-template.tsx` | 4 (import), 10, 32 (JSX) |
| `components/documents/templates/batch-template.tsx` | 6 (import), 75, 172 (JSX) |
| `components/documents/templates/bounty-template.tsx` | 4 (import), 10, 66 (JSX) |
| `components/documents/templates/broadcast-template.tsx` | 4 (import), 10, 29 (JSX) |
| `components/documents/templates/bulletin-template.tsx` | 4 (import), 10, 29 (JSX) |
| `components/documents/templates/classified-project-template.tsx` | 7 (import), 89, 170 (JSX) |
| `components/documents/templates/codex-entry-template.tsx` | 4 (import), 99, 153 (JSX) |
| `components/documents/templates/decree-template.tsx` | 4 (import), 10, 35 (JSX) |
| `components/documents/templates/dossier-template.tsx` | 4 (import), 10, 37 (JSX) |
| `components/documents/templates/forensic-template.tsx` | 4 (import), 10, 29 (JSX) |
| `components/documents/templates/id-card-template.tsx` | 4 (import), 10, 67 (JSX) |
| `components/documents/templates/incident-template.tsx` | 4 (import), 10, 31 (JSX) |
| `components/documents/templates/interrogation-template.tsx` | 4 (import), 37, 102 (JSX) |
| `components/documents/templates/medical-record-template.tsx` | 5 (import), 30, 164 (JSX) |
| `components/documents/templates/memo-template.tsx` | 4 (import), 10, 35 (JSX) |
| `components/documents/templates/monitored-thread-template.tsx` | 5 (import), 34, 94 (JSX) |
| `components/documents/templates/news-template.tsx` | 4 (import), 9, 62 (JSX) |
| `components/documents/templates/order-template.tsx` | 4 (import), 10, 29 (JSX) |

### Archive showcase

| Arquivo | Linhas |
|---|---|
| `app/archive/page.tsx` | 29 (import), 269-278 (JSX) |

### Documentação (menções)

| Arquivo | Linhas |
|---|---|
| `_investigation/incidents-investigation.md` | 15, 21, 42 |
| `_import/CHANGELOG.md` | 354 |
| `_import/NAMING_INVESTIGATION.md` | 54, 147, 176, 387 |
| `ETAPA_4_MIGRACAO.md` | 75 |

---

## Análise Comparativa

| Aspecto | Paper | PaperSheet |
|---|---|---|
| `"use client"` | ❌ | ✅ |
| CSS variables | ❌ (hardcoded) | ✅ (`--paper`, `--paper-muted`) |
| Textura/noise | ❌ | ✅ (`.paper-texture` + `noise.webp`) |
| Sombra | ❌ | ✅ (`shadow-[0_24px_64px_-32px…]`) |
| Padding | `p-6` | `p-10` / `md:p-14` |
| Borda | `border-[#252525]`/`border-[#eaeaea]` | `border-paper-muted/40` |
| Largura máx | `max-w-3xl` | `max-w-3xl` |
| Onde é usado | (aparentemente não usado em builds atuais — todos os templates usam PaperSheet) | 18 templates + archive showcase |

### Conclusão

`PaperSheet` é o sucessor completo de `Paper`. O componente `Paper` original parece estar obsoleto — nenhum template atual o importa. `PaperSheet` oferece textura, noise overlay, sombra e tema consistente via CSS variables, enquanto `Paper` usava cores fixas sem textura. Se `Paper` não for usado em lugar nenhum, pode ser removido com segurança.
