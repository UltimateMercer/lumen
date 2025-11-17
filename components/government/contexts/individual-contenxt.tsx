"use client";

import { createContext, useContext, type ReactNode } from "react";

interface IndividualsNavigationContextType {
  navigateToDocument: (individualId: string, documentId: string) => void;
}

const IndividualsNavigationContext = createContext<
  IndividualsNavigationContextType | undefined
>(undefined);

export function IndividualsNavigationProvider({
  children,
  onNavigate,
}: {
  children: ReactNode;
  onNavigate: (individualId: string, documentId: string) => void;
}) {
  return (
    <IndividualsNavigationContext.Provider
      value={{ navigateToDocument: onNavigate }}
    >
      {children}
    </IndividualsNavigationContext.Provider>
  );
}

export function useIndividualsNavigation() {
  const context = useContext(IndividualsNavigationContext);
  if (!context) {
    throw new Error(
      "useIndividualsNavigation must be used within IndividualsNavigationProvider"
    );
  }
  return context;
}

// Alias para compatibilidade
export const useIndividualsContext = useIndividualsNavigation;
