import type { Individual, Entity, DocumentContent } from "@/utils/government-data";
import { IndividualResolver } from "@/components/individual-resolver";
import { EntityResolver } from "@/components/entity-resolver";

export const generateIndividualDocuments = (
  individualName: string,
  individuals: Individual[]
): DocumentContent[] => {
  const individual = individuals.find(
    (ind) => ind.name === individualName || ind.knownAs === individualName
  );
  if (!individual) return [];

  return individual.documents.map((doc) => ({
    title: `${doc.name}: ${individualName}`,
    classification: "CONFIDENCIAL",
    department:
      individual.department || "DEPARTAMENTO DE REGISTROS E ARQUIVOS",
    date: "2024.03.15",
    signedBy: "Sistema de Documentação Automatizado",
    content: (
      <IndividualResolver slug={individual.slug ?? ""} documentId={doc.id} />
    ),
  }));
};

export const generateEntityDocuments = (
  entity: Entity,
): DocumentContent[] => {
  const combinedDocs = [
    ...entity.documents,
    ...(entity.documentGroups?.flatMap((g) => g.documents) ?? []),
  ];

  const combinedEntity: Entity = { ...entity, documents: combinedDocs };

  return combinedDocs.map((doc) => ({
    title: `${doc.name}: ${entity.name}`,
    classification: "CONFIDENCIAL",
    department:
      entity.department || "DEPARTAMENTO DE REGISTROS E ARQUIVOS",
    date: "2024.03.15",
    signedBy: "Sistema de Documentação Automatizado",
    content: doc.mdxSlug
      ? <EntityResolver entity={combinedEntity} documentId={doc.id} />
      : <div className="p-8 text-center opacity-50">DOCUMENTO EM PROCESSAMENTO</div>,
  }));
};
