import type { ComponentType } from "react";
import type { ArchiveDocument, DocumentType } from "./lib/documents";
import { DecreeTemplate } from "./decree-template/DecreeTemplate";
import { DossierTemplate } from "./dossier-template/DossierTemplate";
import { MemoTemplate } from "./memo-template/MemoTemplate";
import { IncidentTemplate } from "./incident-template/IncidentTemplate";
import { TransmissionTemplate } from "./transmission-template/TransmissionTemplate";
import { BulletinTemplate } from "./bulletin-template/BulletinTemplate";
import { ManifestoTemplate } from "./manifesto-template/ManifestoTemplate";
import { OrderTemplate } from "./order-template/OrderTemplate";
import { ForensicTemplate } from "./forensic-template/ForensicTemplate";
import { AiLogTemplate } from "./ai-log-template/AiLogTemplate";
import { IdCardTemplate } from "./id-card-template/IdCardTemplate";
import { BountyTemplate } from "./bounty-template/BountyTemplate";
import { BroadcastTemplate } from "./broadcast-template/BroadcastTemplate";
import { AutopsyTemplate } from "./autopsy-template/AutopsyTemplate";
import { InterrogationTemplate } from "./interrogation-template/InterrogationTemplate";
import { NewsTemplate } from "./news-template/NewsTemplate";
import { BatchTemplate } from "./batch-template/BatchTemplate";
import { ForeignLetterTemplate } from "./foreign-letter-template/ForeignLetterTemplate";
import { PropagandaTemplate } from "./propaganda-template/PropagandaTemplate";
import { MonitoredThreadTemplate } from "./monitored-thread-template/MonitoredThreadTemplate";
import { CodexEntryTemplate } from "./codex-entry-template/CodexEntryTemplate";
import { MedicalRecordTemplate } from "./medical-record-template/MedicalRecordTemplate";
import { ClassifiedProjectTemplate } from "./classified-project-template/ClassifiedProjectTemplate";

export const TEMPLATES: Record<DocumentType, ComponentType<{ doc: ArchiveDocument }>> = {
  decree: DecreeTemplate,
  dossier: DossierTemplate,
  memo: MemoTemplate,
  incident: IncidentTemplate,
  transmission: TransmissionTemplate,
  bulletin: BulletinTemplate,
  manifesto: ManifestoTemplate,
  order: OrderTemplate,
  forensic: ForensicTemplate,
  ai_log: AiLogTemplate,
  id_card: IdCardTemplate,
  bounty: BountyTemplate,
  broadcast: BroadcastTemplate,
  autopsy: AutopsyTemplate,
  interrogation: InterrogationTemplate,
  news: NewsTemplate,
  batch: BatchTemplate,
  foreign_letter: ForeignLetterTemplate,
  propaganda: PropagandaTemplate,
  monitored_thread: MonitoredThreadTemplate,
  codex_entry: CodexEntryTemplate,
  medical_record: MedicalRecordTemplate,
  classified_project: ClassifiedProjectTemplate,
};
