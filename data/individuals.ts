import type { Individual } from "@/utils/government-data";
import { UltimateLayout } from "@/components/archives/individuals/ultimate-archive";
import { DianaWatsonLayout } from "@/components/archives/individuals/diana-watson-archive";
import { KendraConnorsLayout } from "@/components/archives/individuals/kendra-connors-archive";
import { KiraLayout } from "@/components/archives/individuals/kira-archive";

export const individuals: Individual[] = [
  {
    slug: "diana-watson",
    name: "Diana Watson",
    knownAs: "",
    codename: "",
    status: "",
    threat: "",
    id: "??-1230-28467351",
    hemisphere: "S",
    age: 15,
    birthDate: "87 - Solaris - 1230",
    birthPlace: "Isaac's Village",
    occupation: "Aventureiro/Estudante",
    nationality: "",
    height: "1.65m",
    weight: "50kg",
    bloodType: "O-",
    eyeColor: "Castanho",
    hairColor: "Castanho",
    skinColor: "branco",
    specializations: [],
    clearanceLevel: "NÍVEL 1",
    department: "",
    yearsOfService: 0,
    layoutComponent: DianaWatsonLayout,
    documents: [
      { id: "profile", name: "Perfil", mdxSlug: "profile-id-diana-watson" },
      { id: "school-final-evaluation", name: "Avaliação Final Escolar", mdxSlug: "sfe-diana-watson" },
      { id: "permit-card", name: "Permissões", mdxSlug: "permit-card-diana-watson" },
    ],
  },
  {
    slug: "ultimate",
    name: "Johan Kyler Mercer",
    knownAs: "Ultimate",
    codename: "Portador do Crimson/Scarlet Eyes",
    status: "ATIVO",
    threat: "ÔMEGA",
    id: "??-1228-71938042",
    hemisphere: "S",
    age: 17,
    birthDate: "25 - Vernis - 1228",
    birthPlace: "New Raven",
    occupation: "Aventureiro/Estudante",
    nationality: "",
    height: "1.73m",
    weight: "68kg",
    bloodType: "O-",
    eyeColor: "Castanho",
    hairColor: "Preto",
    skinColor: "Moreno-claro",
    specializations: [],
    clearanceLevel: "NÍVEL 5",
    department: "",
    yearsOfService: 0,
    relatedDocuments: [
      { slug: "codex-fic-01-fantasma-carmesim", label: "Codex — Fantasma Carmesim" },
    ],
    layoutComponent: UltimateLayout,
    documents: [
      { id: "profile", name: "Perfil", mdxSlug: "profile-id-ultimate" },
      { id: "school-final-evaluation", name: "Avaliação Final Escolar", mdxSlug: "sfe-ultimate" },
      { id: "permit-card", name: "Permissões", mdxSlug: "permit-card-ultimate" },
    ],
  },
  {
    slug: "kendra-connors",
    name: "Kendra Juliet Connors",
    knownAs: "Kendra Connors",
    codename: "",
    status: "",
    threat: "",
    id: "??-1228-53682917",
    hemisphere: "S",
    age: 17,
    birthDate: "56-Vernis-1228-S",
    birthPlace: "Local desconhecido próximo a fronteira de Normandy",
    occupation: "Estudante",
    nationality: "",
    height: "1.68m",
    weight: "54kg",
    bloodType: "AB-",
    eyeColor: "Castanho",
    hairColor: "Loiro",
    skinColor: "Branco",
    specializations: [],
    clearanceLevel: "NÍVEL 1",
    department: "",
    yearsOfService: 0,
    relatedDocuments: [
      { slug: "projeto-red-suns", label: "Projeto Red Suns" },
    ],
    layoutComponent: KendraConnorsLayout,
    documents: [
      { id: "profile", name: "Perfil", mdxSlug: "profile-id-kendra-connors" },
      { id: "school-final-evaluation", name: "Avaliação Final Escolar", mdxSlug: "sfe-kendra-connors" },
      // { id: "permit-card", name: "Permissões" },
    ],
  },
  {
    slug: "kira",
    name: "Kira",
    knownAs: "",
    codename: "",
    status: "",
    threat: "",
    id: "??-1229-90814563",
    hemisphere: "S",
    age: 15,
    birthDate: "Vernis-1229-S",
    birthPlace: "New Raven",
    occupation: "Estudante",
    nationality: "",
    height: "",
    weight: "",
    bloodType: "",
    eyeColor: "",
    hairColor: "",
    skinColor: "",
    specializations: [],
    clearanceLevel: "",
    department: "",
    yearsOfService: 0,
    layoutComponent: KiraLayout,
    documents: [
      { id: "school-final-evaluation", name: "Avaliação Final Escolar", mdxSlug: "sfe-kira" },
    ],
  },
];

export const ALL_PROFILE_SLUGS: string[] = individuals.flatMap(
  (ind) => ind.documents.map((d) => d.mdxSlug).filter((s): s is string => !!s),
);

export function findSiblingSlugs(slug: string): string[] {
  const ind = individuals.find((i) =>
    i.documents.some((d) => d.mdxSlug === slug),
  );
  if (!ind) return [];
  return ind.documents
    .map((d) => d.mdxSlug)
    .filter((s): s is string => !!s);
}

const PRIMARY_CLASSIFICATION: Record<string, string> = {
  ultimate: "ULTRASSECRETO",
  "diana-watson": "CONFIDENCIAL",
  "kendra-connors": "CONFIDENCIAL",
  kira: "CONFIDENCIAL",
};

export function getProfileSections() {
  return individuals.map((ind) => ({
    id: ind.slug,
    name: ind.knownAs || ind.name,
    classification: PRIMARY_CLASSIFICATION[ind.slug] ?? "CONFIDENCIAL",
    ...(ind.clearanceLevel
      ? { meta: { label: ind.clearanceLevel, className: "text-muted-foreground" } }
      : {}),
    documents: ind.documents
      .filter((d) => d.mdxSlug)
      .map((d) => ({ id: d.id, name: d.name, mdxSlug: d.mdxSlug })),
  }));
}
