"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginScreen } from "@/components/login-screen";
import { GovernmentLoginModal } from "@/components/government-login-modal";
import { useAuthStore } from "@/store/auth-store";

import { MenuSection } from "@/components/menu";
import { Presentation } from "@/components/presentation";
import { PublicDashboard } from "@/components/public-dashboard";
import Ticker from "@/components/ticker-component";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, login, loginGovernment } = useAuthStore();
  const [showGovModal, setShowGovModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "g") {
        e.preventDefault();
        setShowGovModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogin = (username: string, password: string) => {
    login(username, password);
    router.push("/home");
  };

  const handleGovLogin = (username: string, password: string) => {
    loginGovernment(username, password);
    setShowGovModal(false);
    router.push("/home");
  };
  return (
    <>
      <LoginScreen
        onLogin={handleLogin}
        onOpenGovernmentLogin={() => setShowGovModal(true)}
      />
      {showGovModal && (
        <GovernmentLoginModal
          onLogin={handleGovLogin}
          onClose={() => setShowGovModal(false)}
        />
      )}
      {/* <Presentation />
      <Ticker />
      <div className="p-4 rounded-xs bg-[#eaeaea] dark:bg-[#252525]">
      </div> */}
    </>
  );
}
