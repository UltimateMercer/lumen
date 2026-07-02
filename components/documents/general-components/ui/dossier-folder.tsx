/**
 * ============================================================================
 *  DossierFolder — Single-file cover component
 * ============================================================================
 *
 *  A cyberpunk × stationery folder-style reveal component.
 *  Click the cover → it animates open and shows your content.
 *  Works equally well as a *standalone decorative cover* (no children).
 *
 *  Ported from _import/Dossier.standalone.tsx with motion/react
 *  and adapted for the Lumen design system.
 *
 *  ============================================================================
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";

/* ============================================================================
 *  CLASSIFICATION MAP — Lumen PT → Dossier EN
 * ========================================================================== */

export const CLASSIFICATION_STAMP_MAP: Record<string, string> = {
  "PÚBLICO": "UNCLASSIFIED",
  "CONFIDENCIAL": "CONFIDENTIAL",
  "SECRETO": "SECRET",
  "ULTRASSECRETO": "TOP SECRET",
};

/* ============================================================================
 *  TYPES
 * ========================================================================== */

export type DossierAnimation =
  | "flip3d"
  | "slide"
  | "glitch"
  | "combo"
  | "scale-rise"
  | "peel"
  | "shred"
  | "iris"
  | "double-cover";

export type DossierTrigger = "click" | "hover" | "manual";

export type DossierLayout = "default" | "crest-hero" | "minimal" | "field-report";
export type DossierSurface = "paper" | "glass" | "carbon";
export type DossierPaperTexture = "noise" | "grain" | "fiber";

export type DossierStampShape = "rect" | "circle";

export type DossierStampLabel =
  | "CLASSIFIED"
  | "TOP SECRET"
  | "EYES ONLY"
  | "REDACTED"
  | "CONFIDENTIAL"
  | (string & {});

export type DossierStamp =
  | DossierStampLabel
  | {
      label: DossierStampLabel;
      shape?: DossierStampShape;
      rotate?: number;
      ring?: string;
    };

export interface DossierCrest {
  label?: string;
  ring?: string;
  ornate?: boolean;
}

export type DossierAspect = "portrait" | "landscape" | "square" | "16:9" | "4:3";

export interface DossierFolderProps {
  title?: string;
  caseId?: string;
  date?: string;
  classification?: string;
  stamps?: DossierStamp[];
  showBarcode?: boolean;
  showHud?: boolean;
  showScanlines?: boolean;
  showGrid?: boolean;
  showCorners?: boolean;
  crest?: boolean | DossierCrest;
  layout?: DossierLayout;
  surface?: DossierSurface;
  paperTexture?: DossierPaperTexture;
  briefing?: string;
  animation?: DossierAnimation;
  trigger?: DossierTrigger;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  children?: ReactNode;
  className?: string;
  aspect?: DossierAspect;
}

interface NormalizedStamp {
  label: string;
  shape?: DossierStampShape;
  rotate?: number;
  ring?: string;
}

interface HudFlags {
  scanlines: boolean;
  grid: boolean;
  corners: boolean;
}

interface CoverLayoutProps {
  title: string;
  caseId: string;
  date: string;
  classification: string;
  stamps: NormalizedStamp[];
  showBarcode: boolean;
  hud: HudFlags;
  crest: false | DossierCrest;
  surface: DossierSurface;
  paperTexture: DossierPaperTexture;
  briefing?: string;
}

/* ============================================================================
 *  HELPERS — surface styling
 * ========================================================================== */

const mono = "var(--font-mono, 'JetBrains Mono', monospace)";

const aspectToClass: Record<DossierAspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
};

function surfaceStyle(surface: DossierSurface): CSSProperties {
  if (surface === "glass") {
    return {
      background: "var(--glass-bg)",
      backdropFilter: "blur(var(--glass-blur)) saturate(140%)",
      WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(140%)",
      border: "1px solid var(--glass-border)",
      color: "var(--paper-ink)",
      boxShadow:
        "var(--shadow-folder), inset 0 0 0 1px color-mix(in oklab, white 18%, transparent)",
    };
  }
  if (surface === "carbon") {
    return {
      background:
        "linear-gradient(180deg, var(--carbon-bg) 0%, color-mix(in oklab, var(--carbon-bg) 80%, black) 100%)",
      border: "1px solid var(--carbon-edge)",
      color: "var(--carbon-ink)",
      boxShadow: "var(--shadow-folder)",
    };
  }
  return {
    background:
      "linear-gradient(180deg, var(--paper) 0%, color-mix(in oklab, var(--paper) 92%, var(--paper-ink) 8%) 100%)",
    border: "1px solid var(--paper-edge)",
    color: "var(--paper-ink)",
    boxShadow: "var(--shadow-folder)",
  };
}

function inkVar(surface: DossierSurface): string {
  if (surface === "carbon") return "var(--carbon-ink)";
  return "var(--paper-ink)";
}

/* ============================================================================
 *  ANIMATIONS
 * ========================================================================== */

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];
const physical: Transition["ease"] = [0.6, 0.01, 0.05, 0.95];
const expo: Transition["ease"] = [0.16, 1, 0.3, 1];

const coverVariants: Record<DossierAnimation, Variants> = {
  flip3d: {
    closed: { rotateY: 0, skewY: 0, opacity: 1, transition: { duration: 0.7, ease: physical } },
    open: {
      rotateY: -172,
      skewY: [0, -1.5, 0],
      opacity: 1,
      transition: { duration: 1.2, ease: physical },
    },
  },
  slide: {
    closed: { y: 0, rotate: 0, filter: "blur(0px)", opacity: 1, transition: { duration: 0.35, ease } },
    open: {
      y: ["0%", "-8%", "-115%"],
      rotate: [0, 1.5, -1],
      filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
      opacity: [1, 1, 0],
      transition: { duration: 0.75, ease: expo, times: [0, 0.25, 1] },
    },
  },
  glitch: {
    closed: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.2 } },
    open: {
      opacity: [1, 1, 0.6, 0.9, 0],
      x: [0, -6, 5, -3, 0],
      filter: ["blur(0px)", "blur(0px)", "blur(2px)", "blur(0px)", "blur(8px)"],
      transition: { duration: 0.55, ease, times: [0, 0.2, 0.45, 0.7, 1] },
    },
  },
  combo: {
    closed: { rotateY: 0, opacity: 1, x: 0, transition: { duration: 0.5, ease: physical } },
    open: {
      rotateY: [0, 0, -172],
      x: [0, -4, 3, 0, 0],
      opacity: [1, 1, 1, 1, 1],
      transition: { duration: 1.0, ease: physical, times: [0, 0.2, 0.3, 0.4, 1] },
    },
  },
  "scale-rise": {
    closed: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.3, ease } },
    open: {
      scale: [1, 1.06, 1.06, 1.06],
      y: ["0%", "-2%", "-1%", "-120%"],
      opacity: [1, 1, 1, 0],
      transition: { duration: 1.1, ease: expo, times: [0, 0.22, 0.55, 1] },
    },
  },
  peel: {
    closed: { rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.3, ease } },
    open: {
      rotate: [0, -8, -28],
      scale: [1, 1.02, 0.88],
      opacity: [1, 1, 0],
      transition: { duration: 0.75, ease: expo, times: [0, 0.4, 1] },
    },
  },
  shred: {
    closed: { opacity: 1, transition: { duration: 0.2 } },
    open: { opacity: 0, transition: { duration: 0.6, ease } },
  },
  iris: {
    closed: {
      clipPath: "circle(100% at 50% 50%)",
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease },
    },
    open: {
      clipPath: ["circle(100% at 50% 50%)", "circle(20% at 50% 50%)", "circle(0% at 50% 50%)"],
      scale: [1, 0.98, 0.94],
      opacity: [1, 1, 0],
      transition: { duration: 0.75, ease: physical, times: [0, 0.6, 1] },
    },
  },
  "double-cover": {
    closed: { opacity: 1, transition: { duration: 0.2 } },
    open: { opacity: 0, transition: { duration: 1.0, ease } },
  },
};

const contentVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.2 } },
  open: { opacity: 1, transition: { duration: 0.3, ease } },
};

const glitchOverlayVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: [0, 1, 0.4, 1, 0],
    transition: { duration: 0.45, times: [0, 0.15, 0.4, 0.7, 1] },
  },
};

const shredStripVariants: Variants = {
  closed: () => ({ y: 0, rotate: 0, opacity: 1, transition: { duration: 0.2 } }),
  open: (i: number) => ({
    y: ["0%", "-130%"],
    rotate: [0, i % 2 === 0 ? -4 : 4],
    opacity: [1, 0],
    transition: { duration: 0.6 + i * 0.05, ease, delay: i * 0.06 },
  }),
};

const outerCoverVariants: Variants = {
  closed: { rotateY: 0, opacity: 1, transition: { duration: 0.3, ease: physical } },
  open: { rotateY: -172, opacity: 1, transition: { duration: 0.55, ease: physical } },
};

const innerCoverVariants: Variants = {
  closed: { rotateY: 0, opacity: 1, transition: { duration: 0.3, ease: physical } },
  open: { rotateY: 172, opacity: 1, transition: { duration: 0.55, ease: physical, delay: 0.4 } },
};

/* ============================================================================
 *  SUB-COMPONENT: PaperTexture
 * ========================================================================== */

function PaperTexture({
  variant = "noise",
  dim = false,
  hudActive = false,
}: {
  variant?: DossierPaperTexture;
  dim?: boolean;
  hudActive?: boolean;
}) {
  const id = useId().replace(/[^a-z0-9]/gi, "");
  const noiseId = `dossier-noise-${id}`;
  const grainId = `dossier-grain-${id}`;
  const fiberId = `dossier-fiber-${id}`;
  const fiberId2 = `dossier-fiber2-${id}`;
  const fiberSpecksId = `dossier-fiber-specks-${id}`;

  const baseOpacity = dim ? 0.5 : 1;
  const hudSoftening = hudActive ? 0.55 : 1;

  return (
    <>
      {variant === "noise" && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
          style={{ opacity: 0.18 * baseOpacity }}
        >
          <filter id={noiseId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
        </svg>
      )}

      {variant === "grain" && (
        <>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
            style={{ opacity: 0.1 * baseOpacity * hudSoftening }}
          >
            <filter id={grainId}>
              <feTurbulence type="turbulence" baseFrequency="0.55" numOctaves="1" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="1.1" intercept="-0.15" />
              </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter={`url(#${grainId})`} />
          </svg>
          {!hudActive && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
              style={{ opacity: 0.08 * baseOpacity }}
            >
              <filter id={`${grainId}-flecks`}>
                <feTurbulence type="fractalNoise" baseFrequency="2.5" numOctaves="1" stitchTiles="stitch" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 12 -6"
                />
              </filter>
              <rect width="100%" height="100%" filter={`url(#${grainId}-flecks)`} />
            </svg>
          )}
        </>
      )}

      {variant === "fiber" && (
        <>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
            style={{ opacity: 0.55 * baseOpacity }}
          >
            <defs>
              <pattern
                id={fiberId}
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(15)"
              >
                <line x1="0" y1="0" x2="0" y2="14" stroke="var(--paper-ink)" strokeWidth="0.6" opacity="0.35" />
                <line x1="7" y1="0" x2="7" y2="14" stroke="var(--paper-ink)" strokeWidth="0.35" opacity="0.18" />
              </pattern>
              <pattern
                id={fiberId2}
                width="11"
                height="11"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-15)"
              >
                <line x1="0" y1="0" x2="0" y2="11" stroke="var(--paper-ink)" strokeWidth="0.5" opacity="0.28" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${fiberId})`} />
            <rect width="100%" height="100%" fill={`url(#${fiberId2})`} />
          </svg>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply"
            style={{ opacity: 0.4 * baseOpacity * hudSoftening }}
          >
            <filter id={fiberSpecksId}>
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 6 -4.2"
              />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${fiberSpecksId})`} />
          </svg>
        </>
      )}

      {/* bottom-right notch */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-10 w-10"
        style={{
          background:
            "linear-gradient(315deg, color-mix(in oklab, var(--paper-ink) 25%, transparent) 0 50%, transparent 50%)",
          opacity: dim ? 0.5 : 1,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 60%, color-mix(in oklab, var(--paper-ink) 20%, transparent) 100%)",
          opacity: dim ? 0.6 : 1,
        }}
      />
    </>
  );
}

/* ============================================================================
 *  SUB-COMPONENT: HudOverlay
 * ========================================================================== */

function HudOverlay({
  dim = false,
  scanlines = true,
  grid = true,
  corners = true,
}: {
  dim?: boolean;
  scanlines?: boolean;
  grid?: boolean;
  corners?: boolean;
}) {
  const k = dim ? 0.55 : 1;
  return (
    <>
      {grid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            opacity: 0.25 * k,
            backgroundImage:
              "linear-gradient(var(--hud-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hud-grid) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}
      {scanlines && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            opacity: 0.2 * k,
            backgroundImage:
              "repeating-linear-gradient(0deg, color-mix(in oklab, var(--neon-red) 70%, transparent) 0 1px, transparent 1px 4px)",
          }}
        />
      )}
      {corners &&
        (
          [
            "left-2 top-2 border-l border-t",
            "right-2 top-2 border-r border-t",
            "left-2 bottom-2 border-l border-b",
            "right-2 bottom-2 border-r border-b",
          ] as const
        ).map((c) => (
          <span
            key={c}
            aria-hidden
            className={`pointer-events-none absolute h-3 w-3 ${c}`}
            style={{ borderColor: "var(--neon-red)" }}
          />
        ))}
    </>
  );
}

/* ============================================================================
 *  SUB-COMPONENT: Barcode (decorative)
 * ========================================================================== */

function Barcode({
  value,
  height = 36,
  ink = "var(--paper-ink)",
}: {
  value: string;
  height?: number;
  ink?: string;
}) {
  const bars: number[] = [];
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i);
    bars.push(((c >> 0) & 0b11) + 1);
    bars.push(((c >> 2) & 0b11) + 1);
    bars.push(((c >> 4) & 0b11) + 1);
    bars.push(((c >> 6) & 0b11) + 1);
  }
  const totalWidth = bars.reduce((a, b) => a + b + 1, 0);
  let x = 0;
  return (
    <div className="flex flex-col items-start gap-1">
      <svg width={totalWidth * 2} height={height} viewBox={`0 0 ${totalWidth} ${height}`} aria-hidden>
        {bars.map((w, i) => {
          const rect = <rect key={i} x={x} y={0} width={w} height={height} fill={ink} />;
          x += w + 1;
          return rect;
        })}
      </svg>
      <span
        className="text-[9px] tracking-[0.3em]"
        style={{ fontFamily: mono, color: ink }}
      >
        {value}
      </span>
    </div>
  );
}

/* ============================================================================
 *  SUB-COMPONENT: AgencyCrest
 * ========================================================================== */

function AgencyCrest({
  label = "D.C.A",
  ring = "DEPT. OF CLASSIFIED AFFAIRS ▸ DIV. 07 ▸",
  size = 72,
  ornate = false,
}: {
  label?: string;
  ring?: string;
  size?: number;
  ornate?: boolean;
}) {
  const repeated = (ring + " ").repeat(2);
  const safe = label.replace(/[^a-z0-9]/gi, "") || "crest";
  const ringId = `crest-ring-${safe}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden style={{ color: "currentColor" }}>
      <defs>
        <path id={ringId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      {ornate && (
        <g stroke="currentColor" strokeWidth="0.5" opacity="0.35">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const x1 = 50 + Math.cos(a) * 28;
            const y1 = 50 + Math.sin(a) * 28;
            const x2 = 50 + Math.cos(a) * 48;
            const y2 = 50 + Math.sin(a) * 48;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )}
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <text
        style={{
          fontFamily: mono,
          fontSize: ornate ? "5px" : "6px",
          fontWeight: 600,
          letterSpacing: "0.15em",
          fill: "currentColor",
        }}
      >
        <textPath href={`#${ringId}`} startOffset="0">{repeated}</textPath>
      </text>
      <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
      {ornate && <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" />}
      <g stroke="currentColor" strokeWidth="0.8" fill="none">
        <line x1="50" y1="32" x2="50" y2="68" />
        <line x1="32" y1="50" x2="68" y2="50" />
        <line x1="37" y1="37" x2="63" y2="63" />
        <line x1="63" y1="37" x2="37" y2="63" />
      </g>
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      <text
        x="50"
        y="86"
        textAnchor="middle"
        style={{
          fontFamily: mono,
          fontSize: "7px",
          fontWeight: 800,
          letterSpacing: "0.2em",
          fill: "currentColor",
        }}
      >
        {label}
      </text>
    </svg>
  );
}

/* ============================================================================
 *  SUB-COMPONENT: ClassifiedStamp
 * ========================================================================== */

const rectPresets: Record<string, { size: string; pad: string; letter: string }> = {
  "TOP SECRET":  { size: "1.65rem", pad: "0.4rem 1.1rem",  letter: "0.16em" },
  CLASSIFIED:    { size: "1.5rem",  pad: "0.35rem 1rem",   letter: "0.18em" },
  "EYES ONLY":   { size: "1.35rem", pad: "0.35rem 0.9rem", letter: "0.22em" },
  REDACTED:      { size: "1.7rem",  pad: "0.3rem 1rem",    letter: "0.14em" },
  CONFIDENTIAL:  { size: "1.4rem",  pad: "0.35rem 0.9rem", letter: "0.18em" },
};

function ClassifiedStamp({
  label,
  rotate = -12,
  shape = "rect",
  ring,
  className = "",
}: {
  label: string;
  rotate?: number;
  shape?: DossierStampShape;
  ring?: string;
  className?: string;
}) {
  const id = useId().replace(/[^a-z0-9]/gi, "");
  const distortId = `stamp-distort-${id}`;

  if (shape === "circle") {
    return <CircularStamp label={label} ring={ring} rotate={rotate} distortId={distortId} className={className} />;
  }

  const p = rectPresets[label.toUpperCase()] ?? rectPresets.CLASSIFIED;
  return (
    <div
      aria-hidden
      className={`relative select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, mixBlendMode: "multiply", filter: `url(#${distortId})` }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id={distortId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
      </svg>
      <div
        style={{
          color: "var(--ink-red)",
          border: "3px solid var(--ink-red)",
          outline: "1px solid var(--ink-red)",
          outlineOffset: "3px",
          padding: p.pad,
          fontFamily: mono,
          fontWeight: 800,
          letterSpacing: p.letter,
          fontSize: p.size,
          opacity: 0.85,
          whiteSpace: "nowrap",
          WebkitMask:
            "radial-gradient(120% 90% at 30% 40%, black 55%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 100%)",
          mask: "radial-gradient(120% 90% at 30% 40%, black 55%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 100%)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CircularStamp({
  label,
  ring,
  rotate,
  distortId,
  className,
}: {
  label: string;
  ring?: string;
  rotate: number;
  distortId: string;
  className: string;
}) {
  const lines = label.split(/\s+/);
  const ringText = (ring ?? `${label} ▸ LEVEL 5 ▸ AUTH ONLY ▸`).toUpperCase();
  const repeated = (ringText + " ").repeat(2);
  const pathId = `${distortId}-ring`;
  const size = 150;
  return (
    <div
      aria-hidden
      className={`relative select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, mixBlendMode: "multiply", filter: `url(#${distortId})`, opacity: 0.88 }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id={distortId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="1.4" />
        </filter>
      </svg>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{
          color: "var(--ink-red)",
          WebkitMask:
            "radial-gradient(70% 70% at 40% 35%, black 55%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.85) 100%)",
          mask: "radial-gradient(70% 70% at 40% 35%, black 55%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.85) 100%)",
        }}
      >
        <defs>
          <path id={pathId} d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <text style={{ fontFamily: mono, fontSize: "5.5px", fontWeight: 700, letterSpacing: "0.18em", fill: "currentColor" }}>
          <textPath href={`#${pathId}`} startOffset="0">{repeated}</textPath>
        </text>
        <text x="14" y="54" style={{ fontSize: "8px", fontWeight: 800, fill: "currentColor" }}>✦</text>
        <text x="78" y="54" style={{ fontSize: "8px", fontWeight: 800, fill: "currentColor" }}>✦</text>
        {lines.length === 1 ? (
          <text
            x="50"
            y="55"
            textAnchor="middle"
            style={{ fontFamily: mono, fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", fill: "currentColor" }}
          >
            {lines[0]}
          </text>
        ) : (
          <>
            <text
              x="50"
              y="48"
              textAnchor="middle"
              style={{ fontFamily: mono, fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", fill: "currentColor" }}
            >
              {lines[0]}
            </text>
            <text
              x="50"
              y="60"
              textAnchor="middle"
              style={{ fontFamily: mono, fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", fill: "currentColor" }}
            >
              {lines.slice(1).join(" ")}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

/* ============================================================================
 *  SUB-COMPONENT: CaseMetadata
 * ========================================================================== */

function CaseMetadata({
  caseId,
  date,
  classification,
  ink = "var(--paper-ink)",
}: {
  caseId: string;
  date: string;
  classification: string;
  ink?: string;
}) {
  const rows: Array<[string, string]> = [
    ["CASE #", caseId],
    ["DATE", date],
    ["CLEARANCE", classification],
  ];
  return (
    <dl
      className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.2em]"
      style={{ fontFamily: mono, fontWeight: 600 }}
    >
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt style={{ color: `color-mix(in oklab, ${ink} 55%, transparent)` }}>{k}</dt>
          <dd style={{ color: ink }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ============================================================================
 *  LAYOUTS
 * ========================================================================== */

function CoverDefault(props: CoverLayoutProps) {
  const { title, caseId, date, classification, stamps, showBarcode, hud, crest, surface, paperTexture } = props;
  const ink = inkVar(surface);
  const dimOverlay = surface !== "paper";
  const hudActive = hud.scanlines || hud.grid;
  const hudAny = hudActive || hud.corners;
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden p-4 sm:p-5 md:p-6"
      style={{ ...surfaceStyle(surface), borderRadius: "var(--dossier-radius)", fontFamily: mono }}
    >
      <PaperTexture variant={paperTexture} dim={dimOverlay} hudActive={hudActive} />
      {hudAny && <HudOverlay dim={dimOverlay} scanlines={hud.scanlines} grid={hud.grid} corners={hud.corners} />}

      <div
        className="relative z-10 flex items-center justify-between border-b pb-3"
        style={{ borderColor: `color-mix(in oklab, ${ink} 30%, transparent)` }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] sm:text-[10px]" style={{ color: "var(--neon-red)", fontWeight: 800 }}>
          // {classification} //
        </span>
        <span className="inline-flex h-2 w-2" style={{ background: "var(--neon-red)", boxShadow: "0 0 8px var(--neon-red)" }} />
      </div>

      <div className="relative z-10 mt-4 flex flex-1 items-start gap-3 sm:mt-6 sm:gap-4">
        {crest && (
          <div className="shrink-0" style={{ color: ink, width: "clamp(56px, 14vw, 96px)" }}>
            <AgencyCrest label={crest.label} ring={crest.ring} size={96} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-60 sm:text-[10px]">▸ Dossier</p>
          <h2
            className="mt-2 break-words uppercase leading-[0.95]"
            style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4.5vw, 3rem)", letterSpacing: "-0.04em" }}
          >
            {title}
          </h2>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          {stamps.map((s, i) => (
            <ClassifiedStamp
              key={s.label + i}
              label={s.label}
              shape={s.shape}
              ring={s.ring}
              rotate={s.rotate ?? (i % 2 === 0 ? -10 : 6)}
            />
          ))}
        </div>
      </div>

      <div
        className="relative z-10 mt-4 flex items-end justify-between gap-3 border-t pt-3 sm:mt-6 sm:gap-4 sm:pt-4"
        style={{ borderColor: `color-mix(in oklab, ${ink} 30%, transparent)` }}
      >
        <CaseMetadata caseId={caseId} date={date} classification={classification} ink={ink} />
        {showBarcode && <Barcode value={caseId} ink={ink} />}
      </div>

      <span
        className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em]"
        style={{
          color: "var(--neon-red)",
          textShadow: "0 0 6px color-mix(in oklab, var(--neon-red) 80%, transparent)",
          fontWeight: 600,
        }}
      >
        ▸ Tap to access
      </span>
    </div>
  );
}

function CoverCrestHero(props: CoverLayoutProps) {
  const { title, caseId, date, classification, stamps, showBarcode, hud, crest, surface, paperTexture } = props;
  const ink = inkVar(surface);
  const dimOverlay = surface !== "paper";
  const hudActive = hud.scanlines || hud.grid;
  const hudAny = hudActive || hud.corners;
  const crestData = crest || { label: "D.C.A", ring: "DEPT. OF CLASSIFIED AFFAIRS ▸ DIV. 07 ▸" };

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden p-4 sm:p-5 md:p-6"
      style={{ ...surfaceStyle(surface), borderRadius: "var(--dossier-radius)", fontFamily: mono }}
    >
      <PaperTexture variant={paperTexture} dim={dimOverlay} hudActive={hudActive} />
      {hudAny && <HudOverlay dim={dimOverlay} scanlines={hud.scanlines} grid={hud.grid} corners={hud.corners} />}

      <div
        className="relative z-10 flex items-center justify-between text-[9px] uppercase tracking-[0.4em] sm:text-[10px]"
        style={{ color: "var(--neon-red)", fontWeight: 800 }}
      >
        <span>// {classification}</span>
        <span>{caseId}</span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 py-4 sm:gap-6">
        <div style={{ color: ink, width: "min(60%, 280px)" }}>
          <AgencyCrest
            label={crestData.label}
            ring={crestData.ring}
            size={260}
            ornate={crestData.ornate ?? true}
          />
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.5em] opacity-60 sm:text-[10px]">▸ Dossier ▸ {date}</p>
          <h2
            className="mt-3 break-words uppercase leading-[0.95]"
            style={{ fontWeight: 800, fontSize: "clamp(1.1rem, 3.5vw, 2.25rem)", letterSpacing: "-0.03em" }}
          >
            {title}
          </h2>
        </div>
      </div>

      {stamps.length > 0 && (
        <div className="pointer-events-none absolute right-3 top-10 z-20 sm:right-4 sm:top-12">
          {stamps.slice(0, 1).map((s, i) => (
            <ClassifiedStamp
              key={s.label + i}
              label={s.label}
              shape={s.shape}
              ring={s.ring}
              rotate={s.rotate ?? 14}
            />
          ))}
        </div>
      )}
      {stamps.length > 1 && (
        <div className="pointer-events-none absolute bottom-14 left-3 z-20 sm:bottom-16 sm:left-4">
          <ClassifiedStamp
            label={stamps[1].label}
            shape={stamps[1].shape}
            ring={stamps[1].ring}
            rotate={stamps[1].rotate ?? -16}
          />
        </div>
      )}

      <div
        className="relative z-10 flex items-end justify-between border-t pt-3"
        style={{ borderColor: `color-mix(in oklab, ${ink} 30%, transparent)` }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] opacity-70 sm:text-[10px]">CASE // {caseId}</span>
        {showBarcode && <Barcode value={caseId} height={24} ink={ink} />}
      </div>

      <span
        className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em]"
        style={{
          color: "var(--neon-red)",
          textShadow: "0 0 6px color-mix(in oklab, var(--neon-red) 80%, transparent)",
          fontWeight: 600,
        }}
      >
        ▸ Authorized access only
      </span>
    </div>
  );
}

function CoverMinimal(props: CoverLayoutProps) {
  const { title, caseId, classification, surface, paperTexture } = props;
  const ink = inkVar(surface);
  const dimOverlay = surface !== "paper";
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5 sm:p-7 md:p-8"
      style={{ ...surfaceStyle(surface), borderRadius: "var(--dossier-radius)", fontFamily: mono }}
    >
      <PaperTexture variant={paperTexture} dim={dimOverlay} />

      <span className="relative z-10 text-[9px] uppercase tracking-[0.5em] sm:text-[10px]" style={{ color: "var(--neon-red)", fontWeight: 800 }}>
        — {classification}
      </span>

      <div className="relative z-10">
        <h2
          className="break-words uppercase leading-[0.9]"
          style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 6vw, 4rem)", letterSpacing: "-0.05em" }}
        >
          {title}
        </h2>
      </div>

      <div
        className="relative z-10 flex items-center justify-between text-[9px] uppercase tracking-[0.35em] sm:text-[10px]"
        style={{ color: `color-mix(in oklab, ${ink} 70%, transparent)` }}
      >
        <span>CASE / {caseId}</span>
        <span>▸ TAP</span>
      </div>
    </div>
  );
}

function CoverFieldReport(props: CoverLayoutProps) {
  const { title, caseId, date, classification, stamps, showBarcode, hud, crest, surface, paperTexture, briefing } = props;
  const ink = inkVar(surface);
  const dimOverlay = surface !== "paper";
  const hudActive = hud.scanlines || hud.grid;
  const hudAny = hudActive || hud.corners;

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden p-3 sm:p-4 md:p-5"
      style={{ ...surfaceStyle(surface), borderRadius: "var(--dossier-radius)", fontFamily: mono }}
    >
      <PaperTexture variant={paperTexture} dim={dimOverlay} hudActive={hudActive} />
      {hudAny && <HudOverlay dim={dimOverlay} scanlines={hud.scanlines} grid={hud.grid} corners={hud.corners} />}

      <div
        className="relative z-10 flex items-center justify-between gap-2 border-b pb-2 text-[9px] uppercase tracking-[0.3em] sm:text-[10px] sm:tracking-[0.4em]"
        style={{ borderColor: `color-mix(in oklab, ${ink} 30%, transparent)` }}
      >
        <span className="truncate" style={{ color: "var(--neon-red)", fontWeight: 800 }}>
          FIELD REPORT // {classification}
        </span>
        <span className="shrink-0" style={{ opacity: 0.6 }}>{date}</span>
      </div>

      <div className="relative z-10 mt-4 flex flex-1 flex-col gap-4 sm:flex-row sm:gap-5">
        <aside
          className="flex flex-col gap-3 border-b pb-3 sm:w-[40%] sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4"
          style={{ borderColor: `color-mix(in oklab, ${ink} 25%, transparent)` }}
        >
          {crest && (
            <div style={{ color: ink, width: "clamp(64px, 16vw, 96px)" }}>
              <AgencyCrest label={crest.label} ring={crest.ring} size={90} />
            </div>
          )}
          <div className="space-y-2 text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.25em]">
            <Row k="OP" v={caseId} ink={ink} />
            <Row k="REC" v={date} ink={ink} />
            <Row k="CLR" v={classification} ink={ink} />
            <Row k="DIST" v="03 / 03" ink={ink} />
            <Row k="LOC" v="REDACTED" ink={ink} />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-3">
          <p
            className="text-[9px] uppercase tracking-[0.4em] sm:text-[10px] sm:tracking-[0.45em]"
            style={{ color: `color-mix(in oklab, ${ink} 60%, transparent)` }}
          >
            ▸ Subject
          </p>
          <h2
            className="break-words uppercase leading-[0.95]"
            style={{ fontWeight: 800, fontSize: "clamp(1.25rem, 3.5vw, 2.4rem)", letterSpacing: "-0.04em" }}
          >
            {title}
          </h2>
          <div className="border-t pt-3" style={{ borderColor: `color-mix(in oklab, ${ink} 25%, transparent)` }}>
            <p className="text-[9px] uppercase tracking-[0.4em]" style={{ color: `color-mix(in oklab, ${ink} 60%, transparent)` }}>
              ▸ Briefing
            </p>
            <p
              className="mt-2 text-[10px] leading-relaxed sm:text-[11px]"
              style={{ color: `color-mix(in oklab, ${ink} 88%, transparent)`, fontFamily: mono }}
            >
              {briefing ??
                "Intercepted comms suggest movement in the eastern corridor. Subject pattern consistent with prior incident reports. Field team standing by for analyst confirmation."}
            </p>
          </div>
        </div>
      </div>

      {stamps.length > 0 && (
        <div className="pointer-events-none absolute bottom-16 right-3 z-20 sm:bottom-20 sm:right-4">
          <ClassifiedStamp
            label={stamps[0].label}
            shape={stamps[0].shape}
            ring={stamps[0].ring}
            rotate={stamps[0].rotate ?? -8}
          />
        </div>
      )}

      <div
        className="relative z-10 mt-3 flex items-end justify-between gap-3 border-t pt-3"
        style={{ borderColor: `color-mix(in oklab, ${ink} 30%, transparent)` }}
      >
        <CaseMetadata caseId={caseId} date={date} classification={classification} ink={ink} />
        {showBarcode && <Barcode value={caseId} height={24} ink={ink} />}
      </div>
    </div>
  );
}

function Row({ k, v, ink }: { k: string; v: string; ink: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span style={{ color: `color-mix(in oklab, ${ink} 55%, transparent)` }}>{k}</span>
      <span style={{ color: ink, fontWeight: 600 }}>{v}</span>
    </div>
  );
}

/* ============================================================================
 *  COVER ROUTER
 * ========================================================================== */

function DossierCover({ layout, ...rest }: CoverLayoutProps & { layout: DossierLayout }) {
  switch (layout) {
    case "crest-hero":
      return <CoverCrestHero {...rest} />;
    case "minimal":
      return <CoverMinimal {...rest} />;
    case "field-report":
      return <CoverFieldReport {...rest} />;
    default:
      return <CoverDefault {...rest} />;
  }
}

/* ============================================================================
 *  INNER CONTENT
 * ========================================================================== */

function DossierContent({ children, surface = "paper" }: { children?: ReactNode; surface?: DossierSurface }) {
  const ink = inkVar(surface);
  return (
    <div
      role="region"
      className="relative h-full w-full overflow-auto p-6"
      style={{
        ...surfaceStyle(surface),
        boxShadow: "var(--shadow-folder-open)",
        borderRadius: "var(--dossier-radius)",
        color: ink,
      }}
    >
      {children ?? <EmptyPayload ink={ink} />}
    </div>
  );
}

function EmptyPayload({ ink }: { ink: string }) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-4"
      style={{ fontFamily: mono, opacity: 0.6, color: ink }}
    >
      <div className="h-px w-24" style={{ background: ink }} />
      <p className="text-[10px] uppercase tracking-[0.4em]">// NO PAYLOAD //</p>
      <div className="h-px w-24" style={{ background: ink }} />
    </div>
  );
}

function InnerCover({ classification, caseId, surface }: { classification: string; caseId: string; surface: DossierSurface }) {
  const base = surfaceStyle(surface);
  const ink = surface === "carbon" ? "var(--carbon-ink)" : "var(--paper-ink)";
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      style={{
        ...base,
        border: "1px solid var(--neon-red)",
        borderRadius: "var(--dossier-radius)",
        boxShadow:
          "0 0 0 1px color-mix(in oklab, var(--neon-red) 35%, transparent) inset, 0 12px 30px -10px rgba(0,0,0,0.55)",
        fontFamily: mono,
        color: ink,
      }}
    >
      <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.4em] sm:left-4 sm:top-4" style={{ color: "var(--neon-red)", fontWeight: 800 }}>
        // INNER FILE
      </span>
      <span className="absolute right-3 top-3 text-[9px] uppercase tracking-[0.4em] sm:right-4 sm:top-4" style={{ opacity: 0.6 }}>
        {caseId}
      </span>
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: "clamp(56px, 14vw, 80px)",
          height: "clamp(56px, 14vw, 80px)",
          border: "1px solid var(--neon-red)",
          boxShadow:
            "0 0 0 1px color-mix(in oklab, var(--neon-red) 30%, transparent) inset, 0 0 18px color-mix(in oklab, var(--neon-red) 40%, transparent)",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--neon-red)", fontWeight: 800 }}>
          ✦ SEAL
        </span>
      </div>
      <span className="mt-4 text-[9px] uppercase tracking-[0.5em] sm:text-[10px]" style={{ opacity: 0.65 }}>
        — {classification} —
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0"
        style={{
          width: "clamp(20px, 5vw, 32px)",
          height: "clamp(20px, 5vw, 32px)",
          background:
            "linear-gradient(315deg, color-mix(in oklab, var(--paper-ink) 30%, transparent) 0 50%, transparent 50%)",
        }}
      />
    </div>
  );
}

/* ============================================================================
 *  HELPERS — normalization
 * ========================================================================== */

const todayISO = () => new Date().toISOString().slice(0, 10);

function genCaseId() {
  const a = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${a}-${n}`;
}

function resolveCrest(crest: DossierFolderProps["crest"]): false | DossierCrest {
  if (!crest) return false;
  if (crest === true) return {};
  return crest;
}

function normalizeStamps(stamps: DossierStamp[]): NormalizedStamp[] {
  return stamps.map((s) =>
    typeof s === "string"
      ? { label: s }
      : { label: s.label, shape: s.shape, rotate: s.rotate, ring: s.ring },
  );
}

const SHRED_STRIPS = 5;

/* ============================================================================
 *  MAIN COMPONENT
 * ========================================================================== */

export function DossierFolder({
  title = "UNTITLED FILE",
  caseId,
  date,
  classification = "TOP SECRET",
  stamps = ["CLASSIFIED"],
  showBarcode = true,
  showHud = true,
  showScanlines,
  showGrid,
  showCorners,
  crest = false,
  layout = "default",
  surface = "paper",
  paperTexture = "noise",
  briefing,
  animation = "flip3d",
  trigger = "click",
  open: controlledOpen,
  onOpenChange,
  dismissible,
  children,
  className = "",
  aspect = "portrait",
}: DossierFolderProps) {
  const resolvedDismissible = dismissible ?? true;
  const reactId = useId();
  const contentId = `dossier-content-${reactId}`;

  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? !!controlledOpen : internalOpen;

  const resolvedCaseId = useMemo(() => caseId ?? genCaseId(), [caseId]);
  const resolvedDate = date ?? todayISO();
  const resolvedCrest = useMemo(() => resolveCrest(crest), [crest]);
  const resolvedStamps = useMemo(() => normalizeStamps(stamps), [stamps]);
  const reduceMotion = useReducedMotion();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!open || !resolvedDismissible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, resolvedDismissible, setOpen]);

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) contentRef.current?.focus();
  }, [open]);

  const aspectClass = aspectToClass[aspect];

  const triggerProps =
    trigger === "click"
      ? { onClick: () => setOpen(true) }
      : trigger === "hover"
        ? { onMouseEnter: () => setOpen(true), onClick: () => setOpen(true) }
        : {};

  const effectiveAnim = reduceMotion ? "slide" : animation;
  const showGlitchFlash = effectiveAnim === "glitch" || effectiveAnim === "combo";
  const isShred = effectiveAnim === "shred";
  const isPeel = effectiveAnim === "peel";
  const isFlip = effectiveAnim === "flip3d" || effectiveAnim === "combo";
  const isDoubleCover = effectiveAnim === "double-cover";

  const hud: HudFlags = {
    scanlines: showScanlines ?? showHud,
    grid: showGrid ?? showHud,
    corners: showCorners ?? showHud,
  };

  const coverProps = {
    title,
    caseId: resolvedCaseId,
    date: resolvedDate,
    classification,
    stamps: resolvedStamps,
    showBarcode,
    hud,
    crest: resolvedCrest,
    surface,
    paperTexture,
    briefing,
    layout,
  };

  return (
    <div className={`relative w-full ${className}`}>
      <AnimatePresence>
        {open && resolvedDismissible && (
          <motion.button
            key="close"
            type="button"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 z-40 inline-flex items-center gap-2 pb-1 text-[10px] uppercase tracking-[0.35em] focus-visible:outline-none"
            style={{
              top: "-26px",
              fontFamily: mono,
              fontWeight: 800,
              color: "var(--neon-red)",
              borderBottom: "1px solid var(--neon-red)",
              textShadow: "0 0 6px color-mix(in oklab, var(--neon-red) 70%, transparent)",
            }}
          >
            [ ESC ] CLOSE
          </motion.button>
        )}
      </AnimatePresence>

      <div className={`relative w-full ${aspectClass}`} style={{ perspective: "1600px" }}>
        <div className="absolute inset-0">
          <AnimatePresence>
            {open && (
              <motion.div
                key="content"
                ref={contentRef}
                id={contentId}
                tabIndex={-1}
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="h-full w-full outline-none"
              >
                <DossierContent surface={surface}>{children}</DossierContent>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!open && (
            <>
              {isShred ? (
                <motion.button
                  key="cover-shred"
                  type="button"
                  aria-expanded={open}
                  aria-controls={contentId}
                  {...triggerProps}
                  initial={false}
                  exit={{ transition: { duration: 0.8 } }}
                  className="absolute inset-0 cursor-pointer text-left focus-visible:outline-none"
                  style={{ borderRadius: "var(--dossier-radius)" }}
                >
                  {Array.from({ length: SHRED_STRIPS }).map((_, i) => {
                    const w = 100 / SHRED_STRIPS;
                    const left = i * w;
                    const right = 100 - (i + 1) * w;
                    return (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={shredStripVariants}
                        initial="closed"
                        animate="closed"
                        exit="open"
                        className="absolute inset-0"
                        style={{
                          clipPath: `inset(0 ${right}% 0 ${left}%)`,
                          WebkitClipPath: `inset(0 ${right}% 0 ${left}%)`,
                        }}
                      >
                        <DossierCover {...coverProps} />
                      </motion.div>
                    );
                  })}
                </motion.button>
              ) : isDoubleCover ? (
                <motion.button
                  key="cover-double"
                  type="button"
                  aria-expanded={open}
                  aria-controls={contentId}
                  {...triggerProps}
                  initial={false}
                  exit={{ transition: { duration: 1.0 } }}
                  className="absolute inset-0 cursor-pointer text-left focus-visible:outline-none"
                  style={{ borderRadius: "var(--dossier-radius)", transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    variants={outerCoverVariants}
                    initial="closed"
                    animate="closed"
                    exit="open"
                    className="absolute inset-0"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      borderRadius: "var(--dossier-radius)",
                      zIndex: 2,
                    }}
                  >
                    <DossierCover {...coverProps} />
                  </motion.div>
                  <motion.div
                    variants={innerCoverVariants}
                    initial="closed"
                    animate="closed"
                    exit="open"
                    className="absolute"
                    style={{
                      inset: "5%",
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      borderRadius: "var(--dossier-radius)",
                      zIndex: 1,
                    }}
                  >
                    <InnerCover classification={classification} caseId={resolvedCaseId} surface={surface} />
                  </motion.div>
                </motion.button>
              ) : (
                <motion.button
                  key="cover"
                  type="button"
                  aria-expanded={open}
                  aria-controls={contentId}
                  {...triggerProps}
                  variants={coverVariants[effectiveAnim]}
                  initial="closed"
                  animate="closed"
                  exit="open"
                  className="absolute inset-0 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    transformOrigin: isFlip ? "left center" : isPeel ? "top right" : "center",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    borderRadius: "var(--dossier-radius)",
                    // @ts-expect-error css var
                    "--tw-ring-color": "var(--neon-red)",
                  }}
                >
                  <DossierCover {...coverProps} />
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && showGlitchFlash && (
            <motion.div
              key="glitch"
              variants={glitchOverlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
              style={{ borderRadius: "var(--dossier-radius)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, color-mix(in oklab, var(--neon-red) 80%, transparent) 0 2px, transparent 2px 6px)",
                  mixBlendMode: "screen",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: mono,
                  color: "var(--neon-red)",
                  textShadow: "2px 0 var(--neon-amber), -2px 0 var(--neon-cyan), 0 0 12px var(--neon-red)",
                  letterSpacing: "0.4em",
                  fontSize: "0.875rem",
                  fontWeight: 800,
                }}
              >
                ▸ DECRYPTING ACCESS…
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DossierFolder;
