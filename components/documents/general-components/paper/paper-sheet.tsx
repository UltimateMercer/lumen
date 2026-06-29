"use client";

export function PaperSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-texture relative mx-auto max-w-3xl border dark:border-[#eaeaea] border-[#252525] p-10 shadow-[0_24px_64px_-32px_oklch(0_0_0/0.6)] md:p-14">
      {children}
    </div>
  );
}
