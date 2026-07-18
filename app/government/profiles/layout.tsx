import { AuthGuard } from "@/components/auth-guard";

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireGovernment>
      <main className="lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)]">
        {children}
      </main>
    </AuthGuard>
  );
}
