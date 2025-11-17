/**
 * GERADORES DE CONTEÚDO DE DOCUMENTOS
 *
 * Este arquivo contém as funções que geram o conteúdo dos documentos.
 * Para adicionar um novo tipo de documento:
 *
 * 1. Adicione uma nova entrada no objeto documentGenerators
 * 2. A chave deve corresponder ao 'id' do documento em data/individuals.ts
 * 3. Retorne um objeto com as propriedades: title, classification, department, date, signedBy, content
 * 4. Use os dados do objeto 'individual' (individual.age, individual.birthDate, etc.)
 *
 * Você pode usar o componente RedactedText para censurar informações:
 * <RedactedText redacted>TEXTO CENSURADO</RedactedText>
 */

export const generatePowerDocuments = (
  powerName: string,
  powers: any[]
): any[] => {
  const power = powers.find(
    (pow) => pow.name === powerName || pow.knownAs === powerName
  );
  if (!power) return [];

  const LayoutComponent = power.layoutComponent;

  return power.documents.map((doc: any) => ({
    content: <LayoutComponent power={power} documentId={doc.id} />,
  }));
};
