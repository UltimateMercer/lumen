export type Classification =
  | "PÚBLICO"
  | "CONFIDENCIAL"
  | "SECRETO"
  | "ULTRASSECRETO";

export type DocumentType =
  | "decree" | "dossier" | "memo" | "incident" | "transmission"
  | "bulletin" | "manifesto" | "order" | "forensic" | "ai_log"
  | "id_card" | "bounty" | "broadcast" | "autopsy" | "interrogation"
  | "news" | "batch" | "foreign_letter" | "propaganda"
  | "monitored_thread" | "codex_entry" | "medical_record" | "classified_project"
  | "trial-school-final-evaluation"
  | "trial-profile-id"
  | "trial-permit-card";

export interface DocumentFrontmatter {
  type: DocumentType;
  slug: string;
  title: string;
  classification: Classification;
  date: string;
  issued_by: string;
  reference?: string;
  summary?: string;
  subject?: string;
  to?: string;
  from?: string;
  subject_name?: string;
  status?: string;
  incident_code?: string;
  location?: string;
  channel?: string;
  intercepted_at?: string;
  tags?: string[];
  signed_by?: string;
  registry_id?: string;
  signed_at?: string;
  unit?: string;
  target?: string;
  window?: string;
  log_source?: string;
  holder_name?: string;
  holder_id?: string;
  civic_class?: string;
  loyalty_tier?: string;
  issued_on?: string;
  valid_until?: string;
  restrictions?: string[];
  biometric_hash?: string;
  photo_status?: string;
  bounty_amount?: string;
  alias?: string;
  crimes?: string[];
  contact?: string;
  station?: string;
  airtime?: string;
  case_id?: string;
  decedent?: string;
  cause_of_death?: string;
  mode?: "interrogation" | "interview";
  session_code?: string;
  interrogator?: string[] | string;
  interrogated?: string;
  counsel?: string;
  clerk?: string;
  recording?: string;
  duration?: string;
  room?: string;
  outlet?: string;
  edition?: string;
  section?: string;
  byline?: string;
  dateline?: string;
  approved_by?: string;
  motto?: string;
  cover_note?: string;
  seal_color?: "red" | "black" | "amber";
  items?: Array<{ slug: string; role?: string; note?: string }>;
  editor_notes?: string;
  origin_country?: string;
  origin_country_native?: string;
  origin_authority?: string;
  recipient?: string;
  delivered_via?: string;
  language_code?: string;
  translator?: string;
  seal_motif?: "star" | "leaf" | "wave" | "crown";
  slogan?: string;
  subtitle?: string;
  campaign_code?: string;
  printer?: string;
  poster_year?: string;
  motif?: "fist" | "eye" | "gear" | "star";
  operation_code?: string;
  monitored_target?: string;
  counterpart?: string;
  analyst?: string;
  capture_window?: string;
  device_fingerprint?: string;
  participants?: Array<{ handle: string; role?: "alvo" | "contraparte" | "observador"; device?: string }>;
  designation?: string;
  codex_name?: string;
  codex_class?: string;
  access_level?: string;
  threat_tier?: "baixa" | "moderada" | "severa" | "crítica" | "apocalíptica";
  autonomy?: "nula" | "parcial" | "plena";
  contagion?: "nenhuma" | "baixa" | "alta" | "epidêmica";
  host_required?: boolean;
  containment_status?: string;
  first_recorded?: string;
  sigil_motif?: "eye" | "spiral" | "thorn" | "crimson" | "mask" | "circuit";
  verified_by?: string;
  patient_name?: string;
  patient_id?: string;
  birth_date?: string;
  sex?: string;
  blood_type?: string;
  facility?: string;
  attending?: string;
  intake_at?: string;
  discharge_at?: string;
  vitals?: Array<{ label: string; value: string; unit?: string; flag?: "normal" | "alerta" | "crítico" }>;
  medications?: Array<{ name: string; dose: string; schedule: string; route?: string }>;
  procedures?: Array<{ code: string; name: string; performed_at?: string }>;
  diagnosis?: string[];
  project_codename?: string;
  project_code?: string;
  project_class?: string;
  project_status?: "ativo" | "suspenso" | "encerrado" | "comprometido";
  oversight?: string;
  directive_origin?: string;
  operational_since?: string;
  current_phase?: string;
  asset_count?: string;
  recruit_pool?: string;
  success_metric?: string;
  budget_line?: string;
  deniability_clause?: string;
  sections?: Array<{ id: string; label: string }>;
}

export interface ArchiveDocument {
  frontmatter: DocumentFrontmatter;
  mdx: string;
  mdxSource?: Record<string, unknown>;
}

export const DOCUMENT_TYPE_LABEL: Record<DocumentType, string> = {
  decree: "DECRETO",
  dossier: "DOSSIÊ",
  memo: "MEMORANDO",
  incident: "RELATÓRIO DE INCIDENTE",
  transmission: "TRANSMISSÃO INTERCEPTADA",
  bulletin: "BOLETIM DE CENSURA",
  manifesto: "MANIFESTO CLANDESTINO",
  order: "ORDEM DE SERVIÇO",
  forensic: "RELATÓRIO FORENSE",
  ai_log: "LOG DE IA",
  id_card: "IDENTIDADE CIVIL",
  bounty: "AVISO DE PROCURADO",
  broadcast: "PAUTA DE RÁDIO",
  autopsy: "LAUDO NECROSCÓPICO",
  interrogation: "INTERROGATÓRIO",
  news: "MATÉRIA DE JORNAL",
  batch: "ARQUIVO CONSOLIDADO",
  foreign_letter: "CARTA ESTRANGEIRA",
  propaganda: "CARTAZ DE PROPAGANDA",
  monitored_thread: "COMUNICAÇÃO MONITORADA",
  codex_entry: "REGISTRO DE CODEX",
  medical_record: "PRONTUÁRIO MÉDICO",
  classified_project: "PROJETO CLASSIFICADO",
  "trial-school-final-evaluation": "AVALIAÇÃO FINAL (TRIAL)",
  "trial-profile-id": "DOCUMENTO DE IDENTIDADE (TRIAL)",
  "trial-permit-card": "CARTÃO DE PERMISSÃO (TRIAL)",
};

export const CLASSIFICATION_TOKEN: Record<Classification, string> = {
  "PÚBLICO": "text-classification-public",
  "CONFIDENCIAL": "text-classification-confidential",
  "SECRETO": "text-classification-secret",
  "ULTRASSECRETO": "text-classification-ultra",
};
