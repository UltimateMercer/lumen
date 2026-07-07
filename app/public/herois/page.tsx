import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { getAllDocuments } from "@/lib/archive/registry";
import { filterVisibleDocuments } from "@/lib/archive/visibility";

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

      {heroesWithSource.length === 0 ? (
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-xs p-12 text-center">
          <p className="text-muted-foreground/50 text-sm">
            Nenhum herói registrado.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {heroesWithSource.map((doc) => {
            const fm = doc.frontmatter as unknown as Record<string, unknown>;
            const tier = fm.tier as string;

            return (
              <Link
                key={doc.frontmatter.slug}
                href={`/public/herois/${doc.frontmatter.slug}`}
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
      )}
    </main>
  );
}
