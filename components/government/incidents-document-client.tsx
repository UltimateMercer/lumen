"use client";

import { useState, useCallback, type ReactNode } from "react";
import { ClassifiedUnlockAnimation } from "@/components/classified-unlock-animation";

interface IncidentsDocumentClientProps {
  fileName: string;
  classification?: string;
  children: ReactNode;
}

export function IncidentsDocumentClient({
  fileName,
  classification = "CONFIDENCIAL",
  children,
}: IncidentsDocumentClientProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlockComplete = useCallback(() => {
    setIsUnlocked(true);
  }, []);

  if (!isUnlocked) {
    return (
      <ClassifiedUnlockAnimation
        fileName={fileName}
        classification={classification}
        onComplete={handleUnlockComplete}
      />
    );
  }

  return <>{children}</>;
}
