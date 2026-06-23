"use client";

import { AuthGuard } from "@/components/auth-guard";

export default function CodexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireGovernment>
      <div className="h-full">
        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)] rounded-xs">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
