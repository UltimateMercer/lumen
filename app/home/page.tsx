"use client";

import { useRouter } from "next/navigation";
import { HomeScreen } from "@/components/home-screen";
import { AuthGuard } from "@/components/auth-guard";
import { useAuthStore } from "@/store/auth-store";

export default function HomePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleNavigate = (section: string) => {
    if (user?.accessLevel === "government") {
      router.push(`/government/${section}`);
    } else {
      router.push(`/public/${section}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <AuthGuard>
      {user && (
        <HomeScreen
          user={user}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
    </AuthGuard>
  );
}
