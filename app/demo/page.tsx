import { NexusFormatDate } from "@/components/individual-layouts/general-components/nexus-format-date";

export default function DemoPage() {
  return (
    <div className="w-full bg-[#eaeaea] dark:bg-[#252525] no-overlay p-5">
      <div className="max-w-5xl mx-auto flex items-end gap-2.5 mb-4 p-6 background-foreground background-texture shadow-2xl">
        <div className="w-full flex flex-col items-end gap-2 pb-2">
          <div className="w-full h-2.5 bg-blue-500"></div>
          <div className="w-full h-2.5 bg-blue-500"></div>
          <div className="w-full h-2.5 bg-blue-500"></div>
        </div>
        {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
        <div className="">
          <h1 className="text-8xl font-extrabold font-serif italic">Tribuna</h1>
          <h5 className="text-lg font-serif italic text-right">da Aurora</h5>
        </div>
        <div className="w-full flex flex-col items-end gap-2 pb-2">
          <div className="w-full h-2.5 bg-blue-500"></div>
          <div className="w-full h-2.5 bg-blue-500"></div>
          <div className="w-full h-2.5 bg-blue-500"></div>
        </div>
        {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
      </div>
      <div className="max-w-5xl mx-auto flex items-center gap-2.5 border-y-8 border-destructive mb-4">
        <div className="w-full flex flex-col items-end gap-4">
          <div className="w-full h-6 bg-destructive"></div>
          <div className="w-full h-6 bg-destructive"></div>
          <div className="w-full h-6 bg-destructive"></div>
        </div>
        {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
        <div className="">
          <h1 className="text-8xl font-extrabold font-serif italic leading-none">
            Tribuna
          </h1>
          <h5 className="text-xl font-serif italic text-right">da Aurora</h5>
        </div>
        <div className="w-full flex flex-col items-end gap-4">
          <div className="w-full h-6 bg-destructive"></div>
          <div className="w-full h-6 bg-destructive"></div>
          <div className="w-full h-6 bg-destructive"></div>
        </div>
        {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
      </div>
      <div className="max-w-5xl mx-auto flex items-end gap-2.5 mb-4">
        <div className="w-full flex flex-col items-end gap-2 pb-2">
          <div className="w-full h-5 bg-yellow-500"></div>
          <div className="w-full h-5 bg-yellow-500"></div>
        </div>
        {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
        <div className="">
          <h1 className="text-8xl font-extrabold font-serif italic">Tribuna</h1>
          <h5 className="text-lg font-serif italic text-right">da Aurora</h5>
        </div>
        <div className="w-full flex flex-col items-end gap-2 pb-2">
          <div className="w-full h-5 bg-yellow-500"></div>
          <div className="w-full h-5 bg-yellow-500"></div>
        </div>
        {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
      </div>
      <div className="max-w-5xl mx-auto p-8 mb-4 background-foreground border border-foreground background-texture shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="font-serif font-semibold text-lg tracking-wide uppercase">
            Segunda-feira, {NexusFormatDate("18-Solaris-1245")}
          </div>
          <div className="font-serif font-semibold text-lg tracking-wide uppercase">
            Edição Nº 1223
          </div>
        </div>

        <div className="flex items-center gap-4 border-y-8 border-blue-800">
          <div className="w-full flex flex-col items-end gap-2">
            <div className="w-full h-5 bg-yellow-500"></div>
            <div className="w-full h-5 bg-yellow-500"></div>
          </div>
          {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
          <div className="flex-1 my-3">
            <h1 className="lg:text-6xl md:text-4xl text-2xl font-extrabold font-serif uppercase whitespace-nowrap">
              Normandy Times
            </h1>
          </div>
          <div className="w-full flex flex-col items-end gap-2">
            <div className="w-full h-5 bg-yellow-500"></div>
            <div className="w-full h-5 bg-yellow-500"></div>
          </div>
          {/* <div className="w-full h-4 bg-blue-500 mb-4"></div> */}
        </div>

        <div className="bg-muted-foreground w-full h-40 my-4"></div>
      </div>
    </div>
  );
}
