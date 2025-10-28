"use client";

import { useRouter, useParams } from "next/navigation";
import { GovernmentDashboard } from "@/components/government-dashboard";
import { AuthGuard } from "@/components/auth-guard";
import { useAuthStore } from "@/store/auth-store";

export default function GovernmentSectionPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const section = params.section as string;

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <AuthGuard requireGovernment>
      {user && (
        <GovernmentDashboard
          user={user}
          onLogout={handleBack}
          section={section}
        />
      )}
    </AuthGuard>
  );
}
