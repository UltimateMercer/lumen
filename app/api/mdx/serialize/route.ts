import { serialize } from "next-mdx-remote/serialize";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { mdx, items } = await req.json();
    if (!mdx || typeof mdx !== "string") {
      return NextResponse.json({ error: "mdx string required" }, { status: 400 });
    }

    const mdxSource = await serialize(mdx);

    let itemSources: Record<string, Record<string, unknown>> | undefined;
    if (items && Array.isArray(items)) {
      const results = await Promise.all(
        items.map(async (item: { slug: string; mdx: string }) => {
          const source = await serialize(item.mdx);
          return { slug: item.slug, source };
        }),
      );
      itemSources = Object.fromEntries(results.map((r) => [r.slug, r.source]));
    }

    return NextResponse.json({ mdxSource, itemSources });
  } catch (err) {
    console.error("MDX serialization failed:", err);
    return NextResponse.json({ error: "serialization failed" }, { status: 500 });
  }
}
