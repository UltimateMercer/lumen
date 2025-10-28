"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { FormatFullTimeStamp } from "../date-format";
import { Badge } from "../ui/badge";

const PortraitLayout = ({ data, children }: any) => {
  const { title, tags, date, cover = "", stylesheet } = data;

  const article = React.useRef("main_article");

  return (
    <section
      id={article.current}
      className={cn("main-article mb-0.25 max-w-full ")}
    >
      <div className="group relative max-w-full min-h-[650px] overflow-hidden flex gap-0.25 rounded-2xl mb-0.25">
        <div
          className={cn(
            "w-1/2 bg-cover bg-center bg-no-repeat rounded-2xl lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] no-overlay content-overlay group-hover:filter-none",
            data.filter
          )}
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
        <div className="w-1/2 bg-custom-brown dark:bg-[#252525] rounded-2xl"></div>
        <div className="absolute top-0 bottom-0 left-0 right-0 px-8 py-14 z-[2]">
          <div className="flex flex-col justify-center h-full lg:max-w-[712px] max-w-full mx-auto">
            <h1 className="text-4xl text-center text-[#121212] dark:text-custom-brown-text font-bold leading-[1.75]">
              <span className="marker-line py-1.5 bg-custom-brown dark:bg-[#252525] rounded-xl border border-[#121212] dark:border-custom-brown">
                {" "}
                {title}
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full bg-custom-brown dark:bg-[#252525] rounded-2xl py-8">
        <article className={"article-grid prose max-w-none dark:prose-invert "}>
          {children}
        </article>
      </div>
    </section>
  );
};

export default PortraitLayout;
