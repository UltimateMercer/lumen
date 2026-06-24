"use client";

import Link from "next/link";

interface DocumentNavigatorProps {
  slugs: string[];
  currentSlug: string;
  basePath: string;
}

export function DocumentNavigator({
  slugs,
  currentSlug,
  basePath,
}: DocumentNavigatorProps) {
  if (slugs.length <= 1) return null;

  const currentIndex = slugs.indexOf(currentSlug);
  if (currentIndex === -1) return null;

  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  return (
    <>
      <span className="text-xs font-mono text-muted-foreground">
        DOCUMENTO {currentIndex + 1} DE {slugs.length}
      </span>

      <div className="flex gap-2">
        {prevSlug ? (
          <Link
            href={`${basePath}/${prevSlug}`}
            className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
          >
            ← ANTERIOR
          </Link>
        ) : (
          <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
            ← ANTERIOR
          </span>
        )}
        {nextSlug ? (
          <Link
            href={`${basePath}/${nextSlug}`}
            className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
          >
            PRÓXIMO →
          </Link>
        ) : (
          <span className="rounded-xs border dark:border-[#eaeaea]/30 border-[#252525]/30 bg-transparent px-3 py-1.5 text-xs font-mono text-muted-foreground opacity-30 cursor-not-allowed">
            PRÓXIMO →
          </span>
        )}
      </div>
    </>
  );
}
