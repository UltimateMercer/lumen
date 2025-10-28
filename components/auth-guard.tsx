"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireGovernment?: boolean;
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireGovernment = false,
}: AuthGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/");
      return;
    }

    if (requireGovernment && user?.accessLevel !== "government") {
      router.push("/home");
      return;
    }
  }, [isAuthenticated, user, requireAuth, requireGovernment, router]);

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground font-mono">VERIFICANDO ACESSO...</div>
      </div>
    );
  }

  if (requireGovernment && user?.accessLevel !== "government") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground font-mono">ACESSO NEGADO</div>
      </div>
    );
  }

  return <>{children}</>;
}
