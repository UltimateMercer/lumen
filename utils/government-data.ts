import type React from "react";
import type { EntityLayoutProps } from "@/types/character-data";
// Tipos para os dados governamentais

export interface Document {
  id: string;
  name: string;
  mdxSlug?: string;
}

export interface DocumentGroup {
  groupId: string;
  groupName: string;
  documents: Document[];
}

export interface Entity {
  slug: string;
  name: string;
  status: string;
  id: string;
  documents: Document[];
  documentGroups?: DocumentGroup[];
  department?: string;
  layoutComponent?: React.ComponentType<EntityLayoutProps>;
}

export interface Individual extends Entity {
  slug: string;
  knownAs?: string;
  codename?: string;
  threat: string;
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
  yearsOfService?: number;
  lastKnownLocation?: string;
  aliases?: string[];
  relatedDocuments?: { slug: string; label?: string }[];
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
