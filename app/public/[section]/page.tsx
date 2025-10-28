"use client";

import { useRouter, useParams } from "next/navigation";
import { PublicDashboard } from "@/components/public-dashboard";
import { AuthGuard } from "@/components/auth-guard";
import { useAuthStore } from "@/store/auth-store";

export default function PublicSectionPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const section = params.section as string;

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <AuthGuard>
      {user && (
        <PublicDashboard user={user} onLogout={handleBack} section={section} />
      )}
    </AuthGuard>
  );
}
