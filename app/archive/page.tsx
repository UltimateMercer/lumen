"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { DocumentType } from "@/lib/archive/documents";
import { getAllDocuments } from "@/lib/archive/registry";
import { CLASSIFICATION_TOKEN } from "@/lib/archive/documents";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* material existente (Etapa 3) */
import { Paper } from "@/components/documents/general-components/paper/Paper";
import { SectionPaper } from "@/components/documents/general-components/paper/SectionPaper";
import { SectionTitle } from "@/components/documents/general-components/paper/SectionTitle";
import { PaperHeader } from "@/components/documents/general-components/paper/PaperHeader";
import { PaperSubject } from "@/components/documents/general-components/paper/PaperSubject";
import { PaperFooter } from "@/components/documents/general-components/paper/PaperFooter";
import { AccessLevel7Only } from "@/components/documents/general-components/stamps/AccessLevel7Only";
import { FinalReminder } from "@/components/documents/general-components/stamps/FinalReminder";
import { StampRepAurora } from "@/components/documents/general-components/stamps/StampRepAurora";
import { DigitalSignature } from "@/components/documents/general-components/signatures/DigitalSignature";
import { ResponsibleSignatures } from "@/components/documents/general-components/signatures/ResponsibleSignatures";
import { ItemValue } from "@/components/documents/general-components/ui/ItemValue";
import { ProfileName } from "@/components/documents/general-components/ui/ProfileName";
import { NexusFormatDate } from "@/components/documents/general-components/ui/NexusFormatDate";
import { ProtectDoc } from "@/components/documents/general-components/ui/ProtectDocText";

/* material novo (Etapa 4) */
import { PaperSheet } from "@/components/documents/general-components/paper/PaperSheet";
import { ClassificationBar } from "@/components/documents/general-components/stamps/ClassificationBar";
import { Redacted } from "@/components/documents/general-components/mdx/Redacted";
import {
  Stamp, ApprovedStamp, DeniedStamp, ClassifiedStamp, ArchivedStamp, UrgentStamp,
} from "@/components/documents/general-components/mdx/Stamp";
import { Classified } from "@/components/documents/general-components/mdx/Classified";
import { Field } from "@/components/documents/general-components/mdx/Field";
import { Pullquote } from "@/components/documents/general-components/mdx/Pullquote";
import { Caption } from "@/components/documents/general-components/mdx/Caption";
import { Article } from "@/components/documents/general-components/mdx/Article";
import { LogLine } from "@/components/documents/general-components/mdx/LogLine";
import { Evidence } from "@/components/documents/general-components/mdx/Evidence";
import { CensorEntry } from "@/components/documents/general-components/mdx/CensorEntry";
import { Section } from "@/components/documents/general-components/mdx/Section";
import { Signature } from "@/components/documents/general-components/mdx/Signature";
import { Transmission } from "@/components/documents/general-components/mdx/Transmission";
import { ForeignBody } from "@/components/documents/general-components/mdx/ForeignBody";
import { Translation } from "@/components/documents/general-components/mdx/Translation";
import { ProjectTOC } from "@/components/documents/general-components/mdx/ProjectTOC";
import { Exchange } from "@/components/documents/general-components/mdx/interrogation/Exchange";
import { Note } from "@/components/documents/general-components/mdx/interrogation/Note";
import {
  Msg, FlagPhrase, Gap, Attachment,
} from "@/components/documents/general-components/mdx/comms/Msg";
import { Trait } from "@/components/documents/general-components/mdx/codex/Trait";
import { Warning } from "@/components/documents/general-components/mdx/codex/Warning";
import { RequirementList } from "@/components/documents/general-components/mdx/codex/RequirementList";
import { Phase } from "@/components/documents/general-components/mdx/codex/Phase";
import { Objective } from "@/components/documents/general-components/mdx/project/Objective";
import { RecruitProfile } from "@/components/documents/general-components/mdx/project/RecruitProfile";
import { AssetEntry } from "@/components/documents/general-components/mdx/project/AssetEntry";
import { Safeguard } from "@/components/documents/general-components/mdx/project/Safeguard";

/* ── helpers locais (copiados de dev.componentes.tsx) ── */

function Group({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border border-border bg-card/40 p-5">
      <header className="mb-4 border-b border-border pb-3">
        <h2 className="font-display text-lg font-bold uppercase tracking-[0.25em] text-amber-crt">
          {title}
        </h2>
        {intro && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{intro}</p>}
      </header>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

function Item({ name, props, children }: { name: string; props?: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 border border-dashed border-border/70 p-4 md:grid-cols-[14rem_1fr]">
      <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.22em]">
        <div className="text-cyan-crt">&lt;{name} /&gt;</div>
        {props && (
          <div className="text-muted-foreground normal-case tracking-normal">
            <span className="text-amber-crt">props:</span> {props}
          </div>
        )}
      </div>
      <div className="paper-texture p-4 text-paper-foreground">{children}</div>
    </div>
  );
}

const TOC = [
  ["layout", "Layout & shell"],
  ["marcacao", "Carimbos & marcação"],
  ["editorial", "Estrutura editorial"],
  ["interrogatorio", "Interrogatório"],
  ["monitorado", "Comunicação monitorada"],
  ["codex", "Codex (poderes)"],
  ["projeto", "Projeto classificado"],
  ["assinaturas", "Assinaturas / transmissão"],
] as const;

/* ── página principal ── */

export default function ArchivePage() {
  const docs = getAllDocuments();

  const codexDocs = docs.filter((d) => d.frontmatter.slug.startsWith("codex-"));
  const classifiedDocs = docs.filter((d) => d.frontmatter.slug === "projeto-red-suns");
  const exampleDocs = docs.filter(
    (d) => !d.frontmatter.slug.startsWith("codex-") && d.frontmatter.slug !== "projeto-red-suns",
  );

  function DocLink(doc: (typeof docs)[number]) {
    const fm = doc.frontmatter;
    return (
      <Link
        key={fm.slug}
        href={`/archive/${fm.slug}`}
        className="group flex items-center justify-between border border-border bg-card/80 px-4 py-3 text-sm transition-colors hover:bg-card hover:border-amber-crt/50"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${CLASSIFICATION_TOKEN[fm.classification]}`}>
            {fm.classification}
          </span>
          <div className="min-w-0">
            <div className="truncate font-bold uppercase tracking-wider text-foreground">{fm.title}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{fm.date}</div>
          </div>
        </div>
        <span className="text-amber-crt opacity-0 transition-opacity group-hover:opacity-100">→</span>
      </Link>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 font-display text-3xl font-bold uppercase tracking-wider">
          ◆ Arquivo MINCONT-OS
        </h1>
        <p className="mb-8 text-sm uppercase tracking-widest text-muted-foreground">
          {docs.length} documento(s) · acesso restrito
        </p>

        <Tabs defaultValue="docs">
          <TabsList className="mb-6">
            <TabsTrigger value="docs">Documentos</TabsTrigger>
            <TabsTrigger value="old">Componentes — Material Existente</TabsTrigger>
            <TabsTrigger value="new">Componentes — Material Novo</TabsTrigger>
          </TabsList>

          <TabsContent value="docs" className="space-y-10">
            <section>
              <h2 className="mb-3 border-b border-border pb-1 font-display text-lg font-bold uppercase tracking-wider text-amber-crt">
                Códex
              </h2>
              <div className="grid gap-2">{codexDocs.map(DocLink)}</div>
            </section>
            <section>
              <h2 className="mb-3 border-b border-border pb-1 font-display text-lg font-bold uppercase tracking-wider text-amber-crt">
                Projetos Classificados
              </h2>
              <div className="grid gap-2">{classifiedDocs.map(DocLink)}</div>
            </section>
            <section>
              <h2 className="mb-3 border-b border-border pb-1 font-display text-lg font-bold uppercase tracking-wider text-amber-crt">
                Exemplos
              </h2>
              <div className="grid gap-2">{exampleDocs.map(DocLink)}</div>
            </section>
          </TabsContent>

          <TabsContent value="old" className="grid gap-6">
            <Group id="paper" title="paper /">
              <Item name="Paper" props="children">
                <Paper>
                  <p className="text-sm">Conteúdo dentro de um Paper.</p>
                </Paper>
              </Item>
              <Item name="PaperHeader" props="department · isHighSecurity?">
                <PaperHeader department="Divisão de Gestão de Ativos Especiais" />
              </Item>
              <Item name="PaperSubject" props="divisionName? · documentName? · registry? · isHighSecurity?">
                <PaperSubject divisionName="DIVISÃO DE AVALIAÇÃO" documentName="DOCUMENTO DE EXEMPLO" registry="EX-001" />
              </Item>
              <Item name="SectionPaper" props="className? · children">
                <SectionPaper>
                  <p className="text-sm">Seção com borda e padding.</p>
                </SectionPaper>
              </Item>
              <Item name="SectionTitle" props="children">
                <SectionTitle>Título de Seção</SectionTitle>
              </Item>
              <Item name="PaperFooter" props="isHighSecurity? · distribution? · redactDistribuition?">
                <PaperFooter distribution="Conselho Nacional" />
              </Item>
            </Group>

            <Group id="stamps-old" title="stamps /">
              <Item name="AccessLevel7Only">
                <AccessLevel7Only />
              </Item>
              <Item name="FinalReminder">
                <FinalReminder />
              </Item>
              <Item name="StampRepAurora">
                <StampRepAurora />
              </Item>
            </Group>

            <Group id="signatures-old" title="signatures /">
              <Item name="DigitalSignature" props="name · role? · registry · timestamp · color? · background? · authority?">
                <DigitalSignature name="T. Vargas-Helmsing" role="DOE-2" registry="PRJ-RS-07" timestamp="A.R. 2187.04.30 · 22h05" />
              </Item>
              <Item name="DigitalSignature (com color)" props="name · registry · timestamp · color · background">
                <DigitalSignature
                  name="Ultimate Mercer"
                  registry="@ultimatemercer"
                  timestamp={Date.now()}
                  color="#c084fc"
                  background="#1a1a2e"
                />
              </Item>
              <Item name="ResponsibleSignatures" props="responsibleSignatures">
                <ResponsibleSignatures
                  responsibleSignatures={[
                    { department: "DOE-2", name: "T. Vargas-Helmsing", registry: "PRJ-RS-07", signature: "T. Vargas-Helmsing", timestamp: "2187-04-30" },
                    { department: "Supervisão", name: "M. Ouro-Preto", registry: "MIN-001", signature: "M. Ouro-Preto", timestamp: "2187-04-30" },
                  ]}
                />
              </Item>
            </Group>

            <Group id="ui-old" title="ui /">
              <Item name="ItemValue" props="item · value · className? · redacted?">
                <ItemValue item="NOME COMPLETO" value="Agente Desconhecido" />
                <ItemValue item="CLASSIFICAÇÃO" value="ULTRASSECRETO" redacted />
              </Item>
              <Item name="ProfileName" props="name · knownAs · isHighSecurity?">
                <ProfileName name="Agente Desconhecido" knownAs="ALVO-7" />
              </Item>
              <Item name="NexusFormatDate" props="date: string">
                <span className="text-sm">{NexusFormatDate("2187-04-30")}</span>
              </Item>
              <Item name="ProtectDocText">
                <ProtectDoc />
              </Item>
            </Group>
          </TabsContent>

          <TabsContent value="new" className="grid gap-6">
            <nav className="flex flex-wrap gap-1.5 border border-border bg-card/40 p-4">
              {TOC.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="border border-border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground hover:border-amber-crt hover:text-amber-crt"
                >
                  {label}
                </a>
              ))}
            </nav>

            <Group id="layout" title="A — Layout & Shell">
              <Item name="PaperSheet + ClassificationBar" props="children · fm">
                <PaperSheet>
                  <ClassificationBar
                    fm={{
                      type: "memo", slug: "demo", title: "Demo",
                      classification: "SECRETO", date: "A.R. 2187.--.--", issued_by: "DEMO",
                    }}
                  />
                  <p className="mt-2 text-sm">Conteúdo de exemplo dentro de uma folha.</p>
                </PaperSheet>
              </Item>
            </Group>

            <Group id="marcacao" title="B — Carimbos & Marcação">
              <Item name="Redacted" props="length · children">
                <p className="text-sm">
                  O alvo é <Redacted length={14} />, conhecido como <Redacted>Cinza-9</Redacted>.
                </p>
              </Item>
              <Item name='Stamp' props='variant: "red"|"blue"|"amber"|"black"; shape: "rect"|"circle"|"oval"|"triangle"; subtitle?'>
                <div className="flex flex-wrap items-center gap-6">
                  <Stamp variant="red" shape="rect" subtitle="MINCONT">Negado</Stamp>
                  <Stamp variant="blue" shape="oval" subtitle="14-B">Aprovado</Stamp>
                  <Stamp variant="amber" shape="triangle">Urgente</Stamp>
                  <Stamp variant="black" shape="circle" subtitle="A.R. 2187">Arquivado</Stamp>
                </div>
              </Item>
              <Item name="Atalhos pré-configurados">
                <div className="flex flex-wrap items-center gap-6">
                  <ApprovedStamp /><DeniedStamp /><ClassifiedStamp />
                  <ArchivedStamp date="A.R. 2187.04.30" /><UrgentStamp />
                </div>
              </Item>
              <Item name="Classified" props="children">
                <Classified>Bloco inteiro de conteúdo classificado.</Classified>
              </Item>
            </Group>

            <Group id="editorial" title="C — Estrutura Editorial">
              <Item name="Field" props="label · children">
                <Field label="codinome">VESPA</Field>
                <Field label="status">embedded</Field>
              </Item>
              <Item name="Pullquote" props="by? · children">
                <Pullquote by="Min. Ouro-Preto">A continuidade exige sacrifícios silenciosos.</Pullquote>
              </Item>
              <Item name="Caption">
                <Caption>Legenda discreta para uma fotografia de evidência.</Caption>
              </Item>
              <Item name="Article" props="number · children">
                <Article number={1}>Toda transmissão deve ser registrada sob a cláusula vigente.</Article>
              </Item>
              <Item name='LogLine' props='ts · level: "INFO"|"WARN"|"ERR"|"REDACT"'>
                <LogLine ts="A.R.2187.04.30 22:01:14" level="INFO">handshake estabelecido</LogLine>
                <LogLine ts="A.R.2187.04.30 22:01:18" level="WARN">latência alta</LogLine>
                <LogLine ts="A.R.2187.04.30 22:01:22" level="ERR">canal interrompido</LogLine>
              </Item>
              <Item name="Evidence" props="code · custody? · children">
                <Evidence code="E-014" custody="Hyorin">Tecido carbonizado encontrado a 4m do epicentro.</Evidence>
              </Item>
              <Item name="CensorEntry" props="num · title · author? · clause · children">
                <CensorEntry num={1} title="Os Pássaros Livres" author="Anônimo" clause="14-B §3">
                  Material panfletário de origem clandestina.
                </CensorEntry>
              </Item>
            </Group>

            <Group id="interrogatorio" title="D — Interrogatório">
              <Item name='Exchange' props='speaker · ts? · tone: "calm"|"tense"|"redacted"'>
                <Exchange speaker="INT-1" ts="14:02" tone="calm">Diga seu nome para o registro.</Exchange>
                <Exchange speaker="SUJ" ts="14:02" tone="tense">Você já sabe.</Exchange>
                <Exchange speaker="SUJ" ts="14:03" tone="redacted"><Redacted length={18} /></Exchange>
              </Item>
              <Item name='Note' props='kind: "pause"|"inaudible"|"off-record"|"action"'>
                <Note kind="pause">12s</Note>
                <Note kind="inaudible" />
                <Note kind="off-record">conselheiro intervém</Note>
              </Item>
            </Group>

            <Group id="monitorado" title="E — Comunicação Monitorada">
              <Item name="Msg + FlagPhrase + Gap + Attachment" props='side: "left"|"right"; flagged?'>
                <div className="thread-body">
                  <Msg from="ALVO" ts="22:01" side="left" device="terminal-civil">
                    Encontro em <FlagPhrase note="local mencionado em DOE-2">Cais 7</FlagPhrase>.
                  </Msg>
                  <Msg from="CONTRA" ts="22:02" side="right" flagged>
                    Trago o <FlagPhrase note="termo recorrente">pacote azul</FlagPhrase>.
                  </Msg>
                  <Gap minutes={4} reason="canal interrompido" />
                  <Msg from="ALVO" ts="22:06" side="left">
                    <Attachment kind="img" hash="9af3..." label="mapa-fragmento.png" />
                  </Msg>
                </div>
              </Item>
            </Group>

            <Group id="codex" title="F — Codex (Poderes)">
              <Item name="Trait" props="label · children">
                <Trait label="multiplicador">50×</Trait>
                <Trait label="autonomia">parcial</Trait>
              </Item>
              <Item name="Warning">
                <Warning>Manifestação instável; observar contenção dupla.</Warning>
              </Item>
              <Item name="RequirementList" props="items: string[]">
                <RequirementList items={["Cinco consanguíneos da linhagem.", "Ritual ao pôr-do-sol carmesim.", "Sacrifício voluntário de um portador."]} />
              </Item>
              <Item name="Phase" props="n · name · children">
                <Phase n={1} name="Despertar">Manifestação sob estresse extremo.</Phase>
                <Phase n={2} name="Internalização">Controle consolidado.</Phase>
              </Item>
            </Group>

            <Group id="projeto" title="G — Projeto Classificado">
              <Item name="Objective">
                <Objective>Formar agentes indistinguíveis de civis adultos.</Objective>
              </Item>
              <Item name="RecruitProfile" props="items: string[]">
                <RecruitProfile items={["5 a 9 anos", "sem registro civil", "sem parentes diretos"]} />
              </Item>
              <Item name='AssetEntry' props='codename · age · intake · status'>
                <AssetEntry codename="MIRLO" age="24" intake="A.R. 2172" status="embedded"><Redacted length={22} /></AssetEntry>
                <AssetEntry codename="ARQ-00" age="—" intake="A.R. 2160" status="descontinuado"><Redacted length={14} /></AssetEntry>
              </Item>
              <Item name="Safeguard" props="code · children">
                <Safeguard code="A">Re-narração contínua nas fases I-II.</Safeguard>
              </Item>
              <Item name="Section + ProjectTOC" props="Section: id, title · ProjectTOC: items[{id,label}]">
                <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
                  <ProjectTOC items={[{ id: "obj", label: "Objetivo" }, { id: "rec", label: "Recrutamento" }]} />
                  <div className="min-w-0">
                    <Section id="obj" title="Objetivo">Texto exemplar.</Section>
                    <Section id="rec" title="Recrutamento">Texto exemplar.</Section>
                  </div>
                </div>
              </Item>
            </Group>

            <Group id="assinaturas" title="H — Assinaturas / Transmissão">
              <Item name="Signature" props="name · role">
                <Signature name="T. Vargas-Helmsing" role="Diretor · DOE-2" />
              </Item>
              <Item name="DigitalSignature" props="name · role · registry · timestamp">
                <DigitalSignature name="Dir. T. Vargas-Helmsing" role="DOE-2" registry="PRJ-RS-07" timestamp="A.R. 2187.04.30 · 22h05" />
              </Item>
              <Item name="Transmission">
                <Transmission>{`> handshake :: OK\n> canal :: encriptado-4\n> mensagem :: PASSAROS_DE_VIDRO_VOAM_AO_AMANHECER`}</Transmission>
              </Item>
              <Item name="ForeignBody / Translation" props="children">
                <div className="foreign-body">
                  <ForeignBody>Sevran tal il moran, di vere kasta.</ForeignBody>
                  <Translation>Que a paz selada nos preceda, eternamente.</Translation>
                </div>
              </Item>
            </Group>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
