"use client";
import dynamic from "next/dynamic";
import { mdxComponents } from "./mdx-components";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false },
);

export function RenderMdx({ source }: { source?: Record<string, unknown> }) {
  if (!source) return null;
  return <MDXRemote {...(source as any)} components={mdxComponents as Record<string, React.ComponentType<any>>} />;
}
