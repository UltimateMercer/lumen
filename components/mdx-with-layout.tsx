import dynamic from "next/dynamic";
import { ComponentType, ReactNode } from "react";
// import { MdxCustomComponents } from "@/components/mdx-custom-components";

type LayoutProps = {
  data: any;
  children: ReactNode;
};

const availableLayouts = [
  "fullpage-layout",
  "basic-layout",
  "parallax-layout",
  "portrait-layout",
];

export const MdxWithLayout = ({
  data,
  children,
}: {
  data: any;
  children: any;
}) => {
  console.log(data.layout);

  const selectedLayout = availableLayouts.find((l) => l === data.layout);
  const Layout = dynamic<LayoutProps>(() =>
    import(
      `@/components/article-layouts/${selectedLayout || "basic-layout"}`
    ).then((mod) => mod.default)
  );

  return <Layout data={data}>{children}</Layout>;
};
