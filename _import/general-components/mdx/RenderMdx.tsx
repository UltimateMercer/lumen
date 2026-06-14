"use client";
import { MDXRemote } from "next-mdx-remote";
import { mdxComponents } from "./MdxComponents";

export function RenderMdx({ source }: { source?: Record<string, unknown> }) {
  if (!source) return null;
  return <MDXRemote {...(source as any)} components={mdxComponents as Record<string, React.ComponentType<any>>} />;
}
