"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSortedHeroes } from "@/lib/archive/hero-sort";
import type { ArchiveDocument } from "@/lib/archive/documents";

interface HeroListProps {
  heroes: ArchiveDocument[];
  popularityOrder: string[];
}

export function HeroList({ heroes, popularityOrder }: HeroListProps) {
  const [sortBy, setSortBy] = useState<"tier" | "popularity">("tier");

  const sorted = getSortedHeroes(heroes, null, sortBy, popularityOrder);

  return (
    <>
      <div className="mb-6">
        <Tabs
          defaultValue="tier"
          onValueChange={(v) => setSortBy(v as "tier" | "popularity")}
        >
          <TabsList>
            <TabsTrigger value="tier">Por Tier</TabsTrigger>
            <TabsTrigger value="popularity">Por Popularidade</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((doc) => {
          const fm = doc.frontmatter as unknown as Record<string, unknown>;
          const tier = fm.tier as string;

          return (
            <Link
              key={doc.frontmatter.slug}
              href={`/public/heroes/${doc.frontmatter.slug}`}
              className="border-2 border-border rounded-xs p-4 hover:bg-muted transition-colors flex items-center gap-4"
            >
              <div className="w-20 h-20 bg-[#252525] dark:bg-[#eaeaea] flex-shrink-0" />
              <div>
                <div className="text-lg font-bold">
                  {fm.registryName as string}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {fm.id as string}
                </div>
                <div className="text-xs font-bold mt-2 uppercase tracking-wider">
                  Nível {tier}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
