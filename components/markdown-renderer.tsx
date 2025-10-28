"use client";

import { useMemo } from "react";

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function MarkdownRenderer({ content }: { content: string }) {
  const html = useMemo(() => {
    return (
      content
        // Code blocks
        .replace(
          /```(\w+)?\n([\s\S]*?)```/g,
          '<pre class="bg-gray-900 text-green-400 p-4 rounded mb-4 overflow-x-auto"><code>$2</code></pre>'
        )
        // Headers with IDs for TOC
        .replace(/^### (.*)$/gm, (match, title) => {
          const slug = createSlug(title);
          return `<h3 id="${slug}" class="text-xl font-bold mb-3 mt-6 text-gray-800 scroll-mt-20">${title}</h3>`;
        })
        .replace(/^## (.*)$/gm, (match, title) => {
          const slug = createSlug(title);
          return `<h2 id="${slug}" class="text-2xl font-bold mb-4 mt-8 text-gray-800 scroll-mt-20">${title}</h2>`;
        })
        .replace(
          /^# (.*)$/gm,
          '<h1 class="text-3xl font-bold mb-6 text-gray-800">$1</h1>'
        )
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
        )
        .replace(/^- (.*)$/gm, '<li class="ml-6 list-disc">$1</li>')
        .replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul class="mb-4">$1</ul>')
        .replace(
          /^(?!<[h|u|p|l])(.*?)$/gm,
          '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>'
        )
        .replace(/<p><\/p>/g, "")
    );
  }, [content]);

  return (
    <div
      className="prose max-w-none"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
