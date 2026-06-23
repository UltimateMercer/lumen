const cache = new Map<string, Record<string, unknown>>();

export async function getSerializedMdx(
  slug: string,
  mdx: string,
): Promise<Record<string, unknown> | null> {
  if (cache.has(slug)) return cache.get(slug)!;

  try {
    const res = await fetch("/api/mdx/serialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mdx }),
    });
    if (!res.ok) return null;
    const { mdxSource } = await res.json();
    cache.set(slug, mdxSource);
    return mdxSource;
  } catch {
    return null;
  }
}

export async function getSerializedBatch(
  slug: string,
  mdx: string,
  items: Array<{ slug: string; mdx: string }>,
): Promise<{
  mdxSource: Record<string, unknown>;
  itemSources: Record<string, Record<string, unknown>>;
} | null> {
  const cacheKey = `batch:${slug}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)! as any;

  try {
    const res = await fetch("/api/mdx/serialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mdx, items }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    cache.set(cacheKey, data);
    return data;
  } catch {
    return null;
  }
}
