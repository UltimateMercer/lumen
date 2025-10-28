"use client";
import { socials } from "@/utils/socials";

export default function Ticker() {
  // Duplicate your socials array
  const duplicatedSocials = [...socials, ...socials, ...socials, ...socials];

  return (
    <section className="relative w-full h-[42px] py-0.25 overflow-hidden bg-[#252525] dark:bg-[#eaeaea] flex ticker-container">
      <div className="flex items-center">
        <div className="text-[#eaeaea] dark:text-[#121212] bg-[#252525] dark:bg-[#eaeaea] font-medium pl-5 pr-8 shrink-0">
          Noticias:
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="animate-scroll">
            {duplicatedSocials.map((social, index) =>
              social.link === "" ? null : (
                <a
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={social.link + index}
                  href={social.link}
                  target="_blank"
                  className="text-[#eaeaea] dark:text-[#121212] flex items-center rounded-[2px] h-10 ticker-item px-12 mr-8 font-light"
                >
                  <social.icon className="size-6 mr-2" />
                  {social.name}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
