import type React from "react";
// Tipos para os dados governamentais

export interface Document {
  id: string;
  name: string;
}

export interface Individual {
  name: string;
  knownAs?: string;
  codename?: string;
  status: string;
  threat: string;
  id: string;
  documents: Document[];
  age?: number;
  birthDate?: string;
  birthPlace?: string;
  occupation?: string;
  nationality?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  eyeColor?: string;
  hairColor?: string;
  skinColor?: string;
  specializations?: string[];
  clearanceLevel?: string;
  department?: string;
  yearsOfService?: number;
  lastKnownLocation?: string;
  aliases?: string[];
  // NEW: Custom layout component for this individual's documents
  layoutComponent?: React.ComponentType<{
    individual: Individual;
    documentId: string;
  }>;
}

export interface ClassifiedInfo {
  name: string;
  classification: string;
  date: string;
}

export interface Mission {
  code: string;
  name: string;
  status: string;
  success: string;
}

export interface Incident {
  id: string;
  type: string;
  severity: string;
  date: string;
}

export interface DocumentContent {
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}
