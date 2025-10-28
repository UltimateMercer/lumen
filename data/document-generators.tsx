import type { Individual, DocumentContent } from "@/utils/government-data";
import { RedactedText } from "@/components/redacted-text";
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

export const generateIndividualDocuments = (
  individualName: string,
  individuals: Individual[]
): DocumentContent[] => {
  const individual = individuals.find(
    (ind) => ind.name === individualName || ind.knownAs === individualName
  );
  if (!individual) return [];

  if (individual.layoutComponent) {
    const LayoutComponent = individual.layoutComponent;

    return individual.documents.map((doc) => ({
      title: `${doc.name}: ${individualName}`,
      classification: "CONFIDENCIAL",
      department:
        individual.department || "DEPARTAMENTO DE REGISTROS E ARQUIVOS",
      date: "2024.03.15",
      signedBy: "Sistema de Documentação Automatizado",
      content: <LayoutComponent individual={individual} documentId={doc.id} />,
    }));
  }

  const documentGenerators: Record<string, DocumentContent> = {
    perfil: {
      title: `PERFIL DE INDIVÍDUO: ${individualName}`,
      classification: "CONFIDENCIAL",
      department: "DEPARTAMENTO DE INTELIGÊNCIA E MONITORAMENTO",
      date: "2024.03.15",
      signedBy: "Dra. Helena Frost - Chefe de Análise de Perfis",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground">NOME COMPLETO:</div>
              <div className="font-bold">{individualName}</div>
            </div>
            <div>
              <div className="text-muted-foreground">ID:</div>
              <div className="font-bold">{individual.id}</div>
            </div>
            <div>
              <div className="text-muted-foreground">STATUS:</div>
              <div className="font-bold">{individual.status}</div>
            </div>
            <div>
              <div className="text-muted-foreground">NÍVEL DE AMEAÇA:</div>
              <div className="font-bold">{individual.threat}</div>
            </div>
            {individual.age && (
              <div>
                <div className="text-muted-foreground">IDADE:</div>
                <div className="font-bold">{individual.age} anos</div>
              </div>
            )}
            {individual.birthDate && (
              <div>
                <div className="text-muted-foreground">DATA DE NASCIMENTO:</div>
                <div className="font-bold">{individual.birthDate}</div>
              </div>
            )}
            {individual.birthPlace && (
              <div>
                <div className="text-muted-foreground">
                  LOCAL DE NASCIMENTO:
                </div>
                <div className="font-bold">{individual.birthPlace}</div>
              </div>
            )}
            {individual.nationality && (
              <div>
                <div className="text-muted-foreground">NACIONALIDADE:</div>
                <div className="font-bold">{individual.nationality}</div>
              </div>
            )}
            {individual.occupation && (
              <div>
                <div className="text-muted-foreground">OCUPAÇÃO:</div>
                <div className="font-bold">{individual.occupation}</div>
              </div>
            )}
            {individual.clearanceLevel && (
              <div>
                <div className="text-muted-foreground">CLEARANCE:</div>
                <div className="font-bold">{individual.clearanceLevel}</div>
              </div>
            )}
          </div>

          {(individual.height ||
            individual.weight ||
            individual.bloodType ||
            individual.eyeColor ||
            individual.hairColor) && (
            <div className="border-t-2 border-foreground pt-4">
              <div className="font-bold mb-2">CARACTERÍSTICAS FÍSICAS:</div>
              <div className="grid grid-cols-2 gap-2">
                {individual.height && (
                  <div>
                    <span className="text-muted-foreground">Altura:</span>{" "}
                    {individual.height}
                  </div>
                )}
                {individual.weight && (
                  <div>
                    <span className="text-muted-foreground">Peso:</span>{" "}
                    {individual.weight}
                  </div>
                )}
                {individual.bloodType && (
                  <div>
                    <span className="text-muted-foreground">
                      Tipo Sanguíneo:
                    </span>{" "}
                    {individual.bloodType}
                  </div>
                )}
                {individual.eyeColor && (
                  <div>
                    <span className="text-muted-foreground">Olhos:</span>{" "}
                    {individual.eyeColor}
                  </div>
                )}
                {individual.hairColor && (
                  <div>
                    <span className="text-muted-foreground">Cabelo:</span>{" "}
                    {individual.hairColor}
                  </div>
                )}
              </div>
            </div>
          )}

          {individual.specializations &&
            individual.specializations.length > 0 && (
              <div className="border-t-2 border-foreground pt-4">
                <div className="font-bold mb-2">ESPECIALIZAÇÕES:</div>
                <div className="leading-relaxed">
                  {individual.specializations.map((spec, idx) => (
                    <div key={idx}>• {spec}</div>
                  ))}
                </div>
              </div>
            )}

          {individual.aliases && individual.aliases.length > 0 && (
            <div className="border-t-2 border-foreground pt-4">
              <div className="font-bold mb-2">ALIASES CONHECIDOS:</div>
              <div className="leading-relaxed">
                {individual.aliases.map((alias, idx) => (
                  <div key={idx}>• {alias}</div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t-2 border-foreground pt-4">
            <div className="font-bold mb-2">HISTÓRICO:</div>
            <div className="leading-relaxed">
              {individual.department &&
                `Departamento: ${individual.department}. `}
              {individual.yearsOfService &&
                `Anos de serviço: ${individual.yearsOfService}. `}
              Envolvimento confirmado em{" "}
              <RedactedText redacted>PROJETO</RedactedText>. Contatos conhecidos
              incluem <RedactedText redacted>NOMES</RedactedText>.
            </div>
          </div>

          {individual.lastKnownLocation && (
            <div className="border-t-2 border-foreground pt-4">
              <div className="font-bold mb-2">
                ÚLTIMA LOCALIZAÇÃO CONHECIDA:
              </div>
              <div className="leading-relaxed">
                {individual.lastKnownLocation}
              </div>
            </div>
          )}

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-destructive font-bold">
              ⚠️ INFORMAÇÃO CLASSIFICADA
            </div>
            <div className="text-muted-foreground mt-1">
              Última atualização: 2024.03.15
            </div>
          </div>
        </div>
      ),
    },
    psicologico: {
      title: `AVALIAÇÃO PSICOLÓGICA: ${individualName}`,
      classification: "CONFIDENCIAL",
      department: "DEPARTAMENTO DE SAÚDE MENTAL E AVALIAÇÃO",
      date: "2024.02.20",
      signedBy: "Dr. Thomas Reeves - Psicólogo Chefe",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="font-bold">AVALIAÇÃO GERAL:</div>
            <div className="leading-relaxed">
              Indivíduo apresenta{" "}
              <RedactedText redacted>CARACTERÍSTICAS</RedactedText> compatíveis
              com perfil de{" "}
              <RedactedText redacted>TIPO DE PERSONALIDADE</RedactedText>.
              Estabilidade emocional: ALTA.
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">TESTES APLICADOS:</div>
            <div className="leading-relaxed">
              - Teste de Rorschach:{" "}
              <RedactedText redacted>RESULTADO</RedactedText>
              <br />- MMPI-2: <RedactedText redacted>RESULTADO</RedactedText>
              <br />- Avaliação de Estresse: APROVADO
            </div>
          </div>

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-muted-foreground">
              Próxima avaliação: 2024.08.20
            </div>
          </div>
        </div>
      ),
    },
    "analise-risco": {
      title: `ANÁLISE DE RISCO: ${individualName}`,
      classification: "SECRETO",
      department: "DEPARTAMENTO DE ANÁLISE DE AMEAÇAS",
      date: "2024.03.12",
      signedBy: "Analista Sarah Kim - Divisão de Risco",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="font-bold">NÍVEL DE RISCO ATUAL:</div>
            <div className="leading-relaxed text-destructive font-bold">
              {individual.threat}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">FATORES DE RISCO:</div>
            <div className="leading-relaxed">
              - Acesso a{" "}
              <RedactedText redacted>INFORMAÇÕES SENSÍVEIS</RedactedText>
              <br />- Contato com{" "}
              <RedactedText redacted>INDIVÍDUOS SUSPEITOS</RedactedText>
              <br />- Comportamento{" "}
              <RedactedText redacted>PADRÃO ANÔMALO</RedactedText>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">RECOMENDAÇÕES:</div>
            <div className="leading-relaxed">
              Monitoramento <RedactedText redacted>FREQUÊNCIA</RedactedText>.
              Revisão de clearance em{" "}
              <RedactedText redacted>PRAZO</RedactedText>.
            </div>
          </div>

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-destructive font-bold">
              ⚠️ ANÁLISE CLASSIFICADA
            </div>
          </div>
        </div>
      ),
    },
    "historico-missoes": {
      title: `HISTÓRICO DE MISSÕES: ${individualName}`,
      classification: "SECRETO",
      department: "DEPARTAMENTO DE OPERAÇÕES ESPECIAIS",
      date: "2024.03.08",
      signedBy: "Cmdr. Rachel Torres - Coordenadora de Missões",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="font-bold">MISSÕES COMPLETADAS:</div>
            <div className="leading-relaxed">
              Total: <RedactedText redacted>NÚMERO</RedactedText>
              <br />
              Sucesso: <RedactedText redacted>NÚMERO</RedactedText>
              <br />
              Falhas: <RedactedText redacted>NÚMERO</RedactedText>
              <br />
              Taxa de sucesso: 94.7%
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">MISSÕES RECENTES:</div>
            <div className="leading-relaxed">
              2024.03.01 - <RedactedText redacted>OPERAÇÃO</RedactedText> -
              SUCESSO
              <br />
              2024.02.15 - <RedactedText redacted>OPERAÇÃO</RedactedText> -
              SUCESSO
              <br />
              2024.01.28 - <RedactedText redacted>OPERAÇÃO</RedactedText> -
              PARCIAL
            </div>
          </div>

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-muted-foreground">
              Última missão: 2024.03.01
            </div>
          </div>
        </div>
      ),
    },
    mandado: {
      title: `MANDADO DE CAPTURA: ${individualName}`,
      classification: "ULTRA-SECRETO",
      department: "DEPARTAMENTO DE JUSTIÇA E SEGURANÇA",
      date: "2024.03.10",
      signedBy: "Juiz Marcus Aurelius - Tribunal Superior",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="border-l-4 border-destructive pl-4">
            <div className="text-destructive font-bold text-lg mb-2">
              ⚠️ MANDADO ATIVO
            </div>
            <div className="text-muted-foreground">EMITIDO EM: 2024.03.10</div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">ACUSAÇÕES:</div>
            <div className="leading-relaxed">
              - <RedactedText redacted>CRIME 1</RedactedText>
              <br />- <RedactedText redacted>CRIME 2</RedactedText>
              <br />- <RedactedText redacted>CRIME 3</RedactedText>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">INSTRUÇÕES DE CAPTURA:</div>
            <div className="leading-relaxed">
              Abordagem: <RedactedText redacted>PROTOCOLO</RedactedText>
              <br />
              Nível de força autorizado:{" "}
              <RedactedText redacted>NÍVEL</RedactedText>
              <br />
              Prioridade: ALTA
            </div>
          </div>

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-destructive font-bold">
              ⚠️ INDIVÍDUO CONSIDERADO PERIGOSO
            </div>
          </div>
        </div>
      ),
    },
    "ultimas-localizacoes": {
      title: `ÚLTIMAS LOCALIZAÇÕES: ${individualName}`,
      classification: "SECRETO",
      department: "DEPARTAMENTO DE RASTREAMENTO E VIGILÂNCIA",
      date: "2024.03.14",
      signedBy: "Agente David Park - Divisão de Rastreamento",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="font-bold">AVISTAMENTOS CONFIRMADOS:</div>
            <div className="leading-relaxed">
              2024.03.14 08:23 -{" "}
              <RedactedText redacted>LOCALIZAÇÃO</RedactedText>
              <br />
              2024.03.12 15:47 -{" "}
              <RedactedText redacted>LOCALIZAÇÃO</RedactedText>
              <br />
              2024.03.10 22:15 -{" "}
              <RedactedText redacted>LOCALIZAÇÃO</RedactedText>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold">PADRÃO DE MOVIMENTO:</div>
            <div className="leading-relaxed">
              Análise indica deslocamento em direção a{" "}
              <RedactedText redacted>REGIÃO</RedactedText>. Possível destino:{" "}
              <RedactedText redacted>LOCAL</RedactedText>.
            </div>
          </div>

          {individual.lastKnownLocation && (
            <div className="space-y-2">
              <div className="font-bold">ÚLTIMA LOCALIZAÇÃO CONFIRMADA:</div>
              <div className="leading-relaxed">
                {individual.lastKnownLocation}
              </div>
            </div>
          )}

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-muted-foreground">
              Última atualização: 2024.03.14 08:30
            </div>
          </div>
        </div>
      ),
    },
    default: {
      title: `DOCUMENTO: ${individualName}`,
      classification: "CONFIDENCIAL",
      department: "DEPARTAMENTO DE REGISTROS E ARQUIVOS",
      date: "2024.03.15",
      signedBy: "Arq. Sofia Mendez - Coordenadora de Arquivos",
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="font-bold">INFORMAÇÕES:</div>
            <div className="leading-relaxed">
              Documento relacionado a {individualName}. Conteúdo:{" "}
              <RedactedText redacted>INFORMAÇÃO</RedactedText>.
            </div>
          </div>

          <div className="border-t-2 border-foreground pt-4">
            <div className="text-muted-foreground">
              Arquivo mantido por: Departamento de Registros
            </div>
          </div>
        </div>
      ),
    },
  };

  return individual.documents.map((doc) => {
    const generator = documentGenerators[doc.id] || documentGenerators.default;
    return {
      ...generator,
      title: generator.title || `${doc.name}: ${individualName}`,
    };
  });
};
