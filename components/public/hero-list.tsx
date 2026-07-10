"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSortedHeroes } from "@/lib/archive/hero-sort";
import type { PopularityEntry } from "@/lib/archive/hero-sort";
import { HeroCard } from "@/components/public/hero-card";
import { PermitCardPublicView } from "@/components/documents/templates/permit-card-public-view";
import type { ArchiveDocument } from "@/lib/archive/documents";

const TIER_ORDER = ["S", "A", "B", "C", "D", "E", "F"] as const;

interface HeroListProps {
  heroes: ArchiveDocument[];
  popularityOrder: PopularityEntry[];
}

export function HeroList({ heroes, popularityOrder }: HeroListProps) {
  const [sortBy, setSortBy] = useState<"tier" | "popularity">("tier");

  const sorted = getSortedHeroes(heroes, null, sortBy, popularityOrder);
  const displayed = sortBy === "popularity" ? sorted.slice(0, 20) : sorted;

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

      {displayed.length === 0 ? (
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-xs p-12 text-center">
          <p className="text-muted-foreground/50 text-sm">
            Nenhum herói registrado.
          </p>
        </div>
      ) : sortBy === "popularity" ? (
        <div className="space-y-3">
          {displayed.map((doc, i) => {
            const fm = doc.frontmatter as unknown as Record<string, unknown>;
            const entry = popularityOrder.find(
              (e) => e.slug === doc.frontmatter.slug,
            );
            return (
              <Dialog key={doc.frontmatter.slug}>
                <DialogTrigger asChild>
                  <HeroCard
                    variant="rank"
                    rank={i + 1}
                    name={fm.registryName as string}
                    id={fm.id as string}
                    tier={fm.tier as string}
                    slug={doc.frontmatter.slug}
                    votes={entry?.votes}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 sm:p-2">
                  <PermitCardPublicView doc={doc} />
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      ) : (
        <>
          {TIER_ORDER.map((tier) => {
            const tierDocs = displayed.filter(
              (d) =>
                ((d.frontmatter as unknown as Record<string, unknown>).tier as string) ===
                tier,
            );
            if (tierDocs.length === 0) return null;

            return (
              <section key={tier} className="mb-8">
                <h2 className="text-xl font-bold mb-3">Tier {tier}</h2>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {tierDocs.map((doc) => {
                    const fm = doc.frontmatter as unknown as Record<
                      string,
                      unknown
                    >;
                    return (
                      <Dialog key={doc.frontmatter.slug}>
                        <DialogTrigger asChild>
                          <HeroCard
                            variant="tier"
                            name={fm.registryName as string}
                            id={fm.id as string}
                            tier={fm.tier as string}
                            slug={doc.frontmatter.slug}
                          />
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 sm:p-2">
                          <PermitCardPublicView doc={doc} />
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </>
      )}
    </>
  );
}
