"use client";
import { Footer } from "./footer";
import { Header } from "./header";

// https://fumadocs.dev/blog/make-a-blog

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full lg:p-[9px] flex flex-col relative rounded-b-lg bg-[#252525] dark:bg-[#eaeaea] main-background">
      <Header />
      <main className="w-full relative flex flex-col flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
