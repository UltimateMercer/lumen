"use client";
import type React from "react";
import { Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GenericItem, FieldConfig } from "./toc-for-pages";
import { FormatMonthYear } from "./date-format";
import { useLanguageStore } from "@/store/useLanguageStore";
import type { LanguageStore } from "@/utils/interfaces";

interface TableOfContentsContentProps<T extends GenericItem> {
  data: T[];
  fields: FieldConfig | any;
  title: string;
  subtitle: string;
  // formatDate: (date: string) => string;
  getItemId: (item: T) => string;
  getNested: (obj: any, path?: string) => any;
  renderCustomContent?: (item: T) => React.ReactNode;
  type?: string;
}

export function TableOfContentsContent<T extends GenericItem>({
  data,
  fields,
  // formatDate,
  getItemId,
  getNested,
  renderCustomContent,
  type = "",
}: TableOfContentsContentProps<T>) {
  const { language } = useLanguageStore() as LanguageStore;

  return (
    <main className="flex-1 space-y-0.25 mb-0.25">
      {data.map((it, i) => {
        if (type === "experiences") {
          const id = getItemId(it);
          const titleTxt = getNested(it, fields.title);
          const subTxt = getNested(it, fields.subtitle);
          const desc = getNested(it, fields.description);
          const start = getNested(it, fields.startDate);
          const end = getNested(it, fields.endDate);
          const img = getNested(it, fields.image);
          const tagArr = getNested(it, fields.tags) || [];

          return (
            <section key={i} id={id} className="">
              <div className="bg-custom-brown dark:bg-[#252525] text-[#121212] dark:text-custom-brown-text border-0 px-12 py-32 rounded-2xl flex gap-5">
                <img
                  src={img || "/images/ultimate-mercer-base.jpg"}
                  alt={`${titleTxt} logo`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-5">
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-3">{titleTxt}</h2>
                    {subTxt && (
                      <p className="text-lg font-medium text-primary">
                        {subTxt}
                      </p>
                    )}

                    {fields.startDate && (
                      <div className="flex items-center gap-2 text-base text-gray-600 mt-2">
                        <Calendar className="w-5 h-5" />
                        {FormatMonthYear({ date: start })}
                        {end
                          ? ` - ${FormatMonthYear({ date: end })}`
                          : ` - ${
                              language === "pt-br"
                                ? "em andamento"
                                : "in progress"
                            }`}
                      </div>
                    )}
                  </div>

                  {desc && (
                    <div className="mb-6">
                      <p className="text-gray-700">{desc}</p>
                    </div>
                  )}

                  {Array.isArray(tagArr) && tagArr.length > 0 && (
                    <div className="mb-6">
                      {/* <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Tags
                    </h4> */}
                      <div className="flex flex-wrap gap-2">
                        {tagArr.map((t: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {renderCustomContent && renderCustomContent(it)}
                </div>
              </div>
            </section>
          );
        }

        if (type === "educations") {
          const id = getItemId(it);
          const instituteTxt = getNested(it, fields.institute);
          const courseTxt = getNested(it, fields.course);
          const status = getNested(it, fields.status);
          const img = getNested(it, fields.image);
          return (
            <section key={i} id={id}>
              <div className="bg-custom-brown dark:bg-[#252525] text-[#121212] dark:text-custom-brown-text border-0 px-12 py-32 rounded-2xl flex gap-5">
                <img
                  src={img || "/images/ultimate-mercer-base.jpg"}
                  alt={`${instituteTxt} logo`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-5">
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold mb-3">{instituteTxt}</h2>
                    <p className="text-lg font-medium text-primary">
                      {courseTxt}
                    </p>
                    <p className="text-lg font-medium text-primary">{status}</p>
                  </div>
                </div>
              </div>
            </section>
          );
        }
      })}
    </main>
  );
}
