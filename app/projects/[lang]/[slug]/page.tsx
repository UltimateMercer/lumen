import { notFound } from "next/navigation";
import { mdxCustomComponents } from "@/components/mdx-custom-components";
import { allProjects } from "@/lib/source";
import { MdxWithLayout } from "@/components/mdx-with-layout";

type Props = {
  params: Promise<{
    lang: "en-us" | "pt-br";
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projectsRaw = await allProjects.getPages();
  console.log(
    "GENERATE STATIC PARAMS",
    projectsRaw.map((p: any) => ({
      lang: p.data.lang,
      slug: p.url,
    }))
  );

  return projectsRaw.map((p: any) => {
    // Extrai o slug usando regex - pega tudo após o último /
    const slug = p.url.match(/\/([^\/]+)$/)?.[1] || "";
    console.log("SLUG", slug);
    return {
      lang: p.data.lang,
      slug: slug,
    };
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: any
): Promise<any> {
  const { lang, slug } = await params;

  const project = (await allProjects.getPage([lang, slug])) as any;

  const frontmatter = {
    title: project.data.title,
    description: project.data.description,
    imageHeader: project.data.imageHeader,
    cover: project.data.cover,
    date: project.data.date,
    modifiedDate: project.data.modifiedDate,
    channel: project.data.channel,
    category: project.data.category,
    tags: project.data.tags,
    layout: project.data.layout,
    filter: project.data.filter,
    draft: project.data.draft,
    authors: project.data.authors,
    gallery: project.data.gallery,
    lang: project.data.lang,
    url: project.url,
  };

  const image = frontmatter.imageHeader
    ? frontmatter.imageHeader
    : frontmatter.cover
    ? frontmatter.cover
    : "/images/ultimate-mercer-base.jpg";

  return {
    title: frontmatter?.title,
    authors: [{ name: "Ultimate Mercer" }, { name: "Julian Silva da Cunha" }],
    description: frontmatter?.description,
    openGraph: {
      title: frontmatter?.title,
      description: frontmatter?.description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter?.title,
      description: frontmatter?.description,
      images: image,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang: "en-us" | "pt-br" }>;
}) {
  const { slug, lang } = await params;

  const project = (await allProjects.getPage([lang, slug])) as any;

  if (!project) notFound();

  const frontmatter = {
    title: project.data.title,
    description: project.data.description,
    imageHeader: project.data.imageHeader,
    cover: project.data.cover,
    date: project.data.date,
    modifiedDate: project.data.modifiedDate,
    channel: project.data.channel,
    category: project.data.category,
    tags: project.data.tags,
    layout: project.data.layout,
    filter: project.data.filter,
    draft: project.data.draft,
    authors: project.data.authors,
    gallery: project.data.gallery,
    lang: project.data.lang,
    url: project.url,
  };
  const Mdx = project.data.body;

  return (
    <>
      <MdxWithLayout data={frontmatter}>
        <Mdx components={mdxCustomComponents} />
      </MdxWithLayout>
      {/* <section className="bg-custom-brown dark:bg-[#252525] border-b border-[#121212] dark:border-custom-brown rounded-2xl">
        <div className="container mx-auto max-w-3xl rounded-xl py-12 md:px-8 dark:text-custom-brown-text text-[#121212]">
          <h1 className="mb-2 text-3xl font-bold">{project.data.title}</h1>
          <p className="mb-4 text-fd-muted-foreground">
            {project.data.description}
          </p>
          <Link href="/projects">Back</Link>
        </div>
        <article className="container mx-auto max-w-3xl flex flex-col px-4 py-8 dark:text-custom-brown-text text-[#121212]">
          <div className="prose min-w-0">
            <InlineTOC items={project.data.toc} />
            <Mdx components={defaultMdxComponents} />
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <div>
              <p className="mb-1 text-fd-muted-foreground">Written by</p>
              <p className="font-medium">{project.data.author}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
              <p className="font-medium">
                {new Date(project.data.date).toDateString()}
              </p>
            </div>
          </div>
        </article>
      </section> */}
    </>
  );
}
