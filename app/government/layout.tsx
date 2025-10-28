import { BaseLayout } from "@/components/base-layout";

export default function GovLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
      <div
        id="padding"
        className="lg:block hidden w-full h-full p-2 fixed z-2 top-0 left-0 pointer-events-none"
      >
        <div className="w-full h-full border border-[#121212] dark:border-[#eaeaea]"></div>
      </div>
      <div
        id="frame"
        className="lg:block hidden w-full h-screen fixed top-0 right-0 z-3 background-frame "
      ></div>
    </>
  );
}
