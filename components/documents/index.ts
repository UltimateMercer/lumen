import type { ComponentType } from "react";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";
import { DecreeTemplate } from "./templates/decree-template";
import { DossierTemplate } from "./templates/dossier-template";
import { MemoTemplate } from "./templates/memo-template";
import { IncidentTemplate } from "./templates/incident-template";
import { TransmissionTemplate } from "./templates/transmission-template";
import { BulletinTemplate } from "./templates/bulletin-template";
import { ManifestoTemplate } from "./templates/manifesto-template";
import { OrderTemplate } from "./templates/order-template";
import { ForensicTemplate } from "./templates/forensic-template";
import { AiLogTemplate } from "./templates/ai-log-template";
import { IdCardTemplate } from "./templates/id-card-template";
import { BountyTemplate } from "./templates/bounty-template";
import { BroadcastTemplate } from "./templates/broadcast-template";
import { AutopsyTemplate } from "./templates/autopsy-template";
import { InterrogationTemplate } from "./templates/interrogation-template";
import { NewsTemplate } from "./templates/news-template";
import { BatchTemplate } from "./templates/batch-template";
import { ForeignLetterTemplate } from "./templates/foreign-letter-template";
import { PropagandaTemplate } from "./templates/propaganda-template";
import { MonitoredThreadTemplate } from "./templates/monitored-thread-template";
import { CodexEntryTemplate } from "./templates/codex-entry-template";
import { MedicalRecordTemplate } from "./templates/medical-record-template";
import { ClassifiedProjectTemplate } from "./templates/classified-project-template";
import { ProfileId } from "./templates/profile-id";
import { SchoolFinalEvaluationDoc } from "./templates/school-final-evaluation";
import { PermitCard } from "./templates/permit-card";

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
  "profile-id": ProfileId,
  "school-final-evaluation": SchoolFinalEvaluationDoc,
  "permit-card": PermitCard,
};
