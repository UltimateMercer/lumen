import { serialize } from "next-mdx-remote/serialize";
import { getAllDocuments } from "@/lib/archive/registry";
import { filterVisibleDocuments } from "@/lib/archive/visibility";
import popularityOrder from "@/lib/archive/hero-popularity.json";
import { HeroList } from "@/components/public/hero-list";

export default async function HeroisPage() {
  const allDocs = getAllDocuments();
  const heroes = filterVisibleDocuments(
    allDocs.filter((d) => d.frontmatter.type === "permit-card"),
    { accessLevel: "public" },
  );

  const heroesWithSource = await Promise.all(
    heroes.map(async (doc) => ({
      ...doc,
      mdxSource: await serialize(doc.mdx),
    })),
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Registro Público de Heróis</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Heróis registrados oficialmente perante a República de Arcanum
        </p>
      </div>

      <HeroList heroes={heroesWithSource} popularityOrder={popularityOrder} />
    </main>
  );
}
