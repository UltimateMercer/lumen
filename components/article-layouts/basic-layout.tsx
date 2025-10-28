"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { FormatFullTimeStamp } from "../date-format";
import { Badge } from "../ui/badge";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

const BasicLayout = ({ data, children }: any) => {
  const { title, tags, date, cover = "", stylesheet } = data;
  const { language } = useLanguageStore() as LanguageStore;

  const article = React.useRef("main_article");

  return (
    <section
      id={article.current}
      className={cn(
        "main-article mb-0.25 max-w-full bg-custom-brown dark:bg-[#252525] rounded-2xl py-10"
      )}
    >
      <div className="max-w-full h-auto ">
        <div className="lg:max-w-[712px] md:max-w-full block mx-auto md:px-0 px-4 text-[#121212] dark:text-custom-brown-text">
          <h5 className={cn("font-semibold tracking-wide")}>
            <FormatFullTimeStamp date={date} locale={language} />
          </h5>
          <h1
            className={cn(
              "md:text-[40px] text-3xl font-bold tracking-tight mb-4"
            )}
          >
            {title}
          </h1>
        </div>
        {cover && (
          <div className="lg:max-w-[1080px] md:max-w-full mx-auto mb-5">
            <picture>
              <source media="(max-width: 768px)" srcSet={cover} />
              <source media="(min-width: 769px)" srcSet={cover} />
              <img
                src={cover}
                className={cn(
                  "w-full max-w-full h-[600px] object-cover rounded-2xl hover:filter-none",
                  data.filter
                )}
                alt={`${title} cover`}
              />
            </picture>
          </div>
        )}
      </div>
      <article className="article-grid text-dark dark:text-light prose max-w-none dark:prose-invert">
        {children}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="capitalize text-xs rounded"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </section>
  );
};

export default BasicLayout;
