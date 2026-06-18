"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Redacted } from "./Redacted";
import { Stamp, ApprovedStamp, DeniedStamp, ClassifiedStamp, ArchivedStamp, UrgentStamp } from "./Stamp";
import { Classified } from "./Classified";
import { Field } from "./Field";
import { Signature } from "./Signature";
import { Article } from "./Article";
import { Transmission } from "./Transmission";
import { Evidence } from "./Evidence";
import { LogLine } from "./log-line";
import { CensorEntry } from "./censor-entry";
import { Pullquote } from "./Pullquote";
import { Caption } from "./Caption";
import { Exchange } from "./interrogation/Exchange";
import { Note } from "./interrogation/Note";
import { ForeignBody } from "./foreign-body";
import { Translation } from "./Translation";
import { Msg, FlagPhrase, Gap, Attachment } from "./comms/Msg";
import { Trait } from "./codex/Trait";
import { Warning } from "./codex/Warning";
import { RequirementList } from "./codex/requirement-list";
import { Phase } from "./codex/Phase";
import { RecruitProfile } from "./project/recruit-profile";
import { AssetEntry } from "./project/asset-entry";
import { Safeguard } from "./project/Safeguard";
import { Objective } from "./project/Objective";
import { Section } from "./Section";
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
