import defaultMdxComponents from "fumadocs-ui/mdx";
import Heading from "@/components/mdx/heading";

export const mdxCustomComponents = {
  ...defaultMdxComponents,
  h1: (props: any) => (
    <Heading as="h1" className="mt-6 mb-4 font-bold" {...props} />
  ),
  h2: (props: any) => (
    <Heading as="h2" className="mt-6 mb-4 font-bold" {...props} />
  ),
  h3: (props: any) => (
    <Heading as="h3" className="mt-4 mb-3 font-semibold" {...props} />
  ),
  h4: (props: any) => (
    <Heading as="h4" className="mt-3 mb-2 font-semibold" {...props} />
  ),
  h5: (props: any) => <Heading as="h5" className="mt-2 mb-2" {...props} />,
  h6: (props: any) => <Heading as="h6" className="mt-2 mb-1" {...props} />,

  // h1: createHeading("h1", "text-4xl font-bold mt-8 mb-4"),
  // h2: createHeading("h2", "text-3xl font-semibold mt-6 mb-3"),
  // h3: createHeading("h3", "text-2xl font-medium mt-4 mb-2"),
  // h4: createHeading("h4", "text-xl font-medium mt-3 mb-2"),
  // h5: createHeading("h5", "text-lg font-medium mt-2 mb-2"),
  // h6: createHeading("h6", "text-base font-medium mt-2 mb-1"),
};
