import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArchiveShell } from "@/components/layout/ArchiveShell";
import {
  Redacted,
  Stamp,
  ApprovedStamp,
  DeniedStamp,
  ClassifiedStamp,
  ArchivedStamp,
  UrgentStamp,
  Classified,
  Pullquote,
  Caption,
  Article,
  Evidence,
  LogLine,
  CensorEntry,
  Field,
  Exchange,
  Note,
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
  Signature,
  Transmission,
  ForeignBody,
  Translation,
} from "@/components/mdx/MdxComponents";
import { DigitalSignature } from "@/components/mdx/DigitalSignature";
import { PaperSheet, ClassificationBar } from "@/components/templates/DocumentHeader";

export const Route = createFileRoute("/dev/componentes")({
  component: ShowcasePage,
  head: () => ({ meta: [{ title: "Showcase · Componentes reutilizáveis" }] }),
});

/* ──────────────────────────────────────────────────────────────── */

function Group({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border border-border bg-card/40 p-5">
      <header className="mb-4 border-b border-border pb-3">
        <h2 className="font-display text-lg font-bold uppercase tracking-[0.25em] text-amber-crt">
          {title}
        </h2>
        {intro && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{intro}</p>
        )}
      </header>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

function Item({
  name,
  port,
  props,
  children,
}: {
  name: string;
  port?: string;
  props?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3 border border-dashed border-border/70 p-4 md:grid-cols-[14rem_1fr]">
      <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.22em]">
        <div className="text-cyan-crt">&lt;{name} /&gt;</div>
        {props && (
          <div className="text-muted-foreground normal-case tracking-normal">
            <span className="text-amber-crt">props:</span> {props}
          </div>
        )}
        <div className="text-muted-foreground">
          <span className="text-amber-crt">port:</span> {port ?? "server, copia direto"}
        </div>
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

function ShowcasePage() {
  return (
    <ArchiveShell>
      <header className="mb-8 border border-border bg-card/40 p-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-crt">
          ◆ uso interno · referência de port
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-[0.18em] text-amber-crt crt-glow md:text-4xl">
          Showcase de componentes
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Inventário visual dos componentes reutilizáveis que vivem no MDX e nos
          templates. Cada item lista props chave e o que ajustar ao portar para
          Next.js. Esta página existe só em ambiente de desenvolvimento e não é
          listada no arquivo público.
        </p>
        <nav className="mt-5 flex flex-wrap gap-1.5">
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
      </header>

      <div className="grid gap-6">
        <Group id="layout" title="Layout & shell" intro="Wrappers de página e papel impresso.">
          <Item
            name="ArchiveShell"
            props="children"
            port="server. Trocar <Link> do TanStack por next/link."
          >
            <div className="text-xs text-paper-muted">
              É a moldura desta página. <Link to="/" className="underline">voltar /</Link>
            </div>
          </Item>
          <Item
            name="PaperSheet + ClassificationBar"
            props="children · fm"
            port="server, copia direto"
          >
            <PaperSheet>
              <ClassificationBar
                fm={{
                  type: "memo",
                  slug: "demo",
                  title: "Demo",
                  classification: "SECRETO",
                  date: "A.R. 2187.--.--",
                  issued_by: "DEMO",
                }}
              />
              <p className="mt-2 text-sm">Conteúdo de exemplo dentro de uma folha.</p>
            </PaperSheet>
          </Item>
        </Group>

        <Group id="marcacao" title="Carimbos & marcação" intro="Carimbos, redação e classificados.">
          <Item name="Redacted" props="length · children">
            <p className="text-sm">
              O alvo é <Redacted length={14} />, conhecido como <Redacted>Cinza-9</Redacted>.
            </p>
          </Item>
          <Item
            name="Stamp"
            props='variant: "red"|"blue"|"amber"|"black"; shape: "rect"|"circle"|"oval"|"triangle"; subtitle?'
          >
            <div className="flex flex-wrap items-center gap-6">
              <Stamp variant="red" shape="rect" subtitle="MINCONT">Negado</Stamp>
              <Stamp variant="blue" shape="oval" subtitle="14-B">Aprovado</Stamp>
              <Stamp variant="amber" shape="triangle">Urgente</Stamp>
              <Stamp variant="black" shape="circle" subtitle="A.R. 2187">Arquivado</Stamp>
            </div>
          </Item>
          <Item name="Atalhos pré-configurados">
            <div className="flex flex-wrap items-center gap-6">
              <ApprovedStamp />
              <DeniedStamp />
              <ClassifiedStamp />
              <ArchivedStamp date="A.R. 2187.04.30" />
              <UrgentStamp />
            </div>
          </Item>
          <Item name="Classified" props="children">
            <Classified>
              Bloco inteiro de conteúdo classificado. Cláusula 14-B se aplica.
            </Classified>
          </Item>
        </Group>

        <Group id="editorial" title="Estrutura editorial">
          <Item name="Field" props="label · children">
            <Field label="codinome">VESPA</Field>
            <Field label="status">embedded</Field>
          </Item>
          <Item name="Pullquote" props="by? · children">
            <Pullquote by="Min. Ouro-Preto">
              A continuidade exige sacrifícios silenciosos.
            </Pullquote>
          </Item>
          <Item name="Caption">
            <Caption>Legenda discreta para uma fotografia de evidência.</Caption>
          </Item>
          <Item name="Article" props="number · children">
            <Article number={1}>
              Toda transmissão deve ser registrada sob a cláusula vigente.
            </Article>
          </Item>
          <Item name="LogLine" props='ts · level: "INFO"|"WARN"|"ERR"|"REDACT"'>
            <LogLine ts="A.R.2187.04.30 22:01:14" level="INFO">handshake estabelecido</LogLine>
            <LogLine ts="A.R.2187.04.30 22:01:18" level="WARN">latência alta</LogLine>
            <LogLine ts="A.R.2187.04.30 22:01:22" level="ERR">canal interrompido</LogLine>
          </Item>
          <Item name="Evidence" props="code · custody? · children">
            <Evidence code="E-014" custody="Hyorin">
              Tecido carbonizado encontrado a 4m do epicentro.
            </Evidence>
          </Item>
          <Item name="CensorEntry" props="num · title · author? · clause · children">
            <CensorEntry num={1} title="Os Pássaros Livres" author="Anônimo" clause="14-B §3">
              Material panfletário de origem clandestina.
            </CensorEntry>
          </Item>
        </Group>

        <Group id="interrogatorio" title="Interrogatório">
          <Item name="Exchange" props='speaker · ts? · tone: "calm"|"tense"|"redacted"'>
            <Exchange speaker="INT-1" ts="14:02" tone="calm">Diga seu nome para o registro.</Exchange>
            <Exchange speaker="SUJ" ts="14:02" tone="tense">Você já sabe.</Exchange>
            <Exchange speaker="SUJ" ts="14:03" tone="redacted">
              <Redacted length={18} />
            </Exchange>
          </Item>
          <Item name="Note" props='kind: "pause"|"inaudible"|"off-record"|"action"'>
            <Note kind="pause">12s</Note>
            <Note kind="inaudible" />
            <Note kind="off-record">conselheiro intervém</Note>
          </Item>
        </Group>

        <Group id="monitorado" title="Comunicação monitorada">
          <Item
            name="Msg + FlagPhrase + Gap + Attachment"
            props='side: "left"|"right"; flagged?; FlagPhrase note?'
            port="server. Msg usa contexto interno para numerar notas (¹²³)."
          >
            <div className="thread-body">
              <Msg from="ALVO" ts="22:01" side="left" device="terminal-civil">
                Encontro confirmado em <FlagPhrase note="local mencionado em registro DOE-2">Cais 7</FlagPhrase> às 23h.
              </Msg>
              <Msg from="CONTRA" ts="22:02" side="right" flagged>
                Trago o <FlagPhrase note="termo recorrente em comunicações da célula">pacote azul</FlagPhrase> e o <FlagPhrase note="possível referência a documento falsificado">selo</FlagPhrase>.
              </Msg>
              <Gap minutes={4} reason="canal interrompido" />
              <Msg from="ALVO" ts="22:06" side="left">
                <Attachment kind="img" hash="9af3..." label="mapa-fragmento.png" />
              </Msg>
            </div>
          </Item>
        </Group>

        <Group id="codex" title="Codex (poderes/fenômenos)">
          <Item name="Trait" props="label · children">
            <Trait label="multiplicador">50×</Trait>
            <Trait label="autonomia">parcial</Trait>
          </Item>
          <Item name="Warning">
            <Warning>Manifestação instável; observar contenção dupla.</Warning>
          </Item>
          <Item name="RequirementList" props="items: string[]">
            <RequirementList
              items={[
                "Cinco indivíduos consanguíneos da linhagem.",
                "Ritual de outorga ao pôr-do-sol carmesim.",
                "Sacrifício voluntário de um portador maduro.",
              ]}
            />
          </Item>
          <Item name="Phase" props="n · name · children">
            <Phase n={1} name="Despertar">Manifestação espontânea sob estresse extremo.</Phase>
            <Phase n={2} name="Internalização">Controle voluntário consolidado.</Phase>
          </Item>
        </Group>

        <Group id="projeto" title="Projeto classificado">
          <Item name="Objective">
            <Objective>Formar agentes indistinguíveis de civis adultos.</Objective>
          </Item>
          <Item name="RecruitProfile" props="items: string[]">
            <RecruitProfile items={["5 a 9 anos", "sem registro civil", "sem parentes diretos"]} />
          </Item>
          <Item
            name="AssetEntry"
            props='codename · age · intake · status: "ativo"|"embedded"|"descontinuado"|"comprometido"'
          >
            <AssetEntry codename="MIRLO" age="24" intake="A.R. 2172" status="embedded">
              <Redacted length={22} />
            </AssetEntry>
            <AssetEntry codename="BRANCO-04" age="19" intake="A.R. 2177" status="comprometido">
              <Redacted length={26} />
            </AssetEntry>
            <AssetEntry codename="ARQ-00" age="—" intake="A.R. 2160" status="descontinuado">
              <Redacted length={14} />
            </AssetEntry>
          </Item>
          <Item name="Safeguard" props="code · children">
            <Safeguard code="A">Re-narração contínua nas fases I-II.</Safeguard>
          </Item>
          <Item
            name="Section + ProjectTOC"
            props="Section: id, title · ProjectTOC: items[{id,label}]"
            port='server. No template, fica em coluna sticky de 14rem.'
          >
            <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
              <ProjectTOC
                items={[
                  { id: "obj-demo", label: "Objetivo" },
                  { id: "rec-demo", label: "Recrutamento" },
                  { id: "fim-demo", label: "Avaliação" },
                ]}
              />
              <div className="min-w-0">
                <Section id="obj-demo" title="Objetivo">Texto exemplar.</Section>
                <Section id="rec-demo" title="Recrutamento">Texto exemplar.</Section>
                <Section id="fim-demo" title="Avaliação">Texto exemplar.</Section>
              </div>
            </div>
          </Item>
        </Group>

        <Group id="assinaturas" title="Assinaturas / transmissão / cartas estrangeiras">
          <Item name="Signature" props="name · role">
            <Signature name="T. Vargas-Helmsing" role="Diretor · DOE-2" />
          </Item>
          <Item name="DigitalSignature" props="name · role · registry · timestamp">
            <DigitalSignature
              name="Dir. T. Vargas-Helmsing"
              role="DOE-2"
              registry="PRJ-RS-07"
              timestamp="A.R. 2187.04.30 · 22h05"
            />
          </Item>
          <Item name="Transmission">
            <Transmission>{`> handshake :: OK
> canal :: encriptado-4
> mensagem :: PASSAROS_DE_VIDRO_VOAM_AO_AMANHECER`}</Transmission>
          </Item>
          <Item name="ForeignBody / Translation" props="children">
            <div className="foreign-body">
              <ForeignBody>Sevran tal il moran, di vere kasta.</ForeignBody>
              <Translation>Que a paz selada nos preceda, eternamente.</Translation>
            </div>
          </Item>
        </Group>
      </div>
    </ArchiveShell>
  );
}