"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/loading-screen";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

import { IndividualsSection } from "@/components/government/individuals-section";
import { ClassifiedSection } from "@/components/government/classified-section";
import { MissionsSection } from "@/components/government/missions-section";
import { IncidentsSection } from "@/components/government/incidents-section";

interface GovernmentDashboardProps {
  user: { username: string; accessLevel: string };
  onLogout: () => void;
  section: string;
}

export function GovernmentDashboard({
  user,
  onLogout,
  section,
}: GovernmentDashboardProps) {
  const sectionMap: Record<string, string> = {
    classified: "sigiloso",
    profiles: "individuos",
    missions: "missoes",
    incidents: "incidentes",
  };

  const [activeSection, setActiveSection] = useState<string>(
    sectionMap[section] || section
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: "sigiloso", name: "INFORMAÇÕES SIGILOSAS", icon: "🔒" },
    { id: "individuos", name: "INDIVÍDUOS DE DESTAQUE", icon: "👤" },
    { id: "missoes", name: "RELATÓRIOS DE MISSÕES", icon: "📋" },
    { id: "incidentes", name: "REGISTRO DE INCIDENTES", icon: "⚠️" },
  ];

  const getSectionContent = () => {
    const closeSidebar = () => setIsSidebarOpen(false);

    switch (activeSection) {
      case "individuos":
        return IndividualsSection({ onCloseMobileSidebar: closeSidebar });
      case "sigiloso":
        return ClassifiedSection({ onCloseMobileSidebar: closeSidebar });
      case "missoes":
        return MissionsSection({ onCloseMobileSidebar: closeSidebar });
      case "incidentes":
        return IncidentsSection({ onCloseMobileSidebar: closeSidebar });
      default:
        return {
          sidebar: null,
          content: (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">📁</div>
                <div className="text-xl font-bold text-foreground">
                  SEÇÃO NÃO ENCONTRADA
                </div>
              </div>
            </div>
          ),
        };
    }
  };

  const { sidebar, content } = getSectionContent();

  if (isLoading) {
    return (
      <LoadingScreen
        section={sections.find((s) => s.id === activeSection)?.name || ""}
      />
    );
  }

  return (
    <div className="h-full">
      {isMobile && (
        <div className="sticky top-0 z-10 bg-background border-b border-foreground p-3">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            variant="outline"
            size="sm"
            className="border-2 border-foreground"
          >
            <Menu className="w-4 h-4 mr-2" />
            <span className="text-xs font-mono font-bold">MENU</span>
          </Button>
        </div>
      )}

      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent
            side="left"
            className="w-[280px] p-0 border-2 border-foreground"
          >
            <SheetHeader className="p-4 border-b border-foreground">
              <SheetTitle className="text-sm font-mono font-bold">
                {sections.find((s) => s.id === activeSection)?.name}
              </SheetTitle>
            </SheetHeader>
            <div className="p-2 overflow-y-auto h-[calc(100vh-80px)]">
              {sidebar}
            </div>
          </SheetContent>
        </Sheet>
      )}

      <div className="grid md:grid-cols-[250px_1fr] gap-px h-full">
        {!isMobile && (
          <div className="sticky lg:h-[calc(100vh-65px)] h-[calc(100vh-56px)] lg:top-[57px] top-12 p-2 bg-[#eaeaea] dark:bg-[#252525] overflow-y-auto rounded-xs">
            {sidebar}
          </div>
        )}

        <main className="bg-[#eaeaea] dark:bg-[#252525] p-4 lg:min-h-[calc(100vh-65px)] min-h-[calc(100vh-56px)]">
          {content}
        </main>
      </div>
    </div>
  );
}
