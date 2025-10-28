// "use client";

// import { useCallback, useEffect, useRef } from "react";

// import { cn } from "@/lib/utils";

// // const morphTime = 1.5;
// // const cooldownTime = 0.5;

// const morphTime = 1.5;
// const cooldownTime = 4.0;

// const useMorphingText = (texts: string[]) => {
//   const textIndexRef = useRef(0);
//   const morphRef = useRef(0);
//   const cooldownRef = useRef(0);
//   const timeRef = useRef(new Date());

//   const text1Ref = useRef<HTMLSpanElement>(null);
//   const text2Ref = useRef<HTMLSpanElement>(null);

//   const setStyles = useCallback(
//     (fraction: number) => {
//       const [current1, current2] = [text1Ref.current, text2Ref.current];
//       if (!current1 || !current2) return;

//       current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//       current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

//       const invertedFraction = 1 - fraction;
//       current1.style.filter = `blur(${Math.min(
//         8 / invertedFraction - 8,
//         100
//       )}px)`;
//       current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

//       current1.textContent = texts[textIndexRef.current % texts.length];
//       current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
//     },
//     [texts]
//   );

//   const doMorph = useCallback(() => {
//     morphRef.current -= cooldownRef.current;
//     cooldownRef.current = 0;

//     let fraction = morphRef.current / morphTime;

//     if (fraction > 1) {
//       cooldownRef.current = cooldownTime;
//       fraction = 1;
//     }

//     setStyles(fraction);

//     if (fraction === 1) {
//       textIndexRef.current++;
//     }
//   }, [setStyles]);

//   const doCooldown = useCallback(() => {
//     morphRef.current = 0;
//     const [current1, current2] = [text1Ref.current, text2Ref.current];
//     if (current1 && current2) {
//       current2.style.filter = "none";
//       current2.style.opacity = "100%";
//       current1.style.filter = "none";
//       current1.style.opacity = "0%";
//     }
//   }, []);

//   useEffect(() => {
//     let animationFrameId: number;

//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);

//       const newTime = new Date();
//       const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
//       timeRef.current = newTime;

//       cooldownRef.current -= dt;

//       if (cooldownRef.current <= 0) doMorph();
//       else doCooldown();
//     };

//     animate();
//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [doMorph, doCooldown]);

//   return { text1Ref, text2Ref };
// };

// interface MorphingTextProps {
//   className?: string;
//   texts: string[];
// }

// const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
//   const { text1Ref, text2Ref } = useMorphingText(texts);
//   return (
//     <>
//       <span
//         className="absolute inset-x-0 top-0 inline-block w-full"
//         ref={text1Ref}
//       />
//       <span
//         className="absolute inset-x-0 top-0 inline-block w-full"
//         ref={text2Ref}
//       />
//     </>
//   );
// };

// const SvgFilters: React.FC = () => (
//   <svg
//     id="filters"
//     className="fixed h-0 w-0"
//     preserveAspectRatio="xMidYMid slice"
//   >
//     <defs>
//       <filter id="threshold">
//         <feColorMatrix
//           in="SourceGraphic"
//           type="matrix"
//           values="1 0 0 0 0
//                   0 1 0 0 0
//                   0 0 1 0 0
//                   0 0 0 255 -120"
//         />
//       </filter>
//     </defs>
//   </svg>
// );

// export const MorphingText: React.FC<MorphingTextProps> = ({
//   texts,
//   className,
// }) => (
//   <div
//     className={cn(
//       "flex relative w-full font-sans font-bold leading-none [filter:url(#threshold)_blur(0.6px)] text-4xl",
//       className
//     )}
//   >
//     <Texts texts={texts} />
//     <SvgFilters />
//   </div>
// );

// SOLUÇÃO: Aplicar filtros apenas durante a transição

"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.0;
const cooldownTime = 3.0;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const containerRef = useRef<HTMLDivElement>(null); // Referência para o container

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      const container = containerRef.current;
      if (!current1 || !current2 || !container) return;

      // APLICAR FILTROS APENAS DURANTE A TRANSIÇÃO
      if (fraction > 0 && fraction < 1) {
        // Em transição: aplicar blur e filtros
        container.style.filter = "url(#threshold) blur(0.3px)";

        current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        const invertedFraction = 1 - fraction;
        current1.style.filter = `blur(${Math.min(
          8 / invertedFraction - 8,
          100
        )}px)`;
        current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;
      } else {
        // Parado: remover todos os filtros para texto limpo
        container.style.filter = "none";

        if (fraction === 0) {
          // Mostrar texto atual limpo
          current1.style.filter = "none";
          current1.style.opacity = "100%";
          current2.style.filter = "none";
          current2.style.opacity = "0%";
        } else {
          // Mostrar próximo texto limpo
          current1.style.filter = "none";
          current1.style.opacity = "0%";
          current2.style.filter = "none";
          current2.style.opacity = "100%";
        }
      }

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts]
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    const container = containerRef.current;

    if (current1 && current2 && container) {
      // Estado parado: texto completamente limpo
      container.style.filter = "none";
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref, containerRef };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 inline-block w-full antialiased"
        style={{ textRendering: "optimizeLegibility" }}
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 inline-block w-full antialiased"
        style={{ textRendering: "optimizeLegibility" }}
        ref={text2Ref}
      />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold" colorInterpolationFilters="sRGB">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -120"
        />
      </filter>
    </defs>
  </svg>
);

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => {
  const { text1Ref, text2Ref, containerRef } = useMorphingText(texts);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full font-sans font-bold leading-none text-4xl antialiased",
        // Remove filtros do CSS - serão aplicados via JavaScript apenas durante transições
        className
      )}
    >
      <span className="block invisible">
        {texts.reduce((longest, current) =>
          current.length > longest.length ? current : longest
        )}
      </span>
      <div className="absolute inset-0">
        <span
          className="absolute inset-x-0 top-0 inline-block w-full antialiased"
          style={{ textRendering: "optimizeLegibility" }}
          ref={text1Ref}
        />
        <span
          className="absolute inset-x-0 top-0 inline-block w-full antialiased"
          style={{ textRendering: "optimizeLegibility" }}
          ref={text2Ref}
        />
      </div>
      <SvgFilters />
    </div>
  );
};
