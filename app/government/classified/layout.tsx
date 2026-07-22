import { AuthGuard } from "@/components/auth-guard";

export default function ClassifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireGovernment>
      <main className="bg-[#eaeaea] dark:bg-[#252525] rounded-xs lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)]">
        {children}
      </main>
    </AuthGuard>
  );
}
