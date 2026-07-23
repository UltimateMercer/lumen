export interface CommMessage {
  id: string;
  sender: string;
  role: "self" | "other" | "system";
  text: string;
}

export interface CommThread {
  slug: string;
  title: string;
  channel: string;
  protocol: string;
  timestamp: string;
  messages: CommMessage[];
}

export const commThreads: CommThread[] = [
  {
    slug: "op-sigma-retrieval",
    title: "OPERAÇÃO SIGMA — RETRIBUIÇÃO",
    channel: "CANAL-7",
    protocol: "AES-256",
    timestamp: "58-Vernis-1243-S - 14:42:19",
    messages: [
      {
        id: "msg-1",
        sender: "COMANDANTE VASQUEZ",
        role: "other",
        text: "Agente Mercer, confirme posição. Equipe Alpha está em rota de extração. Tempo estimado: 12 minutos.",
      },
      {
        id: "msg-2",
        sender: "AGENTE MERCER",
        role: "self",
        text: "Posição confirmada. Setor Umbrae-9, coordenadas 47.3N/12.8W. Anomalia detectada a 200m ao norte — classificação pendente.",
      },
      {
        id: "msg-3",
        sender: "SISTEMA",
        role: "system",
        text: "ALERTA: Assinatura energética incomum detectada no setor. Nível de ameaça elevado para ÔMEGA.",
      },
      {
        id: "msg-4",
        sender: "COMANDANTE VASQUEZ",
        role: "other",
        text: "Mercer, mantenha distância segura da anomalia. Reforços estão a caminho. Não entre em contato direto até classificação completa.",
      },
      {
        id: "msg-5",
        sender: "AGENTE MERCER",
        role: "self",
        text: "Entendido. Mantendo posição. A interface está instável — os olhos estão reagindo à proximidade da anomalia.",
      },
      {
        id: "msg-6",
        sender: "SISTEMA",
        role: "system",
        text: "TRANSMISSÃO ENCERRADA — Canal comprometido. Protocolo de silêncio ativado.",
      },
    ],
  },
  {
    slug: "alerta-nivel-3",
    title: "ALERTA DE SEGURANÇA NÍVEL 3",
    channel: "CANAL-12",
    protocol: "RSA-4096",
    timestamp: "15-Solaris-1244-S - 09:47:02",
    messages: [
      {
        id: "alert-1",
        sender: "SISTEMA",
        role: "system",
        text: "ALERTA DE SEGURANÇA NÍVEL 3 ATIVADO — Perimeter breach detectado na Ala Leste. Contenção automática em andamento.",
      },
      {
        id: "alert-2",
        sender: "CENTRAL DE MONITORAMENTO",
        role: "other",
        text: "Todas as unidades, permaneçam em posição. Não houve violação física — falsa alarme causado por interferência energética. Status: RESOLVIDO.",
      },
    ],
  },
];
