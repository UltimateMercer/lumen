"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Redacted } from "./redacted";
import { Stamp, ApprovedStamp, DeniedStamp, ClassifiedStamp, ArchivedStamp, UrgentStamp } from "./stamp";
import { Classified } from "./classified";
import { Field } from "./field";
import { Signature } from "./signature";
import { Article } from "./article";
import { Transmission } from "./transmission";
import { Evidence } from "./evidence";
import { LogLine } from "./log-line";
import { CensorEntry } from "./censor-entry";
import { Pullquote } from "./pullquote";
import { Caption } from "./caption";
import { Exchange } from "./interrogation/exchange";
import { Note } from "./interrogation/note";
import { ForeignBody } from "./foreign-body";
import { Translation } from "./translation";
import { Msg, FlagPhrase, Gap, Attachment } from "./comms/msg";
import { Trait } from "./codex/trait";
import { Warning } from "./codex/warning";
import { RequirementList } from "./codex/requirement-list";
import { Phase } from "./codex/phase";
import { RecruitProfile } from "./project/recruit-profile";
import { AssetEntry } from "./project/asset-entry";
import { Safeguard } from "./project/safeguard";
import { Objective } from "./project/objective";
import { Section } from "./section";
import { ProjectTOC } from "./project-toc";
import { DigitalSignature } from "../signatures/digital-signature";

export const mdxComponents = {
  Redacted,
  Stamp,
  ApprovedStamp,
  DeniedStamp,
  ClassifiedStamp,
  ArchivedStamp,
  UrgentStamp,
  Classified,
  Field,
  Signature,
  DigitalSignature,
  Article,
  Transmission,
  Evidence,
  LogLine,
  CensorEntry,
  Pullquote,
  Caption,
  Exchange,
  Note,
  ForeignBody,
  Translation,
  Msg,
  FlagPhrase,
  Gap,
  Attachment,
  Trait,
  Warning,
  RequirementList,
  Phase,
  RecruitProfile,
  AssetEntry,
  Safeguard,
  Objective,
  Section,
  ProjectTOC,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-2 font-display text-2xl font-bold uppercase tracking-wider" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-6 mb-2 font-display text-lg font-bold uppercase tracking-wider" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-4 mb-1 text-sm font-bold uppercase tracking-wider" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 text-sm leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-3 ml-6 list-disc text-sm leading-relaxed" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-3 ml-6 list-decimal text-sm leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold" {...props} />
  ),
  hr: () => <hr className="my-6 border-current opacity-20" />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-4 border-l-2 border-current pl-4 text-sm italic opacity-80" {...props} />
  ),
};
