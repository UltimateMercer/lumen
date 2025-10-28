"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { FormatFullTimeStamp } from "../date-format";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
const FullpageLayout = ({ data, children }: any) => {
  const { title, tags, date, cover = "", stylesheet } = data;
  const { language } = useLanguageStore() as LanguageStore;

  const article = React.useRef("main_article");

  return (
    <section
      className={
        "main-article mb-0.25 max-w-full flex gap-0.25 lg:flex-row flex-col"
      }
    >
      <div className="relative lg:w-[45%] w-full">
        <div className={cn("group sticky z-[2] lg:top-[57px] top-[48px]")}>
          <div className="content-overlay">
            <Image
              src={cover}
              className={cn(
                "w-full max-w-full lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] object-cover rounded-2xl group-hover:filter-none",
                data.filter
              )}
              width={2000}
              height={2000}
              alt={`${title} cover`}
            />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 px-8 py-16 bg-gradient-to-b from-transparent from-30% to-black/90 rounded-2xl">
            <div className="flex flex-col justify-end h-full">
              <h5
                className={cn(
                  "font-semibold tracking-wide text-custom-brown-text mb-2"
                )}
              >
                <FormatFullTimeStamp date={date} locale={language} />
              </h5>
              <h1 className="text-4xl text-custom-brown-text font-bold">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[55%] w-full bg-custom-brown dark:bg-[#252525] rounded-2xl">
        <article
          className={"two-column-article prose max-w-none dark:prose-invert "}
        >
          {children}
          {data.gallery && data.gallery.length > 0 && (
            <Carousel opts={{ loop: true }} className="no-overlay">
              <CarouselContent>
                {data.gallery.map((image: string, index: number) => (
                  <CarouselItem key={index} className="basis-full">
                    <Link href={image} target="_blank">
                      <Image
                        src={image}
                        className={cn(
                          "w-full max-w-full h-[750px] object-contain "
                        )}
                        width={2000}
                        height={2000}
                        alt={`${title} cover`}
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

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
      </div>
    </section>
  );
};

export default FullpageLayout;
