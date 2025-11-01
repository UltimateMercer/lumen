"use client";

import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { Presentation } from "./presentation";

type SectionType = {
  id: string;
  name: string;
  desc: string;
  code?: string;
  status?: string; // Add a question mark to make this property optional
  icon?: string; // Add a question mark to make this property optional
};

interface HomeScreenProps {
  user: { username: string; accessLevel: "public" | "government" };
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

export function HomeScreen({ user, onNavigate, onLogout }: HomeScreenProps) {
  const isGovernment = user.accessLevel === "government";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sections: SectionType[] = isGovernment
    ? [
        {
          id: "classified",
          name: "INFORMAÇÕES CLASSIFICADAS",
          desc: "Documentos ultra-secretos • Clearance Nível 5 requerido",
          code: "SEC-001",
          status: "ATIVO",
        },
        {
          id: "profiles",
          name: "PERFIS DE INDIVÍDUOS",
          desc: "Base de dados nacional • 2.847 registros ativos",
          code: "PER-002",
          status: "ATIVO",
        },
        {
          id: "missions",
          name: "RELATÓRIOS DE MISSÕES",
          desc: "Operações em campo • 14 missões em andamento",
          code: "MIS-003",
          status: "ATIVO",
        },
        {
          id: "incidents",
          name: "REGISTRO DE INCIDENTES",
          desc: "Eventos anômalos • 7 investigações abertas",
          code: "INC-004",
          status: "ATIVO",
        },
      ]
    : [
        {
          id: "library",
          name: "Biblioteca Pública",
          desc: "Acervo completo com mais de 50.000 obras digitalizadas, incluindo literatura clássica, estudos científicos e documentos históricos. Acesso gratuito e ilimitado para todos os cidadãos.",
          icon: "📚",
        },
        {
          id: "maps",
          name: "Mapas e Geografia",
          desc: "Explore mapas interativos de todas as regiões de Arcanum. Descubra cidades, rotas comerciais, pontos de interesse e informações geográficas atualizadas.",
          icon: "🗺️",
        },
        {
          id: "history",
          name: "História de Arcanum",
          desc: "Viaje através dos séculos e conheça os eventos que moldaram nossa civilização. Linha do tempo interativa, biografias de figuras importantes e análises históricas.",
          icon: "📜",
        },
        {
          id: "news",
          name: "Notícias e Comunicados",
          desc: "Mantenha-se informado sobre os acontecimentos atuais, anúncios oficiais e eventos importantes. Atualizado diariamente pela Agência Nacional de Comunicação.",
          icon: "📰",
        },
      ];

  return (
    <div className="min-h-screen">
      {/* <header className="border-b-2 border-foreground bg-[#eaeaea] dark:bg-[#252525]">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              REPÚBLICA DE ARCANUM
            </div>
            <h1 className="text-xl font-bold text-foreground">
              SISTEMA DE ACESSO CENTRAL
            </h1>
            <div className="text-xs text-muted-foreground mt-1">
              {isGovernment
                ? "DEPARTAMENTO DE DEFESA E SEGURANÇA"
                : "ARQUIVO PÚBLICO NACIONAL"}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-xs">
              <div className="text-muted-foreground">USUÁRIO:</div>
              <div className="font-bold text-foreground">
                {user.username.toUpperCase()}
              </div>
              <div
                className={
                  isGovernment
                    ? "text-destructive font-bold"
                    : "text-foreground"
                }
              >
                NÍVEL: {isGovernment ? "GOVERNAMENTAL" : "PÚBLICO"}
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-2 bg-transparent"
            >
              SAIR
            </Button>
          </div>
        </div>
      </header> */}
      <Presentation />

      <div className="dark:bg-[#eaeaea] bg-[#252525] rounded-xs flex flex-col gap-px">
        {isGovernment ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px dark:bg-[#eaeaea] bg-[#252525] rounded-xs">
              <div className="bg-[#eaeaea] dark:bg-[#252525] rounded-xs p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  SESSÃO INICIADA
                </div>
                <div className="font-bold font-mono">
                  {currentTime.toLocaleTimeString("pt-BR")}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {currentTime.toLocaleDateString("pt-BR")}
                </div>
              </div>
              <div className="bg-[#eaeaea] dark:bg-[#252525] rounded-xs p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  ENDEREÇO DE REDE
                </div>
                <div className="font-bold font-mono">
                  {Math.floor(Math.random() * 255)}.
                  {Math.floor(Math.random() * 255)}.
                  {Math.floor(Math.random() * 255)}.
                  {Math.floor(Math.random() * 255)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  CONEXÃO CRIPTOGRAFADA
                </div>
              </div>
              <div className="bg-[#eaeaea] dark:bg-[#252525] rounded-xs p-3">
                <div className="text-sm text-muted-foreground mb-1">
                  CLEARANCE LEVEL
                </div>
                <div className="font-bold text-destructive">
                  NÍVEL 7 - ULTRA-SECRETO
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ACESSO TOTAL AUTORIZADO
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#eaeaea] dark:bg-[#252525] rounded-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="text-destructive font-bold">
                  ⚠️ PROTOCOLO DE SEGURANÇA ATIVO
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  CÓDIGO: PSA-7429-ALPHA
                </div>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed mb-2">
                Sistema governamental classificado. Todas as ações são
                monitoradas, registradas e auditadas. Acesso não autorizado ou
                divulgação de informações classificadas constitui violação da
                Lei de Segurança Nacional nº 2847/2150 e será processado
                criminalmente.
              </div>
              <div className="text-xs font-mono text-muted-foreground border-t border-muted-foreground pt-2 mt-2">
                ÚLTIMA CONEXÃO:{" "}
                {new Date(Date.now() - 86400000).toLocaleString("pt-BR")} •
                TENTATIVAS DE ACESSO NÃO AUTORIZADO: 0
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className="rounded-xs bg-[#eaeaea] dark:bg-[#252525] hover:bg-[#252525] hover:dark:bg-[#eaeaea] py-6 px-5 text-left hover:text-background transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs font-mono text-muted-foreground group-hover:text-background">
                      {section.code}
                    </div>
                    <div className="flex gap-2">
                      <div className="text-[10px] border border-destructive text-destructive px-2 py-0.5 group-hover:border-[#121212] group-hover:text-[#eaeaea] group-hover:bg-destructive">
                        CLASSIFICADO
                      </div>
                      <div className="text-[10px] border border-foreground text-foreground px-2 py-0.5 group-hover:border-background group-hover:text-background">
                        {section.status}
                      </div>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold mb-2">{section.name}</h2>
                  <p className="text-sm text-muted-foreground font-mono group-hover:text-background leading-relaxed">
                    {section.desc}
                  </p>
                  <div className="mt-3 text-sm font-mono text-foreground group-hover:text-background">
                    {">> ACESSAR SISTEMA"}
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
              <div className="bg-[#eaeaea] dark:bg-[#252525] rounded-xs p-3">
                <div className="text-destructive font-bold text-sm mb-2">
                  ALERTAS DE SEGURANÇA
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Nenhum alerta ativo no momento</div>
                  <div>• Todos os sistemas operacionais</div>
                  <div>
                    • Última verificação:{" "}
                    {currentTime.toLocaleTimeString("pt-BR")}
                  </div>
                </div>
              </div>
              <div className="bg-[#eaeaea] dark:bg-[#252525] rounded-xs p-3">
                <div className="text-foreground font-bold text-sm mb-2">
                  STATUS DO SISTEMA
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Criptografia: AES-256 ATIVA</div>
                  <div>• Firewall: NÍVEL MÁXIMO</div>
                  <div>• Monitoramento: CONTÍNUO</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onNavigate(section.id)}
                  className="rounded-xs bg-[#eaeaea] dark:bg-[#252525] px-8 py-12 text-left hover:bg-[#252525] hover:dark:bg-[#eaeaea] transition-colors cursor-pointer group"
                >
                  <div className="text-3xl mb-4 ">{section.icon}</div>
                  <h2 className="text-xl font-bold mb-3 text-[#121212] dark:text-[#eaeaea] group-hover:text-[#eaeaea] group-hover:dark:text-[#121212]">
                    {section.name}
                  </h2>
                  <p className="text-muted-foreground group-hover:text-background leading-relaxed font-medium mb-4">
                    {section.desc}
                  </p>
                  <div className="text-sm font-bold group-hover:text-background">
                    {"> Explorar agora"}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="bg-[#eaeaea] dark:bg-[#252525] border-t dark:border-[#eaeaea] border-[#252525] rounded-xs">
        {isGovernment ? (
          <></>
        ) : (
          <div className="p-6">
            <div className="text-foreground font-bold text-sm mb-3">
              Recursos em Destaque
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div>
                <div className="font-bold mb-1">📖 Nova Coleção</div>
                <div>
                  Obras raras do século XIX agora disponíveis na biblioteca
                  digital
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">🎓 Educação</div>
                <div>
                  Material didático gratuito para estudantes de todas as idades
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">🔍 Pesquisa Avançada</div>
                <div>Ferramentas de busca aprimoradas em todos os acervos</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
