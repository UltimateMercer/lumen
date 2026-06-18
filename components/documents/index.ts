import type { ComponentType } from "react";
import type { ArchiveDocument, DocumentType } from "@/lib/archive/documents";
import { DecreeTemplate } from "./templates/DecreeTemplate";
import { DossierTemplate } from "./templates/DossierTemplate";
import { MemoTemplate } from "./templates/MemoTemplate";
import { IncidentTemplate } from "./templates/IncidentTemplate";
import { TransmissionTemplate } from "./templates/TransmissionTemplate";
import { BulletinTemplate } from "./templates/BulletinTemplate";
import { ManifestoTemplate } from "./templates/ManifestoTemplate";
import { OrderTemplate } from "./templates/OrderTemplate";
import { ForensicTemplate } from "./templates/ForensicTemplate";
import { AiLogTemplate } from "./templates/AiLogTemplate";
import { IdCardTemplate } from "./templates/IdCardTemplate";
import { BountyTemplate } from "./templates/BountyTemplate";
import { BroadcastTemplate } from "./templates/BroadcastTemplate";
import { AutopsyTemplate } from "./templates/AutopsyTemplate";
import { InterrogationTemplate } from "./templates/InterrogationTemplate";
import { NewsTemplate } from "./templates/NewsTemplate";
import { BatchTemplate } from "./templates/BatchTemplate";
import { ForeignLetterTemplate } from "./templates/ForeignLetterTemplate";
import { PropagandaTemplate } from "./templates/PropagandaTemplate";
import { MonitoredThreadTemplate } from "./templates/MonitoredThreadTemplate";
import { CodexEntryTemplate } from "./templates/CodexEntryTemplate";
import { MedicalRecordTemplate } from "./templates/MedicalRecordTemplate";
import { ClassifiedProjectTemplate } from "./templates/ClassifiedProjectTemplate";
import { TrialSchoolFinalEvaluation } from "./templates/trial/TrialSchoolFinalEvaluation";

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
  "trial-school-final-evaluation": TrialSchoolFinalEvaluation,
};
