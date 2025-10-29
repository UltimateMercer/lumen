import { cn } from "@/lib/utils";
import { ItemValue } from "../general-components/item-value";
import { NexusFormatDate } from "../general-components/nexus-format-date";
import { Paper } from "../general-components/paper";
import { PaperHeader } from "../general-components/paper-header";
import { SectionPaper } from "../general-components/section-paper";
import { tierColors } from "../general-components/tier-total-score";
import { Square } from "lucide-react";
import { CheckSquareIcon, SquareIcon } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "../general-components/section-title";
import { StampRepAurora } from "../general-components/stamp-rep-aurora";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsibleSignatures } from "../general-components/responsible-signatures";

interface CompProps {
  individual: any;
}
export const PermitCard = ({ individual }: CompProps) => {
  const {
    id,
    registryName,
    age,
    birthDate,
    licenseStartDate,
    tier,
    mentor = "",
    responsibleSignatures,
  } = individual;
  const tierStyle = tierColors[tier];

  return (
    <Paper>
      <PaperHeader department="Divisão de Gestão de Ativos Especiais" />
      <SectionPaper>
        <div className="flex gap-4 items-center mb-2">
          <div className="w-40 h-40 bg-[#252525] dark:bg-[#eaeaea]"></div>
          <div className="flex flex-col gap-2">
            <ItemValue item="Nome de registro" value={registryName} />
            <ItemValue
              item="data de nascimento"
              value={NexusFormatDate(birthDate)}
            />
            <ItemValue item="idade" value={age} />
            <ItemValue
              item="data de emissão"
              value={NexusFormatDate(licenseStartDate)}
            />
            <ItemValue item="id" value={id} />
            {/* {Object.keys(mentor).length > 0 && (
              <ItemValue item="mentor" value={mentor} />
            )} */}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div
            className={cn(
              "flex items-center justify-between text-center p-5 text-9xl font-bold w-40 h-40 texture-item background-texture",
              tierStyle
            )}
          >
            <p className="mx-auto">{tier}</p>
          </div>
        </div>
      </SectionPaper>
      <SectionPaper>
        {/* <SectionTitle>Permissões</SectionTitle> */}
        <PermitCheckTable tier={tier} />

        {/* <PermitCheckItem tier={tier} permissions={permissions} /> */}
      </SectionPaper>
      {Object.keys(mentor).length > 0 && (
        <SectionPaper>
          <ResponsibleSignatures responsibleSignatures={[mentor]} />
        </SectionPaper>
      )}

      <SectionPaper>
        <ResponsibleSignatures responsibleSignatures={responsibleSignatures} />
      </SectionPaper>
      <div className="">
        {tier === "S" ? (
          <p className="text-muted-foreground text-center uppercase">
            Documento válido indefinidamente. Renovação automática.
          </p>
        ) : (
          <p className="text-muted-foreground text-center uppercase">
            Documento válido por 3 anos.
          </p>
        )}
      </div>
      <StampRepAurora />
    </Paper>
  );
};

export const PermitCheckTable = ({ tier }: any) => {
  return (
    <Table className="border border-[#252525] dark:border-[#eaeaea] mb-2.5">
      <TableHeader className="">
        <TableRow className=" bg-[#252525]  dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea] border-b border-[#252525] dark:border-[#eaeaea]">
          <TableHead className="text-[#eaeaea] dark:text-[#252525] uppercase">
            Permissões concedidas
          </TableHead>
          <TableHead className="text-[#eaeaea] dark:text-[#252525] text-right uppercase">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">Acesso a todas as zonas</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">
            Formar grupos independentes
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">
            Aceitar missões de guildas licenciadas
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">
            Acesso a recursos públicos
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">Portar armas registradas</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase">Missões governamentais</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Ilimitado, mediante solicitação"}
            {tier === "B" && "Limitado e supervisionado"}
            {tier === "C" &&
              "Limitado, supervisionado e zonas de baixa complexidade"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase ">
            Acesso a informações classificadas
          </TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Ilimitado"}
            {tier === "A" && "Limitado"}
            {tier === "B" && "Limitado"}
            {tier === "C" && "Limitado"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase ">Dispensado de supervisão</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Dispensado"}
            {tier === "A" && "Dispensado"}
            {tier === "B" && "Necessário"}
            {tier === "C" && "Necessário"}
          </TableCell>
        </TableRow>
        <TableRow className="border-b border-[#252525] dark:border-[#eaeaea]">
          <TableCell className="uppercase ">Imunidade diplomática</TableCell>
          <TableCell className="text-right uppercase">
            {tier === "S" && "Limitada"}
            {tier === "A" && "Sem imunidade"}
            {tier === "B" && "Sem imunidade"}
            {tier === "C" && "Sem imunidade"}
          </TableCell>
        </TableRow>
      </TableBody>
      {/* <TableFooter>
        <TableRow className="border-t border-[#252525] dark:border-[#eaeaea] bg-[#252525] dark:bg-[#eaeaea] hover:bg-[#252525] hover:dark:bg-[#eaeaea]">
          <TableCell className="text-[#eaeaea] dark:text-[#252525]">
            SUBTOTAL - PROVAS ADICIONAIS
          </TableCell>
          <TableCell className="text-[#eaeaea] dark:text-[#252525] text-right">
            {"subtotal()"}
          </TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};
