"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { FormatFullTimeStamp } from "../date-format";
import { Badge } from "../ui/badge";
import Image from "next/image";

const ParallaxLayout = ({ data, children }: any) => {
  const { title, tags, date, cover = "", stylesheet } = data;

  const article = React.useRef("main_article");

  return (
    <section className="main-article mb-0.25 max-w-full">
      <div className="group max-w-full relative overflow-hidden no-overlay">
        <div
          className={cn(
            "css-parallax bg-cover bg-center bg-no-repeat lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] rounded-2xl content-overlay group-hover:filter-none",
            data.filter
          )}
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent from-35% to-black/90 px-8 py-10 rounded-2xl">
          <div className="flex flex-col justify-end h-full">
            <h1 className="text-4xl text-custom-brown-text font-bold">
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full bg-custom-brown dark:bg-[#252525] rounded-2xl py-5">
        <article className={"article-grid prose max-w-none dark:prose-invert "}>
          {children}
        </article>
      </div>
    </section>
  );
};

export default ParallaxLayout;
