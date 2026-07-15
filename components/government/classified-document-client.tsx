"use client";

import { useState, useCallback, type ReactNode } from "react";
import { ClassifiedUnlockAnimation } from "@/components/classified-unlock-animation";

interface ClassifiedDocumentClientProps {
  fileName: string;
  classification?: string;
  children: ReactNode;
}

export function ClassifiedDocumentClient({
  fileName,
  classification = "ULTRA-SECRETO",
  children,
}: ClassifiedDocumentClientProps) {
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
