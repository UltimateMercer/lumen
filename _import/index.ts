import type { ComponentType } from "react";
import type { ArchiveDocument, DocumentType } from "@/lib/documents";
import { DecreeTemplate } from "./DecreeTemplate";
import { DossierTemplate } from "./DossierTemplate";
import { MemoTemplate } from "./MemoTemplate";
import { IncidentTemplate } from "./IncidentTemplate";
import { TransmissionTemplate } from "./TransmissionTemplate";
import { BulletinTemplate } from "./BulletinTemplate";
import { ManifestoTemplate } from "./ManifestoTemplate";
import { OrderTemplate } from "./OrderTemplate";
import { ForensicTemplate } from "./ForensicTemplate";
import { AiLogTemplate } from "./AiLogTemplate";
import { IdCardTemplate } from "./IdCardTemplate";
import { BountyTemplate } from "./BountyTemplate";
import { BroadcastTemplate } from "./BroadcastTemplate";
import { AutopsyTemplate } from "./AutopsyTemplate";
import { InterrogationTemplate } from "./InterrogationTemplate";
import { NewsTemplate } from "./NewsTemplate";
import { BatchTemplate } from "./BatchTemplate";
import { ForeignLetterTemplate } from "./ForeignLetterTemplate";
import { PropagandaTemplate } from "./PropagandaTemplate";
import { MonitoredThreadTemplate } from "./MonitoredThreadTemplate";
import { CodexEntryTemplate } from "./CodexEntryTemplate";
import { MedicalRecordTemplate } from "./MedicalRecordTemplate";
import { ClassifiedProjectTemplate } from "./ClassifiedProjectTemplate";

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
